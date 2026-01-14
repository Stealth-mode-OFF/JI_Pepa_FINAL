# 📍 READ_FIRST — Your Map Through the Repo

Yo! Welcome to the JI (Jazykáintegrace) repo. This file is your GPS. Everything is explained in plain language, no corporate jargon.

---

## 🎯 The Super Quick Version (30 Seconds)

**What is this?** A website where people learn languages. Students can:
- See courses and sign up
- Make payments
- Track their progress

**How to run it?** 
```bash
npm install
npm run dev
```
Then visit `http://localhost:5173`

**Is it complicated?** Nope, it's just React + some nice services (Supabase for database, Stripe for payments, PostHog for tracking).

---

## 📁 File & Folder Map (Everything Explained)

### 🏠 Root Level Files (Top of the Repo)

```
README.md                    ← Project overview (setup, tech, user journey)
HANDOVER.md                  ← Quick reference for developers (read if you're new)
ARCHITECTURE.md              ← How the code is organized (detailed)
VERSIONING.md                ← How to write commits properly
DOCS.md                      ← Index of all documentation
READ_FIRST.md (this file)    ← You are here
```

**GDPR & Compliance Stuff:**
```
GDPR_COMPLIANCE.md           ← Analytics tracking rules (important!)
GDPR_TESTING_CHECKLIST.md    ← How to test consent stuff
GDPR_QUICK_REFERENCE.md      ← Quick answers about GDPR
GDPR_IMPLEMENTATION_SUMMARY.md ← What changed
```

**Project History/Planning:**
```
ONBOARDING_2026_STRATEGY.md  ← Strategic plans
CODEX_TASKS.md               ← Task tracking
REFACTOR_SUMMARY.md          ← What was reorganized
START_HERE.md                ← Another quick reference
```

**Config Files (Don't touch unless you know what you're doing):**
```
package.json                 ← All the libraries (dependencies)
tsconfig.json                ← TypeScript settings
vite.config.ts               ← Build tool configuration
vitest.config.ts             ← Testing configuration
postcss.config.mjs           ← CSS processing
.env                         ← Your secret keys (don't push this!)
.gitignore                   ← Files to ignore in git
```

---

## 📂 The `src/` Folder — Where All the App Code Lives

This is the important stuff. The app code is organized by feature/purpose.

### `src/main.tsx` — The Start Button
```
🎯 This is where everything begins
   - Sets up React
   - Connects the router
   - Starts the app

👉 If you want to understand flow: read this first
```

### `src/app/` — The Core App

#### `App.tsx` — The Router (Maps URLs to Pages)
```
This file says: "When user visits /signup, show Signup page"
                "When user visits /dashboard, show Dashboard page"
                
It also guards pages: "Don't let unauthenticated users see /dashboard"
👉 All routes defined here
```

#### `pages/` — Full Page Components
```
Login.tsx              ← Login form page
Signup.tsx             ← Sign up form page
Onboarding.tsx         ← Student fills out profile
Checkout.tsx           ← Stripe payment page
CheckoutSuccess.tsx    ← "Payment worked!" page
Dashboard.tsx          ← Student's dashboard
CheatSheet.tsx         ← Learning resource page
```

**These are full pages** — big components that fill the whole screen.

#### `components/` — Building Blocks (Reusable UI Parts)
```
AuthShell.tsx          ← Wrapper for logged-in pages (adds nav, footer)
CookieConsent.tsx      ← Cookie banner (GDPR stuff) 🔐
CourseList.tsx         ← Shows courses, makes them clickable
LeadMagnet.tsx         ← Email signup form
NewsletterPopup.tsx    ← Newsletter subscription
SEO.tsx                ← Meta tags and structured data
SocialShare.tsx        ← Share buttons
Testimonials.tsx       ← Student testimonials
FAQ.tsx                ← Frequently asked questions
Philosophy.tsx         ← About the teaching approach
Instructor.tsx         ← Instructor bios
Icons.tsx              ← Icon library
Layout.tsx             ← Container and page layout helpers
LegalDocsModal.tsx     ← Privacy policy, terms, etc.
```

