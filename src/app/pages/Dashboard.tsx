import React, { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { AuthShell } from "../components/AuthShell";
import { useAuth } from "../auth/AuthContext";
import { supabase } from "@/utils/supabase/client";

type Profile = {
  full_name: string | null;
  level: string | null;
  goals: string | null;
};

type Enrollment = {
  id: string;
  status: string;
  paid: boolean;
  cohort?: {
    start_date: string | null;
    end_date: string | null;
    schedule_text: string | null;
    course?: {
      title: string | null;
      level: string | null;
    } | null;
  } | null;
};

type Payment = {
  status: string | null;
};

export const Dashboard = () => {
  const { t } = useTranslation();
  const { user } = useAuth();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [enrollment, setEnrollment] = useState<Enrollment | null>(null);
  const [payment, setPayment] = useState<Payment | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      if (!user) {
        setLoading(false);
        return;
      }

      const { data: profileData } = await supabase
        .from("student_profiles")
        .select("full_name, level, goals")
        .eq("user_id", user.id)
        .maybeSingle();

      const { data: enrollmentData } = await supabase
        .from("enrollments")
        .select("id, status, paid, cohort:cohorts(start_date, end_date, schedule_text, course:courses(title, level))")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false })
        .limit(1)
        .maybeSingle();

      let paymentData: Payment | null = null;
      if (enrollmentData?.id) {
        const { data } = await supabase
          .from("payments")
          .select("status")
          .eq("enrollment_id", enrollmentData.id)
          .order("created_at", { ascending: false })
          .limit(1)
          .maybeSingle();
        paymentData = data ?? null;
      }

      setProfile(profileData ?? null);
      setEnrollment(enrollmentData ?? null);
      setPayment(paymentData);
      setLoading(false);
    };

    loadData();
  }, [user]);

  const profileComplete = useMemo(() => {
    if (!profile) return false;
    return Boolean(profile.full_name && profile.level);
  }, [profile]);

  const enrollmentStatus = enrollment?.status ?? "none";
  const paymentStatus = payment?.status ?? (enrollment?.paid ? "paid" : "unpaid");

  const nextAction = useMemo(() => {
    if (!profileComplete) {
      return {
        label: t("dashboard.action.completeProfile", "Complete your profile"),
        href: "/onboarding",
      };
    }
    if (!enrollment) {
      return {
        label: t("dashboard.action.reserveSeat", "Reserve a seat"),
        href: "/checkout",
      };
    }
    if (paymentStatus !== "paid") {
      return {
        label: t("dashboard.action.finishPayment", "Finish payment"),
        href: "/checkout",
      };
    }
    return {
      label: t("dashboard.action.contact", "Contact support"),
      href: "mailto:josef@jazykaintegrace.cz",
    };
  }, [profileComplete, enrollment, paymentStatus, t]);

  if (loading) {
    return (
      <AuthShell
        title={t("dashboard.title", "Your student dashboard")}
        subtitle={t("dashboard.subtitle", "Track onboarding and enrollment status.")}
      >
        <p className="font-[var(--ds-font-family-display)] text-[16px] text-[var(--ds-color-neutral-700)]">
          {t("dashboard.loading", "Loading your dashboard...")}
        </p>
      </AuthShell>
    );
  }

  return (
    <AuthShell
      title={t("dashboard.title", "Your student dashboard")}
      subtitle={t("dashboard.subtitle", "Track onboarding and enrollment status.")}
    >
      <div className="flex flex-col gap-8">
        <div className="border border-black bg-white shadow-[var(--ds-shadow-dense-xl)] p-6">
          <p className="type-ui-sm text-[var(--ds-color-neutral-700)]">
            {t("dashboard.profileLabel", "Profile")}
          </p>
          <div className="mt-4 space-y-2 font-[var(--ds-font-family-display)] text-[16px]">
            <div>
              <span className="font-bold">{t("dashboard.fullName", "Name")}:</span>{" "}
              {profile?.full_name ?? t("dashboard.missing", "Missing")}
            </div>
            <div>
              <span className="font-bold">{t("dashboard.level", "Level")}:</span>{" "}
              {profile?.level ?? t("dashboard.missing", "Missing")}
            </div>
            {profile?.goals && (
              <div>
                <span className="font-bold">{t("dashboard.goals", "Goals")}:</span> {profile.goals}
              </div>
            )}
          </div>
        </div>

        <div className="border border-black bg-white shadow-[var(--ds-shadow-dense-xl)] p-6">
          <p className="type-ui-sm text-[var(--ds-color-neutral-700)]">
            {t("dashboard.enrollmentLabel", "Enrollment")}
          </p>
          <div className="mt-4 space-y-2 font-[var(--ds-font-family-display)] text-[16px]">
            <div>
              <span className="font-bold">{t("dashboard.enrollmentStatus", "Status")}:</span>{" "}
              {t(`dashboard.status.${enrollmentStatus}`, enrollmentStatus)}
            </div>
            <div>
              <span className="font-bold">{t("dashboard.paymentStatus", "Payment")}:</span>{" "}
              {t(`dashboard.payment.${paymentStatus}`, paymentStatus)}
            </div>
            {enrollment?.cohort?.course?.title && (
              <div>
                <span className="font-bold">{t("dashboard.course", "Course")}:</span>{" "}
                {enrollment.cohort.course.title}
              </div>
            )}
            {enrollment?.cohort?.schedule_text && (
              <div>
                <span className="font-bold">{t("dashboard.schedule", "Schedule")}:</span>{" "}
                {enrollment.cohort.schedule_text}
              </div>
            )}
          </div>
        </div>

        <a
          href={nextAction.href}
          className="inline-flex items-center justify-center h-[52px] bg-black text-white font-['Inter'] font-bold text-[14px] uppercase tracking-[1.2496px] hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 transition-all duration-200"
        >
          {nextAction.label}
        </a>
      </div>
    </AuthShell>
  );
};
