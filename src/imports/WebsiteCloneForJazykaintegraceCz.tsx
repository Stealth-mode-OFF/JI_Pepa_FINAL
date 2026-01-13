import svgPaths from "./svg-basbljdlhp";
import clsx from "clsx";
import imgLogo from "@/assets/logo.png";

function CourseListBackgroundImage1({ children }: React.PropsWithChildren<{}>) {
  return (
    <div className="h-[20px] relative shrink-0 w-[332.25px]">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-between pl-0 pr-[16px] py-0 relative size-full">{children}</div>
    </div>
  );
}

function CourseListBackgroundImage({ children }: React.PropsWithChildren<{}>) {
  return (
    <div className="h-[21px] relative shrink-0 w-[443px]">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[48px] items-start relative size-full">{children}</div>
    </div>
  );
}
type BackgroundImage6Props = {
  additionalClassNames?: string;
};

function BackgroundImage6({ children, additionalClassNames = "" }: React.PropsWithChildren<BackgroundImage6Props>) {
  return (
    <div className={additionalClassNames}>
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">{children}</div>
    </div>
  );
}
type BackgroundImage5Props = {
  additionalClassNames?: string;
};

function BackgroundImage5({ children, additionalClassNames = "" }: React.PropsWithChildren<BackgroundImage5Props>) {
  return <BackgroundImage6 additionalClassNames={clsx("relative shrink-0", additionalClassNames)}>{children}</BackgroundImage6>;
}
type BackgroundImage4Props = {
  additionalClassNames?: string;
};

function BackgroundImage4({ children, additionalClassNames = "" }: React.PropsWithChildren<BackgroundImage4Props>) {
  return <BackgroundImage6 additionalClassNames={clsx("basis-0 grow min-h-px min-w-px relative shrink-0", additionalClassNames)}>{children}</BackgroundImage6>;
}
type BackgroundImage3Props = {
  additionalClassNames?: string;
};

function BackgroundImage3({ children, additionalClassNames = "" }: React.PropsWithChildren<BackgroundImage3Props>) {
  return <BackgroundImage6 additionalClassNames={clsx("h-[18px] relative shrink-0", additionalClassNames)}>{children}</BackgroundImage6>;
}
type BackgroundImage2Props = {
  additionalClassNames?: string;
};

function BackgroundImage2({ children, additionalClassNames = "" }: React.PropsWithChildren<BackgroundImage2Props>) {
  return <BackgroundImage6 additionalClassNames={clsx("h-[36px] relative shrink-0", additionalClassNames)}>{children}</BackgroundImage6>;
}
type BackgroundImage1Props = {
  additionalClassNames?: string;
};

function BackgroundImage1({ children, additionalClassNames = "" }: React.PropsWithChildren<BackgroundImage1Props>) {
  return (
    <div className={clsx("size-[12px]", additionalClassNames)}>
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
        <g id="Icon">{children}</g>
      </svg>
    </div>
  );
}
type BackgroundImageProps = {
  additionalClassNames?: string;
};

function BackgroundImage({ children, additionalClassNames = "" }: React.PropsWithChildren<BackgroundImageProps>) {
  return (
    <div className={clsx("relative shrink-0", additionalClassNames)}>
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 32 32">
        <g id="Icon" opacity="0">
          {children}
        </g>
      </svg>
    </div>
  );
}
type BackgroundImageAndText2Props = {
  text: string;
};

function BackgroundImageAndText2({ text }: BackgroundImageAndText2Props) {
  return (
    <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
      <p className="absolute font-['Montserrat:Regular',sans-serif] font-normal leading-[18px] left-0 text-[#6a7282] text-[12px] text-nowrap top-[0.5px]">{text}</p>
    </div>
  );
}
type ButtonBackgroundImageAndTextProps = {
  text: string;
  additionalClassNames?: string;
};

function ButtonBackgroundImageAndText({ text, additionalClassNames = "" }: ButtonBackgroundImageAndTextProps) {
  return (
    <div className={clsx("absolute h-[21px] left-0 w-[126.445px]", additionalClassNames)}>
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[21px] left-0 not-italic text-[14px] text-nowrap text-white top-0 tracking-[-0.1504px]">{text}</p>
    </div>
  );
}
type TextBackgroundImageAndText6Props = {
  text: string;
  additionalClassNames?: string;
};

