
  # JI_FINAL

  This is a code bundle for JI_FINAL. The original project is available at https://www.figma.com/design/l0QHcTXfoIjpcYSDZUtkG2/JI_FINAL.

## Running the code

  Run `npm i` to install the dependencies.

  Run `npm run dev` to start the development server.

  ## Production setup

  - Lead magnet form: set `VITE_LEAD_FORM_ENDPOINT` to your form endpoint (for example, Formspree or a custom API). If not set, the form opens the user's email client with a prefilled request.
  - SEO: set `VITE_SITE_URL` to your canonical site URL (for example, `https://jazykaintegrace.cz`) for correct canonical/meta/JSON-LD URLs.
  - Supabase Auth: set `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` for the student signup/onboarding flow.
  - Supabase tables: run `supabase/schema.sql` in the Supabase SQL editor to create `student_profiles`, `courses`, `cohorts`, `enrollments`, `payments`, and RLS policies.
  - Stripe checkout (optional): set `VITE_STRIPE_PUBLISHABLE_KEY`, `VITE_STRIPE_CHECKOUT_ENDPOINT`, and `VITE_STRIPE_PRICE_ID`.
  - Stripe Edge Function env (server-side): `STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET`, `SUPABASE_URL`, `SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY`.
  - Stripe checkout endpoint: `https://<project>.functions.supabase.co/make-server-342a80aa/stripe/checkout`.
  - Build the site with `npm run build`.
  
