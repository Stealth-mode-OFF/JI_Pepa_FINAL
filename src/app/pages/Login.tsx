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
      subtitle={t("auth.login.subtitle", "Access your Czech learning journey")}
    >
      <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
        <label className="flex flex-col gap-2 font-['Inter'] font-bold text-[12px] uppercase tracking-[0.6px]">
          {t("auth.email", "Email")}
          <input
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder={t("auth.emailPlaceholder", "your@email.com")}
            required
            className="w-full h-[52px] border border-black px-4 text-[14px] font-['Montserrat'] focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2"
          />
        </label>

        <label className="flex flex-col gap-2 font-['Inter'] font-bold text-[12px] uppercase tracking-[0.6px]">
          {t("auth.password", "Password")}
          <input
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            placeholder={t("auth.passwordPlaceholder", "Enter your password")}
            required
            minLength={8}
            className="w-full h-[52px] border border-black px-4 text-[14px] font-['Montserrat'] focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2"
          />
        </label>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full h-[52px] bg-black text-white font-['Inter'] font-bold text-[14px] uppercase tracking-[1.2496px] hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 transition-all duration-200 disabled:opacity-50"
        >
          {isSubmitting ? t("auth.signing_in", "Signing In...") : t("auth.login.cta", "Sign In")}
        </button>

        <div className="text-center text-[12px] text-[#6a7282] font-['Montserrat'] leading-[18px]">
          {t("auth.noAccount", "Don't have an account?")}{" "}
          <a className="underline" href="/signup">
            {t("auth.signup.cta", "Create Account")}
          </a>
        </div>
      </form>
    </AuthShell>
  );
};
