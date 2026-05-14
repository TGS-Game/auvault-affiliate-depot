import type { ReactNode } from 'react'
import styles from './Card.module.css'

type Props = {
  title?: string
  children: ReactNode
  className?: string
  toolbar?: ReactNode
  /** Hide the burgundy section title above the card */
  noTitle?: boolean
}

export default function Card({
  title,
  children,
  className,
  toolbar,
  noTitle,
}: Props) {
  return (
    <div className={`${styles.wrap}${className ? ' ' + className : ''}`}>
      {!noTitle && title && (
        <div className={styles.titleRow}>
          <h2 className={styles.title}>{title}</h2>
          {toolbar && <div className={styles.toolbar}>{toolbar}</div>}
        </div>
      )}
      <div className={styles.card}>
        <div className={styles.shineTop} aria-hidden />
        <div className={styles.shineRight} aria-hidden />
        <div className={styles.body}>{children}</div>
      </div>
    </div>
  )
}
