import type { ReactNode } from 'react'
import Card from '../../components/Card'
import PageHeader from '../../components/PageHeader'
import styles from './Placeholder.module.css'

type Props = {
  title: string
  description: string
  icon: ReactNode
}

export default function ComingSoonPage({ title, description, icon }: Props) {
  return (
    <div>
      <PageHeader title={title} />
      <Card noTitle title="">
        <div className={styles.placeholder}>
          <span className={styles.iconWrap}>{icon}</span>
          <h2 className={styles.heading}>Coming Soon</h2>
          <p className={styles.body}>{description}</p>
        </div>
      </Card>
    </div>
  )
}
