import type { ChartDatum, InscripcionChartRow } from '@/types/inscripcion'

export function mapToChartData(values: string[]): ChartDatum[] {
  const counter = new Map<string, number>()
  values.forEach((value) => {
    counter.set(value, (counter.get(value) ?? 0) + 1)
  })

  return Array.from(counter.entries())
    .map(([name, value]) => ({ name, value }))
    .sort((a, b) => b.value - a.value)
}

export function normalizeNivel(value: string | null): string {
  if (value === 'ninguno') return 'Sin exp'
  if (value === 'basico') return 'Básico'
  if (value === 'intermedio') return 'Intermedio'
  return value ?? 'Sin definir'
}

export function normalizeHorario(value: string | null): string {
  if (value === 'manana') return 'Mañana'
  if (value === 'tarde') return 'Tarde'
  if (value === 'noche') return 'Noche'
  if (value === 'cualquiera') return 'Cualquiera'
  return value ?? 'Sin definir'
}

export function normalizeNivelTable(nivel: string): string {
  if (nivel === 'ninguno') return 'Sin exp'
  if (nivel === 'basico') return 'Básico'
  if (nivel === 'intermedio') return 'Intermedio'
  return nivel
}

export function normalizeHorarioTable(horario: string): string {
  if (horario === 'manana') return 'Mañana'
  if (horario === 'tarde') return 'Tarde'
  if (horario === 'noche') return 'Noche'
  if (horario === 'cualquiera') return 'Cualquiera'
  return horario
}

export function rowsToChartAggregates(rows: InscripcionChartRow[]) {
  return {
    barrios: mapToChartData(
      rows.map((item) => item.barrio?.trim() || 'Sin barrio'),
    ),
    niveles: mapToChartData(rows.map((item) => normalizeNivel(item.nivel))),
    horarios: mapToChartData(rows.map((item) => normalizeHorario(item.horario))),
  }
}
