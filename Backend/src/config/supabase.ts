import { createClient } from "@supabase/supabase-js";
import { env } from "./environment.js";



export const superbase = createClient(
    env.VITE_SUPABASE_URL!, env.VITE_SUPABASE_PUBLISHABLE_KEY!
);

