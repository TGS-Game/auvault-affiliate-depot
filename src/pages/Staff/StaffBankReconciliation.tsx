import { useMemo, useRef, useState, type DragEvent } from 'react'
import Card from '../../components/Card'
import PageHeader from '../../components/PageHeader'
import business from '../Business/Business.module.css'
import styles from './Staff.module.css'

type ReconStatus = 'Matched' | 'Unmatched' | 'Pending'

type ReconRow = {
  id: string
  date: string
  ref: string
  amount: number
  party: string
  status: ReconStatus
}

const INITIAL_ROWS: ReconRow[] = [
  { id: '1', date: '12 May', ref: 'REF-TRX-8821', amount: 1200, party: 'James Hargreaves (GP-001)', status: 'Matched' },
  { id: '2', date: '12 May', ref: 'REF-TRX-8822', amount: 450, party: 'Alice Brennan', status: 'Matched' },
  { id: '3', date: '13 May', ref: 'REF-TRX-8823', amount: 3400, party: 'Unknown', status: 'Unmatched' },
  { id: '4', date: '13 May', ref: 'REF-TRX-8824', amount: 780, party: 'Thomas Okafor', status: 'Matched' },
  { id: '5', date: '14 May', ref: 'REF-TRX-8825', amount: 220, party: 'Unknown', status: 'Unmatched' },
  { id: '6', date: '14 May', ref: 'REF-TRX-8826', amount: 5600, party: 'Sarah Mitchell (GP-002)', status: 'Matched' },
  { id: '7', date: '15 May', ref: 'REF-TRX-8827', amount: 990, party: 'Yuki Tanaka', status: 'Pending' },
  { id: '8', date: '15 May', ref: 'REF-TRX-8828', amount: 1850, party: 'David Chen (GP-003)', status: 'Matched' },
]

const MATCH_CANDIDATES = [
  'James Hargreaves (GP-001)',
  'Sarah Mitchell (GP-002)',
  'David Chen (GP-003)',
  'Emma Thornton (GP-004)',
  'Robert Walsh (GP-005)',
  'Priya Patel (GP-006)',
  'Claire Donovan (GP-008)',
  'Alice Brennan',
  'Thomas Okafor',
  'Yuki Tanaka',
  'Lukas Becker',
  'Maria Costa',
]

