import React from "react";
import { Container } from "./Layout";

export const AuthShell = ({
  title,
  subtitle,
  children,
  isSignup = false,
}: {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  isSignup?: boolean;
}) => (
  <div className="min-h-screen bg-gradient-to-br from-white via-white to-[#FFED00]/5 flex flex-col">
    {/* Accent bar */}
    <div className="h-2 bg-gradient-to-r from-[#FFED00] via-black to-[#FFED00]"></div>

    <header className="h-20 border-b border-black flex items-center bg-white">
      <Container className="flex items-center justify-between">
        <a href="/" className="font-['Montserrat'] font-bold text-[14px] uppercase tracking-[1.2px] text-black hover:text-[#FFED00] transition-colors">
          Jazyk a Integrace
        </a>
        <a
          href="/"
          className="font-['Inter'] font-bold text-[11px] uppercase tracking-[1.2px] text-black/60 hover:text-black transition-colors"
        >
          ← Back
        </a>
      </Container>
    </header>

    <main className="flex-1 py-12 md:py-20">
      <Container className="max-w-[620px]">
        {/* Premium card with yellow accent */}
        <div className="relative">
          {/* Yellow accent shadow */}
          <div className="absolute -inset-1 bg-[#FFED00] rounded-none" style={{transform: 'translate(12px, 12px)'}}></div>
          
          {/* Main card */}
          <div className="relative bg-white border-2 border-black p-10 md:p-14">
            {/* Yellow top accent line */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-[#FFED00]"></div>

            <h1 className="font-['Montserrat'] font-bold text-[44px] md:text-[56px] leading-[1.1] tracking-[-2px] text-black mt-2">
              {title}
            </h1>
            {subtitle && (
              <p className="font-['Montserrat'] text-[16px] leading-[26px] text-black/70 mt-5 max-w-sm">
                {subtitle}
              </p>
            )}

            {/* Form section */}
            <div className="mt-12 space-y-2">
              {children}
            </div>

            {/* Bottom accent line */}
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-[#FFED00] to-transparent"></div>
          </div>
        </div>

        {/* Trust badge */}
        <div className="mt-10 text-center">
          <p className="font-['Montserrat'] text-[12px] text-black/50 flex items-center justify-center gap-2">
            <span>🔒</span> Secure Supabase Authentication
          </p>
        </div>
      </Container>
    </main>
  </div>
);
