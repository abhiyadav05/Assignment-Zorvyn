/* eslint-disable react-refresh/only-export-components -- context + hook pattern */
import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react'
import {
  clearSession,
  loadStoredUser,
  login as loginApi,
  persistSession,
  register as registerApi,
} from '../api/auth.js'
import { getToken } from '../api/client.js'

const AuthContext = createContext(null)

const ROLE_HOME = {
  admin: '/admin',
  analyst: '/analyst',
  viewer: '/viewer',
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => loadStoredUser())
  const [token, setTokenState] = useState(() => getToken())

  const login = useCallback(async (email, password) => {
    const { user: u, token: t } = await loginApi({ email, password })
    persistSession(t, u)
    setUser(u)
    setTokenState(t)
    return u
  }, [])

  const register = useCallback(async (payload) => {
    const u = await registerApi(payload)
    return u
  }, [])

  const logout = useCallback(() => {
    clearSession()
    setUser(null)
    setTokenState(null)
  }, [])

  const pathForRole = useCallback((role) => ROLE_HOME[role] || '/viewer', [])

  const value = useMemo(
    () => ({
      user,
      token,
      isAuthenticated: Boolean(token && user),
      login,
      register,
      logout,
      pathForRole,
    }),
    [user, token, login, register, logout, pathForRole]
  )

  return (
    <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
