import styles from './UserList.module.css'
import { UserListItem } from '../'
import { useTableData } from '../../../../hooks'

const UserList = ({ query, users }) => {
  const { tableData, requestSort, sortArrow } = useTableData(users)

  const filterArray = (array) => {
    return array.filter((item) => {
      return query !== ''
        ? [item._id, item.username]
            .join(' ')
            .toString()
            .toLowerCase()
            .indexOf(query.toLowerCase()) > -1
        : true
    })
  }

  const tableContent = filterArray(tableData).map((user) => {
    return (
      <UserListItem
        key={user._id}
        id={user._id}
        username={user.username}
        role={user.role}
        accessLevel={user.accessLevel}
      />
    )
  })

  const content = (
    <table className={styles.list}>
      <thead>
        <tr>
          <th onClick={() => requestSort('username')}>
            Username{sortArrow('username')}
          </th>
          <th onClick={() => requestSort('role')}>Role{sortArrow('role')}</th>
          <th onClick={() => requestSort('accessLevel')}>
            Access Level{sortArrow('accessLevel')}
          </th>
        </tr>
      </thead>
      <tbody>{tableContent}</tbody>
    </table>
  )

  return content
}

export default UserList
