import { PropsWithChildren } from 'react'

import styles from './Layout.module.css'
import { Navbar, Topbar } from '@components/ui'

const Layout = ({ children }: PropsWithChildren) => {
  return (
    <div className={styles.container}>
      <header className={styles.topbar}>
        <Topbar />
      </header>
      <main className={styles.content}>{children}</main>
      <nav className={styles.navbar}>
        <Navbar />
      </nav>
    </div>
  )
}

export default Layout