function TextBackgroundImageAndText6({ text, additionalClassNames = "" }: TextBackgroundImageAndText6Props) {
  return (
    <BackgroundImage6 additionalClassNames={clsx("h-[16px] relative shrink-0", additionalClassNames)}>
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[16px] left-0 not-italic text-[#6a7282] text-[12px] top-px w-[150px]">{text}</p>
    </BackgroundImage6>
  );
}

function IconBackgroundImage3() {
  return (
    <BackgroundImage additionalClassNames="size-[12px]">
      <path d="M3.5 3.5H8.5V8.5" id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M3.5 8.5L8.5 3.5" id="Vector_2" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" />
    </BackgroundImage>
  );
}
type TextBackgroundImageAndText5Props = {
  text: string;
  additionalClassNames?: string;
};

function TextBackgroundImageAndText5({ text, additionalClassNames = "" }: TextBackgroundImageAndText5Props) {
  return (
    <BackgroundImage6 additionalClassNames={clsx("h-[21px] relative shrink-0", additionalClassNames)}>
      <p className="absolute font-['Inter:Bold',sans-serif] font-bold leading-[21px] left-0 not-italic text-[14px] text-nowrap text-white top-0 tracking-[-0.1504px]">{text}</p>
    </BackgroundImage6>
  );
}
type HeadingBackgroundImageAndTextProps = {
  text: string;
  additionalClassNames?: string;
};

function HeadingBackgroundImageAndText({ text, additionalClassNames = "" }: HeadingBackgroundImageAndTextProps) {
  return (
    <div className={clsx("absolute h-[18px] left-0 top-0", additionalClassNames)}>
      <p className="absolute font-['Inter:Bold',sans-serif] font-bold leading-[18px] left-0 not-italic text-[#6a7282] text-[12px] text-nowrap top-px tracking-[1.2px] uppercase">{text}</p>
    </div>
  );
}

function IconBackgroundImage2() {
  return (
    <div className="relative shrink-0 size-[20px]">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="Icon">
          <path d={svgPaths.p3e47bd00} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d={svgPaths.p3610fb80} id="Vector_2" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
        </g>
      </svg>
    </div>
  );
}
type TextBackgroundImageAndText4Props = {
  text: string;
};

function TextBackgroundImageAndText4({ text }: TextBackgroundImageAndText4Props) {
  return (
    <BackgroundImage4 additionalClassNames="h-[27px]">
      <p className="absolute font-['Montserrat:Medium',sans-serif] font-medium leading-[27px] left-0 text-[18px] text-nowrap text-white top-[-0.5px]">{text}</p>
    </BackgroundImage4>
  );
}

function IconBackgroundImage1() {
  return (
    <BackgroundImage additionalClassNames="size-[20px]">
      <path d="M4.16667 10H15.8333" id="Vector" stroke="var(--stroke-0, #0A0A0A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
      <path d={svgPaths.p1ae0b780} id="Vector_2" stroke="var(--stroke-0, #0A0A0A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
    </BackgroundImage>
  );
}
type TextBackgroundImageAndText3Props = {
  text: string;
  additionalClassNames?: string;
};

function TextBackgroundImageAndText3({ text, additionalClassNames = "" }: TextBackgroundImageAndText3Props) {
  return (
    <BackgroundImage6 additionalClassNames={clsx("h-[21px] relative shrink-0", additionalClassNames)}>
      <p className="absolute font-['Montserrat:Regular',sans-serif] font-normal leading-[21px] left-0 text-[#6a7282] text-[14px] text-nowrap top-0">{text}</p>
    </BackgroundImage6>
  );
}
type TextBackgroundImageAndText2Props = {
  text: string;
  additionalClassNames?: string;
};

function TextBackgroundImageAndText2({ text, additionalClassNames = "" }: TextBackgroundImageAndText2Props) {
  return (
    <div className={clsx("absolute h-[27px] top-[6.5px]", additionalClassNames)}>
      <p className="absolute font-['Montserrat:Medium',sans-serif] font-medium leading-[27px] left-0 text-[#4a5565] text-[18px] text-nowrap top-[-0.5px]">{text}</p>
    </div>
  );
}
type TextBackgroundImageAndText1Props = {
  text: string;
  additionalClassNames?: string;
};

function TextBackgroundImageAndText1({ text, additionalClassNames = "" }: TextBackgroundImageAndText1Props) {
  return (
    <div className={clsx("absolute h-[36px] left-0 top-0", additionalClassNames)}>
      <p className="absolute font-['Montserrat:Bold',sans-serif] font-bold leading-[36px] left-0 text-[#0a0a0a] text-[24px] text-nowrap top-[-0.5px]">{text}</p>
    </div>
  );
}
type BackgroundImageAndText1Props = {
  text: string;
};

function BackgroundImageAndText1({ text }: BackgroundImageAndText1Props) {
  return (
    <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
      <p className="absolute font-['Inter:Bold',sans-serif] font-bold leading-[18px] left-0 not-italic text-[12px] text-black text-nowrap top-px tracking-[1.2px] uppercase">{text}</p>
    </div>
  );
}
type TextBackgroundImageAndTextProps = {
  text: string;
  additionalClassNames?: string;
};

function TextBackgroundImageAndText({ text, additionalClassNames = "" }: TextBackgroundImageAndTextProps) {
  return (
    <BackgroundImage6 additionalClassNames={clsx("h-[21px] relative shrink-0", additionalClassNames)}>
      <p className="absolute font-['Montserrat:Bold',sans-serif] font-bold leading-[21px] left-0 text-[14px] text-black text-nowrap top-0">{text}</p>
    </BackgroundImage6>
  );
}

function ContainerBackgroundImage() {
  return (
    <div className="bg-black relative rounded-[1.67772e+07px] shrink-0 size-[20px]">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative size-full">
        <IconBackgroundImage />
      </div>
    </div>
  );
}

function IconBackgroundImage() {
  return (
    <BackgroundImage1 additionalClassNames="relative shrink-0">
      <path d="M10 3L4.5 8.5L2 6" id="Vector" stroke="var(--stroke-0, #FFED00)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
    </BackgroundImage1>
  );
}
type PhilosophyBackgroundImageAndText1Props = {
  text: string;
};

function PhilosophyBackgroundImageAndText1({ text }: PhilosophyBackgroundImageAndText1Props) {
  return (
    <div className="h-[36px] relative shrink-0 w-full">
      <p className="absolute font-['Montserrat:Bold',sans-serif] font-bold leading-[36px] left-0 text-[24px] text-nowrap text-white top-[-0.5px]">{text}</p>
    </div>
  );
}
type PhilosophyBackgroundImageAndTextProps = {
  text: string;
};

function PhilosophyBackgroundImageAndText({ text }: PhilosophyBackgroundImageAndTextProps) {
  return (
    <div className="h-[120px] relative shrink-0 w-full">
      <p className="absolute font-['Inter:Bold',sans-serif] font-bold leading-[120px] left-0 not-italic text-[80px] text-[rgba(255,255,255,0.1)] text-nowrap top-[1.5px]">{text}</p>
    </div>
  );
}
type BackgroundImageAndTextProps = {
  text: string;
};

function BackgroundImageAndText({ text }: BackgroundImageAndTextProps) {
  return (
    <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
      <p className="absolute font-['Inter:Bold',sans-serif] font-bold leading-[18px] left-0 not-italic text-[#99a1af] text-[12px] text-nowrap top-px tracking-[1.2px] uppercase">{text}</p>
    </div>
  );
}

function Text() {
  return (
    <div className="absolute content-stretch flex h-[140.5px] items-start left-0 top-[188.86px] w-[797.461px]" data-name="Text">
      <p className="bg-clip-text font-['Montserrat:Bold',sans-serif] font-bold leading-[103.68px] relative shrink-0 text-[115.2px] text-[rgba(0,0,0,0)] text-nowrap tracking-[-5.76px]" style={{ WebkitTextFillColor: "transparent", backgroundImage: "linear-gradient(90deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0) 100%), linear-gradient(90deg, rgb(198, 8, 214) 0%, rgb(152, 16, 250) 100%)" }}>
        SPEAK LIKE IT.
      </p>
    </div>
  );
}

function Heading() {
  return (
    <div className="[grid-area:1_/_1] h-[311.039px] justify-self-stretch relative shrink-0" data-name="Heading 1">
      <p className="absolute font-['Montserrat:Bold',sans-serif] font-bold leading-[103.68px] left-0 text-[115.2px] text-black text-nowrap top-[-0.5px] tracking-[-5.76px]">YOU LIVE</p>
      <p className="absolute font-['Montserrat:Bold',sans-serif] font-bold leading-[103.68px] left-0 text-[115.2px] text-black text-nowrap top-[103.18px] tracking-[-5.76px]">IN PRAGUE.</p>
      <Text />
    </div>
  );
}

function Hero() {
  return (
    <BackgroundImage5 additionalClassNames="h-[75.586px] w-[427px]">
      <p className="absolute font-['Montserrat:Medium',sans-serif] font-medium leading-[25.2px] left-0 text-[18px] text-black top-[-0.5px] w-[409px]">Language integration for professionals who are tired of being treated like tourists in their own city.</p>
    </BackgroundImage5>
  );
}

function Hero1() {
  return (
    <div className="bg-[#ffed00] h-[55px] relative shrink-0 w-[191.375px]" data-name="Hero">
      <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0)] border-solid inset-0 pointer-events-none" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Bold',sans-serif] font-bold leading-[21px] left-[33px] not-italic text-[14px] text-black text-nowrap top-[17px] tracking-[1.2496px] uppercase">View Courses</p>
      </div>
    </div>
  );
}

