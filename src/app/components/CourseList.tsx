import React, { useEffect, useMemo, useState } from "react";
import clsx from "clsx";
import { Container, Section } from "./Layout";
import { ArrowRightIcon } from "./Icons";
import { useTranslation } from "react-i18next";
import { supabase } from "@/utils/supabase/client";

const CourseRow = ({ 
  level, 
  levelDesc, 
  dates, 
  time, 
  status,
  statusColor = "text-black",
  isSelected = false,
  selectLabel = "Select",
  selectedLabel = "Selected",
  onSelect,
}: { 
  level: string; 
  levelDesc: string; 
  dates: string; 
  time: string; 
  status: React.ReactNode;
  statusColor?: string;
  isSelected?: boolean;
  selectLabel?: string;
  selectedLabel?: string;
  onSelect?: () => void;
}) => (
  <div className={clsx(
    "flex flex-col md:flex-row md:items-center justify-between py-8 md:py-6 border-b border-black gap-6 md:gap-4 group transition-all duration-300 px-0",
    isSelected 
      ? "bg-[#FFED00]/10 border-l-4 border-l-[#FFED00] pl-4" 
      : "hover:bg-gray-50/50 hover:pl-2"
  )}>
    <div className="flex items-start md:items-center gap-8 md:gap-12 w-full md:w-1/3">
      <span className={clsx(
        "font-['Montserrat'] font-bold text-[32px] md:text-[24px] leading-[36px] w-12 shrink-0 transition-colors",
        isSelected ? "text-black" : "text-black group-hover:text-[#FFED00]"
      )}>{level}</span>
      <span className="font-['Montserrat'] font-medium text-[18px] md:text-[14px] leading-[27px] md:leading-[21px] text-gray-600">{levelDesc}</span>
    </div>
    
    <div className="flex flex-col md:flex-row gap-4 md:gap-12 w-full md:w-1/3 text-[#6a7282] font-['Montserrat'] text-[14px] leading-[21px]">
      <span className="min-w-max">{dates}</span>
      <span className="min-w-max">{time}</span>
    </div>
    
    <div className="flex items-center justify-between md:justify-end gap-4 w-full md:w-1/3">
      {/* Status Badge */}
      <div className={clsx(
        "px-3 py-1 border-2 border-black font-['Inter'] font-bold text-[11px] uppercase tracking-[0.8px] transition-all",
        statusColor === "text-green-600" && "bg-green-100 border-green-600 text-green-700",
        statusColor === "text-gray-400" && "bg-gray-100 border-gray-400 text-gray-600",
        statusColor === "text-red-600" && "bg-red-100 border-red-600 text-red-700",
        statusColor === "text-black" && "bg-white border-black text-black"
      )}>
        {status}
      </div>
      
      <div className="flex items-center gap-3">
        {onSelect && (
          <button
            type="button"
            onClick={onSelect}
            className={clsx(
              "border-2 border-black px-4 py-2 text-[12px] font-['Inter'] font-bold uppercase tracking-[1px] transition-all duration-200",
              isSelected 
                ? "bg-black text-[#FFED00] shadow-[4px_4px_0_0_rgba(0,0,0,1)] scale-102" 
                : "bg-white text-black hover:bg-[#FFED00] hover:shadow-[4px_4px_0_0_rgba(0,0,0,0.3)]"
            )}
          >
            {isSelected ? `✓ ${selectedLabel}` : selectLabel}
          </button>
        )}
        <div className={clsx(
          "transition-all duration-200",
          isSelected ? "opacity-100" : "opacity-0 group-hover:opacity-100"
        )}>
          <ArrowRightIcon />
        </div>
      </div>
    </div>
  </div>
);

