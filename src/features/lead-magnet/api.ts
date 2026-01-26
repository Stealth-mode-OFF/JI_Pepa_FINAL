import { supabase } from "@/utils/supabase/client";

export type LeadMagnetSignup = {
  email: string;
  source: string;
};

export const leadMagnetApi = {
  createSignup: async ({ email, source }: LeadMagnetSignup) =>
    supabase.from("lead_magnet_signups").insert({
      email,
      source,
    }),
};
