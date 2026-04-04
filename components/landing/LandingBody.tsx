import { PorQueSection } from '@/components/landing/PorQueSection'
import { TrayectosSection } from '@/components/landing/TrayectosSection'
import { ProfesorSection } from '@/components/landing/ProfesorSection'
import { SectionDivider } from '@/components/landing/SectionDivider'

/** Marketing entre Hero y formulario (Server Component). */
export function LandingBody() {
  return (
    <>
      <PorQueSection />
      <SectionDivider />
      <TrayectosSection />
      <SectionDivider />
      <ProfesorSection />
    </>
  )
}
