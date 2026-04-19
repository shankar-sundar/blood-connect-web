import Link from 'next/link'

export default function LandingPage() {
  return (
    <div className="bg-white font-sans">

      {/* Nav */}
      <nav className="fixed top-0 w-full bg-white/95 backdrop-blur border-b border-red-100 z-50">
        <div className="max-w-6xl mx-auto px-6 py-3 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl">🩸</span>
            <span className="font-bold text-xl text-red-600">BloodConnect</span>
          </Link>
          <div className="flex items-center gap-3 text-sm font-medium">
            <Link href="/awareness" className="text-gray-600 hover:text-red-600 hidden md:block">
              Awareness
            </Link>
            <Link href="/sign-in" className="border border-red-600 text-red-600 px-4 py-2 rounded-lg hover:bg-red-50">
              Sign In
            </Link>
            <Link href="/register" className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700">
              Register
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="pt-24 pb-16 bg-gradient-to-br from-red-50 via-white to-red-50">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-flex items-center gap-2 bg-red-100 text-red-700 text-sm font-semibold px-3 py-1 rounded-full mb-4">
              <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
              47 urgent requests near you right now
            </div>
            <h1 className="text-5xl font-extrabold text-gray-900 leading-tight mb-4">
              Every <span className="text-red-600">3 seconds</span>,<br />
              someone in India needs blood.
            </h1>
            <p className="text-lg text-gray-500 mb-8">
              BloodConnect actively matches donors with recipients in real-time — because passive discovery costs lives.
            </p>
            <div className="flex gap-3">
              <Link href="/register" className="bg-red-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-red-700 transition-colors">
                Register as Donor
              </Link>
              <Link href="/register" className="border border-red-600 text-red-600 px-6 py-3 rounded-xl font-semibold hover:bg-red-50 transition-colors">
                Register as Hospital
              </Link>
            </div>
          </div>

          {/* Live feed card */}
          <div className="relative">
            <div className="bg-white rounded-2xl shadow-xl p-6 border border-red-100">
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4">Live Activity Feed</p>
              <div className="space-y-3">
                <div className="flex items-center gap-3 p-3 bg-red-50 rounded-lg">
                  <span className="text-xl">🔴</span>
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-gray-800">O- needed urgently</p>
                    <p className="text-xs text-gray-500">AIIMS Delhi · 2 units · 3 min ago</p>
                  </div>
                  <span className="text-xs bg-red-600 text-white px-2 py-1 rounded-full">URGENT</span>
                </div>
                <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
                  <span className="text-xl">✅</span>
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-gray-800">Donor matched for B+</p>
                    <p className="text-xs text-gray-500">Fortis Mumbai · Life saved · 8 min ago</p>
                  </div>
                  <span className="text-xs bg-green-600 text-white px-2 py-1 rounded-full">MATCHED</span>
                </div>
                <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
                  <span className="text-xl">🏥</span>
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-gray-800">Apollo Bangalore registered</p>
                    <p className="text-xs text-gray-500">New hospital partner · 12 min ago</p>
                  </div>
                  <span className="text-xs bg-blue-600 text-white px-2 py-1 rounded-full">NEW</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats bar */}
      <section className="py-12 bg-red-600">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 text-center text-white">
          <div>
            <p className="text-4xl font-extrabold">4.3M</p>
            <p className="text-red-200 text-sm mt-1">Deaths/year from blood shortage</p>
          </div>
          <div>
            <p className="text-4xl font-extrabold">2.1L+</p>
            <p className="text-red-200 text-sm mt-1">Registered donors</p>
          </div>
          <div>
            <p className="text-4xl font-extrabold">98%</p>
            <p className="text-red-200 text-sm mt-1">Match success rate</p>
          </div>
          <div>
            <p className="text-4xl font-extrabold">&lt;15min</p>
            <p className="text-red-200 text-sm mt-1">Average match time</p>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-2">How BloodConnect Works</h2>
          <p className="text-center text-gray-500 mb-12">Active matching, not passive listing</p>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: '📋', title: '1. Register in 2 min', desc: 'Donors register once. Hospitals post real-time requests with location and urgency.' },
              { icon: '⚡', title: '2. Instant Match', desc: 'Our engine matches blood type, proximity, and availability — sending alerts to eligible donors.' },
              { icon: '❤️', title: '3. Donate & Save', desc: 'Donor confirms, navigates to the center, donates. Status tracked in real-time until completion.' },
            ].map((step) => (
              <div key={step.title} className="text-center p-6 rounded-2xl border border-gray-100 hover:border-red-200 hover:shadow-lg transition-all">
                <div className="w-14 h-14 bg-red-100 rounded-2xl flex items-center justify-center text-2xl mx-auto mb-4">
                  {step.icon}
                </div>
                <h3 className="font-bold text-lg mb-2">{step.title}</h3>
                <p className="text-gray-500 text-sm">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gray-900 text-white text-center">
        <div className="max-w-2xl mx-auto px-6">
          <h2 className="text-3xl font-bold mb-4">One donation saves up to 3 lives.</h2>
          <p className="text-gray-400 mb-8">Join 2 lakh+ donors already on BloodConnect. Takes 2 minutes to register.</p>
          <Link href="/register" className="bg-red-600 text-white px-8 py-3 rounded-xl font-semibold hover:bg-red-700 transition-colors">
            Join BloodConnect
          </Link>
        </div>
      </section>

    </div>
  )
}
