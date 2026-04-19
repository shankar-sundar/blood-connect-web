import Link from 'next/link'
import { signOut } from '@/lib/actions/auth'

export function Nav({ role }: { role?: 'donor' | 'hospital' }) {
  return (
    <nav className="bg-white border-b border-red-100 px-6 py-3 flex items-center justify-between sticky top-0 z-40">
      <Link href="/" className="flex items-center gap-2">
        <span className="text-2xl">🩸</span>
        <span className="font-bold text-xl text-red-600">BloodConnect</span>
      </Link>
      {role ? (
        <div className="flex items-center gap-4">
          <form action={signOut}>
            <button type="submit" className="text-sm text-gray-500 hover:text-gray-700">
              Sign out
            </button>
          </form>
        </div>
      ) : (
        <div className="flex items-center gap-3">
          <Link href="/sign-in" className="border border-red-600 text-red-600 px-4 py-2 rounded-lg text-sm font-medium hover:bg-red-50">
            Sign In
          </Link>
          <Link href="/register" className="bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-red-700">
            Register
          </Link>
        </div>
      )}
    </nav>
  )
}
