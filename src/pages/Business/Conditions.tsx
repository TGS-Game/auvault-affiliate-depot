import Card from '../../components/Card'
import PageHeader from '../../components/PageHeader'
import styles from './Business.module.css'

export default function Conditions() {
  return (
    <div className={styles.page}>
      <PageHeader
        title="Conditions"
        subtitle="Terms governing your affiliate relationship"
      />

      <Card title="AFFILIATE TERMS &amp; CONDITIONS">
        <div className={styles.prose}>
          <h3>1. Commission Structure</h3>
          <p>
            Commissions are calculated on a per-transaction basis at the rates
            defined on the Acquisition Commission page. Rates are subject to
            change with 30 days notice. Commission is earned when a referred
            customer&apos;s deposit clears, and becomes available for payout
            after the 14-day clawback period.
          </p>

          <h3>2. Payout Schedule</h3>
          <p>
            Payouts run on the 5th of each calendar month for earnings cleared
            in the preceding month. Minimum payout threshold is € 100.00. Below
            this threshold, the balance rolls forward to the next settlement.
          </p>

          <h3>3. Downline &amp; Tier Rules</h3>
          <p>
            Partners you directly sponsor count as Tier 1. Their referrals
            populate Tier 2, and so on up to Tier 3. Downline commissions
            override your direct commission rate per the published tier table.
            Compression applies if an intermediate partner becomes inactive.
          </p>

          <h3>4. Permitted Marketing</h3>
          <p>
            You may promote AuVault using the assets and copy provided on the
            Landing Page page. Paid search bidding on the AuVault brand name is
            not permitted. Any custom claims about returns, tax treatment, or
            insurance must be reviewed by compliance before publication.
          </p>

          <h3>5. Account Locking &amp; Termination</h3>
          <p>
            AuVault may lock or terminate an affiliate account at any time if
            we detect fraud, prohibited marketing, or a regulatory concern.
            Earned commissions outstanding at termination will be paid out
            within 90 days, subject to any compliance hold.
          </p>

          <h3>6. Data &amp; Privacy</h3>
          <p>
            You access customer data only via aggregated downline reporting.
            Sharing or selling customer-level information is grounds for
            immediate termination. We process all data under the AuVault
            Privacy Notice and applicable EU/UK data-protection law.
          </p>
        </div>
      </Card>
    </div>
  )
}
