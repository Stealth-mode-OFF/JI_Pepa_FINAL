import React from "react";
import { Container } from "./Layout";
import { ArrowUpRightIcon } from "./Icons";

const FooterLink = ({
  icon,
  label,
  href,
  onClick,
}: {
  icon?: React.ReactNode;
  label: string;
  href?: string;
  onClick?: (e: React.MouseEvent) => void;
}) => {
  const isExternal = Boolean(href && href.startsWith("http"));

  if (!href) {
    return (
      <button
        type="button"
        onClick={onClick}
        className="flex items-center gap-3 text-white hover:text-[#FFED00] focus:text-[#FFED00] focus:outline-none focus:underline transition-colors group w-fit cursor-pointer"
        aria-label={label}
      >
        {icon}
        <span className="font-['Inter'] font-bold text-[14px] leading-[21px] tracking-[-0.1504px] text-white group-hover:text-[#FFED00] group-focus:text-[#FFED00]">{label}</span>
      </button>
    );
  }

  return (
    <a
      href={href}
      onClick={onClick}
      className="flex items-center gap-3 text-white hover:text-[#FFED00] focus:text-[#FFED00] focus:outline-none focus:underline transition-colors group w-fit cursor-pointer"
      target={isExternal ? "_blank" : undefined}
      rel={isExternal ? "noopener noreferrer" : undefined}
      aria-label={label}
    >
      {icon}
      <span className="font-['Inter'] font-bold text-[14px] leading-[21px] tracking-[-0.1504px] text-white group-hover:text-[#FFED00] group-focus:text-[#FFED00]">{label}</span>
    </a>
  );
};

export const Footer = ({
  onOpenLegal,
}: {
  onOpenLegal?: (section: "privacy" | "terms" | "cookies" | "accessibility") => void;
}) => {
  const currentYear = new Date().getFullYear();

  return (
    <footer id="contact" className="bg-black text-white pt-32 pb-12 border-t border-white/10">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-32 mb-32">
          <div className="space-y-12">
            <h2 className="font-['Montserrat'] font-bold text-[36px] sm:text-[48px] md:text-[56px] lg:text-[64px] xl:text-[72px] leading-[0.9] tracking-[-3.6px]">
              READY TO<br />
              <span className="text-[#FFED00]">INTEGRATE?</span>
            </h2>
            
            <div className="flex flex-col gap-6">
              <a href="mailto:jazykaintegrace@gmail.com" className="flex items-center gap-4 text-[18px] leading-[27px] font-['Montserrat'] font-medium hover:text-[#FFED00] transition-colors w-fit">
                <span>jazykaintegrace@gmail.com</span>
                <ArrowUpRightIcon />
              </a>
              <a href="tel:+420601177208" className="flex items-center gap-4 text-[18px] leading-[27px] font-['Montserrat'] font-medium hover:text-[#FFED00] transition-colors w-fit">
                <span>+420 601 177 208</span>
                <ArrowUpRightIcon />
              </a>
            </div>
          </div>
          
          <div className="flex flex-col lg:items-end gap-12">
            <div className="bg-white/5 rounded-lg p-8 w-full max-w-md backdrop-blur-sm">
               <h3 className="font-['Inter'] font-bold text-[12px] leading-[18px] uppercase tracking-[1.2px] text-[#99a1af] mb-6">Join the Community</h3>
               <div className="space-y-4 flex flex-col">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 border-b border-white/10 pb-4">
                    <FooterLink label="Instagram" href="https://www.instagram.com/jazykaintegrace" />
                    <span className="text-[#6a7282] text-[12px] leading-[16px] font-['Inter']">— Daily micro-lessons</span>
                  </div>
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 border-b border-white/10 pb-4">
                    <FooterLink label="Facebook" href="https://www.facebook.com/jazykaintegrace" />
                    <span className="text-[#6a7282] text-[12px] leading-[16px] font-['Inter']">— Student success stories</span>
                  </div>
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 border-b border-white/10 pb-4">
                    <FooterLink label="VKontakte" href="https://vk.com/jazykaintegrace" />
                    <span className="text-[#6a7282] text-[12px] leading-[16px] font-['Inter']">— Student networking hub</span>
                  </div>
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 pt-2">
                    <FooterLink label="WhatsApp" href="https://wa.me/420601177208" />
                    <span className="text-[#6a7282] text-[12px] leading-[16px] font-['Inter']">— Instant answers & support</span>
                  </div>
               </div>
            </div>
            
            <div className="flex flex-wrap gap-6 md:gap-8">
               <FooterLink 
                 label="Terms & Conditions" 
                 onClick={() => onOpenLegal?.('terms')} 
               />
               <FooterLink 
                 label="Privacy Policy" 
                 onClick={() => onOpenLegal?.('privacy')} 
               />
               <FooterLink 
                 label="Cookie Policy" 
                 onClick={() => onOpenLegal?.('cookies')} 
               />
               <FooterLink
                 label="Accessibility"
                 onClick={() => onOpenLegal?.('accessibility')}
               />
            </div>
          </div>
        </div>
        
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
           <div className="space-y-1">
             <p className="font-['Montserrat'] font-bold text-[12px] leading-[18px] text-white">JAZYK A INTEGRACE S.R.O.</p>
             <p className="font-['Montserrat'] text-[12px] leading-[18px] text-[#6a7282]">IČO: 23812036</p>
             <p className="font-['Montserrat'] text-[12px] leading-[18px] text-[#6a7282]">Sp. zn. C 433136 vedená u Městského soudu v Praze</p>
           </div>
           
           <div className="md:text-right space-y-1">
             <p className="font-['Montserrat'] text-[12px] leading-[18px] text-white">Černomořská 384/9, Praha 10</p>
             <p className="font-['Montserrat'] text-[12px] leading-[18px] text-[#6a7282]">© {currentYear} All Rights Reserved</p>
           </div>
        </div>
      </Container>
    </footer>
  );
};
