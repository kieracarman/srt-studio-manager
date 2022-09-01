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

  let content
  let assetsList

  if (isLoading) content = <p>Loading...</p>

  if (isError) {
    assetsList = (
      <AssetList query={searchQuery} assets={[]} error={error?.data?.message} />
    )
  }

  if (isSuccess) {
    const { ids } = assets

    const assetsArray = ids.map((id) => {
      return assets.entities[id]
    })

    assetsList = <AssetList query={searchQuery} assets={assetsArray} />
  }

  content = (
    <section className={styles.assets}>
      <SearchBar
        item='Asset'
        newItemPath='/assets/new'
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />
      {assetsList}
    </section>
  )

  return content
}

export default Assets
