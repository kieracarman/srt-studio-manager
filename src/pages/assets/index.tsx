import { useState } from 'react'
import { trpc } from '@utils/trpc'

import { Layout, SearchBar, Loader } from '@components/ui'
import AssetList from '@modules/assets/AssetList/AssetList'

const Assets = () => {
  const [searchQuery, setSearchQuery] = useState('')

  const { data, isLoading, isSuccess, isError, error } = trpc.useQuery([
    'asset.getAll'
  ])

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
