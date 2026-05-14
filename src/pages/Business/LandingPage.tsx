import { useState } from 'react'
import Card from '../../components/Card'
import PageHeader from '../../components/PageHeader'
import { GlobeIcon } from '../../components/icons'
import styles from './Business.module.css'

export default function LandingPage() {
  const [slug, setSlug] = useState('luna-becker')
  const [headline, setHeadline] = useState('Invest in physical gold, with AuVault')
  const [sub, setSub] = useState(
    'Tax-efficient gold ownership with secure Swiss vault storage. Sign up through me to lock in launch-tier rates.',
  )

  return (
    <div className={styles.page}>
      <PageHeader
        title="Landing Page"
        subtitle="Customize your affiliate landing experience"
      />

      <Card title="LANDING URL">
        <div className={styles.landingUrl}>
          <GlobeIcon size={18} />
          <span>auvault.com/p/{slug || '—'}</span>
        </div>
      </Card>

      <Card title="PAGE CONTENT">
        <form className={styles.form} onSubmit={(e) => e.preventDefault()}>
          <div className={styles.formGrid}>
            <label className={`${styles.field} ${styles.fieldFull}`}>
              <span className={styles.fieldLabel}>Slug</span>
              <input
                className={styles.input}
                value={slug}
                onChange={(e) => setSlug(e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, ''))}
              />
            </label>
            <label className={`${styles.field} ${styles.fieldFull}`}>
              <span className={styles.fieldLabel}>Headline</span>
              <input
                className={styles.input}
                value={headline}
                onChange={(e) => setHeadline(e.target.value)}
              />
            </label>
            <label className={`${styles.field} ${styles.fieldFull}`}>
              <span className={styles.fieldLabel}>Sub-headline</span>
              <textarea
                className={styles.textarea}
                value={sub}
                onChange={(e) => setSub(e.target.value)}
              />
            </label>
          </div>
          <div className={styles.formActions}>
            <button type="button" className={styles.btnSecondary}>
              Preview
            </button>
            <button type="submit" className={styles.btnPrimary}>
              Save Changes
            </button>
          </div>
        </form>
      </Card>

      <Card title="PREVIEW">
        <div className={styles.landingPreview}>
          <h3>{headline}</h3>
          <p>{sub}</p>
          <button type="button" className={styles.btnPrimary} style={{ marginTop: 12 }}>
            Open an account
          </button>
        </div>
      </Card>
    </div>
  )
}
