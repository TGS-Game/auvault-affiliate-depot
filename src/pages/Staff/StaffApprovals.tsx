import { useMemo, useState } from 'react'
import Card from '../../components/Card'
import PageHeader from '../../components/PageHeader'
import styles from './Staff.module.css'

type Tab = 'customers' | 'partners'

type ApprovalKind = 'New Customer' | 'KYC Update' | 'New Partner Application'

type ApprovalRow = {
  id: string
  name: string
  kind: ApprovalKind
  submitted: string
  category: Tab
}

type CompletedRow = ApprovalRow & {
  action: 'Approved' | 'Rejected'
  reason?: string
  completedAt: string
}

const REJECTION_REASONS = [
  'Incomplete documents',
  'Duplicate application',
  'Does not meet criteria',
  'Other',
]

const INITIAL_PENDING: ApprovalRow[] = [
  { id: 'A-101', name: 'Alice Brennan', kind: 'New Customer', submitted: '3 days ago', category: 'customers' },
  { id: 'A-102', name: 'Thomas Okafor', kind: 'KYC Update', submitted: '1 day ago', category: 'customers' },
  { id: 'A-103', name: 'Yuki Tanaka', kind: 'New Customer', submitted: 'today', category: 'customers' },
  { id: 'A-201', name: 'Fabian Reyes', kind: 'New Partner Application', submitted: '2 days ago', category: 'partners' },
  { id: 'A-202', name: 'Nia Clarke', kind: 'New Partner Application', submitted: '5 days ago', category: 'partners' },
]

function nowLabel() {
  const d = new Date()
  return d.toLocaleString('en-IE', {
    day: '2-digit',
    month: 'short',
    hour: '2-digit',
    minute: '2-digit',
  })
}

export default function StaffApprovals() {
  const [tab, setTab] = useState<Tab>('customers')
  const [pending, setPending] = useState<ApprovalRow[]>(INITIAL_PENDING)
  const [completed, setCompleted] = useState<CompletedRow[]>([])
  const [rejecting, setRejecting] = useState<string | null>(null)
  const [rejectReason, setRejectReason] = useState(REJECTION_REASONS[0])

  const filteredPending = useMemo(
    () => pending.filter((r) => r.category === tab),
    [pending, tab],
  )

  const filteredCompleted = useMemo(
    () => completed.filter((r) => r.category === tab),
    [completed, tab],
  )

  const approve = (row: ApprovalRow) => {
    setPending((prev) => prev.filter((r) => r.id !== row.id))
    setCompleted((prev) => [
      { ...row, action: 'Approved', completedAt: nowLabel() },
      ...prev,
    ])
  }

  const startReject = (id: string) => {
    setRejecting(id)
    setRejectReason(REJECTION_REASONS[0])
  }

  const confirmReject = (row: ApprovalRow) => {
    setPending((prev) => prev.filter((r) => r.id !== row.id))
    setCompleted((prev) => [
      {
        ...row,
        action: 'Rejected',
        reason: rejectReason,
        completedAt: nowLabel(),
      },
      ...prev,
    ])
    setRejecting(null)
  }

  const cancelReject = () => setRejecting(null)

  return (
    <div className={styles.page}>
      <PageHeader
        title="Approvals"
        subtitle="Review and action pending customer and partner submissions"
      />

      <Card noTitle title="">
        <div className={styles.tabs}>
          <button
            type="button"
            className={`${styles.tab}${tab === 'customers' ? ' ' + styles.tabActive : ''}`}
            onClick={() => setTab('customers')}
          >
            Customers
          </button>
          <button
            type="button"
            className={`${styles.tab}${tab === 'partners' ? ' ' + styles.tabActive : ''}`}
            onClick={() => setTab('partners')}
          >
            Partners
          </button>
        </div>

        <h3 className={styles.subheading}>Pending</h3>
        <ul className={styles.approvalList}>
          {filteredPending.map((row) => {
            const isRejecting = rejecting === row.id
            return (
              <li key={row.id} className={styles.approvalRow}>
                <div className={styles.approvalText}>
                  <span className={styles.approvalName}>{row.name}</span>
                  <span className={styles.approvalMeta}>
                    {row.kind} · submitted {row.submitted}
                  </span>
                </div>
                {isRejecting ? (
                  <span className={styles.rejectReason}>
                    <select
                      className={styles.reasonSelect}
                      value={rejectReason}
                      onChange={(e) => setRejectReason(e.target.value)}
                    >
                      {REJECTION_REASONS.map((r) => (
                        <option key={r} value={r}>
                          {r}
                        </option>
                      ))}
                    </select>
                    <button
                      type="button"
                      className={`${styles.rowBtn} ${styles.rowBtnBurgundy}`}
                      onClick={() => confirmReject(row)}
                    >
                      Confirm
                    </button>
                    <button
                      type="button"
                      className={`${styles.rowBtn} ${styles.rowBtnGoldOutline}`}
                      onClick={cancelReject}
                    >
                      Cancel
                    </button>
                  </span>
                ) : (
                  <span className={styles.rowActions}>
                    <button
                      type="button"
                      className={`${styles.rowBtn} ${styles.rowBtnGold}`}
                      onClick={() => approve(row)}
                    >
                      Approve
                    </button>
                    <button
                      type="button"
                      className={`${styles.rowBtn} ${styles.rowBtnBurgundy}`}
                      onClick={() => startReject(row.id)}
                    >
                      Reject
                    </button>
                  </span>
                )}
              </li>
            )
          })}
          {filteredPending.length === 0 && (
            <li className={styles.emptyState}>No pending {tab} approvals.</li>
          )}
        </ul>
      </Card>

      <Card title="COMPLETED">
        <ul className={styles.approvalList}>
          {filteredCompleted.map((row) => (
            <li key={row.id + row.completedAt} className={styles.approvalRow}>
              <div className={styles.approvalText}>
                <span className={styles.approvalName}>{row.name}</span>
                <span className={styles.approvalMeta}>
                  {row.kind} · {row.action.toLowerCase()} {row.completedAt}
                  {row.reason ? ` — ${row.reason}` : ''}
                </span>
              </div>
              <span className={styles.approvalCompleted}>{row.action}</span>
            </li>
          ))}
          {filteredCompleted.length === 0 && (
            <li className={styles.emptyState}>
              Completed {tab} approvals will appear here.
            </li>
          )}
        </ul>
      </Card>
    </div>
  )
}
