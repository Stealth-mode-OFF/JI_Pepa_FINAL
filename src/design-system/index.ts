/**
 * DESIGN SYSTEM
 * 
 * Centralized source of truth for all design decisions.
 * Import from this file to access all design tokens and utilities.
 */

// Re-export all tokens
export * from "./tokens";
export * from "./utils";

// Convenient namespace imports
import * as tokens from "./tokens";
import * as utils from "./utils";

export const designSystem = {
  tokens,
  utils,
};
