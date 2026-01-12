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
import { AdminDashboard } from './components/AdminDashboard';
import { LegalDocsModal } from './components/LegalDocsModal';

export default function App() {
  const [showAdmin, setShowAdmin] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [legalModalOpen, setLegalModalOpen] = useState(false);
  const [legalSection, setLegalSection] = useState<'privacy' | 'terms'>('privacy');

  const openLegal = (section: 'privacy' | 'terms') => {
    setLegalSection(section);
    setLegalModalOpen(true);
  };

  // Check authentication status on mount and when URL changes
  const checkAuth = () => {
    const authenticated = localStorage.getItem('admin_authenticated');
    const authTime = localStorage.getItem('admin_auth_time');
    
    if (authenticated && authTime) {
      const timeSinceAuth = Date.now() - parseInt(authTime);
      const twentyFourHours = 24 * 60 * 60 * 1000;
      
      // Session expires after 24 hours
      if (timeSinceAuth < twentyFourHours) {
        setIsAuthenticated(true);
        return true;
      } else {
        // Clear expired session
        localStorage.removeItem('admin_authenticated');
        localStorage.removeItem('admin_auth_time');
        setIsAuthenticated(false);
        return false;
      }
    }
    return false;
  };

  useEffect(() => {
    setIsLoaded(true);
    checkAuth();

    // Load Handwritten Font
    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/css2?family=Kalam:wght@300;400;700&display=swap';
    link.rel = 'stylesheet';
    document.head.appendChild(link);

    return () => {
      document.head.removeChild(link);
    };
  }, []);

  // Check if URL has ?admin=true
  useEffect(() => {
    if (typeof window !== 'undefined' && window.location.search.includes('admin=true')) {
      const isAuth = checkAuth();
      if (isAuth) {
        setShowAdmin(true);
      } else {
        // Redirect to home if not authenticated
        window.location.href = '/';
      }
    }
  }, []);

  // Listen for storage changes
  useEffect(() => {
    const handleStorageChange = () => {
      checkAuth();
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  if (showAdmin && isAuthenticated) {
    return (
      <>
        <Toaster position="top-right" richColors closeButton />
        <AdminDashboard />
      </>
    );
  }

  return (
    <>
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
              <div id="about">
                 <Philosophy />
              </div>
              <LeadMagnet />
              <CourseList />
            </main>
            <div id="contact">
               <Footer onOpenLegal={(section) => openLegal(section as any)} />
            </div>
            <CookieConsent onOpenLegal={(section) => openLegal(section)} />
            <LegalDocsModal 
              isOpen={legalModalOpen} 
              onClose={() => setLegalModalOpen(false)} 
              initialSection={legalSection as any}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
