export function ClosingSection() {
  return (
    <section
      className="reveal px-4 py-20 sm:py-24"
      style={{
        background:
          'linear-gradient(180deg,transparent,rgba(249,115,22,.05) 50%,transparent)',
      }}
    >
      <div className="mx-auto max-w-4xl px-1 text-center">
        <div className="mx-auto mb-6 h-1 w-[60px] rounded-sm bg-gradient-to-r from-orange to-cyan" />
        <h2 className="sec-title mb-4 text-[clamp(1.75rem,6vw,3.5rem)] leading-tight text-white">
          Alderetes puede ser el
          <br />
          <span className="text-glow-o text-orange">próximo polo tech</span>
          <br />
          del Gran Tucumán.
        </h2>
        <p className="mx-auto mb-10 max-w-md px-2 font-body text-[clamp(0.95rem,2.8vw,1.05rem)] italic leading-relaxed text-muted sm:mb-12">
          &quot;Este proyecto no le cuesta al municipio: le da visibilidad, le da
          impacto y le da historia.&quot;
        </p>
        <div className="border-t border-border pt-8">
          <p className="font-mono text-[clamp(10px,2.5vw,12px)] tracking-wide text-gray-600">
            FUTUROS DEVS ALDERETES · PROF. CARLOS M. NÚÑEZ · TUCUMÁN 2026
          </p>
        </div>
      </div>
    </section>
  )
}