function Container() {
  return (
    <div className="[grid-area:1_/_2] content-stretch flex flex-col gap-[32px] h-[359.039px] items-start justify-end justify-self-stretch pb-0 pt-[180.453px] px-0 relative shrink-0" data-name="Container">
      <Hero />
      <Hero1 />
    </div>
  );
}

function Container1() {
  return (
    <div className="h-[359.039px] relative shrink-0 w-[1329px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid gap-[48px] grid grid-cols-[minmax(0px,_854fr)_minmax(0px,_1fr)] grid-rows-[repeat(1,_minmax(0px,_1fr))] relative size-full">
        <Heading />
        <Container />
      </div>
    </div>
  );
}

function Text1() {
  return (
    <div className="h-[18px] relative shrink-0 w-[70.352px]" data-name="Text">
      <BackgroundImageAndText text="Est. 2012" />
    </div>
  );
}

function Text2() {
  return (
    <div className="h-[18px] relative shrink-0 w-[86.813px]" data-name="Text">
      <BackgroundImageAndText text="Prague, CZ" />
    </div>
  );
}

function Text3() {
  return (
    <div className="basis-0 grow h-[18px] min-h-px min-w-px relative shrink-0" data-name="Text">
      <BackgroundImageAndText text="A1 — B2 Levels" />
    </div>
  );
}

function Hero2() {
  return (
    <div className="absolute content-stretch flex gap-[48px] h-[18px] items-start left-0 top-[6px] w-[366.531px]" data-name="Hero">
      <Text1 />
      <Text2 />
      <Text3 />
    </div>
  );
}

function Icon() {
  return (
    <div className="absolute left-[1305px] size-[24px] top-[-5.29px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="Icon">
          <path d="M12 5V19" id="Vector" stroke="var(--stroke-0, black)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          <path d="M19 12L12 19L5 12" id="Vector_2" stroke="var(--stroke-0, black)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
        </g>
      </svg>
    </div>
  );
}

function Container2() {
  return (
    <BackgroundImage5 additionalClassNames="h-[24px] w-[1329px]">
      <Hero2 />
      <Icon />
    </BackgroundImage5>
  );
}

function Hero3() {
  return (
    <div className="bg-white h-[782px] relative shrink-0 w-full" data-name="Hero">
      <div aria-hidden="true" className="absolute border-[0px_0px_1px] border-black border-solid inset-0 pointer-events-none" />
      <div className="content-stretch flex flex-col items-start justify-between pb-px pl-[48px] pr-0 pt-[128px] relative size-full">
        <Container1 />
        <Container2 />
      </div>
    </div>
  );
}

function Philosophy() {
  return (
    <div className="h-[52px] relative shrink-0 w-full" data-name="Philosophy">
      <p className="absolute font-['Montserrat:Regular',sans-serif] font-normal leading-[26px] left-0 text-[#99a1af] text-[16px] top-0 w-[579px]">{`We don't just drill cases. We simulate real-life scenarios—bureaucracy, medical visits, social events—so you're ready when they actually happen.`}</p>
    </div>
  );
}

function Container3() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] h-[273px] items-start pb-0 pt-[33px] px-0 relative shrink-0 w-full" data-name="Container">
      <div aria-hidden="true" className="absolute border-[1px_0px_0px] border-[rgba(255,255,255,0.2)] border-solid inset-0 pointer-events-none" />
      <PhilosophyBackgroundImageAndText text="01" />
      <PhilosophyBackgroundImageAndText1 text="Context over Grammar" />
      <Philosophy />
    </div>
  );
}

function Philosophy1() {
  return (
    <div className="h-[78px] relative shrink-0 w-full" data-name="Philosophy">
      <p className="absolute font-['Montserrat:Regular',sans-serif] font-normal leading-[26px] left-0 text-[#99a1af] text-[16px] top-0 w-[578px]">{`Speaking Czech isn't just about words. It's about knowing the unwritten rules of the society. When to be formal, when to push back, and when to joke.`}</p>
    </div>
  );
}

function Container4() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] h-[299px] items-start pb-0 pt-[33px] px-0 relative shrink-0 w-full" data-name="Container">
      <div aria-hidden="true" className="absolute border-[1px_0px_0px] border-[rgba(255,255,255,0.2)] border-solid inset-0 pointer-events-none" />
      <PhilosophyBackgroundImageAndText text="02" />
      <PhilosophyBackgroundImageAndText1 text="Cultural Fluency" />
      <Philosophy1 />
    </div>
  );
}

function Philosophy2() {
  return (
    <div className="h-[52px] relative shrink-0 w-full" data-name="Philosophy">
      <p className="absolute font-['Montserrat:Regular',sans-serif] font-normal leading-[26px] left-0 text-[#99a1af] text-[16px] top-0 w-[591px]">Isolation is the enemy of integration. Our students become a network. We organize hikes, coffees, and events to keep you connected.</p>
    </div>
  );
}

function Container5() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] h-[273px] items-start pb-0 pt-[33px] px-0 relative shrink-0 w-full" data-name="Container">
      <div aria-hidden="true" className="absolute border-[1px_0px_0px] border-[rgba(255,255,255,0.2)] border-solid inset-0 pointer-events-none" />
      <PhilosophyBackgroundImageAndText text="03" />
      <PhilosophyBackgroundImageAndText1 text="Community First" />
      <Philosophy2 />
    </div>
  );
}

function Container6() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[128px] h-[1101px] items-start left-[760.5px] pb-0 pt-[-100px] px-0 top-[160px] w-[616.5px]" data-name="Container">
      <Container3 />
      <Container4 />
      <Container5 />
    </div>
  );
}

function Heading1() {
  return (
    <div className="absolute h-[21px] left-0 top-0 w-[616.5px]" data-name="Heading 2">
      <p className="absolute font-['Inter:Bold',sans-serif] font-bold leading-[21px] left-0 not-italic text-[#ffed00] text-[14px] text-nowrap top-0 tracking-[2.6496px] uppercase">The Methodology</p>
    </div>
  );
}

function Heading2() {
  return (
    <div className="absolute font-['Montserrat:Bold',sans-serif] font-bold h-[126.719px] leading-[63.36px] left-0 text-[57.6px] text-nowrap text-white top-[53px] w-[616.5px]" data-name="Heading 3">
      <p className="absolute left-0 top-0">The textbook</p>
      <p className="absolute left-0 top-[63.36px]">is not enough.</p>
    </div>
  );
}

function Paragraph() {
  return (
    <div className="absolute h-[86.391px] left-0 top-[227.72px] w-[448px]" data-name="Paragraph">
      <p className="absolute font-['Montserrat:Regular',sans-serif] font-normal leading-[28.8px] left-0 text-[#99a1af] text-[18px] top-[-1px] w-[444px]">{`Most courses teach you how to pass an exam. We teach you how to handle a doctor's appointment, argue with a landlord, and make friends at a bar.`}</p>
    </div>
  );
}

