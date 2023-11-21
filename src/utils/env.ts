import { cleanEnv, str } from "envalid";

export const env = cleanEnv(import.meta.env, {
  VITE_SUPABASE_KEY: str(),
  VITE_SUPABASE_URL: str(),
});
