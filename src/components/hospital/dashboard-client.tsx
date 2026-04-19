'use client'

import { useState } from 'react'
import Link from 'next/link'
import { signOut } from '@/lib/actions/auth'

type Donor = { id: string; first_name: string; last_name: string; mobile: string }
type Acceptance = { id: string; status: 'accepted' | 'donated'; donor: Donor }
type Request = {
  id: string; blood_group: string; units: number; urgency: string; notes: string; created_at: string;
  acceptances: Acceptance[]
}
type Profile = { org_name: string }

export function HospitalDashboardClient({ profile, requests }: { profile: Profile; requests: Request[] }) {
  const [openRows, setOpenRows] = useState<Set<string>>(new Set())

  function toggleRow(id: string) {
    setOpenRows((prev) => {
      const next = new Set(prev)
      next.has(id) ? next.delete(id) : next.add(id)
      return next
    })
  }

  const activeCount = requests.length
  const matchedCount = requests.reduce((sum, r) => sum + r.acceptances.length, 0)
  const donatedToday = requests.reduce(
    (sum, r) => sum + r.acceptances.filter((a) => a.status === 'donated').length, 0
  )

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Nav */}
      <nav className="bg-white border-b border-red-100 px-6 py-3 flex items-center justify-between sticky top-0 z-40">
        <Link href="/" className="flex items-center gap-2">
          <span className="text-2xl">🩸</span>
          <span className="font-bold text-xl text-red-600">BloodConnect</span>
          <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full font-medium ml-1">Hospital</span>
        </Link>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-sm font-bold text-blue-700">🏥</div>
            <span className="text-sm font-medium text-gray-700">{profile.org_name}</span>
          </div>
          <form action={signOut}>
            <button type="submit" className="text-xs text-gray-400 hover:text-gray-600">Sign out</button>
          </form>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 gap-4">
          <div>
            <h1 className="text-2xl font-extrabold text-gray-900">Blood Management Dashboard</h1>
            <p className="text-gray-500 text-sm">{profile.org_name}</p>
          </div>
          <Link href="/hospital/blood-request"
            className="bg-red-600 text-white px-5 py-2.5 rounded-xl font-semibold text-sm hover:bg-red-700 shadow-md shadow-red-100">
            + New Blood Request
          </Link>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
            <p className="text-xs text-gray-400 font-medium uppercase tracking-wider mb-1">Active Requests</p>
            <p className="text-3xl font-extrabold text-red-600">{activeCount}</p>
          </div>
          <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
            <p className="text-xs text-gray-400 font-medium uppercase tracking-wider mb-1">Donors Matched</p>
            <p className="text-3xl font-extrabold text-green-600">{matchedCount}</p>
          </div>
          <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
            <p className="text-xs text-gray-400 font-medium uppercase tracking-wider mb-1">Daily Fulfillment</p>
            <p className="text-3xl font-extrabold text-gray-900">{donatedToday}</p>
          </div>
        </div>

        {/* Requests table */}
        <div className="space-y-4">
          <h2 className="font-bold text-gray-900">Active Blood Requests</h2>
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100 bg-gray-50">
                  <th className="text-left px-4 py-3 text-xs text-gray-400 font-semibold uppercase">Patient / Ward</th>
                  <th className="text-left px-4 py-3 text-xs text-gray-400 font-semibold uppercase">Blood</th>
                  <th className="text-left px-4 py-3 text-xs text-gray-400 font-semibold uppercase">Units</th>
                  <th className="text-left px-4 py-3 text-xs text-gray-400 font-semibold uppercase">Accepted Donors</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {requests.length === 0 && (
                  <tr>
                    <td colSpan={4} className="px-4 py-8 text-center text-gray-400 text-sm">
                      No active requests. Post your first blood request.
                    </td>
                  </tr>
                )}
                {requests.map((req) => {
                  const accepted = req.acceptances.filter((a) => a.status === 'accepted')
                  const donated = req.acceptances.filter((a) => a.status === 'donated')
                  const isOpen = openRows.has(req.id)

                  return (
                    <tr key={req.id} className="hover:bg-gray-50/50 align-top">
                      <td className="px-4 py-3">
                        <p className="font-medium text-gray-800">{req.notes}</p>
                        <p className="text-xs text-gray-400">{req.urgency}</p>
                      </td>
                      <td className="px-4 py-3">
                        <span className="font-bold text-red-600">{req.blood_group}</span>
                      </td>
                      <td className="px-4 py-3">{req.units}</td>
                      <td className="px-4 py-3">
                        {req.acceptances.length === 0 ? (
                          <span className="text-xs text-gray-400 italic">No donors yet — matching in progress</span>
                        ) : (
                          <>
                            <button
                              onClick={() => toggleRow(req.id)}
                              className="flex items-center gap-1 text-xs text-red-600 font-semibold hover:underline mb-1"
                            >
                              <span>{isOpen ? '▼' : '▶'}</span>
                              {req.acceptances.length} donor{req.acceptances.length !== 1 ? 's' : ''}
                            </button>
                            {isOpen && (
                              <table className="w-full text-xs border border-gray-100 rounded-lg overflow-hidden">
                                <thead>
                                  <tr className="bg-gray-50 border-b border-gray-100">
                                    <th className="text-left px-2 py-1.5 text-gray-400 font-semibold uppercase tracking-wide">Donor</th>
                                    <th className="text-left px-2 py-1.5 text-gray-400 font-semibold uppercase tracking-wide">Phone</th>
                                    <th className="text-left px-2 py-1.5 text-gray-400 font-semibold uppercase tracking-wide">Status</th>
                                  </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-50">
                                  {accepted.map((a) => (
                                    <tr key={a.id}>
                                      <td className="px-2 py-1.5 font-medium text-gray-700">{a.donor.first_name} {a.donor.last_name}</td>
                                      <td className="px-2 py-1.5 text-gray-400">{a.donor.mobile}</td>
                                      <td className="px-2 py-1.5"><span className="bg-blue-100 text-blue-700 font-semibold px-1.5 py-0.5 rounded-full">Accepted</span></td>
                                    </tr>
                                  ))}
                                  {donated.map((a) => (
                                    <tr key={a.id} className="opacity-60">
                                      <td className="px-2 py-1.5 font-medium text-gray-700">{a.donor.first_name} {a.donor.last_name}</td>
                                      <td className="px-2 py-1.5 text-gray-400">{a.donor.mobile}</td>
                                      <td className="px-2 py-1.5"><span className="bg-green-100 text-green-700 font-semibold px-1.5 py-0.5 rounded-full">Donated</span></td>
                                    </tr>
                                  ))}
                                </tbody>
                              </table>
                            )}
                          </>
                        )}
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}
