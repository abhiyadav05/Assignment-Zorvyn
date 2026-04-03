import { Link, Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'

export function Landing() {
  const { isAuthenticated, user, pathForRole } = useAuth()

  if (isAuthenticated) {
    return <Navigate to={pathForRole(user.role)} replace />
  }

  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
      <div className="mx-auto flex max-w-3xl flex-1 flex-col items-center justify-center px-6 text-center">
        <p className="text-sm font-medium uppercase tracking-[0.2em] text-emerald-500/90">
          Finance dashboard
        </p>
        <h1 className="mt-4 text-4xl font-semibold tracking-tight text-slate-50 sm:text-5xl">
          Zorvyn
        </h1>
        <p className="mt-4 max-w-xl text-lg text-slate-400">
          Sign in to view your records and analytics. Self-service registration is
          available for viewer and analyst roles; administrators manage the system
          separately.
        </p>
        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <Link
            to="/login"
            className="rounded-xl bg-emerald-600 px-8 py-3 text-sm font-semibold text-white shadow-lg shadow-emerald-900/30 transition hover:bg-emerald-500"
          >
            Log in
          </Link>
          <Link
            to="/register"
            className="rounded-xl border border-slate-600 bg-slate-900/50 px-8 py-3 text-sm font-semibold text-slate-200 transition hover:bg-slate-800"
          >
            Create account
          </Link>
        </div>
      </div>
      <footer className="py-6 text-center text-xs text-slate-600">
        Run the backend on port 5000 and the Vite dev proxy will forward /api
        requests.
      </footer>
    </div>
  )
}
