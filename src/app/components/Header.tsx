import React from "react";
import imgLogo from "figma:asset/124f29e0ef24dafb79bc86048bd5b9381b5354c6.png";
import { FlagIcon } from "./Icons";

export const Header = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-sm border-b border-gray-100 h-20 flex items-center">
      <div className="w-full px-6 md:px-12 flex items-center justify-between">
        <img src={imgLogo} alt="Logo" className="w-12 h-12 object-contain" />
        
        <div className="flex items-center gap-8">
          <nav className="hidden md:flex items-center gap-8">
            {["Method", "Courses", "Contact"].map((item) => (
              <a key={item} href="#" className="font-['Inter'] font-bold text-xs uppercase tracking-widest hover:text-gray-600 transition-colors">
                {item}
              </a>
            ))}
          </nav>
          
          <div className="h-6 w-px bg-gray-200 hidden md:block" />
          
          <button className="flex items-center gap-2 px-2 py-1 rounded-full hover:bg-gray-50 transition-colors">
            <FlagIcon />
            <span className="sr-only">Change Language</span>
            <svg width="10" height="6" viewBox="0 0 10 6" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M1 1L5 5L9 1" />
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
};
