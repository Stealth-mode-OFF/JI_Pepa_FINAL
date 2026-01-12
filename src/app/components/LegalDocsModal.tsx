import React from "react";
import { motion, AnimatePresence } from "motion/react";

interface LegalDocsModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialSection: 'privacy' | 'terms';
}

export const LegalDocsModal = ({ isOpen, onClose, initialSection }: LegalDocsModalProps) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 z-[60] backdrop-blur-sm"
          />
          <motion.div
            initial={{ opacity: 0, y: 100, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 100, scale: 0.95 }}
            className="fixed inset-4 md:inset-12 bg-white z-[61] rounded-lg shadow-2xl overflow-hidden flex flex-col max-w-4xl mx-auto"
          >
            <div className="flex justify-between items-center p-6 border-b border-gray-100">
              <h2 className="font-['Montserrat'] font-bold text-xl uppercase tracking-widest">
                {initialSection === 'privacy' ? 'Privacy Policy' : 'Terms & Conditions'}
              </h2>
              <button 
                onClick={onClose}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <div className="p-8 overflow-y-auto flex-1 font-['Montserrat'] text-gray-600 leading-relaxed space-y-4">
              <p>This is a placeholder for the {initialSection === 'privacy' ? 'Privacy Policy' : 'Terms & Conditions'}.</p>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
                Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
              </p>
              <p>
                Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. 
                Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
              </p>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
