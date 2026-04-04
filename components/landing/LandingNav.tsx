type NavLink = {
  href: string
  label: string
  highlight?: boolean
}

const links: NavLink[] = [
  { href: '#por-que', label: '¿Por qué?' },
  { href: '#trayectos', label: 'Trayectos' },
  { href: '#profesor', label: 'Profesor' },
  { href: '#inscripcion', label: 'Inscribirse', highlight: true },
]

export function LandingNav() {
  return (
    <header className="fixed left-0 right-0 top-0 z-[300] border-b border-[var(--border)] bg-[rgba(10,10,15,0.92)] shadow-[0_12px_40px_rgba(0,0,0,0.45)] backdrop-blur-xl">
      <nav
        className="mx-auto flex max-w-[1152px] flex-col gap-3 px-4 py-3 md:flex-row md:items-center md:justify-between md:gap-4 md:py-3.5"
        aria-label="Principal"
      >
        {/* Fila 1: marca + CTA (siempre legible, sin solaparse) */}
        <div className="flex w-full items-center justify-between gap-3 md:w-auto md:justify-start">
          <a
            href="#"
            className="flex min-w-0 items-center gap-3 no-underline"
          >
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-orange transition-transform duration-200 hover:scale-105">
              <span className="font-mono text-xs font-bold text-black">
                &lt;/&gt;
              </span>
            </div>
            <span className="truncate font-display text-[clamp(0.8rem,3.5vw,0.95rem)] font-extrabold tracking-wide text-white">
              FUTUROS <span className="text-orange">DEVS</span>
            </span>
          </a>

          <a
            href="https://wa.me/5493816000000"
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 rounded-full border border-orange bg-orange/10 px-3 py-2 font-mono text-[10px] font-bold uppercase tracking-wide text-orange transition-all duration-200 hover:scale-105 hover:bg-orange hover:text-black hover:shadow-[0_0_28px_rgba(249,115,22,0.5)] sm:px-4 sm:text-[11px]"
          >
            Contactar
          </a>
        </div>

        {/* Desktop: enlaces en línea */}
        <div className="hidden items-center gap-8 font-body text-sm text-muted md:flex">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className={
                l.highlight
                  ? 'font-bold text-orange transition-transform duration-200 hover:scale-105'
                  : 'transition-colors duration-200 hover:text-orange'
              }
            >
              {l.label}
            </a>
          ))}
        </div>
      </nav>

      {/* Móvil: segunda fila dedicada a navegación (no compite con el logo) */}
      <div className="mx-auto flex max-w-[1152px] flex-wrap justify-center gap-x-5 gap-y-2 border-t border-[var(--border)]/80 px-4 pb-3 pt-2 font-mono text-[11px] tracking-wide text-muted md:hidden">
        {links.map((l) => (
          <a
            key={l.href}
            href={l.href}
            className={
              l.highlight
                ? 'font-bold text-orange transition-opacity hover:opacity-90'
                : 'text-zinc-400 transition-colors hover:text-orange'
            }
          >
            {l.label}
          </a>
        ))}
      </div>
    </header>
  )
}
