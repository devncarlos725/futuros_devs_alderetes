'use client'

import { useState } from 'react'
import type { InscripcionFormPayload } from '@/types/inscripcion'
import {
  isValidEmail,
  isInscripcionSuccess,
  parseInscripcionApiError,
} from '@/lib/inscripcion-errors'

const emptyForm: InscripcionFormPayload = {
  nombre: '',
  email: '',
  telefono: '',
  edad: '',
  barrio: '',
  nivel: '',
  horario: '',
}

function FormField({
  label,
  accent,
  children,
}: {
  label: string
  accent: 'orange' | 'cyan'
  children: React.ReactNode
}) {
  const labelColor = accent === 'orange' ? 'text-orange' : 'text-cyan'
  return (
    <div className="mb-4 text-left">
      <label
        className={`mb-1.5 block font-mono text-[11px] tracking-wider ${labelColor}`}
      >
        {label}
      </label>
      {children}
    </div>
  )
}

const inputClassName =
  'w-full rounded-[10px] border border-border bg-white/5 px-3 py-3 font-body text-sm text-light outline-none transition-all duration-200 focus:border-orange focus:ring-1 focus:ring-orange/30 sm:px-4'

export function InscriptionForm() {
  const [formData, setFormData] = useState<InscripcionFormPayload>(emptyForm)
  const [formError, setFormError] = useState(false)
  const [submitMessage, setSubmitMessage] = useState('')
  const [formSuccess, setFormSuccess] = useState(false)
  const [loading, setLoading] = useState(false)

  async function handleSubmit() {
    const { nombre, email, telefono, nivel, horario } = formData

    if (!nombre || !email || !telefono || !nivel || !horario) {
      setFormError(true)
      setSubmitMessage('')
      return
    }

    if (!isValidEmail(email)) {
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

      let result: unknown
      try {
        result = await response.json()
      } catch {
        setSubmitMessage(
          'La respuesta del servidor no es válida. Intentá de nuevo.',
        )
        return
      }

      if (!response.ok) {
        setSubmitMessage(parseInscripcionApiError(response.status, result))
        return
      }

      if (isInscripcionSuccess(result) && result.warning) {
        setSubmitMessage(result.warning)
      }

      setFormSuccess(true)
    } catch (e) {
      const message =
        e instanceof Error
          ? `Error de red: ${e.message}`
          : 'No se pudo conectar con el servidor. Revisá tu conexión.'
      setSubmitMessage(message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="relative mx-auto w-full max-w-full sm:max-w-[600px]">
      {/* Marco degradado tipo “tarjeta flotante” */}
      <div className="rounded-[22px] bg-gradient-to-br from-orange/40 via-border to-cyan/35 p-px shadow-[0_28px_100px_rgba(0,0,0,.55),0_0_80px_rgba(249,115,22,.12)]">
        <div className="relative overflow-hidden rounded-[21px] border border-border/70 bg-card">
          <div
            className="pointer-events-none absolute inset-0 bg-gradient-to-br from-orange/[0.08] via-transparent to-cyan/[0.07]"
            aria-hidden
          />
          <div className="relative px-4 py-8 sm:px-6 sm:py-9 md:px-8 md:py-10">
            {loading ? (
              <div
                className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-3 rounded-[21px] bg-bg/85 backdrop-blur-md"
                aria-busy="true"
                aria-label="Enviando inscripción"
              >
                <div className="h-10 w-10 animate-spin rounded-full border-2 border-orange border-t-transparent" />
                <p className="font-mono text-xs text-muted">Enviando datos…</p>
              </div>
            ) : null}

            {formSuccess ? (
              <div className="py-4 text-center sm:py-5">
                <div className="mb-3 text-5xl">🎉</div>
                <h3 className="sec-title mb-2 text-[clamp(1.15rem,4vw,1.4rem)] font-extrabold text-orange">
                  ¡Inscripción recibida!
                </h3>
                <p className="px-1 font-body text-sm leading-relaxed text-muted">
                  Te vamos a contactar pronto con los detalles del curso.
                  ¡Bienvenido a Futuros Devs Alderetes!
                </p>
                {submitMessage ? (
                  <p className="mt-3 font-body text-xs text-amber">{submitMessage}</p>
                ) : null}
              </div>
            ) : (
              <>
                <FormField label="NOMBRE COMPLETO *" accent="orange">
                  <input
                    type="text"
                    placeholder="Ej: Juan Pérez"
                    value={formData.nombre}
                    onChange={(e) =>
                      setFormData({ ...formData, nombre: e.target.value })
                    }
                    className={inputClassName}
                  />
                </FormField>

                <FormField label="CORREO ELECTRÓNICO *" accent="cyan">
                  <input
                    type="email"
                    placeholder="tu@email.com"
                    required
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    className={`${inputClassName} focus:border-cyan focus:ring-cyan/30`}
                  />
                </FormField>

                <FormField label="WHATSAPP / TELÉFONO *" accent="orange">
                  <input
                    type="tel"
                    placeholder="Ej: 381 XXX-XXXX"
                    value={formData.telefono}
                    onChange={(e) =>
                      setFormData({ ...formData, telefono: e.target.value })
                    }
                    className={inputClassName}
                  />
                </FormField>

                <div className="mb-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
                  <FormField label="EDAD" accent="cyan">
                    <input
                      type="number"
                      placeholder="Ej: 21"
                      min={13}
                      max={60}
                      value={formData.edad}
                      onChange={(e) =>
                        setFormData({ ...formData, edad: e.target.value })
                      }
                      className={`${inputClassName} focus:border-cyan focus:ring-cyan/30`}
                    />
                  </FormField>
                  <FormField label="BARRIO" accent="cyan">
                    <input
                      type="text"
                      placeholder="Ej: Centro"
                      value={formData.barrio}
                      onChange={(e) =>
                        setFormData({ ...formData, barrio: e.target.value })
                      }
                      className={`${inputClassName} focus:border-cyan focus:ring-cyan/30`}
                    />
                  </FormField>
                </div>

                <div className="mb-4 text-left">
                  <label className="mb-1.5 block font-mono text-[11px] tracking-wider text-orange">
                    ¿CUÁL ES TU NIVEL ACTUAL? *
                  </label>
                  <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
                    {[
                      { val: 'ninguno', label: '😅 Sin exp.' },
                      { val: 'basico', label: '🙂 Algo básico' },
                      { val: 'intermedio', label: '💪 Intermedio' },
                    ].map((opt) => {
                      const active = formData.nivel === opt.val
                      return (
                        <button
                          key={opt.val}
                          type="button"
                          onClick={() =>
                            setFormData({ ...formData, nivel: opt.val })
                          }
                          className={`rounded-[10px] border px-2 py-2.5 font-body text-[clamp(11px,2.8vw,13px)] transition-all duration-300 ease-out sm:px-2.5 ${
                            active
                              ? 'border-orange bg-orange/15 text-orange shadow-[0_0_22px_rgba(249,115,22,.28)] ring-1 ring-orange/40'
                              : 'border-border bg-white/[0.03] text-gray-400 hover:border-orange/35 hover:bg-white/[0.06] hover:text-gray-300'
                          } active:scale-[0.98]`}
                        >
                          {opt.label}
                        </button>
                      )
                    })}
                  </div>
                </div>

                <div className="mb-6 text-left">
                  <label className="mb-1.5 block font-mono text-[11px] tracking-wider text-orange">
                    HORARIO PREFERIDO *
                  </label>
                  <div className="grid grid-cols-1 gap-2 min-[420px]:grid-cols-2">
                    {[
                      { val: 'manana', label: '🌅 Mañana' },
                      { val: 'tarde', label: '☀️ Tarde' },
                      { val: 'noche', label: '🌙 Noche' },
                      { val: 'cualquiera', label: '🤷 Cualquiera' },
                    ].map((opt) => {
                      const active = formData.horario === opt.val
                      return (
                        <button
                          key={opt.val}
                          type="button"
                          onClick={() =>
                            setFormData({ ...formData, horario: opt.val })
                          }
                          className={`rounded-[10px] border px-2 py-2.5 font-body text-[clamp(11px,2.8vw,13px)] transition-all duration-300 ease-out sm:px-2.5 ${
                            active
                              ? 'border-cyan bg-cyan/15 text-cyan shadow-[0_0_22px_rgba(6,182,212,.28)] ring-1 ring-cyan/40'
                              : 'border-border bg-white/[0.03] text-gray-400 hover:border-cyan/35 hover:bg-white/[0.06] hover:text-gray-300'
                          } active:scale-[0.98]`}
                        >
                          {opt.label}
                        </button>
                      )
                    })}
                  </div>
                </div>

                {(formError || submitMessage) && !loading ? (
                  <div className="mb-3 rounded-lg border border-red-500/30 bg-red-500/10 px-3 py-2.5 text-center font-body text-sm text-red-300">
                    {submitMessage ||
                      'Por favor completá los campos obligatorios (*)'}
                  </div>
                ) : null}

                <button
                  type="button"
                  onClick={() => void handleSubmit()}
                  disabled={loading}
                  className="glow-orange w-full rounded-xl border-none bg-orange py-4 font-display text-base font-extrabold text-black transition-all duration-200 hover:scale-[1.03] hover:bg-amber hover:shadow-[0_0_48px_rgba(249,115,22,.45)] active:scale-100 disabled:cursor-not-allowed disabled:opacity-70 disabled:hover:scale-100"
                >
                  {loading ? 'Enviando...' : '¡Quiero inscribirme! →'}
                </button>

                <p className="mt-3 text-center font-body text-[11px] text-gray-600">
                  O escribinos directamente por{' '}
                  <a
                    href="https://wa.me/5493816000000"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#25D366] transition-colors hover:text-[#2fe576]"
                  >
                    WhatsApp
                  </a>
                </p>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
