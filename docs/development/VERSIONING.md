# Versioning & Commit Guidelines

This document explains how commits are structured in this project and how to write good commit messages.

---

## Commit Message Format

We follow a **simple, readable format**:

```
<type>: <subject>

<body (optional)>

<footer (optional)>
```

### Types

- **feat** – New feature or user-facing change
- **fix** – Bug fix
- **docs** – Documentation only (README, ARCHITECTURE, comments)
- **refactor** – Code cleanup, reorganization (no behavior change)
- **chore** – Dependency updates, build config, tooling
- **test** – Test additions or fixes
- **style** – Formatting, whitespace (rarely used; prefer refactor)

### Subject Line

- **Imperative mood:** "Add X" not "Added X"
- **Lowercase first letter**
- **No period at end**
- **Under 50 characters when possible**

### Body (Optional)

- Wrap at 72 characters
- Explain **what** and **why**, not **how**
- Separate from subject with a blank line
- Use bullet points for multiple changes

### Footer (Optional)

- Reference issues: `Closes #123`
- Breaking changes: `BREAKING CHANGE: description`

---

## Examples

### Simple Feature
```
feat: make courses clickable for enrollment
```

### Feature with Details
```
feat: implement GDPR-compliant consent system

- Remove unconditional PostHog initialization
- Add opt-out analytics by default
- Store consent decision with timestamp in localStorage
- Add Cookie Preferences link in footer

This ensures user data is only tracked after explicit consent.
```

### Bug Fix
```
fix: prevent multiple consent banners from showing

The banner was appearing multiple times due to missing
localStorage check on component mount. Added early return
if decision already stored.
```

### Documentation
```
docs: add architecture guide and commit conventions
```

### Refactor
```
refactor: reorganize auth logic into AuthContext

Moves state management out of individual pages into
centralized context provider. No behavior changes.
```

---

## When to Use Single vs. Multiple Commits

### Use **One Big Commit** for:
- A cohesive feature (e.g., "add payment flow")
- GDPR-related changes (keep all consent logic together)
- Major refactors that touch many files but have one goal

### Use **Multiple Commits** for:
- Unrelated changes (feature A, then feature B)
- Bug fixes to existing features (separate from new features)
- Documentation updates (separate from code changes)
- Dependency updates (separate commit)

**Rule of thumb:** Each commit should tell a complete story. If you need "and" in your commit message, you might have two commits.

---

## Branches

- **main** – Production-ready code, always deployable
- **staging** – Pre-production testing
- **feature/** – Feature branches (e.g., `feature/payment-flow`)
- **fix/** – Bug fixes (e.g., `fix/consent-banner`)
- **docs/** – Documentation updates (e.g., `docs/api-guide`)

## Branch Workflow

1. Create feature branch from `main`
   ```bash
   git checkout -b feature/my-feature
   ```

2. Make commits with clear messages

3. Push and create Pull Request
   ```bash
   git push origin feature/my-feature
   ```

4. After review/approval, squash and merge to `main`
   ```bash
   # Option 1: Use GitHub UI "Squash and merge"
   # Option 2: Manual squash
   git rebase -i origin/main
   ```

---

## Project History Context

### Major Refactor (Commit 0781445)
- **What:** Enterprise architecture reorganization
- **When:** Early in project history
- **Impact:** Moved from flat folder structure to feature-based organization
- **Status:** Stable — current codebase follows this pattern

### GDPR Implementation (Latest)
- **What:** Added consent-aware analytics, updated contact info, made courses clickable
- **When:** Most recent work
- **Impact:** All analytics now require user consent; contact info is language-aware
- **Status:** Production-ready — all tests passing

### Older Commits
- May reflect pre-refactor structure
- Reference for historical context only
- Don't use pre-refactor patterns in new code

---

## Before You Push

1. **Run tests:**
   ```bash
   npm run test:unit
   npm run test:watch
   ```

2. **Build locally:**
   ```bash
   npm run build
   npm run preview
   ```

3. **Check TypeScript:**
   ```bash
   npx tsc --noEmit
   ```

4. **Review your changes:**
   ```bash
   git diff
   git log --oneline -5
   ```

5. **Write a clear commit message** (see Examples above)

---

## Commit Message Anti-Patterns

❌ **Avoid:**
- "wip" (work in progress)
- "fix stuff"
- "update files"
- "asdf" or emoji-only commits
- Writing in past tense ("Added X" instead of "Add X")
- All changes in one commit with multiple unrelated purposes

✅ **Do Instead:**
- One clear purpose per commit
- Descriptive subject line
- Imperative mood
- If mixed changes, split into separate commits

---

## Code Review Checklist

Before requesting review, ensure:
- [ ] Commit messages are clear and follow format
- [ ] Tests pass (`npm run test:unit`)
- [ ] Code builds (`npm run build`)
- [ ] No console errors or warnings
- [ ] TypeScript is happy (`npx tsc --noEmit`)
- [ ] If GDPR/analytics changes: Review [GDPR_COMPLIANCE.md](./GDPR_COMPLIANCE.md)
- [ ] If auth changes: Test `/login`, `/signup`, protected routes
- [ ] If Supabase changes: Schema changes documented in PR

---

## Common Patterns in This Codebase

### Adding a New Page
```bash
git checkout -b feature/add-new-page
# Create src/app/pages/NewPage.tsx
# Add route to App.tsx
# Commit:
git commit -m "feat: add new page with X functionality"
```

### Fixing a Bug
```bash
git checkout -b fix/consent-banner-bug
# Fix the bug in CookieConsent.tsx
# Add test if applicable
# Commit:
git commit -m "fix: prevent consent banner from showing multiple times

Previously, banner appeared on every mount due to missing
localStorage check. Now checks decision before rendering."
```

### GDPR/Analytics Changes
```bash
git checkout -b feature/enhance-analytics-consent
# Update analytics.ts, CookieConsent.tsx
# All changes in one commit to keep consent logic together
git commit -m "feat: add granular consent categories

- Add checkboxes for analytics vs marketing consent
- Store granular decisions in localStorage
- Only capture events if corresponding category is consented"
```

---

## Questions?

- See [README.md](./README.md) for project overview
- See [ARCHITECTURE.md](./ARCHITECTURE.md) for code structure
- See [GDPR_COMPLIANCE.md](./GDPR_COMPLIANCE.md) for analytics guidelines
