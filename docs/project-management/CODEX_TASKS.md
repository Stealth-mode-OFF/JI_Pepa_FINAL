# 🤖 Codex Tasks - Jazyk a Integrace Website Improvements

## ✅ Completed by Current Agent

The following improvements have been successfully implemented and committed:

### 1. Mobile Responsiveness ✅
- **CheatSheet page** now fully responsive across all breakpoints (mobile/tablet/desktop)
- Added responsive typography: `text-3xl sm:text-4xl md:text-5xl lg:text-6xl`
- Mobile-optimized padding: `p-6 sm:p-8 md:p-12`
- Full-width buttons on mobile, auto-width on desktop
- Phrase cards adapt to narrow viewports

### 2. Accessibility Enhancements ✅
- Logo in Header is now clickable with home link and focus styles
- Added ARIA labels to all interactive elements (download button, footer CTA)
- Improved keyboard navigation support

### 3. Developer Experience ✅
- Created comprehensive `.env.example` with all required variables
- Added Tailwind v4 theme configuration with custom font utilities
- Documented Supabase, Stripe, and environment setup

---

## 🚀 Your Tasks (Codex)

### **Task 1: i18n Extraction for CheatSheet (HIGH PRIORITY)**

**Goal:** Make CheatSheet fully translatable across all 5 languages (en, cs, uk, ru, it)

**Current Problem:**
- All 50+ phrases are hardcoded in English within `CheatSheet.tsx`
- Section titles use `t()` but the phrase data itself is not translatable
- This defeats the purpose of the multi-language site

**What to Do:**

1. **Extract all phrase data to locale files:**
   
   Create a new `cheatSheet` section in each locale file with this structure:

   ```json
   "cheatSheet": {
     "title": "Natural Czech Cheat Sheet",
     "subtitle": "50 Essential Phrases Locals Actually Use",
     "tagline": "Stop sounding like a textbook. Start sounding like you live here.",
     "downloadCta": "📥 Download as PDF",
     "downloadAriaLabel": "Download cheat sheet as PDF",
     
     "introTitle": "Why You Need This",
     "introBold": "Grammar tables won't help you at the pub.",
     "introBody1": "This cheat sheet gives you...",
     "introBody2": "Master these 50 phrases...",
     
     "sections": {
       "conversation": {
         "title": "Conversation Starters & Small Talk",
         "phrases": [
           {
             "czech": "Jak se vede?",
             "pronunciation": "(yahk seh VEH-deh)",
             "meaning": "How's it going?",
             "context": "More casual than 'Jak se máš?' Use with friends, colleagues."
           },
           // ... rest of phrases
         ]
       },
       "polite": {
         "title": "Softening Requests (Be Polite, Not Pushy)",
         "phrases": [ /* ... */ ]
       },
       // ... 7 more sections
     },
     
     "proTipLabel": "💡 Pro Tip:",
     "proTipBody": "Don't try to memorize all 50 at once...",
     
     "footerTitle": "Want to sound even more natural?",
     "footerBody": "This cheat sheet is just the beginning...",
     "footerCta": "Explore Our Courses",
     "footerAriaLabel": "View our Czech language courses"
   }
   ```

2. **Update CheatSheet.tsx:**
   
   Change the `phrases` object from hardcoded to:
   ```tsx
   const phrases = useMemo(() => ({
     conversation: t("cheatSheet.sections.conversation.phrases", { returnObjects: true }),
     polite: t("cheatSheet.sections.polite.phrases", { returnObjects: true }),
     // ... etc
   }), [t]);
   ```

   Update `sections` array:
   ```tsx
   const sections = [
     {
       key: "conversation",
       emoji: "🗣️",
       title: t("cheatSheet.sections.conversation.title"),
     },
     // ... etc
   ];
   ```

