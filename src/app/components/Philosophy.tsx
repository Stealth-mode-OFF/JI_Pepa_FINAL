import React from "react";
import { Container, Section } from "./Layout";

const MethodologyItem = ({ number, title, text }: { number: string; title: string; text: string }) => (
  <div className="border-t border-white/20 py-8 md:py-12 first:border-t">
    <div className="flex flex-col gap-4">
      <span className="font-['Inter'] font-bold text-xs text-gray-500 uppercase tracking-widest">{number}</span>
      <h3 className="font-['Montserrat'] font-bold text-2xl md:text-3xl text-white">{title}</h3>
      <p className="font-['Montserrat'] text-gray-400 text-base md:text-lg leading-relaxed max-w-xl">
        {text}
      </p>
    </div>
  </div>
);

export const Philosophy = () => {
  return (
    <Section className="bg-black text-white">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
          <div className="lg:sticky lg:top-32 h-fit">
            <span className="text-[#FFED00] font-['Inter'] font-bold text-sm uppercase tracking-widest mb-6 block">The Methodology</span>
            <h2 className="font-['Montserrat'] font-bold text-4xl md:text-6xl leading-tight mb-8">
              The textbook<br />is not enough.
            </h2>
            <p className="font-['Montserrat'] text-gray-400 text-lg leading-relaxed max-w-md">
              Most courses teach you how to pass an exam. We teach you how to handle a doctor's appointment, argue with a landlord, and make friends at a bar.
            </p>
          </div>
          
          <div className="flex flex-col">
            <MethodologyItem 
              number="01" 
              title="Context over Grammar" 
              text="We don't just drill cases. We simulate real-life scenarios—bureaucracy, medical visits, social events—so you're ready when they actually happen."
            />
            <MethodologyItem 
              number="02" 
              title="Cultural Fluency" 
              text="Speaking Czech isn't just about words. It's about knowing the unwritten rules of the society. When to be formal, when to push back, and when to joke."
            />
            <MethodologyItem 
              number="03" 
              title="Community First" 
              text="Isolation is the enemy of integration. Our students become a network. We organize hikes, coffees, and events to keep you connected."
            />
          </div>
        </div>
      </Container>
    </Section>
  );
};
