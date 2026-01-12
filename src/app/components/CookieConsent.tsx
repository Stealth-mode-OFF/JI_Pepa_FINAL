import React, { useState, useEffect } from "react";
import { Container } from "./Layout";
import clsx from "clsx";

export const CookieConsent = ({ onOpenLegal }: { onOpenLegal?: (section: 'privacy' | 'terms') => void }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('cookie_consent');
    if (!consent) {
      setIsVisible(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('cookie_consent', 'accepted');
    setIsVisible(false);
  };

  const handleReject = () => {
    localStorage.setItem('cookie_consent', 'rejected');
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
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
               <button className="px-4 py-2 font-['Montserrat'] font-bold text-[11px] uppercase tracking-widest text-gray-500 hover:text-black">Settings</button>
               <button 
                 onClick={handleReject}
                 className="px-6 py-3 border border-gray-200 font-['Montserrat'] font-bold text-[11px] uppercase tracking-widest hover:border-black transition-colors"
               >
                 Reject Optional
               </button>
               <button 
                 onClick={handleAccept}
                 className="px-6 py-3 bg-black text-white font-['Montserrat'] font-bold text-[11px] uppercase tracking-widest hover:bg-gray-800 shadow-lg"
               >
                 Accept All
               </button>
            </div>
         </div>
      </Container>
    </div>
  );
};
