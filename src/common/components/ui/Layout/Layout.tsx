import { PropsWithChildren } from 'react'

import styles from './Layout.module.css'
import { Topbar } from '@components/ui'

const Layout = ({ children }: PropsWithChildren) => {
  return (
    <div className={styles.container}>
      <header className={styles.topbar}>
        <Topbar />
      </header>
      <main className={styles.content}>{children}</main>
    </div>
  )
}

export default Layout
