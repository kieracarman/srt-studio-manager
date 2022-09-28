import { useState } from 'react'
import { trpc } from '@utils/trpc'

import styles from './Assets.module.css'
import Layout from '@components/Layout/Layout'
import SearchBar from '@components/SearchBar/SearchBar'
import AssetList from '@modules/assets/AssetList/AssetList'

const Assets = () => {
  const [searchQuery, setSearchQuery] = useState('')

  const { data, isLoading, isSuccess, isError, error } = trpc.useQuery([
    'asset.getAll'
  ])

  let content
  let assetsList

  if (isLoading) content = <p>Loading...</p>

  if (isError) {
    assetsList = (
      <AssetList query={searchQuery} assets={[]} error={error?.message} />
    )
  }

  if (isSuccess) {
    assetsList = <AssetList query={searchQuery} assets={data} />
  }

  content = (
    <Layout>
      <section className={styles.assets}>
        <SearchBar
          item='Asset'
          newItemPath='/assets/new'
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
        />
        {assetsList}
      </section>
    </Layout>
  )

  return content
}

export default Assets
