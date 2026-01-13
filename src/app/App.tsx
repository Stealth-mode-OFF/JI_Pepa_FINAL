import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Toaster } from 'sonner';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { Philosophy } from './components/Philosophy';
import { LeadMagnet } from './components/LeadMagnet';
import { CourseList } from './components/CourseList';
import { Footer } from './components/Footer';
import { CookieConsent } from './components/CookieConsent';
import { LegalDocsModal } from './components/LegalDocsModal';
import { NewsletterPopup } from './components/NewsletterPopup';
import { SEO } from './components/SEO';

export default function App() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [legalModalOpen, setLegalModalOpen] = useState(false);
  const [legalSection, setLegalSection] = useState<'privacy' | 'terms' | 'cookies' | 'accessibility'>('privacy');

  const openLegal = (section: 'privacy' | 'terms' | 'cookies' | 'accessibility') => {
    setLegalSection(section);
    setLegalModalOpen(true);
  };

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <>
      <SEO />
      <Toaster position="top-right" richColors closeButton />
      <AnimatePresence>
        {isLoaded && (
          <motion.div 
            id="root-container"
            className="min-h-screen bg-white relative"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          >
            <Header />
            <main>
              <Hero />
              <Philosophy />
              <LeadMagnet />
              <CourseList />
            </main>
            <Footer onOpenLegal={(section) => openLegal(section)} />
            <CookieConsent onOpenLegal={(section) => openLegal(section)} />
            <NewsletterPopup delay={10000} showOnScroll={false} />
            <LegalDocsModal 
              isOpen={legalModalOpen} 
              onClose={() => setLegalModalOpen(false)} 
              initialSection={legalSection}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
