# JI - Language Learning Platform

**What is this?**

This is a modern web application for Jazykáintegrace, a language learning company. It's a full-stack learning platform where students can:
- Browse and enroll in language courses (English, Italian, Russian, Ukrainian)
- Complete interactive onboarding
- Make payments via Stripe
- Track progress in a student dashboard
- Access learning resources

The original Figma design: https://www.figma.com/design/l0QHcTXfoIjpcYSDZUtkG2/JI_FINAL

---

## Getting Started

### Setup

```bash
npm install
npm run dev      # Start local dev server on http://localhost:5173
```

### Quick Facts
- **Framework:** React 18.3 + TypeScript + Vite 6.4
- **Styling:** Tailwind CSS 4.1
- **Internationalization:** 5 languages (EN, CS, IT, RU, UK)
- **Backend:** Supabase (auth, database, functions)
- **Payments:** Stripe
- **Analytics:** PostHog (GDPR-compliant, consent-driven)

---

## How It Works: User Journey

1. **Landing Page** (`/`)
   - Browse course offerings and pricing
   - Learn about instructors and methodology
   - Sign up for lead magnet or start enrollment

2. **Sign Up** (`/signup`)
   - Create student account via Supabase Auth
   - Link to existing account or create new

3. **Onboarding** (`/onboarding`, requires auth)
   - Student enters profile details
   - Selects course and cohort (intake group)
   - Proceeds to checkout

4. **Checkout** (`/checkout`, requires auth)
   - Stripe payment integration
   - Redirect to success page after payment

5. **Dashboard** (`/dashboard`, requires auth)
   - View enrollment status
   - Access course materials (future enhancement)

6. **Cheat Sheet** (`/cheat-sheet`)
   - Public resource page

---

## Key Technologies & Integrations

### **Supabase** (Database + Auth)
- Student profiles and authentication
- Course and cohort management
- Enrollment tracking
- Payment records
- RLS (Row Level Security) for data isolation
- Setup: Run `supabase/schema.sql` in Supabase SQL editor

### **Stripe** (Payments)
- Hosted checkout experience
- Edge Function: `/api/stripe/checkout` (legacy `/make-server-342a80aa/stripe/checkout` still supported)
- Webhook handling for payment status
- Per-course pricing configuration

### **PostHog** (Analytics)
- Event tracking and session recording
- **GDPR-Compliant:** Users must opt-in to analytics
- Disabled by default (`opt_out_capturing_by_default: true`)
- User can reopen consent banner via footer "Cookie Preferences" link
- Manual dashboard config required: Settings → Data & Privacy → "Discard client IP data"

---

## Environment Variables

### Required for Development
```bash
# Supabase
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key

# PostHog (optional for local dev)
VITE_POSTHOG_KEY=your-posthog-key
VITE_POSTHOG_HOST=https://eu.posthog.com
```

### Required for Production
All of the above, plus:
```bash
# Site
VITE_SITE_URL=https://jazykaintegrace.cz

# Forms
VITE_LEAD_FORM_ENDPOINT=https://your-form-endpoint

# Stripe
VITE_STRIPE_PUBLISHABLE_KEY=pk_live_...
VITE_STRIPE_CHECKOUT_ENDPOINT=https://your-endpoint
VITE_STRIPE_PRICE_ID=price_...
VITE_DEFAULT_COHORT_ID=uuid-of-default-cohort

# Server-side (Supabase Edge Functions)
STRIPE_SECRET_KEY=sk_live_...
STRIPE_WEBHOOK_SECRET=whsec_...
SUPABASE_SERVICE_ROLE_KEY=...
```

---

## API Endpoints

Supabase Edge Functions (primary routes):

- `GET /api/health`
- `POST /api/stripe/checkout`
- `POST /api/stripe/webhook`

Legacy routes under `/make-server-342a80aa/*` remain available for backward compatibility.

---

## Build & Deploy

```bash
npm run build      # Production build
npm run preview    # Test production build locally
```

---

## Testing

```bash
npm run test:unit      # Run unit tests
npm run test:watch     # Watch mode
npm run typecheck      # TypeScript check
npm run lint           # ESLint
npm run format         # Prettier (write)
```

---

## Supabase CLI

Supabase CLI is installed as a dev dependency. Use the project-pinned version via:

```bash
npx supabase --help
```

This keeps tooling consistent in VS Code and CI.

---

## Project Structure

See [ARCHITECTURE.md](./ARCHITECTURE.md) for detailed folder breakdown and data flow.

---

## Important Notes for Maintainers

### GDPR Compliance
This project implements strict GDPR compliance:
- Analytics disabled by default
- Consent banner on every visit (unless previously accepted/rejected)
- User can withdraw consent via footer link
- All dates/decisions stored in localStorage with timestamps

See [GDPR_COMPLIANCE.md](./GDPR_COMPLIANCE.md) for full details.

### Recent Refactoring
This project underwent a major architectural refactor around commit `0781445`. The current structure (as of this handover) is the stable version. Older commits may reflect pre-refactor patterns.

### Contact Handling
- **Instructor emails:** Dynamically routed by language preference
  - EN/CS: josef@jazykaintegrace.cz
  - IT: marta@jazykaintegrace.cz
  - RU/UK: ekaterina@jazykaintegrace.cz
- **Support phone:** +420605839456

---

## Next Steps for New Developer

1. **Read** [ARCHITECTURE.md](./ARCHITECTURE.md) to understand project structure
2. **Review** [GDPR_COMPLIANCE.md](./GDPR_COMPLIANCE.md) — critical for any analytics changes
3. **Check** [VERSIONING.md](./VERSIONING.md) for commit conventions
4. **Set up** your local environment with the required env vars
5. **Run** tests to ensure your setup works: `npm run test:unit`

---

## Questions?

- Figma design (latest): https://www.figma.com/design/l0QHcTXfoIjpcYSDZUtkG2/JI_FINAL
- Supabase docs: https://supabase.com/docs
- PostHog docs: https://posthog.com/docs
  
