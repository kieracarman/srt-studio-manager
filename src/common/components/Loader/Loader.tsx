import { PulseLoader } from 'react-spinners'

import styles from './Loader.module.css'

const Loader = () => {
  return (
    <div className={styles.container}>
      <PulseLoader />
    </div>
  )
}

export default Loader
