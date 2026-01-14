/**
 * ============================================
 * ARCHITECTURE GUIDE
 * ============================================
 *
 * This document describes the refactored architecture.
 *
 * PRINCIPLES:
 * 1. Single source of truth for design decisions (design-system/)
 * 2. Semantic naming (what it represents, not implementation)
 * 3. Clear folder structure (features, pages, shared)
 * 4. Explicit component contracts (clear prop names, single responsibility)
 * 5. No hardcoded values anywhere
 *
 * ============================================
 * FOLDER STRUCTURE
 * ============================================
 *
 * /src
 *   ├─ /design-system/          ← All design tokens and utilities (SINGLE SOURCE OF TRUTH)
 *   │  ├─ tokens.ts             ← Color, typography, spacing, elevation, etc.
 *   │  ├─ utils.ts              ← Helper functions and component presets
 *   │  └─ index.ts              ← Public API
 *   │
 *   ├─ /features/               ← Feature-specific components (organized by domain)
 *   │  ├─ /header/              ← Site header and navigation
 *   │  │  ├─ SiteHeader.tsx
 *   │  │  └─ index.ts
 *   │  ├─ /hero/                ← Hero section
 *   │  │  ├─ HeroSection.tsx
 *   │  │  └─ index.ts
 *   │  ├─ /footer/              ← Footer
 *   │  ├─ /pricing/             ← Pricing section
 *   │  ├─ /courses/             ← Course listing
 *   │  └─ ... (other features)
 *   │
 *   ├─ /pages/                  ← Page-level components (routes)
 *   │  ├─ LandingPage.tsx        ← Orchestrates features into a page
 *   │  └─ ... (other pages)
 *   │
 *   ├─ /shared/                 ← Reusable, generic components
 *   │  ├─ /layouts/             ← Layout primitives (container, section)
 *   │  │  ├─ Page.tsx            ← PageContainer, PageSection, SectionTitle
 *   │  │  └─ index.ts
 *   │  └─ /components/          ← Generic UI components
 *   │
 *   ├─ /app/                    ← LEGACY - Being refactored
 *   │  ├─ /components/          ← Components being moved to /features
 *   │  ├─ /pages/               ← Pages being moved to /pages
 *   │  └─ ...
 *   │
 *   └─ ... (utils, styles, etc.)
 *
 * ============================================
 * NAMING CONVENTIONS
 * ============================================
 *
 * DOMAIN CONCEPTS (Preferred):
 * - SiteHeader (not Header, HeaderNav, etc.)
 * - HeroSection (not Hero, HeroBanner, etc.)
 * - PricingSection (not Pricing, PricingCards, etc.)
 * - CourseCard (not CourseItem, CourseBlock, etc.)
 *
 * LAYOUT / STRUCTURAL:
 * - PageContainer (not Container, MainWrapper, etc.)
 * - PageSection (not Section, Wrapper, etc.)
 * - SectionTitle (not Title, Heading, etc.)
 *
 * AVOID:
 * - Generic: Component1, Common, Shared, Wrapper
 * - Implementation details: StyledDiv, FlexBox, RedBox
 * - Acronyms without context: Nav, Form, Btn
 *
 * ============================================
 * COMPONENT CONTRACTS
 * ============================================
 *
 * Every component has:
 * 1. JSDoc comment explaining PURPOSE and RESPONSIBILITIES
 * 2. Single, clear responsibility
 * 3. Semantic prop names (reveal intent)
 * 4. Documented props (what they mean, not types only)
 *
 * GOOD:
 * interface SectionTitleProps {
 *   label?: string;          // Small caption above title
 *   children: React.ReactNode; // The main heading text
 *   subtitle?: React.ReactNode; // Description below
 * }
 *
 * BAD:
 * interface SectionTitleProps {
 *   text: string;
 *   sub?: string;
 *   isSmall?: boolean;
 * }
 *
 * ============================================
 * DESIGN TOKENS (Non-negotiable)
 * ============================================
 *
 * NEVER hardcode:
 * - Colors: Use COLORS from design-system/tokens.ts
 * - Font sizes: Use TYPOGRAPHY.scales
 * - Spacing: Use SPACING
 * - Shadows: Use ELEVATION
 * - Border radius: Use BORDER_RADIUS
 *
 * IMPORT:
 * import { COLORS, TYPOGRAPHY, SPACING } from '@/design-system';
 *
 * USE IN TAILWIND:
 * className="bg-[#FFED00]"  ← BAD
 * className="bg-[var(--accent)]"  ← BETTER (but prefer design-system)
 * className="shadow-[8px_8px_0px_rgba(0,0,0,1)]"  ← BAD
 *
 * ============================================
 * STYLING APPROACH: TAILWIND ONLY
 * ============================================
 *
 * - Use Tailwind utility classes in components
 * - No inline styles except for dynamic values
 * - No CSS modules
 * - No styled-components
 * - Theme tokens in /src/styles/theme.css
 *
 * EXTRACT PATTERNS INTO:
 * 1. Tailwind @apply directives (CSS)
 * 2. Component presets (design-system/utils.ts)
 * 3. Reusable components
 *
 * ============================================
 * COMPONENT STRUCTURE TEMPLATE
 * ============================================
 *
 * export const ComponentName = (props) => {
 *   // 1. Hooks at top
 *   const { t } = useTranslation();
 *   const [state, setState] = useState();
 *
 *   // 2. Computed values
 *   const isActive = state === 'active';
 *
 *   // 3. Handlers (marked with "HANDLERS" comment)
 *   const handleClick = () => { ... }
 *
 *   // 4. Effects (marked with "EFFECTS" comment)
 *   useEffect(() => { ... }, [deps]);
 *
 *   // 5. JSX (marked with clear section comments if complex)
 *   return (...)
 * }
 *
 * ============================================
 * IMPORTS ORGANIZATION
 * ============================================
 *
 * Order:
 * 1. React and core libraries
 * 2. Third-party libraries
 * 3. App-level imports (absolute paths)
 * 4. Relative imports (if necessary)
 *
 * GROUP with comments:
 * import React from 'react';
 * import { useTranslation } from 'react-i18next';
 *
 * import { COLORS, TYPOGRAPHY } from '@/design-system';
 * import { PageContainer } from '@/shared/layouts';
 * import { SiteHeader } from '@/features/header';
 *
 * ============================================
 * DEPRECATION & MIGRATION PATH
 * ============================================
 *
 * Old components in /src/app/components/ are being refactored:
 * - New versions appear in /src/features/ or /src/shared/
 * - Old versions are kept for backward compatibility
 * - Gradually migrate imports over time
 * - No rush to refactor everything at once
 *
 * CHECKLIST for refactoring a component:
 * ✓ Create new version in appropriate /features/ folder
 * ✓ Use semantic naming (domain concept based)
 * ✓ Extract design decisions to design-system/
 * ✓ Simplify prop contracts (remove boolean chaos)
 * ✓ Add clear JSDoc comments
 * ✓ Test that it renders identically
 * ✓ Update imports in pages to use new version\n * ✓ Keep old version for reference (mark as DEPRECATED)\n *
 * ============================================
 * ANTI-PATTERNS (AVOID)
 * ============================================\n *
 * ✗ Hardcoded colors, sizes, spacing\n * ✗ Magic numbers anywhere\n * ✗ Boolean prop chaos (isSmall, hasIcon, isBold)\n * ✗ Generic component names\n * ✗ Comments explaining WHAT (code should be self-evident)\n * ✗ Deeply nested components (extract to separate files)\n * ✗ Props that are "configuration objects" (spread out into named props)\n * ✗ Components with >300 lines (split into smaller pieces)\n * ✗ Mixed styling approaches (Tailwind + CSS modules + styled-components)\n *\n * ============================================\n * QUICK START FOR NEW COMPONENTS\n * ============================================\n *\n * 1. Understand the domain (what does this component represent?)\n * 2. Name after the domain concept, not implementation\n * 3. Create in appropriate /features/ folder\n * 4. Add JSDoc explaining purpose and responsibilities\n * 5. Use design tokens from @/design-system\n * 6. Keep props semantic and intention-revealing\n * 7. Extract any repeated patterns\n * 8. Test rendering and styling\n * 9. Add index.ts export\n */\n\nexport const ARCHITECTURE = {\n  version: \"2.0\",\n  lastUpdated: \"2024-01-14\",\n  status: \"Enterprise Refactor in Progress\",\n};\n