import React from "react";
import { useTranslation } from "react-i18next";
import { ArrowRightIcon } from "./Icons";

export const MobileActionBar = () => {
  const { t } = useTranslation();

  const links = [
    { href: "#method", label: t("header.method", "Method") },
    { href: "#courses", label: t("header.courses", "Courses") },
    { href: "#pricing", label: t("pricing.label", "Pricing") },
    { href: "#testimonials", label: t("testimonials.label", "Student voices") },
    { href: "#instructor", label: t("instructor.label", "Your instructor") },
    { href: "#faq", label: t("faq.label", "FAQ") },
    { href: "#contact", label: t("header.contact", "Contact") },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 md:hidden border-t border-[var(--ds-color-neutral-900-20)] bg-white/95 backdrop-blur">
      <div className="px-4 pb-[max(env(safe-area-inset-bottom),12px)] pt-3">
        <a
          href="/signup"
          className="w-full h-[52px] bg-[var(--ds-color-accent-base)] border border-[var(--ds-color-neutral-900)] shadow-[var(--ds-shadow-dense-md)] inline-flex items-center justify-center gap-2 type-ui-md text-[var(--ds-color-neutral-900)]"
        >
          {t("hero.cta", "Start Now")}
          <ArrowRightIcon />
        </a>
        <div className="mt-3 flex items-center gap-2 overflow-x-auto pb-2">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="shrink-0 px-3 py-1 rounded-full border border-[var(--ds-color-neutral-900-20)] bg-white text-[11px] uppercase tracking-[1.1px] font-[var(--ds-font-family-body)] font-[var(--ds-font-weight-bold)] text-[var(--ds-color-neutral-700)]"
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};
