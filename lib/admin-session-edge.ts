import { ADMIN_SESSION_SALT } from '@/lib/admin-session-constants'

/** HMAC SHA-256 en Edge (Web Crypto), equivalente a `deriveAdminSessionToken` en Node. */
export async function deriveAdminSessionTokenEdge(
  secret: string,
): Promise<string> {
  const enc = new TextEncoder()
  const key = await crypto.subtle.importKey(
    'raw',
    enc.encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign'],
  )
  const sig = await crypto.subtle.sign(
    'HMAC',
    key,
    enc.encode(ADMIN_SESSION_SALT),
  )
  return Array.from(new Uint8Array(sig))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('')
}
