import { useCallback, useEffect, useState } from 'react'
import {
  fetchCategoryWise,
  fetchRecent,
  fetchSummary,
  fetchTrends,
} from '../api/dashboard.js'

export function useDashboardData() {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [summary, setSummary] = useState(null)
  const [categoryWise, setCategoryWise] = useState([])
  const [trends, setTrends] = useState([])
  const [recent, setRecent] = useState([])

  const load = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const [s, c, t, r] = await Promise.all([
        fetchSummary(),
        fetchCategoryWise(),
        fetchTrends(),
        fetchRecent(),
      ])
      setSummary(s.data)
      setCategoryWise(c.data || [])
      setTrends(t.data || [])
      setRecent(r.data || [])
    } catch (e) {
      setError(e.message)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    load()
  }, [load])

  return {
    loading,
    error,
    summary,
    categoryWise,
    trends,
    recent,
    reload: load,
  }
}
