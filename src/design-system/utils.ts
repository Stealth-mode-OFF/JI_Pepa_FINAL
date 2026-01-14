/**
 * DESIGN SYSTEM UTILITIES
 * 
 * Helper functions for applying design tokens consistently
 */

import { COLORS, SPACING, TYPOGRAPHY, BORDER_RADIUS, ELEVATION } from "./tokens";

// ============================================
// TAILWIND CLASS HELPERS
// ============================================

/**
 * Safely merge Tailwind classes without conflicts
 * Use for conditional styling
 */
export function classNames(...classes: (string | undefined | null | false)[]) {
  return classes.filter(Boolean).join(" ");
}

// ============================================
// COLOR UTILITIES
// ============================================

/**
 * Get brand color with semantic name
 */
export const brandColors = {
  primary: COLORS.primary.base,
  primaryForeground: COLORS.primary.foreground,
  accent: COLORS.accent.base,
  accentForeground: COLORS.accent.foreground,
  neutral: COLORS.neutral,
  feedback: COLORS.feedback,
} as const;

// ============================================
// TYPOGRAPHY UTILITIES
// ============================================

/**
 * Get inline styles for typography (useful for dynamic scenarios)
 */
export function getTypographyStyles(scale: keyof typeof TYPOGRAPHY.scales) {
  const s = TYPOGRAPHY.scales[scale];
  return {
    fontSize: s.size,
    fontWeight: TYPOGRAPHY.weights[s.weight],
    lineHeight: s.lineHeight,
    letterSpacing: s.letterSpacing,
    fontFamily: TYPOGRAPHY.families[s.family],
  };
}

/**
 * Tailwind classes for typography
 * Prefer using Tailwind classes in components, but this helps with consistency
 */
export const typographyClasses = {
  h0: "font-['Montserrat'] font-bold text-6xl md:text-7xl lg:text-8xl xl:text-[110px] leading-[0.85] tracking-[-3.6px]",
  h1: "font-['Montserrat'] font-bold text-[56px] md:text-[48px] leading-[1.1] tracking-[-1.5px]",
  h2: "font-['Montserrat'] font-bold text-[40px] md:text-[36px] leading-[1.2] tracking-[-0.8px]",
  h3: "font-['Montserrat'] font-bold text-[28px] md:text-[24px] leading-[1.3] tracking-[-0.4px]",
  body_lg: "font-['Inter'] text-[18px] leading-[28px]",
  body: "font-['Inter'] text-[16px] leading-[24px]",
  body_sm: "font-['Inter'] text-[14px] leading-[21px]",
  ui_md: "font-['Inter'] font-bold text-[14px] leading-[21px] tracking-[0.5px] uppercase",
  ui_sm: "font-['Inter'] font-bold text-[12px] leading-[18px] tracking-[1.2px] uppercase",
  caption: "font-['Inter'] text-[12px] leading-[18px]",
} as const;

// ============================================
// SPACING UTILITIES
// ============================================

/**
 * Get spacing value
 */
export function getSpacing(
  size: keyof typeof SPACING
): (typeof SPACING)[keyof typeof SPACING] {
  return SPACING[size];
}

// ============================================
// SHADOW UTILITIES
// ============================================

/**
 * Get elevation shadow value
 */
export function getElevation(key: keyof typeof ELEVATION) {
  return ELEVATION[key];
}

// Tailwind-compatible shadow classes
export const shadowClasses = {
  dense_sm: "shadow-[4px_4px_0px_rgba(0,0,0,0.5)]",
  dense_md: "shadow-[6px_6px_0px_rgba(0,0,0,0.5)]",
  dense_lg: "shadow-[8px_8px_0px_rgba(0,0,0,1)]",
  dense_xl: "shadow-[12px_12px_0px_rgba(0,0,0,1)]",
  glow_accent: "shadow-[6px_6px_0px_rgba(255,237,0,0.3)]",
} as const;

// ============================================
// COMPONENT STYLE PRESETS
// ============================================

/**
 * Preset styles for common component patterns
 * Reduces duplication and ensures consistency
 */
export const componentPresets = {
  // Button styles
  button_base: "px-8 py-3 rounded-[4px] font-['Inter'] font-bold text-[14px] uppercase tracking-[1.25px] inline-flex items-center justify-center focus:outline-none transition-all duration-200",

  button_primary:
    "bg-[#030213] text-white hover:bg-black focus:ring-2 focus:ring-offset-2 focus:ring-[#030213]",

  button_accent:
    "bg-[#FFED00] text-[#030213] hover:bg-[#e6d600] focus:ring-2 focus:ring-offset-2 focus:ring-[#030213] font-bold",

  button_secondary:
    "border-2 border-[#030213] bg-white text-[#030213] hover:bg-[#f3f3f5] focus:ring-2 focus:ring-offset-2 focus:ring-[#030213]",

  // Dense shadow buttons (signature style)
  button_accent_dense:
    "shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] focus:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]",

  // Card styles
  card_base: "rounded-[4px] border border-[#e0e0e0] p-6 bg-white",
  card_elevated: "rounded-[4px] border border-[#e0e0e0] p-6 bg-white shadow-[0_2px_8px_rgba(0,0,0,0.1)]",
  card_dense: "rounded-[4px] border-2 border-black p-6 bg-white shadow-[8px_8px_0px_rgba(0,0,0,1)]",

  // Input styles
  input_base: "px-4 py-3 rounded-[4px] border border-[#d0d0d8] bg-[#f3f3f5] focus:border-[#030213] focus:ring-2 focus:ring-[#030213]/20 focus:outline-none",

  // Container/Section
  container: "max-w-[1329px] mx-auto px-6 md:px-12 w-full",
  section_padding: "py-20 md:py-32 scroll-mt-24",
} as const;

// ============================================
// RESPONSIVE UTILITIES
// ============================================

/**
 * Common responsive patterns
 */
export const responsivePatterns = {
  gridResponsive: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6",
  flexResponsive: "flex flex-col md:flex-row items-start md:items-center gap-6",
  paddingResponsive: "px-6 md:px-12 py-8 md:py-16",
} as const;
