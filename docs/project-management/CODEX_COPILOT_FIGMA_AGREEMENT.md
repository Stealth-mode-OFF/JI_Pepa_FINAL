# Codex + Copilot + Figma Collaboration Agreement

Purpose: Move fast without duplicate work. Codex leads architecture/integration. Copilot handles UI implementation per prompts. Figma captures design specs and visual decisions.

## Roles
Codex (this agent)
- Owns system architecture, data models, routing, auth, backend wiring.
- Writes integration code, API contracts, and validation logic.
- Reviews Copilot changes, resolves conflicts, and keeps repo coherent.
- Declares "Prompt ready" when UI work can begin.

Copilot
- Implements UI components and layout per Codex prompts.
- Adds styles, motion, and minor presentational state handling.
- Does not change routing, data models, or server/API contracts unless asked.

Figma
- Stores component specs, visual tokens, and layout decisions.
- Codifies the onboarding strategy and UI patterns.
- Provides final design references for Copilot implementation.

## Workflow
1) Codex builds data wiring and minimal functional flow.
2) Codex posts "Prompt ready" and provides a precise Copilot prompt.
3) Copilot implements UI only, no data-layer changes.
4) Codex reviews, merges, and finalizes integration.
5) Repeat per feature.

## No-Duplication Rules
- If Codex is working on a file, Copilot does not touch it.
- Copilot edits only files explicitly listed in the prompt.
- Codex avoids redoing UI work already done by Copilot.
- Figma updates happen only after Codex/Copilot alignment.

## File Ownership (default)
- Data/Auth/Backend: Codex
- UI components, layouts, animations: Copilot
- Design tokens/specs: Figma

## Handoff Checklist (per feature)
- Codex: data wiring complete, routes added, i18n keys added.
- Copilot: UI matches Figma spec, uses existing tokens.
- Codex: final test, cleanup, commit message.

## Conflict Resolution
- Codex has final say on integration and architecture.
- UI disagreements go back to Figma for resolution.
- Any unexpected conflicts are escalated before proceeding.

## Prompts Protocol
- Codex provides prompts with:
  - Scope of files
  - Required states and transitions
  - i18n keys to use
  - Approved new i18n keys (if any)
  - Do-not-touch list
- Copilot replies with changes only in scope.
 
## Version Control Protocol (Copilot)
- Copilot performs all commits and pushes for UI tasks.
- Every commit must include commentary in the commit message.
- Every push should be announced with a short commentary.
- Every Copilot prompt from Codex must end with: "commit to github when finished".

### Commit Message Template
```
feat|fix: [area] [brief description]

- bullet point 1 (specific change)
- bullet point 2 (specific change)
- bullet point 3 (specific change)

Example:
feat: onboarding UI redesign with 4-step flow

- add progress bar with smooth animation (0.5s fade)
- redesign level cards with gradient backgrounds and hover effects
- implement multi-select goal tags with spring animations
- add availability chips and time preference toggles
- add fade-in/scale-in keyframe animations to tailwind.css
```

### Escalation & SLA
- **Review SLA:** Codex acknowledges and reviews Copilot work within 24 hours.
- **Escalation channel:** #dev-codex-copilot on Slack (or agreed async tool).
- **SLA fallback:** If Codex unavailable >24h, Copilot escalates to [backup contact] and may proceed with additional safety checks (lint + type check verified).
- **If Figma link missing:** Copilot sends message: "Figma reference needed before styling beyond tokens. Waiting for link."

## Approved Next Step
Onboarding 2026 flow (4-step) following ONBOARDING_2026_STRATEGY.md:
Codex wires data model and state machine first, then Copilot builds UI.

