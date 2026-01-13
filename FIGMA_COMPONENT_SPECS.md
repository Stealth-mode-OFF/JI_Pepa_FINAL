# FIGMA COMPONENT LIBRARY SPECS
## Premium 2026 Onboarding Components

---

## 📐 COMPONENT HIERARCHY

```
OnboardingShell (Master Layout)
├── ProgressBar
├── Step1_Welcome
├── Step2_LevelSelection (CardCarousel)
│   └── LevelCard
├── Step3_GoalsSelection
│   ├── GoalTag
│   └── SituationSelector
├── Step4_AvailabilitySelector
│   ├── TimeToggle
│   └── MatchCard (AI recommendation)
├── ResultsPage
│   ├── HeroCard
│   ├── LearningPathTimeline
│   └── FeatureRow
├── ConfettiEffect
└── TrustBadge
```

---

## 🎨 COMPONENT SPECIFICATIONS

### 1. PROGRESS BAR
**Purpose:** Visual indicator of onboarding progress

**States:**
- Empty (0%): Light gray background
- Filling (25-99%): Animated yellow fill
- Complete (100%): Yellow background, checkmark appears

**Specifications:**
```
Size:        Full width - 8px height
Position:    Top of page, sticky on scroll
Color:       #FFED00 (fill), #E0E0E0 (background)
Animation:   Smooth fill (cubic-bezier easing, 0.4s)
Spacing:     No padding, edge-to-edge

Example: [████░░░░░░] 33% Complete • Step 2 of 4
```

**Variants:**
- Mobile: 6px height (smaller visual footprint)
- With percentage text: Shows "33%" to the right
- With step indicator: Shows "Step 2 of 4"

**Interaction:**
- On screen load: Animate from previous % to new %
- Smooth deceleration (not linear)

---

### 2. LEVEL CARD
**Purpose:** Interactive card for selecting Czech proficiency level

**Base Design:**
```
┌─────────────────────────────┐
│ Gradient Background (color) │
│                             │
│      🌱 / 📚 / 🎓 etc      │
│                             │
│    Level Name (large)       │
│    Subtitle (smaller)       │
│                             │
│    "Select" ← appears hover │
└─────────────────────────────┘
```

**Specifications:**
```
Dimensions:   240px width × 180px height (responsive: 200×160 mobile)
Border:       1px solid #E0E0E0 (unselected)
Border-radius: 4px
Shadow:       None (unselected)
Typography:
  - Level:    Montserrat Bold, 24px, #000
  - Subtitle: Montserrat Regular, 14px, #666
Padding:      24px
```

**States:**

**Default (Unselected):**
```
Background:   White
Border:       1px #E0E0E0
Cursor:       pointer
```

**Hover:**
```
Background:   White
Border:       1px #FFED00
Box-shadow:   0 8px 24px rgba(255, 237, 0, 0.2)
Transform:    scale(1.03)
Cursor:       pointer
Transition:   0.3s cubic-bezier(0.34, 1.56, 0.64, 1)
```

**Selected:**
```
Background:   #FFED00
Border:       2px solid #000
Box-shadow:   0 8px 32px rgba(0, 0, 0, 0.2)
Typography:   Color #000 (inverted)
Icon:         Checkmark appears (top-right, 24×24, animated)
Transition:   0.2s
```

**Color Variants:**
```
A1:  Gradient green-light (#4CAF50 → #81C784)
A2:  Gradient blue-light (#2196F3 → #64B5F6)
B1:  Gradient purple (#9C27B0 → #BA68C8)
B2:  Gradient red (#FF6B6B → #FF8A80)
B2+: Gradient gold (#FFC107 → #FFD54F)
```

**Micro-interactions:**
- Hover scale: Smooth grow 1.03x (spring easing)
- Icon animation: Checkmark scales in from center (0.3s)
- Border animation: Color transitions to black (0.4s)

**Typography:**
```
Level Name:   "Complete Beginner" (Montserrat Bold, 24px)
Subtitle:     "I'm starting from zero" (Montserrat Regular, 14px)
Support:      "Includes pronunciation & cultural context" (Montserrat Regular, 12px, opacity 70%)
```

---

### 3. TAG BUTTON (Goal Selector)
**Purpose:** Multi-select button for goals/situations

**Design:**
```
┌──────────────────────────┐
│ 🎓 Academic Integration  │
└──────────────────────────┘
```

**Specifications:**
```
Dimensions:     Flexible (auto-width), min 140px
Height:         44px (touch-friendly)
Border:         1px solid #000
Border-radius:  24px (pill-shaped)
Padding:        12px 20px (left/right), 8px (top/bottom)
Typography:     Inter Bold, 13px, uppercase, +1px tracking
Icon + text:    8px gap between icon and text
```

