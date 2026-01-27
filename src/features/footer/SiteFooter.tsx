import type { ReactNode } from "react";
import { useTranslation } from "react-i18next";

import { reopenCookieConsentBanner } from "@/app/components/CookieConsent";
import { ArrowUpRightIcon } from "@/app/components/Icons";
import { PageContainer } from "@/shared/layouts/Page";

const EMAIL_BY_LANGUAGE: Record<string, string> = {
  en: "josef@jazykaintegrace.cz",
  cs: "josef@jazykaintegrace.cz",
  it: "marta@jazykaintegrace.cz",
  ru: "ekaterina@jazykaintegrace.cz",
  uk: "ekaterina@jazykaintegrace.cz",
};

type LegalSection = "privacy" | "terms" | "cookies" | "accessibility";

type SiteFooterProps = {
  onOpenLegal?: (section: LegalSection) => void;
};

export const SiteFooter = ({ onOpenLegal }: SiteFooterProps) => {
  const { t, i18n } = useTranslation();
  const language = (i18n.language || "en").split("-")[0];
  const contactEmail = EMAIL_BY_LANGUAGE[language] ?? EMAIL_BY_LANGUAGE.en;

  const socialMediaLinks = getSocialMediaLinks(t);
  const legalDocumentLinks = getLegalDocumentLinks(t);

  return (
    <footer
      id="contact"
      className="bg-[var(--ds-color-neutral-900)] text-[var(--ds-color-neutral-0)] pt-32 pb-12 border-t border-[var(--ds-color-neutral-0-10)]"
    >
      <PageContainer>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-32 mb-32">
          <div className="space-y-12">
            <h2 className="font-[var(--ds-font-family-display)] font-[var(--ds-font-weight-bold)] text-[var(--ds-type-h2-size-sm)] sm:text-[var(--ds-type-h2-size-md)] md:text-[var(--ds-type-h1-size)] lg:text-[var(--ds-type-h0-size-sm)] xl:text-[var(--ds-type-h0-size-md)] leading-[0.9] tracking-[var(--ds-type-h0-letter-spacing)]">
              {t("footer.titleLine1", "READY TO")}
              <br />
              <span className="text-[var(--ds-color-accent-base)]">
                {t("footer.titleLine2", "INTEGRATE?")}
              </span>
            </h2>

            <div className="flex flex-col gap-6">
              <ContactLink href={`mailto:${contactEmail}`} label={contactEmail} />
              <ContactLink href="tel:+420605839456" label="+420 605 839 456" />
            </div>
          </div>

          <div className="flex flex-col lg:items-end gap-12">
            <CommunityCard socialLinks={socialMediaLinks} />

            <div className="flex flex-wrap gap-6 md:gap-8">
              {legalDocumentLinks.map((link) => (
                <FooterLink
                  key={link.section}
                  label={link.label}
                  onLegalClick={() => {
                    if (link.section === "cookie-preferences") {
                      reopenCookieConsentBanner();
                      return;
                    }
                    onOpenLegal?.(link.section);
                  }}
                />
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-[var(--ds-color-neutral-0-10)] pt-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <CompanyInfo />
          <CompanyLegalInfo />
        </div>
      </PageContainer>
    </footer>
  );
};

const ContactLink = ({ href, label }: { href: string; label: string }) => (
  <a
    href={href}
    className="flex items-center gap-4 font-[var(--ds-font-family-display)] font-[var(--ds-font-weight-medium)] text-[18px] leading-[27px] hover:text-[var(--ds-color-accent-base)] transition-colors w-fit"
  >
    <span>{label}</span>
    <ArrowUpRightIcon />
  </a>
);

type SocialLink = {
  label: string;
  href: string;
  description: string;
};

const CommunityCard = ({ socialLinks }: { socialLinks: SocialLink[] }) => {
  const { t } = useTranslation();

  return (
    <div className="bg-[var(--ds-color-neutral-0-05)] rounded-lg p-8 w-full max-w-md backdrop-blur-sm">
      <h3 className="type-ui-sm text-[var(--ds-color-neutral-500)] mb-6">
        {t("footer.community.title", "Join the Community")}
      </h3>
      <div className="space-y-4 flex flex-col">
        {socialLinks.map((social, index) => (
          <div
            key={social.label}
            className={`flex flex-col md:flex-row md:items-center justify-between gap-2 ${
              index < socialLinks.length - 1
                ? "border-b border-[var(--ds-color-neutral-0-10)] pb-4"
                : "pt-2"
            }`}
          >
            <FooterLink label={social.label} href={social.href} />
            <span className="text-[var(--ds-color-neutral-700)] text-[12px] leading-[16px] font-[var(--ds-font-family-body)]">
              {social.description}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

interface FooterLinkProps {
  label: string;
  icon?: ReactNode;
  href?: string;
  onLegalClick?: () => void;
}

const FooterLink = ({ icon, label, href, onLegalClick }: FooterLinkProps) => {
  const isExternal = Boolean(href && href.startsWith("http"));

  if (!href && onLegalClick) {
    return (
      <button
        type="button"
        onClick={onLegalClick}
        className="flex items-center gap-3 text-[var(--ds-color-neutral-0)] hover:text-[var(--ds-color-accent-base)] focus:text-[var(--ds-color-accent-base)] focus:outline-none focus:underline transition-colors group w-fit cursor-pointer"
        aria-label={label}
      >
        {icon}
        <span className="font-[var(--ds-font-family-body)] font-[var(--ds-font-weight-bold)] text-[14px] leading-[21px] tracking-[-0.1504px]">
          {label}
        </span>
      </button>
    );
  }

  return (
    <a
      href={href || "#"}
      className="flex items-center gap-3 text-[var(--ds-color-neutral-0)] hover:text-[var(--ds-color-accent-base)] focus:text-[var(--ds-color-accent-base)] focus:outline-none focus:underline transition-colors group w-fit cursor-pointer"
      target={isExternal ? "_blank" : undefined}
      rel={isExternal ? "noopener noreferrer" : undefined}
      aria-label={label}
    >
      {icon}
      <span className="font-[var(--ds-font-family-body)] font-[var(--ds-font-weight-bold)] text-[14px] leading-[21px] tracking-[-0.1504px]">
        {label}
      </span>
    </a>
  );
};

const CompanyInfo = () => {
  const { t } = useTranslation();

  return (
    <div className="space-y-1">
      <p className="font-[var(--ds-font-family-display)] font-[var(--ds-font-weight-bold)] text-[12px] leading-[18px] text-[var(--ds-color-neutral-0)]">
        {t("footer.company.name", "JAZYK A INTEGRACE S.R.O.")}
      </p>
      <p className="font-[var(--ds-font-family-display)] text-[12px] leading-[18px] text-[var(--ds-color-neutral-700)]">
        {t("footer.company.id", "IČO: 23812036")}
      </p>
      <p className="font-[var(--ds-font-family-display)] text-[12px] leading-[18px] text-[var(--ds-color-neutral-700)]">
        {t("footer.company.register", "Sp. zn. C 433136 vedená u Městského soudu v Praze")}
      </p>
    </div>
  );
};

const CompanyLegalInfo = () => {
  const { t } = useTranslation();
  const currentYear = new Date().getFullYear();

  return (
    <div className="md:text-right space-y-1">
      <p className="font-[var(--ds-font-family-display)] text-[12px] leading-[18px] text-[var(--ds-color-neutral-0)]">
        {t("footer.company.address", "Černomořská 384/9, Praha 10")}
      </p>
      <p className="font-[var(--ds-font-family-display)] text-[12px] leading-[18px] text-[var(--ds-color-neutral-700)]">
        {t("footer.rights", "© {{year}} All Rights Reserved", {
          year: currentYear,
        })}
      </p>
    </div>
  );
};

const getSocialMediaLinks = (t: (key: string, defaultValue: string) => string): SocialLink[] => [
  {
    label: t("footer.social.instagram.label", "Instagram"),
    href: "https://www.instagram.com/jazykaintegrace",
    description: t("footer.social.instagram.desc", "— Daily micro-lessons"),
  },
  {
    label: t("footer.social.facebook.label", "Facebook"),
    href: "https://www.facebook.com/jazykaintegrace",
    description: t("footer.social.facebook.desc", "— Student success stories"),
  },
  {
    label: t("footer.social.vk.label", "VKontakte"),
    href: "https://vk.com/jazykaintegrace",
    description: t("footer.social.vk.desc", "— Student networking hub"),
  },
  {
    label: t("footer.social.whatsapp.label", "WhatsApp"),
    href: "https://wa.me/420605839456",
    description: t("footer.social.whatsapp.desc", "— Instant answers & support"),
  },
];

const getLegalDocumentLinks = (t: (key: string, defaultValue: string) => string) => [
  {
    label: t("footer.legal.terms", "Terms & Conditions"),
    section: "terms" as const,
  },
  {
    label: t("footer.legal.privacy", "Privacy Policy"),
    section: "privacy" as const,
  },
  {
    label: t("footer.legal.cookies", "Cookie Policy"),
    section: "cookies" as const,
  },
  {
    label: t("footer.legal.accessibility", "Accessibility"),
    section: "accessibility" as const,
  },
  {
    label: t("footer.legal.cookiePreferences", "Cookie Preferences"),
    section: "cookie-preferences" as const,
  },
];
