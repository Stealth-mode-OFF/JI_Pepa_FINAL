import React from "react";
import { Container } from "./Layout";
import { ArrowUpRightIcon } from "./Icons";
import { useLocale } from '../LocaleContext';
import socials from '../data/socials';
import legal from '../data/legal';

const FooterLink = ({ 
  icon, 
  label, 
  href = "#", 
  onClick 
}: { 
  icon?: React.ReactNode; 
  label: string; 
  href?: string;
  onClick?: (e: React.MouseEvent) => void;
}) => (
  <a 
    href={href} 
    onClick={onClick}
    className="flex items-center gap-3 text-white hover:text-[#FFED00] transition-colors group w-fit cursor-pointer"
  >
    {icon}
    <span className="font-['Inter'] font-bold text-sm text-white group-hover:text-[#FFED00]">{label}</span>
  </a>
);

export const Footer = ({ onOpenLegal }: { onOpenLegal?: (section: 'privacy' | 'terms') => void }) => {
  const { locale } = useLocale();
  return (
    <footer className="bg-black text-white pt-32 pb-12 border-t border-white/10">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-32 mb-32">
          <div className="space-y-12">
            <h2 className="font-['Montserrat'] font-bold text-5xl md:text-7xl leading-tight tracking-tighter">
              READY TO<br />
              <span className="text-[#FFED00]">INTEGRATE?</span>
            </h2>
            
            <div className="flex flex-col gap-6">
              <a href="mailto:jazykaintegrace@gmail.com" className="flex items-center gap-4 text-xl md:text-2xl font-['Montserrat'] font-medium hover:text-[#FFED00] transition-colors w-fit">
                <span>jazykaintegrace@gmail.com</span>
                <ArrowUpRightIcon />
              </a>
              <a href="tel:+420601177208" className="flex items-center gap-4 text-xl md:text-2xl font-['Montserrat'] font-medium hover:text-[#FFED00] transition-colors w-fit">
                <span>+420 601 177 208</span>
                <ArrowUpRightIcon />
              </a>
            </div>
          </div>
          
          <div className="flex flex-col lg:items-end gap-12">
            <div className="bg-white/5 rounded-lg p-8 w-full max-w-md backdrop-blur-sm">
               <h3 className="font-['Inter'] font-bold text-xs uppercase tracking-widest text-[#99a1af] mb-6">Join the Community</h3>
               <div className="space-y-4 flex flex-col">
                  {socials.slice(0, 4).map((social, idx) => (
                    <div key={idx} className="flex flex-col md:flex-row md:items-center justify-between gap-2 border-b border-white/10 pb-4 last:border-0 last:pt-2">
                      <a href={social.href} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-white hover:text-[#FFED00] transition-colors group w-fit cursor-pointer">
                        <span className="font-['Inter'] font-bold text-sm text-white group-hover:text-[#FFED00]">{social.label}</span>
                      </a>
                      {social.description && <span className="text-gray-500 text-xs">— {social.description}</span>}
                    </div>
                  ))}
               </div>
            </div>
            
            <div className="flex flex-wrap gap-6 md:gap-8">
               <FooterLink 
                 label="Legal" 
                 href="#" 
                 onClick={(e) => { e.preventDefault(); onOpenLegal?.('terms'); }} 
               />
               <FooterLink 
                 label="Privacy Policy" 
                 href="#" 
                 onClick={(e) => { e.preventDefault(); onOpenLegal?.('privacy'); }} 
               />
               <FooterLink 
                 label="Cookie Policy" 
                 href="#" 
                 onClick={(e) => { e.preventDefault(); onOpenLegal?.('privacy'); }} 
               />
               <FooterLink label="Accessibility" />
               <FooterLink label="Admin" href="?admin=true" />
            </div>
          </div>
        </div>
        
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
           <div className="space-y-1">
             <p className="font-['Montserrat'] font-bold text-xs uppercase">{legal.companyName}</p>
             <p className="text-gray-500 text-xs">IČO: {legal.idNumber}</p>
             {legal.vatId && <p className="text-gray-500 text-xs">DIČ: {legal.vatId}</p>}
             <p className="text-gray-500 text-xs">{`${legal.registry.court} — ${legal.registry.fileNumber}`}</p>
           </div>
           
           <div className="md:text-right space-y-1">
             <p className="font-['Montserrat'] text-xs text-white">{legal.registeredAddress}</p>
             <p className="text-gray-500 text-xs">Email: {legal.contact.email}</p>
             <p className="text-gray-500 text-xs">Phone: {legal.contact.phone}</p>
             <p className="text-gray-500 text-xs">© 2026 All Rights Reserved</p>
           </div>
        </div>
      </Container>
    </footer>
  );
};
