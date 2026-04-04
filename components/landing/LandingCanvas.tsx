import type { ReactNode } from 'react'

/** Contenedor único con z-index sobre body::noise; da sensación de una sola superficie. */
export function LandingCanvas({ children }: { children: ReactNode }) {
  return (
    <div className="landing-canvas min-w-0 bg-bg text-light">{children}</div>
  )
}
