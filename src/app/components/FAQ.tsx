import React from "react";
import { Container } from "./Layout";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./ui/accordion";

interface FAQItem {
  question: string;
  answer: string;
}

const faqData: FAQItem[] = [
  {
    question: "How long does it take to complete a level?",
    answer: "Each level (A1, A2, B1, B2) typically takes 3-4 months with consistent attendance and practice. We focus on practical integration rather than rushing through material."
  },
  {
    question: "What makes your method different?",
    answer: "We focus on real-world integration, not just grammar drills. You'll learn the Czech you actually need in Prague—ordering coffee, dealing with úřady, making friends. No toy conversations about cats and apples."
  },
  {
    question: "Can I join mid-semester?",
    answer: "It depends on the course and your level. Contact us to discuss your specific situation and we'll find the best solution."
  },
  {
    question: "Do you offer online classes?",
    answer: "We primarily focus on in-person classes in Prague for better integration. However, we may offer online options for specific situations—contact us to discuss."
  },
  {
    question: "What's included in the course price?",
    answer: "All course materials, access to our learning platform, and ongoing support from instructors. No hidden fees or expensive textbook requirements."
  }
];

export const FAQ = () => {
  return (
    <section className="py-24 md:py-32 scroll-mt-24" id="faq">
      <Container>
        <h2 className="font-['Montserrat'] font-bold text-4xl md:text-6xl leading-tight tracking-tighter mb-16">
          Frequently Asked <span className="text-[#FFED00]">Questions</span>
        </h2>
        
        <Accordion type="single" collapsible className="w-full max-w-3xl">
          {faqData.map((item, index) => (
            <AccordionItem key={index} value={`item-${index}`}>
              <AccordionTrigger className="font-['Montserrat'] font-semibold text-lg md:text-xl text-left">
                {item.question}
              </AccordionTrigger>
              <AccordionContent className="font-['Inter'] text-base text-gray-700 leading-relaxed">
                {item.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </Container>
    </section>
  );
};
