# GDPR Compliance - Manual Testing Checklist

## ✅ Pre-Testing Setup

1. **Clear all browser data:**
   - Open DevTools (F12)
   - Application → Storage → Clear site data
   - Or use Incognito/Private window

2. **Enable DevTools monitoring:**
   - Network tab (filter: "posthog")
   - Application tab → Local Storage
   - Application tab → Cookies
   - Console tab (for any errors)

---

## 🧪 Test 1: Fresh Visit (No Consent Yet)

### Expected Behavior:
✅ Cookie consent banner appears at bottom  
✅ NO PostHog network requests  
✅ NO `ph_*` cookies in browser  
✅ NO PostHog localStorage entries  
✅ NO `posthog` key in localStorage  

### Steps:
1. Navigate to site in fresh incognito window
2. Open DevTools → Network tab (filter: "posthog")
3. Wait 5 seconds without clicking anything
4. Check: Should be ZERO PostHog network requests

### Verification:
```javascript
// Run in Console:
console.log('Consent:', localStorage.getItem('user_cookie_preferences'));
// Should return: null

console.log('PostHog cookies:', document.cookie.match(/ph_/g));
// Should return: null

console.log('PostHog object:', window.posthog);
// Should return: undefined
```

---

## 🧪 Test 2: Accept All Cookies

### Expected Behavior:
✅ Banner disappears immediately  
✅ PostHog network requests START appearing  
✅ `ph_*` cookies created  
✅ `user_cookie_preferences` stored with `"analyticsAccepted": true`  

### Steps:
1. Continue from Test 1 (fresh visit)
2. Click **"Accept All"** button
3. Observe Network tab for PostHog requests
4. Check localStorage and cookies

### Verification:
```javascript
// Run in Console:
const consent = JSON.parse(localStorage.getItem('user_cookie_preferences'));
console.log('Analytics accepted:', consent.analyticsAccepted); // Should be: true
console.log('Timestamp:', consent.timestamp); // Should exist
console.log('Version:', consent.version); // Should be: v1.0

console.log('PostHog initialized:', window.posthog !== undefined); // Should be: true
console.log('PostHog opted out:', window.posthog?.has_opted_out_capturing?.()); // Should be: false
```

---

## 🧪 Test 3: Reject Optional Cookies

### Expected Behavior:
✅ Banner disappears immediately  
✅ PostHog does NOT capture events  
✅ NO `ph_*` cookies with tracking data  
✅ `user_cookie_preferences` stored with `"analyticsAccepted": false`  

### Steps:
1. Open NEW fresh incognito window
2. Wait for cookie banner to appear
3. Click **"Reject Optional"** button
4. Observe Network tab (should be minimal/no PostHog requests)
5. Check localStorage

### Verification:
```javascript
// Run in Console:
const consent = JSON.parse(localStorage.getItem('user_cookie_preferences'));
console.log('Analytics accepted:', consent.analyticsAccepted); // Should be: false

console.log('PostHog initialized:', window.posthog !== undefined); // May be true (loaded) but opted out
console.log('PostHog opted out:', window.posthog?.has_opted_out_capturing?.()); // Should be: true
```

---

## 🧪 Test 4: Reload Page After Accept

### Expected Behavior:
✅ NO banner appears (decision remembered)  
✅ PostHog AUTOMATICALLY enabled on page load  
✅ Events captured normally  

### Steps:
1. Continue from Test 2 (after accepting)
2. Reload the page (F5 or Cmd+R)
3. Banner should NOT reappear
4. Check that PostHog is tracking

### Verification:
```javascript
// Run in Console immediately after page load:
console.log('Banner visible:', document.querySelector('[class*="cookie"]') !== null); 
// Should be: false

const consent = JSON.parse(localStorage.getItem('user_cookie_preferences'));
console.log('Stored decision:', consent.analyticsAccepted); // Should be: true

console.log('PostHog active:', !window.posthog?.has_opted_out_capturing?.()); 
// Should be: true
```

---

## 🧪 Test 5: Reload Page After Reject

### Expected Behavior:
✅ NO banner appears (decision remembered)  
✅ PostHog remains DISABLED  
✅ No tracking events sent  

### Steps:
1. Continue from Test 3 (after rejecting)
2. Reload the page
3. Banner should NOT reappear
4. Verify PostHog is still opted out

### Verification:
```javascript
// Run in Console:
const consent = JSON.parse(localStorage.getItem('user_cookie_preferences'));
console.log('Stored decision:', consent.analyticsAccepted); // Should be: false

console.log('PostHog opted out:', window.posthog?.has_opted_out_capturing?.()); 
// Should be: true
```

---

## 🧪 Test 6: Cookie Preferences Link in Footer

### Expected Behavior:
✅ Footer contains "Cookie Preferences" link  
✅ Clicking it reopens the consent banner  
✅ Can change decision (accept after reject, or vice versa)  

