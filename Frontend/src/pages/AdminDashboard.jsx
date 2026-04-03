import { useState } from 'react'
import { AppShell } from '../components/AppShell.jsx'
import {
  CategoryChart,
  RecentList,
  SummaryCards,
  TrendsChart,
} from '../components/DashboardWidgets.jsx'
import { RecordFormModal } from '../components/RecordFormModal.jsx'
import { RecordFilters } from '../components/RecordFilters.jsx'
import { Pagination } from '../components/Pagination.jsx'
import { RecordsTable } from '../components/RecordsTable.jsx'
import {
  createRecord,
  deleteRecord,
  updateRecord,
} from '../api/records.js'
import { createAdmin } from '../api/users.js'
import { useDashboardData } from '../hooks/useDashboardData.js'
import { useRecords } from '../hooks/useRecords.js'

export function AdminDashboard() {
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

  const [formOpen, setFormOpen] = useState(false)
  const [editRecord, setEditRecord] = useState(null)
  const [adminForm, setAdminForm] = useState({
    name: '',
    email: '',
    password: '',
  })
  const [adminMsg, setAdminMsg] = useState(null)
  const [adminErr, setAdminErr] = useState(null)
  const [adminLoading, setAdminLoading] = useState(false)

  async function handleCreateOrUpdate(body) {
    if (editRecord) {
      await updateRecord(editRecord._id, body)
    } else {
      await createRecord(body)
    }
    reloadDash()
    reloadRec()
  }

  async function handleDelete(id) {
    if (!window.confirm('Soft-delete this record?')) return
    try {
      await deleteRecord(id)
      reloadDash()
      reloadRec()
    } catch (e) {
      window.alert(e.message)
    }
  }

  async function handleCreateAdmin(e) {
    e.preventDefault()
    setAdminErr(null)
    setAdminMsg(null)
    setAdminLoading(true)
    try {
      await createAdmin(adminForm)
      setAdminMsg('Admin user created.')
      setAdminForm({ name: '', email: '', password: '' })
    } catch (err) {
      setAdminErr(err.message)
    } finally {
      setAdminLoading(false)
    }
  }

  return (
    <AppShell title="Admin dashboard" subtitle="Full access">
      <div className="space-y-10">
        {dashError ? (
          <p className="rounded-lg border border-rose-900/50 bg-rose-950/30 px-4 py-3 text-sm text-rose-300">
            {dashError}
          </p>
        ) : null}

        <section className="rounded-xl border border-slate-800 bg-slate-900/40 p-6">
          <h2 className="text-lg font-semibold text-slate-100">
            Create administrator
          </h2>
          <p className="mt-1 text-sm text-slate-500">
            POST /api/users/create-admin — only existing admins can call this.
          </p>
          {adminMsg ? (
            <p className="mt-3 text-sm text-emerald-400">{adminMsg}</p>
          ) : null}
          {adminErr ? (
            <p className="mt-3 text-sm text-rose-300">{adminErr}</p>
          ) : null}
          <form
            onSubmit={handleCreateAdmin}
            className="mt-4 grid gap-4 sm:grid-cols-3"
          >
            <label className="text-xs text-slate-400">
              Name
              <input
                required
                value={adminForm.name}
                onChange={(e) =>
                  setAdminForm((f) => ({ ...f, name: e.target.value }))
                }
                className="mt-1 w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-slate-200"
              />
            </label>
            <label className="text-xs text-slate-400">
              Email
              <input
                required
                type="email"
                value={adminForm.email}
                onChange={(e) =>
                  setAdminForm((f) => ({ ...f, email: e.target.value }))
                }
                className="mt-1 w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-slate-200"
              />
            </label>
            <label className="text-xs text-slate-400">
              Password
              <input
                required
                minLength={6}
                type="password"
                value={adminForm.password}
                onChange={(e) =>
                  setAdminForm((f) => ({ ...f, password: e.target.value }))
                }
                className="mt-1 w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-slate-200"
              />
            </label>
            <div className="sm:col-span-3">
              <button
                type="submit"
                disabled={adminLoading}
                className="rounded-lg bg-violet-600 px-4 py-2 text-sm font-medium text-white hover:bg-violet-500 disabled:opacity-50"
              >
                {adminLoading ? 'Creating…' : 'Create admin'}
              </button>
            </div>
          </form>
        </section>

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
          <section>
            {dashLoading ? (
              <p className="text-slate-500">Loading…</p>
            ) : (
              <CategoryChart data={categoryWise} />
            )}
          </section>
          <section>
            {dashLoading ? (
              <p className="text-slate-500">Loading…</p>
            ) : (
              <TrendsChart data={trends} />
            )}
          </section>
        </div>

        <section>
          <h2 className="mb-4 text-sm font-medium uppercase tracking-wide text-slate-500">
            Recent
          </h2>
          {dashLoading ? (
            <p className="text-slate-500">Loading…</p>
          ) : (
            <RecentList records={recent} />
          )}
        </section>

        <section>
          <div className="mb-4 flex flex-wrap items-center justify-between gap-4">
            <h2 className="text-sm font-medium uppercase tracking-wide text-slate-500">
              Records (CRUD)
            </h2>
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => {
                  reloadDash()
                  reloadRec()
                }}
                className="text-sm text-emerald-400 hover:underline"
              >
                Refresh
              </button>
              <button
                type="button"
                onClick={() => {
                  setEditRecord(null)
                  setFormOpen(true)
                }}
                className="rounded-lg bg-emerald-600 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-500"
              >
                New record
              </button>
            </div>
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
              actions={(r) => (
                <div className="flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      setEditRecord(r)
                      setFormOpen(true)
                    }}
                    className="rounded border border-slate-600 px-2 py-1 text-xs text-slate-300 hover:bg-slate-800"
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDelete(r._id)}
                    className="rounded border border-rose-800 px-2 py-1 text-xs text-rose-300 hover:bg-rose-950/50"
                  >
                    Delete
                  </button>
                </div>
              )}
            />
          </div>
          <Pagination
            page={page}
            pages={pages}
            onPageChange={setPage}
            disabled={recLoading}
          />
          <p className="mt-2 text-center text-xs text-slate-600">
            {total} record{total !== 1 ? 's' : ''} total · create/update/delete
            call the admin-only record APIs
          </p>
        </section>
      </div>

      {formOpen ? (
        <RecordFormModal
          title={editRecord ? 'Edit record' : 'New record'}
          initial={editRecord}
          onSubmit={handleCreateOrUpdate}
          onClose={() => {
            setFormOpen(false)
            setEditRecord(null)
          }}
        />
      ) : null}
    </AppShell>
  )
}
