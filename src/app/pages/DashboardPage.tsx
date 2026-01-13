import React from 'react';
import { useTranslation } from 'react-i18next';
import { Container, Section } from '../components/Layout';
import { useAuth } from '../contexts/AuthContext';

interface DashboardPageProps {
  onNavigate: (page: string) => void;
}

export const DashboardPage: React.FC<DashboardPageProps> = ({ onNavigate }) => {
  const { t } = useTranslation();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    onNavigate('home');
  };

  return (
    <Section className="min-h-screen bg-white pt-32 pb-32">
      <Container>
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="mb-12 pb-12 border-b-2 border-black flex items-start justify-between">
            <div>
              <h1 className="font-['Montserrat'] font-bold text-[48px] leading-[1.1] tracking-[-2px] text-black mb-2">
                {t('auth.dashboard.title', 'Welcome back')}
              </h1>
              <p className="font-['Montserrat'] text-[18px] leading-[28px] text-gray-600">
                {user?.fullName || user?.email}
              </p>
            </div>
            <button
              onClick={handleLogout}
              className="h-[48px] px-6 bg-black text-white font-['Inter'] font-bold text-[12px] uppercase tracking-[1px] hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 transition-all duration-200 border border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,0.1)]"
            >
              {t('auth.logout', 'Logout')}
            </button>
          </div>

          {/* Welcome Section */}
          <div className="bg-yellow-50 border-2 border-black p-8 mb-12 shadow-[12px_12px_0px_0px_rgba(0,0,0,0.1)]">
            <h2 className="font-['Montserrat'] font-bold text-[28px] leading-[36px] text-black mb-4">
              {t('auth.dashboard.section1Title', 'Your Learning Journey')}
            </h2>
            <p className="font-['Montserrat'] text-[16px] leading-[24px] text-gray-700 mb-4">
              {t('auth.dashboard.section1Desc', 'You\'re now signed in and ready to start learning Czech. Access your courses, track your progress, and connect with our learning community.')}
            </p>
            <ul className="space-y-3 ml-4">
              <li className="font-['Montserrat'] text-[14px] leading-[21px] text-gray-700 flex items-start">
                <span className="text-black font-bold mr-3">→</span>
                <span>{t('auth.dashboard.feature1', 'Track your learning progress')}</span>
              </li>
              <li className="font-['Montserrat'] text-[14px] leading-[21px] text-gray-700 flex items-start">
                <span className="text-black font-bold mr-3">→</span>
                <span>{t('auth.dashboard.feature2', 'Access all course materials')}</span>
              </li>
              <li className="font-['Montserrat'] text-[14px] leading-[21px] text-gray-700 flex items-start">
                <span className="text-black font-bold mr-3">→</span>
                <span>{t('auth.dashboard.feature3', 'Join our community forums')}</span>
              </li>
            </ul>
          </div>

          {/* User Info Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <div className="bg-white border-2 border-black p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,0.1)]">
              <h3 className="font-['Inter'] font-bold text-[12px] uppercase tracking-[0.6px] text-black mb-4">
                {t('auth.dashboard.accountInfo', 'Account Information')}
              </h3>
              <div className="space-y-4">
                <div>
                  <p className="font-['Montserrat'] text-[12px] text-gray-600 mb-1">
                    {t('auth.fullName', 'Full Name')}
                  </p>
                  <p className="font-['Montserrat'] font-bold text-[16px] text-black">
                    {user?.fullName || '—'}
                  </p>
                </div>
                <div>
                  <p className="font-['Montserrat'] text-[12px] text-gray-600 mb-1">
                    {t('auth.email', 'Email')}
                  </p>
                  <p className="font-['Montserrat'] font-bold text-[16px] text-black break-all">
                    {user?.email}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white border-2 border-black p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,0.1)]">
              <h3 className="font-['Inter'] font-bold text-[12px] uppercase tracking-[0.6px] text-black mb-4">
                {t('auth.dashboard.memberSince', 'Member Since')}
              </h3>
              <p className="font-['Montserrat'] text-[16px] text-gray-600 mb-6">
                {new Date().toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </p>
              <button
                onClick={() => onNavigate('home')}
                className="w-full h-[44px] bg-yellow-300 text-black font-['Inter'] font-bold text-[12px] uppercase tracking-[0.6px] hover:bg-yellow-400 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 transition-all duration-200 border border-black"
              >
                {t('auth.dashboard.backHome', 'Back to Home')}
              </button>
            </div>
          </div>

          {/* Coming Soon Section */}
          <div className="bg-gray-50 border-2 border-dashed border-gray-300 p-8 text-center">
            <h3 className="font-['Montserrat'] font-bold text-[24px] leading-[32px] text-gray-700 mb-2">
              {t('auth.dashboard.comingSoon', 'More Features Coming Soon')}
            </h3>
            <p className="font-['Montserrat'] text-[14px] leading-[21px] text-gray-600">
              {t('auth.dashboard.comingSoonDesc', 'Enrollment management, payment integration, and progress tracking are coming to your dashboard soon.')}
            </p>
          </div>
        </div>
      </Container>
    </Section>
  );
};
