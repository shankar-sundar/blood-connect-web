import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { HospitalDashboardClient } from '@/components/hospital/dashboard-client'

export default async function HospitalDashboardPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/sign-in')

  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single()

  if (profile?.role !== 'hospital') redirect('/donor/dashboard')

  const { data: requests } = await supabase
    .from('blood_requests')
    .select(`
      *,
      acceptances(
        id, status,
        donor:profiles!acceptances_donor_id_fkey(first_name, last_name, mobile)
      )
    `)
    .eq('hospital_id', user.id)
    .eq('status', 'open')
    .order('created_at', { ascending: false })

  return <HospitalDashboardClient profile={profile} requests={requests ?? []} />
}
