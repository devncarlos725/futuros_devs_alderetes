/** Línea de acople entre secciones (menos sensación de divs sueltos). */
export function SectionDivider() {
  return (
    <div className="px-4 py-2 sm:py-3" aria-hidden>
      <div className="section-connector" />
    </div>
  )
}
