export function RecordFilters({ filters, onChange, onReset, disabled }) {
  return (
    <div className="flex flex-wrap items-end gap-3 rounded-xl border border-slate-800 bg-slate-900/40 p-4">
      <label className="flex flex-col gap-1 text-xs text-slate-400">
        Type
        <select
          disabled={disabled}
          value={filters.type}
          onChange={(e) => onChange('type', e.target.value)}
          className="rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-slate-200"
        >
          <option value="">All</option>
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>
      </label>
      <label className="flex min-w-[140px] flex-col gap-1 text-xs text-slate-400">
        Category
        <input
          disabled={disabled}
          type="text"
          placeholder="Filter"
          value={filters.category}
          onChange={(e) => onChange('category', e.target.value)}
          className="rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-slate-200"
        />
      </label>
      <label className="flex flex-col gap-1 text-xs text-slate-400">
        From
        <input
          disabled={disabled}
          type="date"
          value={filters.startDate}
          onChange={(e) => onChange('startDate', e.target.value)}
          className="rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-slate-200"
        />
      </label>
      <label className="flex flex-col gap-1 text-xs text-slate-400">
        To
        <input
          disabled={disabled}
          type="date"
          value={filters.endDate}
          onChange={(e) => onChange('endDate', e.target.value)}
          className="rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-slate-200"
        />
      </label>
      <button
        type="button"
        disabled={disabled}
        onClick={onReset}
        className="rounded-lg border border-slate-600 px-3 py-2 text-sm text-slate-300 hover:bg-slate-800"
      >
        Reset
      </button>
    </div>
  )
}
