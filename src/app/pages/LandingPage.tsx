import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { SiteHeader } from "@/features/header/SiteHeader";
import { HeroSection } from "@/features/hero/HeroSection";
import { PricingSection } from "@/features/pricing/PricingSection";
import { SiteFooter } from "@/features/footer/SiteFooter";
import { Philosophy } from "@/app/components/Philosophy";
import { LeadMagnet } from "@/app/components/LeadMagnet";
import { CourseList } from "@/app/components/CourseList";
import { Testimonials } from "@/app/components/Testimonials";
import { Instructor } from "@/app/components/Instructor";
import { FAQ } from "@/app/components/FAQ";
import { CookieConsent } from "@/app/components/CookieConsent";
import { LegalDocsModal } from "@/app/components/LegalDocsModal";
import { NewsletterPopup } from "@/app/components/NewsletterPopup";
import { SEO } from "@/app/components/SEO";
import { MobileActionBar } from "@/app/components/MobileActionBar";

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
            className="min-h-screen bg-white relative pb-28 md:pb-0"
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
            <MobileActionBar />
            <NewsletterPopup delay={10000} showOnScroll={false} />
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
