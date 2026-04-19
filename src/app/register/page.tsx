'use client'

import Link from 'next/link'
import { useState, useActionState } from 'react'
import { signUp } from '@/lib/actions/auth'

const BLOOD_GROUPS = ['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-']

export default function RegisterPage() {
  const [role, setRole] = useState<'donor' | 'hospital'>('donor')
  const [error, action, pending] = useActionState(signUp, null)
  const [lat, setLat] = useState('')
  const [lng, setLng] = useState('')
  const [locating, setLocating] = useState(false)

  function getLocation() {
    setLocating(true)
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setLat(pos.coords.latitude.toString())
        setLng(pos.coords.longitude.toString())
        setLocating(false)
      },
      () => setLocating(false)
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white border-b border-red-100 px-6 py-3 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <span className="text-2xl">🩸</span>
          <span className="font-bold text-xl text-red-600">BloodConnect</span>
        </Link>
        <Link href="/sign-in" className="text-sm text-red-600 font-medium hover:underline">
          Already registered? Sign in →
        </Link>
      </nav>

      <div className="max-w-2xl mx-auto px-4 py-10">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-extrabold text-gray-900">Create your account</h1>
          <p className="text-gray-500 text-sm mt-1">Join BloodConnect and help save lives</p>
        </div>

        {/* Role selector */}
        <div className="grid grid-cols-2 gap-4 mb-8">
          <button
            type="button"
            onClick={() => setRole('donor')}
            className={`rounded-2xl border-2 p-5 text-left transition-all ${role === 'donor' ? 'border-red-600 bg-red-50' : 'border-gray-200 bg-white hover:border-gray-300'}`}
          >
            <div className="text-2xl mb-2">🩸</div>
            <div className="font-bold text-gray-900">I&apos;m a Donor</div>
            <div className="text-xs text-gray-500 mt-1">Register to donate blood and save lives</div>
          </button>
          <button
            type="button"
            onClick={() => setRole('hospital')}
            className={`rounded-2xl border-2 p-5 text-left transition-all ${role === 'hospital' ? 'border-red-600 bg-red-50' : 'border-gray-200 bg-white hover:border-gray-300'}`}
          >
            <div className="text-2xl mb-2">🏥</div>
            <div className="font-bold text-gray-900">I&apos;m a Hospital</div>
            <div className="text-xs text-gray-500 mt-1">Register to post blood requests</div>
          </button>
        </div>

        {role === 'donor' && (
          <>
            {/* Eligibility checklist */}
            <div className="bg-green-50 border border-green-200 rounded-2xl p-5 mb-6">
              <h3 className="font-bold text-green-800 mb-3">Eligibility Checklist</h3>
              <div className="grid grid-cols-2 gap-2 text-sm text-green-700">
                {[
                  'Age 18–65 years',
                  'Weight ≥ 45 kg',
                  'Haemoglobin ≥ 12.5 g/dL',
                  'No donation in last 90 days',
                  'No fever or infection',
                  'No recent surgery or tattoo',
                  'No blood-borne disease',
                  'Not pregnant or breastfeeding',
                ].map((item) => (
                  <div key={item} className="flex items-center gap-2">
                    <span className="text-green-500">✓</span> {item}
                  </div>
                ))}
              </div>
            </div>

            <form action={action} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8 space-y-5">
              {error && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-sm text-red-700">{error}</div>
              )}
              <input type="hidden" name="role" value="donor" />
              <input type="hidden" name="lat" value={lat} />
              <input type="hidden" name="lng" value={lng} />

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                  <input name="first_name" type="text" required placeholder="Rahul"
                    className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-red-300" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                  <input name="last_name" type="text" required placeholder="Sharma"
                    className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-red-300" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Mobile Number</label>
                <div className="flex">
                  <span className="border border-r-0 border-gray-200 rounded-l-xl px-3 py-2.5 text-sm bg-gray-50 text-gray-500">+91</span>
                  <input name="mobile" type="tel" required placeholder="98765 43210"
                    className="flex-1 border border-gray-200 rounded-r-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-red-300" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                <input name="email" type="email" required placeholder="you@example.com"
                  className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-red-300" />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Date of Birth</label>
                  <input name="dob" type="date" required
                    className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-red-300" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Gender</label>
                  <select name="gender" required
                    className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-red-300">
                    <option value="">Select</option>
                    <option>Male</option>
                    <option>Female</option>
                    <option>Other</option>
                    <option>Prefer not to say</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Blood Group</label>
                <div className="grid grid-cols-4 gap-2">
                  {BLOOD_GROUPS.map((bg) => (
                    <label key={bg} className="cursor-pointer">
                      <input type="radio" name="blood_group" value={bg} required className="peer sr-only" />
                      <span className="block text-center border border-gray-200 rounded-xl py-2 text-sm font-semibold peer-checked:border-red-600 peer-checked:bg-red-50 peer-checked:text-red-700 hover:border-gray-300">
                        {bg}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
                <div className="relative">
                  <input name="city" type="text" required placeholder="New Delhi"
                    className="w-full border border-gray-200 rounded-xl px-4 py-2.5 pr-28 text-sm focus:outline-none focus:ring-2 focus:ring-red-300" />
                  <button
                    type="button"
                    onClick={getLocation}
                    className="absolute right-2 top-1.5 text-xs bg-gray-100 hover:bg-gray-200 px-3 py-1.5 rounded-lg text-gray-600"
                  >
                    {locating ? 'Locating…' : '📍 Use GPS'}
                  </button>
                </div>
                {lat && <p className="text-xs text-green-600 mt-1">Location captured ✓</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Availability Preference</label>
                <div className="grid grid-cols-2 gap-2">
                  {['Weekdays', 'Weekends', 'Emergencies Only', 'Any Time'].map((opt) => (
                    <label key={opt} className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer">
                      <input type="checkbox" name="availability" value={opt}
                        className="rounded border-gray-300 text-red-600 focus:ring-red-300" />
                      {opt}
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                <input name="password" type="password" required placeholder="Min. 8 characters"
                  className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-red-300" />
              </div>

              <label className="flex items-start gap-3 cursor-pointer">
                <input type="checkbox" required className="mt-0.5 rounded border-gray-300 text-red-600" />
                <span className="text-sm text-gray-600">
                  I confirm I meet the eligibility criteria and consent to being contacted for blood donation requests.
                </span>
              </label>

              <button type="submit" disabled={pending}
                className="w-full bg-red-600 text-white py-3 rounded-xl font-semibold hover:bg-red-700 transition-colors disabled:opacity-50">
                {pending ? 'Registering…' : 'Register as Donor'}
              </button>
            </form>
          </>
        )}

        {role === 'hospital' && (
          <form action={action} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8 space-y-5">
            {error && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-sm text-red-700">{error}</div>
            )}
            <input type="hidden" name="role" value="hospital" />

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Organisation Name</label>
              <input name="org_name" type="text" required placeholder="AIIMS Delhi"
                className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-red-300" />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
              <select name="org_type" required
                className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-red-300">
                <option value="">Select type</option>
                <option>Government Hospital</option>
                <option>Private Hospital</option>
                <option>Blood Bank</option>
                <option>Clinic</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Official Email</label>
              <input name="email" type="email" required placeholder="blood@hospital.org"
                className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-red-300" />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
              <input name="mobile" type="tel" required placeholder="+91 11 2658 8500"
                className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-red-300" />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
              <textarea name="address" required rows={3} placeholder="Ansari Nagar East, New Delhi — 110029"
                className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-red-300 resize-none" />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Blood Bank License No.</label>
              <input name="license_no" type="text" required placeholder="MH-BB-2024-00123"
                className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-red-300" />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
              <input name="password" type="password" required placeholder="Min. 8 characters"
                className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-red-300" />
            </div>

            <button type="submit" disabled={pending}
              className="w-full bg-red-600 text-white py-3 rounded-xl font-semibold hover:bg-red-700 transition-colors disabled:opacity-50">
              {pending ? 'Registering…' : 'Register as Hospital'}
            </button>
          </form>
        )}
      </div>
    </div>
  )
}
