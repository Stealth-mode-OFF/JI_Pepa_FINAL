import React from "react";
import { Container, Section } from "./Layout";
import { CheckIcon, FreeResourceIcon } from "./Icons";
import { useForm, SubmitHandler } from 'react-hook-form';
import { submitLead } from '../../utils/leadMagnet';

interface LeadFormData {
  email: string;
}

const FeaturePoint = ({ text }: { text: string }) => (
  <div className="flex items-center gap-3">
    <div className="w-5 h-5 bg-black rounded-full flex items-center justify-center shrink-0">
      <CheckIcon />
    </div>
    <span className="font-['Montserrat'] font-bold text-sm text-black">{text}</span>
  </div>
);

export const LeadMagnet = () => {
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<LeadFormData>();

  const onSubmit: SubmitHandler<LeadFormData> = async (data) => {
    await submitLead(data.email);
  };

  return (
    <Section className="bg-[#FFED00] border-b border-black">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          <div className="space-y-8">
            <div className="inline-flex items-center gap-3 bg-white/50 border border-black rounded-full px-4 py-1.5 w-fit">
              <FreeResourceIcon />
              <span className="font-['Inter'] font-bold text-xs uppercase tracking-widest text-black">Free Resource</span>
            </div>
            
            <h2 className="font-['Montserrat'] font-bold text-4xl md:text-6xl leading-tight tracking-tight text-black">
              STOP SOUNDING<br />LIKE A TEXTBOOK.
            </h2>
            
            <div className="space-y-4">
              <p className="font-['Montserrat'] font-medium text-lg leading-relaxed text-black/80 max-w-md">
                Most courses teach you grammar tables. Locals don't speak in tables.
              </p>
              <p className="font-['Montserrat'] font-medium text-lg leading-relaxed text-black/80 max-w-md">
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
             <form className="flex flex-col gap-6" onSubmit={handleSubmit(onSubmit)}>
                <div className="space-y-2">
                  <label className="font-['Inter'] font-bold text-xs uppercase tracking-widest text-black">Work Email</label>
                  <input 
                    type="email" 
                    placeholder="name@company.com" 
                    className="w-full h-[58px] bg-gray-50 border border-gray-200 px-4 text-gray-900 font-['Montserrat'] focus:outline-none focus:border-black transition-colors"
                    {...register('email', { required: 'Email is required' })}
                  />
                  {errors.email && <span className="text-red-500 text-xs">{errors.email.message as string}</span>}
                </div>
                <button className="w-full h-[61px] bg-black text-white font-['Inter'] font-bold text-sm uppercase tracking-widest hover:bg-gray-800 transition-colors" disabled={isSubmitting}>
                  {isSubmitting ? 'Submitting...' : 'Get the Cheat Sheet'}
                </button>
                <p className="text-center text-xs text-gray-400 font-['Montserrat']">
                  We respect your inbox. Unsubscribe at any time.
                </p>
             </form>
          </div>
        </div>
      </Container>
    </Section>
  );
};
