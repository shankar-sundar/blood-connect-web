'use client'

import { useState } from 'react'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'
import { signOut } from '@/lib/actions/auth'

type Profile = { id: string; first_name: string; blood_group: string; available: boolean }
type Request = {
  id: string; blood_group: string; urgency: string; units: number; notes: string;
  created_at: string; hospitals: { org_name: string; address: string; city: string }
}
type Donation = {
  id: string; created_at: string;
  blood_requests: { blood_group: string; hospitals: { org_name: string }; created_at: string }
}

const URGENCY_CONFIG = {
  critical: { border: 'border-red-600', badge: 'bg-red-600 text-white animate-pulse', label: 'CRITICAL', distColor: 'text-red-600' },
  urgent:   { border: 'border-orange-400', badge: 'bg-orange-500 text-white', label: 'URGENT', distColor: 'text-gray-700' },
  scheduled:{ border: 'border-blue-400', badge: 'bg-blue-500 text-white', label: 'SCHEDULED', distColor: 'text-gray-700' },
}

function timeAgo(dateStr: string) {
  const diff = Math.floor((Date.now() - new Date(dateStr).getTime()) / 60000)
  if (diff < 1) return 'just now'
  if (diff < 60) return `${diff} min ago`
  return `${Math.floor(diff / 60)}h ago`
}

