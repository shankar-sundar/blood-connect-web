'use server'

import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'

export async function signIn(_: string | null, formData: FormData): Promise<string | null> {
  const supabase = await createClient()

  const { error } = await supabase.auth.signInWithPassword({
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  })

  if (error) return error.message

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return 'Sign in failed'

  const { data: profile } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', user.id)
    .single()

  redirect(profile?.role === 'hospital' ? '/hospital/dashboard' : '/donor/dashboard')
}

export async function signUp(_: string | null, formData: FormData): Promise<string | null> {
  const supabase = await createClient()
  const role = formData.get('role') as string

  const { data, error } = await supabase.auth.signUp({
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  })

  if (error) return error.message
  if (!data.user) return 'Sign up failed'

  if (role === 'donor') {
    const { error: profileError } = await supabase.from('profiles').insert({
      id: data.user.id,
      role: 'donor',
      first_name: formData.get('first_name'),
      last_name: formData.get('last_name'),
      mobile: formData.get('mobile'),
      blood_group: formData.get('blood_group'),
      city: formData.get('city'),
      lat: formData.get('lat') ? parseFloat(formData.get('lat') as string) : null,
      lng: formData.get('lng') ? parseFloat(formData.get('lng') as string) : null,
      dob: formData.get('dob'),
      gender: formData.get('gender'),
      available: true,
    })
    if (profileError) return profileError.message
  } else {
    const { error: profileError } = await supabase.from('profiles').insert({
      id: data.user.id,
      role: 'hospital',
      org_name: formData.get('org_name'),
      org_type: formData.get('org_type'),
      mobile: formData.get('mobile'),
      address: formData.get('address'),
      license_no: formData.get('license_no'),
    })
    if (profileError) return profileError.message
  }

  redirect(role === 'hospital' ? '/hospital/dashboard' : '/donor/dashboard')
}

export async function signOut(): Promise<void> {
  const supabase = await createClient()
  await supabase.auth.signOut()
  redirect('/sign-in')
}
