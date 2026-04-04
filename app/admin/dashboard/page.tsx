import { getSupabaseAdmin } from '@/lib/supabase'
import {
  normalizeHorarioTable,
  normalizeNivelTable,
  rowsToChartAggregates,
} from '@/lib/admin-metrics'
import type { InscripcionChartRow, InscripcionRecord } from '@/types/inscripcion'
import { DashboardCharts } from './DashboardCharts'
import { LogoutButton } from '@/components/admin/LogoutButton'

export const dynamic = 'force-dynamic'

function formatDate(isoDate: string): string {
  const date = new Date(isoDate)
  return new Intl.DateTimeFormat('es-AR', {
    dateStyle: 'short',
    timeStyle: 'short',
  }).format(date)
}

export default async function AdminDashboardPage() {
  const supabase = getSupabaseAdmin()

  const { data, error } = await supabase
    .from('inscripciones')
    .select(
      'id, nombre, email, telefono, edad, barrio, nivel, horario, created_at',
    )
    .order('created_at', { ascending: false })

  const inscriptos: InscripcionRecord[] = data ?? []

  const chartRows: InscripcionChartRow[] = inscriptos.map((r) => ({
    barrio: r.barrio,
    nivel: r.nivel,
    horario: r.horario,
  }))
  const { barrios, niveles, horarios } = rowsToChartAggregates(chartRows)

  return (
    <main className="min-h-screen bg-[var(--bg)] px-4 py-10">
      <div className="mx-auto max-w-6xl space-y-6">
        <header className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <p className="mb-2 font-['Space_Mono'] text-xs tracking-wider text-[var(--orange)]">
              Panel administrativo
            </p>
            <h1 className="font-['Syne'] text-2xl font-extrabold text-white sm:text-3xl">
              {inscriptos.length} personas quieren aprender a programar en
              Alderetes
            </h1>
            {error ? (
              <p className="mt-2 text-sm text-red-400">
                Error al leer Supabase: {error.message}. Revisá
                SUPABASE_SERVICE_ROLE_KEY o políticas RLS.
              </p>
            ) : null}
          </div>
          <LogoutButton />
        </header>

        <div className="overflow-x-auto rounded-2xl border border-[var(--border)] bg-[var(--card)]">
          <table className="w-full min-w-[860px] border-collapse">
            <thead>
              <tr>
                {[
                  'Nombre',
                  'Email',
                  'Teléfono',
                  'Barrio',
                  'Nivel',
                  'Horario',
                  'Fecha',
                ].map((h) => (
                  <th
                    key={h}
                    className="border-b border-[var(--border)] px-4 py-3.5 text-left font-['Space_Mono'] text-xs tracking-wide text-gray-400"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {inscriptos.length === 0 ? (
                <tr>
                  <td
                    colSpan={7}
                    className="px-4 py-6 text-center text-sm text-gray-500"
                  >
                    Aún no hay inscripciones registradas.
                  </td>
                </tr>
              ) : (
                inscriptos.map((item) => (
                  <tr key={item.id}>
                    <td className="border-b border-[var(--border)] px-4 py-3.5 text-sm text-gray-200">
                      {item.nombre}
                    </td>
                    <td className="border-b border-[var(--border)] px-4 py-3.5 text-sm text-gray-200">
                      {item.email}
                    </td>
                    <td className="border-b border-[var(--border)] px-4 py-3.5 text-sm text-gray-200">
                      {item.telefono}
                    </td>
                    <td className="border-b border-[var(--border)] px-4 py-3.5 text-sm text-gray-200">
                      {item.barrio ?? '—'}
                    </td>
                    <td className="border-b border-[var(--border)] px-4 py-3.5 text-sm text-gray-200">
                      {normalizeNivelTable(item.nivel)}
                    </td>
                    <td className="border-b border-[var(--border)] px-4 py-3.5 text-sm text-gray-200">
                      {normalizeHorarioTable(item.horario)}
                    </td>
                    <td className="border-b border-[var(--border)] px-4 py-3.5 text-sm text-gray-200">
                      {formatDate(item.created_at)}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        <DashboardCharts
          total={inscriptos.length}
          barrios={barrios}
          niveles={niveles}
          horarios={horarios}
        />
      </div>
    </main>
  )
}
