import { apiRequest } from './client.js'

function toQuery(params) {
  const sp = new URLSearchParams()
  Object.entries(params || {}).forEach(([k, v]) => {
    if (v !== undefined && v !== null && v !== '') sp.set(k, String(v))
  })
  const q = sp.toString()
  return q ? `?${q}` : ''
}

export function fetchRecords(query) {
  return apiRequest(`/records/getall${toQuery(query)}`)
}

export function fetchRecordById(id) {
  return apiRequest(`/records/getbyid/${id}`)
}

export function createRecord(body) {
  return apiRequest('/records/create/', { method: 'POST', body })
}

export function updateRecord(id, body) {
  return apiRequest(`/records/update/${id}`, { method: 'PATCH', body })
}

export function deleteRecord(id) {
  return apiRequest(`/records/delete/${id}`, { method: 'DELETE' })
}
