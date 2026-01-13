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
      title={t("auth.signup.title", "Create Account")}
      subtitle={t("auth.signup.subtitle", "Join our Czech language community")}
    >
      <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
        <label className="flex flex-col gap-2 font-['Inter'] font-bold text-[12px] uppercase tracking-[0.6px]">
          {t("auth.fullName", "Full Name")}
          <input
            type="text"
            value={fullName}
            onChange={(event) => setFullName(event.target.value)}
            placeholder={t("auth.fullNamePlaceholder", "John Doe")}
            required
            className="w-full h-[52px] border border-black px-4 text-[14px] font-['Montserrat'] focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2"
          />
        </label>

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
          {isSubmitting ? t("auth.creatingAccount", "Creating Account...") : t("auth.signup.cta", "Create Account")}
        </button>

        <div className="text-center text-[12px] text-[#6a7282] font-['Montserrat'] leading-[18px]">
          {t("auth.haveAccount", "Already have an account?")}{" "}
          <a className="underline" href="/login">
            {t("auth.login.cta", "Sign In")}
          </a>
        </div>
      </form>
    </AuthShell>
  );
};
