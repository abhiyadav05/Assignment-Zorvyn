import { useCallback, useEffect, useState } from 'react'
import { fetchRecords } from '../api/records.js'

const defaultFilters = {
  type: '',
  category: '',
  startDate: '',
  endDate: '',
  page: 1,
  limit: 10,
}

export function useRecords() {
  const [filters, setFilters] = useState(defaultFilters)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [payload, setPayload] = useState({
    records: [],
    total: 0,
    page: 1,
    pages: 0,
  })

  const load = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const res = await fetchRecords(filters)
      const d = res.data
      setPayload({
        records: d.records || [],
        total: d.total ?? 0,
        page: d.page ?? 1,
        pages: d.pages ?? 0,
      })
    } catch (e) {
      setError(e.message)
    } finally {
      setLoading(false)
    }
  }, [filters])

  useEffect(() => {
    load()
  }, [load])

  const setPage = (page) => setFilters((f) => ({ ...f, page }))
  const updateFilter = (key, value) =>
    setFilters((f) => ({ ...f, [key]: value, page: 1 }))
  const resetFilters = () => setFilters(defaultFilters)

  return {
    ...payload,
    filters,
    loading,
    error,
    reload: load,
    setPage,
    updateFilter,
    resetFilters,
  }
}
