import { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

import { studentsApi } from "@/features/students/api";

import { useAuth } from "../auth/AuthContext";
import { AuthShell } from "../components/AuthShell";

type Step = 0 | 1 | 2 | 3;

type OnboardingForm = {
  fullName: string;
  level: string;
  goals: string[];
  lifeSituation: string;
  availabilitySlots: string[];
  timePreference: string;
};

const emptyForm: OnboardingForm = {
  fullName: "",
  level: "",
  goals: [],
  lifeSituation: "",
  availabilitySlots: [],
  timePreference: "",
};

const toggleValue = (values: string[], value: string) =>
  values.includes(value) ? values.filter((item) => item !== value) : [...values, value];

export const Onboarding = () => {
  const { t } = useTranslation();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState<OnboardingForm>(emptyForm);
  const [step, setStep] = useState<Step>(0);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    const loadProfile = async () => {
      if (!user) {
        setIsLoading(false);
        return;
      }
      const { data: profileData } = await studentsApi.getProfile(user.id);
      const { data: onboardingData } = await studentsApi.getOnboarding(user.id);

      setForm({
        fullName: profileData?.fullName ?? user.user_metadata?.full_name ?? "",
        level: onboardingData?.level ?? "",
        goals: onboardingData?.goals ?? [],
        lifeSituation: onboardingData?.lifeSituation ?? "",
        availabilitySlots: onboardingData?.availabilitySlots ?? [],
        timePreference: onboardingData?.timePreference ?? "",
      });
      setIsLoading(false);
    };

    loadProfile();
  }, [user]);

  const levelOptions = useMemo(
    () => [
      { value: "A1", label: t("onboarding.levelA1", "A1 - Total beginner") },
      { value: "A2", label: t("onboarding.levelA2", "A2 - Elementary") },
      { value: "B1", label: t("onboarding.levelB1", "B1 - Intermediate") },
      { value: "B2", label: t("onboarding.levelB2", "B2 - Upper intermediate") },
      { value: "B2+", label: t("onboarding.levelB2Plus", "B2+ - Near native") },
    ],
    [t],
  );

  const goalOptions = useMemo(
    () => [
      { value: "professional", label: t("onboarding.goalProfessional", "Professional integration") },
      { value: "relationships", label: t("onboarding.goalRelationships", "Personal relationships") },
      { value: "study", label: t("onboarding.goalStudy", "Study or residency") },
      { value: "culture", label: t("onboarding.goalCulture", "Cultural interest") },
      { value: "business", label: t("onboarding.goalBusiness", "Business opportunity") },
    ],
    [t],
  );

  const lifeOptions = useMemo(
    () => [
      { value: "just_moved", label: t("onboarding.lifeJustMoved", "Just moved to Prague") },
      { value: "living_6m", label: t("onboarding.lifeLiving", "Living here 6+ months") },
      { value: "planning_move", label: t("onboarding.lifePlanning", "Planning to move soon") },
      { value: "visiting", label: t("onboarding.lifeVisiting", "Visiting frequently") },
    ],
    [t],
  );

  const availabilityOptions = useMemo(
    () => [
      { value: "mon_18", label: t("onboarding.availMon18", "Mon 18:00") },
      { value: "tue_18", label: t("onboarding.availTue18", "Tue 18:00") },
      { value: "wed_1930", label: t("onboarding.availWed1930", "Wed 19:30") },
      { value: "thu_18", label: t("onboarding.availThu18", "Thu 18:00") },
      { value: "fri_19", label: t("onboarding.availFri19", "Fri 19:00") },
      { value: "weekend", label: t("onboarding.availWeekend", "Weekend flexible") },
      { value: "anytime", label: t("onboarding.availAnytime", "Anytime") },
    ],
    [t],
  );

  const timePreferences = useMemo(
    () => [
      { value: "morning", label: t("onboarding.prefMorning", "Early morning") },
      { value: "evening", label: t("onboarding.prefEvening", "Evening learner") },
      { value: "flexible", label: t("onboarding.prefFlexible", "Flexible") },
    ],
    [t],
  );

  const canProceed = useMemo(() => {
    if (step === 0) return true;
    if (step === 1) return Boolean(form.level);
    if (step === 2) return form.goals.length > 0 && Boolean(form.lifeSituation);
    if (step === 3) return form.availabilitySlots.length > 0 && Boolean(form.timePreference);
    return false;
  }, [form, step]);

  const handleSubmit = async () => {
    if (!user) {
      toast.error(t("onboarding.notAuthenticated", "Please log in first."));
      return;
    }
    setIsSaving(true);
    const { error: profileError } = await studentsApi.saveProfile(user.id, form.fullName);
    const { error: onboardingError } = await studentsApi.saveOnboarding(user.id, {
      level: form.level,
      goals: form.goals,
      lifeSituation: form.lifeSituation,
      availabilitySlots: form.availabilitySlots,
      timePreference: form.timePreference,
    });

    setIsSaving(false);
    if (profileError || onboardingError) {
      toast.error(profileError?.message ?? onboardingError?.message ?? "Save failed");
      return;
    }
    toast.success(t("onboarding.saved", "Profile saved. Next up: payment."));
    navigate("/checkout");
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
        <p className="font-[var(--ds-font-family-display)] text-[16px] text-[var(--ds-color-neutral-700)]">
          {t("onboarding.loading", "Loading your profile...")}
        </p>
      </AuthShell>
    );
  }

  return (
    <AuthShell
      title={t("onboarding.title", "Tell us about your Czech journey")}
      subtitle={t("onboarding.stepLabel", "Step {{step}} of 4", { step: step + 1 })}
    >
      <div className="flex flex-col gap-8">
        {/* Progress Bar */}
        <div className="h-2 w-full bg-[var(--ds-color-neutral-200)] rounded-full overflow-hidden">
          <div
            className="h-full bg-[var(--ds-color-accent-base)] transition-all duration-500 ease-out"
            style={{ width: `${((step + 1) / 4) * 100}%` }}
          />
        </div>

        {/* Step 0: Welcome */}
        {step === 0 && (
          <div className="animate-fade-in space-y-6">
            <div className="space-y-4">
              <h2 className="font-['Montserrat'] font-bold text-[36px] md:text-[44px] leading-[1.2] tracking-[-1px] text-black">
                {t("onboarding.welcomeTitle", "Welcome,")} <br />
                {form.fullName ? form.fullName.split(" ")[0] : "friend"}
                {t("onboarding.welcomeTitleEnd", "!")}
              </h2>
              <p className="font-[var(--ds-font-family-display)] text-[16px] leading-[24px] text-[var(--ds-color-neutral-700)] max-w-md">
                {t(
                  "onboarding.welcomeBody",
                  "Welcome. We'll set up your perfect class in a few quick steps.",
                )}
              </p>
            </div>

            <label className="flex flex-col gap-3 font-[var(--ds-font-family-body)] font-[var(--ds-font-weight-bold)] text-[11px] uppercase tracking-[1px]">
              {t("onboarding.fullNameLabel", "Full name")}
              <input
                type="text"
                value={form.fullName}
                onChange={(event) => setForm((prev) => ({ ...prev, fullName: event.target.value }))}
                placeholder={t("onboarding.fullNamePlaceholder", "Your name")}
                required
                className="w-full h-[56px] border-2 border-black px-4 text-[14px] font-[var(--ds-font-family-display)] focus:outline-none focus:ring-2 focus:ring-[var(--ds-color-accent-base)] focus:ring-offset-2 transition-all"
              />
            </label>
          </div>
        )}

        {/* Step 1: Level Selection (Card Carousel) */}
        {step === 1 && (
          <div className="animate-fade-in space-y-6">
            <div>
              <h2 className="font-['Montserrat'] font-bold text-[28px] md:text-[32px] text-black mb-2">
                {t("onboarding.levelIntro", "Where do you feel you are today?")}
              </h2>
              <p className="font-[var(--ds-font-family-display)] text-[14px] text-[var(--ds-color-neutral-700)]">
                {t("onboarding.levelSubtitle", "Choose the level that feels most accurate.")}
              </p>
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-5 auto-rows-min">
              {levelOptions.map((option, idx) => {
                const colors = [
                  "from-[var(--ds-gradient-level-a1-from)] to-[var(--ds-gradient-level-a1-to)]", // A1 green
                  "from-[var(--ds-gradient-level-a2-from)] to-[var(--ds-gradient-level-a2-to)]", // A2 blue
                  "from-[var(--ds-gradient-level-b1-from)] to-[var(--ds-gradient-level-b1-to)]", // B1 purple
                  "from-[var(--ds-gradient-level-b2-from)] to-[var(--ds-gradient-level-b2-to)]", // B2 red
                  "from-[var(--ds-gradient-level-b2plus-from)] to-[var(--ds-gradient-level-b2plus-to)]", // B2+ gold
                ];
                const isSelected = form.level === option.value;

                return (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => setForm((prev) => ({ ...prev, level: option.value }))}
                    className={`relative h-[180px] bg-gradient-to-br ${colors[idx]} border-2 p-6 flex flex-col justify-between transition-all duration-300 ${
                      isSelected
                        ? "border-black shadow-[var(--ds-shadow-dense-lg)] scale-105"
                        : "border-[var(--ds-color-neutral-200)] hover:border-black hover:shadow-[var(--ds-shadow-glow-accent)] hover:scale-102"
                    }`}
                  >
                    {/* Checkmark */}
                    {isSelected && (
                      <div className="absolute top-3 right-3 w-8 h-8 bg-black rounded-full flex items-center justify-center text-white font-bold text-[18px] animate-scale-in">
                        ✓
                      </div>
                    )}

                    {/* Content */}
                    <div className="text-left text-white">
                      <span className="font-[var(--ds-font-family-body)] font-[var(--ds-font-weight-bold)] text-[20px]">{option.value}</span>
                    </div>
                    <div className="text-left">
                      <p className="font-[var(--ds-font-family-display)] font-[var(--ds-font-weight-bold)] text-[14px] text-white">
                        {option.label}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Step 2: Goals & Life Situation (Multi-Select Tags) */}
        {step === 2 && (
          <div className="animate-fade-in space-y-8">
            <div className="space-y-4">
              <h2 className="font-['Montserrat'] font-bold text-[28px] md:text-[32px] text-black">
                {t("onboarding.goalsIntro", "Why are you learning Czech?")}
              </h2>
              <div className="flex flex-wrap gap-3">
                {goalOptions.map((option) => (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() =>
                      setForm((prev) => ({
                        ...prev,
                        goals: toggleValue(prev.goals, option.value),
                      }))
                    }
                    className={`px-4 py-3 rounded-full border-2 font-[var(--ds-font-family-body)] font-[var(--ds-font-weight-bold)] text-[13px] uppercase tracking-[1px] transition-all duration-200 ${
                      form.goals.includes(option.value)
                        ? "bg-[var(--ds-color-accent-base)] border-black text-black shadow-[var(--ds-shadow-dense-md)]"
                        : "bg-white border-black text-black hover:bg-[var(--ds-color-accent-base-20)]"
                    }`}
                  >
                    {form.goals.includes(option.value) && <span className="mr-2">✓</span>}
                    {option.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <h2 className="font-['Montserrat'] font-bold text-[24px] text-black">
                {t("onboarding.lifeIntro", "Where are you in your Prague journey?")}
              </h2>
              <div className="grid gap-3 md:grid-cols-2">
                {lifeOptions.map((option) => (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => setForm((prev) => ({ ...prev, lifeSituation: option.value }))}
                    className={`border-2 px-4 py-4 text-left transition-all duration-200 ${
                      form.lifeSituation === option.value
                        ? "bg-[var(--ds-color-accent-base)] border-black shadow-[var(--ds-shadow-dense-md)]"
                        : "bg-white border-[var(--ds-color-neutral-900-30)] hover:border-black"
                    }`}
                  >
                    {form.lifeSituation === option.value && (
                      <span className="font-bold text-[16px] mr-2">✓</span>
                    )}
                    <span className="font-[var(--ds-font-family-display)] text-[14px]">{option.label}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Step 3: Availability & Time Preference (Chips + Toggles) */}
        {step === 3 && (
          <div className="animate-fade-in space-y-8">
            <div className="space-y-4">
              <h2 className="font-['Montserrat'] font-bold text-[28px] md:text-[32px] text-black">
                {t("onboarding.availabilityIntro", "When can you attend?")}
              </h2>
              <div className="flex flex-wrap gap-2">
                {availabilityOptions.map((option) => (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() =>
                      setForm((prev) => ({
                        ...prev,
                        availabilitySlots: toggleValue(prev.availabilitySlots, option.value),
                      }))
                    }
                    className={`px-3 py-2 rounded-full border-2 font-[var(--ds-font-family-body)] font-[var(--ds-font-weight-bold)] text-[12px] uppercase tracking-[0.8px] transition-all duration-200 ${
                      form.availabilitySlots.includes(option.value)
                        ? "bg-[var(--ds-color-accent-base)] border-black text-black shadow-[var(--ds-shadow-dense-sm)]"
                        : "bg-white border-black text-black hover:bg-[var(--ds-color-accent-base-10)]"
                    }`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <h2 className="font-['Montserrat'] font-bold text-[24px] text-black">
                {t("onboarding.prefIntro", "Which timing feels best?")}
              </h2>
              <div className="flex flex-wrap gap-3">
                {timePreferences.map((option) => (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => setForm((prev) => ({ ...prev, timePreference: option.value }))}
                    className={`px-4 py-3 rounded-full border-2 font-[var(--ds-font-family-body)] font-[var(--ds-font-weight-bold)] text-[12px] uppercase tracking-[0.8px] transition-all duration-200 ${
                      form.timePreference === option.value
                        ? "bg-[var(--ds-color-accent-base)] border-black text-black shadow-[var(--ds-shadow-dense-md)]"
                        : "bg-white border-black text-black hover:bg-[var(--ds-color-accent-base-20)]"
                    }`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Navigation & CTA */}
        <div className="border-t border-[var(--ds-color-neutral-900-20)] pt-6 flex flex-col sm:flex-row gap-3">
          {step > 0 && (
            <button
              type="button"
              onClick={() => setStep((prev) => ((prev - 1) as Step))}
              className="h-[52px] bg-white border-2 border-black text-black px-6 font-[var(--ds-font-family-body)] font-[var(--ds-font-weight-bold)] text-[13px] uppercase tracking-[1px] hover:bg-black hover:text-white transition-colors duration-200"
            >
              {t("onboarding.back", "← Back")}
            </button>
          )}
          {step < 3 && (
            <button
              type="button"
              onClick={() => setStep((prev) => ((prev + 1) as Step))}
              disabled={!canProceed}
              className="h-[52px] bg-black text-[var(--ds-color-accent-base)] border-2 border-black px-6 font-[var(--ds-font-family-body)] font-[var(--ds-font-weight-bold)] text-[13px] uppercase tracking-[1px] hover:translate-x-[-2px] hover:translate-y-[-2px] transition-transform disabled:opacity-40 disabled:cursor-not-allowed"
            >
              {t("onboarding.next", "Next →")}
            </button>
          )}
          {step === 3 && (
            <button
              type="button"
              onClick={handleSubmit}
              disabled={!canProceed || isSaving}
              className="h-[52px] bg-black text-[var(--ds-color-accent-base)] border-2 border-black px-6 font-[var(--ds-font-family-body)] font-[var(--ds-font-weight-bold)] text-[13px] uppercase tracking-[1px] hover:translate-x-[-2px] hover:translate-y-[-2px] transition-transform shadow-[var(--ds-shadow-dense-md)] disabled:opacity-40 disabled:cursor-not-allowed"
            >
              {isSaving ? t("onboarding.saving", "Saving...") : t("onboarding.finish", "Complete")}
            </button>
          )}
        </div>
      </div>
    </AuthShell>
  );
};
