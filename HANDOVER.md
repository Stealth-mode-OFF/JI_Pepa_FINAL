# Developer Handover Summary

This document is your starting point for taking over the JI language learning platform.

---

## Quick Start (5 minutes)

1. **Read this first:**
   - [README.md](./README.md) — What the project is, how to run it
   - [ARCHITECTURE.md](./ARCHITECTURE.md) — How the code is organized

2. **Set up locally:**
   ```bash
   npm install
   npm run dev
   ```

3. **Understand the user journey:**
   - Public landing page → Course selection → Sign up → Onboarding → Payment → Dashboard
   - See [ARCHITECTURE.md → Data Flow](./ARCHITECTURE.md#data-flow) for detailed diagram

---

## What This Project Does

**Language learning platform** for Jazykáintegrace (Czech company).

Students can:
- Browse language courses (EN, CS, IT, RU, UK)
- Sign up and create profile
- Enroll in courses via Stripe payment
- Track progress in dashboard (basic, future enhancements planned)

---

## Key Technologies

| Area | Tech | Notes |
|------|------|-------|
| Frontend | React 18.3 + TypeScript | Strict type checking enabled |
| Build | Vite 6.4 | ~4 second builds |
| Styling | Tailwind CSS 4.1 | Utility-first, no CSS files |
| Auth | Supabase Auth | Email/password via Supabase |
| Database | Supabase PostgreSQL | RLS policies for data isolation |
| Payments | Stripe | Hosted checkout integration |
| Analytics | PostHog | **GDPR-compliant, opt-in only** |
| Internationalization | i18next | 5 languages supported |

---

## Critical Things to Know

### 1. **GDPR Compliance**
- **Analytics is disabled by default** — users must explicitly consent
- Read [GDPR_COMPLIANCE.md](./GDPR_COMPLIANCE.md) before changing anything related to analytics or cookies
- Manual step required: Enable IP anonymization in PostHog dashboard
- If you change analytics code, run the testing checklist in [GDPR_TESTING_CHECKLIST.md](./GDPR_TESTING_CHECKLIST.md)

### 2. **Course Enrollment Flow**
- Courses are clickable rows (not buttons) — entire row navigates to signup/onboarding
- Course selection (cohort ID) saved to localStorage during enrollment
- Students sign up first, then complete onboarding, then pay

### 3. **Language-Specific Contact Info**
- **No hardcoded emails in components**
- Email is dynamically determined by user's language preference:
  - EN/CS → josef@jazykaintegrace.cz
  - IT → marta@jazykaintegrace.cz
  - RU/UK → ekaterina@jazykaintegrace.cz
- Search for `getLanguageSpecificEmail` to see how it works

### 4. **Auth & Routing**
- Protected routes use `<RequireAuth>` wrapper in [App.tsx](./src/app/App.tsx)
- Unauthenticated users redirected to `/login`
- Global user state in [AuthContext.tsx](./src/app/auth/AuthContext.tsx)

### 5. **Database Setup**
- Run `supabase/schema.sql` in Supabase SQL editor to create tables
- Tables: `student_profiles`, `courses`, `cohorts`, `enrollments`, `payments`, `lead_magnet_signups`
- All tables have RLS policies — students can only see/edit their own data

---

## Where Important Code Lives

| What | Where | Why |
|------|-------|-----|
| Routes & auth walls | [src/app/App.tsx](./src/app/App.tsx) | Central place to see all routes |
| User state & login | [src/app/auth/AuthContext.tsx](./src/app/auth/AuthContext.tsx) | Global auth state |
| Analytics & GDPR | [src/utils/analytics.ts](./src/utils/analytics.ts) | All tracking logic here |
| Consent banner | [src/app/components/CookieConsent.tsx](./src/app/components/CookieConsent.tsx) | Shows once per session |
| Course enrollment | [src/app/components/CourseList.tsx](./src/app/components/CourseList.tsx) | Clickable course rows |
| Landing page | [src/features/hero/](./src/features/hero/), [pricing/](./src/features/pricing/), etc. | Feature-based sections |
| Footer & contact | [src/features/footer/SiteFooter.tsx](./src/features/footer/SiteFooter.tsx) | Language-aware email routing |
| Supabase client | [src/utils/supabase/client.ts](./src/utils/supabase/client.ts) | Database connection |
| Translations | [src/locales/](./src/locales/) | JSON files for each language |

---

## Common Tasks

### Add a new page
1. Create component in `src/app/pages/NewPage.tsx`
2. Add route to [App.tsx](./src/app/App.tsx)
3. If auth-required, wrap with `<RequireAuth>`

### Change contact info
1. Update [Footer.tsx](./src/features/footer/SiteFooter.tsx) for language-specific email
2. Update [SEO.tsx](./src/app/components/SEO.tsx) for structured data
3. Update [analytics.ts](./src/utils/analytics.ts) comments if contact URL changes

### Add translation
1. Add key to all JSON files in `src/locales/`
2. Use in component: `const { t } = useTranslation(); t('key')`

### Handle analytics event
1. Check [GDPR_COMPLIANCE.md](./GDPR_COMPLIANCE.md) first
2. Import from [analytics.ts](./src/utils/analytics.ts): `trackEvent()`, `identifyUser()`, etc.
3. Only called if user granted consent (analytics.ts handles this)

### Change Stripe pricing
1. Update price ID in `.env`: `VITE_STRIPE_PRICE_ID`
2. Update cohort/price in Supabase `courses` table
3. Test checkout flow end-to-end

---

## Project Structure Overview

```
src/
├── main.tsx                      # App entry point
├── app/                          # Core app
│   ├── App.tsx                  # Routes & auth walls
│   ├── pages/                   # Top-level pages
│   ├── components/              # Reusable UI (CookieConsent, CourseList, etc.)
│   └── auth/                    # AuthContext, RequireAuth guard
├── features/                     # Feature domains (pricing, hero, footer, etc.)
├── utils/                        # Helpers (analytics, i18n, supabase)
├── styles/                       # Global CSS
├── locales/                      # Translations (5 languages)
└── test/                         # Test setup
```

See [ARCHITECTURE.md](./ARCHITECTURE.md) for complete breakdown.

---

## Commit Conventions

Follow [VERSIONING.md](./VERSIONING.md) for commit style:

```
feat: add new feature
fix: fix bug in X
docs: update README
refactor: reorganize X (no behavior change)
```

**One commit = one logical change** (e.g., one feature, one bug fix).

---

## Before Pushing to Production

- [ ] Run tests: `npm run test:unit`
- [ ] Build locally: `npm run build && npm run preview`
- [ ] Check TypeScript: `npx tsc --noEmit`
- [ ] Verify GDPR compliance if analytics/cookie changes
- [ ] Test course enrollment flow end-to-end
- [ ] Test auth flows: signup, login, logout
- [ ] Test different languages (course contact info should change)
- [ ] Verify Stripe checkout works
- [ ] Enable PostHog IP anonymization in dashboard before go-live

---

## Questions?

Check these docs in order:
1. **What does it do?** → [README.md](./README.md)
2. **How is it organized?** → [ARCHITECTURE.md](./ARCHITECTURE.md)
3. **How do I commit code?** → [VERSIONING.md](./VERSIONING.md)
4. **Analytics/GDPR questions?** → [GDPR_COMPLIANCE.md](./GDPR_COMPLIANCE.md)
5. **Test analytics changes?** → [GDPR_TESTING_CHECKLIST.md](./GDPR_TESTING_CHECKLIST.md)

---

## Recent Work Done

This project was recently refactored and enhanced:

1. **GDPR Compliance** (latest)
   - Analytics disabled by default
   - Consent banner on first visit
   - Users can withdraw consent via footer link
   - All decisions stored with timestamp

2. **Course Enrollment UX**
   - Made entire course row clickable (not just button)
   - Saves course selection to localStorage
   - Supports authenticated and unauthenticated flows

3. **Language-Aware Contact**
   - Instructor email routed by language
   - Single source of truth (Footer, SEO, Analytics)
   - Easy to maintain and test

4. **Architecture Refactor** (earlier)
   - Moved to feature-based folder structure
   - Centralized auth state (AuthContext)
   - Clear separation of concerns

---

## Tech Stack Summary

- **React 18.3**: Functional components + hooks
- **TypeScript**: Strict mode for type safety
- **Vite 6.4**: Fast builds (~4s)
- **Tailwind 4.1**: Utility CSS, no component files
- **Supabase**: Auth + database + RLS
- **Stripe**: Payments (hosted checkout)
- **PostHog**: Analytics (GDPR-compliant)
- **i18next**: 5 languages (EN, CS, IT, RU, UK)

---

## Good Luck!

This is a well-structured, maintainable codebase. The code prioritizes clarity and human understanding over cleverness.

If you have questions, check the documentation above first. The code includes helpful comments explaining **why** things are done, not just **what** they do.

Happy coding! 🚀
