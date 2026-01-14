/**
 * DESIGN SYSTEM TOKENS
 * 
 * This is the single source of truth for all design decisions.
 * Components reference these tokens only - never hardcoded values.
 * 
 * Rules:
 * - Semantic naming (what it represents, not how it looks)
 * - No magic numbers
 * - All values explicit and justified
 */

// ============================================
// BRAND IDENTITY
// ============================================

export const BRAND = {
  name: "Jazyk a Integrace",
  shortName: "JaI",
} as const;

// ============================================
// COLOR SYSTEM
// ============================================

export const COLORS = {
  // Neutrals (grayscale)
  neutral: {
    0: "#ffffff",
    50: "#f9f9f9",
    100: "#f3f3f5",
    200: "#ececf0",
    300: "#e9ebef",
    400: "#cbced4",
    500: "#a8adb7",
    600: "#717182",
    700: "#6a7282",
    800: "#030213",
    900: "#000000",
  },

  // Brand primary (dark purple-black)
  primary: {
    base: "#030213",
    light: "#1a1a2e",
    dark: "#000000",
    foreground: "#ffffff",
  },

  // Brand secondary (light lavender)
  secondary: {
    base: "#f5f5ff",
    light: "#fafafe",
    dark: "#e8e8f5",
    foreground: "#030213",
  },

  // Accent (bright yellow - signature brand color)
  accent: {
    base: "#FFED00",
    light: "#ffff33",
    dark: "#e6d600",
    foreground: "#030213",
  },

  // Semantic colors
  feedback: {
    success: "#4CAF50",
    success_light: "#81C784",
    warning: "#FFC107",
    warning_light: "#FFD54F",
    error: "#d4183d",
    error_light: "#FF6B6B",
    error_lighter: "#FF8A80",
    info: "#2196F3",
    info_light: "#64B5F6",
  },

  // Gradients (frequently used combinations)
  gradients: {
    // Level progression gradients
    levelA1: {
      from: "#4CAF50",
      to: "#81C784",
    },
    levelA2: {
      from: "#2196F3",
      to: "#64B5F6",
    },
    levelB1: {
      from: "#9C27B0",
      to: "#BA68C8",
    },
    levelB2: {
      from: "#FF6B6B",
      to: "#FF8A80",
    },
    levelB2Plus: {
      from: "#FFC107",
      to: "#FFD54F",
    },

    // Brand highlight
    accent_to_purple: {
      from: "#C608D6",
      to: "#9810FA",
    },
  },
} as const;

// ============================================
// TYPOGRAPHY
// ============================================

export const TYPOGRAPHY = {
  // Font families
  families: {
    display: '"Montserrat", sans-serif',
    body: '"Inter", sans-serif',
  },

  // Font weights
  weights: {
    light: 300,
    regular: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
    extrabold: 800,
  },

  // Scale (heading sizes)
  scales: {
    // Hero / Page titles
    h0: {
      size: "110px",
      sizeMd: "88px",
      sizeSm: "64px",
      weight: "bold" as const,
      lineHeight: 0.85,
      letterSpacing: "-3.6px",
      family: "display" as const,
    },

    // Section titles
    h1: {
      size: "56px",
      sizeMd: "48px",
      sizeSm: "40px",
      weight: "bold" as const,
      lineHeight: 1.1,
      letterSpacing: "-1.5px",
      family: "display" as const,
    },

    h2: {
      size: "40px",
      sizeMd: "36px",
      sizeSm: "32px",
      weight: "bold" as const,
      lineHeight: 1.2,
      letterSpacing: "-0.8px",
      family: "display" as const,
    },

    h3: {
      size: "28px",
      sizeMd: "24px",
      sizeSm: "20px",
      weight: "bold" as const,
      lineHeight: 1.3,
      letterSpacing: "-0.4px",
      family: "display" as const,
    },

    h4: {
      size: "20px",
      sizeMd: "18px",
      sizeSm: "16px",
      weight: "semibold" as const,
      lineHeight: 1.4,
      letterSpacing: "0px",
      family: "body" as const,
    },

    // Body text
    body_lg: {
      size: "18px",
      weight: "regular" as const,
      lineHeight: 1.6,
      letterSpacing: "0px",
      family: "body" as const,
    },

    body_base: {
      size: "16px",
      weight: "regular" as const,
      lineHeight: 1.5,
      letterSpacing: "0px",
      family: "body" as const,
    },

    body_sm: {
      size: "14px",
      weight: "regular" as const,
      lineHeight: 1.5,
      letterSpacing: "0px",
      family: "body" as const,
    },

    // UI text (labels, buttons, metadata)
    ui_md: {
      size: "14px",
      weight: "bold" as const,
      lineHeight: 1.5,
      letterSpacing: "1px",
      family: "body" as const,
      textTransform: "uppercase" as const,
    },

    ui_sm: {
      size: "12px",
      weight: "bold" as const,
      lineHeight: 1.5,
      letterSpacing: "0.6px",
      family: "body" as const,
      textTransform: "uppercase" as const,
    },

    ui_xs: {
      size: "10px",
      weight: "bold" as const,
      lineHeight: 1.4,
      letterSpacing: "0.5px",
      family: "body" as const,
      textTransform: "uppercase" as const,
    },

    // Metadata / caption
    caption: {
      size: "12px",
      weight: "regular" as const,
      lineHeight: 1.4,
      letterSpacing: "0px",
      family: "body" as const,
    },
  },
} as const;

