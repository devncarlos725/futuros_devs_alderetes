import { supabase } from '@/lib/supabase'

export const dynamic = 'force-dynamic'

type Inscripcion = {
  id: string
  nombre: string
  email: string
  telefono: string
  edad: string | null
  barrio: string | null
  nivel: string
  horario: string
  created_at: string
}

export default async function AdminPage() {
  const { data, error } = await supabase
    .from('inscripciones')
    .select('id, nombre, email, telefono, edad, barrio, nivel, horario, created_at')
    .order('created_at', { ascending: false })

  const inscriptos: Inscripcion[] = data ?? []

  return (
    <main style={pageStyle}>
      <section style={containerStyle}>
        <div style={counterCardStyle}>
          <p style={counterLabelStyle}>Reporte para intendencia</p>
          <h1 style={counterTitleStyle}>
            {inscriptos.length} personas quieren aprender a programar en Alderetes
          </h1>
          {error && (
            <p style={errorStyle}>
              Hubo un error al cargar datos desde Supabase. Verifica variables y permisos de la tabla.
            </p>
          )}
        </div>

        <div style={tableWrapStyle}>
          <table style={tableStyle}>
            <thead>
              <tr>
                <th style={thStyle}>Nombre</th>
                <th style={thStyle}>Email</th>
                <th style={thStyle}>Telefono</th>
                <th style={thStyle}>Barrio</th>
                <th style={thStyle}>Nivel</th>
                <th style={thStyle}>Horario</th>
                <th style={thStyle}>Fecha</th>
              </tr>
            </thead>
            <tbody>
              {inscriptos.length === 0 ? (
                <tr>
                  <td style={emptyStyle} colSpan={7}>
                    Aun no hay inscripciones registradas.
                  </td>
                </tr>
              ) : (
                inscriptos.map((item) => (
                  <tr key={item.id}>
                    <td style={tdStyle}>{item.nombre}</td>
                    <td style={tdStyle}>{item.email}</td>
                    <td style={tdStyle}>{item.telefono}</td>
                    <td style={tdStyle}>{item.barrio || '-'}</td>
                    <td style={tdStyle}>{normalizeNivel(item.nivel)}</td>
                    <td style={tdStyle}>{normalizeHorario(item.horario)}</td>
                    <td style={tdStyle}>{formatDate(item.created_at)}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </section>
    </main>
  )
}

function normalizeNivel(nivel: string) {
  if (nivel === 'ninguno') return 'Sin exp'
  if (nivel === 'basico') return 'Basico'
  if (nivel === 'intermedio') return 'Intermedio'
  return nivel
}

function normalizeHorario(horario: string) {
  if (horario === 'manana') return 'Manana'
  if (horario === 'tarde') return 'Tarde'
  if (horario === 'noche') return 'Noche'
  if (horario === 'cualquiera') return 'Cualquiera'
  return horario
}

function formatDate(isoDate: string) {
  const date = new Date(isoDate)
  return new Intl.DateTimeFormat('es-AR', {
    dateStyle: 'short',
    timeStyle: 'short',
  }).format(date)
}

const pageStyle: React.CSSProperties = {
  minHeight: '100vh',
  background: 'var(--bg)',
  padding: '40px 16px',
}

const containerStyle: React.CSSProperties = {
  maxWidth: 1120,
  margin: '0 auto',
}

const counterCardStyle: React.CSSProperties = {
  border: '1px solid var(--border)',
  borderRadius: 16,
  background: 'var(--card)',
  padding: 24,
  marginBottom: 20,
}

const counterLabelStyle: React.CSSProperties = {
  color: 'var(--orange)',
  fontFamily: "'Space Mono'",
  fontSize: 12,
  letterSpacing: '.08em',
  marginBottom: 8,
}

const counterTitleStyle: React.CSSProperties = {
  color: '#fff',
  fontFamily: "'Syne'",
  fontWeight: 800,
  fontSize: 'clamp(1.6rem,4vw,2.3rem)',
  lineHeight: 1.2,
}

const errorStyle: React.CSSProperties = {
  marginTop: 10,
  color: '#f87171',
  fontSize: 13,
}

const tableWrapStyle: React.CSSProperties = {
  border: '1px solid var(--border)',
  borderRadius: 16,
  overflowX: 'auto',
  background: 'var(--card)',
}

const tableStyle: React.CSSProperties = {
  width: '100%',
  borderCollapse: 'collapse',
  minWidth: 860,
}

const thStyle: React.CSSProperties = {
  textAlign: 'left',
  padding: '14px 16px',
  fontFamily: "'Space Mono'",
  fontSize: 12,
  letterSpacing: '.06em',
  color: '#9ca3af',
  borderBottom: '1px solid var(--border)',
}

const tdStyle: React.CSSProperties = {
  padding: '14px 16px',
  color: '#e5e7eb',
  fontSize: 14,
  borderBottom: '1px solid var(--border)',
}

const emptyStyle: React.CSSProperties = {
  padding: '24px 16px',
  textAlign: 'center',
  color: '#6b7280',
  fontSize: 14,
}
