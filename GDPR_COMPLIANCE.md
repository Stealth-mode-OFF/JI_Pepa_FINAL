# GDPR Compliance Configuration

This document outlines the GDPR compliance measures implemented in this application and critical configuration steps required for full compliance.

## ✅ Implemented Frontend Protections

### 1. Consent-Based Analytics Initialization
- **Location:** `src/utils/analytics.ts`
- **Implementation:** PostHog analytics only initializes AFTER user explicitly grants consent
- **Key Features:**
  - `opt_out_capturing_by_default: true` - No tracking until user opts in
  - Manual opt-in via `grantAnalyticsConsent()`
  - Manual opt-out via `revokeAnalyticsConsent()`
  - Analytics cleared on rejection via `posthog.reset()`

### 2. Cookie Consent Banner
- **Location:** `src/app/components/CookieConsent.tsx`
- **Implementation:** GDPR-compliant cookie consent with:
  - Clear accept/reject options
  - Consent stored with timestamp
  - Re-openable preferences (footer link)
  - No tracking before decision

### 3. Withdraw Consent Mechanism
- **Location:** `src/features/footer/SiteFooter.tsx`
- **Implementation:** "Cookie Preferences" link in footer allows users to:
  - Reopen consent banner at any time
  - Change their decision
  - Revoke previously granted consent

## ⚠️ CRITICAL: PostHog Project Settings

### IP Anonymization (REQUIRED)

**The frontend code CANNOT anonymize IP addresses.** This must be configured server-side in PostHog.

#### Configuration Steps:

1. **Login to PostHog Dashboard**
   - URL: https://eu.posthog.com (or your instance)
   - Navigate to your project

2. **Enable IP Anonymization**
   ```
   Project Settings → Data & Privacy → IP Capture Settings
   ```
   
3. **Select Option:**
   - ✅ **"Discard client IP data"** (Recommended)
     - OR -
   - ✅ **"Anonymize IP addresses"** (Truncate last octets)

4. **Verify Configuration**
   - Check that IP addresses are NOT stored in PostHog events
   - Test with browser DevTools → Network tab → Check event payloads

#### Why This Is Critical:

- **GDPR Article 4(1):** IP addresses are personal data
- **GDPR Article 5(1)(c):** Data minimization principle
- **Legal Risk:** Collecting full IPs without explicit consent = €20M fine or 4% annual turnover

## 📋 Consent Flow

### User Journey:

```
┌─────────────────────────────────────────┐
│ 1. User visits site (first time)       │
│    → Cookie consent banner appears     │
│    → NO analytics running yet          │
└─────────────────────────────────────────┘
                    ↓
┌─────────────────────────────────────────┐
│ 2. User clicks "Accept All"             │
│    → storeCookieConsentDecision(true)   │
│    → grantAnalyticsConsent()            │
│    → PostHog starts capturing events    │
└─────────────────────────────────────────┘
                    OR
┌─────────────────────────────────────────┐
│ 2. User clicks "Reject Optional"        │
│    → storeCookieConsentDecision(false)  │
│    → revokeAnalyticsConsent()           │
│    → PostHog does NOT capture events    │
└─────────────────────────────────────────┘
                    ↓
┌─────────────────────────────────────────┐
│ 3. User returns to site                 │
│    → Stored decision loaded on mount    │
│    → Analytics enabled/disabled per     │
│       previous decision                 │
└─────────────────────────────────────────┘
                    ↓
┌─────────────────────────────────────────┐
│ 4. User changes mind                    │
│    → Clicks "Cookie Preferences" in     │
│       footer                            │
│    → Banner reopens                     │
│    → Can accept or reject again         │
└─────────────────────────────────────────┘
```

## 🔍 Verification Checklist

### Before Production Deployment:

- [ ] **PostHog IP anonymization enabled** (Dashboard setting)
- [ ] **Test fresh visit:** No PostHog cookies/localStorage before consent
- [ ] **Test accept flow:** PostHog cookies appear after clicking "Accept All"
- [ ] **Test reject flow:** No PostHog tracking after clicking "Reject Optional"
- [ ] **Test preferences link:** Footer "Cookie Preferences" reopens banner
- [ ] **Test decision change:** Accepting after rejecting works (and vice versa)
- [ ] **Test page reload:** Decision persists across page reloads
- [ ] **Check browser DevTools:**
  - Application → Local Storage → Check `user_cookie_preferences`
  - Application → Cookies → Verify PostHog cookies only appear after consent
  - Network → Filter "posthog" → Verify no requests before consent

## 📝 Consent Storage Format

**Key:** `user_cookie_preferences`  
**Value (JSON):**
```json
{
  "analyticsAccepted": true,
  "timestamp": "2026-01-14T15:30:00.000Z",
  "version": "v1.0"
}
```

## 🚨 Legal Compliance Notes

### GDPR Articles Addressed:

- **Article 6(1)(a):** Lawful basis (consent)
- **Article 7:** Conditions for consent
- **Article 7(3):** Withdrawing consent
- **Article 5(1)(c):** Data minimization
- **Recital 32:** Freely given consent

### ePrivacy Directive:

- **Article 5(3):** Cookie consent required before storage

## 🔗 Related Files

- `/src/utils/analytics.ts` - Analytics initialization logic
- `/src/app/components/CookieConsent.tsx` - Consent banner UI
- `/src/features/footer/SiteFooter.tsx` - Footer with preferences link
- `/src/main.tsx` - Application entry (PostHog NOT initialized here)

## 📞 Questions?

For GDPR compliance questions, consult with:
- Legal counsel
- Data Protection Officer (DPO)
- Privacy compliance specialist

**Last Updated:** January 14, 2026  
**Compliance Version:** v1.0
