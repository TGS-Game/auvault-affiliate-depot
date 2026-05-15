import { useState } from 'react'
import Card from '../../components/Card'
import PageHeader from '../../components/PageHeader'
import { useToast } from '../../context/ToastContext'
import business from '../Business/Business.module.css'
import styles from './Staff.module.css'

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

const YEARS = ['2024', '2025', '2026']

type ReportKey = 'commission' | 'customer' | 'settlement' | 'activity'

type ReportConfig = {
  key: ReportKey
  title: string
  description: string
  columns: string[]
  sampleRows: string[][]
}

const REPORTS: ReportConfig[] = [
  {
    key: 'commission',
    title: 'COMMISSION REPORT',
    description:
      'Acquisition, recurring, and downline commission earned by every partner over the selected period.',
    columns: ['Partner', 'Period', 'Commission', 'Downline', 'Credits', 'Payout'],
    sampleRows: [
      ['James Hargreaves', 'May 2026', '€ 8,240', '€ 1,840', '€ 220', '€ 9,860'],
      ['Sarah Mitchell', 'May 2026', '€ 6,180', '€ 1,120', '€ 180', '€ 7,120'],
      ['David Chen', 'May 2026', '€ 2,940', '€ 420', '€ 80', '€ 3,280'],
      ['Emma Thornton', 'May 2026', '€ 1,820', '€ 280', '€ 0', '€ 2,100'],
      ['Robert Walsh', 'May 2026', '€ 980', '€ 120', '€ 0', '€ 1,100'],
    ],
  },
  {
    key: 'customer',
    title: 'CUSTOMER REPORT',
    description:
      'Customer roster including assigned partner, tariff, total purchases and validation status.',
    columns: ['Customer ID', 'Name', 'Partner', 'Tariff', 'Total Purchases', 'Status'],
    sampleRows: [
      ['C-1041', 'Alice Brennan', 'GP-001', 'Standard 12', '€ 3,200', 'Active'],
      ['C-1052', 'Thomas Okafor', 'GP-001', 'Premium 24', '€ 7,800', 'Active'],
      ['C-1067', 'Yuki Tanaka', 'GP-001', 'Standard 6', '€ 1,420', 'Pending'],
      ['C-1083', 'Lukas Becker', 'GP-002', 'Premium 24', '€ 9,100', 'Active'],
      ['C-1090', 'Maria Costa', 'GP-002', 'Standard 12', '€ 2,840', 'Active'],
    ],
  },
  {
    key: 'settlement',
    title: 'SETTLEMENT REPORT',
    description:
      'Outbound settlements paid to partners, with bank reference and clearing status.',
    columns: ['Partner', 'Period', 'Amount', 'Bank Reference', 'Status'],
    sampleRows: [
      ['James Hargreaves', 'Apr 2026', '€ 7,420', 'PAY-44821', 'Settled'],
      ['Sarah Mitchell', 'Apr 2026', '€ 5,940', 'PAY-44822', 'Settled'],
      ['David Chen', 'Apr 2026', '€ 2,810', 'PAY-44823', 'Settled'],
      ['Emma Thornton', 'Apr 2026', '€ 1,640', 'PAY-44824', 'Pending'],
      ['Robert Walsh', 'Apr 2026', '€ 880', 'PAY-44825', 'Settled'],
    ],
  },
  {
    key: 'activity',
    title: 'ACTIVITY LOG',
    description:
      'Audit trail of administrative actions across partners, customers and reconciliations.',
    columns: ['Timestamp', 'User', 'Action', 'Entity', 'IP Address'],
    sampleRows: [
      ['2026-05-15 09:42', 'sarah@abcbullion.com', 'Approve KYC', 'C-1052', '10.42.1.18'],
      ['2026-05-15 09:11', 'mark@abcbullion.com', 'Lock Partner', 'GP-007', '10.42.1.22'],
      ['2026-05-14 16:08', 'admin@abcbullion.com', 'Match Transaction', 'REF-TRX-8823', '10.42.1.04'],
      ['2026-05-14 14:32', 'sarah@abcbullion.com', 'Approve Customer', 'C-1041', '10.42.1.18'],
      ['2026-05-13 11:20', 'admin@abcbullion.com', 'Edit Tariff', 'M-12', '10.42.1.04'],
    ],
  },
]

type ReportState = {
  month: string
  year: string
  generated: boolean
  loading: boolean
}

function initialState(): Record<ReportKey, ReportState> {
  return {
    commission: { month: 'May', year: '2026', generated: false, loading: false },
    customer: { month: 'May', year: '2026', generated: false, loading: false },
    settlement: { month: 'Apr', year: '2026', generated: false, loading: false },
    activity: { month: 'May', year: '2026', generated: false, loading: false },
  }
}

export default function StaffReports() {
  const [state, setState] = useState<Record<ReportKey, ReportState>>(initialState)
  const { showToast } = useToast()

  const update = (k: ReportKey, patch: Partial<ReportState>) =>
    setState((prev) => ({ ...prev, [k]: { ...prev[k], ...patch } }))

  const generate = (k: ReportKey) => {
    update(k, { loading: true, generated: false })
    window.setTimeout(() => {
      update(k, { loading: false, generated: true })
    }, 800)
  }

  const exportCsv = () => {
    showToast('Export prepared', 'success')
  }

  return (
    <div className={styles.page}>
      <PageHeader
        title="Reports"
        subtitle="Generate and export operational reports"
      />

      <div className={styles.reportsGrid}>
        {REPORTS.map((r) => {
          const s = state[r.key]
          return (
            <Card key={r.key} title={r.title}>
              <p className={styles.reportDescription}>{r.description}</p>

              <div className={styles.reportControls}>
                <select
                  className={styles.reportSelect}
                  value={s.month}
                  onChange={(e) => update(r.key, { month: e.target.value })}
                  aria-label={`${r.title} month`}
                >
                  {MONTHS.map((m) => (
                    <option key={m} value={m}>
                      {m}
                    </option>
                  ))}
                </select>
                <select
                  className={styles.reportSelect}
                  value={s.year}
                  onChange={(e) => update(r.key, { year: e.target.value })}
                  aria-label={`${r.title} year`}
                >
                  {YEARS.map((y) => (
                    <option key={y} value={y}>
                      {y}
                    </option>
                  ))}
                </select>
                <button
                  type="button"
                  className={`${styles.rowBtn} ${styles.rowBtnGold}`}
                  onClick={() => generate(r.key)}
                  disabled={s.loading}
                >
                  {s.loading ? 'Generating…' : 'Generate'}
                </button>
              </div>

              {s.generated && (
                <>
                  <div className={business.tableWrap}>
                    <table className={business.table}>
                      <thead>
                        <tr>
                          {r.columns.map((c) => (
                            <th key={c}>{c}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {r.sampleRows.map((row, i) => (
                          <tr key={i}>
                            {row.map((cell, j) => (
                              <td key={j}>{cell}</td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <div className={styles.reportFooter}>
                    <button
                      type="button"
                      className={`${styles.rowBtn} ${styles.rowBtnGoldOutline}`}
                      onClick={exportCsv}
                    >
                      Export CSV
                    </button>
                  </div>
                </>
              )}
            </Card>
          )
        })}
      </div>
    </div>
  )
}
