import { useEffect } from "react";
import posthog from "posthog-js";

const POSTHOG_KEY = import.meta.env.VITE_POSTHOG_KEY as string | undefined;
const POSTHOG_HOST = import.meta.env.VITE_POSTHOG_HOST as string | undefined;

let initialized = false;

export const initPostHog = () => {
  if (initialized || !POSTHOG_KEY) {
    return;
  }

  posthog.init(POSTHOG_KEY, {
    api_host: POSTHOG_HOST || "https://app.posthog.com",
    autocapture: false, // Manual event tracking for better control
    capture_pageview: false, // We'll handle this manually
    disable_session_recording: false,
    session_recording: {
      maskAllInputs: true,
      maskTextSelector: "[data-private]",
    },
    loaded: (posthog) => {
      if (import.meta.env.DEV) {
        posthog.debug(false); // Disable debug in dev to reduce noise
      }
    },
  });

  initialized = true;

  // Make PostHog available globally for easy event tracking
  if (typeof window !== "undefined") {
    (window as any).posthog = posthog;
  }
};

export const usePostHog = () => {
  useEffect(() => {
    initPostHog();
  }, []);
};

// Event tracking helpers
export const trackEvent = (eventName: string, properties?: Record<string, any>) => {
  if (typeof window !== "undefined" && (window as any).posthog) {
    (window as any).posthog.capture(eventName, properties);
  }
};

export const trackPageView = (pageName?: string) => {
  if (typeof window !== "undefined" && (window as any).posthog) {
    (window as any).posthog.capture("$pageview", {
      $current_url: window.location.href,
      page_name: pageName,
    });
  }
};

export const identifyUser = (userId: string, properties?: Record<string, any>) => {
  if (typeof window !== "undefined" && (window as any).posthog) {
    (window as any).posthog.identify(userId, properties);
  }
};

export { posthog };
