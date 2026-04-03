import { apiRequest } from './client.js'

export function fetchSummary() {
  return apiRequest('/dashboard/summary')
}

export function fetchCategoryWise() {
  return apiRequest('/dashboard/category-wise')
}

export function fetchTrends() {
  return apiRequest('/dashboard/trends')
}

export function fetchRecent() {
  return apiRequest('/dashboard/recent')
}
