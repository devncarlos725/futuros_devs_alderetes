import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Futuros Devs Alderetes — Programa Municipal de Formación Tecnológica",
  description:
    "Aprendé a programar gratis en Alderetes, Tucumán. Formación real en desarrollo web, React, Next.js e Inteligencia Artificial.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
