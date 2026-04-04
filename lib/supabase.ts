import { createClient, type SupabaseClient } from '@supabase/supabase-js'

/**
 * URLs y keys públicas solo para el cliente anon en servidor (insert vía API)
 * o lecturas que RLS permita. Placeholders evitan crash de build si faltan envs.
 */
function getPublicConfig(): { url: string; anonKey: string } {
  const url =
    process.env.NEXT_PUBLIC_SUPABASE_URL ?? 'https://placeholder.supabase.co'
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? 'placeholder'
  return { url, anonKey }
}

/** Cliente estándar (anon). Usar en API routes de inscripción y código que no requiera bypass RLS. */
export function getSupabase(): SupabaseClient {
  const { url, anonKey } = getPublicConfig()
  return createClient(url, anonKey)
}

/**
 * Cliente con service role si está definido (solo servidor, nunca NEXT_PUBLIC).
 * Mejor para /admin/dashboard: no depende de políticas RLS permisivas hacia anon.
 */
export function getSupabaseAdmin(): SupabaseClient {
  const { url } = getPublicConfig()
  const serviceRole = process.env.SUPABASE_SERVICE_ROLE_KEY
  if (serviceRole) {
    return createClient(url, serviceRole)
  }
  return getSupabase()
}
