'use client'

// ─── IMPORTS ─────────────────────────────────────────────────────────────────
// useEffect: para correr código cuando el componente carga (scroll reveal)
// useState: para guardar y actualizar datos del formulario
import { useEffect, useState } from 'react'

// ─── TIPOS DE TYPESCRIPT ──────────────────────────────────────────────────────
// Definimos la forma del objeto que guarda los datos del formulario
interface FormData {
  nombre: string
  email: string
  telefono: string
  edad: string
  barrio: string
  nivel: string
  horario: string
}

// ─── COMPONENTE PRINCIPAL DE LA PÁGINA ───────────────────────────────────────
export default function Home() {

  // Estado del formulario — guarda lo que el usuario escribe/selecciona
  const [formData, setFormData] = useState<FormData>({
    nombre: '',
    email: '',
    telefono: '',
    edad: '',
    barrio: '',
    nivel: '',
    horario: '',
  })

  // true = mostrar mensaje de error si faltan campos obligatorios
  const [formError, setFormError] = useState(false)
  const [submitMessage, setSubmitMessage] = useState('')

  // true = mostrar pantalla de éxito después de enviar
  const [formSuccess, setFormSuccess] = useState(false)

  // true = deshabilitar botón mientras se envía a Supabase
  const [loading, setLoading] = useState(false)

  // ─── SCROLL REVEAL ──────────────────────────────────────────────────────────
  // Cuando el componente carga, observamos todos los elementos con clase "reveal"
  // Cuando entran en el viewport (pantalla), les agregamos "revealed" → se animan
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(el => {
          if (el.isIntersecting) el.target.classList.add('revealed')
        })
      },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    )
    document.querySelectorAll('.reveal').forEach(el => observer.observe(el))

    // Cleanup: cuando el componente se desmonta, dejamos de observar
    return () => observer.disconnect()
  }, [])

  // ─── ENVÍO DEL FORMULARIO ───────────────────────────────────────────────────
  async function handleSubmit() {
    const { nombre, email, telefono, nivel, horario } = formData

    // Validación: campos obligatorios
    if (!nombre || !email || !telefono || !nivel || !horario) {
      setFormError(true)
      setSubmitMessage('')
      return
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailPattern.test(email)) {
      setFormError(true)
      setSubmitMessage('Ingresá un correo electrónico válido.')
      return
    }

    setFormError(false)
    setSubmitMessage('')
    setLoading(true)

    try {
      const response = await fetch('/api/inscripcion', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      const result = await response.json()
      if (!response.ok) {
        throw new Error(result?.error || 'No se pudo enviar la inscripción.')
      }

      if (result.warning) {
        setSubmitMessage(result.warning)
      }

      setFormSuccess(true)
    } catch (e) {
      console.error('Error guardando inscripción:', e)
      const message = e instanceof Error ? e.message : 'No se pudo enviar la inscripción.'
      setSubmitMessage(message)
    } finally {
      setLoading(false)
    }
  }

  // ─── RENDER ─────────────────────────────────────────────────────────────────
  return (
    <>

      {/* ════════════════════════════════════════════════════════════════════
          NAV — Barra de navegación fija arriba
      ════════════════════════════════════════════════════════════════════ */}
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
        background: 'rgba(10,10,15,.85)',
        backdropFilter: 'blur(20px)',
        borderBottom: '1px solid var(--border)',
      }}>
        <div style={{
          maxWidth: 1152, margin: '0 auto', padding: '12px 16px',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        }}>

          {/* Logo */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{
              width: 32, height: 32, borderRadius: 8,
              background: 'var(--orange)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <span style={{ fontFamily: "'Space Mono'", fontSize: 12, fontWeight: 700, color: '#000' }}>
                &lt;/&gt;
              </span>
            </div>
            <span style={{ fontFamily: "'Syne'", fontWeight: 800, fontSize: 15, letterSpacing: '.05em', color: '#fff' }}>
              FUTUROS <span style={{ color: 'var(--orange)' }}>DEVS</span>
            </span>
          </div>

          {/* Links de navegación — ocultos en mobile con CSS */}
          <div style={{
            display: 'flex', alignItems: 'center', gap: 24,
            fontSize: 14, color: '#6b7280', fontFamily: "'DM Sans'",
          }}>
            {/* Usamos currentTarget (no target) para que TypeScript no se queje */}
            <a href="#por-que"
               style={{ textDecoration: 'none', color: 'inherit', transition: 'color .2s' }}
               onMouseOver={e => (e.currentTarget.style.color = 'var(--orange)')}
               onMouseOut={e =>  (e.currentTarget.style.color = '#6b7280')}>
              ¿Por qué?
            </a>
            <a href="#trayectos"
               style={{ textDecoration: 'none', color: 'inherit', transition: 'color .2s' }}
               onMouseOver={e => (e.currentTarget.style.color = 'var(--orange)')}
               onMouseOut={e =>  (e.currentTarget.style.color = '#6b7280')}>
              Trayectos
            </a>
            <a href="#profesor"
               style={{ textDecoration: 'none', color: 'inherit', transition: 'color .2s' }}
               onMouseOver={e => (e.currentTarget.style.color = 'var(--orange)')}
               onMouseOut={e =>  (e.currentTarget.style.color = '#6b7280')}>
              Profesor
            </a>
            <a href="#inscripcion"
               style={{ textDecoration: 'none', color: 'var(--orange)', fontWeight: 700 }}>
              Inscribirse
            </a>
          </div>

          {/* Botón contactar */}
          <a href="https://wa.me/5493816000000" target="_blank"
             style={{
               fontSize: 12, padding: '8px 16px', borderRadius: 999,
               border: '1px solid var(--orange)', color: 'var(--orange)',
               fontFamily: "'Space Mono'", textDecoration: 'none', transition: 'all .2s',
             }}
             onMouseOver={e => { e.currentTarget.style.background = 'var(--orange)'; e.currentTarget.style.color = '#000' }}
             onMouseOut={e =>  { e.currentTarget.style.background = 'transparent';   e.currentTarget.style.color = 'var(--orange)' }}>
            Contactar
          </a>
        </div>
      </nav>


      {/* ════════════════════════════════════════════════════════════════════
          HERO — Sección principal con título grande y CTAs
      ════════════════════════════════════════════════════════════════════ */}
      <section style={{
        minHeight: '100vh', paddingTop: 80, position: 'relative',
        overflow: 'hidden', display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center', padding: '80px 16px 40px',
      }}>

        {/* Fondo de puntos en hexágono — definido en globals.css */}
        <div className="hex-grid" />

        {/* Línea animada que pasa de arriba hacia abajo — efecto sci-fi */}
        <div className="scanline" />

        {/* Manchas de luz decorativas (glow) */}
        <div style={{
          position: 'absolute', top: '20%', left: '10%', width: 300, height: 300,
          borderRadius: '50%',
          background: 'radial-gradient(circle,rgba(249,115,22,.12),transparent 70%)',
          pointerEvents: 'none',
        }} />
        <div style={{
          position: 'absolute', bottom: '20%', right: '10%', width: 250, height: 250,
          borderRadius: '50%',
          background: 'radial-gradient(circle,rgba(6,182,212,.1),transparent 70%)',
          pointerEvents: 'none',
        }} />

        <div style={{ maxWidth: 896, margin: '0 auto', textAlign: 'center', position: 'relative', zIndex: 10 }}>

          {/* Badge de municipalidad — entra con animación fade-up delay 1 */}
          <div className="fade-up delay-1" style={{ display: 'flex', justifyContent: 'center', marginBottom: 24 }}>
            <div style={{
              background: 'rgba(255,255,255,.06)', border: '1px solid rgba(255,255,255,.12)',
              borderRadius: 12, padding: '12px 20px',
              display: 'inline-flex', alignItems: 'center', gap: 12,
            }}>
              <div style={{
                width: 44, height: 44, borderRadius: 8, background: '#fff',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                overflow: 'hidden', flexShrink: 0,
              }}>
                <img
                  src="/logo-alderetes.jpg?v=1"
                  alt="Municipalidad de Alderetes"
                  width={44}
                  height={44}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'contain',
                    objectPosition: 'center',
                    display: 'block',
                    opacity: 1,
                  }}
                />
              </div>
              <div style={{ textAlign: 'left' }}>
                <div style={{ fontFamily: "'Space Mono'", fontSize: 10, color: '#6b7280', letterSpacing: '.1em', marginBottom: 2 }}>
                  MUNICIPALIDAD DE
                </div>
                <div style={{ fontFamily: "'Syne'", fontWeight: 800, fontSize: 14, color: '#fff' }}>
                  ALDERETES · TUCUMÁN
                </div>
              </div>
            </div>
          </div>

          {/* Título principal — delay 2 */}
          <div className="fade-up delay-2" style={{ marginBottom: 24 }}>

            {/* Pill de "inscripciones abiertas" con punto pulsante */}
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: 8, marginBottom: 16,
              background: 'rgba(249,115,22,.1)', border: '1px solid rgba(249,115,22,.3)',
              borderRadius: 99, padding: '4px 16px',
            }}>
              <span className="pulse-dot" style={{
                width: 6, height: 6, borderRadius: '50%',
                background: 'var(--orange)', display: 'inline-block',
              }} />
              <span style={{ fontFamily: "'Space Mono'", fontSize: 11, color: 'var(--orange)', letterSpacing: '.1em' }}>
                INSCRIPCIONES ABIERTAS · 2025
              </span>
            </div>

            {/* Título H1 con colores distintos por palabra */}
            <h1 style={{
              fontFamily: "'Syne'", fontWeight: 800, lineHeight: 1.05,
              fontSize: 'clamp(2.5rem,7vw,5rem)', color: '#fff', marginBottom: 12,
            }}>
              Futuros<br />
              <span style={{ color: 'var(--orange)' }} className="text-glow-o">Devs</span>{' '}
              <span style={{ color: 'var(--cyan)' }} className="text-glow-c">Alderetes</span>
            </h1>

            {/* Subtítulo estilo terminal con cursor parpadeante */}
            <div style={{
              fontFamily: "'Space Mono'", fontSize: 'clamp(12px,2vw,16px)',
              color: '#6b7280', letterSpacing: '.08em', marginTop: 8,
            }}>
              <span style={{ color: 'var(--orange)' }}>{'>'}</span> Programa Municipal de Formación Tecnológica{' '}
              <span className="blink" style={{ color: 'var(--orange)' }}>_</span>
            </div>
          </div>

          {/* Descripción — delay 3 */}
          <p className="fade-up delay-3" style={{
            fontSize: 'clamp(1rem,2.5vw,1.2rem)', color: '#9ca3af',
            lineHeight: 1.8, maxWidth: 640, margin: '0 auto 40px',
            fontFamily: "'DM Sans'",
          }}>
            Aprendé a programar{' '}
            <strong style={{ color: '#e5e7eb' }}>de cero a profesional</strong> en{' '}
            <strong style={{ color: 'var(--orange)' }}>9 meses</strong>. Sin costo de inscripción,
            con tecnologías reales y un profe de Alderetes que ya lo logró.
          </p>

          {/* Botones CTA — delay 4 */}
          <div className="fade-up delay-4" style={{
            display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap',
          }}>
            <a href="#inscripcion"
               className="glow-orange"
               style={{
                 padding: '14px 32px', borderRadius: 12, background: 'var(--orange)',
                 color: '#000', fontFamily: "'Syne'", fontWeight: 800, fontSize: 16,
                 textDecoration: 'none', transition: 'all .2s',
               }}
               onMouseOver={e => (e.currentTarget.style.background = 'var(--amber)')}
               onMouseOut={e =>  (e.currentTarget.style.background = 'var(--orange)')}>
              ¡Quiero inscribirme! →
            </a>
            <a href="#trayectos"
               style={{
                 padding: '14px 32px', borderRadius: 12,
                 border: '1px solid var(--border)', color: '#e5e7eb',
                 fontFamily: "'Syne'", fontWeight: 700, fontSize: 16,
                 textDecoration: 'none', background: 'rgba(255,255,255,.03)', transition: 'all .2s',
               }}
               onMouseOver={e => { e.currentTarget.style.borderColor = 'var(--cyan)'; e.currentTarget.style.color = 'var(--cyan)' }}
               onMouseOut={e =>  { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.color = '#e5e7eb' }}>
              Ver trayectos
            </a>
          </div>

          {/* Mini stats: 3 números clave */}
          <div style={{
            display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 16,
            maxWidth: 480, margin: '56px auto 0',
          }}>
            {[
              { num: '3',  label: 'Trayectos',           color: 'var(--orange)' },
              { num: '9',  label: 'Meses de formación',  color: 'var(--cyan)'   },
              { num: '$0', label: 'Costo de inscripción', color: 'var(--amber)'  },
            ].map(s => (
              <div key={s.label} className="stat-card">
                <div className="counter" style={{ fontSize: '2rem', fontWeight: 700, color: s.color }}>
                  {s.num}
                </div>
                <div style={{ fontSize: 11, color: '#6b7280', marginTop: 4 }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* ════════════════════════════════════════════════════════════════════
          POR QUÉ — 4 cards explicando el problema que resuelve el curso
      ════════════════════════════════════════════════════════════════════ */}
      <section id="por-que" style={{ padding: '96px 16px' }}>
        <div style={{ maxWidth: 1024, margin: '0 auto' }}>

          {/* Encabezado de sección — reveal = aparece al hacer scroll */}
          <div className="reveal" style={{ textAlign: 'center', marginBottom: 56 }}>
            <div className="tag" style={{ borderColor: 'rgba(6,182,212,.4)', color: 'var(--cyan)', marginBottom: 16 }}>
              EL PROBLEMA
            </div>
            <h2 className="sec-title" style={{ color: '#fff', fontSize: 'clamp(1.8rem,4vw,3rem)', marginBottom: 16 }}>
              ¿Por qué <span style={{ color: 'var(--orange)' }}>Alderetes</span> necesita esto?
            </h2>
            <p style={{ color: '#6b7280', maxWidth: 560, margin: '0 auto', lineHeight: 1.8, fontFamily: "'DM Sans'" }}>
              La industria tech crece, pero la formación de calidad sigue concentrada en Buenos Aires
              o detrás de un paywall.
            </p>
          </div>

          {/* Grid de 4 cards — se adapta a 2 columnas en pantallas medianas */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(280px,1fr))', gap: 20 }}>
            {[
              {
                icon: '🌐', title: 'Demanda global', color: 'var(--orange)',
                text: 'Argentina exporta software por millones de dólares. Los devs con inglés básico pueden acceder a salarios en USD desde cualquier ciudad.',
              },
              {
                icon: '📍', title: 'Brecha local', color: 'var(--cyan)',
                text: 'Alderetes tiene jóvenes con talento pero sin acceso a formación técnica real. La mayoría no puede pagar bootcamps privados de $300 USD/mes.',
              },
              {
                icon: '🏛️', title: 'Rol municipal', color: 'var(--amber)',
                text: 'El municipio puede ser el puente entre el talento local y la economía digital global. Una inversión chica con impacto enorme.',
              },
              {
                icon: '🤖', title: 'El momento es ahora', color: 'var(--orange)',
                text: 'Con IA, aprender a programar se aceleró 10x. Un estudiante de 2025 puede llegar a empleable en 6 meses con las herramientas correctas.',
              },
            ].map(card => (
              <div key={card.title} className="grad-border reveal"
                   style={{ padding: 24, border: '1px solid var(--border)' }}>
                <div style={{ fontSize: 28, marginBottom: 12 }}>{card.icon}</div>
                <h3 style={{ fontFamily: "'Syne'", fontWeight: 700, color: '#fff', marginBottom: 8, fontSize: '1.05rem' }}>
                  {card.title}
                </h3>
                <p style={{ color: '#6b7280', fontSize: 14, lineHeight: 1.7, fontFamily: "'DM Sans'" }}>
                  {card.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* ════════════════════════════════════════════════════════════════════
          TRAYECTOS — Las 3 etapas del curso con sus contenidos
      ════════════════════════════════════════════════════════════════════ */}
      <section id="trayectos" style={{ padding: '96px 16px', background: 'rgba(17,17,24,.5)' }}>
        <div style={{ maxWidth: 1024, margin: '0 auto' }}>

          <div className="reveal" style={{ textAlign: 'center', marginBottom: 56 }}>
            <div className="tag" style={{ borderColor: 'rgba(249,115,22,.4)', color: 'var(--orange)', marginBottom: 16 }}>
              CURRÍCULUM
            </div>
            <h2 className="sec-title" style={{ color: '#fff', fontSize: 'clamp(1.8rem,4vw,3rem)', marginBottom: 16 }}>
              Tres trayectos,<br />
              <span style={{ color: 'var(--orange)' }}>un camino profesional</span>
            </h2>
          </div>

          {/* Grid de 3 cards de trayecto */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(280px,1fr))', gap: 24 }}>

            {/* ── TRAYECTO 01 — Fundamentos Web (verde) ── */}
            <div className="tray-card reveal" style={{ overflow: 'hidden' }}>
              <div style={{ background: 'linear-gradient(135deg,#0d9488,#065f46)', padding: 24 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16 }}>
                  <span className="tag" style={{ borderColor: 'rgba(255,255,255,.3)', color: 'rgba(255,255,255,.8)' }}>3 MESES</span>
                  <span style={{ fontFamily: "'Space Mono'", fontSize: '2.5rem', fontWeight: 700, color: 'rgba(255,255,255,.2)', lineHeight: 1 }}>01</span>
                </div>
                <div style={{ background: 'rgba(255,255,255,.15)', borderRadius: 8, padding: '8px 12px', display: 'inline-block', marginBottom: 12 }}>
                  <span style={{ fontFamily: "'Space Mono'", fontSize: 11, color: '#fff', letterSpacing: '.1em' }}>PRINCIPIANTE · RUTA 1</span>
                </div>
                <h3 style={{ fontFamily: "'Syne'", fontWeight: 800, fontSize: '1.4rem', color: '#fff', lineHeight: 1.2 }}>
                  Fundamentos<br />Web
                </h3>
              </div>
              <div style={{ padding: 24 }}>
                <p style={{ color: '#6b7280', fontSize: 14, marginBottom: 16 }}>
                  Aprende los pilares del desarrollo web moderno con una base sólida y progresión clara.
                </p>
                {/* Items de tecnología */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 20 }}>
                  {[
                    { icon: 'H5', label: 'HTML5',      desc: 'Estructura semántica y accesibilidad' },
                    { icon: 'C3', label: 'CSS3',       desc: 'Diseño responsivo y animaciones'      },
                    { icon: 'JS', label: 'JavaScript', desc: 'Lógica interactiva y DOM'             },
                  ].map(item => (
                    <div key={item.label} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                      <div style={{
                        width: 32, height: 32, borderRadius: 8, background: 'rgba(13,148,136,.2)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                      }}>
                        <span style={{ fontFamily: "'Space Mono'", fontSize: 11, color: '#0d9488', fontWeight: 700 }}>
                          {item.icon}
                        </span>
                      </div>
                      <div>
                        <div style={{ fontSize: 14, fontWeight: 600, color: '#e5e7eb' }}>{item.label}</div>
                        <div style={{ fontSize: 12, color: '#6b7280' }}>{item.desc}</div>
                      </div>
                    </div>
                  ))}
                </div>
                {/* Certificado */}
                <div style={{ background: 'rgba(13,148,136,.1)', border: '1px solid rgba(13,148,136,.3)', borderRadius: 8, padding: '10px 14px' }}>
                  <div style={{ fontSize: 11, fontFamily: "'Space Mono'", color: '#0d9488', marginBottom: 2 }}>CERTIFICADO</div>
                  <div style={{ fontSize: 12, color: '#e5e7eb' }}>Conceptos de Programación Web</div>
                </div>
              </div>
            </div>

            {/* ── TRAYECTO 02 — Desarrollo Moderno con React (azul oscuro) ── */}
            <div className="tray-card reveal" style={{ overflow: 'hidden' }}>
              <div style={{ background: 'linear-gradient(135deg,#1e2761,#0d1b4b)', padding: 24 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16 }}>
                  <span className="tag" style={{ borderColor: 'rgba(249,115,22,.5)', color: 'var(--orange)' }}>3+3 MESES</span>
                  <span style={{ fontFamily: "'Space Mono'", fontSize: '2.5rem', fontWeight: 700, color: 'rgba(255,255,255,.2)', lineHeight: 1 }}>02</span>
                </div>
                <div style={{ background: 'rgba(249,115,22,.2)', borderRadius: 8, padding: '8px 12px', display: 'inline-block', marginBottom: 12 }}>
                  <span style={{ fontFamily: "'Space Mono'", fontSize: 11, color: 'var(--orange)', letterSpacing: '.1em' }}>INTERMEDIO · REQUIERE T01</span>
                </div>
                <h3 style={{ fontFamily: "'Syne'", fontWeight: 800, fontSize: '1.4rem', color: '#fff', lineHeight: 1.2 }}>
                  Desarrollo<br />Moderno con React
                </h3>
              </div>
              <div style={{ padding: 24 }}>
                <p style={{ color: '#6b7280', fontSize: 14, marginBottom: 16 }}>
                  Domina los frameworks más demandados en la industria con proyectos reales y profesionales.
                </p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 20 }}>
                  {[
                    { icon: '⚛',  label: 'React',           desc: 'Componentes, hooks y estado'      },
                    { icon: 'N',  label: 'Next.js',          desc: 'SSR, rutas y deploy'              },
                    { icon: '🔧', label: 'Herramientas Pro', desc: 'Git, Tailwind, Vercel, Netlify'   },
                  ].map(item => (
                    <div key={item.label} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                      <div style={{
                        width: 32, height: 32, borderRadius: 8, background: 'rgba(249,115,22,.15)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                      }}>
                        <span style={{ fontFamily: "'Space Mono'", fontSize: 14, color: 'var(--orange)' }}>{item.icon}</span>
                      </div>
                      <div>
                        <div style={{ fontSize: 14, fontWeight: 600, color: '#e5e7eb' }}>{item.label}</div>
                        <div style={{ fontSize: 12, color: '#6b7280' }}>{item.desc}</div>
                      </div>
                    </div>
                  ))}
                </div>
                <div style={{ background: 'rgba(249,115,22,.1)', border: '1px solid rgba(249,115,22,.3)', borderRadius: 8, padding: '10px 14px' }}>
                  <div style={{ fontSize: 11, fontFamily: "'Space Mono'", color: 'var(--orange)', marginBottom: 2 }}>CERTIFICADO</div>
                  <div style={{ fontSize: 12, color: '#e5e7eb' }}>Desarrollador Frontend Junior</div>
                </div>
              </div>
            </div>

            {/* ── TRAYECTO 03 — Herramientas & IA (rojo oscuro) ── */}
            <div className="tray-card reveal" style={{ overflow: 'hidden', borderColor: 'rgba(249,115,22,.4)' }}>
              <div style={{ background: 'linear-gradient(135deg,#7c2d12,#450a0a)', padding: 24 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16 }}>
                  <span className="tag" style={{ borderColor: 'rgba(251,191,36,.5)', color: 'var(--amber)' }}>3 MESES · IA</span>
                  <span style={{ fontFamily: "'Space Mono'", fontSize: '2.5rem', fontWeight: 700, color: 'rgba(255,255,255,.2)', lineHeight: 1 }}>03</span>
                </div>
                <div style={{ background: 'rgba(251,191,36,.2)', borderRadius: 8, padding: '8px 12px', display: 'inline-block', marginBottom: 12 }}>
                  <span style={{ fontFamily: "'Space Mono'", fontSize: 11, color: 'var(--amber)', letterSpacing: '.1em' }}>AVANZADO · FULL STACK</span>
                </div>
                <h3 style={{ fontFamily: "'Syne'", fontWeight: 800, fontSize: '1.4rem', color: '#fff', lineHeight: 1.2 }}>
                  Herramientas &<br />Metodología IA
                </h3>
              </div>
              <div style={{ padding: 24 }}>
                <p style={{ color: '#6b7280', fontSize: 14, marginBottom: 16 }}>
                  Domina las herramientas y técnicas para programar con asistencia inteligente. El futuro ya llegó.
                </p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 20 }}>
                  {[
                    { icon: '🤖', label: 'Cursor AI',      desc: 'Entorno asistido para programar más rápido'                  },
                    { icon: '⚡', label: 'Claude + Gemini', desc: 'Análisis, transformación y sugerencias inteligentes'          },
                    { icon: '🔄', label: 'Agentes IA',     desc: 'Automatización de tareas con flujos autónomos'                },
                  ].map(item => (
                    <div key={item.label} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                      <div style={{
                        width: 32, height: 32, borderRadius: 8, background: 'rgba(251,191,36,.15)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                      }}>
                        <span style={{ fontSize: 14 }}>{item.icon}</span>
                      </div>
                      <div>
                        <div style={{ fontSize: 14, fontWeight: 600, color: '#e5e7eb' }}>{item.label}</div>
                        <div style={{ fontSize: 12, color: '#6b7280' }}>{item.desc}</div>
                      </div>
                    </div>
                  ))}
                </div>
                <div style={{ background: 'rgba(251,191,36,.1)', border: '1px solid rgba(251,191,36,.3)', borderRadius: 8, padding: '10px 14px' }}>
                  <div style={{ fontSize: 11, fontFamily: "'Space Mono'", color: 'var(--amber)', marginBottom: 2 }}>CERTIFICADO</div>
                  <div style={{ fontSize: 12, color: '#e5e7eb' }}>Desarrollador Full Stack Junior + IA</div>
                </div>
              </div>
            </div>
          </div>

          {/* ── ROADMAP TIMELINE — Línea de tiempo de 9 meses ── */}
          <div className="reveal" style={{ marginTop: 64 }}>
            <h3 className="sec-title" style={{ textAlign: 'center', color: '#fff', fontSize: '1.5rem', marginBottom: 32 }}>
              Roadmap Full Stack — <span style={{ color: 'var(--orange)' }}>9 meses</span>
            </h3>

            {/* La línea vertical va pegada a la izquierda */}
            <div style={{ position: 'relative', paddingLeft: 50, maxWidth: 640, margin: '0 auto' }}>
              <div className="timeline-line" />

              <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
                {[
                  { dot: '#0d9488', mes: 'MESES 1–2', mesC: 'rgba(13,148,136,.4)', mesT: '#0d9488', title: 'Bases Web',         pills: ['HTML5 + CSS3','Diseño responsivo','Git básico','Deploy en Netlify'], pillC: ''     },
                  { dot: '#06b6d4', mes: 'MESES 3–4', mesC: 'rgba(6,182,212,.4)',  mesT: '#06b6d4', title: 'Lógica JavaScript', pills: ['JavaScript ES6+','DOM y eventos','IA como asistente','Primer portfolio'],  pillC: 'cyan' },
                  { dot: '#f97316', mes: 'MESES 5–6', mesC: 'rgba(249,115,22,.4)', mesT: '#f97316', title: 'Frontend Moderno',  pills: ['React + hooks','Next.js','Consumo de APIs','Tailwind CSS'],               pillC: ''     },
                  { dot: '#f97316', mes: 'MESES 7–8', mesC: 'rgba(249,115,22,.4)', mesT: '#f97316', title: 'Full Stack',        pills: ['Supabase','APIs REST','Auth y DB','Deploy full stack'],                    pillC: ''     },
                  { dot: '#fbbf24', mes: 'MES 9',     mesC: 'rgba(251,191,36,.4)', mesT: '#fbbf24', title: 'IA & Portfolio',    pills: ['Cursor AI','Proyectos reales','Portfolio online','Búsqueda laboral'],      pillC: ''     },
                ].map((fase, i) => (
                  <div key={i} style={{ position: 'relative' }}>
                    {/* Punto en la línea de tiempo */}
                    <div className="timeline-dot" style={{ top: 4, background: fase.dot, boxShadow: `0 0 12px ${fase.dot}` }} />
                    {/* Card de la fase */}
                    <div className="grad-border" style={{ padding: '16px 20px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
                        <span className="tag" style={{ borderColor: fase.mesC, color: fase.mesT }}>{fase.mes}</span>
                        <span style={{ color: '#e5e7eb', fontWeight: 700, fontFamily: "'Syne'" }}>{fase.title}</span>
                      </div>
                      {/* Pills de tecnologías */}
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                        {fase.pills.map(p => (
                          <span key={p} className={`skill-pill ${fase.pillC}`}>{p}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* ════════════════════════════════════════════════════════════════════
          PROFESOR — Quién enseña el curso
      ════════════════════════════════════════════════════════════════════ */}
      <section id="profesor" style={{ padding: '96px 16px' }}>
        <div style={{ maxWidth: 1024, margin: '0 auto' }}>

          <div className="reveal" style={{ textAlign: 'center', marginBottom: 48 }}>
            <div className="tag" style={{ borderColor: 'rgba(6,182,212,.4)', color: 'var(--cyan)', marginBottom: 16 }}>
              EL PROFE
            </div>
            <h2 className="sec-title" style={{ color: '#fff', fontSize: 'clamp(1.8rem,4vw,3rem)' }}>
              No es un youtuber.<br />
              <span style={{ color: 'var(--orange)' }}>Es de acá.</span>
            </h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(300px,1fr))', gap: 40, alignItems: 'center' }}>

            {/* Columna izquierda: 4 cards de atributos del profe */}
            <div className="reveal" style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
              {[
                { icon: '🎓', title: 'Docente de Informática',  desc: 'Formado como Profesor de Informática. Entiende cómo enseñar, no solo cómo programar.' },
                { icon: '💻', title: 'Full Stack Developer',     desc: 'Trabaja con React, Next.js, Supabase y herramientas de IA en proyectos reales.' },
                { icon: '🏫', title: 'Formado en Egg Education', desc: 'Completó el bootcamp Full Stack con metodología colaborativa, el mismo que ahora enseña.' },
                { icon: '📍', title: 'De Alderetes, para Alderetes', desc: 'Conoce el contexto local, las dificultades reales y qué funciona en este barrio.' },
              ].map(item => (
                <div key={item.title} className="grad-border"
                     style={{ padding: 20, border: '1px solid var(--border)', display: 'flex', gap: 16, alignItems: 'flex-start' }}>
                  <span style={{ fontSize: 22, flexShrink: 0 }}>{item.icon}</span>
                  <div>
                    <h4 style={{ fontFamily: "'Syne'", fontWeight: 700, color: '#fff', marginBottom: 4 }}>{item.title}</h4>
                    <p style={{ fontSize: 13, color: '#6b7280', lineHeight: 1.6, fontFamily: "'DM Sans'" }}>{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Columna derecha: card del profe con avatar y links */}
            <div className="reveal" style={{ textAlign: 'center' }}>
              <div className="glow-cyan"
                   style={{ background: 'var(--card)', border: '1px solid var(--border)', borderRadius: 20, padding: 36 }}>

                {/* Avatar con borde degradado */}
                <div style={{
                  width: 100, height: 100, borderRadius: '50%', margin: '0 auto 20px',
                  background: 'linear-gradient(135deg,var(--orange),var(--cyan))', padding: 3,
                }}>
                  <div style={{
                    width: '100%', height: '100%', borderRadius: '50%',
                    background: 'var(--card)',
                    overflow: 'hidden',
                  }}>
                    <img
                      src="/carlos-nunez.jpg?v=1"
                      alt="Carlos M. Núñez"
                      width={94}
                      height={94}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        objectPosition: 'center top',
                        display: 'block',
                        opacity: 1,
                      }}
                    />
                  </div>
                </div>

                <h3 style={{ fontFamily: "'Syne'", fontWeight: 800, fontSize: '1.4rem', color: '#fff', marginBottom: 4 }}>
                  Profe Carlos M. Núñez
                </h3>
                <p style={{ color: '#6b7280', fontSize: 14, marginBottom: 24 }}>
                  Alderetes, Tucumán · Argentina
                </p>

                {/* Skill pills — intercalados orange/cyan */}
                <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 8, marginBottom: 24 }}>
                  {['Docente Informática','Full Stack Dev','Egg Education · Full Stack',
                    'React · Next.js','Supabase','IA Pedagógica'].map((s, i) => (
                    <span key={s} className={`skill-pill ${i % 2 === 1 ? 'cyan' : ''}`}>{s}</span>
                  ))}
                </div>

                {/* Links externos */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                  <a href="https://profesor-nunez-informatica.netlify.app/" target="_blank"
                     style={{
                       display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                       padding: '12px 20px', borderRadius: 12, background: 'var(--orange)',
                       color: '#000', fontFamily: "'Syne'", fontWeight: 800, fontSize: 14,
                       textDecoration: 'none', transition: 'all .2s',
                     }}
                     onMouseOver={e => (e.currentTarget.style.background = 'var(--amber)')}
                     onMouseOut={e =>  (e.currentTarget.style.background = 'var(--orange)')}>
                    🔗 Ver Portfolio Online
                  </a>
                  <a href="https://www.linkedin.com/in/carlos-nu%C3%B1ez-ba7066145/" target="_blank"
                     style={{
                       display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                       padding: '12px 20px', borderRadius: 12, border: '1px solid var(--cyan)',
                       color: 'var(--cyan)', fontFamily: "'Syne'", fontWeight: 700, fontSize: 14,
                       textDecoration: 'none', transition: 'all .2s',
                     }}
                     onMouseOver={e => { e.currentTarget.style.background = 'var(--cyan)'; e.currentTarget.style.color = '#000' }}
                     onMouseOut={e =>  { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'var(--cyan)' }}>
                    in LinkedIn
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* ════════════════════════════════════════════════════════════════════
          INSCRIPCIÓN — Formulario conectado a Supabase + WhatsApp
      ════════════════════════════════════════════════════════════════════ */}
      <section id="inscripcion" className="reveal"
               style={{ padding: '96px 16px', background: 'linear-gradient(180deg,transparent,rgba(249,115,22,.05),transparent)' }}>
        <div style={{ maxWidth: 640, margin: '0 auto', textAlign: 'center' }}>

          <div className="tag" style={{ borderColor: 'rgba(249,115,22,.4)', color: 'var(--orange)', marginBottom: 16 }}>
            PRIMER PASO
          </div>
          <h2 className="sec-title" style={{ color: '#fff', fontSize: 'clamp(1.8rem,4vw,3rem)', marginBottom: 12 }}>
            Empezá desde acá.<br />
            <span style={{ color: 'var(--orange)' }}>Inscribite ahora.</span>
          </h2>
          <p style={{ color: '#6b7280', marginBottom: 40, fontSize: 14, lineHeight: 1.8, fontFamily: "'DM Sans'" }}>
            El primer paso es inscribirse. Completá el formulario y te contactamos con los detalles
            del trayecto que mejor se adapta a vos.
          </p>

          {/* Card del formulario */}
          <div style={{ background: 'var(--card)', border: '1px solid var(--border)', borderRadius: 20, padding: '36px 32px' }}>

            {/* Pantalla de éxito — se muestra después de enviar */}
            {formSuccess ? (
              <div style={{ textAlign: 'center', padding: '20px 0' }}>
                <div style={{ fontSize: '3rem', marginBottom: 12 }}>🎉</div>
                <h3 style={{ fontFamily: "'Syne'", fontWeight: 800, fontSize: '1.4rem', color: 'var(--orange)', marginBottom: 8 }}>
                  ¡Inscripción recibida!
                </h3>
                <p style={{ color: '#6b7280', fontSize: 14 }}>
                  Te vamos a contactar pronto con los detalles del curso. ¡Bienvenido a Futuros Devs Alderetes!
                </p>
                {submitMessage && (
                  <p style={{ color: '#f59e0b', fontSize: 12, marginTop: 10 }}>
                    {submitMessage}
                  </p>
                )}
              </div>
            ) : (
              <>
                {/* Campo: Nombre */}
                <FormField label="NOMBRE COMPLETO *" labelColor="var(--orange)">
                  <input type="text" placeholder="Ej: Juan Pérez"
                         value={formData.nombre}
                         onChange={e => setFormData({ ...formData, nombre: e.target.value })}
                         style={inputStyle}
                         onFocus={e => (e.target.style.borderColor = 'var(--orange)')}
                         onBlur={e =>  (e.target.style.borderColor = 'var(--border)')} />
                </FormField>
                <FormField
  label="CORREO ELECTRÓNICO *"
  labelColor="var(--cyan)"
>
  <input
    type="email"
    placeholder="tu@email.com"
    required
    value={formData.email}
    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
    style={inputStyle}
  />
</FormField>

                {/* Campo: Teléfono */}
                <FormField label="WHATSAPP / TELÉFONO *" labelColor="var(--orange)">
                  <input type="tel" placeholder="Ej: 381 XXX-XXXX"
                         value={formData.telefono}
                         onChange={e => setFormData({ ...formData, telefono: e.target.value })}
                         style={inputStyle}
                         onFocus={e => (e.target.style.borderColor = 'var(--orange)')}
                         onBlur={e =>  (e.target.style.borderColor = 'var(--border)')} />
                </FormField>

                {/* Campos opcionales: Edad y Barrio en 2 columnas */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 16 }}>
                  <FormField label="EDAD" labelColor="var(--cyan)">
                    <input type="number" placeholder="Ej: 21" min="13" max="60"
                           value={formData.edad}
                           onChange={e => setFormData({ ...formData, edad: e.target.value })}
                           style={inputStyle}
                           onFocus={e => (e.target.style.borderColor = 'var(--cyan)')}
                           onBlur={e =>  (e.target.style.borderColor = 'var(--border)')} />
                  </FormField>
                  <FormField label="BARRIO" labelColor="var(--cyan)">
                    <input type="text" placeholder="Ej: Centro"
                           value={formData.barrio}
                           onChange={e => setFormData({ ...formData, barrio: e.target.value })}
                           style={inputStyle}
                           onFocus={e => (e.target.style.borderColor = 'var(--cyan)')}
                           onBlur={e =>  (e.target.style.borderColor = 'var(--border)')} />
                  </FormField>
                </div>

                {/* Selector de nivel — 3 botones toggle */}
                <div style={{ marginBottom: 16, textAlign: 'left' }}>
                  <label style={labelStyle('var(--orange)')}>¿CUÁL ES TU NIVEL ACTUAL? *</label>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 8 }}>
                    {[
                      { val: 'ninguno',    label: '😅 Sin exp.'    },
                      { val: 'basico',     label: '🙂 Algo básico' },
                      { val: 'intermedio', label: '💪 Intermedio'  },
                    ].map(opt => (
                      <button key={opt.val} type="button"
                              onClick={() => setFormData({ ...formData, nivel: opt.val })}
                              style={selectorBtn(formData.nivel === opt.val, 'var(--orange)', 'rgba(249,115,22,.15)')}>
                        {opt.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Selector de horario — 4 botones toggle */}
                <div style={{ marginBottom: 24, textAlign: 'left' }}>
                  <label style={labelStyle('var(--orange)')}>HORARIO PREFERIDO *</label>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
                    {[
                      { val: 'manana',     label: '🌅 Mañana'     },
                      { val: 'tarde',      label: '☀️ Tarde'      },
                      { val: 'noche',      label: '🌙 Noche'      },
                      { val: 'cualquiera', label: '🤷 Cualquiera' },
                    ].map(opt => (
                      <button key={opt.val} type="button"
                              onClick={() => setFormData({ ...formData, horario: opt.val })}
                              style={selectorBtn(formData.horario === opt.val, 'var(--cyan)', 'rgba(6,182,212,.15)')}>
                        {opt.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Mensaje de error si faltan campos */}
                {(formError || submitMessage) && (
                  <div style={{
                    color: '#f87171', fontSize: 13, marginBottom: 12, textAlign: 'center',
                    background: 'rgba(248,113,113,.1)', border: '1px solid rgba(248,113,113,.3)',
                    borderRadius: 8, padding: 10,
                  }}>
                    {submitMessage || 'Por favor completá los campos obligatorios (*)'}
                  </div>
                )}

                {/* Botón submit — guarda en Supabase y abre WhatsApp */}
                <button onClick={handleSubmit} disabled={loading}
                        style={{
                          width: '100%', padding: 16, borderRadius: 12,
                          background: 'var(--orange)', border: 'none',
                          color: '#000', fontFamily: "'Syne'", fontWeight: 800,
                          fontSize: 16, cursor: loading ? 'not-allowed' : 'pointer',
                          transition: 'all .2s', opacity: loading ? 0.7 : 1,
                        }}
                        onMouseOver={e => { if (!loading) e.currentTarget.style.background = 'var(--amber)' }}
                        onMouseOut={e =>  { if (!loading) e.currentTarget.style.background = 'var(--orange)' }}>
                  {loading ? 'Enviando...' : '¡Quiero inscribirme! →'}
                </button>

                <p style={{ marginTop: 12, fontSize: 11, color: '#4b5563', fontFamily: "'DM Sans'" }}>
                  O escribinos directamente por{' '}
                  <a href="https://wa.me/5493816000000" target="_blank" style={{ color: '#25D366' }}>
                    WhatsApp
                  </a>
                </p>
              </>
            )}
          </div>
        </div>
      </section>


      {/* ════════════════════════════════════════════════════════════════════
          CIERRE — Mensaje final motivacional
      ════════════════════════════════════════════════════════════════════ */}
      <section className="reveal" style={{
        padding: '96px 16px',
        background: 'linear-gradient(180deg,transparent,rgba(249,115,22,.05) 50%,transparent)',
      }}>
        <div style={{ maxWidth: 896, margin: '0 auto', textAlign: 'center' }}>
          {/* Línea decorativa degradada */}
          <div style={{
            width: 60, height: 4,
            background: 'linear-gradient(90deg,var(--orange),var(--cyan))',
            margin: '0 auto 24px', borderRadius: 2,
          }} />
          <h2 className="sec-title" style={{ color: '#fff', fontSize: 'clamp(2rem,5vw,3.5rem)', marginBottom: 16 }}>
            Alderetes puede ser el<br />
            <span style={{ color: 'var(--orange)' }} className="text-glow-o">próximo polo tech</span><br />
            del Gran Tucumán.
          </h2>
          <p style={{
            color: '#6b7280', maxWidth: 480, margin: '0 auto 48px',
            fontSize: '1.05rem', lineHeight: 1.8, fontStyle: 'italic', fontFamily: "'DM Sans'",
          }}>
            &quot;Este proyecto no le cuesta al municipio: le da visibilidad, le da impacto y le da historia.&quot;
          </p>
          <div style={{ borderTop: '1px solid var(--border)', paddingTop: 32 }}>
            <p style={{ fontFamily: "'Space Mono'", fontSize: 12, color: '#4b5563', letterSpacing: '.05em' }}>
              FUTUROS DEVS ALDERETES · PROF. CARLOS M. NÚÑEZ · TUCUMÁN 2025
            </p>
            <div style={{ marginTop: 10, display: 'flex', justifyContent: 'center', gap: 16, flexWrap: 'wrap' }}>
              <a href="/admin"
                 style={{ fontFamily: "'Space Mono'", fontSize: 11, color: '#6b7280', textDecoration: 'none' }}>
                Ver inscriptos
              </a>
              <a href="/stats"
                 style={{ fontFamily: "'Space Mono'", fontSize: 11, color: '#6b7280', textDecoration: 'none' }}>
                Ver estadísticas
              </a>
            </div>
          </div>
        </div>
      </section>


      {/* ════════════════════════════════════════════════════════════════════
          BOTÓN FLOTANTE DE WHATSAPP — Siempre visible abajo a la derecha
      ════════════════════════════════════════════════════════════════════ */}
      <a href="https://wa.me/5493816000000?text=Hola%2C%20quiero%20info%20sobre%20Futuros%20Devs%20Alderetes"
         target="_blank" className="wa-btn" aria-label="WhatsApp">
        <svg width="28" height="28" viewBox="0 0 24 24" fill="white">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/>
        </svg>
      </a>

    </>
  )
}


// ═══════════════════════════════════════════════════════════════════════════════
// HELPERS DE ESTILO — Objetos/funciones reutilizables para no repetir CSS
// ═══════════════════════════════════════════════════════════════════════════════

// Estilo base para todos los inputs del formulario
// React.CSSProperties le dice a TypeScript que esto es un objeto de estilos válido
const inputStyle: React.CSSProperties = {
  width: '100%',
  background: 'rgba(255,255,255,.05)',
  border: '1px solid var(--border)',
  borderRadius: 10,
  padding: '12px 16px',
  color: '#e5e7eb',
  fontFamily: "'DM Sans'",
  fontSize: 14,
  outline: 'none',
  transition: 'border-color .2s',
}

// Función que devuelve el estilo del label según el color que le pasemos
const labelStyle = (color: string): React.CSSProperties => ({
  fontFamily: "'Space Mono'",
  fontSize: 11,
  color,
  letterSpacing: '.1em',
  display: 'block',
  marginBottom: 6,
})

// Función que devuelve el estilo de los botones de selector (nivel/horario)
// active: si está seleccionado o no
// activeColor: color del borde y texto cuando está activo
// activeBg: fondo cuando está activo
const selectorBtn = (active: boolean, activeColor: string, activeBg: string): React.CSSProperties => ({
  padding: '10px 6px',
  borderRadius: 10,
  border: `1px solid ${active ? activeColor : 'var(--border)'}`,
  background: active ? activeBg : 'rgba(255,255,255,.03)',
  color: active ? activeColor : '#9ca3af',
  fontFamily: "'DM Sans'",
  fontSize: 13,
  cursor: 'pointer',
  transition: 'all .2s',
})

// Componente reutilizable para cada campo del formulario
// Agrupa el label + el input con el espaciado correcto
function FormField({
  label,
  labelColor,
  children,
}: {
  label: string
  labelColor: string
  children: React.ReactNode  // children = cualquier elemento JSX que pongas adentro
}) {
  return (
    <div style={{ marginBottom: 16, textAlign: 'left' }}>
      <label style={labelStyle(labelColor)}>{label}</label>
      {children}
    </div>
  )
}