// ============================================
// SPACING SCALE
// ============================================

export const SPACING = {
  // Base unit = 4px (for calculations)
  xs: "4px",
  sm: "8px",
  md: "12px",
  lg: "16px",
  xl: "24px",
  xxl: "32px",
  xxxl: "48px",
  xxxxl: "64px",

  // Common combinations
  compact: "8px",
  comfortable: "16px",
  spacious: "24px",
  hero: "64px",
} as const;

// ============================================
// BORDER RADIUS
// ============================================

export const BORDER_RADIUS = {
  none: "0px",
  sm: "2px",
  base: "4px",
  md: "6px",
  lg: "8px",
  xl: "10px",
  xxl: "16px",
  round: "9999px",

  // Semantic aliases
  button: "4px",
  card: "4px",
  input: "4px",
  modal: "8px",
} as const;

// ============================================
// SHADOWS & ELEVATION
// ============================================

export const ELEVATION = {
  // Flat (no shadow)
  none: "none",

  // Subtle (small, soft)
  sm: "0 1px 2px rgba(0, 0, 0, 0.05)",
  base: "0 2px 4px rgba(0, 0, 0, 0.1)",

  // Medium
  md: "0 4px 8px rgba(0, 0, 0, 0.12)",

  // Large / Elevated
  lg: "0 8px 16px rgba(0, 0, 0, 0.15)",
  xl: "0 12px 24px rgba(0, 0, 0, 0.15)",

  // Dense / Hard shadow (signature style)
  dense_sm: "4px 4px 0px rgba(0, 0, 0, 0.5)",
  dense_md: "6px 6px 0px rgba(0, 0, 0, 0.5)",
  dense_lg: "8px 8px 0px rgba(0, 0, 0, 1)",
  dense_xl: "12px 12px 0px rgba(0, 0, 0, 1)",

  // For hover/focus states
  glow_accent: "6px 6px 0px rgba(255, 237, 0, 0.3)",
} as const;

// ============================================
// RESPONSIVE BREAKPOINTS
// ============================================

export const BREAKPOINTS = {
  mobile: 480,
  tablet: 768,
  desktop: 1024,
  wide: 1280,
  ultrawide: 1536,
} as const;

// Tailwind-compatible breakpoint names
export const BREAKPOINT_NAMES = {
  sm: "480px",
  md: "768px",
  lg: "1024px",
  xl: "1280px",
  "2xl": "1536px",
} as const;

// ============================================
// Z-INDEX LAYERS
// ============================================

export const Z_INDEX = {
  base: 0,
  dropdown: 100,
  sticky: 200,
  fixed: 300,
  modal_backdrop: 400,
  modal: 500,
  tooltip: 600,
  notification: 700,
} as const;

// ============================================
// LAYOUT
// ============================================

export const LAYOUT = {
  // Container widths
  containerMax: "1329px",
  containerPaddingMobile: "24px",
  containerPaddingTablet: "48px",
  containerPaddingDesktop: "48px",

  // Section spacing
  sectionPadding: {
    sm: "80px 24px",
    md: "128px 48px",
  },

  headerHeight: "80px",
  headerHeightMobile: "80px",
} as const;

// ============================================
// ANIMATION / MOTION
// ============================================

export const MOTION = {
  // Durations
  duration: {
    instant: 0,
    fast: "150ms",
    base: "200ms",
    slow: "300ms",
    slower: "500ms",
  },

  // Easing curves
  easing: {
    linear: "linear",
    ease_in: "ease-in",
    ease_out: "ease-out",
    ease_in_out: "ease-in-out",
    // Custom curve (matches figma design)
    smooth: "cubic-bezier(0.22, 1, 0.36, 1)",
  },
} as const;

// ============================================
// EXPORT HELPERS
// ============================================

/**
 * Get typography styles as object for consistent application
 */
export function getTypographyStyles(
  scale: keyof typeof TYPOGRAPHY.scales
) {
  return TYPOGRAPHY.scales[scale];
}

/**
 * Get color with fallback
 */
export function getColor(
  category: string,
  shade: string,
  fallback: string = COLORS.neutral[600]
) {
  return (COLORS as Record<string, any>)?.[category]?.[shade] || fallback;
}
