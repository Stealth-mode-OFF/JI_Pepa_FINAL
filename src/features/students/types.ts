export type StudentProfile = {
  fullName: string | null;
  level: string | null;
  goals: string | null;
};

export type Enrollment = {
  id: string;
  status: string;
  paid: boolean;
  cohort?: {
    startDate: string | null;
    endDate: string | null;
    scheduleText: string | null;
    course?: {
      title: string | null;
      level: string | null;
    } | null;
  } | null;
};

export type Payment = {
  status: string | null;
};

export type OnboardingProfile = {
  level: string | null;
  goals: string[];
  lifeSituation: string | null;
  availabilitySlots: string[];
  timePreference: string | null;
};

export type OnboardingSavePayload = {
  level: string;
  goals: string[];
  lifeSituation: string;
  availabilitySlots: string[];
  timePreference: string;
};
