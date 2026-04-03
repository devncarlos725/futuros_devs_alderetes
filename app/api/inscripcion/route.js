import { supabase } from "@/lib/supabase";
import { Resend } from "resend";

// Inicializamos Resend con la API key del .env.local
const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request) {
  try {
    const body = await request.json();
    const { nombre, email, telefono, edad, barrio, nivel, horario } = body;

    // ── 1. VALIDACIÓN ──────────────────────────────────────────────────────────
    if (!nombre || !email || !telefono || !nivel || !horario) {
      return Response.json(
        { error: "Faltan campos obligatorios" },
        { status: 400 },
      );
    }

    // ── 2. GUARDAR EN SUPABASE ─────────────────────────────────────────────────
    const { data, error } = await supabase
      .from("inscripciones")
      .insert([{ nombre, email, telefono, edad, barrio, nivel, horario }])
      .select();

    if (error) {
      console.error("Supabase error:", error.message);
      return Response.json(
        { error: `Error de base de datos: ${error.message}` },
        { status: 500 },
      );
    }

    // ── 3. MAIL AL ALUMNO — confirmación de inscripción ────────────────────────
    await resend.emails.send({
      from: "Futuros Devs Alderetes <onboarding@resend.dev>",
      to: email,
      subject: "🚀 ¡Tu inscripción fue recibida! — Futuros Devs Alderetes",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 560px; margin: 0 auto; background: #0a0a0f; color: #e5e7eb; padding: 32px; border-radius: 12px;">
          <div style="text-align: center; margin-bottom: 32px;">
            <div style="display: inline-block; background: #f97316; border-radius: 8px; padding: 8px 16px; margin-bottom: 16px;">
              <span style="font-family: monospace; font-size: 18px; font-weight: 700; color: #000;">&lt;/&gt;</span>
            </div>
            <h1 style="color: #f97316; font-size: 24px; margin: 0;">Futuros Devs Alderetes</h1>
            <p style="color: #6b7280; font-size: 14px; margin-top: 4px;">Programa Municipal de Formación Tecnológica</p>
          </div>

          <h2 style="color: #fff; font-size: 20px;">¡Hola, ${nombre}! 🎉</h2>
          <p style="color: #9ca3af; line-height: 1.7;">
            Recibimos tu inscripción al curso <strong style="color: #f97316;">Futuros Devs Alderetes</strong>.
            En los próximos días el Profe Carlos te va a contactar por WhatsApp con todos los detalles.
          </p>

          <div style="background: #16161f; border: 1px solid #1e1e2e; border-radius: 10px; padding: 20px; margin: 24px 0;">
            <p style="color: #6b7280; font-size: 12px; font-family: monospace; letter-spacing: 0.1em; margin: 0 0 12px;">TUS DATOS REGISTRADOS</p>
            <table style="width: 100%; border-collapse: collapse;">
              <tr><td style="color: #6b7280; padding: 4px 0; font-size: 14px; width: 40%;">Nombre</td><td style="color: #e5e7eb; font-size: 14px;">${nombre}</td></tr>
              <tr><td style="color: #6b7280; padding: 4px 0; font-size: 14px;">WhatsApp</td><td style="color: #e5e7eb; font-size: 14px;">${telefono}</td></tr>
              <tr><td style="color: #6b7280; padding: 4px 0; font-size: 14px;">Nivel</td><td style="color: #f97316; font-size: 14px; text-transform: capitalize;">${nivel}</td></tr>
              <tr><td style="color: #6b7280; padding: 4px 0; font-size: 14px;">Horario</td><td style="color: #06b6d4; font-size: 14px; text-transform: capitalize;">${horario}</td></tr>
              ${edad ? `<tr><td style="color: #6b7280; padding: 4px 0; font-size: 14px;">Edad</td><td style="color: #e5e7eb; font-size: 14px;">${edad} años</td></tr>` : ""}
              ${barrio ? `<tr><td style="color: #6b7280; padding: 4px 0; font-size: 14px;">Barrio</td><td style="color: #e5e7eb; font-size: 14px;">${barrio}</td></tr>` : ""}
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
      `,
    });

    // ── 4. MAIL AL PROFE — aviso de nueva inscripción ──────────────────────────
    await resend.emails.send({
      from: "Futuros Devs Alderetes <onboarding@resend.dev>",
      to: "devncarlos725@gmail.com", // ← cambiá por tu email real
      subject: `🔔 Nueva inscripción: ${nombre}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 560px; margin: 0 auto; padding: 24px;">
          <h2 style="color: #f97316;">Nueva inscripción recibida 🚀</h2>
          <table style="width: 100%; border-collapse: collapse; margin-top: 16px;">
            <tr style="border-bottom: 1px solid #eee;"><td style="padding: 8px; color: #666; width: 35%;">Nombre</td><td style="padding: 8px; font-weight: bold;">${nombre}</td></tr>
            <tr style="border-bottom: 1px solid #eee;"><td style="padding: 8px; color: #666;">Email</td><td style="padding: 8px;"><a href="mailto:${email}">${email}</a></td></tr>
            <tr style="border-bottom: 1px solid #eee;"><td style="padding: 8px; color: #666;">WhatsApp</td><td style="padding: 8px;">${telefono}</td></tr>
            <tr style="border-bottom: 1px solid #eee;"><td style="padding: 8px; color: #666;">Nivel</td><td style="padding: 8px; text-transform: capitalize;">${nivel}</td></tr>
            <tr style="border-bottom: 1px solid #eee;"><td style="padding: 8px; color: #666;">Horario</td><td style="padding: 8px; text-transform: capitalize;">${horario}</td></tr>
            ${edad ? `<tr style="border-bottom: 1px solid #eee;"><td style="padding: 8px; color: #666;">Edad</td><td style="padding: 8px;">${edad} años</td></tr>` : ""}
            ${barrio ? `<tr style="border-bottom: 1px solid #eee;"><td style="padding: 8px; color: #666;">Barrio</td><td style="padding: 8px;">${barrio}</td></tr>` : ""}
          </table>
        </div>
      `,
    });

    return Response.json({ success: true, data });
  } catch (err) {
    console.error("Server error:", err);
    return Response.json(
      { error: "Error interno del servidor" },
      { status: 500 },
    );
  }
}
