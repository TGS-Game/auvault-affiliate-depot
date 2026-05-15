import Card from '../../components/Card'
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  CheckCircleIcon,
  InfoIcon,
} from '../../components/icons'
import styles from './Home.module.css'

type Metric = { label: string; value: string }

const ANALYTICS: Metric[] = [
  { label: 'New Customers this month', value: '4' },
  { label: 'Paid Fees', value: '€ 1,240.00' },
  { label: 'Fees Outstanding', value: '€ 180.00' },
  { label: 'Made a further purchase', value: '2' },
]

const COMMISSIONS: Metric[] = [
  { label: 'Commission', value: '€ 3,420.00' },
  { label: 'Downline Commission', value: '€ 640.00' },
  { label: 'Credits', value: '€ 120.00' },
  { label: 'Payouts', value: '€ 3,800.00' },
  { label: 'Account balance', value: '€ 380.00' },
]

const CHECKLIST_DONE = [
  'Validation complete',
  'Set up fee received',
]

export default function PartnerHome() {
  return (
    <div className={styles.grid}>
      <Card title="ANALYTICS" className={styles.colSpan2}>
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

      <Card title="DEPOTS">
        <div className={styles.depotsBody}>
          <div className={styles.depotCircles}>
            <div className={styles.depotCircleLg}>
              <span className={styles.depotCircleNumber}>3</span>
              <span className={styles.depotCircleLabel}>Outstanding</span>
            </div>
            <div className={styles.depotCircleSm}>
              <span className={styles.depotCircleNumber}>1</span>
              <span className={styles.depotCircleLabel}>New</span>
            </div>
          </div>
          <div className={styles.depotsTotalRow}>
            <hr className={styles.divider} />
            <p className={styles.depotsTotal}>
              <span>Total:&nbsp;</span>
              <span className={styles.depotsTotalNumber}>12</span>
            </p>
          </div>
        </div>
      </Card>

      <Card title="CHECKLIST">
        <div className={styles.checklistBody}>
          <h3 className={styles.checklistHeading}>Completed</h3>
          <ul className={styles.checklistList}>
            {CHECKLIST_DONE.map((label) => (
              <li key={label} className={styles.checklistItem}>
                <CheckCircleIcon size={20} />
                <span className={styles.checklistText}>{label}</span>
              </li>
            ))}
          </ul>
          <hr className={styles.divider} />
          <h3 className={styles.checklistHeading}>Today</h3>
          <ul className={styles.checklistList}>
            <li className={styles.checklistItem}>
              <span className={styles.pendingDot} aria-hidden />
              <span className={styles.checklistText}>
                <span className={styles.checklistCount}>2</span> tasks pending today
              </span>
              <InfoIcon size={16} />
            </li>
          </ul>
        </div>
      </Card>

      <Card title="CALENDAR">
        <CalendarMini />
      </Card>
    </div>
  )
}

function CalendarMini() {
  // Current month: May 2026. May 1, 2026 is a Friday (day 5).
  const monthLabel = 'May 2026'
  const firstDayOffset = 5
  const daysInMonth = 31
  const weekDays = ['S', 'M', 'T', 'W', 'T', 'F', 'S']
  const cells: (number | null)[] = []
  for (let i = 0; i < firstDayOffset; i++) cells.push(null)
  for (let d = 1; d <= daysInMonth; d++) cells.push(d)
  while (cells.length % 7 !== 0) cells.push(null)

  const today = 15
  const activityDates = new Set([6, 12, 14, 20, 27])

  return (
    <div className={styles.calBody}>
      <div className={styles.calHead}>
        <button type="button" className={styles.calNavBtn} aria-label="Previous month">
          <ChevronLeftIcon size={14} />
        </button>
        <span className={styles.calMonth}>{monthLabel}</span>
        <button type="button" className={styles.calNavBtn} aria-label="Next month">
          <ChevronRightIcon size={14} />
        </button>
      </div>
      <div className={styles.calGrid}>
        {weekDays.map((w, i) => (
          <span key={`wd-${i}`} className={styles.calWeekday}>
            {w}
          </span>
        ))}
        {cells.map((c, i) => {
          const isToday = c === today
          const hasActivity = c !== null && activityDates.has(c)
          return (
            <span
              key={i}
              className={`${styles.calCell}${isToday ? ' ' + styles.calCellToday : ''}${c === null ? ' ' + styles.calCellEmpty : ''}`}
            >
              {c ?? ''}
              {hasActivity && !isToday && <span className={styles.calActivityDot} aria-hidden />}
            </span>
          )
        })}
      </div>
    </div>
  )
}
