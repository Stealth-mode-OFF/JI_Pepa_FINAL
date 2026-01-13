import React from "react";
import { Container } from "./Layout";

export const AuthShell = ({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}) => (
  <div className="min-h-screen bg-white flex flex-col">
    <header className="h-20 border-b border-black/10 flex items-center">
      <Container className="flex items-center justify-between">
        <a href="/" className="font-['Inter'] font-bold text-[12px] uppercase tracking-[1.2px]">
          Jazyk a Integrace
        </a>
        <a
          href="/"
          className="font-['Inter'] font-bold text-[12px] uppercase tracking-[1.2px] text-[#6a7282]"
        >
          Back to site
        </a>
      </Container>
    </header>

    <main className="flex-1 py-20">
      <Container className="max-w-[760px]">
        <div className="border border-black shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] p-10 md:p-12 bg-white">
          <h1 className="font-['Montserrat'] font-bold text-[40px] md:text-[52px] leading-[1.1] tracking-[-1.5px]">
            {title}
          </h1>
          {subtitle && (
            <p className="font-['Montserrat'] text-[18px] leading-[28px] text-[#6a7282] mt-4">
              {subtitle}
            </p>
          )}
          <div className="mt-10">{children}</div>
        </div>
      </Container>
    </main>
  </div>
);
