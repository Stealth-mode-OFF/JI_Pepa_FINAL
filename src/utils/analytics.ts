import posthog from "posthog-js";

const POSTHOG_KEY = import.meta.env.VITE_POSTHOG_KEY as string | undefined;
const POSTHOG_HOST = import.meta.env.VITE_POSTHOG_HOST as string | undefined;

let analyticsInitialized = false;

type PosthogClient = {
  opt_in_capturing: () => void;
  opt_out_capturing: () => void;
  reset: () => void;
  capture: (eventName: string, properties?: Record<string, unknown>) => void;
  debug: (enabled: boolean) => void;
};

const getPosthog = (): PosthogClient | null => {
  if (typeof window === "undefined") return null;
  return (window as Window & { posthog?: PosthogClient }).posthog ?? null;
};

export const initializeAnalyticsTracking = () => {
  if (analyticsInitialized || !POSTHOG_KEY) return;

  posthog.init(POSTHOG_KEY, {
    api_host: POSTHOG_HOST || "https://app.posthog.com",
    opt_out_capturing_by_default: true,
    persistence: "localStorage+cookie",
    autocapture: false,
    capture_pageview: false,
    disable_session_recording: false,
    session_recording: {
      maskAllInputs: true,
      maskTextSelector: "[data-private]",
    },
    loaded: (client) => {
      if (import.meta.env.DEV) {
        client.debug(false);
      }
    },
  });

  analyticsInitialized = true;

  if (typeof window !== "undefined") {
    (window as Window & { posthog?: PosthogClient }).posthog = posthog;
  }
};

export const grantAnalyticsConsent = () => {
  initializeAnalyticsTracking();

  const client = getPosthog();
  if (client) {
    client.opt_in_capturing();
  }
};

export const revokeAnalyticsConsent = () => {
  const client = getPosthog();
  if (client) {
    client.opt_out_capturing();
    client.reset();
  }
};

export const trackEvent = (eventName: string, properties?: Record<string, unknown>) => {
  const client = getPosthog();
  if (client) {
    client.capture(eventName, properties);
  }
};

export const trackPageView = (pageName?: string) => {
  const client = getPosthog();
  if (client) {
    client.capture("$pageview", {
      $current_url: window.location.href,
      page_name: pageName,
    });
  }
};
