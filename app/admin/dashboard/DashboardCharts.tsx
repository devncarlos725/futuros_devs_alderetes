'use client'

import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import type { ChartDatum } from '@/types/inscripcion'

type DashboardChartsProps = {
  total: number
  barrios: ChartDatum[]
  niveles: ChartDatum[]
  horarios: ChartDatum[]
}

const chartColors = ['#f97316', '#06b6d4', '#fbbf24', '#fb923c', '#22d3ee']

export function DashboardCharts({
  total,
  barrios,
  niveles,
  horarios,
}: DashboardChartsProps) {
  return (
    <section className="grid gap-4">
      <article className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-6">
        <p className="mb-1.5 font-['Space_Mono'] text-xs tracking-wider text-[var(--cyan)]">
          Panorama general
        </p>
        <h2 className="font-['Syne'] text-3xl font-extrabold text-white sm:text-4xl md:text-5xl">
          {total} futuros devs
        </h2>
      </article>

      <article className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-5">
        <h3 className="mb-3.5 font-['Syne'] text-xl font-bold text-white">
          Inscriptos por barrio
        </h3>
        <div className="h-80 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={barrios}>
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="rgba(148,163,184,.15)"
              />
              <XAxis dataKey="name" stroke="#9ca3af" tick={{ fontSize: 12 }} />
              <YAxis
                stroke="#9ca3af"
                allowDecimals={false}
                tick={{ fontSize: 12 }}
              />
              <Tooltip
                contentStyle={{
                  border: '1px solid var(--border)',
                  background: '#0f172a',
                  color: '#fff',
                  borderRadius: 8,
                }}
              />
              <Bar dataKey="value" radius={[8, 8, 0, 0]}>
                {barrios.map((entry, index) => (
                  <Cell
                    key={entry.name}
                    fill={chartColors[index % chartColors.length]}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </article>

      <article className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-5">
        <h3 className="mb-3.5 font-['Syne'] text-xl font-bold text-white">
          Distribución por nivel
        </h3>
        <div className="h-80 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Tooltip
                contentStyle={{
                  border: '1px solid var(--border)',
                  background: '#0f172a',
                  color: '#fff',
                  borderRadius: 8,
                }}
              />
              <Pie
                data={niveles}
                dataKey="value"
                nameKey="name"
                outerRadius={110}
                label
              >
                {niveles.map((entry, index) => (
                  <Cell
                    key={entry.name}
                    fill={chartColors[index % chartColors.length]}
                  />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>
      </article>

      <article className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-5">
        <h3 className="mb-3.5 font-['Syne'] text-xl font-bold text-white">
          Distribución por horario preferido
        </h3>
        <div className="h-80 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={horarios}>
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="rgba(148,163,184,.15)"
              />
              <XAxis dataKey="name" stroke="#9ca3af" tick={{ fontSize: 12 }} />
              <YAxis
                stroke="#9ca3af"
                allowDecimals={false}
                tick={{ fontSize: 12 }}
              />
              <Tooltip
                contentStyle={{
                  border: '1px solid var(--border)',
                  background: '#0f172a',
                  color: '#fff',
                  borderRadius: 8,
                }}
              />
              <Bar dataKey="value" radius={[8, 8, 0, 0]}>
                {horarios.map((entry, index) => (
                  <Cell
                    key={entry.name}
                    fill={chartColors[index % chartColors.length]}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </article>
    </section>
  )
}
