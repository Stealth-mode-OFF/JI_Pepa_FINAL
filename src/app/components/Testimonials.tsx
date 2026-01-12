import React from "react";
import { Container } from "./Layout";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./ui/carousel";

interface Testimonial {
  quote: string;
  author: string;
  position: string;
}

const testimonials: Testimonial[] = [
  {
    quote: "The method really works. After 6 months I can finally have real conversations with my Czech colleagues.",
    author: "Sarah M.",
    position: "Marketing Manager"
  },
  {
    quote: "I've tried other schools, but this is the only one that made me feel like I'm actually integrating.",
    author: "David K.",
    position: "Software Developer"
  },
  {
    quote: "Practical, effective, and respectful of my time. Exactly what I needed.",
    author: "Anna L.",
    position: "Project Manager"
  }
];

export const Testimonials = () => {
  return (
    <section className="py-24 md:py-32 bg-gray-50">
      <Container>
        <h2 className="font-['Montserrat'] font-bold text-4xl md:text-6xl leading-tight tracking-tighter mb-16 text-center">
          What Our <span className="text-[#9810FA]">Students</span> Say
        </h2>
        
        <Carousel className="w-full max-w-4xl mx-auto">
          <CarouselContent>
            {testimonials.map((testimonial, index) => (
              <CarouselItem key={index}>
                <div className="p-8 md:p-12">
                  <blockquote className="space-y-6">
                    <p className="font-['Montserrat'] font-medium text-xl md:text-2xl text-gray-900 leading-relaxed">
                      "{testimonial.quote}"
                    </p>
                    <footer className="flex flex-col gap-1">
                      <cite className="font-['Inter'] font-bold text-sm text-black not-italic">
                        {testimonial.author}
                      </cite>
                      <span className="font-['Inter'] text-sm text-gray-600">
                        {testimonial.position}
                      </span>
                    </footer>
                  </blockquote>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </Container>
    </section>
  );
};
