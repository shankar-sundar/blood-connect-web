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

  // Fetch all open requests matching blood group, then filter by donor city in JS.
  // PostgREST cannot filter on embedded relation columns server-side, so we
  // fetch hospital city via the join and apply the city match after.
  const { data: allRequests } = await supabase
    .from('blood_requests')
    .select('*, hospitals:profiles!blood_requests_hospital_id_fkey(org_name, address, city)')
    .eq('status', 'open')
    .eq('blood_group', profile.blood_group)
    .order('urgency_rank', { ascending: true })
    .order('created_at', { ascending: false })

  const donorCity = (profile.city ?? '').trim().toLowerCase()
  const requests = (allRequests ?? []).filter((r) => {
    const hospitalCity = (r.hospitals?.city ?? '').trim().toLowerCase()
    return donorCity && hospitalCity ? hospitalCity === donorCity : true
  })

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
