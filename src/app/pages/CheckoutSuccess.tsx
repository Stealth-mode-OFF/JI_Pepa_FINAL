import React from "react";
import { useTranslation } from "react-i18next";
import { AuthShell } from "../components/AuthShell";

export const CheckoutSuccess = () => {
  const { t } = useTranslation();

  return (
    <AuthShell
      title={t("checkoutSuccess.title", "You are in.")}
      subtitle={t(
        "checkoutSuccess.subtitle",
        "We received your payment and will follow up with cohort details.",
      )}
    >
      <div className="flex flex-col gap-6">
        <p className="font-['Montserrat'] text-[16px] leading-[24px] text-[#6a7282]">
          {t(
            "checkoutSuccess.body",
            "Check your inbox for the receipt and next steps. If you have any questions, reply to the email or contact us directly.",
          )}
        </p>
        <a
          href="/"
          className="inline-flex items-center justify-center h-[52px] bg-black text-white font-['Inter'] font-bold text-[14px] uppercase tracking-[1.2496px] hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 transition-all duration-200"
        >
          {t("checkoutSuccess.cta", "Back to homepage")}
        </a>
      </div>
    </AuthShell>
  );
};
