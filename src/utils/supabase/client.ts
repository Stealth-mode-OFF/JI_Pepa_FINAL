import { createClient } from "@supabase/supabase-js";
import { projectId, publicAnonKey } from "../../../utils/supabase/info";

const envSupabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const envSupabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
const supabaseUrl =
  envSupabaseUrl && envSupabaseUrl.trim()
    ? envSupabaseUrl
    : `https://${projectId}.supabase.co`;
const supabaseAnonKey =
  envSupabaseAnonKey && envSupabaseAnonKey.trim()
    ? envSupabaseAnonKey
    : publicAnonKey;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
