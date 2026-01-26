import svgPaths from "../../imports/svg-icons";

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
    <path d="M10 3L4.5 8.5L2 6" stroke="var(--ds-color-accent-base)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export type FlagCode = "en" | "cs" | "uk" | "ru" | "it";

const FlagContainer = ({ children }: { children: React.ReactNode }) => (
  <div className="relative w-6 h-4 overflow-hidden rounded-[2px] shadow-sm">{children}</div>
);

const UnitedKingdomFlag = () => (
  <FlagContainer>
    <svg className="absolute inset-0 w-full h-full" viewBox="0 0 24 16" fill="none" preserveAspectRatio="none">
      <path d="M24 0H0V16H24V0Z" fill="var(--ds-flag-uk-blue)" />
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
        <path d={svgPaths.pd60a900} stroke="var(--ds-flag-uk-red)" />
      </svg>
    </div>
    <svg className="absolute inset-0 w-full h-full" viewBox="0 0 24 16" fill="none" preserveAspectRatio="none">
      <path d="M12 0V16ZM0 8H24Z" fill="black" />
      <path d="M12 0V16M0 8H24" stroke="white" strokeWidth="5" />
    </svg>
    <svg className="absolute inset-0 w-full h-full" viewBox="0 0 24 16" fill="none" preserveAspectRatio="none">
      <path d="M12 0V16ZM0 8H24Z" fill="black" />
      <path d="M12 0V16M0 8H24" stroke="var(--ds-flag-uk-red)" strokeWidth="3" />
    </svg>
  </FlagContainer>
);

const CzechFlag = () => (
  <FlagContainer>
    <svg className="absolute inset-0 w-full h-full" viewBox="0 0 24 16" fill="none" preserveAspectRatio="none">
      <rect width="24" height="16" fill="var(--ds-color-neutral-0)" />
      <rect y="8" width="24" height="8" fill="var(--ds-flag-cz-red)" />
      <path d="M0 0L12 8L0 16Z" fill="var(--ds-flag-cz-blue)" />
    </svg>
  </FlagContainer>
);

const UkraineFlag = () => (
  <FlagContainer>
    <svg className="absolute inset-0 w-full h-full" viewBox="0 0 24 16" fill="none" preserveAspectRatio="none">
      <rect width="24" height="8" y="0" fill="var(--ds-flag-ua-blue)" />
      <rect width="24" height="8" y="8" fill="var(--ds-flag-ua-yellow)" />
    </svg>
  </FlagContainer>
);

const RussiaFlag = () => (
  <FlagContainer>
    <svg className="absolute inset-0 w-full h-full" viewBox="0 0 24 16" fill="none" preserveAspectRatio="none">
      <rect width="24" height="16" fill="var(--ds-color-neutral-0)" />
      <rect width="24" height="5.3333" y="5.3333" fill="var(--ds-flag-ru-blue)" />
      <rect width="24" height="5.3333" y="10.6666" fill="var(--ds-flag-ru-red)" />
    </svg>
  </FlagContainer>
);

const ItalyFlag = () => (
  <FlagContainer>
    <svg className="absolute inset-0 w-full h-full" viewBox="0 0 24 16" fill="none" preserveAspectRatio="none">
      <rect width="24" height="16" fill="var(--ds-color-neutral-0)" />
      <rect width="8" height="16" x="0" fill="var(--ds-flag-it-green)" />
      <rect width="8" height="16" x="16" fill="var(--ds-flag-it-red)" />
    </svg>
  </FlagContainer>
);

export const FlagIcon = ({ code = "en" }: { code?: FlagCode }) => {
  switch (code) {
    case "cs":
      return <CzechFlag />;
    case "uk":
      return <UkraineFlag />;
    case "ru":
      return <RussiaFlag />;
    case "it":
      return <ItalyFlag />;
    case "en":
    default:
      return <UnitedKingdomFlag />;
  }
};

export const FreeResourceIcon = () => (
  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
     <path d={svgPaths.p2752e200} stroke="black" strokeLinecap="round" strokeLinejoin="round" />
     <path d="M3.5 5L6 7.5L8.5 5" stroke="black" strokeLinecap="round" strokeLinejoin="round" />
     <path d="M6 7.5V1.5" stroke="black" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
