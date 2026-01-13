import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";
import { supabase } from "@/utils/supabase/client";
import { useAuth } from "../auth/AuthContext";
import { AuthShell } from "../components/AuthShell";

type ProfileForm = {
  fullName: string;
  level: string;
  goals: string;
  availability: string;
  phone: string;
};

const emptyForm: ProfileForm = {
  fullName: "",
  level: "",
  goals: "",
  availability: "",
  phone: "",
};

export const Onboarding = () => {
  const { t } = useTranslation();
  const { user } = useAuth();
  const [form, setForm] = useState<ProfileForm>(emptyForm);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    const loadProfile = async () => {
      if (!user) {
        setIsLoading(false);
        return;
      }
      const { data, error } = await supabase
        .from("student_profiles")
        .select("full_name, level, goals, availability, phone")
        .eq("user_id", user.id)
        .maybeSingle();
      if (error) {
        console.error(error);
      }
      setForm({
        fullName: data?.full_name ?? user.user_metadata?.full_name ?? "",
        level: data?.level ?? "",
        goals: data?.goals ?? "",
        availability: data?.availability ?? "",
        phone: data?.phone ?? "",
      });
      setIsLoading(false);
    };
    loadProfile();
  }, [user]);

  const updateField = (key: keyof ProfileForm, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!user) {
      toast.error(t("onboarding.notAuthenticated", "Please log in first."));
      return;
    }
    setIsSaving(true);
    const { error } = await supabase.from("student_profiles").upsert(
      {
        user_id: user.id,
        full_name: form.fullName,
        level: form.level,
        goals: form.goals,
        availability: form.availability,
        phone: form.phone,
      },
      { onConflict: "user_id" },
    );
    setIsSaving(false);
    if (error) {
      toast.error(error.message);
      return;
    }
    toast.success(t("onboarding.saved", "Profile saved. Next up: payment."));
  };

  if (isLoading) {
    return (
      <AuthShell
        title={t("onboarding.title", "Tell us about your Czech journey")}
        subtitle={t(
          "onboarding.subtitle",
          "We use this to match you to the right class and schedule.",
        )}
      >
        <p className="font-['Montserrat'] text-[16px] text-[#6a7282]">
          {t("onboarding.loading", "Loading your profile...")}
        </p>
      </AuthShell>
    );
  }

  return (
    <AuthShell
      title={t("onboarding.title", "Tell us about your Czech journey")}
      subtitle={t(
        "onboarding.subtitle",
        "We use this to match you to the right class and schedule.",
      )}
    >
      <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
        <label className="flex flex-col gap-2 font-['Inter'] font-bold text-[12px] uppercase tracking-[0.6px]">
          {t("onboarding.fullNameLabel", "Full name")}
          <input
            type="text"
            value={form.fullName}
            onChange={(event) => updateField("fullName", event.target.value)}
            placeholder={t("onboarding.fullNamePlaceholder", "Your name")}
            required
            className="w-full h-[52px] border border-black px-4 text-[14px] font-['Montserrat'] focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2"
          />
        </label>

        <label className="flex flex-col gap-2 font-['Inter'] font-bold text-[12px] uppercase tracking-[0.6px]">
          {t("onboarding.levelLabel", "Current level")}
          <select
            value={form.level}
            onChange={(event) => updateField("level", event.target.value)}
            required
            className="w-full h-[52px] border border-black px-4 text-[14px] font-['Montserrat'] bg-white focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2"
          >
            <option value="">{t("onboarding.levelPlaceholder", "Select your level")}</option>
            <option value="A1">{t("onboarding.levelA1", "A1 - Total beginner")}</option>
            <option value="A2">{t("onboarding.levelA2", "A2 - Elementary")}</option>
            <option value="B1">{t("onboarding.levelB1", "B1 - Intermediate")}</option>
            <option value="B2">{t("onboarding.levelB2", "B2 - Upper intermediate")}</option>
          </select>
        </label>

        <label className="flex flex-col gap-2 font-['Inter'] font-bold text-[12px] uppercase tracking-[0.6px]">
          {t("onboarding.goalsLabel", "Goals")}
          <textarea
            value={form.goals}
            onChange={(event) => updateField("goals", event.target.value)}
            placeholder={t("onboarding.goalsPlaceholder", "What would you love to do in Czech?")}
            rows={4}
            className="w-full border border-black px-4 py-3 text-[14px] font-['Montserrat'] focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2"
          />
        </label>

        <label className="flex flex-col gap-2 font-['Inter'] font-bold text-[12px] uppercase tracking-[0.6px]">
          {t("onboarding.availabilityLabel", "Availability")}
          <input
            type="text"
            value={form.availability}
            onChange={(event) => updateField("availability", event.target.value)}
            placeholder={t("onboarding.availabilityPlaceholder", "Evenings, weekends, etc.")}
            className="w-full h-[52px] border border-black px-4 text-[14px] font-['Montserrat'] focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2"
          />
        </label>

        <label className="flex flex-col gap-2 font-['Inter'] font-bold text-[12px] uppercase tracking-[0.6px]">
          {t("onboarding.phoneLabel", "Phone (optional)")}
          <input
            type="tel"
            value={form.phone}
            onChange={(event) => updateField("phone", event.target.value)}
            placeholder={t("onboarding.phonePlaceholder", "+420 777 123 456")}
            className="w-full h-[52px] border border-black px-4 text-[14px] font-['Montserrat'] focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2"
          />
        </label>

        <button
          type="submit"
          disabled={isSaving}
          className="w-full h-[52px] bg-black text-white font-['Inter'] font-bold text-[14px] uppercase tracking-[1.2496px] hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 transition-all duration-200 disabled:opacity-50"
        >
          {isSaving ? t("onboarding.saving", "Saving...") : t("onboarding.saveCta", "Save profile")}
        </button>

        <a
          href="/checkout"
          className="text-center text-[12px] text-[#6a7282] font-['Inter'] font-bold uppercase tracking-[1.2px] underline"
        >
          {t("onboarding.continueToPayment", "Continue to payment")}
        </a>
      </form>
    </AuthShell>
  );
};
