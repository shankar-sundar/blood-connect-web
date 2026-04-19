import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { BloodRequestForm } from '@/components/hospital/blood-request-form'

export default async function BloodRequestPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/sign-in')

  return <BloodRequestForm hospitalId={user.id} />
}
