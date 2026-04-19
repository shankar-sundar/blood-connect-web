'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'

const BLOOD_GROUPS = ['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-']
const COMPONENTS = ['Whole Blood', 'Packed RBCs', 'Platelets', 'Fresh Frozen Plasma', 'Cryoprecipitate']
const URGENCY_OPTIONS = [
  { value: 'critical', label: 'Critical', desc: 'Needed within 2 hours', rank: 1 },
  { value: 'urgent', label: 'Urgent', desc: 'Needed within 24 hours', rank: 2 },
  { value: 'scheduled', label: 'Scheduled', desc: 'Planned surgery/procedure', rank: 3 },
]

export function BloodRequestForm({ hospitalId }: { hospitalId: string }) {
  const router = useRouter()
  const [urgency, setUrgency] = useState('urgent')
  const [bloodGroup, setBloodGroup] = useState('')
  const [submitting, setSubmitting] = useState(false)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setSubmitting(true)
    const form = new FormData(e.currentTarget)
    const supabase = createClient()

    const selectedUrgency = URGENCY_OPTIONS.find((o) => o.value === urgency)!

    await supabase.from('blood_requests').insert({
      hospital_id: hospitalId,
      blood_group: bloodGroup,
      units: parseInt(form.get('units') as string),
      component: form.get('component'),
      urgency: urgency,
      urgency_rank: selectedUrgency.rank,
      notes: form.get('notes'),
      status: 'open',
    })

    router.push('/hospital/dashboard')
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white border-b border-red-100 px-6 py-3 flex items-center justify-between sticky top-0 z-40">
        <Link href="/" className="flex items-center gap-2">
          <span className="text-2xl">🩸</span>
          <span className="font-bold text-xl text-red-600">BloodConnect</span>
        </Link>
      </nav>

      <div className="max-w-2xl mx-auto px-6 py-10">
        <div className="mb-6">
          <Link href="/hospital/dashboard" className="text-sm text-gray-500 hover:text-gray-700">
            ← Back to Dashboard
          </Link>
        </div>

        <div className="mb-8">
          <h1 className="text-2xl font-extrabold text-gray-900">New Blood Request</h1>
          <p className="text-gray-500 text-sm mt-1">
            Post a request and we&apos;ll match &amp; notify eligible donors immediately.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Urgency */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
            <h2 className="font-bold text-gray-900 mb-4">Urgency Level</h2>
            <div className="grid grid-cols-3 gap-3">
              {URGENCY_OPTIONS.map((opt) => (
                <label key={opt.value} className="cursor-pointer">
                  <input type="radio" name="urgency" value={opt.value} checked={urgency === opt.value}
                    onChange={() => setUrgency(opt.value)} className="sr-only" />
                  <div className={`rounded-xl border-2 p-3 text-center transition-all ${
                    urgency === opt.value
                      ? opt.value === 'critical' ? 'border-red-600 bg-red-50'
                        : opt.value === 'urgent' ? 'border-orange-500 bg-orange-50'
                        : 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}>
                    <p className="font-bold text-sm text-gray-900">{opt.label}</p>
                    <p className="text-xs text-gray-500 mt-0.5">{opt.desc}</p>
                  </div>
                </label>
              ))}
            </div>
          </div>

          {/* Blood details */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 space-y-5">
            <h2 className="font-bold text-gray-900">Blood Requirements</h2>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Blood Group</label>
              <div className="grid grid-cols-4 gap-2">
                {BLOOD_GROUPS.map((bg) => (
                  <label key={bg} className="cursor-pointer">
                    <input type="radio" name="blood_group" value={bg} checked={bloodGroup === bg}
                      onChange={() => setBloodGroup(bg)} required className="sr-only" />
                    <span className={`block text-center border rounded-xl py-2 text-sm font-semibold transition-all ${
                      bloodGroup === bg ? 'border-red-600 bg-red-50 text-red-700' : 'border-gray-200 hover:border-gray-300'
                    }`}>
                      {bg}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Units Required</label>
                <input name="units" type="number" min={1} max={10} required defaultValue={1}
                  className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-red-300" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Blood Component</label>
                <select name="component" required
                  className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-red-300">
                  <option value="">Select</option>
                  {COMPONENTS.map((c) => <option key={c}>{c}</option>)}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Patient / Ward Notes</label>
              <input name="notes" type="text" placeholder="e.g. Trauma Ward · Surgery in 90 min"
                className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-red-300" />
            </div>
          </div>

          <button
            type="submit"
            disabled={submitting || !bloodGroup}
            className="w-full bg-red-600 text-white py-3 rounded-xl font-semibold hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {submitting ? 'Posting…' : 'Post Blood Request'}
          </button>
        </form>
      </div>
    </div>
  )
}