**These are reusable** — used in multiple pages.

#### `auth/` — Login & Session Stuff
```
AuthContext.tsx        ← Global user state (who is logged in)
RequireAuth.tsx        ← Guard that blocks unauthenticated users
```

### `src/features/` — Feature Sections (Organized by Topic)

Each folder is a section of the landing page:

```
hero/                  ← The big banner at the top
header/                ← Navigation bar
footer/                ← Bottom of page (contact, links, etc.)
courses/               ← Course section
pricing/               ← Pricing table
faq/                   ← FAQ section
testimonials/          ← Student reviews
instructor/            ← Instructor info
philosophy/            ← About section
lead-magnet/           ← Email signup
```

**Why organized this way?** Easy to add/remove features. Want to redesign the footer? It's all in `footer/`. Want to remove the testimonials? Delete `testimonials/`.

### `src/utils/` — Helper Functions

```
analytics.ts           ← PostHog tracking (with GDPR consent) 🔐
i18n.ts                ← Multi-language setup (EN, CS, IT, RU, UK)
stripe.ts              ← Stripe payment helpers
supabase/
  └── client.ts        ← Database connection
```

### `src/styles/` — CSS

```
index.css              ← Main styles
tailwind.css           ← Tailwind CSS directives
theme.css              ← Design tokens (colors, fonts, spacing)
fonts.css              ← Font files
```

**Why separate?** Easy to find and change styling without touching code logic.

### `src/locales/` — Translations

```
en.json                ← English text
cs.json                ← Czech text
it.json                ← Italian text
ru.json                ← Russian text
uk.json                ← Ukrainian text
```

**How it works:** The app reads `i18n.language` (current language) and loads the right file. Change user's language? Everything on page updates automatically.

### `src/shared/` — Stuff Used Everywhere

```
layouts/
  └── Page.tsx         ← Standard page wrapper
```

### `src/test/` — Testing Setup

```
setupTests.ts          ← Configuration for tests
```

---

## 🗄️ Backend Stuff (Supabase)

### `supabase/` Folder

```
schema.sql             ← Database structure (tables, permissions)
functions/             ← Server-side code that runs on Supabase
  └── server/
      ├── index.tsx    ← Stripe webhook handling
      └── kv_store.tsx ← Key-value storage
```

**What's this?** When a student makes a payment, Stripe talks to this code. It then updates the database to mark the payment as complete.

---

## 🌐 Public Files

### `public/` Folder

```
robots.txt             ← Tells Google how to index the site
sitemap.xml            ← Map of all pages (for search engines)
```

---

## 📦 Config & Build Files (Don't Panic!)

```
dist/                  ← Built/compiled code (auto-generated, don't edit)
node_modules/          ← Downloaded libraries (auto-generated, don't touch)

.env                   ← Your secret keys (passwords, API keys)
                         ⚠️ NEVER push this to GitHub
.env.example           ← Template showing what keys you need
.gitignore             ← Tells git what files to ignore

package.json           ← List of all libraries we use
package-lock.json      ← Lock file (keeps versions consistent)

tsconfig.json          ← TypeScript rules
vite.config.ts         ← Vite (build tool) settings
vitest.config.ts       ← Test runner settings
postcss.config.mjs     ← CSS processor settings

index.html             ← The HTML file that React mounts to
LICENSE.txt            ← Open source license
```

---

## 🔐 Important Security Files

```
.env                   ← Contains:
                          - VITE_SUPABASE_URL (database)
                          - VITE_SUPABASE_ANON_KEY (database key)
                          - VITE_POSTHOG_KEY (analytics)
                          - VITE_STRIPE_PUBLISHABLE_KEY (payments)
                          - etc.

⚠️ Rule: Never share .env file, never push to GitHub
   Use environment variables on deployed servers
```

---

## 📊 Understanding the Data Flow

### When Someone Signs Up:

