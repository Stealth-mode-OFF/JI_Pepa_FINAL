import { AnimatePresence,motion } from "motion/react";
import { useEffect, useState } from "react";

import { CookieConsent } from "@/app/components/CookieConsent";
import { CourseList } from "@/app/components/CourseList";
import { FAQ } from "@/app/components/FAQ";
import { Instructor } from "@/app/components/Instructor";
import { LeadMagnet } from "@/app/components/LeadMagnet";
import { LegalDocsModal } from "@/app/components/LegalDocsModal";
import { Philosophy } from "@/app/components/Philosophy";
import { SEO } from "@/app/components/SEO";
import { Testimonials } from "@/app/components/Testimonials";
import { SiteFooter } from "@/features/footer/SiteFooter";
import { SiteHeader } from "@/features/header/SiteHeader";
import { HeroSection } from "@/features/hero/HeroSection";
import { PricingSection } from "@/features/pricing/PricingSection";

/**
 * LandingPage
 *
 * Main landing page for the website.
 * Composition: All major sections of the marketing site.
 *
 * Responsibilities:
 * - Orchestrate page-level sections
 * - Manage modal states for legal docs
 * - Handle page load animations
 */
export const LandingPage = () => {
  const [isPageLoaded, setIsPageLoaded] = useState(false);
  const [isLegalModalOpen, setIsLegalModalOpen] = useState(false);
  const [currentLegalSection, setCurrentLegalSection] = useState<
    "privacy" | "terms" | "cookies" | "accessibility"
  >("privacy");

  // ============================================
  // HANDLERS
  // ============================================
  const handleOpenLegalDocs = (
    section: "privacy" | "terms" | "cookies" | "accessibility"
  ) => {
    setCurrentLegalSection(section);
    setIsLegalModalOpen(true);
  };

  // ============================================
  // EFFECTS: Page load animation
  // ============================================
  useEffect(() => {
    setIsPageLoaded(true);
  }, []);

  return (
    <>
      <SEO />
      <AnimatePresence>
        {isPageLoaded && (
          <motion.div
            id="landing-page-root"
            className="min-h-screen bg-white relative"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          >
            <SiteHeader />
            <main>
              <HeroSection />
              <Philosophy />
              <LeadMagnet />
              <CourseList />
              <Testimonials />
              <PricingSection />
              <Instructor />
              <FAQ />
            </main>
            <SiteFooter onOpenLegal={(section) => handleOpenLegalDocs(section)} />
            <CookieConsent
              onOpenLegal={(section) => handleOpenLegalDocs(section)}
            />

            <LegalDocsModal
              isOpen={isLegalModalOpen}
              onClose={() => setIsLegalModalOpen(false)}
              initialSection={currentLegalSection}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
