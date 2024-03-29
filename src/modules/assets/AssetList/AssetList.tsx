import { Prisma } from '@prisma/client'

import styles from './AssetList.module.css'
import AssetListItem from '../AssetListItem/AssetListItem'
import useTableData from '@hooks/useTableData'
import { Empty, Loader } from '@components/ui'

type AssetWithLocation = Prisma.AssetGetPayload<{
  include: { location: true }
}>

type AssetListProps = {
  query: string
  assets: AssetWithLocation[]
  error?: string
}

const AssetList = ({ query, assets, error }: AssetListProps) => {
  const { tableData, requestSort, sortArrow } = useTableData<AssetWithLocation>(
    assets,
    {
      direction: '',
      key: ''
    }
  )

  const filterArray = (array: AssetWithLocation[]) => {
    return array.filter((item) => {
      return query !== ''
        ? [item.id, item.description, item.tagNumber, item.make, item.model]
            .join(' ')
            .toString()
            .toLowerCase()
            .indexOf(query.toLowerCase()) > -1
        : true
    })
  }

  const tableContent = filterArray(tableData).map((asset) => {
    return (
      <AssetListItem
        key={asset.id}
        id={asset.id}
        tagNumber={asset.tagNumber}
        description={asset.description}
        make={asset.make}
        model={asset.model}
        location={asset.location}
        status={asset.status}
      />
    )
  })

  let content

  if (assets.length === 0) {
    content = <Empty item='asset' />
  } else if (assets.length !== 0) {
    content = (
      <table className={styles.list}>
        <thead>
          <tr>
            <th onClick={() => requestSort('tagNumber')}>
              Tag #{sortArrow('tagNumber')}
            </th>
            <th onClick={() => requestSort('description')}>
              Description{sortArrow('description')}
            </th>
            <th onClick={() => requestSort('make')}>Make{sortArrow('make')}</th>
            <th onClick={() => requestSort('model')}>
              Model{sortArrow('model')}
            </th>
            <th onClick={() => requestSort('location')}>
              Location{sortArrow('location')}
            </th>
            <th onClick={() => requestSort('status')}>
              Status{sortArrow('status')}
            </th>
          </tr>
        </thead>
        <tbody>
          {error && (
            <tr>
              <td className='errmsg'>{error}</td>
            </tr>
          )}
          {tableContent}
        </tbody>
      </table>
    )
  } else {
    content = <Loader />
  }

  return content
}

export default AssetList
