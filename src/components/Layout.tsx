import type { ReactNode } from 'react'
import Header from './Header'
import styles from './Layout.module.css'

type Props = {
  children: ReactNode
}

export default function Layout({ children }: Props) {
  return (
    <div className={styles.shell}>
      <Header />
      <main className={styles.main}>{children}</main>
    </div>
  )
}
