import { useState } from 'react'

import styles from './Assets.module.css'
import { SearchBar } from '../../components'
import { AssetList } from './components'
import { useGetAssetsQuery } from './assetsApiSlice'

const Assets = () => {
  const [searchQuery, setSearchQuery] = useState('')

  const {
    data: assets,
    isLoading,
    isSuccess,
    isError,
    error
  } = useGetAssetsQuery('assetsList', {
    pollingInterval: 15000,
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true
  })

  let assetsArray

  let content

  if (isLoading) content = <p>Loading...</p>

  if (isError) {
    content = <p className='errmsg'>{error?.data?.message}</p>
  }

  if (isSuccess) {
    const { ids } = assets

    assetsArray = ids.map((id) => {
      return assets.entities[id]
    })

    content = (
      <section className={styles.assets}>
        <SearchBar
          item='Asset'
          newItemPath='/assets/new'
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
        />
        <AssetList query={searchQuery} assets={assetsArray} />
      </section>
    )
  }

  return content
}

export default Assets
