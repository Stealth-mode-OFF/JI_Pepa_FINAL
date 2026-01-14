# GDPR Quick Reference - Developer Cheat Sheet

## 🎯 What Changed?

### Before (Non-Compliant ❌)
```typescript
// main.tsx
initPostHog(); // Tracking starts immediately

// analytics.ts
posthog.init(KEY, { /* no consent checks */ });

// CookieConsent.tsx
localStorage.setItem('cookie_consent', 'accepted'); // Just a string
```

### After (GDPR Compliant ✅)
```typescript
// main.tsx
// No initialization - happens after consent

// analytics.ts
initializeAnalyticsTracking(); // Sets up PostHog BUT opts out by default
grantAnalyticsConsent();        // User accepted - start tracking
revokeAnalyticsConsent();       // User rejected - stop tracking

// CookieConsent.tsx
storeCookieConsentDecision(true);  // Structured data with timestamp
grantAnalyticsConsent();           // Enable PostHog
```

---

## 🔧 How to Use

### Track an Event (respects consent automatically)
```typescript
import { trackEvent } from '@/utils/analytics';

// This will only fire if user accepted cookies
trackEvent('button_clicked', {
  button_name: 'signup',
  page: 'landing'
});
```

### Check Consent Status
```typescript
import { isAnalyticsConsentGranted } from '@/utils/analytics';

if (isAnalyticsConsentGranted()) {
  // User accepted - safe to track
  trackEvent('feature_used');
}
```

### Reopen Cookie Banner
```typescript
import { reopenCookieConsentBanner } from '@/app/components/CookieConsent';

// User wants to change their cookie preferences
reopenCookieConsentBanner();
```

---

## 📦 Consent Storage Format

**Key:** `user_cookie_preferences`

**Value:**
```json
{
  "analyticsAccepted": true,
  "timestamp": "2026-01-14T15:30:00.000Z",
  "version": "v1.0"
}
```

**Access:**
```typescript
const consent = localStorage.getItem('user_cookie_preferences');
const data = JSON.parse(consent);
console.log(data.analyticsAccepted); // true or false
```

---

## 🧪 Quick Manual Test

### Fresh Visit Test (30 seconds)
```bash
# 1. Open incognito window
# 2. Open DevTools (F12)
# 3. Go to Network tab, filter: "posthog"
# 4. Load your site
# 5. BEFORE clicking anything on banner:
#    ✅ Should see ZERO PostHog requests
#    ❌ If you see requests = BUG, DO NOT DEPLOY

# 6. Click "Accept All"
# 7. Should immediately see PostHog requests appear
```

### Console Quick Check
```javascript
// Run in browser console BEFORE accepting cookies:
console.log('Consent:', localStorage.getItem('user_cookie_preferences'));
// Should return: null

console.log('PostHog active:', window.posthog !== undefined);
// Should return: false

// AFTER accepting:
console.log('Consent:', JSON.parse(localStorage.getItem('user_cookie_preferences')));
// Should return: {analyticsAccepted: true, timestamp: "...", version: "v1.0"}

console.log('PostHog opted out:', window.posthog?.has_opted_out_capturing?.());
// Should return: false (meaning opted IN)
```

---

## ⚠️ Critical Reminders

### 1. Never Initialize PostHog Directly
❌ **DON'T:**
```typescript
import posthog from 'posthog-js';
posthog.init(KEY, { /* config */ }); // GDPR violation!
```

✅ **DO:**
```typescript
import { grantAnalyticsConsent } from '@/utils/analytics';
// Call this ONLY after user accepts cookies
grantAnalyticsConsent();
```

### 2. IP Anonymization (Server-Side)
⚠️ **MUST DO MANUALLY:**
- PostHog Dashboard → Project Settings → Data & Privacy
- Enable "Discard client IP data"
- This CANNOT be done in code

### 3. Footer Link Required
✅ Users must be able to reopen preferences:
- Link in footer: "Cookie Preferences"
- Calls `reopenCookieConsentBanner()`
- Required by GDPR Article 7(3)

---

## 🚨 Red Flags (Stop and Fix)

If you see ANY of these, there's a GDPR violation:

❌ PostHog requests in Network tab BEFORE clicking "Accept"  
❌ `ph_*` cookies present on fresh page load  
❌ `window.posthog` defined before consent  
❌ Banner doesn't reappear when clicking footer preferences  
❌ `localStorage.getItem('cookie_consent')` (old key name)  
❌ Full IP addresses in PostHog event properties  

---

## 📝 Common Scenarios

### Scenario: Adding a New Tracking Event
```typescript
// ✅ Correct - uses helper that checks consent
import { trackEvent } from '@/utils/analytics';

const handleButtonClick = () => {
  trackEvent('new_feature_clicked', { feature: 'export' });
};
```

### Scenario: User Changes Their Mind
```typescript
// User previously rejected, now wants to accept
// 1. They click footer "Cookie Preferences"
// 2. Banner reopens
// 3. They click "Accept All"
// 4. grantAnalyticsConsent() is called automatically
// 5. PostHog starts tracking immediately
// ✅ All handled by CookieConsent.tsx
```

### Scenario: Debugging Consent Issues
```typescript
// Check current state:
const consent = localStorage.getItem('user_cookie_preferences');
console.log('Consent:', consent);

// Check PostHog state:
console.log('PostHog loaded:', window.posthog !== undefined);
console.log('Opted out:', window.posthog?.has_opted_out_capturing?.());

// Force reopen banner for testing:
import { reopenCookieConsentBanner } from '@/app/components/CookieConsent';
reopenCookieConsentBanner();

// Clear all consent (for testing):
localStorage.removeItem('user_cookie_preferences');
// Then reload page - banner should appear
```

---

## 📚 Documentation Quick Links

| Document | Purpose |
|----------|---------|
| `GDPR_COMPLIANCE.md` | Full implementation details |
| `GDPR_TESTING_CHECKLIST.md` | 10 test scenarios |
| `GDPR_IMPLEMENTATION_SUMMARY.md` | Changes overview |
| `src/utils/analytics.ts` | Analytics code (heavily commented) |
| `src/app/components/CookieConsent.tsx` | Banner logic |

---

## 🔍 File Locations

```
src/
├── main.tsx                        # PostHog init REMOVED from here
├── utils/
│   └── analytics.ts                # ✅ Consent-aware analytics
├── app/
│   └── components/
│       └── CookieConsent.tsx       # ✅ Enhanced consent banner
└── features/
    └── footer/
        └── SiteFooter.tsx          # ✅ Cookie Preferences link
```

---

## ✅ Pre-Deployment Checklist

Quick checklist before pushing to production:

- [ ] Run `npm run build` - succeeds without errors
- [ ] Fresh incognito visit - NO PostHog requests before accept
- [ ] Click "Accept" - PostHog requests appear immediately
- [ ] Reload page - decision persists (banner stays hidden)
- [ ] Footer "Cookie Preferences" link - reopens banner
- [ ] Change decision - new choice saved and enforced
- [ ] **CRITICAL:** IP anonymization enabled in PostHog dashboard

---

## 📞 Need Help?

1. Check browser console for errors
2. Verify localStorage has `user_cookie_preferences` key
3. Check Network tab for PostHog requests timing
4. Review GDPR_COMPLIANCE.md for detailed flow
5. Run tests in GDPR_TESTING_CHECKLIST.md

**Last Updated:** January 14, 2026  
**Quick Ref Version:** v1.0
