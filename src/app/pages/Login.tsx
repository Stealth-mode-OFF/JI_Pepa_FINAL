import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "sonner";
import { useTranslation } from "react-i18next";
import { AuthShell } from "../components/AuthShell";
import { useAuth } from "../auth/AuthContext";

export const Login = () => {
  const { t } = useTranslation();
  const { signIn } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const from = (location.state as { from?: string } | null)?.from ?? "/onboarding";

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsSubmitting(true);
    const { error } = await signIn(email, password);
    setIsSubmitting(false);
    if (error) {
      toast.error(error);
      return;
    }
    toast.success(t("auth.loginSuccess", "Welcome back."));
    navigate(from, { replace: true });
  };

  return (
    <AuthShell
      title={t("auth.login.title", "Sign In")}
      subtitle={t("auth.login.subtitle", "Welcome back, learner.")}
    >
      <form className="flex flex-col space-y-6" onSubmit={handleSubmit}>
        <div className="space-y-2">
          <label className="font['Inter'] font-bold text-[11px] uppercase tracking-[1px] text-black block">
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
            {t("auth.password", "Password")}
          </label>
          <input
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            placeholder={t("auth.passwordPlaceholder", "Enter your password")}
            required
            minLength={8}
            className="w-full h-[56px] border-2 border-[var(--ds-color-neutral-900-30)] hover:border-[var(--ds-color-neutral-900-60)] focus:border-[var(--ds-color-accent-base)] focus:border-2 px-5 text-[14px] font-[var(--ds-font-family-display)] text-black placeholder-black/40 transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-[var(--ds-color-accent-base-20)] bg-white"
          />
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full h-[56px] bg-black hover:bg-[var(--ds-color-neutral-800)] text-[var(--ds-color-accent-base)] font-[var(--ds-font-family-body)] font-[var(--ds-font-weight-bold)] text-[13px] uppercase tracking-[2px] transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed mt-8 border-2 border-black shadow-[var(--ds-shadow-glow-accent)] hover:shadow-[var(--ds-shadow-accent-dense-lg)]"
        >
          {isSubmitting ? (
            <span className="inline-flex items-center gap-2">
              <span className="animate-spin">⏳</span> {t("auth.signing_in", "Signing In...")}
            </span>
          ) : (
            t("auth.login.cta", "Sign In")
          )}
        </button>

        <div className="pt-4 text-center border-t border-[var(--ds-color-neutral-900-10)]">
          <p className="text-[13px] text-[var(--ds-color-neutral-900-70)] font-[var(--ds-font-family-display)]">
            {t("auth.noAccount", "Don't have an account?")}{" "}
            <a className="font-bold text-black hover:text-[var(--ds-color-accent-base)] transition-colors underline underline-offset-2" href="/signup">
              {t("auth.signup.cta", "Create one")}
            </a>
          </p>
        </div>
      </form>
    </AuthShell>
  );
};
