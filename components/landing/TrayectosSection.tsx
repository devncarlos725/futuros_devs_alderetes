const FASES = [
  {
    dot: '#0d9488',
    mes: 'MESES 1–2',
    mesC: 'rgba(13,148,136,.4)',
    mesT: '#0d9488',
    title: 'Bases Web',
    pills: ['HTML5 + CSS3', 'Diseño responsivo', 'Git básico', 'Deploy en Netlify'],
    pillC: '' as const,
  },
  {
    dot: '#06b6d4',
    mes: 'MESES 3–4',
    mesC: 'rgba(6,182,212,.4)',
    mesT: '#06b6d4',
    title: 'Lógica JavaScript',
    pills: [
      'JavaScript ES6+',
      'DOM y eventos',
      'IA como asistente',
      'Primer portfolio',
    ],
    pillC: 'cyan' as const,
  },
  {
    dot: '#f97316',
    mes: 'MESES 5–6',
    mesC: 'rgba(249,115,22,.4)',
    mesT: '#f97316',
    title: 'Frontend Moderno',
    pills: ['React + hooks', 'Next.js', 'Consumo de APIs', 'Tailwind CSS'],
    pillC: '' as const,
  },
  {
    dot: '#f97316',
    mes: 'MESES 7–8',
    mesC: 'rgba(249,115,22,.4)',
    mesT: '#f97316',
    title: 'Full Stack',
    pills: ['Supabase', 'APIs REST', 'Auth y DB', 'Deploy full stack'],
    pillC: '' as const,
  },
  {
    dot: '#fbbf24',
    mes: 'MES 9',
    mesC: 'rgba(251,191,36,.4)',
    mesT: '#fbbf24',
    title: 'IA & Portfolio',
    pills: [
      'Cursor AI',
      'Proyectos reales',
      'Portfolio online',
      'Búsqueda laboral',
    ],
    pillC: '' as const,
  },
] as const

