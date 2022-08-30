import { useState } from 'react'

import styles from './Assets.module.css'
import { SearchBar } from '../../components'
import { AssetList } from './components'

const Assets = () => {
  const [searchQuery, setSearchQuery] = useState('')

  return (
    <section className={styles.assets}>
      <SearchBar
        item='Asset'
        newItemPath='/assets/new'
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />
      <AssetList query={searchQuery} />
    </section>
  )
}

export default Assets
