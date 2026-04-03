import { supabase } from '@/lib/supabase'
import StatsCharts from './StatsCharts'

export const dynamic = 'force-dynamic'

type InscripcionRow = {
  barrio: string | null
  nivel: string | null
  horario: string | null
}

type ChartItem = {
  name: string
  value: number
}

export default async function StatsPage() {
  const { data, error } = await supabase
    .from('inscripciones')
    .select('barrio, nivel, horario')

  const rows: InscripcionRow[] = data ?? []

  const barrios = mapToChartData(
    rows.map((item) => item.barrio?.trim() || 'Sin barrio')
  )

  const niveles = mapToChartData(
    rows.map((item) => normalizeNivel(item.nivel))
  )

  const horarios = mapToChartData(
    rows.map((item) => normalizeHorario(item.horario))
  )

  return (
    <main style={pageStyle}>
      <section style={containerStyle}>
        <div style={headerStyle}>
          <p style={tagStyle}>Dashboard del programa</p>
          <h1 style={titleStyle}>Estadisticas de inscripcion</h1>
          <p style={subtitleStyle}>Datos en tiempo real para mostrar avance del proyecto.</p>
          {error && (
            <p style={errorStyle}>
              No se pudieron cargar todos los datos desde Supabase. Revisa variables de entorno y permisos.
            </p>
          )}
        </div>

        <StatsCharts
          total={rows.length}
          barrios={barrios}
          niveles={niveles}
          horarios={horarios}
        />
      </section>
    </main>
  )
}

function mapToChartData(values: string[]): ChartItem[] {
  const counter = new Map<string, number>()
  values.forEach((value) => {
    counter.set(value, (counter.get(value) ?? 0) + 1)
  })

  return Array.from(counter.entries())
    .map(([name, value]) => ({ name, value }))
    .sort((a, b) => b.value - a.value)
}

function normalizeNivel(value: string | null) {
  if (value === 'ninguno') return 'Sin exp'
  if (value === 'basico') return 'Basico'
  if (value === 'intermedio') return 'Intermedio'
  return value || 'Sin definir'
}

function normalizeHorario(value: string | null) {
  if (value === 'manana') return 'Manana'
  if (value === 'tarde') return 'Tarde'
  if (value === 'noche') return 'Noche'
  if (value === 'cualquiera') return 'Cualquiera'
  return value || 'Sin definir'
}

const pageStyle: React.CSSProperties = {
  minHeight: '100vh',
  background: 'var(--bg)',
  padding: '40px 16px',
}

const containerStyle: React.CSSProperties = {
  maxWidth: 1100,
  margin: '0 auto',
}

const headerStyle: React.CSSProperties = {
  marginBottom: 20,
}

const tagStyle: React.CSSProperties = {
  display: 'inline-block',
  marginBottom: 8,
  color: 'var(--orange)',
  fontFamily: "'Space Mono'",
  fontSize: 12,
  letterSpacing: '.08em',
}

const titleStyle: React.CSSProperties = {
  color: '#fff',
  fontFamily: "'Syne'",
  fontWeight: 800,
  fontSize: 'clamp(1.8rem,4vw,2.8rem)',
}

const subtitleStyle: React.CSSProperties = {
  color: '#9ca3af',
  fontSize: 14,
  marginTop: 8,
}

const errorStyle: React.CSSProperties = {
  marginTop: 10,
  color: '#f87171',
  fontSize: 13,
}
