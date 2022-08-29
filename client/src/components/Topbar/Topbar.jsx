import { NavLink } from 'react-router-dom'

import styles from './Topbar.module.css'

const Topbar = () => (
  <div className={styles.topbar}>
    <div className={styles.navbarBrand}>
      <NavLink to='/'>SRT Studio Manager</NavLink>
    </div>
  </div>
)

export default Topbar
