// GDPR-compliant analytics integration via PostHog.
// 
// This module handles analytics initialization and consent management.
// Key principles:
// - Analytics is DISABLED by default (opt_out_capturing_by_default: true)
// - Users must explicitly grant consent before tracking starts
// - Tracking can be paused/resumed via grantAnalyticsConsent/revokeAnalyticsConsent
// - IP anonymization must be enabled in PostHog dashboard (manual step)
//
// Usage:
// 1. App initializes this module on startup (deferred until after consent banner)
// 2. CookieConsent.tsx calls grantAnalyticsConsent() or revokeAnalyticsConsent()
// 3. Components use trackEvent() for manual event logging
// 4. See GDPR_COMPLIANCE.md for full implementation details

import posthog from "posthog-js";

const POSTHOG_KEY = import.meta.env.VITE_POSTHOG_KEY as string | undefined;
const POSTHOG_HOST = import.meta.env.VITE_POSTHOG_HOST as string | undefined;

let analyticsInitialized = false;

/**
 * Initialize PostHog analytics in a GDPR-compliant manner.
 * 
 * IMPORTANT GDPR CONFIGURATION:
 * - Users start in opt-out mode (analytics disabled by default)
 * - No events captured until user explicitly consents
 * - IP anonymization must be enabled in PostHog project settings:
 *   PostHog Dashboard → Project Settings → Data & Privacy → "Discard client IP data"
 * 
 * This function only sets up the PostHog instance. Call grantAnalyticsConsent()
 * to enable event capture after user consent.
 */
export const initializeAnalyticsTracking = () => {
  if (analyticsInitialized || !POSTHOG_KEY) {
    return;
  }

  posthog.init(POSTHOG_KEY, {
    api_host: POSTHOG_HOST || "https://app.posthog.com",
    
    // GDPR Compliance: Start in opt-out mode (analytics disabled by default)
    opt_out_capturing_by_default: true,
    
    // Use localStorage + cookie for persistence
    persistence: "localStorage+cookie",
    
    // Manual event tracking only (no auto-capture)
    autocapture: false,
    capture_pageview: false,
    
    // Session recording with privacy protections
    disable_session_recording: false,
    session_recording: {
      maskAllInputs: true,
      maskTextSelector: "[data-private]",
    },
    
    // IMPORTANT: IP anonymization must be enabled in PostHog project settings
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
 * Called by CookieConsent.tsx after user accepts cookies.
 * Enables PostHog event capture.
 */
export const grantAnalyticsConsent = () => {
  initializeAnalyticsTracking();
  
  if (typeof window !== "undefined" && (window as any).posthog) {
    (window as any).posthog.opt_in_capturing();
  }
};

/**
 * Revoke user consent for analytics tracking.
 * Called by CookieConsent.tsx after user rejects or withdraws consent.
 * Disables PostHog event capture and clears stored user identifiers.
 */
export const revokeAnalyticsConsent = () => {
  if (typeof window !== "undefined" && (window as any).posthog) {
    (window as any).posthog.opt_out_capturing();
    (window as any).posthog.reset(); // Clear stored identifiers
  }
};

/**
 * Check if analytics tracking is currently enabled.
 * Returns true if user has granted consent, false otherwise.
 */
export const isAnalyticsConsentGranted = (): boolean => {
  if (typeof window !== "undefined" && (window as any).posthog) {
    return !(window as any).posthog.has_opted_out_capturing();
  }
  return false;
};

/**
 * Track a custom event. Only recorded if user has granted consent.
 */
export const trackEvent = (eventName: string, properties?: Record<string, any>) => {
  if (typeof window !== "undefined" && (window as any).posthog) {
    (window as any).posthog.capture(eventName, properties);
  }
};

/**
 * Track a page view. Only recorded if user has granted consent.
 */
export const trackPageView = (pageName?: string) => {
  if (typeof window !== "undefined" && (window as any).posthog) {
    (window as any).posthog.capture("$pageview", {
      $current_url: window.location.href,
      page_name: pageName,
    });
  }
};

/**
 * Identify user for analytics (e.g., after login).
 * Only recorded if user has granted consent.
 */
export const identifyUser = (userId: string, properties?: Record<string, any>) => {
  if (typeof window !== "undefined" && (window as any).posthog) {
    (window as any).posthog.identify(userId, properties);
  }
};

export { posthog };
