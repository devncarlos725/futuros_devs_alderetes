import { ScrollRevealRoot } from "@/components/landing/ScrollRevealRoot";
import { LandingNav } from "@/components/landing/LandingNav";
import { LandingCanvas } from "@/components/landing/LandingCanvas";
import { SectionDivider } from "@/components/landing/SectionDivider";
import { Hero } from "@/components/landing/Hero";
import { LandingBody } from "@/components/landing/LandingBody";
import { InscriptionSection } from "@/components/forms/InscriptionSection";
import { ClosingSection } from "@/components/landing/ClosingSection";
import { FloatingWhatsApp } from "@/components/landing/FloatingWhatsApp";

/**
 * Server Component por defecto: mejor SEO y menos JS en el bundle inicial.
 * Solo ScrollRevealRoot + InscriptionForm son client.
 */
export default function Home() {
  return (
    <ScrollRevealRoot>
      <LandingNav />
      <LandingCanvas>
        <Hero />
        <SectionDivider />
        <LandingBody />
        <SectionDivider />
        <InscriptionSection />
        <SectionDivider />
        <ClosingSection />
      </LandingCanvas>
      <FloatingWhatsApp />
    </ScrollRevealRoot>
  );
}
