import { Room } from '@prisma/client'

import styles from './RoomList.module.css'
import RoomListItem from '../RoomListItem/RoomListItem'
import useTableData from '@hooks/useTableData'
import { Empty, Loader } from '@components/ui'

type RoomListProps = {
  query: string
  rooms: Room[]
  error?: string
}

const RoomList = ({ query, rooms, error }: RoomListProps) => {
  const { tableData, requestSort, sortArrow } = useTableData<Room>(rooms, {
    direction: '',
    key: ''
  })

  const filterArray = (array: Room[]) => {
    return array.filter((item) => {
      return query !== ''
        ? [item.id, item.name]
            .join(' ')
            .toString()
            .toLowerCase()
            .indexOf(query.toLowerCase()) > -1
        : true
    })
  }

  const tableContent = filterArray(tableData).map((room) => {
    return <RoomListItem key={room.id} id={room.id} name={room.name} />
  })

  let content

  if (rooms.length === 0) {
    content = <Empty item='room' />
  } else if (rooms.length !== 0) {
    content = (
      <table className={styles.list}>
        <thead>
          <tr>
            <th onClick={() => requestSort('name')}>Room{sortArrow('name')}</th>
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

export default RoomList
