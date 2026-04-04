import { getSupabase } from '@/lib/supabase'
import type {
  InscripcionApiResponse,
  InscripcionFormPayload,
} from '@/types/inscripcion'
import { Resend } from 'resend'

const RESEND_API_KEY = process.env.RESEND_API_KEY ?? 're_12345'
const RESEND_FROM_EMAIL =
  process.env.RESEND_FROM_EMAIL ??
  'Futuros Devs Alderetes <onboarding@resend.dev>'
const ADMIN_NOTIFICATION_EMAIL =
  process.env.ADMIN_NOTIFICATION_EMAIL ?? 'devncarlos725@gmail.com'

const resend = new Resend(RESEND_API_KEY)

function isPayload(body: unknown): body is InscripcionFormPayload {
  if (!body || typeof body !== 'object') return false
  const b = body as Record<string, unknown>
  return (
    typeof b.nombre === 'string' &&
    typeof b.email === 'string' &&
    typeof b.telefono === 'string' &&
    typeof b.edad === 'string' &&
    typeof b.barrio === 'string' &&
    typeof b.nivel === 'string' &&
    typeof b.horario === 'string'
  )
}

export async function POST(
  request: Request,
): Promise<Response> {
  try {
    let raw: unknown
    try {
      raw = await request.json()
    } catch {
      return Response.json(
        { error: 'El cuerpo de la petición no es JSON válido.' },
        { status: 400 },
      )
    }

    if (!isPayload(raw)) {
      return Response.json(
        { error: 'Faltan campos obligatorios o tienen formato incorrecto.' },
        { status: 400 },
      )
    }

    const { nombre, email, telefono, edad, barrio, nivel, horario } = raw

    if (!nombre.trim() || !email.trim() || !telefono.trim() || !nivel || !horario) {
      return Response.json(
        { error: 'Nombre, email, teléfono, nivel y horario son obligatorios.' },
        { status: 400 },
      )
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailPattern.test(email.trim())) {
      return Response.json(
        { error: 'El correo electrónico no tiene un formato válido.' },
        { status: 400 },
      )
    }

    const supabase = getSupabase()
    const { data, error } = await supabase
      .from('inscripciones')
      .insert([
        {
          nombre: nombre.trim(),
          email: email.trim(),
          telefono: telefono.trim(),
          edad: edad || null,
          barrio: barrio || null,
          nivel,
          horario,
        },
      ])
      .select()

    if (error) {
      console.error('Supabase error:', error.message, error.code)
      return Response.json(
        {
          error: `No se pudo guardar en la base de datos (${error.code ?? 'desconocido'}). ${error.message}`,
        },
        { status: 500 },
      )
    }

    let mailWarning: string | undefined
    try {
      await resend.emails.send({
        from: RESEND_FROM_EMAIL,
        to: email.trim(),
        subject: '🚀 ¡Tu inscripción fue recibida! — Futuros Devs Alderetes',
        html: buildStudentEmailHtml({
          nombre,
          telefono,
          nivel,
          horario,
          edad,
          barrio,
        }),
      })

      await resend.emails.send({
        from: RESEND_FROM_EMAIL,
        to: ADMIN_NOTIFICATION_EMAIL,
        subject: `🔔 Nueva inscripción: ${nombre}`,
        html: buildAdminEmailHtml({
          nombre,
          email: email.trim(),
          telefono,
          nivel,
          horario,
          edad,
          barrio,
        }),
      })
    } catch (mailErr) {
      console.error('Resend error:', mailErr)
      const msg =
        mailErr instanceof Error ? mailErr.message : 'Error desconocido de correo'
      mailWarning = `Tu inscripción quedó registrada, pero el envío de correos falló: ${msg}`
    }

    const payload: InscripcionApiResponse = mailWarning
      ? { success: true, data, warning: mailWarning }
      : { success: true, data, emailSent: true }

    return Response.json(payload)
  } catch (err) {
    console.error('Server error:', err)
    return Response.json(
      {
        error:
          err instanceof Error
            ? `Error interno: ${err.message}`
            : 'Error interno del servidor.',
      },
      { status: 500 },
    )
  }
}

