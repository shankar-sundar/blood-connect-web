'use client'

import { useState } from 'react'
import Link from 'next/link'

const MYTHS = [
  {
    myth: '"Donating blood makes me weak and I\'ll need months to recover."',
    fact: 'Your body replenishes plasma within 24 hours and red blood cells within 4–6 weeks. Most donors feel completely normal within a few hours. A light snack and some rest is all you need!',
    icon: '💪',
  },
  {
    myth: '"I can catch diseases like HIV by donating blood."',
    fact: 'Absolutely impossible. Only sterile, single-use needles are used. They are opened in front of you and discarded immediately after. Blood donation cannot transmit any disease to the donor.',
    icon: '🛡️',
  },
  {
    myth: '"I have low blood pressure / diabetes, so I can\'t donate."',
    fact: 'People with well-controlled blood pressure and type 2 diabetes (on oral medication, not insulin) are eligible. A doctor screens you before every donation to confirm you\'re fit.',
    icon: '❤️‍🩹',
  },
  {
    myth: '"The process is painful and takes a very long time."',
    fact: 'The entire process from registration to donation takes about 30–45 minutes. The actual blood draw is just 8–10 minutes. Most people feel a tiny pinch at most.',
    icon: '⏱️',
  },
  {
    myth: '"Vegetarians/vegans can\'t donate because their blood is \'thin\'."',
    fact: 'Diet has no bearing on eligibility. Hemoglobin levels are tested on-site. Many of India\'s most regular donors are vegetarians!',
    icon: '🥗',
  },
]

const FAQS = [
  {
    q: 'How often can I donate blood?',
    a: 'Whole blood can be donated every 3 months (90 days). Platelets can be donated every 2 weeks. Plasma can be donated every 4 weeks. BloodConnect tracks your donation history and automatically tells you when you\'re next eligible.',
  },
  {
    q: 'What should I eat/avoid before donating?',
    a: 'Have a good meal 2–3 hours before (not immediately before). Drink plenty of water. Avoid fatty foods on the day of donation as it can affect blood tests. Avoid alcohol 24 hours before. Do NOT donate on an empty stomach.',
  },
  {
    q: 'Will my blood be tested for diseases?',
    a: 'Yes, every unit is tested for HIV, Hepatitis B, Hepatitis C, Malaria, Syphilis, and more. If any test is positive, you are confidentially notified and your blood is safely discarded. This is actually a free health screening benefit for donors.',
  },
  {
    q: 'Can I donate if I take medications?',
    a: 'It depends on the medication. Most common medications (multivitamins, blood pressure meds, antacids) are fine. Antibiotics require a 48-hour wait after completing the course. Blood thinners like warfarin are a temporary deferral. The on-site doctor will guide you.',
  },
  {
    q: "What's the process on donation day?",
    a: '1. Registration (5 min)\n2. Health screening — BP, pulse, hemoglobin (10 min)\n3. Blood donation — 8–10 minutes, comfortable recliner\n4. Rest & refreshments (15 min)\n5. Certificate issued + next eligibility date set\n\nTotal time: 45–60 minutes',
  },
  {
    q: 'Can women donate blood?',
    a: 'Absolutely. Women donate as frequently as men. Exceptions: do not donate during pregnancy or breastfeeding, or within 6 months of delivery. During menstruation, it\'s fine to donate if hemoglobin is adequate.',
  },
]

export default function AwarenessPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  return (
    <div className="bg-white min-h-screen font-sans">
      {/* Nav */}
      <nav className="bg-white border-b border-red-100 px-6 py-3 flex items-center justify-between sticky top-0 z-40">
        <Link href="/" className="flex items-center gap-2">
          <span className="text-2xl">🩸</span>
          <span className="font-bold text-xl text-red-600">BloodConnect</span>
        </Link>
        <div className="flex gap-3">
          <Link href="/sign-in" className="text-sm text-gray-600 hover:text-red-600 font-medium">Sign In</Link>
          <Link href="/register" className="text-sm bg-red-600 text-white px-4 py-1.5 rounded-lg font-medium hover:bg-red-700">Register</Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="bg-gradient-to-br from-red-50 to-white py-14 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <span className="text-4xl block mb-4">💡</span>
          <h1 className="text-4xl font-extrabold text-gray-900 mb-3">Know the Truth About Blood Donation</h1>
          <p className="text-gray-500 text-lg">Myths and misinformation stop 90% of eligible donors. Here&apos;s the truth.</p>
        </div>
      </section>

      {/* Myths vs Facts */}
      <section className="max-w-4xl mx-auto px-6 py-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">Busting Common Myths</h2>
        <div className="space-y-4">
          {MYTHS.map((m, i) => (
            <div key={i} className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
              <div className="flex">
                <div className="w-1.5 bg-red-500 flex-shrink-0" />
                <div className="p-5 flex-1">
                  <div className="flex items-start gap-4">
                    <div className="flex-1">
                      <span className="text-xs bg-red-100 text-red-700 font-bold px-2 py-0.5 rounded-full">MYTH</span>
                      <p className="font-semibold text-gray-800 my-2">{m.myth}</p>
                      <div className="flex items-start gap-2">
                        <span className="text-xs bg-green-100 text-green-700 font-bold px-2 py-0.5 rounded-full flex-shrink-0 mt-0.5">FACT</span>
                        <p className="text-sm text-gray-600">{m.fact}</p>
                      </div>
                    </div>
                    <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center text-2xl flex-shrink-0">{m.icon}</div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FAQs */}
      <section className="max-w-3xl mx-auto px-6 py-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">Frequently Asked Questions</h2>
        <div className="space-y-3">
          {FAQS.map((faq, i) => (
            <div key={i} className="bg-white rounded-xl border border-gray-200 overflow-hidden">
              <button
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
                className="w-full px-5 py-4 text-left flex items-center justify-between font-semibold text-gray-800 hover:bg-gray-50"
              >
                {faq.q}
                <span className={`text-gray-400 transition-transform duration-200 ${openFaq === i ? 'rotate-180' : ''}`}>▼</span>
              </button>
              {openFaq === i && (
                <div className="px-5 pb-4 text-sm text-gray-600 whitespace-pre-line">{faq.a}</div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Benefits */}
      <section className="bg-gray-900 text-white py-12 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-center mb-8">Benefits of Donating Blood</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-4xl mb-3">❤️</div>
              <h3 className="font-bold mb-2">Heart Health</h3>
              <p className="text-gray-400 text-sm">Regular donation reduces iron levels, lowering risk of cardiovascular disease by up to 33%.</p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-3">🔬</div>
              <h3 className="font-bold mb-2">Free Health Check</h3>
              <p className="text-gray-400 text-sm">Every donation includes BP, hemoglobin, and 5 disease screenings — at no cost to you.</p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-3">🧠</div>
              <h3 className="font-bold mb-2">Mental Wellbeing</h3>
              <p className="text-gray-400 text-sm">Studies show regular donors report higher happiness and a stronger sense of purpose.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 px-6 text-center bg-red-600 text-white">
        <h2 className="text-2xl font-bold mb-3">Ready to save a life today?</h2>
        <p className="text-red-200 mb-6">Takes 2 minutes to register. Someone near you needs your blood right now.</p>
        <Link href="/register" className="bg-white text-red-600 font-bold px-8 py-3 rounded-xl hover:bg-red-50 inline-block">
          Register as Donor
        </Link>
      </section>
    </div>
  )
}
