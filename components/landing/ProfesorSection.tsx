import Image from 'next/image'

const ATTRS = [
  {
    icon: '🎓',
    title: 'Docente de Informática',
    desc: 'Formado como Profesor de Informática. Entiende cómo enseñar, no solo cómo programar.',
  },
  {
    icon: '💻',
    title: 'Full Stack Developer',
    desc: 'Trabaja con React, Next.js, Supabase y herramientas de IA en proyectos reales.',
  },
  {
    icon: '🏫',
    title: 'Formado en Egg Education',
    desc: 'Completó el bootcamp Full Stack con metodología colaborativa, el mismo que ahora enseña.',
  },
  {
    icon: '📍',
    title: 'De Alderetes, para Alderetes',
    desc: 'Conoce el contexto local, las dificultades reales y qué funciona en este barrio.',
  },
] as const

const SKILLS = [
  'Docente Informática',
  'Full Stack Dev',
  'Egg Education · Full Stack',
  'React · Next.js',
  'Supabase',
  'IA Pedagógica',
] as const

export function ProfesorSection() {
  return (
    <section id="profesor" className="relative px-4 py-20 sm:py-24">
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-orange/[0.04] to-transparent"
        aria-hidden
      />
      <div className="relative mx-auto max-w-5xl">
        <div className="reveal mb-10 text-center sm:mb-12">
          <div className="tag mb-4 border-cyan/40 text-cyan">EL PROFE</div>
          <h2 className="sec-title text-[clamp(1.65rem,5vw,3rem)] text-white">
            No es un youtuber.
            <br />
            <span className="text-orange">Es de acá.</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 items-center gap-8 md:grid-cols-[repeat(auto-fit,minmax(280px,1fr))] md:gap-10">
          <div className="reveal flex flex-col gap-4 sm:gap-5">
            {ATTRS.map((item) => (
              <div
                key={item.title}
                className="grad-border flex gap-4 border border-border p-4 sm:p-5"
              >
                <span className="shrink-0 text-2xl">{item.icon}</span>
                <div className="min-w-0">
                  <h4 className="mb-1 font-display text-[clamp(0.95rem,2.5vw,1rem)] font-bold text-white">
                    {item.title}
                  </h4>
                  <p className="font-body text-[clamp(0.75rem,2.2vw,0.8125rem)] leading-relaxed text-muted">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="reveal text-center">
            <div className="glow-cyan rounded-[20px] border border-border bg-card p-6 sm:p-9">
              <div className="mx-auto mb-5 h-[100px] w-[100px] rounded-full bg-gradient-to-br from-orange to-cyan p-[3px]">
                <div className="h-full w-full overflow-hidden rounded-full bg-card">
                  <Image
                    src="/carlos-nunez.jpg"
                    alt="Carlos M. Núñez"
                    width={94}
                    height={94}
                    className="h-full w-full object-cover object-top opacity-100"
                  />
                </div>
              </div>

              <h3 className="mb-1 font-display text-[clamp(1.15rem,3vw,1.4rem)] font-extrabold text-white">
                Profe Carlos M. Núñez
              </h3>
              <p className="mb-6 text-sm text-muted">Alderetes, Tucumán · Argentina</p>

              <div className="mb-6 flex flex-wrap justify-center gap-2">
                {SKILLS.map((s, i) => (
                  <span
                    key={s}
                    className={`skill-pill ${i % 2 === 1 ? 'cyan' : ''}`}
                  >
                    {s}
                  </span>
                ))}
              </div>

              <div className="flex flex-col gap-3">
                <a
                  href="https://profesor-nunez-informatica.netlify.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="glow-orange flex min-h-[48px] items-center justify-center gap-2 rounded-xl bg-orange px-5 py-3 font-display text-sm font-extrabold text-black no-underline transition-all duration-200 hover:scale-105 hover:bg-amber hover:shadow-[0_0_40px_rgba(249,115,22,.45)] active:scale-100"
                >
                  🔗 Ver Portfolio Online
                </a>
                <a
                  href="https://www.linkedin.com/in/carlos-nu%C3%B1ez-ba7066145/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex min-h-[48px] items-center justify-center gap-2 rounded-xl border border-cyan px-5 py-3 font-display text-sm font-bold text-cyan no-underline transition-all duration-200 hover:scale-105 hover:bg-cyan hover:text-black hover:shadow-[0_0_36px_rgba(6,182,212,.35)] active:scale-100"
                >
                  in LinkedIn
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
