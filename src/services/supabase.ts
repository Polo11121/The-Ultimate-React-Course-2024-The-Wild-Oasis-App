import { createClient } from "@supabase/supabase-js";
import { Database, env } from "@/utils";

export const supabase = createClient<Database>(
  env.VITE_SUPABASE_URL,
  env.VITE_SUPABASE_KEY
);