### Steps:
1. Continue from any previous test with stored decision
2. Scroll to footer
3. Look for **"Cookie Preferences"** link in legal section
4. Click it
5. Cookie banner should reappear
6. Change your selection (opposite of before)
7. Verify new decision is stored

### Verification:
```javascript
// Before clicking link:
const oldConsent = JSON.parse(localStorage.getItem('user_cookie_preferences'));
console.log('Old decision:', oldConsent.analyticsAccepted);

// After changing decision and clicking Accept/Reject:
const newConsent = JSON.parse(localStorage.getItem('user_cookie_preferences'));
console.log('New decision:', newConsent.analyticsAccepted);
console.log('Timestamp changed:', oldConsent.timestamp !== newConsent.timestamp);
// Both should reflect the change
```

---

## 🧪 Test 7: Accept → Change to Reject

### Expected Behavior:
✅ PostHog stops tracking immediately  
✅ PostHog data cleared via `reset()`  
✅ Existing cookies/localStorage cleaned  

### Steps:
1. Accept cookies (Test 2)
2. Verify PostHog is tracking
3. Click footer "Cookie Preferences"
4. Click "Reject Optional"
5. Verify PostHog stops immediately

### Verification:
```javascript
// After rejecting:
console.log('PostHog opted out:', window.posthog?.has_opted_out_capturing?.()); 
// Should be: true

const consent = JSON.parse(localStorage.getItem('user_cookie_preferences'));
console.log('Analytics accepted:', consent.analyticsAccepted); // Should be: false
```

---

## 🧪 Test 8: Reject → Change to Accept

### Expected Behavior:
✅ PostHog starts tracking immediately  
✅ Events captured after acceptance  

### Steps:
1. Reject cookies (Test 3)
2. Verify PostHog is NOT tracking
3. Click footer "Cookie Preferences"
4. Click "Accept All"
5. Verify PostHog starts immediately

### Verification:
```javascript
// After accepting:
console.log('PostHog opted out:', window.posthog?.has_opted_out_capturing?.()); 
// Should be: false

const consent = JSON.parse(localStorage.getItem('user_cookie_preferences'));
console.log('Analytics accepted:', consent.analyticsAccepted); // Should be: true
```

---

## 🧪 Test 9: PostHog Project Settings (Backend)

### CRITICAL SERVER-SIDE CONFIGURATION

⚠️ **This CANNOT be tested from frontend alone**

### Required Actions:
1. Login to PostHog Dashboard: https://eu.posthog.com
2. Navigate to: **Project Settings → Data & Privacy**
3. Find: **IP Capture Settings**
4. Enable one of:
   - ✅ **"Discard client IP data"** (Recommended)
   - ✅ **"Anonymize IP addresses"**

### Verification:
1. Trigger an event (e.g., page view)
2. Go to PostHog → Events → Select recent event
3. Check properties
4. Verify: `$ip` property is either missing or anonymized (e.g., `192.168.0.0`)

---

## 🧪 Test 10: Cross-Device Consistency

### Expected Behavior:
✅ Decision is device-specific (localStorage)  
✅ Different devices require separate consent  
✅ No cross-device tracking without consent  

### Steps:
1. Accept on Device A
2. Open site on Device B (different browser/device)
3. Banner should appear on Device B
4. Decision on Device A should not affect Device B

---

## ✅ Final Checklist

Before production deployment:

- [ ] Test 1: Fresh visit has NO tracking ✅
- [ ] Test 2: Accept starts tracking ✅
- [ ] Test 3: Reject prevents tracking ✅
- [ ] Test 4: Decision persists after reload (accept) ✅
- [ ] Test 5: Decision persists after reload (reject) ✅
- [ ] Test 6: Footer link reopens preferences ✅
- [ ] Test 7: Can change accept → reject ✅
- [ ] Test 8: Can change reject → accept ✅
- [ ] Test 9: PostHog IP anonymization enabled ⚠️ **MANUAL SERVER CONFIG**
- [ ] Test 10: Cross-device isolation verified ✅

---

## 🚨 Red Flags (Fail Immediately)

If you observe ANY of these, **DO NOT DEPLOY**:

❌ PostHog network requests BEFORE clicking Accept  
❌ PostHog cookies present on fresh visit  
❌ Banner doesn't reappear when clicking footer preferences  
❌ Accepting after rejecting doesn't enable tracking  
❌ IP addresses visible in PostHog event properties (Test 9)  
❌ Decision doesn't persist after page reload  
❌ Changing decision doesn't update localStorage  

---

## 📞 Support

Questions about test results?
- Review `/GDPR_COMPLIANCE.md`
- Check browser console for errors
- Verify all files updated correctly:
  - `src/main.tsx`
  - `src/utils/analytics.ts`
  - `src/app/components/CookieConsent.tsx`
  - `src/features/footer/SiteFooter.tsx`

**Last Updated:** January 14, 2026  
**Test Version:** v1.0
