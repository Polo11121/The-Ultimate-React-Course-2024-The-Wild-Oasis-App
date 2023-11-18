import { createClient } from "@supabase/supabase-js";
import { env } from "@/utils";

export const supabase = createClient(env.SUPABASE_KEY, env.SUPABASE_URL);
