import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";
import { AuthShell } from "../components/AuthShell";
import { stripePromise } from "@/utils/stripe";
import { useAuth } from "../auth/AuthContext";

export const Checkout = () => {
  const { t } = useTranslation();
  const { user } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleCheckout = async () => {
    const endpoint = import.meta.env.VITE_STRIPE_CHECKOUT_ENDPOINT as string | undefined;
    const priceId = import.meta.env.VITE_STRIPE_PRICE_ID as string | undefined;
    const cohortId = import.meta.env.VITE_DEFAULT_COHORT_ID as string | undefined;

    if (!endpoint || !priceId || !cohortId) {
      toast.error(
        t("checkout.missingConfig", "Stripe is not configured yet. Add env keys first."),
      );
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          priceId,
          cohortId,
          customerEmail: user?.email,
          successUrl: `${window.location.origin}/checkout-success`,
          cancelUrl: `${window.location.origin}/checkout`,
        }),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data?.message ?? "Checkout failed.");
      }
      if (data.url) {
        window.location.href = data.url;
        return;
      }
      const stripe = await stripePromise;
      if (!stripe || !data.sessionId) {
        throw new Error("Stripe client not ready.");
      }
      const result = await stripe.redirectToCheckout({ sessionId: data.sessionId });
      if (result.error) {
        throw result.error;
      }
    } catch (error) {
      const message = error instanceof Error ? error.message : "Checkout failed.";
      toast.error(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AuthShell
      title={t("checkout.title", "Secure your spot")}
      subtitle={t(
        "checkout.subtitle",
        "Complete payment to confirm your seat in the next cohort.",
      )}
    >
      <div className="flex flex-col gap-6">
        <div className="border border-black/10 bg-[#f9f9f9] p-6">
          <p className="font-['Montserrat'] text-[16px] leading-[24px] text-[#6a7282]">
            {t("checkout.summary", "Cohort reservation + onboarding support")}
          </p>
          <p className="font-['Montserrat'] font-bold text-[28px] leading-[36px] mt-3">
            {t("checkout.price", "€320")}
          </p>
        </div>

        <button
          type="button"
          onClick={handleCheckout}
          disabled={isSubmitting}
          className="w-full h-[52px] bg-black text-white font-['Inter'] font-bold text-[14px] uppercase tracking-[1.2496px] hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 transition-all duration-200 disabled:opacity-50"
        >
          {isSubmitting
            ? t("checkout.loading", "Redirecting...")
            : t("checkout.cta", "Pay & reserve my seat")}
        </button>

        <p className="text-center text-[12px] text-[#6a7282] font-['Montserrat'] leading-[18px]">
          {t("checkout.note", "We use Stripe for secure payments. Receipts are emailed instantly.")}
        </p>
      </div>
    </AuthShell>
  );
};
