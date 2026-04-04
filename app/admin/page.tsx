import { redirect } from 'next/navigation'

/** La lista de inscriptos vive solo en /admin/dashboard (protegida). */
export default function AdminIndexPage() {
  redirect('/admin/login')
}