export function DonorDashboardClient({ profile, requests, donations }: {
  profile: Profile; requests: Request[]; donations: Donation[]
}) {
  const [available, setAvailable] = useState(profile.available)
  const [acceptedId, setAcceptedId] = useState<string | null>(null)
  const supabase = createClient()

  async function toggleAvailability() {
    const next = !available
    setAvailable(next)
    await supabase.from('profiles').update({ available: next }).eq('id', profile.id)
  }

  async function acceptRequest(requestId: string) {
    setAcceptedId(requestId)
    await supabase.from('acceptances').insert({ request_id: requestId, donor_id: profile.id, status: 'accepted' })
  }

  const firstName = profile.first_name ?? 'Donor'
  const donationCount = donations.length

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Nav */}
      <nav className="bg-white border-b border-red-100 px-6 py-3 flex items-center justify-between sticky top-0 z-40">
        <Link href="/" className="flex items-center gap-2">
          <span className="text-2xl">🩸</span>
          <span className="font-bold text-xl text-red-600">BloodConnect</span>
        </Link>
        <div className="flex items-center gap-4">
          <div className="relative">
            <span className="text-gray-500 text-xl cursor-pointer">🔔</span>
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-600 rounded-full text-white text-xs flex items-center justify-center">
              {requests.length}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center text-sm font-bold text-red-700">
              {firstName[0]}
            </div>
            <span className="text-sm font-medium text-gray-700">{firstName}</span>
          </div>
          <form action={signOut}>
            <button type="submit" className="text-xs text-gray-400 hover:text-gray-600">Sign out</button>
          </form>
        </div>
      </nav>

      <div className="max-w-6xl mx-auto px-6 py-8">
        {/* Header + toggle */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 gap-4">
          <div>
            <h1 className="text-2xl font-extrabold text-gray-900">Good morning, {firstName} 👋</h1>
            <p className="text-gray-500 text-sm">
              You&apos;ve saved <span className="font-semibold text-red-600">{donationCount * 3} lives</span> so far. Keep going.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <span className={`text-sm font-semibold ${available ? 'text-green-700' : 'text-gray-400'}`}>
              {available ? 'Available to Donate' : 'Unavailable'}
            </span>
            <button
              onClick={toggleAvailability}
              role="switch"
              aria-checked={available}
              className={`relative w-12 h-6 rounded-full transition-colors duration-200 focus:outline-none ${available ? 'bg-green-500' : 'bg-gray-300'}`}
            >
              <span className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-all duration-200 ${available ? 'left-7' : 'left-1'}`} />
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
            <p className="text-xs text-gray-400 font-medium uppercase tracking-wider mb-1">Total Donations</p>
            <p className="text-3xl font-extrabold text-gray-900">{donationCount}</p>
          </div>
          <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
            <p className="text-xs text-gray-400 font-medium uppercase tracking-wider mb-1">Lives Saved</p>
            <p className="text-3xl font-extrabold text-red-600">{donationCount * 3}</p>
            <p className="text-xs text-gray-400 mt-1">3 per donation</p>
          </div>
          <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
            <p className="text-xs text-gray-400 font-medium uppercase tracking-wider mb-1">Blood Group</p>
            <p className="text-3xl font-extrabold text-red-600">{profile.blood_group}</p>
          </div>
          <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
            <p className="text-xs text-gray-400 font-medium uppercase tracking-wider mb-1">Status</p>
            <p className={`text-lg font-extrabold ${available ? 'text-green-600' : 'text-gray-400'}`}>
              {available ? 'Active' : 'Paused'}
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {/* Requests */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="font-bold text-gray-900">Urgent Requests Near You</h2>
              {requests.length > 0 && (
                <span className="text-xs bg-red-100 text-red-700 px-2 py-1 rounded-full font-medium">
                  {requests.length} new
                </span>
              )}
            </div>

            {requests.length === 0 && (
              <div className="bg-white rounded-2xl border border-gray-100 p-8 text-center text-gray-400 shadow-sm">
                No open requests for {profile.blood_group} right now.
              </div>
            )}

            {requests.map((req) => {
              const urgency = (req.urgency ?? 'scheduled') as keyof typeof URGENCY_CONFIG
              const cfg = URGENCY_CONFIG[urgency] ?? URGENCY_CONFIG.scheduled
              const accepted = acceptedId === req.id
              const greyed = acceptedId && acceptedId !== req.id

              return (
                <div
                  key={req.id}
                  className={`bg-white rounded-2xl border-l-4 ${cfg.border} border-t border-r border-b border-gray-100 p-5 shadow-sm transition-opacity ${greyed ? 'opacity-40 pointer-events-none' : ''}`}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs bg-red-100 text-red-700 font-bold px-2 py-0.5 rounded-full">
                          {req.blood_group} NEEDED
                        </span>
                        <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${cfg.badge}`}>
                          {cfg.label}
                        </span>
                      </div>
                      <p className="font-semibold text-gray-800">{req.hospitals?.org_name}</p>
                      <p className="text-sm text-gray-500">{req.units} unit{req.units !== 1 ? 's' : ''} needed · {req.notes}</p>
                    </div>
                  </div>
                  <p className="text-xs text-gray-500 mb-1">⏱ Posted {timeAgo(req.created_at)}</p>
                  <a
                    href={`https://www.google.com/maps/search/${encodeURIComponent(req.hospitals?.org_name ?? '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 text-xs text-blue-600 hover:underline mb-4"
                  >
                    <span>📍</span> {req.hospitals?.address} <span className="text-gray-400">↗</span>
                  </a>
                  <button
                    onClick={() => !accepted && acceptRequest(req.id)}
                    className={`w-full py-2 rounded-lg text-sm font-semibold transition-colors ${accepted ? 'bg-green-600 text-white cursor-default' : 'bg-red-600 text-white hover:bg-red-700'}`}
                  >
                    {accepted ? '✓ Accepted' : 'Accept'}
                  </button>
                </div>
              )
            })}
          </div>

          {/* Sidebar */}
          <div className="space-y-4">
            <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
              <h3 className="font-bold text-gray-900 mb-4">Donation History</h3>
              {donations.length === 0 ? (
                <p className="text-sm text-gray-400">No donations yet.</p>
              ) : (
                <div className="space-y-3">
                  {donations.map((d) => (
                    <div key={d.id} className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center text-sm">✅</div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-800">{d.blood_requests?.hospitals?.org_name}</p>
                        <p className="text-xs text-gray-400">
                          {new Date(d.created_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })} · {d.blood_requests?.blood_group}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
              <h3 className="font-bold text-gray-900 mb-3">Quick Actions</h3>
              <div className="space-y-2">
                <Link href="/awareness" className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded-lg text-sm text-gray-600">
                  <span>📖</span> Read donation guide
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