function formatEuro(n: number) {
  return `€ ${n.toLocaleString('en-IE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
}

function statusClass(s: ReconStatus) {
  if (s === 'Matched') return styles.reconStatusMatched
  if (s === 'Unmatched') return styles.reconStatusUnmatched
  return styles.reconStatusPending
}

type Stage = 'idle' | 'processing' | 'ready'

export default function StaffBankReconciliation() {
  const [stage, setStage] = useState<Stage>('idle')
  const [filename, setFilename] = useState<string | null>(null)
  const [dragOver, setDragOver] = useState(false)
  const [rows, setRows] = useState<ReconRow[]>(INITIAL_ROWS)
  const [matching, setMatching] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState('')
  const fileInput = useRef<HTMLInputElement>(null)

  const totals = useMemo(() => {
    let total = 0
    let matched = 0
    let unmatched = 0
    for (const r of rows) {
      total += r.amount
      if (r.status === 'Matched') matched += r.amount
      else if (r.status === 'Unmatched') unmatched += r.amount
    }
    return { total, matched, unmatched }
  }, [rows])

  const handleFile = (f: File) => {
    setFilename(f.name)
    setStage('processing')
    setRows(INITIAL_ROWS) // reset row state on new upload
    window.setTimeout(() => setStage('ready'), 1500)
  }

  const onDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setDragOver(false)
    const f = e.dataTransfer.files?.[0]
    if (f) handleFile(f)
  }

  const onDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setDragOver(true)
  }

  const onDragLeave = () => setDragOver(false)

  const openPicker = () => fileInput.current?.click()

  const onPick = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0]
    if (f) handleFile(f)
    e.target.value = ''
  }

  const startMatch = (id: string) => {
    setMatching(id)
    setSearchTerm('')
  }

  const completeMatch = (id: string, partyName: string) => {
    setRows((prev) =>
      prev.map((r) =>
        r.id === id ? { ...r, party: partyName, status: 'Matched' } : r,
      ),
    )
    setMatching(null)
    setSearchTerm('')
  }

  const suggestions = MATCH_CANDIDATES.filter((c) =>
    c.toLowerCase().includes(searchTerm.toLowerCase().trim()),
  ).slice(0, 6)

  return (
    <div className={styles.page}>
      <PageHeader
        title="Bank Reconciliation"
        subtitle="Upload statements and match transactions to partners and customers"
      />

      <Card title="UPLOAD STATEMENT">
        <div
          className={`${styles.uploadZone}${dragOver ? ' ' + styles.uploadZoneActive : ''}`}
          onDragOver={onDragOver}
          onDragLeave={onDragLeave}
          onDrop={onDrop}
          onClick={openPicker}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') openPicker()
          }}
          aria-label="Upload bank statement"
        >
          <div className={styles.uploadIcon} aria-hidden>
            ↑
          </div>
          <p className={styles.uploadLabel}>
            Upload bank statement (CSV or PDF)
          </p>
          <p className={styles.uploadHint}>
            Drag and drop a file here, or click to browse
          </p>
          {filename && (
            <p className={styles.uploadFilename}>{filename}</p>
          )}
          {stage === 'processing' && (
            <p className={styles.processing}>
              <span className={styles.spinner} aria-hidden />
              Processing…
            </p>
          )}
          <input
            ref={fileInput}
            type="file"
            accept=".csv,.pdf"
            style={{ display: 'none' }}
            onChange={onPick}
          />
        </div>
      </Card>

      {stage === 'ready' && (
        <Card title="RECONCILIATION">
          <div className={business.tableWrap}>
            <table className={business.table}>
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Reference</th>
                  <th>Amount</th>
                  <th>Party</th>
                  <th>Status</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {rows.map((r) => {
                  const isMatching = matching === r.id
                  return (
                    <tr key={r.id}>
                      <td>{r.date}</td>
                      <td>{r.ref}</td>
                      <td className={business.amount}>+{formatEuro(r.amount)}</td>
                      <td>{r.party}</td>
                      <td>
                        <span
                          className={`${styles.reconStatus} ${statusClass(r.status)}`}
                        >
                          {r.status}
                        </span>
                      </td>
                      <td>
                        {r.status === 'Unmatched' && !isMatching && (
                          <button
                            type="button"
                            className={`${styles.rowBtn} ${styles.rowBtnGoldOutline}`}
                            onClick={() => startMatch(r.id)}
                          >
                            Match Manually
                          </button>
                        )}
                        {isMatching && (
                          <div className={styles.matchSearchWrap}>
                            <input
                              autoFocus
                              className={styles.matchSearchInput}
                              placeholder="Search partner or customer…"
                              value={searchTerm}
                              onChange={(e) => setSearchTerm(e.target.value)}
                              onBlur={() => window.setTimeout(() => setMatching((m) => (m === r.id ? null : m)), 150)}
                            />
                            {searchTerm && suggestions.length > 0 && (
                              <div className={styles.matchSuggestions}>
                                {suggestions.map((s) => (
                                  <button
                                    key={s}
                                    type="button"
                                    className={styles.matchSuggestion}
                                    onMouseDown={(e) => {
                                      e.preventDefault()
                                      completeMatch(r.id, s)
                                    }}
                                  >
                                    {s}
                                  </button>
                                ))}
                              </div>
                            )}
                          </div>
                        )}
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>

          <div className={styles.summaryBar}>
            <div className={styles.summaryItem}>
              <span className={styles.summaryLabel}>Total In</span>
              <span className={styles.summaryValue}>{formatEuro(totals.total)}</span>
            </div>
            <div className={styles.summaryItem}>
              <span className={styles.summaryLabel}>Matched</span>
              <span className={styles.summaryValue}>{formatEuro(totals.matched)}</span>
            </div>
            <div className={styles.summaryItem}>
              <span className={styles.summaryLabel}>Unmatched</span>
              <span className={styles.summaryValue}>{formatEuro(totals.unmatched)}</span>
            </div>
          </div>
        </Card>
      )}
    </div>
  )
}
