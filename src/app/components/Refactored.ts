/**
 * FORWARD COMPATIBILITY EXPORTS
 * 
 * This file re-exports refactored components from their new locations.
 * Old imports continue to work, but gradually migrate to new paths.
 * 
 * OLD: import { Header } from "./pages/LandingPage"
 * NEW: import { SiteHeader } from "@/features/header"
 * 
 * This file allows both to work during the migration period.
 */

// Header exports
export { SiteHeader as Header } from "@/features/header/SiteHeader";

// Hero exports
export { HeroSection as Hero } from "@/features/hero/HeroSection";

// Layout exports
export { PageContainer as Container, PageSection as Section, SectionTitle } from "@/shared/layouts/Page";
