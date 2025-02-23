import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = "https://your-supabase-url.supabase.co"; // Replace with your Supabase URL
const SUPABASE_KEY = "your-supabase-anon-key"; // Replace with your Supabase anon key

export const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);
