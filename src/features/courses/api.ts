import { supabase } from "@/utils/supabase/client";

export type CohortSummary = {
  id: string;
  startDate: string | null;
  endDate: string | null;
  scheduleText: string | null;
  status: string | null;
  course: {
    title: string | null;
    level: string | null;
  } | null;
};

type CohortRow = {
  id: string;
  start_date: string | null;
  end_date: string | null;
  schedule_text: string | null;
  status: string | null;
  course:
    | {
        title: string | null;
        level: string | null;
      }
    | {
        title: string | null;
        level: string | null;
      }[]
    | null;
};

export const coursesApi = {
  listCohorts: async (): Promise<{ data: CohortSummary[]; error: string | null }> => {
    const { data, error } = await supabase
      .from("cohorts")
      .select("id, start_date, end_date, schedule_text, status, course:courses(title, level)")
      .order("start_date", { ascending: true });

    const rows = (data ?? []) as CohortRow[];
    const mapped = rows.map((cohort) => ({
      id: cohort.id,
      startDate: cohort.start_date,
      endDate: cohort.end_date,
      scheduleText: cohort.schedule_text,
      status: cohort.status,
      course: Array.isArray(cohort.course) ? cohort.course[0] ?? null : cohort.course ?? null,
    }));

    return { data: mapped, error: error?.message ?? null };
  },
};
