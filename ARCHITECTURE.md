# Architecture Overview

This document explains the folder structure, data flow, and key design decisions in the JI language learning platform.

---

## Folder Structure

```
src/
├── main.tsx                    # App entry point (React + Router setup)
├── app/                        # Core app shell and pages
│   ├── App.tsx                # Route definitions
│   ├── pages/                 # Top-level pages (auth walls enforced via RequireAuth)
│   │   ├── LandingPage.tsx   # Public landing page (course listings, pricing, etc.)
│   │   ├── Login.tsx          # Student login
│   │   ├── Signup.tsx         # Student registration
│   │   ├── Onboarding.tsx     # Intake form (requires auth)
│   │   ├── Checkout.tsx       # Stripe payment (requires auth)
│   │   ├── CheckoutSuccess.tsx # Post-payment confirmation (requires auth)
│   │   ├── Dashboard.tsx      # Student dashboard (requires auth)
│   │   └── CheatSheet.tsx     # Public learning resource
│   ├── components/            # Reusable components
│   │   ├── AuthShell.tsx      # Wrapper for auth'd pages (nav, footer, etc.)
│   │   ├── CookieConsent.tsx  # GDPR consent banner (displays once per session)
│   │   ├── CourseList.tsx     # Course intake selection (clickable rows)
│   │   ├── LeadMagnet.tsx     # Email signup form modal
│   │   ├── NewsletterPopup.tsx # Newsletter subscription
│   │   ├── SEO.tsx            # Meta tags, structured data
│   │   ├── SocialShare.tsx    # Social sharing helpers
│   │   ├── Layout.tsx         # Container, Page wrapper components
│   │   ├── LegalDocsModal.tsx # Privacy policy, ToS, etc.
│   │   └── [Others]          # UI components (FAQ, Testimonials, etc.)
│   ├── auth/                  # Authentication logic
│   │   ├── AuthContext.tsx    # User state, login/logout
│   │   └── RequireAuth.tsx    # Route guard (redirect unauthenticated to /login)
│   └── contexts/              # Global state (if needed)
│
├── features/                   # Feature modules (organized by domain)
│   ├── hero/                  # Hero section component
│   ├── header/                # Header/navbar
│   ├── footer/                # Footer (with language-specific email routing)
│   ├── courses/               # Course section
│   ├── pricing/               # Pricing table
│   ├── faq/                   # FAQ section
│   ├── testimonials/          # Testimonials section
│   ├── instructor/            # Instructor bios
│   ├── philosophy/            # About/philosophy section
│   └── lead-magnet/           # Lead magnet form
│
├── shared/                     # Shared utilities
│   └── layouts/               # Page layout wrappers
│
├── utils/                      # Utility functions
│   ├── analytics.ts           # PostHog integration (GDPR-compliant)
│   ├── stripe.ts              # Stripe client helpers
│   ├── i18n.ts                # i18next configuration
│   └── supabase/              # Supabase client setup
│
├── styles/                     # Global styles
│   ├── index.css              # Main styles
│   ├── tailwind.css           # Tailwind directives
│   ├── theme.css              # Design tokens (colors, typography)
│   └── fonts.css              # Font definitions
│
├── locales/                    # Translation files
│   ├── en.json
│   ├── cs.json
│   ├── it.json
│   ├── ru.json
│   └── uk.json
│
└── test/                       # Test setup
    └── setupTests.ts          # Test environment configuration
```

---

## Data Flow

### User Signup & Enrollment

```
Landing Page (/)
    ↓
    [Click "Enroll" or course row]
    ↓
Signup (/signup)
    ↓ [Creates Supabase auth account]
    ↓
Onboarding (/onboarding, requires auth)
    ↓ [Stores profile in student_profiles table]
    ↓ [Selects course & cohort]
    ↓
Checkout (/checkout, requires auth)
    ↓ [Creates Stripe checkout session via Edge Function]
    ↓ [Redirect to Stripe Hosted Checkout]
    ↓ [Stripe webhook updates payment status]
    ↓
CheckoutSuccess (/checkout-success)
    ↓
Dashboard (/dashboard, requires auth)
```

### Authentication Flow

1. **Signup:** User creates account via Supabase Auth (email/password)
2. **Login:** Existing user logs in, session stored in Supabase
3. **RequireAuth Guard:** Routes protected by `<RequireAuth>` wrapper
   - If user is logged in → render page
   - If not → redirect to `/login`
4. **AuthContext:** Global user state (via React Context)
   - Provides `user`, `loading`, `login()`, `logout()` to app
   - Synced with Supabase Auth

### Analytics & Consent Flow

```
User visits site
    ↓
CookieConsent banner shows
    ↓
[User accepts or rejects]
    ↓
Decision stored in localStorage (user_cookie_preferences)
    ↓
If accepted → grantAnalyticsConsent() called
    ↓
PostHog.opt_in_capturing() enables tracking
    ↓
Events tracked for this session
```

- **Init:** `initializeAnalyticsTracking()` sets up PostHog with `opt_out_capturing_by_default: true`
- **Consent:** `grantAnalyticsConsent()` and `revokeAnalyticsConsent()` manage user opt-in/opt-out
- **Persistence:** localStorage stores consent decision with timestamp
- **Reopen:** Footer "Cookie Preferences" link dispatches custom event to reopen banner

See [GDPR_COMPLIANCE.md](./GDPR_COMPLIANCE.md) for details.

---

## Key Components & Their Responsibilities

### `App.tsx`
- Defines all routes
- Wraps auth-required pages with `<RequireAuth>`