function buildStudentEmailHtml(p: {
  nombre: string
  telefono: string
  nivel: string
  horario: string
  edad: string
  barrio: string
}): string {
  return `
        <div style="font-family: Arial, sans-serif; max-width: 560px; margin: 0 auto; background: #0a0a0f; color: #e5e7eb; padding: 32px; border-radius: 12px;">
          <div style="text-align: center; margin-bottom: 32px;">
            <div style="display: inline-block; background: #f97316; border-radius: 8px; padding: 8px 16px; margin-bottom: 16px;">
              <span style="font-family: monospace; font-size: 18px; font-weight: 700; color: #000;">&lt;/&gt;</span>
            </div>
            <h1 style="color: #f97316; font-size: 24px; margin: 0;">Futuros Devs Alderetes</h1>
            <p style="color: #6b7280; font-size: 14px; margin-top: 4px;">Programa Municipal de Formación Tecnológica</p>
          </div>

          <h2 style="color: #fff; font-size: 20px;">¡Hola, ${escapeHtml(p.nombre)}! 🎉</h2>
          <p style="color: #9ca3af; line-height: 1.7;">
            Recibimos tu inscripción al curso <strong style="color: #f97316;">Futuros Devs Alderetes</strong>.
            En los próximos días el Profe Carlos te va a contactar por WhatsApp con todos los detalles.
          </p>

          <div style="background: #16161f; border: 1px solid #1e1e2e; border-radius: 10px; padding: 20px; margin: 24px 0;">
            <p style="color: #6b7280; font-size: 12px; font-family: monospace; letter-spacing: 0.1em; margin: 0 0 12px;">TUS DATOS REGISTRADOS</p>
            <table style="width: 100%; border-collapse: collapse;">
              <tr><td style="color: #6b7280; padding: 4px 0; font-size: 14px; width: 40%;">Nombre</td><td style="color: #e5e7eb; font-size: 14px;">${escapeHtml(p.nombre)}</td></tr>
              <tr><td style="color: #6b7280; padding: 4px 0; font-size: 14px;">WhatsApp</td><td style="color: #e5e7eb; font-size: 14px;">${escapeHtml(p.telefono)}</td></tr>
              <tr><td style="color: #6b7280; padding: 4px 0; font-size: 14px;">Nivel</td><td style="color: #f97316; font-size: 14px; text-transform: capitalize;">${escapeHtml(p.nivel)}</td></tr>
              <tr><td style="color: #6b7280; padding: 4px 0; font-size: 14px;">Horario</td><td style="color: #06b6d4; font-size: 14px; text-transform: capitalize;">${escapeHtml(p.horario)}</td></tr>
              ${p.edad ? `<tr><td style="color: #6b7280; padding: 4px 0; font-size: 14px;">Edad</td><td style="color: #e5e7eb; font-size: 14px;">${escapeHtml(p.edad)} años</td></tr>` : ''}
              ${p.barrio ? `<tr><td style="color: #6b7280; padding: 4px 0; font-size: 14px;">Barrio</td><td style="color: #e5e7eb; font-size: 14px;">${escapeHtml(p.barrio)}</td></tr>` : ''}
            </table>
          </div>

          <p style="color: #9ca3af; line-height: 1.7;">
            Si tenés dudas escribinos por <a href="https://wa.me/5493816000000" style="color: #25D366;">WhatsApp</a>.
          </p>

          <div style="border-top: 1px solid #1e1e2e; margin-top: 32px; padding-top: 20px; text-align: center;">
            <p style="color: #4b5563; font-size: 12px; font-family: monospace;">
              FUTUROS DEVS ALDERETES · PROF. CARLOS M. NÚÑEZ · TUCUMÁN 2025
            </p>
          </div>
        </div>
      `
}

function buildAdminEmailHtml(p: {
  nombre: string
  email: string
  telefono: string
  nivel: string
  horario: string
  edad: string
  barrio: string
}): string {
  return `
        <div style="font-family: Arial, sans-serif; max-width: 560px; margin: 0 auto; padding: 24px;">
          <h2 style="color: #f97316;">Nueva inscripción recibida 🚀</h2>
          <table style="width: 100%; border-collapse: collapse; margin-top: 16px;">
            <tr style="border-bottom: 1px solid #eee;"><td style="padding: 8px; color: #666; width: 35%;">Nombre</td><td style="padding: 8px; font-weight: bold;">${escapeHtml(p.nombre)}</td></tr>
            <tr style="border-bottom: 1px solid #eee;"><td style="padding: 8px; color: #666;">Email</td><td style="padding: 8px;"><a href="mailto:${escapeHtml(p.email)}">${escapeHtml(p.email)}</a></td></tr>
            <tr style="border-bottom: 1px solid #eee;"><td style="padding: 8px; color: #666;">WhatsApp</td><td style="padding: 8px;">${escapeHtml(p.telefono)}</td></tr>
            <tr style="border-bottom: 1px solid #eee;"><td style="padding: 8px; color: #666;">Nivel</td><td style="padding: 8px; text-transform: capitalize;">${escapeHtml(p.nivel)}</td></tr>
            <tr style="border-bottom: 1px solid #eee;"><td style="padding: 8px; color: #666;">Horario</td><td style="padding: 8px; text-transform: capitalize;">${escapeHtml(p.horario)}</td></tr>
            ${p.edad ? `<tr style="border-bottom: 1px solid #eee;"><td style="padding: 8px; color: #666;">Edad</td><td style="padding: 8px;">${escapeHtml(p.edad)} años</td></tr>` : ''}
            ${p.barrio ? `<tr style="border-bottom: 1px solid #eee;"><td style="padding: 8px; color: #666;">Barrio</td><td style="padding: 8px;">${escapeHtml(p.barrio)}</td></tr>` : ''}
          </table>
        </div>
      `
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}