## Additional Guardrails
- Do-not-touch register per sprint: Codex lists files in-flight so Copilot avoids collisions.
- UI handoff checklist: tokens applied, motion specs matched, responsive breakpoints verified, i18n keys used, no new deps.
- Motion/testing: respect `prefers-reduced-motion`; no new animation libs without Codex approval.
- Lint/type: Copilot runs `npm run lint && npx tsc --noEmit` or notes if skipped; zero errors before push.
- Testing: Verify responsive breakpoints (mobile/tablet/desktop) in dev mode; no console errors.
- Motion: Verify animations respect `prefers-reduced-motion` CSS media query.
- i18n: Only use keys provided in Codex prompt; flag missing keys immediately.
- Review SLA: Codex acknowledges Copilot PRs within an agreed window (e.g., 24h) or reassigns priority.
- Variant scope: prompts state if dark mode/extra variants are in scope; default to none unless specified.
- Translation hygiene: Copilot only uses provided i18n keys; flag missing keys back to Codex instead of inventing.
- Visual source of truth: prompt must include the Figma page/link; if absent, Copilot pauses styling beyond tokens and asks.

## Copilot Prompt Queue (living log)
Use this section to queue prompts and Copilot responses so both agents can work in parallel without overlap.

### Template
```
Prompt: [User-facing request]
Scope: [Files to edit]
Do-not-touch: [Files Codex is editing]
Figma link: [Design reference URL or "N/A if minimal styling"]
Notes: [Context, psychology, special constraints]
Status: [Queued | In Progress | Complete]
Copilot response: [Summary of changes + commit hash]
```

### Example: Onboarding 4-Step Redesign
```
Prompt: Redesign Onboarding.tsx UI to match ONBOARDING_2026_STRATEGY.md (4-step flow). Keep existing state logic and handlers intact. Use only existing i18n keys under onboarding.*. Add progress indicator, animated step transitions, card carousel for level selection, multi-select tag buttons for goals, and availability chips + time-preference toggles. Preserve AuthShell layout, no routing changes, no Supabase edits, no new deps.
Scope: src/app/pages/Onboarding.tsx, src/styles/tailwind.css
Do-not-touch: src/app/auth/*, src/utils/supabase/*
Figma link: ONBOARDING_2026_STRATEGY.md (section 3: 4-Step Flow)
Notes: Existing state machine already wired; just restyle. Motion specs: 0.5s fade-in, 0.3s scale-in, 0.2-0.4s transitions.
Status: Complete
Copilot response: Redesigned all 4 steps with progress bar, gradient cards, multi-select tags, chips, and animations. Added tailwind keyframes for fade-in/scale-in. All i18n keys from existing onboarding.* namespace used. Commit: abc123def456
```

## Do-Not-Touch Register (active files per sprint)
Codex populates this list so Copilot knows which files are in-flight.

**Sprint: Jan 13 - Jan 20**
- `src/app/auth/AuthContext.tsx` (Codex: session mgmt refactor)
- `supabase/functions/server/index.tsx` (Codex: payment webhook)
- `src/utils/supabase/client.ts` (Codex: RLS + auth rules)


## Production-Ready Build Plan (living checklist)
Goal: A Czech language school site that converts, and allows signup + payment.

Phase 1: Core Infrastructure (Must-have)
- Supabase schema + RLS applied in production.
- Supabase Auth configured (email confirm, redirect URLs).
- Onboarding data capture with 4-step flow (per ONBOARDING_2026_STRATEGY.md).
- Student dashboard reads profile + enrollment + payment status.

Phase 2: Payments & Enrollment (Must-have)
- Stripe checkout Edge Function deployed.
- Webhook updates payment + enrollment status.
- Frontend checkout wired with cohort selection.
- Post-payment success + pending handling.

Phase 3: Course Inventory (Must-have)
- Seed real courses + cohorts in Supabase.
- Replace hardcoded course list with live data.
- Allow user to select cohort before checkout.

Phase 4: Conversion & Trust (High impact)
- Testimonials, instructor section, FAQs.
- Pricing clarity and refund policy.
- Lead magnet + newsletter connected to real endpoint.

Phase 5: Compliance & Ops (Must-have)
- Privacy, terms, cookies reviewed and accurate.
- Support channels confirmed.
- Refund and cancellation policy published.

Phase 6: Observability & QA
- Analytics (GA4/PostHog) events for signup + checkout.
- Error tracking (Sentry or similar).
- Smoke tests for auth + checkout.

Phase 7: Deployment
- All env vars set (Supabase + Stripe).
- Supabase functions deployed.
- Build + deploy to hosting.
- Domain + SSL + SEO verification.
