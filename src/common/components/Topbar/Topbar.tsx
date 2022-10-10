import Link from 'next/link'

import styles from './Topbar.module.css'

const Topbar = () => {
  return (
    <div className={styles.topbar}>
      <div className={styles.navbarBrand}>
        <Link href='/'>SRT Studio Manager</Link>
      </div>
    </div>
  )
}

export default Topbar
