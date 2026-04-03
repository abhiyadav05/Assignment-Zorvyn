function formatMoney(n) {
  if (n == null || Number.isNaN(n)) return '—'
  return new Intl.NumberFormat(undefined, {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(n)
}

export function RecordDetailModal({ record, onClose }) {
  if (!record) return null
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4"
      role="dialog"
      aria-modal="true"
    >
      <div className="w-full max-w-md rounded-xl border border-slate-700 bg-slate-900 p-6 shadow-xl">
        <div className="mb-4 flex items-start justify-between gap-4">
          <h2 className="text-lg font-semibold text-slate-100">Record details</h2>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-1 text-slate-400 hover:bg-slate-800 hover:text-slate-200"
            aria-label="Close"
          >
            ✕
          </button>
        </div>
        <dl className="space-y-3 text-sm">
          <div className="flex justify-between gap-4">
            <dt className="text-slate-500">Date</dt>
            <dd className="text-slate-200">
              {record.date
                ? new Date(record.date).toLocaleString()
                : '—'}
            </dd>
          </div>
          <div className="flex justify-between gap-4">
            <dt className="text-slate-500">Type</dt>
            <dd
              className={
                record.type === 'income' ? 'text-emerald-400' : 'text-rose-400'
              }
            >
              {record.type}
            </dd>
          </div>
          <div className="flex justify-between gap-4">
            <dt className="text-slate-500">Category</dt>
            <dd className="text-slate-200">{record.category}</dd>
          </div>
          <div className="flex justify-between gap-4">
            <dt className="text-slate-500">Amount</dt>
            <dd className="font-medium text-slate-100">
              {formatMoney(record.amount)}
            </dd>
          </div>
          {record.notes ? (
            <div>
              <dt className="text-slate-500">Notes</dt>
              <dd className="mt-1 text-slate-300">{record.notes}</dd>
            </div>
          ) : null}
        </dl>
      </div>
    </div>
  )
}
