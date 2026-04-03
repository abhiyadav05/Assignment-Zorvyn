import { apiRequest } from './client.js'

export function createAdmin(body) {
  return apiRequest('/users/create-admin', { method: 'POST', body })
}
