import React from "react";
import clsx from "clsx";
import { Container, Section } from "./Layout";
import { ArrowRightIcon } from "./Icons";
import { useTranslation } from "react-i18next";

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
  <div className="flex flex-col md:flex-row md:items-center justify-between py-6 border-b border-black gap-6 md:gap-0 group hover:bg-gray-50 transition-colors px-0">
    <div className="flex items-start gap-8 w-full md:w-1/3">
      <span className="font-['Montserrat'] font-bold text-[24px] leading-[36px] min-w-[48px]">{level}</span>
      <span className="font-['Montserrat'] font-medium text-[18px] leading-[27px] text-[#4a5565]">{levelDesc}</span>
    </div>
    
    <div className="flex flex-col md:flex-row gap-2 md:gap-12 w-full md:w-1/3 text-[#6a7282] font-['Montserrat'] text-[14px] leading-[21px]">
      <span>{dates}</span>
      <span>{time}</span>
    </div>
    
    <div className="flex items-center justify-between md:justify-end gap-4 w-full md:w-1/3">
      <div className={clsx("font-['Montserrat'] font-bold text-[14px] leading-[21px]", statusColor)}>
        {status}
      </div>
      <div className="opacity-0 group-hover:opacity-100 transition-opacity">
        <ArrowRightIcon />
      </div>
    </div>
  </div>
);

export const CourseList = () => {
  const { t } = useTranslation();
  const rows = [
    {
      level: "A1",
      levelDesc: t("courseList.rows.0.levelDesc", "Total Beginner"),
      dates: t("courseList.rows.0.dates", "Feb 17 - Apr 20"),
      time: t("courseList.rows.0.time", "Mon/Wed 18:00"),
      status: t("courseList.rows.0.status", "3 Spots Left"),
      statusColor: "text-green-600",
    },
    {
      level: "A2",
      levelDesc: t("courseList.rows.1.levelDesc", "Elementary"),
      dates: t("courseList.rows.1.dates", "Feb 18 - Apr 21"),
      time: t("courseList.rows.1.time", "Tue/Thu 18:00"),
      status: t("courseList.rows.1.status", "Waitlist Only"),
      statusColor: "text-gray-400",
    },
    {
      level: "B1",
      levelDesc: t("courseList.rows.2.levelDesc", "Intermediate"),
      dates: t("courseList.rows.2.dates", "Mar 01 - May 15"),
      time: t("courseList.rows.2.time", "Mon/Wed 19:30"),
      status: t("courseList.rows.2.status", "Open"),
      statusColor: "text-black",
    },
  ];

  return (
    <Section className="bg-white" id="courses">
      <Container>
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
          <h2 className="font-['Montserrat'] font-bold text-[20px] sm:text-[22px] md:text-[24px] leading-[36px] tracking-[-0.5px] max-w-xs">
            {t("courseList.title", "UPCOMING INTAKE")}
          </h2>
          <div className="font-['Montserrat'] text-[#6a7282] text-[14px] leading-[21px] max-w-sm">
            <p>{t("courseList.introLine1", "Small groups (max 6). Personal attention.")}</p>
            <p>{t("courseList.introLine2", "Curriculum designed for rapid daily application.")}</p>
          </div>
        </div>
        
        <div className="border-t border-black">
          {rows.map((row) => (
            <CourseRow
              key={`${row.level}-${row.dates}`}
              level={row.level}
              levelDesc={row.levelDesc}
              dates={row.dates}
              time={row.time}
              status={row.status}
              statusColor={row.statusColor}
            />
          ))}
        </div>
        
        <div className="mt-12 flex justify-center md:justify-end">
          <a
            href="mailto:jazykaintegrace@gmail.com?subject=Private%20Czech%20Classes"
            className="inline-flex items-center gap-2 border-b border-black pb-1 hover:text-gray-600 transition-colors font-['Inter'] font-bold text-[14px] leading-[21px] uppercase tracking-[1.2496px]"
          >
            <span>{t("courseList.cta", "Request Private Classes")}</span>
          </a>
        </div>
      </Container>
    </Section>
  );
};
