import { redirect } from 'next/navigation'

/** Las estadísticas están unificadas en el panel /admin/dashboard. */
export default function StatsLegacyRedirect() {
  redirect('/admin/login?next=/admin/dashboard')
}
