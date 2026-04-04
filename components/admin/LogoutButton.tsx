'use client'

export function LogoutButton() {
  async function logout() {
    await fetch('/api/admin/session', { method: 'DELETE' })
    window.location.href = '/admin/login'
  }

  return (
    <button
      type="button"
      onClick={() => void logout()}
      className="rounded-lg border border-[var(--border)] bg-[var(--card)] px-4 py-2 font-['Space_Mono'] text-xs text-gray-400 transition hover:border-[var(--orange)] hover:text-[var(--orange)]"
    >
      Cerrar sesión
    </button>
  )
}
