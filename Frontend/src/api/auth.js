import { apiRequest, setToken } from './client.js'

export async function login({ email, password }) {
  const res = await apiRequest('/auth/login', {
    method: 'POST',
    body: { email, password },
  })
  return res.data
}

export async function register({ name, email, password, role }) {
  const res = await apiRequest('/auth/register', {
    method: 'POST',
    body: { name, email, password, role },
  })
  return res.data
}

export function persistSession(token, user) {
  setToken(token)
  localStorage.setItem('zorvyn_user', JSON.stringify(user))
}

export function clearSession() {
  setToken(null)
  localStorage.removeItem('zorvyn_user')
}

export function loadStoredUser() {
  try {
    const raw = localStorage.getItem('zorvyn_user')
    return raw ? JSON.parse(raw) : null
  } catch {
    return null
  }
}
