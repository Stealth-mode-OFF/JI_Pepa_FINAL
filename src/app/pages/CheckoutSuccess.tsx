import React, { useMemo } from "react";
import { useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { AuthShell } from "../components/AuthShell";

type StepState = "done" | "current" | "upcoming";

export const CheckoutSuccess = () => {
  const { t } = useTranslation();
  const { search } = useLocation();

  const isPending = useMemo(() => {
    const params = new URLSearchParams(search);
    return params.get("status") === "pending";
  }, [search]);

  const steps = useMemo(
    () => [
      { key: "paid", label: t("checkoutSuccess.timeline.paid", "Paid") },
      {
        key: "confirmed",
        label: t("checkoutSuccess.timeline.confirmed", "Confirmed"),
      },
      {
        key: "welcome",
        label: t("checkoutSuccess.timeline.welcome", "Welcome email"),
      },
    ],
    [t],
  );

  const badgeText = isPending
    ? t("checkoutSuccess.badgePending", "Payment pending")
    : t("checkoutSuccess.badgeSuccess", "Payment confirmed");

  const title = isPending
    ? t("checkoutSuccess.pendingTitle", "Payment is pending.")
    : t("checkoutSuccess.title", "You are in.");

  const subtitle = isPending
    ? t(
        "checkoutSuccess.pendingSubtitle",
        "We're confirming with your bank. This usually takes under a minute.",
      )
    : t(
        "checkoutSuccess.subtitle",
        "We received your payment and will follow up with cohort details.",
      );

  const body = isPending
    ? t(
        "checkoutSuccess.pendingBody",
        "If this stays pending for a few minutes, reply to the receipt email or contact us and we’ll prioritize your seat.",
      )
    : t(
        "checkoutSuccess.body",
        "Check your inbox for the receipt and next steps. If you have any questions, reply to the email or contact us directly.",
      );

  const getStepState = (index: number): StepState => {
    if (!isPending) return "done";
    if (index === 0) return "done";
    if (index === 1) return "current";
    return "upcoming";
  };

  return (
    <AuthShell title={title} subtitle={subtitle}>
      <div className="flex flex-col gap-8">
        {/* Status badge */}
        <div className="inline-flex items-center gap-3 w-fit px-4 py-2 bg-[#FFED00] border-2 border-black shadow-[8px_8px_0_0_rgba(0,0,0,1)] uppercase font-['Inter'] font-bold text-[11px] tracking-[1px]">
          <span>{badgeText}</span>
          <span className="text-[16px]">{isPending ? "…" : "✓"}</span>
        </div>

        {/* Body copy */}
        <p className="font-['Montserrat'] text-[16px] leading-[24px] text-[#6a7282] max-w-2xl">
          {body}
        </p>

        {/* Timeline card */}
        <div className="border-2 border-black bg-white shadow-[12px_12px_0_0_rgba(0,0,0,1)] p-6 md:p-8 flex flex-col gap-6">
          <div className="flex flex-col md:flex-row md:items-center md:gap-4">
            {steps.map((step, index) => {
              const state = getStepState(index);
              const baseCircle = "flex h-12 w-12 items-center justify-center rounded-full border-2 border-black font-['Inter'] font-bold text-[16px]";
              const stateStyles: Record<StepState, string> = {
                done: "bg-[#FFED00] text-black shadow-[6px_6px_0_0_rgba(0,0,0,1)]",
                current:
                  "bg-white text-black shadow-[6px_6px_0_0_rgba(0,0,0,1)] animate-pulse", 
                upcoming: "bg-white text-black/50 border-black/50",
              };

              return (
                <div
                  key={step.key}
                  className="flex items-center gap-3 md:flex-1"
                >
                  <div className={`${baseCircle} ${stateStyles[state]}`}>
                    {state === "done" ? "✓" : index + 1}
                  </div>
                  <div className="flex flex-col">
                    <span className="font-['Inter'] font-bold text-[12px] uppercase tracking-[1px] text-black">
                      {step.label}
                    </span>
                  </div>
                  {index < steps.length - 1 && (
                    <div className="hidden md:block flex-1 h-[2px] border-b-2 border-dashed border-black/30 ml-3"></div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Actions */}
        <div className="grid gap-4 sm:grid-cols-2">
          <a
            href="/"
            className="inline-flex items-center justify-center h-[52px] bg-black text-[#FFED00] font-['Inter'] font-bold text-[14px] uppercase tracking-[1.1px] border-2 border-black shadow-[8px_8px_0_0_rgba(0,0,0,1)] hover:translate-x-[-2px] hover:translate-y-[-2px] transition-transform duration-200"
          >
            {t("checkoutSuccess.cta", "Back to homepage")}
          </a>
          {isPending && (
            <button
              type="button"
              onClick={() => window.location.reload()}
              className="inline-flex items-center justify-center h-[52px] bg-white text-black font-['Inter'] font-bold text-[14px] uppercase tracking-[1.1px] border-2 border-black shadow-[8px_8px_0_0_rgba(0,0,0,1)] hover:bg-[#FFED00]/70 transition-colors duration-200"
            >
              {t("checkoutSuccess.pendingCta", "Refresh status")}
            </button>
          )}
        </div>

        {/* Support note */}
        <div className="border border-black/20 bg-black/[0.02] px-4 py-3 font-['Montserrat'] text-[13px] text-black/70">
          {isPending
            ? t(
                "checkoutSuccess.pendingBody",
                "If this stays pending for a few minutes, reply to the receipt email or contact us and we’ll prioritize your seat.",
              )
            : t(
                "checkoutSuccess.body",
                "Check your inbox for the receipt and next steps. If you have any questions, reply to the email or contact us directly.",
              )}
        </div>
      </div>
    </AuthShell>
  );
};
