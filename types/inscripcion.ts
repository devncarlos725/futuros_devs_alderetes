/** Fila tal como viene de Supabase (lectura admin). */
export interface InscripcionRecord {
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

/** Payload que envía el formulario de inscripción (API). */
export interface InscripcionFormPayload {
  nombre: string
  email: string
  telefono: string
  edad: string
  barrio: string
  nivel: string
  horario: string
}

/** Respuesta JSON de POST /api/inscripcion */
export interface InscripcionApiSuccess {
  success: true
  data: unknown
  warning?: string
  emailSent?: boolean
}

export interface InscripcionApiError {
  error: string
}

export type InscripcionApiResponse = InscripcionApiSuccess | InscripcionApiError

/** Fila mínima para agregados de gráficos */
export interface InscripcionChartRow {
  barrio: string | null
  nivel: string | null
  horario: string | null
}

export interface ChartDatum {
  name: string
  value: number
}
