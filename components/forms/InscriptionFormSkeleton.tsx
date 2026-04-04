export function InscriptionFormSkeleton() {
  return (
    <div className="mx-auto w-full max-w-full animate-pulse sm:max-w-[600px]">
      <div className="rounded-[22px] bg-gradient-to-br from-orange/30 via-border to-cyan/25 p-px shadow-[0_24px_80px_rgba(0,0,0,.45)]">
        <div className="rounded-[21px] border border-border/60 bg-card px-4 py-8 sm:px-6 sm:py-9">
          <div className="mb-4 h-4 w-32 rounded bg-white/10" />
          <div className="mb-6 h-11 w-full rounded-[10px] bg-white/5" />
          <div className="mb-4 h-4 w-40 rounded bg-white/10" />
          <div className="mb-6 h-11 w-full rounded-[10px] bg-white/5" />
          <div className="mb-8 grid grid-cols-1 gap-3 sm:grid-cols-2">
            <div className="h-11 rounded-[10px] bg-white/5" />
            <div className="h-11 rounded-[10px] bg-white/5" />
          </div>
          <div className="mb-6 grid grid-cols-1 gap-2 sm:grid-cols-3">
            <div className="h-11 rounded-[10px] bg-white/5" />
            <div className="h-11 rounded-[10px] bg-white/5" />
            <div className="h-11 rounded-[10px] bg-white/5" />
          </div>
          <div className="h-12 w-full rounded-xl bg-orange/25" />
        </div>
      </div>
    </div>
  )
}
