import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useTranslation } from "react-i18next";
import { AuthShell } from "../components/AuthShell";
import { useAuth } from "../auth/AuthContext";

export const Signup = () => {
  const { t } = useTranslation();
  const { signUp } = useAuth();
  const navigate = useNavigate();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsSubmitting(true);
    const { error } = await signUp(email, password, fullName);
    setIsSubmitting(false);
    if (error) {
      toast.error(error);
      return;
    }
    toast.success(t("auth.signupSuccess", "Account created. Check your email to confirm."));
    navigate("/onboarding");
  };

  return (
    <AuthShell
      title={t("auth.signup.title", "Get Started")}
      subtitle={t("auth.signup.subtitle", "Join 500+ learners mastering Czech daily.")}
      isSignup
    >
      <form className="flex flex-col space-y-5" onSubmit={handleSubmit}>
        {/* Step indicator */}
        <div className="flex gap-2 mb-6">
          <div className="h-2 flex-1 bg-[var(--ds-color-accent-base)]"></div>
          <div className="h-2 flex-1 bg-[var(--ds-color-accent-base)]"></div>
          <div className="h-2 flex-1 bg-black/20"></div>
        </div>

        <div className="space-y-2">
          <label className="font-[var(--ds-font-family-body)] font-[var(--ds-font-weight-bold)] text-[11px] uppercase tracking-[1px] text-black block">
            {t("auth.fullName", "Your Name")}
          </label>
          <input
            type="text"
            value={fullName}
            onChange={(event) => setFullName(event.target.value)}
            placeholder={t("auth.fullNamePlaceholder", "John Doe")}
            required
            className="w-full h-[56px] border-2 border-[var(--ds-color-neutral-900-30)] hover:border-[var(--ds-color-neutral-900-60)] focus:border-[var(--ds-color-accent-base)] focus:border-2 px-5 text-[14px] font-[var(--ds-font-family-display)] text-black placeholder-black/40 transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-[var(--ds-color-accent-base-20)] bg-white"
          />
        </div>

        <div className="space-y-2">
          <label className="font-[var(--ds-font-family-body)] font-[var(--ds-font-weight-bold)] text-[11px] uppercase tracking-[1px] text-black block">
            {t("auth.email", "Email Address")}
          </label>
          <input
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder={t("auth.emailPlaceholder", "your@email.com")}
            required
            className="w-full h-[56px] border-2 border-[var(--ds-color-neutral-900-30)] hover:border-[var(--ds-color-neutral-900-60)] focus:border-[var(--ds-color-accent-base)] focus:border-2 px-5 text-[14px] font-[var(--ds-font-family-display)] text-black placeholder-black/40 transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-[var(--ds-color-accent-base-20)] bg-white"
          />
        </div>

        <div className="space-y-2">
          <label className="font-[var(--ds-font-family-body)] font-[var(--ds-font-weight-bold)] text-[11px] uppercase tracking-[1px] text-black block">
            {t("auth.password", "Create Password")}
          </label>
          <input
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            placeholder={t("auth.passwordPlaceholder", "Min. 8 characters")}
            required
            minLength={8}
            className="w-full h-[56px] border-2 border-[var(--ds-color-neutral-900-30)] hover:border-[var(--ds-color-neutral-900-60)] focus:border-[var(--ds-color-accent-base)] focus:border-2 px-5 text-[14px] font-[var(--ds-font-family-display)] text-black placeholder-black/40 transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-[var(--ds-color-accent-base-20)] bg-white"
          />
          <p className="text-[11px] text-[var(--ds-color-neutral-900-50)] font-[var(--ds-font-family-display)] mt-1">Must be at least 8 characters</p>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full h-[56px] bg-[var(--ds-color-accent-base)] hover:bg-[var(--ds-color-accent-dark)] text-black font-[var(--ds-font-family-body)] font-[var(--ds-font-weight-bold)] text-[13px] uppercase tracking-[2px] transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed mt-8 border-2 border-black shadow-[var(--ds-shadow-md)] hover:shadow-[var(--ds-shadow-lg)]"
        >
          {isSubmitting ? (
            <span className="inline-flex items-center gap-2">
              <span className="animate-spin">⌛</span> {t("auth.creatingAccount", "Creating Account...")}
            </span>
          ) : (
            t("auth.signup.cta", "Create Account")
          )}
        </button>

        {/* Features list */}
        <div className="space-y-3 pt-6 border-t border-[var(--ds-color-neutral-900-10)]">
          <p className="text-[11px] font-[var(--ds-font-family-body)] font-[var(--ds-font-weight-bold)] uppercase tracking-[1px] text-black">After signing up:</p>
          <ul className="space-y-2 text-[13px] font-[var(--ds-font-family-display)] text-[var(--ds-color-neutral-900-70)]">
            <li className="flex gap-3">
              <span className="text-[var(--ds-color-accent-base)] font-bold">✓</span> Access all course materials
            </li>
            <li className="flex gap-3">
              <span className="text-[var(--ds-color-accent-base)] font-bold">✓</span> Track your learning progress
            </li>
            <li className="flex gap-3">
              <span className="text-[var(--ds-color-accent-base)] font-bold">✓</span> Connect with other learners
            </li>
          </ul>
        </div>

        <div className="text-center pt-2">
          <p className="text-[13px] text-[var(--ds-color-neutral-900-70)] font-[var(--ds-font-family-display)]">
            Already learning with us?{" "}
            <a className="font-bold text-black hover:text-[var(--ds-color-accent-base)] transition-colors underline underline-offset-2" href="/login">
              Sign in
            </a>
          </p>
        </div>
      </form>
    </AuthShell>
  );
};
