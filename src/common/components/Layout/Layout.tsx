import { PropsWithChildren } from 'react'

import styles from './Layout.module.css'
import Topbar from '@components/Topbar/Topbar'
import Navbar from '@components/Navbar/Navbar'

const Layout = ({ children }: PropsWithChildren) => (
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

export default Layout
