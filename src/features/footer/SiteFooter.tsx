import React from "react";
import { useTranslation } from "react-i18next";
import { PageContainer } from "@/shared/layouts/Page";
import { ArrowUpRightIcon } from "@/app/components/Icons";

/**
 * SiteFooter
 *
 * Main footer section with contact info, social links, legal docs, and company info.
 *
 * Domain Concept: Footer navigation and organizational information.
 *
 * Responsibilities:
 * - Display contact information
 * - Provide social media links
 * - Link to legal documents
 * - Show company information
 *
 * Props:
 * - onOpenLegal: Callback to open legal documents modal
 */
export const SiteFooter = ({
  onOpenLegal,
}: {
  onOpenLegal?: (section: "privacy" | "terms" | "cookies" | "accessibility") => void;
}) => {
  const { t } = useTranslation();
  const currentYear = new Date().getFullYear();

  const socialMediaLinks = getSocialMediaLinks(t);
  const legalDocumentLinks = getLegalDocumentLinks(t);

  return (
    <footer
      id="contact"
      className="bg-black text-white pt-32 pb-12 border-t border-white/10"
    >
      <PageContainer>
        {/* Main content grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-32 mb-32">
          {/* Left column: CTA heading and contact info */}
          <div className="space-y-12">
            <h2 className="font-['Montserrat'] font-bold text-[36px] sm:text-[48px] md:text-[56px] lg:text-[64px] xl:text-[72px] leading-[0.9] tracking-[-3.6px]">
              {t("footer.titleLine1", "READY TO")}
              <br />
              <span className="text-[#FFED00]">
                {t("footer.titleLine2", "INTEGRATE?")}
              </span>
            </h2>

            {/* Contact methods */}
            <div className="flex flex-col gap-6">
              <ContactLink
                href="mailto:jazykaintegrace@gmail.com"
                label="jazykaintegrace@gmail.com"
              />
              <ContactLink
                href="tel:+420601177208"
                label="+420 601 177 208"
              />
            </div>
          </div>

          {/* Right column: Community and legal links */}
          <div className="flex flex-col lg:items-end gap-12">
            {/* Community card */}
            <CommunityCard socialLinks={socialMediaLinks} />

            {/* Legal links */}
            <div className="flex flex-wrap gap-6 md:gap-8">
              {legalDocumentLinks.map((link) => (
                <FooterLink
                  key={link.section}
                  label={link.label}
                  onLegalClick={() => onOpenLegal?.(link.section)}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Footer bottom: Company info and copyright */}
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <CompanyInfo currentYear={currentYear} />
          <CompanyLegalInfo />
        </div>
      </PageContainer>
    </footer>
  );
};

// ============================================
// SUBCOMPONENTS
// ============================================

/**
 * ContactLink
 * Clickable contact method (email or phone)
 */
function ContactLink({ href, label }: { href: string; label: string }) {
  return (
    <a
      href={href}
      className="flex items-center gap-4 text-[18px] leading-[27px] font-['Montserrat'] font-medium hover:text-[#FFED00] transition-colors w-fit"
    >
      <span>{label}</span>
      <ArrowUpRightIcon />
    </a>
  );
}

/**
 * CommunityCard
 * Card displaying social media links
 */
function CommunityCard({
  socialLinks,
}: {
  socialLinks: Array<{
    label: string;
    href: string;
    description: string;
  }>;
}) {
  const { t } = useTranslation();

  return (
    <div className="bg-white/5 rounded-lg p-8 w-full max-w-md backdrop-blur-sm">
      <h3 className="font-['Inter'] font-bold text-[12px] leading-[18px] uppercase tracking-[1.2px] text-[#99a1af] mb-6">
        {t("footer.community.title", "Join the Community")}
      </h3>
      <div className="space-y-4 flex flex-col">
        {socialLinks.map((social, index) => (
          <div
            key={social.label}
            className={`flex flex-col md:flex-row md:items-center justify-between gap-2 ${
              index < socialLinks.length - 1
                ? "border-b border-white/10 pb-4"
                : "pt-2"
            }`}
          >
            <FooterLink label={social.label} href={social.href} />
            <span className="text-[#6a7282] text-[12px] leading-[16px] font-['Inter']">
              {social.description}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

/**
 * FooterLink
 * Reusable footer link component (external, legal, or button)
 */
interface FooterLinkProps {
  label: string;
  icon?: React.ReactNode;
  href?: string;
  onLegalClick?: () => void;
}

function FooterLink({
  icon,
  label,
  href,
  onLegalClick,
}: FooterLinkProps) {
  const isExternal = Boolean(href && href.startsWith("http"));

  // Button variant (for legal documents)
  if (!href && onLegalClick) {
    return (
      <button
        type="button"
        onClick={onLegalClick}
        className="flex items-center gap-3 text-white hover:text-[#FFED00] focus:text-[#FFED00] focus:outline-none focus:underline transition-colors group w-fit cursor-pointer"
        aria-label={label}
      >
        {icon}
        <span className="font-['Inter'] font-bold text-[14px] leading-[21px] tracking-[-0.1504px]">
          {label}
        </span>
      </button>
    );
  }

  // Link variant
  return (
    <a
      href={href || "#"}
      className="flex items-center gap-3 text-white hover:text-[#FFED00] focus:text-[#FFED00] focus:outline-none focus:underline transition-colors group w-fit cursor-pointer"
      target={isExternal ? "_blank" : undefined}
      rel={isExternal ? "noopener noreferrer" : undefined}
      aria-label={label}
    >
      {icon}
      <span className="font-['Inter'] font-bold text-[14px] leading-[21px] tracking-[-0.1504px]">
        {label}
      </span>
    </a>
  );
}

/**
 * CompanyInfo
 * Left-side company information
 */
function CompanyInfo({ currentYear }: { currentYear: number }) {
  const { t } = useTranslation();

  return (
    <div className="space-y-1">
      <p className="font-['Montserrat'] font-bold text-[12px] leading-[18px] text-white">
        {t("footer.company.name", "JAZYK A INTEGRACE S.R.O.")}
      </p>
      <p className="font-['Montserrat'] text-[12px] leading-[18px] text-[#6a7282]">
        {t("footer.company.id", "IČO: 23812036")}
      </p>
      <p className="font-['Montserrat'] text-[12px] leading-[18px] text-[#6a7282]">
        {t(
          "footer.company.register",
          "Sp. zn. C 433136 vedená u Městského soudu v Praze"
        )}
      </p>
    </div>
  );
}

/**
 * CompanyLegalInfo
 * Right-side legal information and copyright
 */
function CompanyLegalInfo() {
  const { t } = useTranslation();
  const currentYear = new Date().getFullYear();

  return (
    <div className="md:text-right space-y-1">
      <p className="font-['Montserrat'] text-[12px] leading-[18px] text-white">
        {t("footer.company.address", "Černomořská 384/9, Praha 10")}
      </p>
      <p className="font-['Montserrat'] text-[12px] leading-[18px] text-[#6a7282]">
        {t("footer.rights", "© {{year}} All Rights Reserved", {
          year: currentYear,
        })}
      </p>
    </div>
  );
}

// ============================================
// HELPERS
// ============================================

/**
 * Get social media links data
 */
function getSocialMediaLinks(
  t: (key: string, defaultValue: string) => string
) {
  return [
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
      href: "https://wa.me/420601177208",
      description: t("footer.social.whatsapp.desc", "— Instant answers & support"),
    },
  ];
}

/**
 * Get legal document links data
 */
function getLegalDocumentLinks(
  t: (key: string, defaultValue: string) => string
) {
  return [
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
  ];
}
