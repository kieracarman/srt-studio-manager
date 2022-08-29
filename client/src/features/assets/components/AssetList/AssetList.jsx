import { useSelector } from 'react-redux'

import styles from './AssetList.module.css'
import { AssetListItem } from '../'
import { useTableData } from '../../../../hooks'

const AssetList = (props) => {
  const { assets, isLoading } = useSelector((state) => state.assets)
  const { tableData, requestSort, sortArrow } = useTableData(assets)

  const filterArray = (array) => {
    return array.filter((item) => {
      return props.query !== ''
        ? [item._id, item.description, item.tagNumber, item.make, item.model]
            .join(' ')
            .toString()
            .toLowerCase()
            .indexOf(props.query.toLowerCase()) > -1
        : true
    })
  }

  const listAssets = () => {
    return filterArray(tableData).map((asset) => {
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
  }

  return (
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
        {isLoading ? (
          <tr>
            <td></td>
            <td>Loading...</td>
          </tr>
        ) : (
          listAssets()
        )}
      </tbody>
    </table>
  )
}

export default AssetList
