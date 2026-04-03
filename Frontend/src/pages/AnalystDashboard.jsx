import { useState } from 'react'
import { AppShell } from '../components/AppShell.jsx'
import {
  CategoryChart,
  RecentList,
  SummaryCards,
  TrendsChart,
} from '../components/DashboardWidgets.jsx'
import { RecordDetailModal } from '../components/RecordDetailModal.jsx'
import { RecordFilters } from '../components/RecordFilters.jsx'
import { Pagination } from '../components/Pagination.jsx'
import { RecordsTable } from '../components/RecordsTable.jsx'
import { useDashboardData } from '../hooks/useDashboardData.js'
import { useRecords } from '../hooks/useRecords.js'

export function AnalystDashboard() {
  const {
    loading: dashLoading,
    error: dashError,
    summary,
    categoryWise,
    trends,
    recent,
    reload: reloadDash,
  } = useDashboardData()

  const {
    records,
    total,
    page,
    pages,
    filters,
    loading: recLoading,
    error: recError,
    setPage,
    updateFilter,
    resetFilters,
    reload: reloadRec,
  } = useRecords()

  const [selected, setSelected] = useState(null)

  return (
    <AppShell title="Analyst dashboard" subtitle="Analytics and records">
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
          <h2 className="mb-4 text-sm font-medium uppercase tracking-wide text-slate-500">
            Recent transactions
          </h2>
          {dashLoading ? (
            <p className="text-slate-500">Loading…</p>
          ) : (
            <RecentList records={recent} />
          )}
        </section>

        <section>
          <div className="mb-4 flex flex-wrap items-end justify-between gap-4">
            <h2 className="text-sm font-medium uppercase tracking-wide text-slate-500">
              Records
            </h2>
            <button
              type="button"
              onClick={() => {
                reloadDash()
                reloadRec()
              }}
              className="text-sm text-emerald-400 hover:underline"
            >
              Refresh all
            </button>
          </div>
          <RecordFilters
            filters={filters}
            onChange={updateFilter}
            onReset={resetFilters}
            disabled={recLoading}
          />
          <div className="mt-4">
            <RecordsTable
              records={records}
              loading={recLoading}
              error={recError}
              onRowClick={(r) => setSelected(r)}
            />
          </div>
          <Pagination
            page={page}
            pages={pages}
            onPageChange={setPage}
            disabled={recLoading}
          />
          <p className="mt-2 text-center text-xs text-slate-600">
            {total} record{total !== 1 ? 's' : ''} total
          </p>
        </section>
      </div>

      {selected ? (
        <RecordDetailModal
          record={selected}
          onClose={() => setSelected(null)}
        />
      ) : null}
    </AppShell>
  )
}
