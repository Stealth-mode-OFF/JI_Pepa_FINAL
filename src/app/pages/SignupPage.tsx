import React from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Container, Section } from '../components/Layout';
import { useAuth } from '../contexts/AuthContext';

interface SignupFormInputs {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

interface SignupPageProps {
  onNavigate: (page: string) => void;
}

export const SignupPage: React.FC<SignupPageProps> = ({ onNavigate }) => {
  const { t } = useTranslation();
  const { signup, isLoading, error } = useAuth();
  const { register, handleSubmit, formState: { errors }, watch } = useForm<SignupFormInputs>();
  const password = watch('password');

  const onSubmit = async (data: SignupFormInputs) => {
    try {
      await signup(data.email, data.password, data.fullName);
      onNavigate('dashboard');
    } catch (err) {
      // Error is handled by AuthContext
    }
  };

  return (
    <Section className="min-h-screen bg-white pt-32 pb-32">
      <Container>
        <div className="max-w-md mx-auto">
          {/* Header */}
          <div className="mb-12">
            <h1 className="font-['Montserrat'] font-bold text-[48px] leading-[1.1] tracking-[-2px] text-black mb-4">
              {t('auth.signup.title', 'Create Account')}
            </h1>
            <p className="font-['Montserrat'] text-[18px] leading-[28px] text-gray-600 mb-6">
              {t('auth.signup.subtitle', 'Join our Czech language community')}
            </p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded">
              <p className="font-['Montserrat'] text-[14px] leading-[21px] text-red-700">
                {error}
              </p>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Full Name Field */}
            <div className="space-y-2">
              <label className="font-['Inter'] font-bold text-[12px] uppercase tracking-[0.6px] text-black block">
                {t('auth.fullName', 'Full Name')}
              </label>
              <input
                type="text"
                placeholder={t('auth.fullNamePlaceholder', 'John Doe')}
                {...register('fullName', {
                  required: t('auth.errors.fullNameRequired', 'Full name is required'),
                  minLength: {
                    value: 2,
                    message: t('auth.errors.fullNameMinLength', 'Full name must be at least 2 characters'),
                  },
                })}
                className="w-full h-[52px] bg-white border-2 border-black px-4 text-[14px] font-['Montserrat'] text-black focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 transition-all duration-200"
              />
              {errors.fullName && (
                <p className="text-[12px] text-red-600 font-['Montserrat']">
                  {errors.fullName.message}
                </p>
              )}
            </div>

            {/* Email Field */}
            <div className="space-y-2">
              <label className="font-['Inter'] font-bold text-[12px] uppercase tracking-[0.6px] text-black block">
                {t('auth.email', 'Email')}
              </label>
              <input
                type="email"
                placeholder={t('auth.emailPlaceholder', 'your@email.com')}
                {...register('email', {
                  required: t('auth.errors.emailRequired', 'Email is required'),
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: t('auth.errors.emailInvalid', 'Invalid email format'),
                  },
                })}
                className="w-full h-[52px] bg-white border-2 border-black px-4 text-[14px] font-['Montserrat'] text-black focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 transition-all duration-200"
              />
              {errors.email && (
                <p className="text-[12px] text-red-600 font-['Montserrat']">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <label className="font-['Inter'] font-bold text-[12px] uppercase tracking-[0.6px] text-black block">
                {t('auth.password', 'Password')}
              </label>
              <input
                type="password"
                placeholder={t('auth.passwordPlaceholder', 'Create a password')}
                {...register('password', {
                  required: t('auth.errors.passwordRequired', 'Password is required'),
                  minLength: {
                    value: 8,
                    message: t('auth.errors.passwordMinLength', 'Password must be at least 8 characters'),
                  },
                })}
                className="w-full h-[52px] bg-white border-2 border-black px-4 text-[14px] font-['Montserrat'] text-black focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 transition-all duration-200"
              />
              {errors.password && (
                <p className="text-[12px] text-red-600 font-['Montserrat']">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Confirm Password Field */}
            <div className="space-y-2">
              <label className="font-['Inter'] font-bold text-[12px] uppercase tracking-[0.6px] text-black block">
                {t('auth.confirmPassword', 'Confirm Password')}
              </label>
              <input
                type="password"
                placeholder={t('auth.confirmPasswordPlaceholder', 'Confirm your password')}
                {...register('confirmPassword', {
                  required: t('auth.errors.confirmPasswordRequired', 'Please confirm your password'),
                  validate: (value) =>
                    value === password || t('auth.errors.passwordMismatch', 'Passwords do not match'),
                })}
                className="w-full h-[52px] bg-white border-2 border-black px-4 text-[14px] font-['Montserrat'] text-black focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 transition-all duration-200"
              />
              {errors.confirmPassword && (
                <p className="text-[12px] text-red-600 font-['Montserrat']">
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full h-[52px] bg-yellow-300 text-black font-['Inter'] font-bold text-[14px] uppercase tracking-[1.2496px] hover:bg-yellow-400 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed border border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,0.1)]"
            >
              {isLoading ? t('auth.creatingAccount', 'Creating Account...') : t('auth.signup.cta', 'Create Account')}
            </button>
          </form>

          {/* Footer */}
          <div className="mt-8 pt-8 border-t border-gray-200 text-center space-y-4">
            <p className="font-['Montserrat'] text-[14px] leading-[21px] text-gray-600">
              {t('auth.haveAccount', 'Already have an account?')}
              <button
                onClick={() => onNavigate('login')}
                className="ml-2 font-bold text-black hover:text-gray-700 underline transition-colors"
              >
                {t('auth.login.cta', 'Sign In')}
              </button>
            </p>
            <button
              onClick={() => onNavigate('home')}
              className="font-['Montserrat'] text-[14px] leading-[21px] text-gray-600 hover:text-black underline transition-colors"
            >
              {t('auth.backHome', 'Back to Home')}
            </button>
          </div>
        </div>
      </Container>
    </Section>
  );
};
