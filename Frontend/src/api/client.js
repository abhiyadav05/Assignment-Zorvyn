const TOKEN_KEY = 'zorvyn_token'

function apiUrl(path) {
  const base = (import.meta.env.VITE_API_URL || '').replace(/\/$/, '')
  const p = path.startsWith('/') ? path : `/${path}`

  // In local dev, route localhost API traffic through Vite proxy to avoid CORS.
  if (import.meta.env.DEV && base) {
    try {
      const url = new URL(base)
      if (url.hostname === 'localhost' || url.hostname === '127.0.0.1') {
        return `/api${p}`
      }
    } catch {
      // If env URL is invalid, fall back to proxy path below.
    }
  }

  return base ? `${base}/api${p}` : `/api${p}`
}

export function getToken() {
  return localStorage.getItem(TOKEN_KEY)
}

export function setToken(token) {
  if (token) localStorage.setItem(TOKEN_KEY, token)
  else localStorage.removeItem(TOKEN_KEY)
}

export async function apiRequest(path, options = {}) {
  const { body, method = 'GET', headers: extraHeaders = {} } = options
  const token = getToken()
  const headers = {
    'Content-Type': 'application/json',
    ...extraHeaders,
  }
  if (token) headers.Authorization = `Bearer ${token}`

  const res = await fetch(apiUrl(path), {
    method,
    headers,
    body: body !== undefined ? JSON.stringify(body) : undefined,
  })

  const data = await res.json().catch(() => ({}))
  if (!res.ok) {
    const msg = data.message || res.statusText || 'Request failed'
    const err = new Error(msg)
    err.status = res.status
    err.data = data
    throw err
  }
  return data
}
