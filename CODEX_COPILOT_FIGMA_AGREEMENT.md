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
  - Do-not-touch list
- Copilot replies with changes only in scope.

## Approved Next Step
Onboarding 2026 flow (4-step) following ONBOARDING_2026_STRATEGY.md:
Codex wires data model and state machine first, then Copilot builds UI.

## Additional Guardrails
- Do-not-touch register per sprint: Codex lists files in-flight so Copilot avoids collisions.
- UI handoff checklist: tokens applied, motion specs matched, responsive breakpoints verified, i18n keys used, no new deps.
- Motion/testing: respect `prefers-reduced-motion`; no new animation libs without Codex approval.
- Lint/type: Copilot runs lint/tsc or notes if not run on UI changes before handoff.
- Review SLA: Codex acknowledges Copilot PRs within an agreed window (e.g., 24h) or reassigns priority.
- Variant scope: prompts state if dark mode/extra variants are in scope; default to none unless specified.
- Translation hygiene: Copilot only uses provided i18n keys; flag missing keys back to Codex instead of inventing.
- Visual source of truth: prompt must include the Figma page/link; if absent, Copilot pauses styling beyond tokens and asks.
