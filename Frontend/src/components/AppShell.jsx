import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'

export function AppShell({ title, subtitle, children }) {
  const { user, logout, pathForRole } = useAuth()
  const home = pathForRole(user.role)

  return (
    <div className="min-h-screen bg-slate-950">
      <header className="border-b border-slate-800 bg-slate-900/80 backdrop-blur">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-4 py-4">
          <div>
            <Link
              to={home}
              className="text-lg font-semibold tracking-tight text-emerald-400"
            >
              Zorvyn Finance
            </Link>
            {title && (
              <p className="mt-1 text-sm text-slate-400">
                {title}
                {subtitle && (
                  <span className="text-slate-500"> · {subtitle}</span>
                )}
              </p>
            )}
          </div>
          <div className="flex items-center gap-3 text-sm">
            <span className="rounded-full bg-slate-800 px-3 py-1 text-slate-300">
              {user.name}
              <span className="ml-2 text-emerald-400/90">({user.role})</span>
            </span>
            <button
              type="button"
              onClick={logout}
              className="rounded-lg border border-slate-600 px-3 py-1.5 text-slate-200 transition hover:bg-slate-800"
            >
              Log out
            </button>
          </div>
        </div>
      </header>
      <main className="mx-auto max-w-6xl px-4 py-8">{children}</main>
    </div>
  )
}
