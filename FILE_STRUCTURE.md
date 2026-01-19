# 📁 Project File Structure Guide

**Last Updated:** January 19, 2026

## 🎯 Quick Navigation

- **Getting Started?** → See [README.md](README.md), [READ_FIRST.md](READ_FIRST.md), [START_HERE.md](START_HERE.md)
- **Development?** → See [docs/development/](docs/development/)
- **Legal/Compliance?** → See [docs/compliance/](docs/compliance/)
- **Project Management?** → See [docs/project-management/](docs/project-management/)

---

## 📂 Root Directory (Clean & Focused)

```
/
├── README.md              # Project overview and setup instructions
├── READ_FIRST.md          # Critical file locations map
├── START_HERE.md          # Quick onboarding guide for new developers
├── LICENSE.txt            # MIT License
├── package.json           # Dependencies and npm scripts
├── index.html             # Entry HTML file
├── vite.config.ts         # Vite build configuration
├── vitest.config.ts       # Vitest test configuration
├── playwright.config.ts   # Playwright E2E test configuration  
├── tsconfig.json          # TypeScript configuration
├── tsconfig.node.json     # TypeScript Node.js configuration
├── postcss.config.mjs     # PostCSS configuration for Tailwind
├── vercel.json            # Vercel deployment configuration
├── docs/                  # 📚 All documentation (organized)
├── src/                   # 💻 Source code
├── public/                # 🌐 Static assets
├── supabase/              # 🗄️ Database & backend
├── tests/                 # 🧪 E2E tests
├── workflows/             # ⚙️ CI/CD workflows
└── guidelines/            # 📋 Project guidelines
```

---

## 💻 Source Code Structure (`/src/`)

### Application Code (`/src/app/`)
Main application logic and components organized by feature.

```
src/app/
├── App.tsx                    # Main app router and route definitions
├── auth/                      # Authentication logic
│   ├── AuthContext.tsx        # Global auth state (Supabase integration)
│   └── RequireAuth.tsx        # Protected route wrapper component
├── components/                # Shared/reusable components
│   ├── AuthShell.tsx          # Authentication layout wrapper
│   ├── CookieConsent.tsx      # GDPR cookie consent banner
│   ├── CourseList.tsx         # Course listing component
│   ├── FAQ.tsx                # Frequently asked questions
│   ├── Icons.tsx              # SVG icon components
│   ├── Instructor.tsx         # Instructor profile component
│   ├── Layout.tsx             # Main layout wrapper
│   ├── LeadMagnet.tsx         # Lead capture form
│   ├── LeadMagnet.test.tsx    # Lead magnet tests
│   ├── LegalDocsModal.tsx     # Legal documents modal (Terms, Privacy, etc.)
│   ├── NewsletterPopup.tsx    # Newsletter subscription popup
│   ├── Philosophy.tsx         # Teaching philosophy section
│   ├── SEO.tsx                # SEO meta tags component
│   ├── SocialShare.tsx        # Social media sharing component
│   └── Testimonials.tsx       # Student testimonials
└── pages/                     # Full page components
    ├── CheatSheet.tsx         # Czech phrases cheat sheet page
    ├── CheatSheet.test.tsx    # Cheat sheet tests
    ├── Checkout.tsx           # Payment checkout page (Stripe)
    ├── CheckoutSuccess.tsx    # Post-payment success page
    ├── Dashboard.tsx          # Student dashboard
    ├── LandingPage.tsx        # Main landing page
    ├── Login.tsx              # Login page
    ├── Onboarding.tsx         # User onboarding flow
    └── Signup.tsx             # Registration page
```

### Features (`/src/features/`)
Feature-specific components following feature-sliced design.

