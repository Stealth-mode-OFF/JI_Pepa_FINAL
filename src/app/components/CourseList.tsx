import React from "react";
import clsx from "clsx";
import { Container, Section } from "./Layout";
import { ArrowRightIcon } from "./Icons";

const CourseRow = ({ 
  level, 
  levelDesc, 
  dates, 
  time, 
  status,
  statusColor = "text-black"
}: { 
  level: string; 
  levelDesc: string; 
  dates: string; 
  time: string; 
  status: React.ReactNode;
  statusColor?: string;
}) => (
  <div className="flex flex-col md:flex-row md:items-center justify-between py-8 border-b border-black gap-6 md:gap-0 group hover:bg-gray-50 transition-colors px-4 -mx-4">
    <div className="flex items-center gap-12 w-full md:w-1/3">
      <span className="font-['Montserrat'] font-bold text-2xl w-12">{level}</span>
      <span className="font-['Montserrat'] font-medium text-lg text-gray-600">{levelDesc}</span>
    </div>
    
    <div className="flex flex-col md:flex-row gap-2 md:gap-12 w-full md:w-1/3 text-gray-500 font-['Montserrat']">
      <span>{dates}</span>
      <span>{time}</span>
    </div>
    
    <div className="flex items-center justify-between md:justify-end gap-4 w-full md:w-1/3">
      <div className={clsx("font-['Inter'] font-bold text-xs uppercase tracking-widest", statusColor)}>
        {status}
      </div>
      <div className="opacity-0 group-hover:opacity-100 transition-opacity">
        <ArrowRightIcon />
      </div>
    </div>
  </div>
);

export const CourseList = () => {
  return (
    <Section className="bg-white">
      <Container>
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
          <h2 className="font-['Montserrat'] font-bold text-4xl md:text-6xl leading-tight tracking-tight max-w-xs">
            UPCOMING INTAKE
          </h2>
          <div className="font-['Montserrat'] text-gray-500 max-w-sm">
            <p>Small groups (max 6). Personal attention.</p>
            <p>Curriculum designed for rapid daily application.</p>
          </div>
        </div>
        
        <div className="border-t border-black">
          <CourseRow 
            level="A1" 
            levelDesc="Total Beginner" 
            dates="Feb 17 - Apr 20" 
            time="Mon/Wed 18:00" 
            status="3 Spots Left"
            statusColor="text-green-600"
          />
          <CourseRow 
            level="A2" 
            levelDesc="Elementary" 
            dates="Feb 18 - Apr 21" 
            time="Tue/Thu 18:00" 
            status="Waitlist Only"
            statusColor="text-gray-400"
          />
          <CourseRow 
            level="B1" 
            levelDesc="Intermediate" 
            dates="Mar 01 - May 15" 
            time="Mon/Wed 19:30" 
            status="Open"
            statusColor="text-black"
          />
        </div>
        
        <div className="mt-12 flex justify-center md:justify-end">
          <a href="#" className="inline-flex items-center gap-2 border-b border-black pb-1 hover:text-gray-600 transition-colors">
            <span className="font-['Inter'] font-bold text-sm uppercase tracking-widest">Request Private Classes</span>
          </a>
        </div>
      </Container>
    </Section>
  );
};
