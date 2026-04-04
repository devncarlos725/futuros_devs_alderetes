import Image from "next/image";
import { StatsSection } from "@/components/landing/StatsSection";

export function Hero() {
  return (
    <section className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-bg px-4 pb-12 pt-[calc(var(--nav-h)+1.25rem)] sm:px-6 sm:pb-16 md:pt-[calc(var(--nav-h)+1.5rem)]">
      {/* Rejilla tech + profundidad */}
      <div
        className="hex-grid pointer-events-none absolute inset-0 opacity-90"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-orange/[0.06] via-transparent to-cyan/[0.04]"
        aria-hidden
      />
      <div className="scanline" aria-hidden />
      <div
        className="pointer-events-none absolute left-[5%] top-[18%] h-[min(300px,50vw)] w-[min(300px,50vw)] rounded-full sm:left-[10%] sm:top-[20%]"
        style={{
          background:
            "radial-gradient(circle,rgba(249,115,22,.14),transparent 70%)",
        }}
        aria-hidden
      />
      <div
        className="pointer-events-none absolute bottom-[15%] right-[5%] h-[min(250px,45vw)] w-[min(250px,45vw)] rounded-full sm:bottom-[20%] sm:right-[10%]"
        style={{
          background:
            "radial-gradient(circle,rgba(6,182,212,.12),transparent 70%)",
        }}
        aria-hidden
      />

      <div className="relative z-10 mx-auto w-full max-w-4xl text-center">
        <div className="fade-up delay-1 mb-6 flex justify-center px-1">
          <div className="inline-flex max-w-full items-center gap-3 rounded-xl border border-white/10 bg-white/[0.06] px-4 py-3 sm:px-5">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-white">
              <Image
                src="/logo-alderetes.jpg"
                alt="Municipalidad de Alderetes"
                width={44}
                height={44}
                className="h-full w-full object-contain object-center opacity-100"
                priority
              />
            </div>
            <div className="min-w-0 text-left">
              <div className="mb-0.5 font-mono text-[clamp(9px,2vw,10px)] tracking-widest text-muted">
                MUNICIPALIDAD DE
              </div>
              <div className="font-display text-[clamp(12px,3.5vw,14px)] font-extrabold text-white">
                ALDERETES · TUCUMÁN
              </div>
            </div>
          </div>
        </div>

        <div className="fade-up delay-2 mb-6 px-1">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-orange/30 bg-orange/10 px-3 py-1.5 sm:px-4">
            <span className="pulse-dot inline-block h-1.5 w-1.5 rounded-full bg-orange" />
            <span className="font-mono text-[clamp(10px,2.5vw,11px)] tracking-wider text-orange">
              INSCRIPCIONES ABIERTAS · 2026
            </span>
          </div>

          <h1 className="sec-title mb-3 text-[clamp(2.25rem,8vw,5rem)] font-extrabold leading-[1.05] text-white">
            Futuros
            <br />
            <span className="text-glow-o text-orange">Devs</span>{" "}
            <span className="text-glow-c text-cyan">Alderetes</span>
          </h1>

          <div className="mt-2 font-mono text-[clamp(11px,2.8vw,16px)] tracking-wide text-muted">
            <span className="text-orange">{">"}</span> Programa Municipal de
            Formación Tecnológica <span className="blink text-orange">_</span>
          </div>
        </div>

        <p className="fade-up delay-3 mx-auto mb-10 max-w-[640px] px-1 font-body text-[clamp(0.95rem,2.8vw,1.2rem)] leading-relaxed text-muted">
          Aprendé a programar{" "}
          <strong className="text-light">de cero a profesional</strong> en{" "}
          <strong className="text-orange">9 meses</strong>. Sin costo de
          inscripción, con tecnologías reales y un profe de Alderetes que ya lo
          logró.
        </p>

        <div className="fade-up delay-4 flex flex-col items-stretch justify-center gap-3 px-1 sm:flex-row sm:flex-wrap sm:gap-4">
          <a
            href="#inscripcion"
            className="glow-orange inline-flex min-h-[48px] items-center justify-center rounded-xl bg-orange px-6 py-3.5 text-center font-display text-[clamp(0.9rem,3vw,1rem)] font-extrabold text-black no-underline transition-all duration-200 hover:scale-105 hover:bg-amber hover:shadow-[0_0_48px_rgba(249,115,22,.4)] active:scale-100 sm:px-8"
          >
            ¡Quiero inscribirme! →
          </a>
          <a
            href="#trayectos"
            className="inline-flex min-h-[48px] items-center justify-center rounded-xl border border-border bg-white/[0.03] px-6 py-3.5 text-center font-display text-[clamp(0.9rem,3vw,1rem)] font-bold text-light no-underline transition-all duration-200 hover:scale-105 hover:border-cyan hover:text-cyan hover:shadow-[0_0_36px_rgba(6,182,212,.2)] active:scale-100 sm:px-8"
          >
            Ver trayectos
          </a>
        </div>

        <StatsSection />
      </div>
    </section>
  );
}
