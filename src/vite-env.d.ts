/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_SITE_URL: string
  readonly VITE_LEAD_FORM_ENDPOINT: string
  readonly VITE_SUPABASE_URL: string
  readonly VITE_SUPABASE_ANON_KEY: string
  readonly VITE_STRIPE_PUBLISHABLE_KEY: string
  readonly VITE_STRIPE_CHECKOUT_ENDPOINT: string
  readonly VITE_STRIPE_PRICE_ID: string
  readonly VITE_DEFAULT_COHORT_ID: string
  readonly VITE_POSTHOG_KEY: string
  readonly VITE_POSTHOG_HOST: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
