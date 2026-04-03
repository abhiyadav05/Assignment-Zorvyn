import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'

const MONTHS = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
]

function formatMoney(n) {
  if (n == null || Number.isNaN(n)) return '—'
  return new Intl.NumberFormat(undefined, {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(n)
}

export function SummaryCards({ summary }) {
  if (!summary) return null
  const { totalIncome = 0, totalExpense = 0, netBalance = 0 } = summary
  return (
    <div className="grid gap-4 sm:grid-cols-3">
      <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-4">
        <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
          Total income
        </p>
        <p className="mt-2 text-2xl font-semibold text-emerald-400">
          {formatMoney(totalIncome)}
        </p>
      </div>
      <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-4">
        <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
          Total expense
        </p>
        <p className="mt-2 text-2xl font-semibold text-rose-400">
          {formatMoney(totalExpense)}
        </p>
      </div>
      <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-4">
        <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
          Net balance
        </p>
        <p
          className={`mt-2 text-2xl font-semibold ${netBalance >= 0 ? 'text-sky-400' : 'text-amber-400'}`}
        >
          {formatMoney(netBalance)}
        </p>
      </div>
    </div>
  )
}

export function CategoryChart({ data }) {
  const chartData = (data || []).map((row) => ({
    name: row._id || '—',
    total: row.total,
  }))
  if (!chartData.length) {
    return (
      <div className="rounded-xl border border-dashed border-slate-700 p-8 text-center text-sm text-slate-500">
        No category data yet
      </div>
    )
  }
  return (
    <div className="h-72 w-full min-w-0 rounded-xl border border-slate-800 bg-slate-900/40 p-4">
      <h3 className="mb-4 text-sm font-medium text-slate-300">
        Spending by category
      </h3>
      <ResponsiveContainer width="100%" height="85%" minWidth={0}>
        <BarChart data={chartData} layout="vertical" margin={{ left: 8 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
          <XAxis type="number" stroke="#94a3b8" />
          <YAxis
            type="category"
            dataKey="name"
            width={100}
            stroke="#94a3b8"
            tick={{ fontSize: 12 }}
          />
          <Tooltip
            contentStyle={{
              background: '#0f172a',
              border: '1px solid #334155',
              borderRadius: '8px',
            }}
            formatter={(v) => formatMoney(v)}
          />
          <Bar dataKey="total" fill="#34d399" radius={[0, 4, 4, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

export function TrendsChart({ data }) {
  const chartData = (data || []).map((row) => ({
    month: MONTHS[(row._id || 1) - 1] || `M${row._id}`,
    total: row.total,
  }))
  if (!chartData.length) {
    return (
      <div className="rounded-xl border border-dashed border-slate-700 p-8 text-center text-sm text-slate-500">
        No trend data yet
      </div>
    )
  }
  return (
    <div className="h-72 w-full min-w-0 rounded-xl border border-slate-800 bg-slate-900/40 p-4">
      <h3 className="mb-4 text-sm font-medium text-slate-300">
        Monthly totals
      </h3>
      <ResponsiveContainer width="100%" height="85%" minWidth={0}>
        <BarChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
          <XAxis dataKey="month" stroke="#94a3b8" />
          <YAxis stroke="#94a3b8" />
          <Tooltip
            contentStyle={{
              background: '#0f172a',
              border: '1px solid #334155',
              borderRadius: '8px',
            }}
            formatter={(v) => formatMoney(v)}
          />
          <Bar dataKey="total" fill="#38bdf8" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

export function RecentList({ records }) {
  if (!records?.length) {
    return (
      <div className="rounded-xl border border-dashed border-slate-700 p-6 text-center text-sm text-slate-500">
        No recent transactions
      </div>
    )
  }
  return (
    <div className="rounded-xl border border-slate-800 bg-slate-900/40">
      <h3 className="border-b border-slate-800 px-4 py-3 text-sm font-medium text-slate-300">
        Recent transactions
      </h3>
      <ul className="divide-y divide-slate-800">
        {records.map((r) => (
          <li
            key={r._id}
            className="flex flex-wrap items-center justify-between gap-2 px-4 py-3 text-sm"
          >
            <div>
              <span className="font-medium text-slate-200">{r.category}</span>
              <span className="ml-2 text-slate-500">
                {r.date ? new Date(r.date).toLocaleDateString() : ''}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span
                className={
                  r.type === 'income' ? 'text-emerald-400' : 'text-rose-400'
                }
              >
                {r.type === 'income' ? '+' : '−'}
                {formatMoney(r.amount)}
              </span>
              <span className="rounded bg-slate-800 px-2 py-0.5 text-xs text-slate-400">
                {r.type}
              </span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
