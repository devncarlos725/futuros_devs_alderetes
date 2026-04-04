import type { InscripcionApiResponse } from '@/types/inscripcion'

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export function isValidEmail(email: string): boolean {
  return EMAIL_REGEX.test(email)
}

export function parseInscripcionApiError(
  status: number,
  data: unknown,
): string {
  if (
    data &&
    typeof data === 'object' &&
    'error' in data &&
    typeof (data as { error: string }).error === 'string'
  ) {
    return (data as { error: string }).error
  }
  if (status === 400) {
    return 'Los datos enviados no son válidos. Revisá el formulario.'
  }
  if (status === 401 || status === 403) {
    return 'No tenés permiso para realizar esta acción.'
  }
  if (status === 503) {
    return 'El servicio no está disponible en este momento. Intentá más tarde.'
  }
  if (status >= 500) {
    return 'Error en el servidor. Si persiste, escribinos por WhatsApp.'
  }
  return 'No se pudo completar la inscripción. Intentá de nuevo.'
}

export function isInscripcionSuccess(
  data: unknown,
): data is Extract<InscripcionApiResponse, { success: true }> {
  return (
    !!data &&
    typeof data === 'object' &&
    'success' in data &&
    (data as { success: boolean }).success === true
  )
}