**States:**

**Unselected (Default):**
```
Background:    #FFFFFF
Border:        1px solid #000
Color:         #000
Cursor:        pointer
```

**Hover:**
```
Background:    #FFED00
Border:        1px solid #000
Color:         #000
Box-shadow:    0 4px 12px rgba(255, 237, 0, 0.3)
Transform:     scale(1.05) translateY(-2px)
Transition:    0.3s cubic-bezier(0.34, 1.56, 0.64, 1)
```

**Selected:**
```
Background:    #FFED00
Border:        2px solid #000
Color:         #000
Box-shadow:    0 6px 16px rgba(0, 0, 0, 0.2)
Icon:          Checkmark appears inline (12×12)
Animation:     Spring scale-in (0.2s)
```

**Disabled (at limit):**
```
Background:    #F0F0F0
Border:        1px solid #CCC
Color:         #999
Opacity:       0.6
Cursor:        not-allowed
Hover:         No effect (disabled)
```

**Micro-interactions:**
- On select: Scale spring (1 → 1.05 → 1.02, 0.4s total)
- On hover: Subtle lift effect (translateY -2px)
- Checkmark: Scales in from center (0.2s)

---

### 4. INTERACTIVE CALENDAR (Availability)
**Purpose:** Select preferred class times

**Design:**
```
MON  TUE  WED  THU  FRI   SAT  SUN
[18] [18] [✓]  [18] [19]  [ ]   [ ]
           (selected button state)
```

**Specifications:**
```
Layout:        7-column grid (days of week)
Cell height:   48px
Cell width:    48px (responsive)
Typography:    Montserrat Bold, 14px
Gap:           12px

Day Header:    MON, TUE, WED... (Inter Bold, 11px, uppercase)
Time cell:     Shows time only (18:00 → "18")
```

**States:**

**Available (Unselected):**
```
Background:    White
Border:        1px solid #DDD
Color:         #666
```

**Available (Hover):**
```
Background:    #FFED00
Border:        1px solid #000
Color:         #000
Cursor:        pointer
Transform:     scale(1.08)
Shadow:        0 4px 12px rgba(255, 237, 0, 0.2)
Transition:    0.2s
```

**Selected:**
```
Background:    #000
Border:        2px solid #FFED00
Color:         #FFED00
Box-shadow:    0 4px 16px rgba(0, 0, 0, 0.3)
Checkmark:     Visible (12×12, white)
```

**Unavailable:**
```
Background:    #F5F5F5
Border:        1px dashed #CCC
Color:         #CCC
Cursor:        not-allowed
Opacity:       0.5
```

---

### 5. MATCH CARD (Course Recommendation)
**Purpose:** Display personalized course recommendation with confidence score

**Design:**
```
┌────────────────────────────────────┐
│ ████ Yellow top border             │
│                                    │
│ 🎯 A1 CONFIDENCE BUILDER           │
│                                    │
│ Mon & Wed • 18:00 • 6-week cohort  │
│                                    │
│ 98% Match         ◯◯◯◯◯ [98%]    │
│ Perfect fit for your goals         │
│                                    │
│ 👥 5/6 students enrolled           │
│ [+ 3 more avatars] [+2]            │
│                                    │
│ ✓ Matches professional goals       │
│ ✓ Fits your schedule perfectly     │
│                                    │
│ [Pick this one →] [See all]        │
└────────────────────────────────────┘
```

**Specifications:**
```
Dimensions:     Full width, responsive (max 600px desktop)
Border-top:     4px solid #FFED00
Border:         1px solid #000
Padding:        28px
Border-radius:  4px
Box-shadow:     0 12px 32px rgba(0, 0, 0, 0.1)

Typography hierarchy:
  - Course name:    Montserrat Bold, 32px, #000
  - Details:        Montserrat Regular, 16px, #333
  - Match label:    Inter Bold, 12px, uppercase, #666
  - Match %:        Montserrat Bold, 24px, #FFED00
  - Checkmarks:     Montserrat Regular, 14px
```

**Confidence Ring Component:**
```
Circle: 80px diameter, centered
Background ring:  #E0E0E0 (light gray)
Foreground ring:  #FFED00 (fills from 0 to %)
Duration:         2 seconds (animated on load)
Easing:           cubic-bezier(0.34, 1.56, 0.64, 1)
Text center:      "98%"
```

