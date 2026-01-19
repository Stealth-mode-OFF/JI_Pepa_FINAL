# Documentation Index

This document helps you find the right documentation for your needs.

---

## 🚀 Starting Point (Read These First)

| Document | Purpose | Read Time |
|----------|---------|-----------|
| [HANDOVER.md](./HANDOVER.md) | **For new developers:** Quick start, critical knowledge, where code lives | 10 min |
| [README.md](./README.md) | Project overview, setup, user journey, tech stack | 5 min |
| [ARCHITECTURE.md](./ARCHITECTURE.md) | Folder structure, data flow, design decisions, common tasks | 10 min |

**Suggested order:** HANDOVER → README → ARCHITECTURE

---

## 📚 Reference Guides

### For Code Changes & Contributions
- **[VERSIONING.md](./VERSIONING.md)** — How to write commits, branch strategy, code review checklist
- **[START_HERE.md](./START_HERE.md)** — Quick reference for developers (complementary to ARCHITECTURE)

### For GDPR & Analytics
- **[GDPR_COMPLIANCE.md](./GDPR_COMPLIANCE.md)** — Complete GDPR implementation overview
- **[GDPR_QUICK_REFERENCE.md](./GDPR_QUICK_REFERENCE.md)** — Quick answers to GDPR questions
- **[GDPR_TESTING_CHECKLIST.md](./GDPR_TESTING_CHECKLIST.md)** — Test scenarios and manual verification steps
- **[GDPR_IMPLEMENTATION_SUMMARY.md](./GDPR_IMPLEMENTATION_SUMMARY.md)** — Before/after summary of changes

### Project History & Context
- **[REFACTOR_SUMMARY.md](./REFACTOR_SUMMARY.md)** — Details of major architectural refactor
- **[ONBOARDING_2026_STRATEGY.md](./ONBOARDING_2026_STRATEGY.md)** — Strategic planning document

---

## 🎯 By Use Case

### "I just inherited this project"
1. Read [HANDOVER.md](./HANDOVER.md) (10 min)
2. Read [README.md](./README.md) (5 min)
3. Read [ARCHITECTURE.md](./ARCHITECTURE.md) (10 min)
4. Run `npm install && npm run dev` and explore
5. **Total: ~30 minutes to productive**

