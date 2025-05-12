import { cookies } from 'next/headers'
import SmsClient from './SmsClient'
import { redirect } from 'next/navigation'

export default async function SendSmsPage() {
  const cookieStore = await cookies()
  const jwt = cookieStore.get('jwt')?.value || ''

  // Redirect to login if no JWT
  if (!jwt) {
    redirect('/login')
  }

  // If JWT exists, render the client component
  return <SmsClient />
}