**Student Avatars:**
```
Size:            32×32 (circle)
Overlap:         8px (card effect)
Max visible:     4 avatars
Additional:      "+2" label if more students
Animation:       Fade in sequentially (stagger 0.1s)
Hover:           Tooltip shows full name
```

**Checkmark Features:**
```
Icon:            ✓ (green #4CAF50)
Size:            18×18
Position:        Left of text
Spacing:         12px gap
Animation:       Scale in from left (0.3s staggered)
```

**CTA Buttons:**
```
Primary: "Pick this one →"
  - Background:  #000
  - Color:       #FFED00
  - Height:      48px
  - Border:      2px solid #000
  - Shadow:      0 6px 16px rgba(0, 0, 0, 0.2)
  - Hover:       Scale 1.05, shadow grows

Secondary: "See all"
  - Background:  White
  - Color:       #000
  - Height:      48px
  - Border:      1px solid #000
  - Hover:       Background #FFED00
```

---

### 6. CONFETTI EFFECT
**Purpose:** Celebration animation on success

**Technical Specs:**
```
Particles:       30-50 confetti pieces
Shape:           Circle (8-12px diameter)
Colors:          #FFED00, #000, #FFF, #4CAF50, #2196F3
Duration:        3 seconds
Gravity:         Simulate downward motion
Velocity:        Random X (-2 to +2), Y (+1 to +3)
Start position:  Random across top 20% of screen
End position:    Bottom of screen (fade out)

Animation:
  - Fade in:     0.2s at start
  - Flight:      2.6s (gentle arc)
  - Fade out:    0.2s at end
  - Rotation:    360-720deg random per particle

Sound:           (Optional) Soft "ding" (0.5 second)
Respect:         Honor prefers-reduced-motion (static confetti only)
```

**Figma Component:**
- Create "Confetti_Single" particle (12px circle)
- Duplicate 40× with slight position/rotation offsets
- Group as "ConfettiEffect_Full"
- Add motion preset for Figma prototyping

---

### 7. HERO CARD (Results Page)
**Purpose:** Showcase matched course with urgency

**Design:**
```
┌─────────────────────────────┐
│ 🎯 YOUR PERSONALIZED PATH   │
│                             │
│ A1 CONFIDENCE BUILDER       │
│ Mon & Wed • 18:00           │
│ 6-week intensive cohort     │
│                             │
│ 🔥 Perfect match for you    │
│ ✨ Starts next Monday       │
│ 👥 Join 5 learners like you │
│                             │
│ [Enroll & Secure Spot →]    │
└─────────────────────────────┘
```

**Specifications:**
```
Dimensions:     100% width max 700px
Background:     Gradient (#FFED00 10% → #FFF 90%)
Border:         2px solid #000
Border-top:     6px solid #FFED00
Padding:        40px
Border-radius:  0 (sharp edges for premium feel)
Box-shadow:     0 12px 40px rgba(0, 0, 0, 0.15)

Typography:
  - Label:      Inter Bold, 11px, uppercase, opacity 70%
  - Title:      Montserrat Bold, 48px, -2px tracking
  - Details:    Montserrat Regular, 18px
  - Badges:     Montserrat Bold, 14px + emoji
```

**Animation:**
- Load: Fade in + slide up (0.6s)
- Emoji: Scale in sequentially (staggered 0.15s)
- CTA: Pulse effect (scale 1 → 1.02 → 1, repeat 2s)

---

## 🎯 IMPLEMENTATION PRIORITY

### Tier 1 (Essential):
- [ ] ProgressBar
- [ ] LevelCard
- [ ] TagButton
- [ ] MatchCard
- [ ] HeroCard

### Tier 2 (High Value):
- [ ] Calendar selector
- [ ] ConfettiEffect
- [ ] CounterAnimation

### Tier 3 (Polish):
- [ ] TrustBadge variations
- [ ] TimeToggle variants
- [ ] LearningPathTimeline

---

## 🔗 INTEGRATION NOTES

**React Components to Build:**
```tsx
// src/app/components/OnboardingComponents/
├── ProgressBar.tsx
├── LevelCard.tsx
├── TagButton.tsx
├── InteractiveCalendar.tsx
├── MatchCard.tsx
├── HeroCard.tsx
├── ConfettiEffect.tsx
└── TrustBadge.tsx
```

**Tailwind Classes Needed:**
- Custom gradient utilities
- Custom shadow definitions
- Motion/animation presets
- Responsive spacing scale

**Animation Library:**
- Framer Motion (recommended for complex animations)
- Or use pure CSS with Tailwind @apply

---

**Document Version:** 1.0 | **Last Updated:** January 13, 2026
