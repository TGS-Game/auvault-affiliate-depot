import { Link } from 'react-router-dom'
import Card from '../../components/Card'
import styles from './Home.module.css'

type Metric = { label: string; value: string }

const OVERVIEW: Metric[] = [
  { label: 'Total Active Partners', value: '24' },
  { label: 'Total Customers', value: '347' },
  { label: 'Total AUM', value: '€ 4,820,000' },
]

const ANALYTICS: Metric[] = [
  { label: 'New Customers this month', value: '38' },
  { label: 'Paid Fees', value: '€ 42,600.00' },
  { label: 'Fees Outstanding', value: '€ 3,200.00' },
  { label: 'Further purchases', value: '19' },
]

const COMMISSIONS: Metric[] = [
  { label: 'Total Commission paid', value: '€ 28,400.00' },
  { label: 'Outstanding', value: '€ 4,100.00' },
  { label: 'Credits issued', value: '€ 980.00' },
]

type PendingAction = {
  text: string
  emphasis: string
  to: string
}

const PENDING_ACTIONS: PendingAction[] = [
  {
    emphasis: '3 customer validations',
    text: 'awaiting approval',
    to: '/staff/approvals',
  },
  {
    emphasis: '2 business partner applications',
    text: 'pending',
    to: '/staff/approvals',
  },
  {
    emphasis: '1 large transaction',
    text: 'flagged (>€50,000)',
    to: '/staff/bank-reconciliation',
  },
  {
    emphasis: '1 settlement',
    text: 'due today',
    to: '/staff/bank-reconciliation',
  },
]

type LeaderboardRow = {
  name: string
  customers: number
  commission: string
}

const LEADERBOARD: LeaderboardRow[] = [
  { name: 'James Hargreaves', customers: 42, commission: '€ 8,240' },
  { name: 'Sarah Mitchell', customers: 31, commission: '€ 6,180' },
  { name: 'David Chen', customers: 18, commission: '€ 2,940' },
  { name: 'Emma Thornton', customers: 12, commission: '€ 1,820' },
  { name: 'Robert Walsh', customers: 8, commission: '€ 980' },
]

export default function StaffHome() {
  return (
    <div className={styles.grid}>
      <Card title="COMPANY OVERVIEW" className={styles.colSpan2}>
        <div className={styles.overviewGrid}>
          {OVERVIEW.map((m) => (
            <div key={m.label} className={styles.overviewStat}>
              <span className={styles.overviewLabel}>{m.label}</span>
              <span className={styles.overviewValue}>{m.value}</span>
            </div>
          ))}
          <div className={styles.overviewStat}>
            <span className={styles.overviewLabel}>Pending Approvals</span>
            <Link to="/staff/approvals" className={styles.approvalsBadge}>
              7 Pending →
            </Link>
          </div>
        </div>
      </Card>

      <Card title="ANALYTICS">
        <ul className={styles.commissionList}>
          {ANALYTICS.map((m) => (
            <li key={m.label} className={styles.commissionRow}>
              <span className={styles.commissionLabel}>{m.label}</span>
              <span className={styles.commissionValue}>{m.value}</span>
            </li>
          ))}
        </ul>
      </Card>

      <Card title="COMMISSIONS">
        <ul className={styles.commissionList}>
          {COMMISSIONS.map((c) => (
            <li key={c.label} className={styles.commissionRow}>
              <span className={styles.commissionLabel}>{c.label}</span>
              <span className={styles.commissionValue}>{c.value}</span>
            </li>
          ))}
        </ul>
      </Card>

      <Card title="PENDING ACTIONS" className={styles.colSpan2}>
        <ul className={styles.pendingActionList}>
          {PENDING_ACTIONS.map((a, i) => (
            <li key={i} className={styles.pendingActionRow}>
              <span className={styles.pendingActionText}>
                <span className={styles.pendingActionEmphasis}>{a.emphasis}</span>{' '}
                {a.text}
              </span>
              <Link to={a.to} className={styles.actionBtn}>
                Action
              </Link>
            </li>
          ))}
        </ul>
      </Card>

      <Card title="PARTNER LEADERBOARD">
        <ul className={styles.leaderboardList}>
          {LEADERBOARD.map((p, i) => (
            <li key={p.name} className={styles.leaderboardRow}>
              <span className={styles.leaderboardRank}>#{i + 1}</span>
              <span className={styles.leaderboardName}>{p.name}</span>
              <span className={styles.leaderboardCustomers}>
                {p.customers} customers
              </span>
              <span className={styles.leaderboardCommission}>
                {p.commission}
              </span>
            </li>
          ))}
        </ul>
      </Card>
    </div>
  )
}
