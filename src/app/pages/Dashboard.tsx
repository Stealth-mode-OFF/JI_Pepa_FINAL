import React, { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { AuthShell } from "../components/AuthShell";
import { useAuth } from "../auth/AuthContext";
import { ButtonLink, Card } from "@/shared/ui";
import { studentsApi } from "@/features/students/api";
import type { Enrollment, Payment, StudentProfile } from "@/features/students/types";

export const Dashboard = () => {
  const { t } = useTranslation();
  const { user } = useAuth();
  const [profile, setProfile] = useState<StudentProfile | null>(null);
  const [enrollment, setEnrollment] = useState<Enrollment | null>(null);
  const [payment, setPayment] = useState<Payment | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      if (!user) {
        setLoading(false);
        return;
      }

      const { data: profileData } = await studentsApi.getProfile(user.id);
      const { data: enrollmentData } = await studentsApi.getLatestEnrollment(user.id);

      let paymentData: Payment | null = null;
      if (enrollmentData?.id) {
        const { data } = await studentsApi.getLatestPayment(enrollmentData.id);
        paymentData = data ?? null;
      }

      setProfile(profileData);
      setEnrollment(enrollmentData);
      setPayment(paymentData);
      setLoading(false);
    };

    loadData();
  }, [user]);

  const profileComplete = useMemo(() => {
    if (!profile) return false;
    return Boolean(profile.fullName && profile.level);
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
        <Card>
          <p className="type-ui-sm text-[var(--ds-color-neutral-700)]">
            {t("dashboard.profileLabel", "Profile")}
          </p>
          <div className="mt-4 space-y-2 font-[var(--ds-font-family-display)] text-[16px]">
            <div>
              <span className="font-bold">{t("dashboard.fullName", "Name")}:</span>{" "}
              {profile?.fullName ?? t("dashboard.missing", "Missing")}
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
        </Card>

        <Card>
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
            {enrollment?.cohort?.scheduleText && (
              <div>
                <span className="font-bold">{t("dashboard.schedule", "Schedule")}:</span>{" "}
                {enrollment.cohort.scheduleText}
              </div>
            )}
          </div>
        </Card>

        <ButtonLink
          href={nextAction.href}
          className="h-[52px] bg-black text-white font-['Inter'] font-bold text-[14px] uppercase tracking-[1.2496px] hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 transition-all duration-200"
        >
          {nextAction.label}
        </ButtonLink>
      </div>
    </AuthShell>
  );
};
