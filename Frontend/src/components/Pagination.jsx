export function Pagination({ page, pages, onPageChange, disabled }) {
  if (pages <= 1) return null
  return (
    <div className="mt-4 flex flex-wrap items-center justify-center gap-3 text-sm text-slate-400">
      <button
        type="button"
        disabled={disabled || page <= 1}
        onClick={() => onPageChange(page - 1)}
        className="rounded-lg border border-slate-700 px-3 py-1.5 hover:bg-slate-800 disabled:opacity-40"
      >
        Previous
      </button>
      <span>
        Page {page} of {pages}
      </span>
      <button
        type="button"
        disabled={disabled || page >= pages}
        onClick={() => onPageChange(page + 1)}
        className="rounded-lg border border-slate-700 px-3 py-1.5 hover:bg-slate-800 disabled:opacity-40"
      >
        Next
      </button>
    </div>
  )
}