### `CookieConsent.tsx`
- Shows banner once per session
- Integrates with `analytics.ts` to grant/revoke tracking
- Stores decision in localStorage
- Can be reopened via custom event (used by footer)

### `CourseList.tsx`
- Displays available courses and cohorts
- Makes rows clickable for signup/enrollment
- Each row links to `/signup` or `/onboarding` with cohort ID saved to localStorage

### `AuthContext.tsx`
- Manages global user state
- Syncs with Supabase Auth
- Provides `user`, `loading`, login/logout methods

### `analytics.ts`
- Initializes PostHog with GDPR defaults
- Exports `grantAnalyticsConsent()` and `revokeAnalyticsConsent()`
- Exports `isAnalyticsConsentGranted()` for conditional tracking
- **Important:** IP anonymization must be enabled in PostHog dashboard

### `Footer.tsx`
- Language-specific email routing (josef/marta/ekaterina)
- "Cookie Preferences" link reopens consent banner
- Contact phone: +420605839456

---

## Database Schema (Supabase)

See `supabase/schema.sql` for full schema. Key tables:

- **auth.users** – Supabase Auth users (email, password hash)
- **student_profiles** – Student metadata (name, language preference, etc.)
- **student_onboarding** – Onboarding responses (DOB, experience, goals)
- **courses** – Course definitions (name, language, level)
- **cohorts** – Course intake groups (start date, capacity, course_id)
- **enrollments** – Student → Cohort relationships
- **payments** – Stripe payment records (session_id, status, student_id)
- **lead_magnet_signups** – Email addresses from lead form

RLS policies ensure:
- Students can only see/edit their own data
- Instructors can view enrollments and payments (if role = instructor)

---

## Internationalization (i18n)

- **Setup:** i18next in `utils/i18n.ts`
- **Languages:** en, cs, it, ru, uk
- **Translations:** JSON files in `locales/`
- **Usage in Components:**
  ```tsx
  import { useTranslation } from 'react-i18next';
  
  const { t, i18n } = useTranslation();
  
  <h1>{t('landing.title')}</h1>
  <p>{i18n.language}</p>  // Current language code
  ```
- **Email routing:** Footer dynamically selects instructor email based on `i18n.language`

---

## Design System & Styling

- **Framework:** Tailwind CSS 4.1
- **Theme tokens:** `styles/theme.css` (colors, spacing, typography)
- **Components:** Built with Tailwind utilities (no extra CSS files for components)
- **Dark mode:** Supported via Tailwind (configure in `tailwind.config.js` if needed)

---

## Environment & Configuration

- **Vite config:** `vite.config.ts` – build settings, alias `@` for `src/`
- **TypeScript:** `tsconfig.json` – strict mode enabled
- **PostCSS:** `postcss.config.mjs` – Tailwind processing
- **Vitest:** `vitest.config.ts` – unit test configuration

---

## Important Design Decisions

### 1. GDPR-First Analytics
- Analytics **disabled by default** (`opt_out_capturing_by_default: true`)
- No tracking happens until user explicitly consents
- User can withdraw consent at any time via footer link
- Timestamps recorded for audit compliance

### 2. Feature-Based Organization
- `features/` folder organizes by feature domain (pricing, hero, etc.)
- Makes it easy to add/remove features without touching core app structure
- Each feature is self-contained (component + optional styles)

### 3. Auth Context + RequireAuth Guard
- Global user state prevents prop drilling
- `<RequireAuth>` wrapper on routes handles auth checks cleanly
- Unauthenticated redirects are centralized

### 4. Language-Specific Contact Info
- No hardcoded email addresses in UI
- Footer uses `getLanguageSpecificEmail()` helper
- If language changes, contact info updates automatically
- Reduces bugs and makes maintenance easier

### 5. Separation of Concerns
- `pages/` – Route-level components (full page layouts)
- `components/` – Reusable UI building blocks
- `features/` – Feature-specific sections (groupable into pages)
- `utils/` – Business logic, API integration, helpers

---

## Common Tasks & Where to Find Code

| Task | Location |
|------|----------|
| Add new page | `src/app/pages/`, add route to `App.tsx`, wrap with `<RequireAuth>` if needed |
| Add new component | `src/app/components/` |
| Add new feature section | `src/features/` |
| Change styling globally | `src/styles/theme.css` or `tailwind.css` |
| Add translation | `src/locales/*.json` |
| Handle analytics event | Use `posthog.capture()` in component, import from `utils/analytics.ts` |
| Update contact info | Edit `Footer.tsx` or `utils/analytics.ts` helpers |
| Modify auth logic | `AuthContext.tsx` |
| Test a component | Create `.test.tsx` file in same folder |

---

## Performance & Optimization

- **Code splitting:** Vite automatically chunks routes
- **Lazy loading:** Use `React.lazy()` for heavy components if needed
- **Analytics:** PostHog session recording can be memory-intensive; adjust `session_recording` in `analytics.ts` if needed
- **Bundle size:** Keep `node_modules` clean, check unused imports regularly

---

## Security Notes

- **RLS:** All Supabase tables use RLS policies to prevent unauthorized access
- **Auth tokens:** Supabase Auth tokens are HTTP-only cookies (Supabase handles this)
- **Stripe keys:** Publishable key in `.env` is safe; secret key never in client code (Edge Function only)
- **GDPR:** No PII is tracked without explicit consent

---

## Future Enhancements

- Granular consent categories (required, optional analytics, marketing)
- Course materials/lessons section in dashboard
- Progress tracking visualization
- Email notifications for course updates
- Instructor view for managing cohorts and enrollments
