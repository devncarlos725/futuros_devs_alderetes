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

type ChartItem = {
  name: string
  value: number
}

type StatsChartsProps = {
  total: number
  barrios: ChartItem[]
  niveles: ChartItem[]
  horarios: ChartItem[]
}

const chartColors = ['#f97316', '#06b6d4', '#fbbf24', '#fb923c', '#22d3ee']

export default function StatsCharts({
  total,
  barrios,
  niveles,
  horarios,
}: StatsChartsProps) {
  return (
    <section style={containerStyle}>
      <article style={bigNumberCardStyle}>
        <p style={eyebrowStyle}>Panorama general</p>
        <h1 style={bigNumberStyle}>{total} futuros devs</h1>
      </article>

      <article style={cardStyle}>
        <h2 style={titleStyle}>Inscriptos por barrio</h2>
        <div style={chartContainerStyle}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={barrios}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(148,163,184,.15)" />
              <XAxis dataKey="name" stroke="#9ca3af" tick={{ fontSize: 12 }} />
              <YAxis stroke="#9ca3af" allowDecimals={false} tick={{ fontSize: 12 }} />
              <Tooltip contentStyle={tooltipStyle} />
              <Bar dataKey="value" radius={[8, 8, 0, 0]}>
                {barrios.map((entry, index) => (
                  <Cell key={entry.name} fill={chartColors[index % chartColors.length]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </article>

      <article style={cardStyle}>
        <h2 style={titleStyle}>Distribucion por nivel</h2>
        <div style={chartContainerStyle}>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Tooltip contentStyle={tooltipStyle} />
              <Pie
                data={niveles}
                dataKey="value"
                nameKey="name"
                outerRadius={110}
                label
              >
                {niveles.map((entry, index) => (
                  <Cell key={entry.name} fill={chartColors[index % chartColors.length]} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>
      </article>

      <article style={cardStyle}>
        <h2 style={titleStyle}>Distribucion por horario preferido</h2>
        <div style={chartContainerStyle}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={horarios}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(148,163,184,.15)" />
              <XAxis dataKey="name" stroke="#9ca3af" tick={{ fontSize: 12 }} />
              <YAxis stroke="#9ca3af" allowDecimals={false} tick={{ fontSize: 12 }} />
              <Tooltip contentStyle={tooltipStyle} />
              <Bar dataKey="value" radius={[8, 8, 0, 0]}>
                {horarios.map((entry, index) => (
                  <Cell key={entry.name} fill={chartColors[index % chartColors.length]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </article>
    </section>
  )
}

const containerStyle: React.CSSProperties = {
  display: 'grid',
  gap: 16,
}

const bigNumberCardStyle: React.CSSProperties = {
  border: '1px solid var(--border)',
  borderRadius: 16,
  padding: 24,
  background: 'var(--card)',
}

const eyebrowStyle: React.CSSProperties = {
  color: 'var(--cyan)',
  fontFamily: "'Space Mono'",
  fontSize: 12,
  marginBottom: 6,
  letterSpacing: '.08em',
}

const bigNumberStyle: React.CSSProperties = {
  color: '#fff',
  fontFamily: "'Syne'",
  fontWeight: 800,
  fontSize: 'clamp(2rem,6vw,3.2rem)',
}

const cardStyle: React.CSSProperties = {
  border: '1px solid var(--border)',
  borderRadius: 16,
  padding: 20,
  background: 'var(--card)',
}

const titleStyle: React.CSSProperties = {
  color: '#fff',
  fontFamily: "'Syne'",
  fontWeight: 700,
  fontSize: 22,
  marginBottom: 14,
}

const chartContainerStyle: React.CSSProperties = {
  width: '100%',
  height: 320,
}

const tooltipStyle: React.CSSProperties = {
  border: '1px solid var(--border)',
  background: '#0f172a',
  color: '#fff',
  borderRadius: 8,
}
