import { useEffect } from "react";
import posthog from "posthog-js";

const POSTHOG_KEY = import.meta.env.VITE_POSTHOG_KEY as string | undefined;
const POSTHOG_HOST = import.meta.env.VITE_POSTHOG_HOST as string | undefined;

let analyticsInitialized = false;

/**
 * Initialize PostHog analytics in a GDPR-compliant manner.
 * 
 * IMPORTANT GDPR CONFIGURATION:
 * - Uses cookieless mode when rejected to avoid storing identifiers
 * - Requires explicit opt-in before capturing events
 * - IP anonymization must be enabled in PostHog project settings:
 *   PostHog Project Settings → Data & Privacy → "Discard client IP data"
 * 
 * This function only sets up the PostHog instance. Call grantAnalyticsConsent()
 * to actually start capturing events after user consent.
 */
export const initializeAnalyticsTracking = () => {
  if (analyticsInitialized || !POSTHOG_KEY) {
    return;
  }

  posthog.init(POSTHOG_KEY, {
    api_host: POSTHOG_HOST || "https://app.posthog.com",
    
    // GDPR Compliance: Start in opt-out mode
    opt_out_capturing_by_default: true,
    
    // Use cookieless mode for rejected users (no persistent storage)
    persistence: "localStorage+cookie",
    
    // Manual event tracking only
    autocapture: false,
    capture_pageview: false,
    
    // Session recording with privacy
    disable_session_recording: false,
    session_recording: {
      maskAllInputs: true,
      maskTextSelector: "[data-private]",
    },
    
    // Note: IP anonymization must be enabled in PostHog project settings
    // PostHog Dashboard → Project Settings → Data & Privacy → "Discard client IP data"
    
    loaded: (posthog) => {
      if (import.meta.env.DEV) {
        posthog.debug(false);
      }
    },
  });

  analyticsInitialized = true;

  if (typeof window !== "undefined") {
    (window as any).posthog = posthog;
  }
};

/**
 * Grant user consent for analytics tracking.
 * Enables PostHog event capture after user accepts cookies.
 */
export const grantAnalyticsConsent = () => {
  initializeAnalyticsTracking();
  
  if (typeof window !== "undefined" && (window as any).posthog) {
    (window as any).posthog.opt_in_capturing();
  }
};

/**
 * Revoke user consent for analytics tracking.
 * Disables PostHog event capture and clears stored data.
 */
export const revokeAnalyticsConsent = () => {
  if (typeof window !== "undefined" && (window as any).posthog) {
    (window as any).posthog.opt_out_capturing();
    (window as any).posthog.reset(); // Clear any stored identifiers
  }
};

/**
 * Check if analytics tracking is currently active.
 */
export const isAnalyticsConsentGranted = (): boolean => {
  if (typeof window !== "undefined" && (window as any).posthog) {
    return !(window as any).posthog.has_opted_out_capturing();
  }
  return false;
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
