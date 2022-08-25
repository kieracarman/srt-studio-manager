import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'

import styles from './Assets.module.css'
import { getAssets } from '../../actions/assets'
import { SearchBar } from '../../components'
import { AssetList } from '../../components/Assets'

const Assets = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getAssets())

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

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
