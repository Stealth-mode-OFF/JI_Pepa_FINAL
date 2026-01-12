import React from "react";
import svgPaths from "../../imports/svg-basbljdlhp";

export const ArrowRightIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
    <path d="M4.16667 10H15.8333" stroke="currentColor" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round" />
    <path d={svgPaths.p1ae0b780} stroke="currentColor" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const ArrowDownIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <path d="M12 5V19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M19 12L12 19L5 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const ArrowUpRightIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
    <path d={svgPaths.p3e47bd00} stroke="currentColor" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round" />
    <path d={svgPaths.p3610fb80} stroke="currentColor" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const CheckIcon = () => (
  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
    <path d="M10 3L4.5 8.5L2 6" stroke="#FFED00" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const FlagIcon = () => (
  <div className="relative w-6 h-4 overflow-hidden rounded-[2px] shadow-sm">
    <svg className="absolute inset-0 w-full h-full" viewBox="0 0 24 16" fill="none" preserveAspectRatio="none">
      <path d="M24 0H0V16H24V0Z" fill="#012169" />
    </svg>
    <div className="absolute inset-[-7.8%_-3.47%] w-[115.6%] h-[106.9%]">
      <svg className="w-full h-full" viewBox="0 0 25.6641 18.4962" fill="none" preserveAspectRatio="none">
        <path d={svgPaths.p1e95f00} fill="black" />
        <path d={svgPaths.p355f6b00} stroke="white" strokeWidth="3" />
      </svg>
    </div>
    <div className="absolute inset-[-2.6%_-1.16%] w-[105.2%] h-[102.3%]">
      <svg className="w-full h-full" viewBox="0 0 24.5547 16.8321" fill="none" preserveAspectRatio="none">
        <path d={svgPaths.p75ee300} fill="black" />
        <path d={svgPaths.pd60a900} stroke="#C8102E" />
      </svg>
    </div>
    <svg className="absolute inset-0 w-full h-full" viewBox="0 0 24 16" fill="none" preserveAspectRatio="none">
      <path d="M12 0V16ZM0 8H24Z" fill="black" />
      <path d="M12 0V16M0 8H24" stroke="white" strokeWidth="5" />
    </svg>
    <svg className="absolute inset-0 w-full h-full" viewBox="0 0 24 16" fill="none" preserveAspectRatio="none">
      <path d="M12 0V16ZM0 8H24Z" fill="black" />
      <path d="M12 0V16M0 8H24" stroke="#C8102E" strokeWidth="3" />
    </svg>
  </div>
);

export const FreeResourceIcon = () => (
  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
     <path d={svgPaths.p2752e200} stroke="black" strokeLinecap="round" strokeLinejoin="round" />
     <path d="M3.5 5L6 7.5L8.5 5" stroke="black" strokeLinecap="round" strokeLinejoin="round" />
     <path d="M6 7.5V1.5" stroke="black" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const InstagramIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
    <rect x="3" y="3" width="18" height="18" rx="5" stroke="currentColor" strokeWidth="1.5" />
    <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.5" />
    <circle cx="17.5" cy="6.5" r="1.2" fill="currentColor" />
  </svg>
);

export const WhatsAppIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
    <path
      d="M20 11.5a8.5 8.5 0 1 1-15.3 5.1L4 21l4.6-1.3A8.5 8.5 0 0 1 20 11.5Z"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M9.5 8.7c.2-.3.6-.4.9-.2l1.3.8c.3.2.4.6.2.9l-.4.6a7 7 0 0 0 2.9 2.9l.6-.4c.3-.2.7-.1.9.2l.8 1.3c.2.3.1.7-.2.9-.6.4-1.2.6-1.9.5-2.6-.4-5.4-3.2-5.8-5.8-.1-.7.1-1.3.5-1.9Z"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
