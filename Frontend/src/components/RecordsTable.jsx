function formatMoney(n) {
  if (n == null || Number.isNaN(n)) return '—'
  return new Intl.NumberFormat(undefined, {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(n)
}

export function RecordsTable({
  records,
  loading,
  error,
  onRowClick,
  actions,
}) {
  if (error) {
    return (
      <div className="rounded-xl border border-rose-900/50 bg-rose-950/30 p-4 text-sm text-rose-300">
        {error}
      </div>
    )
  }

  return (
    <div className="overflow-hidden rounded-xl border border-slate-800">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[640px] text-left text-sm">
          <thead className="bg-slate-900/80 text-xs uppercase text-slate-500">
            <tr>
              <th className="px-4 py-3">Date</th>
              <th className="px-4 py-3">Type</th>
              <th className="px-4 py-3">Category</th>
              <th className="px-4 py-3 text-right">Amount</th>
              {actions ? <th className="px-4 py-3 text-right">Actions</th> : null}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800">
            {loading ? (
              <tr>
                <td
                  colSpan={actions ? 5 : 4}
                  className="px-4 py-8 text-center text-slate-500"
                >
                  Loading…
                </td>
              </tr>
            ) : records.length === 0 ? (
              <tr>
                <td
                  colSpan={actions ? 5 : 4}
                  className="px-4 py-8 text-center text-slate-500"
                >
                  No records match your filters
                </td>
              </tr>
            ) : (
              records.map((r) => (
                <tr
                  key={r._id}
                  className={`bg-slate-950/40 ${onRowClick ? 'cursor-pointer hover:bg-slate-900/60' : ''}`}
                  onClick={() => onRowClick?.(r)}
                >
                  <td className="px-4 py-3 text-slate-300">
                    {r.date ? new Date(r.date).toLocaleDateString() : '—'}
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={
                        r.type === 'income'
                          ? 'text-emerald-400'
                          : 'text-rose-400'
                      }
                    >
                      {r.type}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-slate-200">{r.category}</td>
                  <td className="px-4 py-3 text-right font-medium text-slate-100">
                    {formatMoney(r.amount)}
                  </td>
                  {actions ? (
                    <td
                      className="px-4 py-3 text-right"
                      onClick={(e) => e.stopPropagation()}
                    >
                      {actions(r)}
                    </td>
                  ) : null}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
