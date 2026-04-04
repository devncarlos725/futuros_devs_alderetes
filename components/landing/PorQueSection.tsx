const CARDS = [
  {
    icon: '🌐',
    title: 'Demanda global',
    text: 'Argentina exporta software por millones de dólares. Los devs con inglés básico pueden acceder a salarios en USD desde cualquier ciudad.',
  },
  {
    icon: '📍',
    title: 'Brecha local',
    text: 'Alderetes tiene jóvenes con talento pero sin acceso a formación técnica real. La mayoría no puede pagar bootcamps privados de $300 USD/mes.',
  },
  {
    icon: '🏛️',
    title: 'Rol municipal',
    text: 'El municipio puede ser el puente entre el talento local y la economía digital global. Una inversión chica con impacto enorme.',
  },
  {
    icon: '🤖',
    title: 'El momento es ahora',
    text: 'Con IA, aprender a programar se aceleró 10x. Un estudiante de 2025 puede llegar a empleable en 6 meses con las herramientas correctas.',
  },
] as const

export function PorQueSection() {
  return (
    <section id="por-que" className="relative overflow-hidden px-4 py-20 sm:py-24">
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-cyan/[0.04] via-transparent to-orange/[0.03]"
        aria-hidden
      />
      <div className="relative mx-auto max-w-5xl">
        <div className="reveal mb-12 text-center sm:mb-14">
          <div className="tag mb-4 border-cyan/40 text-cyan">EL PROBLEMA</div>
          <h2 className="sec-title mb-4 text-[clamp(1.65rem,5vw,3rem)] text-white">
            ¿Por qué <span className="text-orange">Alderetes</span> necesita
            esto?
          </h2>
          <p className="mx-auto max-w-xl px-2 font-body text-[clamp(0.875rem,2.5vw,1rem)] leading-relaxed text-muted">
            La industria tech crece, pero la formación de calidad sigue
            concentrada en Buenos Aires o detrás de un paywall.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-[repeat(auto-fit,minmax(260px,1fr))]">
          {CARDS.map((card) => (
            <div
              key={card.title}
              className="grad-border reveal border border-border p-5 sm:p-6"
            >
              <div className="mb-3 text-[clamp(1.5rem,4vw,1.75rem)]">{card.icon}</div>
              <h3 className="mb-2 font-display text-[clamp(1rem,2.5vw,1.05rem)] font-bold text-white">
                {card.title}
              </h3>
              <p className="font-body text-[clamp(0.8125rem,2.2vw,0.875rem)] leading-relaxed text-muted">
                {card.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
