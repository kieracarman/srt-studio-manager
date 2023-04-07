import { useState } from 'react'
import { api } from '@utils/api'

import { Layout, SearchBar, Loader } from '@components/ui'
import AssetList from '@modules/assets/AssetList/AssetList'

const Assets = () => {
  const [searchQuery, setSearchQuery] = useState('')

  const { data, isLoading, isSuccess, isError, error } =
    api.asset.getAll.useQuery()

  let content
  let assetsList

  if (isLoading) content = <Loader />

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
      <section className='grid grid-rows-[auto_1fr]'>
        <SearchBar
          item='asset'
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
