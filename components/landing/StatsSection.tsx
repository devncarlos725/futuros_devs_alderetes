const STATS = [
  { num: '3', label: 'Trayectos', colorClass: 'text-orange' as const },
  { num: '9', label: 'Meses de formación', colorClass: 'text-cyan' as const },
  { num: '$0', label: 'Costo de inscripción', colorClass: 'text-amber' as const },
]

export function StatsSection() {
  return (
    <div className="mx-auto mt-12 grid w-full max-w-[480px] grid-cols-3 gap-2 px-1 sm:mt-14 sm:gap-4">
      {STATS.map((s) => (
        <div key={s.label} className="stat-card min-w-0 px-1 py-4 sm:px-2 sm:py-5">
          <div className={`counter text-[clamp(1.35rem,5vw,2rem)] font-bold leading-none ${s.colorClass}`}>
            {s.num}
          </div>
          <div className="mt-1.5 text-[clamp(9px,2.4vw,11px)] leading-tight text-muted">
            {s.label}
          </div>
        </div>
      ))}
    </div>
  )
}
