import Card from '../../components/Card'
import PageHeader from '../../components/PageHeader'
import PartnerSelector from '../../components/PartnerSelector'
import { usePartnerView } from '../../context/PartnerViewContext'
import { scaleAmount } from '../../utils/scale'
import styles from './Business.module.css'

type Settlement = {
  id: string
  period: string
  payoutDate: string
  gross: string
  fees: string
  net: string
  status: 'paid' | 'pending'
}

const ROWS: Settlement[] = [
  { id: 'STL-2026-05', period: 'May 2026', payoutDate: '2026-06-05', gross: '€ 2,140.00', fees: '- € 220.00', net: '€ 1,920.00', status: 'pending' },
  { id: 'STL-2026-04', period: 'April 2026', payoutDate: '2026-05-05', gross: '€ 2,380.00', fees: '- € 240.00', net: '€ 2,140.00', status: 'paid' },
  { id: 'STL-2026-03', period: 'March 2026', payoutDate: '2026-04-05', gross: '€ 1,820.00', fees: '- € 180.00', net: '€ 1,640.00', status: 'paid' },
  { id: 'STL-2026-02', period: 'February 2026', payoutDate: '2026-03-05', gross: '€ 1,540.00', fees: '- € 160.00', net: '€ 1,380.00', status: 'paid' },
  { id: 'STL-2026-01', period: 'January 2026', payoutDate: '2026-02-05', gross: '€ 1,290.00', fees: '- € 130.00', net: '€ 1,160.00', status: 'paid' },
]

export default function Settlements() {
  const { factor, partner } = usePartnerView()

  return (
    <div className={styles.page}>
      <PageHeader
        title="Settlements"
        subtitle={partner ? `Settlements for ${partner.name}` : 'Monthly payout history'}
        actions={
          <button type="button" className={styles.btnSecondary}>
            Export CSV
          </button>
        }
      />

      <PartnerSelector />

      <Card title="SETTLEMENT RUNS">
        <div className={styles.tableWrap}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>ID</th>
                <th>Period</th>
                <th>Payout date</th>
                <th>Gross</th>
                <th>Fees</th>
                <th>Net</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {ROWS.map((r) => (
                <tr key={r.id}>
                  <td>{r.id}</td>
                  <td>{r.period}</td>
                  <td>{r.payoutDate}</td>
                  <td>{scaleAmount(r.gross, factor)}</td>
                  <td>{scaleAmount(r.fees, factor)}</td>
                  <td className={styles.amount}>{scaleAmount(r.net, factor)}</td>
                  <td>
                    <span
                      className={`${styles.statusBadge} ${r.status === 'paid' ? styles.statusPaid : styles.statusPending}`}
                    >
                      {r.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  )
}
