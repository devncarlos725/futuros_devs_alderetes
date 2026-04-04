'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { useState } from 'react'

export function AdminLoginClient() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const nextPath = searchParams.get('next') ?? '/admin/dashboard'

  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      const res = await fetch('/api/admin/session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      })
      const data = (await res.json()) as { error?: string }
      if (!res.ok) {
        setError(data.error ?? 'No se pudo iniciar sesión.')
        return
      }
      router.push(nextPath.startsWith('/') ? nextPath : '/admin/dashboard')
      router.refresh()
    } catch {
      setError('Error de red. Intentá de nuevo.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-[var(--bg)] px-4">
      <div className="w-full max-w-md rounded-2xl border border-[var(--border)] bg-[var(--card)] p-8">
        <h1 className="mb-2 font-['Syne'] text-2xl font-extrabold text-white">
          Acceso admin
        </h1>
        <p className="mb-6 text-sm text-gray-500">
          Futuros Devs Alderetes — panel interno
        </p>
        <form onSubmit={(e) => void handleSubmit(e)} className="space-y-4">
          <div>
            <label
              htmlFor="admin-pass"
              className="mb-1.5 block font-['Space_Mono'] text-xs tracking-wide text-[var(--cyan)]"
            >
              CONTRASEÑA
            </label>
            <input
              id="admin-pass"
              type="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-lg border border-[var(--border)] bg-white/5 px-4 py-3 text-sm text-gray-200 outline-none transition focus:border-[var(--orange)]"
            />
          </div>
          {error ? (
            <p className="rounded-lg border border-red-500/30 bg-red-500/10 px-3 py-2 text-sm text-red-300">
              {error}
            </p>
          ) : null}
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-[var(--orange)] py-3 font-['Syne'] text-base font-extrabold text-black transition hover:bg-[var(--amber)] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? 'Entrando…' : 'Entrar'}
          </button>
        </form>
      </div>
    </main>
  )
}
