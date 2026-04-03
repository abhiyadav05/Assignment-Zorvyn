import { useState } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'

export function Register() {
  const { register, isAuthenticated, user, pathForRole } = useAuth()
  const navigate = useNavigate()

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [roleChoice, setRoleChoice] = useState('viewer')
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)

  if (isAuthenticated) {
    return <Navigate to={pathForRole(user.role)} replace />
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setError(null)
    setLoading(true)
    try {
      await register({ name, email, password, role: roleChoice })
      navigate('/login', {
        replace: true,
        state: {
          registered: true,
          roleChoice,
        },
      })
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-950 px-4 py-12">
      <div className="w-full max-w-md rounded-2xl border border-slate-800 bg-slate-900/80 p-8 shadow-xl">
        <h1 className="text-2xl font-semibold text-slate-50">Create account</h1>
        <p className="mt-2 text-sm text-slate-400">
          Public registration is for viewer or analyst access only. Admin accounts
          are created by an existing administrator.
        </p>
        <div className="mt-4 rounded-lg border border-emerald-900/40 bg-emerald-950/30 px-3 py-2 text-xs text-emerald-200/90">
          Select viewer or analyst while registering. Admin accounts can only be
          created by an existing administrator.
        </div>
        {error ? (
          <p className="mt-4 rounded-lg bg-rose-950/50 px-3 py-2 text-sm text-rose-300">
            {error}
          </p>
        ) : null}
        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <label className="block text-sm text-slate-400">
            Name
            <input
              required
              type="text"
              autoComplete="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1 w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-slate-100"
            />
          </label>
          <label className="block text-sm text-slate-400">
            Email
            <input
              required
              type="email"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-slate-100"
            />
          </label>
          <label className="block text-sm text-slate-400">
            Password
            <input
              required
              minLength={6}
              type="password"
              autoComplete="new-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-slate-100"
            />
          </label>
          <fieldset>
            <legend className="text-sm text-slate-400">Account type</legend>
            <div className="mt-2 flex gap-4">
              <label className="flex cursor-pointer items-center gap-2 text-sm text-slate-300">
                <input
                  type="radio"
                  name="role"
                  checked={roleChoice === 'viewer'}
                  onChange={() => setRoleChoice('viewer')}
                  className="text-emerald-500"
                />
                Viewer
              </label>
              <label className="flex cursor-pointer items-center gap-2 text-sm text-slate-300">
                <input
                  type="radio"
                  name="role"
                  checked={roleChoice === 'analyst'}
                  onChange={() => setRoleChoice('analyst')}
                  className="text-emerald-500"
                />
                Analyst
              </label>
            </div>
          </fieldset>
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-emerald-600 py-2.5 text-sm font-semibold text-white hover:bg-emerald-500 disabled:opacity-50"
          >
            {loading ? 'Creating…' : 'Create account'}
          </button>
        </form>
        <p className="mt-6 text-center text-sm text-slate-500">
          Already have an account?{' '}
          <Link to="/login" className="text-emerald-400 hover:underline">
            Log in
          </Link>
        </p>
        <p className="mt-4 text-center">
          <Link to="/" className="text-sm text-slate-500 hover:text-slate-400">
            ← Home
          </Link>
        </p>
      </div>
    </div>
  )
}
