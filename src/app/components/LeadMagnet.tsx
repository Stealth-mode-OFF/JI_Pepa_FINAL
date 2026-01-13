import React, { useState } from "react";
import { Container, Section } from "./Layout";
import { CheckIcon, FreeResourceIcon } from "./Icons";
import { toast } from "sonner";

const FeaturePoint = ({ text }: { text: string }) => (
  <div className="flex items-center gap-3">
    <div className="w-5 h-5 bg-black rounded-full flex items-center justify-center shrink-0">
      <CheckIcon />
    </div>
    <span className="font-['Montserrat'] font-bold text-[14px] leading-[21px] text-black">{text}</span>
  </div>
);

export const LeadMagnet = () => {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const leadEndpoint = import.meta.env.VITE_LEAD_FORM_ENDPOINT as string | undefined;

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!email) {
      toast.error("Please enter a valid email.");
      return;
    }

    setIsSubmitting(true);

    try {
      if (leadEndpoint) {
        const response = await fetch(leadEndpoint, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, source: "lead-magnet" }),
        });

        if (!response.ok) {
          throw new Error("Failed to submit.");
        }
        toast.success("Thanks! Check your inbox for the cheat sheet.");
      } else {
        window.location.href = `mailto:jazykaintegrace@gmail.com?subject=Natural%20Czech%20Cheat%20Sheet&body=Please%20send%20the%20cheat%20sheet%20to%20${encodeURIComponent(
          email,
        )}`;
        toast.success("Email draft opened. Send it to receive the cheat sheet.");
      }
      setEmail("");
    } catch (error) {
      toast.error("Something went wrong. Please try again or email us directly.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Section className="bg-[#FFED00] border-b border-black">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          <div className="space-y-8">
            <div className="inline-flex items-center gap-3 bg-white/50 border border-black rounded-full px-4 py-1.5 w-fit">
              <FreeResourceIcon />
              <span className="font-['Inter'] font-bold text-[12px] leading-[18px] uppercase tracking-[1.2px] text-black">Free Resource</span>
            </div>
            
            <h2 className="font-['Montserrat'] font-bold text-[36px] sm:text-[48px] md:text-[56px] lg:text-[64px] xl:text-[72px] leading-[0.9] tracking-[-3.6px] text-black">
              STOP SOUNDING<br />LIKE A TEXTBOOK.
            </h2>
            
            <div className="space-y-4">
              <p className="font-['Montserrat'] font-medium text-[18px] leading-[27px] text-black/80 max-w-md">
                Most courses teach you grammar tables. Locals don’t speak in tables.
              </p>
              <p className="font-['Montserrat'] font-medium text-[18px] leading-[27px] text-black/80 max-w-md">
                Download our <span className="font-bold">"Natural Czech Cheat Sheet"</span>: 50 essential phrases to soften requests, fill pauses, and sound like you actually live here.
              </p>
            </div>
            
            <div className="flex flex-col gap-4">
              <FeaturePoint text="Handle small talk with confidence" />
              <FeaturePoint text='Understand casual "street" Czech' />
              <FeaturePoint text="Avoid awkward silences" />
            </div>
          </div>
          
          <div className="bg-white border border-black p-12 shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] max-w-md w-full ml-auto lg:sticky lg:top-32">
             <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
                <div className="space-y-2">
                  <label className="font-['Inter'] font-bold text-[12px] leading-[18px] uppercase tracking-[1.2px] text-black">Work Email</label>
                  <input 
                    type="email" 
                    placeholder="name@company.com" 
                    name="email"
                    autoComplete="email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    required
                    className="w-full h-[58px] bg-gray-50 border border-gray-200 px-4 text-gray-900 font-['Montserrat'] focus:outline-none focus:border-black focus:ring-1 focus:ring-black transition-colors"
                  />
                </div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full h-[61px] bg-black text-white font-['Inter'] font-bold text-[14px] leading-[21px] uppercase tracking-[1.2496px] hover:bg-gray-800 focus:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? "Sending..." : "Get the Cheat Sheet"}
                </button>
                <p className="text-center text-[12px] leading-[18px] text-[#6a7282] font-['Montserrat']">
                  We respect your inbox. Unsubscribe at any time.
                </p>
             </form>
          </div>
        </div>
      </Container>
    </Section>
  );
};