```
src/features/
├── footer/
│   ├── index.ts            # Public exports
│   └── SiteFooter.tsx      # Main footer with legal links
├── header/
│   ├── index.ts            # Public exports
│   └── SiteHeader.tsx      # Main navigation header
├── hero/
│   ├── index.ts            # Public exports
│   └── HeroSection.tsx     # Landing page hero section
└── pricing/
    ├── index.ts            # Public exports
    └── PricingSection.tsx  # Pricing plans section
```

### Design System (`/src/design-system/`)
Centralized design tokens and utilities.

```
src/design-system/
├── index.ts     # Main exports
├── tokens.ts    # Design tokens (colors, spacing, typography)
└── utils.ts     # Design utility functions
```

### Utilities (`/src/utils/`)
Helper functions and integrations.

```
src/utils/
├── analytics.ts           # PostHog analytics integration
├── i18n.ts                # i18next internationalization setup
├── stripe.ts              # Stripe payment integration
└── supabase/
    ├── client.ts          # Supabase client initialization
    └── info.tsx           # Supabase project credentials
```

### Localization (`/src/locales/`)
Multi-language translations (EN, CS, IT, RU, UK).

```
src/locales/
├── cs.json    # Czech translations (including legal docs)
├── en.json    # English translations (including legal docs)
├── it.json    # Italian translations (including legal docs)
├── ru.json    # Russian translations (including legal docs)
└── uk.json    # Ukrainian translations (including legal docs)
```

Each locale file contains:
- UI text translations
- Legal documentation (Terms, Privacy, Cookies, Accessibility)
- Course content and marketing copy

### Styles (`/src/styles/`)
Global stylesheets and theme configuration.

```
src/styles/
├── fonts.css       # Font imports and declarations
├── index.css       # Main global styles
├── tailwind.css    # Tailwind CSS imports
└── theme.css       # CSS custom properties (theme variables)
```

### Shared Components (`/src/shared/`)
Common layout components used across the app.

```
src/shared/
└── layouts/
    ├── index.ts    # Public exports
    └── Page.tsx    # Base page wrapper component
```

### Tests (`/src/test/`)
Test setup and utilities.

```
src/test/
└── setupTests.ts    # Vitest test environment configuration
```

### Other Files
```
src/
├── main.tsx           # Application entry point
├── vite-env.d.ts      # Vite TypeScript definitions
└── imports/
    └── svg-icons.ts   # SVG path data for icon components
```

---

## 📚 Documentation (`/docs/`)

### Compliance (`/docs/compliance/`)
Legal and regulatory compliance documentation.

```
docs/compliance/
├── GDPR_COMPLIANCE.md              # Complete GDPR implementation guide
├── GDPR_IMPLEMENTATION_SUMMARY.md  # Summary of GDPR features
├── GDPR_QUICK_REFERENCE.md         # Quick GDPR reference
└── GDPR_TESTING_CHECKLIST.md       # Compliance testing checklist
```

### Development (`/docs/development/`)
Technical architecture and development guides.

```
docs/development/
├── ARCHITECTURE.md               # System architecture overview
├── ARCHITECTURE_GUIDE.md         # Detailed architecture documentation
├── DEVELOPER_GUIDE.md            # Developer onboarding and workflow
├── HANDOVER.md                   # Project handover documentation
├── VERSIONING.md                 # Version control strategy
├── FIGMA_COMPONENT_SPECS.md      # Figma design specifications
├── REFACTOR_README.md            # Refactoring documentation
├── REFACTOR_SUMMARY.md           # Refactoring summary
├── REFACTORING_CHECKLIST.md      # Refactoring task checklist
└── REFACTOR_STATUS.js            # Automated refactoring status tracker
```

### Project Management (`/docs/project-management/`)
Business context and project planning.

```
docs/project-management/
├── ATTRIBUTIONS.md                   # Third-party library credits
├── DOCS.md                           # General project documentation
├── CODEX_COPILOT_FIGMA_AGREEMENT.md  # Figma integration agreement
├── CODEX_TASKS.md                    # Project task tracking
└── ONBOARDING_2026_STRATEGY.md       # 2026 onboarding strategy
```

