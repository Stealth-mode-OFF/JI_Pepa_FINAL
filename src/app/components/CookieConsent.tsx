import React, { useState, useEffect } from "react";
import { Container } from "./Layout";
import { Switch } from "./ui/switch";
import { motion, AnimatePresence } from "motion/react";
import clsx from "clsx";
import { useLocale } from '../LocaleContext';

export const CookieConsent = ({ onOpenLegal }: { onOpenLegal?: (section: 'privacy' | 'terms') => void }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [preferences, setPreferences] = useState({ necessary: true, analytics: false, marketing: false });
  const { locale } = useLocale();

  useEffect(() => {
    const consent = localStorage.getItem('cookie_consent');
    const savedPrefs = localStorage.getItem('cookie_preferences');
    if (!consent) {
      setIsVisible(true);
    }
    if (savedPrefs) {
      setPreferences(JSON.parse(savedPrefs));
    }
  }, []);

  const savePreferences = (prefs: typeof preferences) => {
    localStorage.setItem('cookie_preferences', JSON.stringify(prefs));
    localStorage.setItem('cookie_consent', 'accepted');
    setPreferences(prefs);
    setIsVisible(false);
    setShowSettings(false);
  };

  const handleAcceptAll = () => {
    const allAccepted = { necessary: true, analytics: true, marketing: true };
    savePreferences(allAccepted);
  };

  const handleRejectOptional = () => {
    const onlyNecessary = { necessary: true, analytics: false, marketing: false };
    savePreferences(onlyNecessary);
  };

  const handleToggle = (type: 'necessary' | 'analytics' | 'marketing') => {
    if (type === 'necessary') return; // Can't toggle necessary cookies
    setPreferences({ ...preferences, [type]: !preferences[type] });
  };

  if (!isVisible) return null;

  return (
    <>
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-black p-6 shadow-2xl z-50 transform translate-y-0 transition-transform">
        <Container>
           <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="space-y-2">
                 <h4 className="font-['Montserrat'] font-bold text-xs uppercase tracking-widest">Cookies & Privacy</h4>
                 <p className="font-['Montserrat'] text-sm text-gray-600">
                   We use cookies to improve the site and analyze traffic. Some are essential, others optional.
                   <button 
                     onClick={() => onOpenLegal?.('privacy')}
                     className="ml-2 underline text-gray-800 hover:text-black"
                   >
                     Read Policy
                   </button>
                 </p>
              </div>
              <div className="flex items-center gap-3">
                 <button 
                   onClick={() => setShowSettings(true)}
                   className="px-4 py-2 font-['Montserrat'] font-bold text-[11px] uppercase tracking-widest text-gray-500 hover:text-black"
                 >
                   Settings
                 </button>
                 <button 
                   onClick={handleRejectOptional}
                   className="px-6 py-3 border border-gray-200 font-['Montserrat'] font-bold text-[11px] uppercase tracking-widest hover:border-black transition-colors"
                 >
                   Reject Optional
                 </button>
                 <button 
                   onClick={handleAcceptAll}
                   className="px-6 py-3 bg-black text-white font-['Montserrat'] font-bold text-[11px] uppercase tracking-widest hover:bg-gray-800 shadow-lg"
                 >
                   Accept All
                 </button>
              </div>
           </div>
        </Container>
      </div>

      {/* Settings Modal */}
      <AnimatePresence>
        {showSettings && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowSettings(false)}
              className="fixed inset-0 bg-black/50 z-[60] backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, y: 100, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 100, scale: 0.95 }}
              className="fixed inset-4 md:inset-auto md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:w-full md:max-w-md bg-white z-[61] rounded-lg shadow-2xl p-8"
            >
              <h3 className="font-['Montserrat'] font-bold text-xl mb-6">Cookie Preferences</h3>
              
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-['Montserrat'] font-semibold text-sm">Necessary</p>
                    <p className="text-xs text-gray-600">Required for the site to function</p>
                  </div>
                  <Switch checked={true} disabled />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-['Montserrat'] font-semibold text-sm">Analytics</p>
                    <p className="text-xs text-gray-600">Help us improve the site</p>
                  </div>
                  <Switch 
                    checked={preferences.analytics} 
                    onCheckedChange={() => handleToggle('analytics')}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-['Montserrat'] font-semibold text-sm">Marketing</p>
                    <p className="text-xs text-gray-600">Personalized content and ads</p>
                  </div>
                  <Switch 
                    checked={preferences.marketing} 
                    onCheckedChange={() => handleToggle('marketing')}
                  />
                </div>
              </div>
              
              <div className="flex gap-3 mt-8">
                <button
                  onClick={() => setShowSettings(false)}
                  className="flex-1 px-6 py-3 border border-gray-200 font-['Montserrat'] font-bold text-[11px] uppercase tracking-widest hover:border-black transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={() => savePreferences(preferences)}
                  className="flex-1 px-6 py-3 bg-black text-white font-['Montserrat'] font-bold text-[11px] uppercase tracking-widest hover:bg-gray-800"
                >
                  Save
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};
