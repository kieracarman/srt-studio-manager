import styles from './AssetList.module.css'
import { useGetAssetsQuery } from '../../assetsApiSlice'
import { AssetListItem } from '../'
import { useTableData } from '../../../../hooks'

const AssetList = ({ query }) => {
  const {
    data: assets,
    isLoading,
    isSuccess,
    isError,
    error
  } = useGetAssetsQuery(null, {
    pollingInterval: 15000,
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true
  })

  const { tableData, requestSort, sortArrow } = useTableData(assets)

  let content

  if (isLoading) content = <p>Loading...</p>
  if (isError) {
    content = <p>{error?.data?.message}</p>
  }

  const filterArray = (array) => {
    return array.filter((item) => {
      return query !== ''
        ? [item._id, item.description, item.tagNumber, item.make, item.model]
            .join(' ')
            .toString()
            .toLowerCase()
            .indexOf(query.toLowerCase()) > -1
        : true
    })
  }

  if (isSuccess) {
    const { ids } = assets

    const tableContent = ids?.length
      ? filterArray(tableData).map((asset) => {
          return (
            <AssetListItem
              key={asset._id}
              id={asset._id}
              tagNumber={asset.tagNumber}
              description={asset.description}
              make={asset.make}
              model={asset.model}
              location={asset.location}
              status={asset.status}
            />
          )
        })
      : null

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
        <tbody>{tableContent}</tbody>
      </table>
    )
  }

  return content
}

export default AssetList