3. **Translate to all languages:**
   
   - For **Czech (cs.json)**: Translate the English meanings/context into Czech
   - For **Ukrainian (uk.json)**: Translate meanings/context into Ukrainian
   - For **Russian (ru.json)**: Translate meanings/context into Russian
   - For **Italian (it.json)**: Translate meanings/context into Italian
   
   **Note:** The `czech` field stays the same across all locales (it's always Czech phrases)
   The `pronunciation`, `meaning`, and `context` fields should be translated.

4. **Test:**
   - Switch language in the UI
   - Verify CheatSheet content updates
   - Check that all 50 phrases appear correctly
   - Ensure no missing translation keys

---

### **Task 2: Mobile Hamburger Menu (MEDIUM PRIORITY)**

**Goal:** Implement a mobile navigation menu since current nav is hidden on small screens

**Current Problem:**
- Header nav uses `hidden md:flex` - invisible on mobile
- No hamburger icon or mobile menu drawer
- Poor mobile UX for navigation

**What to Do:**

1. **Add state management to Header.tsx:**
   ```tsx
   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
   ```

2. **Create hamburger icon component:**
   - Animated burger → X transition
   - Accessible button with ARIA labels
   - Positioned in mobile view only

3. **Implement mobile menu drawer:**
   - Slide-in from right/left with Framer Motion
   - Full-screen overlay with backdrop
   - Stack nav items vertically
   - Include language switcher in mobile menu
   - Close on route change or escape key

4. **Design specs:**
   - Use brand colors (yellow/black)
   - Smooth animation (300ms ease-out)
   - Keyboard navigable (Tab, Escape)
   - Lock body scroll when open
   - ARIA: `role="dialog"`, `aria-modal="true"`

5. **Example structure:**
   ```tsx
   {isMobileMenuOpen && (
     <AnimatePresence>
       <motion.div
         initial={{ x: "100%" }}
         animate={{ x: 0 }}
         exit={{ x: "100%" }}
         className="fixed inset-y-0 right-0 w-full sm:w-80 bg-white z-50"
       >
         {/* Nav items, language switcher, close button */}
       </motion.div>
       <motion.div
         className="fixed inset-0 bg-black/50 z-40"
         onClick={() => setIsMobileMenuOpen(false)}
       />
     </AnimatePresence>
   )}
   ```

---

### **Task 3: Test Suite Setup (MEDIUM PRIORITY)**

**Goal:** Add basic test coverage to prevent regressions

**What to Do:**

1. **Install testing dependencies:**
   ```bash
   npm install -D vitest @testing-library/react @testing-library/jest-dom @testing-library/user-event jsdom
   ```

2. **Configure Vitest:**
   
   Create `vitest.config.ts`:
   ```ts
   import { defineConfig } from 'vitest/config';
   import react from '@vitejs/plugin-react';
   import path from 'path';

   export default defineConfig({
     plugins: [react()],
     test: {
       environment: 'jsdom',
       globals: true,
       setupFiles: './src/test/setup.ts',
     },
     resolve: {
       alias: {
         '@': path.resolve(__dirname, './src'),
       },
     },
   });
   ```

   Create `src/test/setup.ts`:
   ```ts
   import '@testing-library/jest-dom';
   import { expect, afterEach } from 'vitest';
   import { cleanup } from '@testing-library/react';

   afterEach(() => {
     cleanup();
   });
   ```

3. **Create test files:**

   **`src/app/components/__tests__/Header.test.tsx`:**
   ```tsx
   import { render, screen } from '@testing-library/react';
   import { BrowserRouter } from 'react-router-dom';
   import { Header } from '../Header';
   
   describe('Header', () => {
     it('renders logo with home link', () => {
       render(
         <BrowserRouter>
           <Header />
         </BrowserRouter>
       );
       const logo = screen.getByAltText(/Jazyk a Integrace logo/i);
       expect(logo).toBeInTheDocument();
       expect(logo.closest('a')).toHaveAttribute('href', '/');
     });

     it('shows navigation items on desktop', () => {
       render(
         <BrowserRouter>
           <Header />
         </BrowserRouter>
       );
       expect(screen.getByText(/Method/i)).toBeInTheDocument();
       expect(screen.getByText(/Courses/i)).toBeInTheDocument();
     });
   });
   ```

   **`src/app/components/__tests__/LeadMagnet.test.tsx`:**
   ```tsx
   import { render, screen, fireEvent } from '@testing-library/react';
   import { BrowserRouter } from 'react-router-dom';
   import { LeadMagnet } from '../LeadMagnet';
   
   describe('LeadMagnet', () => {
     it('renders form and CTA', () => {
       render(
         <BrowserRouter>
           <LeadMagnet />
         </BrowserRouter>
       );
       expect(screen.getByLabelText(/Work Email/i)).toBeInTheDocument();
       expect(screen.getByText(/View Cheat Sheet/i)).toBeInTheDocument();
     });

     it('validates email input', async () => {
       render(
         <BrowserRouter>
           <LeadMagnet />
         </BrowserRouter>
       );
       const emailInput = screen.getByLabelText(/Work Email/i);
       fireEvent.change(emailInput, { target: { value: 'invalid-email' } });
       // Add assertions based on validation logic
     });
   });
   ```

   **`src/app/pages/__tests__/CheatSheet.test.tsx`:**
   ```tsx
   import { render, screen } from '@testing-library/react';
   import { BrowserRouter } from 'react-router-dom';
   import CheatSheet from '../CheatSheet';
   
   describe('CheatSheet', () => {
     it('renders title and subtitle', () => {
       render(
         <BrowserRouter>
           <CheatSheet />
         </BrowserRouter>
       );
       expect(screen.getByText(/Natural Czech Cheat Sheet/i)).toBeInTheDocument();
       expect(screen.getByText(/50 Essential Phrases/i)).toBeInTheDocument();
     });

     it('renders download button', () => {
       render(
         <BrowserRouter>
           <CheatSheet />
         </BrowserRouter>
       );
       expect(screen.getByText(/Download as PDF/i)).toBeInTheDocument();
     });

     it('renders all phrase sections', () => {
       render(
         <BrowserRouter>
           <CheatSheet />
         </BrowserRouter>
       );
       expect(screen.getByText(/Conversation Starters/i)).toBeInTheDocument();
       expect(screen.getByText(/At the Pub/i)).toBeInTheDocument();
     });
   });
   ```

4. **Add npm scripts to package.json:**
   ```json
   "scripts": {
     "test": "vitest",
     "test:ui": "vitest --ui",
     "test:coverage": "vitest --coverage"
   }
   ```

5. **Document in README.md:**
   ```md
   ## Testing
   
   Run tests:
   ```bash
   npm test
   ```
   
   Run tests with UI:
   ```bash
   npm run test:ui
   ```
   ```

---

## 📋 Task Prioritization

1. **Task 1 (i18n)** - Critical for multi-language functionality
2. **Task 2 (Mobile menu)** - Important for mobile UX
3. **Task 3 (Tests)** - Important for long-term maintenance

---

## 📝 Notes

- All my changes are committed and pushed to `main`
- No TypeScript errors currently
- Dev server runs on port 5174 (5173 was in use)
- Check `/cheat-sheet` route to see responsive improvements

---

## ✅ Success Criteria

- [ ] CheatSheet fully translatable in all 5 languages
- [ ] Mobile hamburger menu functional and accessible
- [ ] Test suite runs with no errors
- [ ] All tests pass
- [ ] README updated with testing instructions

Good luck! 🚀