export function TrayectosSection() {
  return (
    <section
      id="trayectos"
      className="relative overflow-hidden bg-surface/90 px-4 py-20 sm:py-24"
    >
      <div
        className="hex-grid pointer-events-none absolute inset-0 opacity-40"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-br from-orange/[0.06] via-transparent to-cyan/[0.06]"
        aria-hidden
      />
      <div className="relative mx-auto max-w-5xl">
        <div className="reveal mb-12 text-center sm:mb-14">
          <div className="tag mb-4 border-orange/40 text-orange">CURRÍCULUM</div>
          <h2 className="sec-title mb-4 text-[clamp(1.65rem,5vw,3rem)] text-white">
            Tres trayectos,
            <br />
            <span className="text-orange">un camino profesional</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
          {/* Trayecto 01 */}
          <div className="tray-card reveal overflow-hidden">
            <div className="bg-gradient-to-br from-teal-600 to-emerald-900 p-6">
              <div className="mb-4 flex items-start justify-between">
                <span className="tag border-white/30 text-white/80">3 MESES</span>
                <span className="font-mono text-4xl font-bold leading-none text-white/20">
                  01
                </span>
              </div>
              <div className="mb-3 inline-block rounded-lg bg-white/15 px-3 py-2">
                <span className="font-mono text-[11px] tracking-widest text-white">
                  PRINCIPIANTE · RUTA 1
                </span>
              </div>
              <h3 className="font-display text-[1.4rem] font-extrabold leading-tight text-white">
                Fundamentos
                <br />
                Web
              </h3>
            </div>
            <div className="p-6">
              <p className="mb-4 text-sm text-muted">
                Aprende los pilares del desarrollo web moderno con una base sólida
                y progresión clara.
              </p>
              <div className="mb-5 flex flex-col gap-3">
                {[
                  { icon: 'H5', label: 'HTML5', desc: 'Estructura semántica y accesibilidad' },
                  { icon: 'C3', label: 'CSS3', desc: 'Diseño responsivo y animaciones' },
                  { icon: 'JS', label: 'JavaScript', desc: 'Lógica interactiva y DOM' },
                ].map((item) => (
                  <div key={item.label} className="flex items-center gap-3">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-teal-500/20">
                      <span className="font-mono text-[11px] font-bold text-teal-500">
                        {item.icon}
                      </span>
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-light">{item.label}</div>
                      <div className="text-xs text-muted">{item.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="rounded-lg border border-teal-500/30 bg-teal-500/10 px-3.5 py-2.5">
                <div className="mb-0.5 font-mono text-[11px] text-teal-500">
                  CERTIFICADO
                </div>
                <div className="text-xs text-light">Conceptos de Programación Web</div>
              </div>
            </div>
          </div>

          {/* Trayecto 02 */}
          <div className="tray-card reveal overflow-hidden">
            <div className="bg-gradient-to-br from-[#1e2761] to-[#0d1b4b] p-6">
              <div className="mb-4 flex items-start justify-between">
                <span className="tag border-orange/50 text-orange">3+3 MESES</span>
                <span className="font-mono text-4xl font-bold leading-none text-white/20">
                  02
                </span>
              </div>
              <div className="mb-3 inline-block rounded-lg bg-orange/20 px-3 py-2">
                <span className="font-mono text-[11px] tracking-widest text-orange">
                  INTERMEDIO · REQUIERE T01
                </span>
              </div>
              <h3 className="font-display text-[1.4rem] font-extrabold leading-tight text-white">
                Desarrollo
                <br />
                Moderno con React
              </h3>
            </div>
            <div className="p-6">
              <p className="mb-4 text-sm text-muted">
                Domina los frameworks más demandados en la industria con proyectos
                reales y profesionales.
              </p>
              <div className="mb-5 flex flex-col gap-3">
                {[
                  { icon: '⚛', label: 'React', desc: 'Componentes, hooks y estado' },
                  { icon: 'N', label: 'Next.js', desc: 'SSR, rutas y deploy' },
                  { icon: '🔧', label: 'Herramientas Pro', desc: 'Git, Tailwind, Vercel, Netlify' },
                ].map((item) => (
                  <div key={item.label} className="flex items-center gap-3">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-orange/15">
                      <span className="font-mono text-sm text-orange">{item.icon}</span>
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-light">{item.label}</div>
                      <div className="text-xs text-muted">{item.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="rounded-lg border border-orange/30 bg-orange/10 px-3.5 py-2.5">
                <div className="mb-0.5 font-mono text-[11px] text-orange">CERTIFICADO</div>
                <div className="text-xs text-light">Desarrollador Frontend Junior</div>
              </div>
            </div>
          </div>

          {/* Trayecto 03 */}
          <div className="tray-card reveal overflow-hidden border-orange/40">
            <div className="bg-gradient-to-br from-orange-900 to-red-950 p-6">
              <div className="mb-4 flex items-start justify-between">
                <span className="tag border-amber/50 text-amber">3 MESES · IA</span>
                <span className="font-mono text-4xl font-bold leading-none text-white/20">
                  03
                </span>
              </div>
              <div className="mb-3 inline-block rounded-lg bg-amber/20 px-3 py-2">
                <span className="font-mono text-[11px] tracking-widest text-amber">
                  AVANZADO · FULL STACK
                </span>
              </div>
              <h3 className="font-display text-[1.4rem] font-extrabold leading-tight text-white">
                Herramientas &
                <br />
                Metodología IA
              </h3>
            </div>
            <div className="p-6">
              <p className="mb-4 text-sm text-muted">
                Domina las herramientas y técnicas para programar con asistencia
                inteligente. El futuro ya llegó.
              </p>
              <div className="mb-5 flex flex-col gap-3">
                {[
                  { icon: '🤖', label: 'Cursor AI', desc: 'Entorno asistido para programar más rápido' },
                  { icon: '⚡', label: 'Claude + Gemini', desc: 'Análisis, transformación y sugerencias inteligentes' },
                  { icon: '🔄', label: 'Agentes IA', desc: 'Automatización de tareas con flujos autónomos' },
                ].map((item) => (
                  <div key={item.label} className="flex items-center gap-3">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-amber/15">
                      <span className="text-sm">{item.icon}</span>
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-light">{item.label}</div>
                      <div className="text-xs text-muted">{item.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="rounded-lg border border-amber/30 bg-amber/10 px-3.5 py-2.5">
                <div className="mb-0.5 font-mono text-[11px] text-amber">CERTIFICADO</div>
                <div className="text-xs text-light">
                  Desarrollador Full Stack Junior + IA
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="reveal mt-14 sm:mt-16">
          <h3 className="sec-title mb-8 text-center text-[clamp(1.25rem,4vw,1.5rem)] text-white">
            Roadmap Full Stack — <span className="text-orange">9 meses</span>
          </h3>
          <div className="relative mx-auto max-w-[640px] pl-10 pr-1 sm:pl-[50px] sm:pr-0">
            <div className="timeline-line absolute" />
            <div className="flex flex-col gap-8">
              {FASES.map((fase, i) => (
                <div key={i} className="relative">
                  <div
                    className="timeline-dot absolute top-1"
                    style={{
                      background: fase.dot,
                      boxShadow: `0 0 12px ${fase.dot}`,
                    }}
                  />
                  <div className="grad-border px-5 py-4">
                    <div className="mb-2 flex flex-wrap items-center gap-3">
                      <span
                        className="tag"
                        style={{ borderColor: fase.mesC, color: fase.mesT }}
                      >
                        {fase.mes}
                      </span>
                      <span className="font-display font-bold text-light">
                        {fase.title}
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {fase.pills.map((p) => (
                        <span
                          key={p}
                          className={`skill-pill ${fase.pillC === 'cyan' ? 'cyan' : ''}`}
                        >
                          {p}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
