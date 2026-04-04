# 🚀 Futuros Devs Alderetes - Plataforma de Formación Tecnológica

![Stack](https://img.shields.io/badge/Stack-Next.js%2015%20%7C%20TS%20%7C%20Tailwind-blue)
![Status](https://img.shields.io/badge/Estado-Producción-success)

Este proyecto es una Landing Page de alta conversión y sistema de gestión para el **Programa Municipal de Formación Tecnológica** de Alderetes, Tucumán.

## 🛠️ Arquitectura y Stack Técnico

- **Framework:** [Next.js 15](https://nextjs.org/) (App Router) para máxima velocidad y SEO.
- **Estilos:** [Tailwind CSS v4](https://tailwindcss.com/) con arquitectura centralizada en `globals.css`.
- **Base de Datos:** [Supabase](https://supabase.com/) (PostgreSQL) para manejo de inscriptos en tiempo real.
- **Animaciones:** Intersection Observer API para efectos de _Scroll Reveal_ y CSS puro para efectos de terminal _retro-futurista_.

## ✨ Características Principales

- **UI Consistente:** Grilla técnica infinita y línea de escaneo láser que acompaña el scroll.
- **Glassmorphism:** Tarjetas con efecto de desenfoque de fondo y bordes animados.
- **Dashboard Admin:** Panel privado protegido por variables de entorno para gestión de alumnos.
- **Responsive Design:** Adaptado para móviles y desktop con tipografía fluida.

## 📖 De la Idea al Código (Aprendizajes)

Este repositorio documenta el proceso de refactorización desde un archivo único a una **arquitectura de componentes**, aplicando buenas prácticas como:

1. **Principio de Responsabilidad Única:** Separación de estilos globalizados y lógica de componentes.
2. **Optimización de Performance:** Uso estratégico de Server y Client Components.
3. **Seguridad:** Gestión de credenciales mediante variables de entorno (.env).

---

_Desarrollado por el Prof. Carlos M. Núñez en colaboración con Mentores IA._