### "I need to make a code change"
1. Check [VERSIONING.md](./VERSIONING.md#before-you-push) — pre-push checklist
2. Write your code
3. Follow commit conventions in [VERSIONING.md](./VERSIONING.md#commit-message-format)
4. Run tests: `npm run test:unit`

### "I'm changing analytics or cookies"
1. **Read [GDPR_COMPLIANCE.md](./GDPR_COMPLIANCE.md) first** — non-negotiable
2. Make your changes
3. Follow testing steps in [GDPR_TESTING_CHECKLIST.md](./GDPR_TESTING_CHECKLIST.md)
4. Commit with clear message referencing GDPR changes

### "I need to add/remove/modify a feature"
1. Understand folder structure in [ARCHITECTURE.md](./ARCHITECTURE.md#folder-structure)
2. Check "Common Tasks" in [ARCHITECTURE.md](./ARCHITECTURE.md#common-tasks--where-to-find-code)
3. Find the right location for your code
4. Add/update comments explaining your change (see [ARCHITECTURE.md → File-Level Comments](#))

### "Someone is asking about GDPR compliance"
- Quick answer: [GDPR_QUICK_REFERENCE.md](./GDPR_QUICK_REFERENCE.md)
- Full details: [GDPR_COMPLIANCE.md](./GDPR_COMPLIANCE.md)
- Test verification: [GDPR_TESTING_CHECKLIST.md](./GDPR_TESTING_CHECKLIST.md)

### "I'm deploying to production"
1. Check [HANDOVER.md](./HANDOVER.md#before-pushing-to-production) — pre-production checklist
2. Verify GDPR compliance: [GDPR_TESTING_CHECKLIST.md](./GDPR_TESTING_CHECKLIST.md)
3. Check environment variables are set
4. Verify Supabase schema deployed
5. Enable PostHog IP anonymization in dashboard
6. Deploy with confidence ✅

---

## 📖 Document Summaries

### Core Project Documentation

**[README.md](./README.md)**
- What the project is (language learning platform)
- How to set up and run locally
- Key integrations (Supabase, Stripe, PostHog, i18next)
- Environment variables
- User journey through the app
- Contact handling approach

**[ARCHITECTURE.md](./ARCHITECTURE.md)**
- Complete folder structure with descriptions
- Data flow diagrams (signup, auth, analytics)
- Component responsibilities
- Database schema overview
- Internationalization setup
- Design decisions and patterns
- Common tasks and where to find code
- Performance & security notes

**[VERSIONING.md](./VERSIONING.md)**
- Commit message format (feat, fix, docs, etc.)
- How to write clear commits
- Branch strategy
- Pre-push checklist
- Code review expectations
- Project history context

**[HANDOVER.md](./HANDOVER.md)**
- Quick start (5 minutes)
- Critical things to know
- Where important code lives (quick reference table)
- Common tasks (add page, change contact, add translation, etc.)
- Before-production checklist
- Links to detailed docs

### GDPR & Analytics Documentation

**[GDPR_COMPLIANCE.md](./GDPR_COMPLIANCE.md)**
- Complete GDPR implementation details
- What changed and why
- How consent flow works
- How to test GDPR compliance
- Known limitations

**[GDPR_QUICK_REFERENCE.md](./GDPR_QUICK_REFERENCE.md)**
- Common GDPR questions and answers
- Quick lookup for key concepts
- File locations for GDPR-related code

**[GDPR_TESTING_CHECKLIST.md](./GDPR_TESTING_CHECKLIST.md)**
- 7 manual test scenarios
- Console verification commands
- Browser DevTools steps
- How to verify consent is stored correctly

**[GDPR_IMPLEMENTATION_SUMMARY.md](./GDPR_IMPLEMENTATION_SUMMARY.md)**
- Before/after summary of changes
- Violations fixed
- Implementation approach

### Supplementary Documentation

**[START_HERE.md](./START_HERE.md)**
- Quick developer reference
- Complementary to ARCHITECTURE.md

**[REFACTOR_SUMMARY.md](./REFACTOR_SUMMARY.md)**
- Details of major architectural refactor
- Folder structure improvements
- Component reorganization

---

## 🔍 Key Concepts Explained

### GDPR Compliance
- **Analytics disabled by default** — users must opt-in to tracking
- **Consent banner** — shows on first visit, can be reopened via footer
- **Decision stored** — localStorage with timestamp for audit
- **Manual step** — IP anonymization must be enabled in PostHog dashboard
- See: [GDPR_COMPLIANCE.md](./GDPR_COMPLIANCE.md) for details

### Course Enrollment
- **Clickable rows** — entire course row navigates to signup/onboarding
- **localStorage saves choice** — cohort ID persisted for later onboarding
- **Auth-aware routing** — new users → /signup, authenticated → /onboarding
- See: [ARCHITECTURE.md → Data Flow → User Signup & Enrollment](./ARCHITECTURE.md#data-flow)

### Language-Specific Contact
- **Dynamic email routing** — instructor email chosen based on user language
- **EN/CS**: josef@jazykaintegrace.cz
- **IT**: marta@jazykaintegrace.cz
- **RU/UK**: ekaterina@jazykaintegrace.cz
- See: [ARCHITECTURE.md → Language-Specific Contact Info](./ARCHITECTURE.md#language-specific-contact-info)

### Auth & Routes
- **AuthContext** — global user state via React Context
- **RequireAuth** — route guard wrapper
- **Supabase Auth** — session management with RLS for data isolation
- See: [ARCHITECTURE.md → Authentication Flow](./ARCHITECTURE.md#authentication-flow)

---

## 🛠️ Development Workflow

```
Read HANDOVER.md (overview)
    ↓
Read README.md (setup)
    ↓
npm install && npm run dev (run locally)
    ↓
Read ARCHITECTURE.md (how it's organized)
    ↓
Explore codebase (source files have helpful comments)
    ↓
Make changes (follow VERSIONING.md conventions)
    ↓
Run tests: npm run test:unit
    ↓
Build locally: npm run build
    ↓
Push to GitHub (with clear commit message)
    ↓
Ready for production!
```

---

## 📋 Quick Links by Role

### New Developer Joining Team
1. [HANDOVER.md](./HANDOVER.md) — 10 min intro
2. [README.md](./README.md) — 5 min setup
3. [ARCHITECTURE.md](./ARCHITECTURE.md) — 10 min structure
4. Start coding!

### Code Reviewer
1. [VERSIONING.md](./VERSIONING.md#code-review-checklist) — Review checklist
2. [GDPR_COMPLIANCE.md](./GDPR_COMPLIANCE.md) — If analytics/cookie changes
3. [README.md](./README.md) — If tech stack questions

### DevOps / Deployment
1. [README.md](./README.md) — Environment variables
2. [HANDOVER.md](./HANDOVER.md#before-pushing-to-production) — Pre-production checklist
3. [GDPR_TESTING_CHECKLIST.md](./GDPR_TESTING_CHECKLIST.md) — Before launch

### Maintenance / Future Work
1. [ARCHITECTURE.md](./ARCHITECTURE.md) — Where things are
2. [VERSIONING.md](./VERSIONING.md) — How to commit
3. [GDPR_COMPLIANCE.md](./GDPR_COMPLIANCE.md) — Before changing analytics

---

## 📞 Documentation Map

- **What?** → README.md
- **Where?** → ARCHITECTURE.md
- **How?** → VERSIONING.md (for commits) or ARCHITECTURE.md (for code locations)
- **Why GDPR?** → GDPR_COMPLIANCE.md
- **Quick start?** → HANDOVER.md
- **Testing GDPR?** → GDPR_TESTING_CHECKLIST.md
- **Quick answers?** → GDPR_QUICK_REFERENCE.md
- **Project history?** → REFACTOR_SUMMARY.md or ONBOARDING_2026_STRATEGY.md

---

## ✅ All Documentation Is Up-to-Date

- ✅ README.md — Updated with project overview, tech stack, user journey
- ✅ ARCHITECTURE.md — Complete folder structure and data flow
- ✅ VERSIONING.md — Commit conventions and branch strategy
- ✅ HANDOVER.md — Quick reference for new developers
- ✅ GDPR_COMPLIANCE.md — Full compliance implementation
- ✅ Code comments — Added to key modules explaining intent
- ✅ Build verified — All changes tested (550 modules, builds in ~4s)

---

## 🚀 Next Steps

**If you're new to the project:**
1. Start with [HANDOVER.md](./HANDOVER.md)
2. Follow the 5-minute quick start
3. Explore the codebase with [ARCHITECTURE.md](./ARCHITECTURE.md) as your guide

**If you're making changes:**
1. Use [VERSIONING.md](./VERSIONING.md) for commit conventions
2. Check [ARCHITECTURE.md](./ARCHITECTURE.md) for where your code belongs
3. If analytics/GDPR related, review [GDPR_COMPLIANCE.md](./GDPR_COMPLIANCE.md)

**If you're deploying:**
1. Use [HANDOVER.md](./HANDOVER.md#before-pushing-to-production) checklist
2. Verify GDPR with [GDPR_TESTING_CHECKLIST.md](./GDPR_TESTING_CHECKLIST.md)
3. Enable PostHog IP anonymization before go-live

---

**Made for human understanding. Happy coding! 🎉**
