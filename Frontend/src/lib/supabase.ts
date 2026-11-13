import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";

export const superbase = createClient(
    import.meta.env.VITE_SUPABASE_URL, import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY
);

