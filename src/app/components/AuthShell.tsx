import type { ReactNode } from "react";

import { Container } from "./Layout";

export const AuthShell = ({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle?: string;
  children: ReactNode;
}) => (
  <div className="min-h-screen bg-gradient-to-br from-[var(--ds-color-neutral-0)] via-[var(--ds-color-neutral-0)] to-[var(--ds-color-accent-base-05)] flex flex-col">
    {/* Accent bar */}
    <div className="h-2 bg-gradient-to-r from-[var(--ds-color-accent-base)] via-[var(--ds-color-neutral-900)] to-[var(--ds-color-accent-base)]"></div>

    <header className="h-20 border-b border-[var(--ds-color-neutral-900)] flex items-center bg-[var(--ds-color-neutral-0)]">
      <Container className="flex items-center justify-between">
        <a href="/" className="font-[var(--ds-font-family-display)] font-[var(--ds-font-weight-bold)] text-[14px] uppercase tracking-[1.2px] text-[var(--ds-color-neutral-900)] hover:text-[var(--ds-color-accent-base)] transition-colors">
          Jazyk a Integrace
        </a>
        <a
          href="/"
          className="font-[var(--ds-font-family-body)] font-[var(--ds-font-weight-bold)] text-[11px] uppercase tracking-[1.2px] text-[var(--ds-color-neutral-900-60)] hover:text-[var(--ds-color-neutral-900)] transition-colors"
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
          <div className="absolute -inset-1 bg-[var(--ds-color-accent-base)] rounded-none" style={{transform: 'translate(12px, 12px)'}}></div>
          
          {/* Main card */}
          <div className="relative bg-[var(--ds-color-neutral-0)] border-2 border-[var(--ds-color-neutral-900)] p-10 md:p-14">
            {/* Yellow top accent line */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-[var(--ds-color-accent-base)]"></div>

            <h1 className="font-[var(--ds-font-family-display)] font-[var(--ds-font-weight-bold)] text-[44px] md:text-[56px] leading-[1.1] tracking-[-2px] text-[var(--ds-color-neutral-900)] mt-2">
              {title}
            </h1>
            {subtitle && (
              <p className="font-[var(--ds-font-family-display)] text-[16px] leading-[26px] text-[var(--ds-color-neutral-900-70)] mt-5 max-w-sm">
                {subtitle}
              </p>
            )}

            {/* Form section */}
            <div className="mt-12 space-y-2">
              {children}
            </div>

            {/* Bottom accent line */}
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-[var(--ds-color-accent-base)] to-transparent"></div>
          </div>
        </div>

        {/* Trust badge */}
        <div className="mt-10 text-center">
          <p className="font-[var(--ds-font-family-display)] text-[12px] text-[var(--ds-color-neutral-900-50)] flex items-center justify-center gap-2">
            <span>🔒</span> Secure Supabase Authentication
          </p>
        </div>
      </Container>
    </main>
  </div>
);
