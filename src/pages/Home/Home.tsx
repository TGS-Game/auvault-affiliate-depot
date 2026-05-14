import Card from '../../components/Card'
import {
  ChevronDownIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  CheckCircleIcon,
  InfoIcon,
} from '../../components/icons'
import styles from './Home.module.css'

type Commission = { label: string; value: string }

const COMMISSIONS: Commission[] = [
  { label: 'Commission', value: '€ 12,450.00' },
  { label: 'Downline Commission', value: '€ 3,820.00' },
  { label: 'Credits', value: '€ 940.00' },
  { label: 'Payouts', value: '€ 9,800.00' },
  { label: 'Account balance', value: '€ 7,410.00' },
]

const GENERAL_TASKS = [
  { label: 'Validation', count: 7 },
  { label: 'Set up fee', count: 5 },
]

const TODAY_TASKS = [
  { label: 'Send out bonus email', info: false },
  { label: 'Meeting at 14:15pm', info: true },
]

const CHART_POINTS = [
  // x in 0-100 (left%), y in 0-100 (top%)
  { x: 6, paid: 70, outstanding: 55, further: 30 },
  { x: 16, paid: 60, outstanding: 70, further: 55 },
  { x: 26, paid: 48, outstanding: 40, further: 65 },
  { x: 36, paid: 35, outstanding: 50, further: 75 },
  { x: 46, paid: 55, outstanding: 30, further: 45 },
  { x: 56, paid: 40, outstanding: 60, further: 25 },
  { x: 66, paid: 25, outstanding: 35, further: 50 },
  { x: 76, paid: 18, outstanding: 45, further: 35 },
  { x: 86, paid: 30, outstanding: 25, further: 60 },
  { x: 96, paid: 22, outstanding: 38, further: 28 },
]

function pathFrom(points: typeof CHART_POINTS, key: 'paid' | 'outstanding' | 'further') {
  return points
    .map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p[key]}`)
    .join(' ')
}

export default function Home() {
  return (
    <div className={styles.grid}>
      <Card title="ANALYTICS" className={styles.colSpan2}>
        <div className={styles.analyticsTop}>
          <button type="button" className={styles.pillBtn}>
            New Customers <ChevronDownIcon size={14} />
          </button>
          <div className={styles.chartLegend}>
            <span className={styles.legendItem}>
              <span className={`${styles.dot} ${styles.dotPaid}`} aria-hidden />
              Paid Fees
            </span>
            <span className={styles.legendItem}>
              <span className={`${styles.dot} ${styles.dotOutstanding}`} aria-hidden />
              Fees Outstanding
            </span>
            <span className={styles.legendItem}>
              <span className={`${styles.dot} ${styles.dotFurther}`} aria-hidden />
              Made a further purchase
            </span>
          </div>
        </div>
        <div className={styles.chart}>
          <div className={styles.chartGrid}>
            {[0, 1, 2, 3, 4].map((i) => (
              <span key={i} className={styles.gridLine} aria-hidden />
            ))}
          </div>
          <svg
            className={styles.chartSvg}
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            aria-hidden
          >
            <path
              d={pathFrom(CHART_POINTS, 'paid')}
              fill="none"
              stroke="#d1ad73"
              strokeWidth="0.6"
            />
            <path
              d={pathFrom(CHART_POINTS, 'outstanding')}
              fill="none"
              stroke="#f5f5f5"
              strokeWidth="0.6"
            />
            <path
              d={pathFrom(CHART_POINTS, 'further')}
              fill="none"
              stroke="#9c4d52"
              strokeWidth="0.6"
            />
          </svg>
          <div className={styles.chartYAxis} aria-hidden>
            <span>25</span>
            <span>20</span>
            <span>15</span>
            <span>10</span>
            <span>5</span>
          </div>
          <div className={styles.chartXAxis} aria-hidden>
            <span>5</span>
            <span>10</span>
            <span>15</span>
            <span>20</span>
            <span>25</span>
            <span>30</span>
            <span>35</span>
            <span>40</span>
            <span>45</span>
            <span>50</span>
          </div>
        </div>
        <div className={styles.analyticsFoot}>
          <button type="button" className={styles.pillBtn}>
            FEB 25 <ChevronDownIcon size={14} />
          </button>
        </div>
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

      <Card
        title="DEPOTS"
        toolbar={
          <button type="button" className={styles.pillBtn}>
            Direct <ChevronDownIcon size={14} />
          </button>
        }
      >
        <div className={styles.depotsBody}>
          <div className={styles.depotCircles}>
            <div className={styles.depotCircleLg}>
              <span className={styles.depotCircleNumber}>18</span>
              <span className={styles.depotCircleLabel}>Outstanding</span>
            </div>
            <div className={styles.depotCircleSm}>
              <span className={styles.depotCircleNumber}>3</span>
              <span className={styles.depotCircleLabel}>New (Feb 2026)</span>
            </div>
          </div>
          <div className={styles.depotsTotalRow}>
            <hr className={styles.divider} />
            <p className={styles.depotsTotal}>
              <span>Total:&nbsp;</span>
              <span className={styles.depotsTotalNumber}>20</span>
            </p>
          </div>
        </div>
      </Card>

      <Card title="CHECKLIST">
        <div className={styles.checklistBody}>
          <h3 className={styles.checklistHeading}>General</h3>
          <ul className={styles.checklistList}>
            {GENERAL_TASKS.map((t) => (
              <li key={t.label} className={styles.checklistItem}>
                <CheckCircleIcon size={20} />
                <span className={styles.checklistText}>
                  {t.label} <span className={styles.checklistCount}>({t.count})</span>
                </span>
              </li>
            ))}
          </ul>
          <hr className={styles.divider} />
          <h3 className={styles.checklistHeading}>Today</h3>
          <ul className={styles.checklistList}>
            {TODAY_TASKS.map((t) => (
              <li key={t.label} className={styles.checklistItem}>
                <CheckCircleIcon size={20} />
                <span className={styles.checklistText}>{t.label}</span>
                {t.info && <InfoIcon size={16} />}
              </li>
            ))}
          </ul>
          <a href="#" className={styles.viewAll} onClick={(e) => e.preventDefault()}>
            View All
          </a>
        </div>
      </Card>

      <Card title="CALANDER">
        <CalendarMini />
      </Card>
    </div>
  )
}

function CalendarMini() {
  // March 2026 — March 1, 2026 is a Sunday
  const monthLabel = 'March 2026'
  const firstDayOffset = 0 // Sunday = 0
  const daysInMonth = 31
  const weekDays = ['S', 'M', 'T', 'W', 'T', 'F', 'S']
  const cells: (number | null)[] = []
  for (let i = 0; i < firstDayOffset; i++) cells.push(null)
  for (let d = 1; d <= daysInMonth; d++) cells.push(d)
  while (cells.length % 7 !== 0) cells.push(null)

  const today = 14

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
        {cells.map((c, i) => (
          <span
            key={i}
            className={`${styles.calCell}${c === today ? ' ' + styles.calCellToday : ''}${c === null ? ' ' + styles.calCellEmpty : ''}`}
          >
            {c ?? ''}
          </span>
        ))}
      </div>
    </div>
  )
}
