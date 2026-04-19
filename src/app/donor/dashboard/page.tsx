import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { DonorDashboardClient } from '@/components/donor/dashboard-client'

export default async function DonorDashboardPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/sign-in')

  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single()

  if (!profile) redirect('/register')

  const { data: requests } = await supabase
    .from('blood_requests')
    .select('*, hospitals:profiles!blood_requests_hospital_id_fkey(org_name, address)')
    .eq('status', 'open')
    .eq('blood_group', profile.blood_group)
    .order('urgency_rank', { ascending: true })
    .order('created_at', { ascending: false })

  const { data: donations } = await supabase
    .from('acceptances')
    .select('*, blood_requests(hospitals:profiles!blood_requests_hospital_id_fkey(org_name), created_at, blood_group)')
    .eq('donor_id', user.id)
    .eq('status', 'donated')
    .order('created_at', { ascending: false })
    .limit(3)

  return (
    <DonorDashboardClient
      profile={profile}
      requests={requests ?? []}
      donations={donations ?? []}
    />
  )
}
