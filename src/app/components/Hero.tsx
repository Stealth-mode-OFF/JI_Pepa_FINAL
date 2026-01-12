import React from "react";
import { Container } from "./Layout";
import { ArrowDownIcon } from "./Icons";
import { useLocale } from '../LocaleContext';

export const Hero = () => {
	const { locale } = useLocale();

  return (
    <section className="pt-32 pb-12 md:pt-48 md:pb-24 min-h-screen flex flex-col justify-between">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16">
          <div className="lg:col-span-8">
            <h1 className="font-['Montserrat'] font-bold text-5xl md:text-7xl lg:text-8xl xl:text-[115px] leading-[0.9] tracking-tighter text-black">
              YOU LIVE<br />
              IN PRAGUE.<br />
              <span className="text-transparent bg-clip-text bg-linear-to-r from-[#C608D6] to-[#9810FA]">
                SPEAK LIKE IT.
              </span>
            </h1>
          </div>
          
          <div className="lg:col-span-4 flex flex-col justify-end gap-8 pb-4">
            <p className="font-['Montserrat'] font-medium text-lg text-black leading-relaxed">
              Language integration for professionals who are tired of being treated like tourists in their own city.
            </p>
            <a href="#courses" className="bg-[#FFED00] hover:bg-[#e6d600] transition-colors text-black px-8 py-4 font-['Inter'] font-bold text-sm uppercase tracking-widest inline-flex items-center justify-center w-fit">
              View Courses
            </a>
          </div>
        </div>
      </Container>
      
      <Container className="mt-16 md:mt-auto">
        <div className="border-t border-black pt-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex flex-col md:flex-row gap-8 md:gap-16">
            <div className="space-y-1">
               <span className="block font-['Inter'] font-bold text-xs text-gray-400 uppercase tracking-widest">Est. 2012</span>
            </div>
            <div className="space-y-1">
               <span className="block font-['Inter'] font-bold text-xs text-gray-400 uppercase tracking-widest">Prague, CZ</span>
            </div>
            <div className="space-y-1">
               <span className="block font-['Inter'] font-bold text-xs text-gray-400 uppercase tracking-widest">A1 — B2 Levels</span>
            </div>
          </div>
          <ArrowDownIcon />
        </div>
      </Container>
    </section>
  );
};
