// Course listings and enrollment interface.
//
// Displays available language courses with intake dates and times.
// Users can click any course row to start enrollment.
// Course selection (cohort ID) is saved to localStorage for later retrieval during onboarding.
//
// Features:
// - Entire course row is clickable (not just a button)
// - Navigates to /signup for new users, /onboarding for logged-in users
// - Shows course level, dates, times, and availability status
// - Fetches course data from Supabase on mount
// - Internationalized with i18next

import type { User } from "@supabase/supabase-js";
import clsx from "clsx";
import { type MouseEvent, type ReactNode,useCallback, useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";

import { type CohortSummary,coursesApi } from "@/features/courses/api";
import { ButtonLink } from "@/shared/ui";

import { useAuth } from "../auth/AuthContext";
import { ArrowRightIcon } from "./Icons";
import { Container, Section } from "./Layout";

// Individual course row component - entire row is clickable for enrollment
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
  cohortId,
  user,
}: { 
  level: string; 
  levelDesc: string; 
  dates: string; 
  time: string; 
  status: ReactNode;
  statusColor?: string;
  isSelected?: boolean;
  selectLabel?: string;
  selectedLabel?: string;
  onSelect?: () => void;
  cohortId?: string;
  user?: User | null;
}) => {
  // Clicking anywhere in the row navigates to signup/onboarding
  const handleClick = () => {
    if (onSelect && cohortId) {
      onSelect();
    }
    // Navigate to appropriate page based on auth status
    window.location.href = user ? "/onboarding" : "/signup";
  };

  return (
    <a 
      href={user ? "/onboarding" : "/signup"}
      onClick={(event: MouseEvent<HTMLAnchorElement>) => {
        event.preventDefault();
        handleClick();
      }}
      className={clsx(
        "block flex flex-col md:flex-row md:items-center justify-between py-8 md:py-6 border-b border-black gap-6 md:gap-4 group transition-all duration-300 px-0 cursor-pointer",
        isSelected 
          ? "bg-[var(--ds-color-accent-base-10)] border-l-4 border-l-[var(--ds-color-accent-base)] pl-4" 
          : "hover:bg-gray-50/50 hover:pl-2"
      )}
    >
    <div className="flex items-start md:items-center gap-8 md:gap-12 w-full md:w-1/3">
      <span className={clsx(
        "font-[var(--ds-font-family-display)] font-[var(--ds-font-weight-bold)] text-[32px] md:text-[24px] leading-[36px] w-12 shrink-0 transition-colors",
        isSelected ? "text-black" : "text-black group-hover:text-[var(--ds-color-accent-base)]"
      )}>{level}</span>
      <span className="font-[var(--ds-font-family-display)] font-[var(--ds-font-weight-medium)] text-[18px] md:text-[14px] leading-[27px] md:leading-[21px] text-[var(--ds-color-neutral-600)]">{levelDesc}</span>
    </div>
    
    <div className="flex flex-col md:flex-row gap-4 md:gap-12 w-full md:w-1/3 text-[var(--ds-color-neutral-700)] font-[var(--ds-font-family-display)] text-[14px] leading-[21px]">
      <span className="min-w-max">{dates}</span>
      <span className="min-w-max">{time}</span>
    </div>
    
    <div className="flex items-center justify-between md:justify-end gap-4 w-full md:w-1/3">
      {/* Status Badge */}
      <div className={clsx(
        "px-3 py-1 border-2 border-black font-[var(--ds-font-family-body)] font-[var(--ds-font-weight-bold)] text-[11px] uppercase tracking-[0.8px] transition-all",
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
            onClick={(event: MouseEvent<HTMLButtonElement>) => {
              event.preventDefault();
              event.stopPropagation();
              onSelect();
            }}
            className={clsx(
              "border-2 border-black px-4 py-2 text-[12px] font-[var(--ds-font-family-body)] font-[var(--ds-font-weight-bold)] uppercase tracking-[1px] transition-all duration-200",
              isSelected 
                ? "bg-black text-[var(--ds-color-accent-base)] shadow-[var(--ds-shadow-dense-lg)] scale-102" 
                : "bg-white text-black hover:bg-[var(--ds-color-accent-base)] hover:shadow-[var(--ds-shadow-dense-sm)]"
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
  </a>
  );
};

export const CourseList = () => {
  const { t } = useTranslation();
  const { user } = useAuth();
  const [cohorts, setCohorts] = useState<CohortSummary[]>([]);
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
      const { data, error } = await coursesApi.listCohorts();
      if (error) {
        setCohorts([]);
      } else {
        setCohorts(data);
      }
      setIsLoading(false);
    };

    loadCohorts();
  }, []);

  const formatDateRange = useCallback(
    (start?: string | null, end?: string | null) => {
      if (!start || !end) return t("courseList.dateTbd", "Dates TBD");
      const startDate = new Date(start);
      const endDate = new Date(end);
      const startLabel = startDate.toLocaleDateString(undefined, { month: "short", day: "numeric" });
      const endLabel = endDate.toLocaleDateString(undefined, { month: "short", day: "numeric" });
      return `${startLabel} - ${endLabel}`;
    },
    [t],
  );

  const liveRows = useMemo(
    () =>
      cohorts.map((cohort) => ({
        id: cohort.id,
        level: cohort.course?.level ?? "A1",
        levelDesc: cohort.course?.title ?? t("courseList.levelFallback", "Czech Cohort"),
        dates: formatDateRange(cohort.startDate, cohort.endDate),
        time: cohort.scheduleText ?? t("courseList.timeTbd", "Schedule TBD"),
        status: cohort.status ?? "open",
      })),
    [cohorts, formatDateRange, t],
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
    <Section className="bg-[var(--ds-color-neutral-0)] border-t border-[var(--ds-color-neutral-900)]" id="courses">
      <Container>
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-8">
          <h2 className="font-[var(--ds-font-family-display)] font-[var(--ds-font-weight-bold)] text-[48px] md:text-[64px] leading-[1.1] tracking-[-2px] max-w-sm">
            {t("courseList.title", "UPCOMING INTAKE")}
          </h2>
          <div className="font-[var(--ds-font-family-display)] text-[var(--ds-color-neutral-700)] text-[14px] leading-[21px] max-w-sm space-y-1">
            <p>{t("courseList.introLine1", "Small groups (max 6). Personal attention.")}</p>
            <p>{t("courseList.introLine2", "Curriculum designed for rapid daily application.")}</p>
          </div>
        </div>
        
        <div className="border-t border-[var(--ds-color-neutral-900)]">
          {isLoading && (
            <div className="py-12 flex flex-col items-center gap-4 animate-fade-in">
              <div className="w-12 h-12 border-4 border-black border-t-[var(--ds-color-accent-base)] rounded-full animate-spin"></div>
              <p className="text-[14px] text-[var(--ds-color-neutral-700)] font-[var(--ds-font-family-display)]">
                {t("courseList.loading", "Loading cohorts...")}
              </p>
            </div>
          )}
          {!isLoading && rowsToRender.length === 0 && (
            <div className="py-16 flex flex-col items-center gap-6 animate-fade-in">
              <div className="w-20 h-20 bg-[var(--ds-color-accent-base-20)] rounded-full flex items-center justify-center border-2 border-black">
                <span className="text-[40px]">📅</span>
              </div>
              <div className="text-center max-w-md">
                <p className="font-[var(--ds-font-family-display)] font-[var(--ds-font-weight-bold)] text-[18px] text-black mb-2">
                  {t("courseList.emptyTitle", "No cohorts yet")}
                </p>
                <p className="text-[14px] text-[var(--ds-color-neutral-700)] font-[var(--ds-font-family-display)]">
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
                  cohortId={isLiveRow && row.id ? row.id : undefined}
                  user={user}
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
            href="mailto:josef@jazykaintegrace.cz?subject=Private%20Czech%20Classes"
            className="inline-flex items-center gap-2 border-b border-black pb-2 hover:text-[var(--ds-color-neutral-600)] transition-colors font-[var(--ds-font-family-body)] font-[var(--ds-font-weight-bold)] text-[14px] leading-[21px] uppercase tracking-[1.2496px]"
          >
            <span>{t("courseList.cta", "Request Private Classes")}</span>
          </a>
        </div>

        <div className="mt-6 flex flex-col items-center gap-3">
          <ButtonLink
            href={user ? "/onboarding" : "/signup"}
            className={clsx(
              "h-[52px] px-6 bg-black text-white font-[var(--ds-font-family-body)] font-[var(--ds-font-weight-bold)] text-[12px] uppercase tracking-[1.2px] transition-all duration-200",
              selectedCohortId ? "opacity-100" : "opacity-70",
            )}
          >
            {selectedCohortId
              ? t("courseList.enrollCtaSelected", "Continue with selected cohort")
              : t("courseList.enrollCta", "Start enrollment")}
          </ButtonLink>
          {!selectedCohortId && (
            <p className="text-[12px] text-[var(--ds-color-neutral-700)] font-[var(--ds-font-family-display)]">
              {t("courseList.selectHint", "Select a cohort to speed up checkout.")}
            </p>
          )}
        </div>
      </Container>
    </Section>
  );
};