function Container7() {
  return (
    <div className="absolute h-[314.109px] left-[48px] top-[288px] w-[616.5px]" data-name="Container">
      <Heading1 />
      <Heading2 />
      <Paragraph />
    </div>
  );
}

function Philosophy3() {
  return (
    <div className="bg-black h-[1421px] overflow-clip relative shrink-0 w-full" data-name="Philosophy">
      <Container6 />
      <Container7 />
    </div>
  );
}

function Icon1() {
  return (
    <BackgroundImage1 additionalClassNames="absolute left-[12px] top-[7px]">
      <path d={svgPaths.p2752e200} id="Vector" stroke="var(--stroke-0, black)" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M3.5 5L6 7.5L8.5 5" id="Vector_2" stroke="var(--stroke-0, black)" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M6 7.5V1.5" id="Vector_3" stroke="var(--stroke-0, black)" strokeLinecap="round" strokeLinejoin="round" />
    </BackgroundImage1>
  );
}

function Text4() {
  return (
    <div className="absolute bg-[rgba(255,255,255,0.5)] border border-black border-solid h-[28px] left-0 rounded-[1.67772e+07px] top-0 w-[162.289px]" data-name="Text">
      <Icon1 />
      <p className="absolute font-['Inter:Bold',sans-serif] font-bold leading-[18px] left-[32px] not-italic text-[12px] text-black text-nowrap top-[5px] tracking-[1.2px] uppercase">Free Resource</p>
    </div>
  );
}

function Heading3() {
  return (
    <div className="absolute font-['Montserrat:Bold',sans-serif] font-bold h-[109.438px] leading-[54.72px] left-0 text-[57.6px] text-black text-nowrap top-[60px] tracking-[-2.88px] w-[632.5px]" data-name="Heading 2">
      <p className="absolute left-0 top-0">STOP SOUNDING</p>
      <p className="absolute left-0 top-[54.72px]">LIKE A TEXTBOOK.</p>
    </div>
  );
}

function BoldText() {
  return (
    <div className="absolute content-stretch flex h-[22px] items-start left-[134.53px] top-[91.25px] w-[267.648px]" data-name="Bold Text">
      <p className="font-['Montserrat:Bold',sans-serif] font-bold leading-[29.25px] relative shrink-0 text-[18px] text-[rgba(0,0,0,0.8)] text-nowrap">{`"Natural Czech Cheat Sheet"`}</p>
    </div>
  );
}

function Paragraph1() {
  return (
    <div className="absolute h-[175.5px] left-0 top-[193.44px] w-[512px]" data-name="Paragraph">
      <p className="absolute font-['Montserrat:Medium',sans-serif] font-medium leading-[29.25px] left-0 text-[18px] text-[rgba(0,0,0,0.8)] top-[-0.5px] w-[484px]">{`Most courses teach you grammar tables. Locals don't speak in tables.`}</p>
      <p className="absolute font-['Montserrat:Medium',sans-serif] font-medium leading-[29.25px] left-0 text-[18px] text-[rgba(0,0,0,0.8)] top-[87.25px] w-[135px]">Download our</p>
      <BoldText />
      <p className="absolute font-['Montserrat:Medium',sans-serif] font-medium leading-[29.25px] left-0 text-[18px] text-[rgba(0,0,0,0.8)] top-[87.25px] w-[470px]">: 50 essential phrases to soften requests, fill pauses, and sound like you actually live here.</p>
    </div>
  );
}

function Container8() {
  return (
    <div className="content-stretch flex gap-[12px] h-[21px] items-center relative shrink-0 w-full" data-name="Container">
      <ContainerBackgroundImage />
      <TextBackgroundImageAndText text="Handle small talk with confidence" additionalClassNames="w-[250.758px]" />
    </div>
  );
}

function Text5() {
  return (
    <BackgroundImage5 additionalClassNames="h-[21px] w-[245.32px]">
      <p className="absolute font-['Montserrat:Bold',sans-serif] font-bold leading-[21px] left-0 text-[14px] text-black text-nowrap top-0">{`Understand casual "street" Czech`}</p>
    </BackgroundImage5>
  );
}

function Container9() {
  return (
    <div className="content-stretch flex gap-[12px] h-[21px] items-center relative shrink-0 w-full" data-name="Container">
      <ContainerBackgroundImage />
      <Text5 />
    </div>
  );
}

function Container10() {
  return (
    <div className="content-stretch flex gap-[12px] h-[21px] items-center relative shrink-0 w-full" data-name="Container">
      <ContainerBackgroundImage />
      <TextBackgroundImageAndText text="Avoid awkward silences" additionalClassNames="w-[175.867px]" />
    </div>
  );
}

function Container11() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[16px] h-[95px] items-start left-0 top-[400.94px] w-[632.5px]" data-name="Container">
      <Container8 />
      <Container9 />
      <Container10 />
    </div>
  );
}

function Container12() {
  return (
    <div className="absolute h-[495.938px] left-0 top-0 w-[632.5px]" data-name="Container">
      <Text4 />
      <Heading3 />
      <Paragraph1 />
      <Container11 />
    </div>
  );
}

function Label() {
  return (
    <div className="h-[18px] relative shrink-0 w-full" data-name="Label">
      <p className="absolute font-['Inter:Bold',sans-serif] font-bold leading-[18px] left-0 not-italic text-[12px] text-black text-nowrap top-px tracking-[1.2px] uppercase">Work Email</p>
    </div>
  );
}

