import { AppShell } from '../components/AppShell.jsx'
import {
  CategoryChart,
  RecentList,
  SummaryCards,
  TrendsChart,
} from '../components/DashboardWidgets.jsx'
import { useDashboardData } from '../hooks/useDashboardData.js'

export function ViewerDashboard() {
  const {
    loading: dashLoading,
    error: dashError,
    summary,
    categoryWise,
    trends,
    recent,
    reload,
  } = useDashboardData()

  return (
    <AppShell title="Viewer dashboard" subtitle="Dashboard only">
      <div className="space-y-8">
        {dashError ? (
          <p className="rounded-lg border border-rose-900/50 bg-rose-950/30 px-4 py-3 text-sm text-rose-300">
            {dashError}
          </p>
        ) : null}

        <section>
          <h2 className="mb-4 text-sm font-medium uppercase tracking-wide text-slate-500">
            Summary
          </h2>
          {dashLoading ? (
            <p className="text-slate-500">Loading…</p>
          ) : (
            <SummaryCards summary={summary} />
          )}
        </section>

        <div className="grid gap-6 lg:grid-cols-2">
          <section className="min-w-0">
            {dashLoading ? (
              <p className="text-slate-500">Loading charts…</p>
            ) : (
              <CategoryChart data={categoryWise} />
            )}
          </section>
          <section className="min-w-0">
            {dashLoading ? (
              <p className="text-slate-500">Loading charts…</p>
            ) : (
              <TrendsChart data={trends} />
            )}
          </section>
        </div>

        <section>
          <div className="mb-4 flex items-center justify-between gap-4">
            <h2 className="text-sm font-medium uppercase tracking-wide text-slate-500">
              Recent transactions
            </h2>
            <button
              type="button"
              onClick={reload}
              className="text-sm text-emerald-400 hover:underline"
            >
              Refresh dashboard
            </button>
          </div>
          {dashLoading ? (
            <p className="text-slate-500">Loading…</p>
          ) : (
            <RecentList records={recent} />
          )}
        </section>
      </div>
    </AppShell>
  )
}