---

## 🗄️ Backend & Database (`/supabase/`)

```
supabase/
├── schema.sql               # Database schema definition
└── functions/
    └── server/
        ├── index.tsx        # Deno server functions
        └── kv_store.tsx     # Key-value store utilities
```

---

## 🧪 Testing (`/tests/`)

```
tests/
└── e2e/
    └── smoke.spec.ts    # End-to-end smoke tests (Playwright)
```

Unit tests are co-located with components (e.g., `LeadMagnet.test.tsx`).

---

## 🌐 Public Assets (`/public/`)

```
public/
├── favicon.png      # Site favicon
├── og-image.png     # Open Graph social sharing image
├── robots.txt       # Search engine crawler instructions
└── sitemap.xml      # Site map for SEO
```

---

## ⚙️ CI/CD (`/workflows/`)

```
workflows/
└── deploy.yml    # GitHub Actions deployment workflow
```

---

## 📋 Guidelines (`/guidelines/`)

```
guidelines/
└── Guidelines.md    # Project coding guidelines and conventions
```

---

## 🎨 File Naming Conventions

### Components
- **PascalCase** for React components: `SiteHeader.tsx`, `LeadMagnet.tsx`
- **Co-located tests**: `ComponentName.test.tsx`

### Utilities & Configs
- **camelCase** for utility files: `analytics.ts`, `i18n.ts`
- **kebab-case** for CSS files: `index.css`, `tailwind.css`

### Documentation
- **SCREAMING_SNAKE_CASE** for important docs: `README.md`, `ARCHITECTURE.md`
- **kebab-case** for feature docs: `onboarding-strategy.md`

### Directories
- **kebab-case**: `design-system/`, `project-management/`
- **Feature-based**: Group by feature, not by file type

---

## 🔍 Finding Things Quickly

### Looking for...

| What | Where |
|------|-------|
| **Authentication logic** | `src/app/auth/` |
| **Page components** | `src/app/pages/` |
| **Reusable UI components** | `src/app/components/` |
| **Feature sections** | `src/features/` |
| **Design tokens** | `src/design-system/tokens.ts` |
| **API integrations** | `src/utils/` |
| **Translations** | `src/locales/` |
| **Legal documents** | `src/locales/*.json` (legal section) |
| **Database schema** | `supabase/schema.sql` |
| **Architecture docs** | `docs/development/ARCHITECTURE.md` |
| **GDPR compliance** | `docs/compliance/` |
| **Testing** | `tests/e2e/` or `*.test.tsx` |

---

## 🚀 Key Entry Points

1. **Start Development:** `npm run dev` (see [START_HERE.md](START_HERE.md))
2. **Main Router:** `src/app/App.tsx` (defines all routes)
3. **Entry Point:** `src/main.tsx` (React app initialization)
4. **Landing Page:** `src/app/pages/LandingPage.tsx`
5. **Auth Provider:** `src/app/auth/AuthContext.tsx`

---

## 📊 Statistics

- **Total Locale Files:** 5 (EN, CS, IT, RU, UK)
- **Legal Docs per Locale:** 4 (Terms, Privacy, Cookies, Accessibility)
- **Page Components:** 8
- **Feature Sections:** 4 (Header, Footer, Hero, Pricing)
- **Shared Components:** 15
- **Documentation Files:** 19 (organized in 3 categories)

---

## ✅ Standardization Completed

- ✅ No duplicate files
- ✅ No orphaned files
- ✅ Consistent naming conventions
- ✅ Logical directory structure
- ✅ Clear documentation organization
- ✅ All imports verified and working
- ✅ Build tested and passing

---

**For detailed architecture information, see:** [docs/development/ARCHITECTURE.md](docs/development/ARCHITECTURE.md)

**For onboarding guide, see:** [START_HERE.md](START_HERE.md)