function EmailInput() {
  return (
    <div className="bg-[#f9fafb] h-[58px] relative shrink-0 w-full" data-name="Email Input">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex items-center p-[16px] relative size-full">
          <p className="font-['Montserrat:Regular',sans-serif] font-normal leading-[normal] relative shrink-0 text-[16px] text-[rgba(0,0,0,0.5)] text-nowrap">name@company.com</p>
        </div>
      </div>
      <div aria-hidden="true" className="absolute border border-[#e5e7eb] border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function Container13() {
  return (
    <div className="basis-0 grow min-h-px min-w-px relative shrink-0 w-[486.5px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[8px] items-start relative size-full">
        <Label />
        <EmailInput />
      </div>
    </div>
  );
}

function Button() {
  return (
    <div className="bg-black h-[61px] relative shrink-0 w-[486.5px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center p-[20px] relative size-full">
        <p className="font-['Inter:Bold',sans-serif] font-bold leading-[21px] not-italic relative shrink-0 text-[14px] text-center text-nowrap text-white tracking-[1.2496px] uppercase">Get the Cheat Sheet</p>
      </div>
    </div>
  );
}

function Paragraph2() {
  return (
    <BackgroundImage5 additionalClassNames="h-[15px] w-[486.5px]">
      <p className="absolute font-['Montserrat:Regular',sans-serif] font-normal leading-[15px] left-[243.3px] text-[#99a1af] text-[10px] text-center text-nowrap top-[0.5px] translate-x-[-50%]">We respect your inbox. Unsubscribe at any time.</p>
    </BackgroundImage5>
  );
}

function Form() {
  return (
    <div className="content-stretch flex flex-col gap-[24px] h-[208px] items-start relative shrink-0 w-full" data-name="Form">
      <Container13 />
      <Button />
      <Paragraph2 />
    </div>
  );
}

function Container14() {
  return (
    <div className="absolute bg-white content-stretch flex flex-col h-[306px] items-start left-[744.5px] pb-px pt-[49px] px-[49px] top-[114.97px] w-[584.5px]" data-name="Container">
      <div aria-hidden="true" className="absolute border border-black border-solid inset-0 pointer-events-none shadow-[12px_12px_0px_0px_black]" />
      <Form />
    </div>
  );
}

function Container15() {
  return (
    <div className="absolute h-[535.938px] left-[48px] top-[128px] w-[1329px]" data-name="Container">
      <Container12 />
      <Container14 />
    </div>
  );
}

function Container16() {
  return <div className="absolute h-[950.32px] left-[-142.5px] opacity-10 top-[-79.19px] w-[1710px]" data-name="Container" />;
}

function LeadMagnet() {
  return (
    <div className="bg-[#ffed00] h-[792.938px] relative shrink-0 w-full" data-name="LeadMagnet">
      <div className="overflow-clip relative rounded-[inherit] size-full">
        <Container15 />
        <Container16 />
      </div>
      <div aria-hidden="true" className="absolute border-[0px_0px_1px] border-black border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function Heading4() {
  return (
    <div className="h-[103.672px] relative shrink-0 w-[319.242px]" data-name="Heading 2">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid font-['Montserrat:Bold',sans-serif] font-bold leading-[51.84px] relative size-full text-[57.6px] text-black text-nowrap tracking-[-2.88px]">
        <p className="absolute left-0 top-[-0.5px]">UPCOMING</p>
        <p className="absolute left-0 top-[51.34px]">INTAKE</p>
      </div>
    </div>
  );
}

function Paragraph3() {
  return (
    <div className="h-[42px] relative shrink-0 w-[332.773px]" data-name="Paragraph">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid font-['Montserrat:Regular',sans-serif] font-normal leading-[21px] relative size-full text-[#6a7282] text-[14px] text-nowrap">
        <p className="absolute left-0 top-0">Small groups (max 6). Personal attention.</p>
        <p className="absolute left-0 top-[21px]">Curriculum designed for rapid daily application.</p>
      </div>
    </div>
  );
}

function Container17() {
  return (
    <div className="absolute content-stretch flex h-[103.672px] items-end justify-between left-[48px] top-[160px] w-[1329px]" data-name="Container">
      <Heading4 />
      <Paragraph3 />
    </div>
  );
}

function CourseList() {
  return (
    <BackgroundImage2 additionalClassNames="w-[443px]">
      <TextBackgroundImageAndText1 text="A1" additionalClassNames="w-[26.766px]" />
      <TextBackgroundImageAndText2 text="Total Beginner" additionalClassNames="left-[50.77px] w-[134.07px]" />
    </BackgroundImage2>
  );
}

function CourseList1() {
  return (
    <CourseListBackgroundImage>
      <TextBackgroundImageAndText3 text="Feb 17 - Apr 20" additionalClassNames="w-[102.266px]" />
      <TextBackgroundImageAndText3 text="Mon/Wed 18:00" additionalClassNames="w-[108.633px]" />
    </CourseListBackgroundImage>
  );
}

function Text6() {
  return (
    <BackgroundImage3 additionalClassNames="w-[92.477px]">
      <p className="absolute font-['Inter:Bold',sans-serif] font-bold leading-[18px] left-0 not-italic text-[#00a63e] text-[12px] text-nowrap top-px tracking-[0.6px] uppercase">3 Spots Left</p>
    </BackgroundImage3>
  );
}

function CourseList2() {
  return (
    <CourseListBackgroundImage1>
      <Text6 />
      <IconBackgroundImage1 />
    </CourseListBackgroundImage1>
  );
}

function Container18() {
  return (
    <div className="content-stretch flex h-[101px] items-center justify-between pb-px pt-0 px-0 relative shrink-0 w-full" data-name="Container">
      <div aria-hidden="true" className="absolute border-[0px_0px_1px] border-black border-solid inset-0 pointer-events-none" />
      <CourseList />
      <CourseList1 />
      <CourseList2 />
    </div>
  );
}

function CourseList3() {
  return (
    <BackgroundImage2 additionalClassNames="w-[443px]">
      <TextBackgroundImageAndText1 text="A2" additionalClassNames="w-[32.547px]" />
      <TextBackgroundImageAndText2 text="Elementary" additionalClassNames="left-[56.55px] w-[106.32px]" />
    </BackgroundImage2>
  );
}

function CourseList4() {
  return (
    <CourseListBackgroundImage>
      <TextBackgroundImageAndText3 text="Feb 18 - Apr 21" additionalClassNames="w-[98.758px]" />
      <TextBackgroundImageAndText3 text="Tue/Thu 18:00" additionalClassNames="w-[96.906px]" />
    </CourseListBackgroundImage>
  );
}

function Text7() {
  return (
    <BackgroundImage3 additionalClassNames="w-[102.969px]">
      <p className="absolute font-['Inter:Bold',sans-serif] font-bold leading-[18px] left-0 not-italic text-[#99a1af] text-[12px] text-nowrap top-px tracking-[0.6px] uppercase">Waitlist Only</p>
    </BackgroundImage3>
  );
}

function CourseList5() {
  return (
    <CourseListBackgroundImage1>
      <Text7 />
      <IconBackgroundImage1 />
    </CourseListBackgroundImage1>
  );
}

function Container19() {
  return (
    <div className="content-stretch flex h-[101px] items-center justify-between pb-px pt-0 px-0 relative shrink-0 w-full" data-name="Container">
      <div aria-hidden="true" className="absolute border-[0px_0px_1px] border-black border-solid inset-0 pointer-events-none" />
      <CourseList3 />
      <CourseList4 />
      <CourseList5 />
    </div>
  );
}

function CourseList6() {
  return (
    <BackgroundImage2 additionalClassNames="w-[443px]">
      <TextBackgroundImageAndText1 text="B1" additionalClassNames="w-[27.766px]" />
      <TextBackgroundImageAndText2 text="Intermediate" additionalClassNames="left-[51.77px] w-[119.484px]" />
    </BackgroundImage2>
  );
}

function CourseList7() {
  return (
    <CourseListBackgroundImage>
      <TextBackgroundImageAndText3 text="Mar 01 - May 15" additionalClassNames="w-[103.672px]" />
      <TextBackgroundImageAndText3 text="Mon/Wed 19:30" additionalClassNames="w-[106.867px]" />
    </CourseListBackgroundImage>
  );
}

function Text8() {
  return (
    <BackgroundImage3 additionalClassNames="w-[36.609px]">
      <p className="absolute font-['Inter:Bold',sans-serif] font-bold leading-[18px] left-0 not-italic text-[12px] text-black text-nowrap top-px tracking-[0.6px] uppercase">Open</p>
    </BackgroundImage3>
  );
}

function CourseList8() {
  return (
    <CourseListBackgroundImage1>
      <Text8 />
      <IconBackgroundImage1 />
    </CourseListBackgroundImage1>
  );
}

function Container20() {
  return (
    <div className="content-stretch flex h-[101px] items-center justify-between pb-px pt-0 px-0 relative shrink-0 w-full" data-name="Container">
      <div aria-hidden="true" className="absolute border-[0px_0px_1px] border-black border-solid inset-0 pointer-events-none" />
      <CourseList6 />
      <CourseList7 />
      <CourseList8 />
    </div>
  );
}

function Container21() {
  return (
    <div className="absolute content-stretch flex flex-col h-[304px] items-start left-[48px] pb-0 pt-px px-0 top-[343.67px] w-[1329px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-[1px_0px_0px] border-black border-solid inset-0 pointer-events-none" />
      <Container18 />
      <Container19 />
      <Container20 />
    </div>
  );
}

function Link() {
  return (
    <div className="absolute border-[0px_0px_1px] border-black border-solid h-[26px] left-[597.77px] top-[698.17px] w-[229.445px]" data-name="Link">
      <p className="absolute font-['Inter:Bold',sans-serif] font-bold leading-[21px] left-[115px] not-italic text-[#0a0a0a] text-[14px] text-center text-nowrap top-0 tracking-[1.2496px] translate-x-[-50%] uppercase">Request Private Classes</p>
    </div>
  );
}

function CourseList9() {
  return (
    <div className="bg-white h-[884.172px] relative shrink-0 w-full" data-name="CourseList">
      <Container17 />
      <Container21 />
      <Link />
    </div>
  );
}

function App() {
  return (
    <div className="content-stretch flex flex-col h-[3880.109px] items-start relative shrink-0 w-full" data-name="App">
      <Hero3 />
      <Philosophy3 />
      <LeadMagnet />
      <CourseList9 />
    </div>
  );
}

function Text9() {
  return (
    <div className="absolute content-stretch flex h-[87.5px] items-start left-0 top-[53.3px] w-[434.43px]" data-name="Text">
      <p className="font-['Montserrat:Bold',sans-serif] font-bold leading-[64.8px] relative shrink-0 text-[#ffed00] text-[72px] text-nowrap tracking-[-3.6px]">INTEGRATE?</p>
    </div>
  );
}

function Heading5() {
  return (
    <div className="h-[129.594px] relative shrink-0 w-full" data-name="Heading 2">
      <p className="absolute font-['Montserrat:Bold',sans-serif] font-bold leading-[64.8px] left-0 text-[72px] text-nowrap text-white top-[0.5px] tracking-[-3.6px]">READY TO</p>
      <Text9 />
    </div>
  );
}

function Link1() {
  return (
    <div className="basis-0 grow h-[27px] min-h-px min-w-px relative shrink-0" data-name="Link">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[16px] items-center relative size-full">
        <TextBackgroundImageAndText4 text="jazykaintegrace@gmail.com" />
        <IconBackgroundImage2 />
      </div>
    </div>
  );
}

function Link2() {
  return (
    <div className="h-[27px] relative shrink-0 w-[187.359px]" data-name="Link">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[16px] items-center relative size-full">
        <TextBackgroundImageAndText4 text="+420 601 177 208" />
        <IconBackgroundImage2 />
      </div>
    </div>
  );
}

function Container22() {
  return (
    <div className="content-stretch flex gap-[32px] h-[27px] items-start relative shrink-0 w-full" data-name="Container">
      <Link1 />
      <Link2 />
    </div>
  );
}

function Container23() {
  return (
    <div className="h-[204.594px] relative shrink-0 w-[513.734px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[48px] items-start relative size-full">
        <Heading5 />
        <Container22 />
      </div>
    </div>
  );
}

function Text10() {
  return (
    <BackgroundImage5 additionalClassNames="h-[16px] w-[125.078px]">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[16px] left-0 not-italic text-[#6a7282] text-[12px] top-px w-[126px]">— Daily micro-lessons</p>
    </BackgroundImage5>
  );
}

function Link3() {
  return (
    <div className="absolute content-stretch flex gap-[8px] h-[21px] items-center left-0 top-[42px] w-[261.602px]" data-name="Link">
      <TextBackgroundImageAndText5 text="Instagram" additionalClassNames="w-[70.117px]" />
      <Text10 />
      <IconBackgroundImage3 />
    </div>
  );
}

function Link4() {
  return (
    <div className="absolute content-stretch flex gap-[8px] h-[21px] items-center left-0 top-[79px] w-[261.602px]" data-name="Link">
      <TextBackgroundImageAndText5 text="Facebook" additionalClassNames="w-[66.609px]" />
      <TextBackgroundImageAndText6 text="— Student success stories" additionalClassNames="w-[149.484px]" />
      <IconBackgroundImage3 />
    </div>
  );
}

function Link5() {
  return (
    <div className="absolute content-stretch flex gap-[8px] h-[21px] items-center left-0 top-[116px] w-[261.602px]" data-name="Link">
      <TextBackgroundImageAndText5 text="VKontakte" additionalClassNames="w-[72.016px]" />
      <TextBackgroundImageAndText6 text="— Student networking hub" additionalClassNames="w-[149.383px]" />
      <IconBackgroundImage3 />
    </div>
  );
}

function Text11() {
  return (
    <BackgroundImage4 additionalClassNames="h-[16px]">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[16px] left-0 not-italic text-[#6a7282] text-[12px] top-px w-[162px]">{`— Instant answers & support`}</p>
    </BackgroundImage4>
  );
}

function Link6() {
  return (
    <div className="absolute content-stretch flex gap-[8px] h-[21px] items-center left-0 top-[153px] w-[261.602px]" data-name="Link">
      <TextBackgroundImageAndText5 text="WhatsApp" additionalClassNames="w-[71.844px]" />
      <Text11 />
      <IconBackgroundImage3 />
    </div>
  );
}

function Container24() {
  return (
    <BackgroundImage4 additionalClassNames="h-[219px]">
      <HeadingBackgroundImageAndText text="Join the Community" additionalClassNames="w-[261.602px]" />
      <Link3 />
      <Link4 />
      <Link5 />
      <Link6 />
    </BackgroundImage4>
  );
}

function Button1() {
  return (
    <div className="absolute h-[21px] left-0 top-[42px] w-[126.445px]" data-name="Button">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[21px] left-0 not-italic text-[14px] text-nowrap text-white top-0 tracking-[-0.1504px]">{`Terms & Conditions`}</p>
    </div>
  );
}

function Link7() {
  return (
    <div className="absolute h-[21px] left-0 top-[198px] w-[126.445px]" data-name="Link">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[21px] left-0 not-italic text-[#6a7282] text-[14px] text-nowrap top-0 tracking-[-0.1504px]">Admin</p>
    </div>
  );
}

function Container25() {
  return (
    <BackgroundImage5 additionalClassNames="h-[219px] w-[126.445px]">
      <HeadingBackgroundImageAndText text="Legal" additionalClassNames="w-[126.445px]" />
      <Button1 />
      <ButtonBackgroundImageAndText text="Privacy Policy" additionalClassNames="top-[79px]" />
      <ButtonBackgroundImageAndText text="Cookie Policy" additionalClassNames="top-[116px]" />
      <ButtonBackgroundImageAndText text="Accessibility" additionalClassNames="top-[153px]" />
      <Link7 />
    </BackgroundImage5>
  );
}

function Container26() {
  return (
    <div className="h-[219px] relative shrink-0 w-[452.047px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[64px] items-start relative size-full">
        <Container24 />
        <Container25 />
      </div>
    </div>
  );
}

function Container27() {
  return (
    <div className="content-stretch flex h-[219px] items-start justify-between relative shrink-0 w-full" data-name="Container">
      <Container23 />
      <Container26 />
    </div>
  );
}

function Text12() {
  return (
    <BackgroundImage3 additionalClassNames="w-[305.789px]">
      <p className="absolute font-['Montserrat:Bold',sans-serif] font-bold leading-[18px] left-0 text-[12px] text-nowrap text-white top-[0.5px]">JAZYK A INTEGRACE S.R.O.</p>
    </BackgroundImage3>
  );
}

function Text13() {
  return (
    <div className="h-[18px] relative shrink-0 w-[305.789px]" data-name="Text">
      <BackgroundImageAndText2 text="IČO: 23812036" />
    </div>
  );
}

function Text14() {
  return (
    <div className="basis-0 grow min-h-px min-w-px relative shrink-0 w-[305.789px]" data-name="Text">
      <BackgroundImageAndText2 text="Sp. zn. C 433136 vedená u Městského soudu v Praze" />
    </div>
  );
}

function Container28() {
  return (
    <div className="h-[62px] relative shrink-0 w-[305.789px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[4px] items-start relative size-full">
        <Text12 />
        <Text13 />
        <Text14 />
      </div>
    </div>
  );
}

function Text15() {
  return (
    <div className="absolute h-[18px] left-0 top-0 w-[174.055px]" data-name="Text">
      <p className="absolute font-['Montserrat:Regular',sans-serif] font-normal leading-[18px] left-[175px] text-[12px] text-nowrap text-right text-white top-[0.5px] translate-x-[-100%]">Černomořská 384/9, Praha 10</p>
    </div>
  );
}

function Text16() {
  return (
    <div className="absolute h-[14.5px] left-[13.1px] top-[19.5px] w-[160.953px]" data-name="Text">
      <p className="absolute font-['Montserrat:Regular',sans-serif] font-normal leading-[18px] left-[161px] text-[#6a7282] text-[12px] text-right top-[-1px] translate-x-[-100%] w-[161px]">© 2026 All Rights Reserved</p>
    </div>
  );
}

function Container29() {
  return (
    <BackgroundImage2 additionalClassNames="w-[174.055px]">
      <Text15 />
      <Text16 />
    </BackgroundImage2>
  );
}

function Container30() {
  return (
    <div className="content-stretch flex h-[95px] items-end justify-between pb-0 pt-px px-0 relative shrink-0 w-full" data-name="Container">
      <div aria-hidden="true" className="absolute border-[1px_0px_0px] border-[rgba(255,255,255,0.1)] border-solid inset-0 pointer-events-none" />
      <Container28 />
      <Container29 />
    </div>
  );
}

function Container31() {
  return (
    <div className="h-[442px] relative shrink-0 w-full" data-name="Container">
      <div className="content-stretch flex flex-col gap-[128px] items-start px-[48px] py-0 relative size-full">
        <Container27 />
        <Container30 />
      </div>
    </div>
  );
}

function Footer() {
  return (
    <div className="bg-black content-stretch flex flex-col h-[619px] items-start pb-0 pt-[129px] px-0 relative shrink-0 w-full" data-name="Footer">
      <div aria-hidden="true" className="absolute border-[1px_0px_0px] border-[rgba(255,255,255,0.1)] border-solid inset-0 pointer-events-none" />
      <Container31 />
    </div>
  );
}

function PS() {
  return (
    <div className="absolute bg-white content-stretch flex flex-col h-[4499.109px] items-start left-0 top-0 w-[1425px]" data-name="pS">
      <App />
      <Footer />
    </div>
  );
}

function Logo() {
  return (
    <div className="relative shrink-0 size-[48px]" data-name="Logo">
      <img alt="" className="absolute bg-clip-padding border-0 border-[transparent] border-solid inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src={imgLogo} />
    </div>
  );
}

function Link8() {
  return (
    <div className="h-[18px] relative shrink-0 w-[61.281px]" data-name="Link">
      <BackgroundImageAndText1 text="Method" />
    </div>
  );
}

function Link9() {
  return (
    <div className="h-[18px] relative shrink-0 w-[67.867px]" data-name="Link">
      <BackgroundImageAndText1 text="Courses" />
    </div>
  );
}

function Link10() {
  return (
    <div className="basis-0 grow h-[18px] min-h-px min-w-px relative shrink-0" data-name="Link">
      <BackgroundImageAndText1 text="Contact" />
    </div>
  );
}

function Container32() {
  return (
    <div className="basis-0 grow h-[18px] min-h-px min-w-px relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[32px] items-start relative size-full">
        <Link8 />
        <Link9 />
        <Link10 />
      </div>
    </div>
  );
}

function Container33() {
  return <div className="bg-[#e5e7eb] h-[24px] shrink-0 w-px" data-name="Container" />;
}

function Flag() {
  return (
    <div className="basis-0 grow h-[16px] min-h-px min-w-px relative shrink-0" data-name="Flag">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid overflow-clip relative rounded-[inherit] size-full">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 16">
          <path d="M24 0H0V16H24V0Z" fill="var(--fill-0, #012169)" id="Vector" />
        </svg>
        <div className="absolute inset-[-7.8%_-3.47%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 25.6641 18.4962">
            <g id="Vector">
              <path d={svgPaths.p1e95f00} fill="var(--fill-0, black)" />
              <path d={svgPaths.p355f6b00} stroke="var(--stroke-0, white)" strokeWidth="3" />
            </g>
          </svg>
        </div>
        <div className="absolute inset-[-2.6%_-1.16%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24.5547 16.8321">
            <g id="Vector">
              <path d={svgPaths.p75ee300} fill="var(--fill-0, black)" />
              <path d={svgPaths.pd60a900} stroke="var(--stroke-0, #C8102E)" />
            </g>
          </svg>
        </div>
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 16">
          <g id="Vector">
            <path d="M12 0V16ZM0 8H24Z" fill="var(--fill-0, black)" />
            <path d="M12 0V16M0 8H24" stroke="var(--stroke-0, white)" strokeWidth="5" />
          </g>
        </svg>
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 16">
          <g id="Vector">
            <path d="M12 0V16ZM0 8H24Z" fill="var(--fill-0, black)" />
            <path d="M12 0V16M0 8H24" stroke="var(--stroke-0, #C8102E)" strokeWidth="3" />
          </g>
        </svg>
      </div>
    </div>
  );
}

function Container34() {
  return (
    <div className="basis-0 bg-[rgba(255,255,255,0)] grow h-[16px] min-h-px min-w-px relative rounded-[2px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_-1px_rgba(0,0,0,0.1)] shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start overflow-clip relative rounded-[inherit] size-full">
        <Flag />
      </div>
    </div>
  );
}

function Icon2() {
  return (
    <BackgroundImage1 additionalClassNames="relative shrink-0">
      <path d="M3 4.5L6 7.5L9 4.5" id="Vector" stroke="var(--stroke-0, #0A0A0A)" strokeLinecap="round" strokeLinejoin="round" />
    </BackgroundImage1>
  );
}

function LanguageSwitcher() {
  return (
    <div className="h-[32px] relative rounded-[1.67772e+07px] shrink-0 w-[60px]" data-name="LanguageSwitcher">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[8px] items-center px-[8px] py-0 relative size-full">
        <Container34 />
        <Icon2 />
      </div>
    </div>
  );
}

function Navigation() {
  return (
    <div className="h-[32px] relative shrink-0 w-[386.164px]" data-name="Navigation">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[32px] items-center relative size-full">
        <Container32 />
        <Container33 />
        <LanguageSwitcher />
      </div>
    </div>
  );
}

function Header() {
  return (
    <div className="h-[64px] relative shrink-0 w-full" data-name="Header">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center justify-between px-[48px] py-0 relative size-full">
          <Logo />
          <Navigation />
        </div>
      </div>
    </div>
  );
}

function Header1() {
  return (
    <div className="absolute bg-[rgba(255,255,255,0.9)] content-stretch flex flex-col h-[97px] items-start left-0 pb-px pt-[16px] px-0 top-[3717px] w-[1425px]" data-name="Header">
      <div aria-hidden="true" className="absolute border-[#f3f4f6] border-[0px_0px_1px] border-solid inset-0 pointer-events-none" />
      <Header />
    </div>
  );
}

function Text17() {
  return (
    <div className="absolute h-[18px] left-0 top-0 w-[138.898px]" data-name="Text">
      <p className="absolute font-['Montserrat:Bold',sans-serif] font-bold leading-[18px] left-0 text-[12px] text-black text-nowrap top-[0.5px] tracking-[0.6px] uppercase">{`Cookies & Privacy`}</p>
    </div>
  );
}

function Button2() {
  return (
    <div className="absolute h-[21.125px] left-[587.83px] top-0 w-[75.539px]" data-name="Button">
      <p className="[text-underline-position:from-font] absolute decoration-solid font-['Montserrat:Regular',sans-serif] font-normal leading-[21.125px] left-[38px] text-[#4a5565] text-[13px] text-center text-nowrap top-[0.5px] translate-x-[-50%] underline">Read Policy</p>
    </div>
  );
}

function Paragraph4() {
  return (
    <div className="absolute h-[21.125px] left-0 top-[26px] w-[663.367px]" data-name="Paragraph">
      <p className="absolute font-['Montserrat:Regular',sans-serif] font-normal leading-[21.125px] left-0 text-[#4a5565] text-[13px] text-nowrap top-[0.5px]">We use cookies to improve the site and analyze traffic. Some are essential, others optional.</p>
      <Button2 />
    </div>
  );
}

function Container35() {
  return (
    <BackgroundImage5 additionalClassNames="h-[55.125px] w-[663.367px]">
      <Text17 />
      <Paragraph4 />
    </BackgroundImage5>
  );
}

function Button3() {
  return (
    <BackgroundImage5 additionalClassNames="h-[40.5px] w-[112.898px]">
      <p className="absolute font-['Montserrat:Bold',sans-serif] font-bold leading-[16.5px] left-[56px] text-[#6a7282] text-[11px] text-center text-nowrap top-[11.5px] tracking-[1.1px] translate-x-[-50%] uppercase">Settings</p>
    </BackgroundImage5>
  );
}

function Button4() {
  return (
    <div className="basis-0 bg-white grow h-[42.5px] min-h-px min-w-px relative shrink-0" data-name="Button">
      <div aria-hidden="true" className="absolute border border-[#e5e7eb] border-solid inset-0 pointer-events-none" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Montserrat:Bold',sans-serif] font-bold leading-[16.5px] left-[87.5px] text-[11px] text-black text-center text-nowrap top-[12.5px] tracking-[1.1px] translate-x-[-50%] uppercase">Reject Optional</p>
      </div>
    </div>
  );
}

function Button5() {
  return (
    <div className="bg-black h-[42.5px] relative shrink-0 w-[148.023px]" data-name="Button">
      <div aria-hidden="true" className="absolute border border-black border-solid inset-0 pointer-events-none shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1),0px_4px_6px_-4px_rgba(0,0,0,0.1)]" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Montserrat:Bold',sans-serif] font-bold leading-[16.5px] left-[74.5px] text-[11px] text-center text-nowrap text-white top-[12.5px] tracking-[1.1px] translate-x-[-50%] uppercase">Accept All</p>
      </div>
    </div>
  );
}

function Container36() {
  return (
    <div className="h-[42.5px] relative shrink-0 w-[458.797px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[12px] items-center relative size-full">
        <Button3 />
        <Button4 />
        <Button5 />
      </div>
    </div>
  );
}

function CookieConsent() {
  return (
    <div className="content-stretch flex h-[55.125px] items-center justify-between relative shrink-0 w-full" data-name="CookieConsent">
      <Container35 />
      <Container36 />
    </div>
  );
}

function Container37() {
  return (
    <div className="absolute bg-white content-stretch flex flex-col h-[104.125px] items-start left-0 pb-0 pt-[25px] px-[72.5px] top-[4394.88px] w-[1425px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-[1px_0px_0px] border-black border-solid inset-0 pointer-events-none shadow-[0px_-4px_30px_0px_rgba(0,0,0,0.1)]" />
      <CookieConsent />
    </div>
  );
}

export default function WebsiteCloneForJazykaintegraceCz() {
  return (
    <div className="bg-white relative size-full" data-name="Website Clone for jazykaintegrace.cz">
      <PS />
      <Header1 />
      <Container37 />
    </div>
  );
}
