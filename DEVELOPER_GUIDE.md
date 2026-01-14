/**
 * QUICK START GUIDE FOR DEVELOPERS
 * 
 * How to work with the refactored codebase
 */

// ============================================
// IMPORTING COMPONENTS
// ============================================

// NEW WAY (Preferred):
import { SiteHeader } from "@/features/header";
import { HeroSection } from "@/features/hero";
import { PricingSection } from "@/features/pricing";
import { SiteFooter } from "@/features/footer";
import { PageContainer, PageSection, SectionTitle } from "@/shared/layouts";

// OLD WAY (Still works, being phased out):
import { Header } from "@/app/components/Header";
import { Pricing } from "@/app/components/Pricing";

// Design System:
import { COLORS, TYPOGRAPHY, SPACING, ELEVATION } from "@/design-system";

// ============================================
// USING DESIGN TOKENS
// ============================================

// Color (Don't hardcode hex!)
className="bg-[#FFED00]"  // ✗ BAD
className="bg-[var(--accent)]"  // OK but check if token exists

// Better: Use color in logic/conditional rendering
import { COLORS } from "@/design-system";
const accentColor = COLORS.accent.base;

// Typography sizing
className="text-[14px]"  // ✗ BAD
className="font-['Inter'] font-bold text-[14px]"  // ✗ BAD (still hardcoded)

// Better: Reference design system scale
// Look in /src/design-system/tokens.ts for TYPOGRAPHY.scales

// Spacing
className="gap-12"  // ✗ BAD (magic number)
className="gap-6 md:gap-12"  // Better, but consider using spacing var

// Better: Reference design system
import { SPACING } from "@/design-system";
const paddingValue = SPACING.xl; // 24px

// Shadows
className="shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]"  // ✗ BAD (hardcoded)
className="shadow-[var(--dense-lg)]"  // Better if var exists

// Better: Use ELEVATION from design system
import { ELEVATION } from "@/design-system";
const shadowValue = ELEVATION.dense_lg; // "8px 8px 0px rgba(0, 0, 0, 1)"

// ============================================
// CREATING A NEW FEATURE COMPONENT
// ============================================

// 1. Create folder structure
/src/features/my-feature/
  ├─ MyFeature.tsx
  └─ index.ts

// 2. Create component with clear JSDoc
/**
 * MyFeature
 *
 * What this component represents (domain concept).
 *
 * Domain Concept: [What business concept does this represent?]
 *
 * Responsibilities:
 * - [Thing it does 1]
 * - [Thing it does 2]
 *
 * Props:
 * - title: The main heading text
 * - onSubmit: Callback when user submits
 */
export const MyFeature = ({ title, onSubmit }) => {
  // Hooks
  const { t } = useTranslation();
  const [state, setState] = useState();

  // Computed values
  const isActive = state === 'active';

  // ============================================
  // HANDLERS
  // ============================================
  const handleClick = () => { ... }

  // ============================================
  // EFFECTS
  // ============================================
  useEffect(() => { ... }, []);

  // JSX
  return (
    <section>...</section>
  );
};

// 3. Export from index.ts
export { MyFeature } from "./MyFeature";

// 4. Use in pages
import { MyFeature } from "@/features/my-feature";

// ============================================
// COMPONENT BEST PRACTICES
// ============================================

GOOD: Domain-specific naming
export const CourseCard = () => { ... }  // ✓ Clear what it is
export const PricingPlan = () => { ... }  // ✓ Clear purpose
export const NavigationLink = () => { ... }  // ✓ Descriptive

BAD: Generic naming
export const Component = () => { ... }  // ✗ Unclear
export const Card = () => { ... }  // ✗ Too generic
export const Link = () => { ... }  // ✗ Ambiguous

GOOD: Clear JSDoc
/**
 * CourseCard
 * 
 * Displays a single course offering with enrollment button.
 * Domain Concept: A course offering in the curriculum.
 */

BAD: No JSDoc
export const CourseCard = () => { ... }  // ✗ Purpose unclear

GOOD: Semantic props
<CourseCard
  title="Intermediate Czech"
  level="B1"
  startDate={new Date()}
  onEnroll={handleEnroll}
/>

BAD: Non-semantic props
<CourseCard
  text="Intermediate Czech"
  lv="B1"
  date={new Date()}
  onClick={handleEnroll}
/>

GOOD: Extract repeated patterns
function CourseCardFeature({ icon, text }) {
  return <div className="flex gap-2">{icon} {text}</div>;
}

// Use in component
<CourseCardFeature icon={<Icon />} text="Group sessions" />

BAD: Repeat patterns
<div className="flex gap-2"><Icon /> Group sessions</div>
<div className="flex gap-2"><Icon /> Flexible scheduling</div>
<div className="flex gap-2"><Icon /> Community events</div>

// ============================================
// STYLING RULES
// ============================================

1. USE TAILWIND ONLY
   - No CSS modules
   - No styled-components
   - No inline <style> tags
   - All in className

2. REFERENCE DESIGN SYSTEM
   - No hardcoded #hex colors
   - No raw px values
   - No arbitrary font sizes
   - Everything from tokens.ts or theme.css

3. EXTRACT REPEATED PATTERNS
   - Repeating className? Make a component
   - Repeating color? Reference COLORS
   - Repeating spacing? Reference SPACING

4. ORGANIZE CLASSNAMES
   // Good organization:
   className={classNames(
     // Base styles
     "flex items-center justify-center",
     // Sizing
     "h-12 w-12",
     // Spacing
     "px-4 py-2",
     // Colors
     "bg-blue text-white",
     // Hover/Focus
     "hover:bg-blue-dark focus:ring-2",
     // Responsive
     "md:px-6 md:py-4",
     // Conditional
     isActive && "bg-blue-dark"
   )}

// ============================================
// USEFUL COMMANDS
// ============================================

Build the project:
npm run build

Run dev server:
npm run dev

Run tests:
npm run test:unit
npm run test:watch

Check for TypeScript errors:
npx tsc --noEmit

// ============================================
// USEFUL FILES TO REFERENCE
// ============================================

For design tokens:
/src/design-system/tokens.ts

For component patterns:
/src/features/header/SiteHeader.tsx  (good example)
/src/features/footer/SiteFooter.tsx  (good example)

For layout patterns:
/src/shared/layouts/Page.tsx

For architectural guidance:
/ARCHITECTURE_GUIDE.md

For progress tracking:
/REFACTORING_CHECKLIST.md

// ============================================
// COMMON MISTAKES TO AVOID
// ============================================

✗ Don't hardcode colors
import { COLORS } from "@/design-system";
const bgColor = COLORS.primary.base;

✗ Don't mix styling approaches
// Use Tailwind only, no inline styles
className="..."  // ✓
style={{ color: 'red' }}  // ✗

✗ Don't create generic components in features/
// Feature components should be specific
/src/features/course-list/  // ✓
/src/features/components/   // ✗

✗ Don't put non-component logic in components/
// Keep utilities in /src/utils/
/src/utils/analytics.ts  // ✓
/src/components/analytics.ts  // ✗

✗ Don't nest components deeply
// Extract to separate files
function Parent() {
  function Child() {  // ✗
    return ...
  }
}

// Instead:
function Child() { ... }  // ✓
function Parent() { ... }

*/

export const QUICK_START = {
  version: "1.0",
  lastUpdated: "2024-01-14",
};
