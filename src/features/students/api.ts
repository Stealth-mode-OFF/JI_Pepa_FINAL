import { supabase } from "@/utils/supabase/client";
import type { Enrollment, OnboardingProfile, OnboardingSavePayload, Payment, StudentProfile } from "./types";

export const studentsApi = {
  getProfile: async (userId: string): Promise<{ data: StudentProfile | null; error: string | null }> => {
    const { data, error } = await supabase
      .from("student_profiles")
      .select("full_name, level, goals")
      .eq("user_id", userId)
      .maybeSingle();

    return {
      data: data
        ? {
            fullName: data.full_name,
            level: data.level,
            goals: data.goals,
          }
        : null,
      error: error?.message ?? null,
    };
  },

  getOnboarding: async (userId: string): Promise<{ data: OnboardingProfile | null; error: string | null }> => {
    const { data, error } = await supabase
      .from("student_onboarding")
      .select("level, goals, life_situation, availability_slots, time_preference")
      .eq("user_id", userId)
      .maybeSingle();

    return {
      data: data
        ? {
            level: data.level,
            goals: data.goals ?? [],
            lifeSituation: data.life_situation,
            availabilitySlots: data.availability_slots ?? [],
            timePreference: data.time_preference,
          }
        : null,
      error: error?.message ?? null,
    };
  },

  saveProfile: async (userId: string, fullName: string) =>
    supabase.from("student_profiles").upsert(
      {
        user_id: userId,
        full_name: fullName,
      },
      { onConflict: "user_id" },
    ),

  saveOnboarding: async (userId: string, payload: OnboardingSavePayload) =>
    supabase.from("student_onboarding").upsert(
      {
        user_id: userId,
        level: payload.level,
        goals: payload.goals,
        life_situation: payload.lifeSituation,
        availability_slots: payload.availabilitySlots,
        time_preference: payload.timePreference,
        completed_at: new Date().toISOString(),
      },
      { onConflict: "user_id" },
    ),

  getLatestEnrollment: async (userId: string): Promise<{ data: Enrollment | null; error: string | null }> => {
    const { data, error } = await supabase
      .from("enrollments")
      .select("id, status, paid, cohort:cohorts(start_date, end_date, schedule_text, course:courses(title, level))")
      .eq("user_id", userId)
      .order("created_at", { ascending: false })
      .limit(1)
      .maybeSingle();

    return {
      data: data
        ? {
            id: data.id,
            status: data.status,
            paid: data.paid,
            cohort: data.cohort
              ? {
                  startDate: data.cohort.start_date,
                  endDate: data.cohort.end_date,
                  scheduleText: data.cohort.schedule_text,
                  course: data.cohort.course ?? null,
                }
              : null,
          }
        : null,
      error: error?.message ?? null,
    };
  },

  getLatestPayment: async (enrollmentId: string): Promise<{ data: Payment | null; error: string | null }> => {
    const { data, error } = await supabase
      .from("payments")
      .select("status")
      .eq("enrollment_id", enrollmentId)
      .order("created_at", { ascending: false })
      .limit(1)
      .maybeSingle();

    return {
      data: data
        ? {
            status: data.status,
          }
        : null,
      error: error?.message ?? null,
    };
  },
};