```
1. User clicks "Sign Up" button
   └─→ Route: /signup (page shows form)

2. User fills form and clicks "Create Account"
   └─→ AuthContext.tsx talks to Supabase
   └─→ Supabase creates account in database

3. User is now logged in
   └─→ AuthContext.tsx stores session
   └─→ RequireAuth lets them see protected pages

4. User goes to /onboarding
   └─→ CookieConsent shows up (GDPR banner)
   └─→ If they accept: grantAnalyticsConsent() enables tracking
   └─→ If they reject: revokeAnalyticsConsent() disables tracking

5. User fills profile, picks course
   └─→ Data saved to Supabase (student_profiles table)

6. User goes to /checkout
   └─→ Stripe payment page shows up
   └─→ User pays
   └─→ Stripe webhook calls supabase/functions/server/index.tsx
   └─→ Payment recorded in database

7. User sees /checkout-success
   └─→ Then redirected to /dashboard
```

---

## 🎨 Design System

### Where Design Stuff Lives:

```
src/styles/theme.css   ← All the colors, fonts, spacing
                          (Design tokens in CSS variables)

src/app/components/    ← UI components (buttons, cards, etc.)

Figma                  ← Original design file
                          (https://www.figma.com/design/l0QHcTXfoIjpcYSDZUtkG2/JI_FINAL)
```

**How to change look?** Edit `theme.css` or the component itself (usually in `components/` folder).

---

## 🧪 Testing

```
**/*.test.tsx          ← Test files (next to components they test)
vitest.config.ts       ← Test configuration

Run tests:
  npm run test:unit    ← Run once
  npm run test:watch   ← Run whenever you change code
```

---

## 🚀 Deployment & Build

```
npm run build          ← Creates optimized version for production
npm run preview        ← Test production build locally
npm run dev            ← Run locally while developing

Built files go to:
  dist/                ← This gets uploaded to the server
```

---

## 🌍 Multilingual (i18n)

### How Languages Work:

1. **Translation files** live in `src/locales/`
   - `en.json` = English
   - `cs.json` = Czech
   - `it.json` = Italian
   - etc.

2. **In code, use:**
   ```tsx
   const { t } = useTranslation();
   <h1>{t('landing.title')}</h1>
   ```
   
3. **Change language:**
   ```tsx
   i18n.changeLanguage('it')  // Switch to Italian
   ```

4. **Email routing** (footer) changes based on language:
   - EN/CS → josef@jazykaintegrace.cz
   - IT → marta@jazykaintegrace.cz
   - RU/UK → ekaterina@jazykaintegrace.cz

---

## 🔒 GDPR & Cookies (The Serious Stuff)

### Files to Know:

```
src/app/components/CookieConsent.tsx    ← Banner shows
src/utils/analytics.ts                  ← Tracking logic
GDPR_COMPLIANCE.md                      ← Rules & explanations
```

### How It Works:

1. **User visits site**
   - Banner pops up asking about cookies
   - User either accepts or rejects

2. **User accepts**
   - `grantAnalyticsConsent()` is called
   - PostHog starts tracking events
   - Decision saved in `localStorage`

3. **User rejects**
   - `revokeAnalyticsConsent()` is called
   - PostHog stops tracking
   - Data cleared from browser

4. **User can change mind**
   - Footer "Cookie Preferences" link reopens banner
   - They can switch from "accept" to "reject" anytime

**Why?** GDPR law requires explicit consent. This approach makes it clear and gives users control.

---

## 💬 Key Files by Task

### "I need to change the landing page"
```
src/features/          ← Edit sections here
src/app/pages/LandingPage.tsx ← Main page
```

### "I need to add a new page"
```
1. Create file in src/app/pages/NewPage.tsx
2. Add route to src/app/App.tsx
3. If it needs auth, wrap with <RequireAuth>
```

### "I need to change colors/fonts"
```
src/styles/theme.css   ← Edit design tokens here
```

### "I need to add a new language"
```
1. Add file: src/locales/xx.json (where xx = language code)
2. Copy structure from en.json
3. Translate all the text
4. Update i18n.ts if needed
```

