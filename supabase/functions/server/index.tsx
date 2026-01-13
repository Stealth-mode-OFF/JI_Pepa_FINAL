import { Hono } from "npm:hono";
import { cors } from "npm:hono/cors";
import { logger } from "npm:hono/logger";
import Stripe from "npm:stripe";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import * as kv from "./kv_store.tsx";
const app = new Hono();

// Enable logger
app.use('*', logger(console.log));

// Enable CORS for all routes and methods
app.use(
  "/*",
  cors({
    origin: "*",
    allowHeaders: ["Content-Type", "Authorization"],
    allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    exposeHeaders: ["Content-Length"],
    maxAge: 600,
  }),
);

// Health check endpoint
app.get("/make-server-342a80aa/health", (c) => {
  return c.json({ status: "ok" });
});

const getEnv = (key: string) => Deno.env.get(key) ?? "";

const stripeSecret = getEnv("STRIPE_SECRET_KEY");
const stripeWebhookSecret = getEnv("STRIPE_WEBHOOK_SECRET");
const supabaseUrl = getEnv("SUPABASE_URL");
const supabaseServiceKey = getEnv("SUPABASE_SERVICE_ROLE_KEY");
const supabaseAnonKey = getEnv("SUPABASE_ANON_KEY");

const stripe = stripeSecret ? new Stripe(stripeSecret, { apiVersion: "2024-06-20" }) : null;

const getOrigin = (request: Request) => request.headers.get("origin") ?? "";

const getAuthUser = async (request: Request) => {
  const authHeader = request.headers.get("authorization");
  if (!authHeader || !supabaseAnonKey || !supabaseUrl) {
    return { user: null, error: "Missing auth header or Supabase anon config." };
  }
  const authClient = createClient(supabaseUrl, supabaseAnonKey, {
    global: { headers: { Authorization: authHeader } },
    auth: { persistSession: false },
  });
  const { data, error } = await authClient.auth.getUser();
  if (error) {
    return { user: null, error: error.message };
  }
  return { user: data.user, error: null };
};

app.post("/make-server-342a80aa/stripe/checkout", async (c) => {
  if (!stripe || !supabaseServiceKey || !supabaseUrl) {
    return c.json({ message: "Stripe or Supabase env not configured." }, 500);
  }

  const body = await c.req.json().catch(() => null);
  if (!body?.priceId || !body?.cohortId) {
    return c.json({ message: "priceId and cohortId are required." }, 400);
  }

  const { user, error } = await getAuthUser(c.req.raw);
  if (error || !user) {
    return c.json({ message: "Unauthorized" }, 401);
  }

  const admin = createClient(supabaseUrl, supabaseServiceKey, {
    auth: { persistSession: false },
  });

  const { data: enrollment, error: enrollmentError } = await admin
    .from("enrollments")
    .insert({
      user_id: user.id,
      cohort_id: body.cohortId,
      status: "pending",
      paid: false,
    })
    .select("id")
    .single();

  if (enrollmentError) {
    return c.json({ message: enrollmentError.message }, 500);
  }

  const origin = getOrigin(c.req.raw);
  const successUrl =
    body.successUrl ??
    (origin ? `${origin}/checkout-success?session_id={CHECKOUT_SESSION_ID}` : undefined);
  const cancelUrl = body.cancelUrl ?? (origin ? `${origin}/checkout` : undefined);

  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    customer_email: user.email ?? undefined,
    line_items: [{ price: body.priceId, quantity: 1 }],
    success_url: successUrl ?? "https://example.com",
    cancel_url: cancelUrl ?? "https://example.com",
    metadata: {
      enrollment_id: enrollment.id,
      user_id: user.id,
    },
  });

  const { error: paymentError } = await admin.from("payments").insert({
    user_id: user.id,
    enrollment_id: enrollment.id,
    provider: "stripe",
    provider_ref: session.id,
    amount_cents: session.amount_total ?? 0,
    currency: session.currency ?? "EUR",
    status: "initiated",
  });

  if (paymentError) {
    return c.json({ message: paymentError.message }, 500);
  }

  return c.json({ url: session.url, sessionId: session.id });
});

app.post("/make-server-342a80aa/stripe/webhook", async (c) => {
  if (!stripe || !stripeWebhookSecret || !supabaseServiceKey || !supabaseUrl) {
    return c.json({ message: "Stripe webhook env not configured." }, 500);
  }

  const signature = c.req.raw.headers.get("stripe-signature");
  if (!signature) {
    return c.json({ message: "Missing signature" }, 400);
  }

  const body = await c.req.text();
  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(body, signature, stripeWebhookSecret);
  } catch (err) {
    const message = err instanceof Error ? err.message : "Webhook error";
    return c.json({ message }, 400);
  }

  const admin = createClient(supabaseUrl, supabaseServiceKey, {
    auth: { persistSession: false },
  });

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;
    const paymentRef = session.id;

    const { data: payment } = await admin
      .from("payments")
      .select("id, enrollment_id")
      .eq("provider_ref", paymentRef)
      .maybeSingle();

    if (payment?.id) {
      await admin
        .from("payments")
        .update({
          status: "paid",
          amount_cents: session.amount_total ?? 0,
          currency: session.currency ?? "EUR",
        })
        .eq("id", payment.id);

      await admin
        .from("enrollments")
        .update({ status: "active", paid: true })
        .eq("id", payment.enrollment_id);
    }
  }

  if (event.type === "checkout.session.expired") {
    const session = event.data.object as Stripe.Checkout.Session;
    await admin
      .from("payments")
      .update({ status: "expired" })
      .eq("provider_ref", session.id);
  }

  return c.json({ received: true });
});

Deno.serve(app.fetch);
