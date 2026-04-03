import { createClient } from "@supabase/supabase-js";

// Obtenemos las variables de entorno
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// Verificación de seguridad para que el Build de Vercel no falle
// Si las variables no existen (como pasa a veces en el build),
// le pasamos un texto cualquiera para que no tire error de "url is required"
export const supabase = createClient(
  supabaseUrl || "https://placeholder.supabase.co",
  supabaseAnonKey || "placeholder",
);
