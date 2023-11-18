import { cleanEnv, str } from "envalid";

export const env = cleanEnv(import.meta.env, {
  SUPABASE_KEY: str(),
  SUPABASE_URL: str(),
});