### "I need to fix a bug"
```
1. Find the component using src/app/App.tsx (routes)
2. Read the file (has comments explaining intent)
3. Fix the bug
4. npm run test:unit (test it)
5. npm run build (make sure it builds)
6. Commit with clear message (see VERSIONING.md)
```

### "I need to check what data is stored"
```
supabase/schema.sql    ← Database structure
```

### "I need to understand payments"
```
src/app/pages/Checkout.tsx              ← Payment page
supabase/functions/server/index.tsx     ← Backend payment logic
utils/stripe.ts                         ← Helper functions
```

---

## 🎯 The Perfect First Day (If You're New)

**Morning (1-2 hours):**
1. Read this file (READ_FIRST.md)
2. Read [README.md](./README.md)
3. Read [HANDOVER.md](./HANDOVER.md)

**Afternoon (2-3 hours):**
1. Run the app (`npm install && npm run dev`)
2. Click around and understand user flow
3. Read [ARCHITECTURE.md](./ARCHITECTURE.md)
4. Explore a few files (start with `src/app/App.tsx`)

**End of day:**
- You should be able to explain the project to someone else
- You should know where things are
- You should be able to make a small change (like fixing a typo)

---

## 🗂️ File Organization Logic

**Why this structure?**

- **pages/** = Full-screen experiences
- **components/** = Reusable building blocks
- **features/** = Feature-specific sections
- **utils/** = Helper functions used everywhere
- **styles/** = All styling in one place
- **locales/** = All translations in one place

**Benefits:**
- Easy to find things
- Easy to add/remove features
- No surprise dependencies
- Clean folder structure

---

## 🚨 Important Reminders

1. **Never commit .env file** (it has passwords!)
2. **Always run tests** before pushing: `npm run test:unit`
3. **Always build before pushing**: `npm run build`
4. **Follow commit style** (see [VERSIONING.md](./VERSIONING.md))
5. **Comment your code** explaining the WHY, not the WHAT
6. **If you touch GDPR stuff, read [GDPR_COMPLIANCE.md](./GDPR_COMPLIANCE.md)**

---

## 📚 Documentation Quick Links

| Need | File |
|------|------|
| Setup & basics | [README.md](./README.md) |
| Code structure | [ARCHITECTURE.md](./ARCHITECTURE.md) |
| How to commit | [VERSIONING.md](./VERSIONING.md) |
| GDPR rules | [GDPR_COMPLIANCE.md](./GDPR_COMPLIANCE.md) |
| Lost? | [DOCS.md](./DOCS.md) (index of everything) |
| Quick ref | [HANDOVER.md](./HANDOVER.md) |

---

## 🆘 You're Confused?

**"Where is the login form?"**
```
src/app/pages/Login.tsx
```

**"Where are the colors defined?"**
```
src/styles/theme.css
```

**"Where does the database stuff happen?"**
```
src/utils/supabase/client.ts (frontend)
supabase/schema.sql (backend)
```

**"Where is the payment stuff?"**
```
src/app/pages/Checkout.tsx (frontend)
supabase/functions/server/index.tsx (backend)
```

**"Where do I add new translations?"**
```
src/locales/*.json (pick the language file)
```

**"Where is the navigation?"**
```
src/features/header/ (navbar)
src/features/footer/ (footer)
```

---

## 💡 Pro Tips

1. **Use Ctrl+P (or Cmd+P)** to search files by name in VS Code
2. **Use Ctrl+F (or Cmd+F)** to search text inside a file
3. **Comments explain intent**, not syntax — read them!
4. **Build locally often** to catch errors early: `npm run build`
5. **Read error messages** — they usually tell you exactly what's wrong

---

## 🎉 That's It!

You now know where everything is. Pick a task, find the file, make the change, test it, commit it.

**Questions?** Check the docs (HANDOVER.md, ARCHITECTURE.md, DOCS.md, or ask a teammate).

**Ready to code?** Pick an issue, find the file, and go! 🚀

---

**Last updated:** January 2026  
**Made for:** Humans, not robots  
**Language:** Young people friendly (no jargon, just facts)