export const CourseList = () => {
  const { t } = useTranslation();
  const [cohorts, setCohorts] = useState<
    Array<{
      id: string;
      start_date: string | null;
      end_date: string | null;
      schedule_text: string | null;
      status: string | null;
      course: { title: string | null; level: string | null } | null;
    }>
  >([]);
  const [selectedCohortId, setSelectedCohortId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const stored = window.localStorage.getItem("selected_cohort_id");
    if (stored) {
      setSelectedCohortId(stored);
    }
  }, []);

  useEffect(() => {
    const loadCohorts = async () => {
      const { data, error } = await supabase
        .from("cohorts")
        .select("id, start_date, end_date, schedule_text, status, course:courses(title, level)")
        .order("start_date", { ascending: true });

      if (error) {
        console.error(error);
      }
      setCohorts(data ?? []);
      setIsLoading(false);
    };

    loadCohorts();
  }, []);

  const formatDateRange = (start?: string | null, end?: string | null) => {
    if (!start || !end) return t("courseList.dateTbd", "Dates TBD");
    const startDate = new Date(start);
    const endDate = new Date(end);
    const startLabel = startDate.toLocaleDateString(undefined, { month: "short", day: "numeric" });
    const endLabel = endDate.toLocaleDateString(undefined, { month: "short", day: "numeric" });
    return `${startLabel} - ${endLabel}`;
  };

  const liveRows = useMemo(
    () =>
      cohorts.map((cohort) => ({
        id: cohort.id,
        level: cohort.course?.level ?? "A1",
        levelDesc: cohort.course?.title ?? t("courseList.levelFallback", "Czech Cohort"),
        dates: formatDateRange(cohort.start_date, cohort.end_date),
        time: cohort.schedule_text ?? t("courseList.timeTbd", "Schedule TBD"),
        status: cohort.status ?? "open",
      })),
    [cohorts, t],
  );
  
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

  const rowsToRender = liveRows.length > 0 ? liveRows : rows;

  return (
    <Section className="bg-white border-t border-black" id="courses">
      <Container>
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-8">
          <h2 className="font-['Montserrat'] font-bold text-[48px] md:text-[64px] leading-[1.1] tracking-[-2px] max-w-sm">
            {t("courseList.title", "UPCOMING INTAKE")}
          </h2>
          <div className="font-['Montserrat'] text-[#6a7282] text-[14px] leading-[21px] max-w-sm space-y-1">
            <p>{t("courseList.introLine1", "Small groups (max 6). Personal attention.")}</p>
            <p>{t("courseList.introLine2", "Curriculum designed for rapid daily application.")}</p>
          </div>
        </div>
        
        <div className="border-t border-black">
          {isLoading && (
            <div className="py-12 flex flex-col items-center gap-4 animate-fade-in">
              <div className="w-12 h-12 border-4 border-black border-t-[#FFED00] rounded-full animate-spin"></div>
              <p className="text-[14px] text-[#6a7282] font-['Montserrat']">
                {t("courseList.loading", "Loading cohorts...")}
              </p>
            </div>
          )}
          {!isLoading && rowsToRender.length === 0 && (
            <div className="py-16 flex flex-col items-center gap-6 animate-fade-in">
              <div className="w-20 h-20 bg-[#FFED00]/20 rounded-full flex items-center justify-center border-2 border-black">
                <span className="text-[40px]">📅</span>
              </div>
              <div className="text-center max-w-md">
                <p className="font-['Montserrat'] font-bold text-[18px] text-black mb-2">
                  {t("courseList.emptyTitle", "No cohorts yet")}
                </p>
                <p className="text-[14px] text-[#6a7282] font-['Montserrat']">
                  {t("courseList.empty", "New cohorts are being scheduled now.")}
                </p>
              </div>
            </div>
          )}
          {!isLoading && rowsToRender.map((row, index) => {
            const isLiveRow = "id" in row;
            const statusLabel = isLiveRow
              ? row.status === "waitlist"
                ? t("courseList.statusWaitlist", "Waitlist")
                : row.status === "closed"
                  ? t("courseList.statusClosed", "Closed")
                  : t("courseList.statusOpen", "Open")
              : row.status;
            const statusColor = isLiveRow
              ? row.status === "waitlist"
                ? "text-gray-400"
                : row.status === "closed"
                  ? "text-red-600"
                  : "text-green-600"
              : row.statusColor ?? "text-black";
            const isSelected = isLiveRow && row.id ? selectedCohortId === row.id : false;

            return (
              <div
                key={`${row.level}-${row.dates}`}
                className="animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CourseRow
                  level={row.level}
                  levelDesc={row.levelDesc}
                  dates={row.dates}
                  time={row.time}
                  status={statusLabel}
                  statusColor={statusColor}
                  isSelected={isSelected}
                  selectLabel={t("courseList.select", "Select")}
                  selectedLabel={t("courseList.selected", "Selected")}
                  onSelect={
                    isLiveRow && row.id
                      ? () => {
                          window.localStorage.setItem("selected_cohort_id", row.id);
                          setSelectedCohortId(row.id);
                        }
                      : undefined
                  }
                />
              </div>
            );
          })}
        </div>
        
        <div className="mt-12 flex justify-center md:justify-end pt-8">
          <a
            href="mailto:jazykaintegrace@gmail.com?subject=Private%20Czech%20Classes"
            className="inline-flex items-center gap-2 border-b border-black pb-2 hover:text-gray-600 transition-colors font-['Inter'] font-bold text-[14px] leading-[21px] uppercase tracking-[1.2496px]"
          >
            <span>{t("courseList.cta", "Request Private Classes")}</span>
          </a>
        </div>
      </Container>
    </Section>
  );
};
