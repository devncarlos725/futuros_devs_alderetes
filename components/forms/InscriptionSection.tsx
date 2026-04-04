import { Suspense } from 'react'
import { InscriptionForm } from '@/components/forms/InscriptionForm'
import { InscriptionFormSkeleton } from '@/components/forms/InscriptionFormSkeleton'

export function InscriptionSection() {
  return (
    <section
      id="inscripcion"
      className="relative reveal overflow-hidden px-4 py-20 sm:py-24"
      style={{
        background:
          'linear-gradient(180deg,transparent,rgba(249,115,22,.06),transparent)',
      }}
    >
      <div
        className="hex-grid pointer-events-none absolute inset-0 opacity-25"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-orange/[0.04] to-transparent"
        aria-hidden
      />

      <div className="relative mx-auto w-full max-w-[640px] px-1 text-center sm:px-2">
        <div className="tag mb-4 border-orange/40 text-orange">PRIMER PASO</div>
        <h2 className="sec-title mb-3 text-[clamp(1.65rem,5vw,3rem)] text-white">
          Empezá desde acá.
          <br />
          <span className="text-orange">Inscribite ahora.</span>
        </h2>
        <p className="mb-8 font-body text-[clamp(0.8125rem,2.5vw,0.875rem)] leading-relaxed text-muted sm:mb-10">
          El primer paso es inscribirse. Completá el formulario y te contactamos
          con los detalles del trayecto que mejor se adapta a vos.
        </p>

        <Suspense fallback={<InscriptionFormSkeleton />}>
          <InscriptionForm />
        </Suspense>
      </div>
    </section>
  )
}
