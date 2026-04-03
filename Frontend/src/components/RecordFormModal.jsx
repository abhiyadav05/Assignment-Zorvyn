import { useEffect, useState } from 'react'

const empty = {
  amount: '',
  type: 'expense',
  category: '',
  date: '',
  notes: '',
}

function toInputDate(iso) {
  if (!iso) return ''
  const d = new Date(iso)
  if (Number.isNaN(d.getTime())) return ''
  return d.toISOString().slice(0, 10)
}

export function RecordFormModal({ title, initial, onSubmit, onClose }) {
  const [values, setValues] = useState(empty)
  const [saving, setSaving] = useState(false)
  const [err, setErr] = useState(null)

  useEffect(() => {
    if (initial) {
      setValues({
        amount: String(initial.amount ?? ''),
        type: initial.type || 'expense',
        category: initial.category || '',
        date: toInputDate(initial.date) || toInputDate(new Date().toISOString()),
        notes: initial.notes || '',
      })
    } else {
      setValues({
        ...empty,
        date: toInputDate(new Date().toISOString()),
      })
    }
  }, [initial])

  async function handleSubmit(e) {
    e.preventDefault()
    setErr(null)
    setSaving(true)
    try {
      const body = {
        amount: Number(values.amount),
        type: values.type,
        category: values.category.trim(),
        date: new Date(values.date).toISOString(),
      }
      if (values.notes.trim()) body.notes = values.notes.trim()
      await onSubmit(body)
      onClose()
    } catch (error) {
      setErr(error.message)
    } finally {
      setSaving(false)
    }
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4"
      role="dialog"
      aria-modal="true"
    >
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md rounded-xl border border-slate-700 bg-slate-900 p-6 shadow-xl"
      >
        <div className="mb-4 flex items-start justify-between gap-4">
          <h2 className="text-lg font-semibold text-slate-100">{title}</h2>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-1 text-slate-400 hover:bg-slate-800"
          >
            ✕
          </button>
        </div>
        {err ? (
          <p className="mb-3 rounded-lg bg-rose-950/50 px-3 py-2 text-sm text-rose-300">
            {err}
          </p>
        ) : null}
        <div className="space-y-3">
          <label className="block text-xs text-slate-400">
            Amount
            <input
              required
              type="number"
              step="0.01"
              min="0"
              value={values.amount}
              onChange={(e) =>
                setValues((v) => ({ ...v, amount: e.target.value }))
              }
              className="mt-1 w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-slate-200"
            />
          </label>
          <label className="block text-xs text-slate-400">
            Type
            <select
              value={values.type}
              onChange={(e) =>
                setValues((v) => ({ ...v, type: e.target.value }))
              }
              className="mt-1 w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-slate-200"
            >
              <option value="income">Income</option>
              <option value="expense">Expense</option>
            </select>
          </label>
          <label className="block text-xs text-slate-400">
            Category
            <input
              required
              type="text"
              value={values.category}
              onChange={(e) =>
                setValues((v) => ({ ...v, category: e.target.value }))
              }
              className="mt-1 w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-slate-200"
            />
          </label>
          <label className="block text-xs text-slate-400">
            Date
            <input
              required
              type="date"
              value={values.date}
              onChange={(e) =>
                setValues((v) => ({ ...v, date: e.target.value }))
              }
              className="mt-1 w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-slate-200"
            />
          </label>
          <label className="block text-xs text-slate-400">
            Notes (optional)
            <textarea
              rows={2}
              value={values.notes}
              onChange={(e) =>
                setValues((v) => ({ ...v, notes: e.target.value }))
              }
              className="mt-1 w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-slate-200"
            />
          </label>
        </div>
        <div className="mt-6 flex justify-end gap-2">
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg border border-slate-600 px-4 py-2 text-sm text-slate-300 hover:bg-slate-800"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={saving}
            className="rounded-lg bg-emerald-600 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-500 disabled:opacity-50"
          >
            {saving ? 'Saving…' : 'Save'}
          </button>
        </div>
      </form>
    </div>
  )
}
