import { createHmac } from 'crypto'
import { ADMIN_SESSION_SALT } from '@/lib/admin-session-constants'

export function deriveAdminSessionToken(secret: string): string {
  return createHmac('sha256', secret).update(ADMIN_SESSION_SALT).digest('hex')
}
