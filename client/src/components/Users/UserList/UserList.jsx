import { useSelector } from 'react-redux'

import styles from './UserList.module.css'
import { UserListItem } from '../'
import { useTableData } from '../../../hooks'

const UserList = (props) => {
  const { users, isLoading } = useSelector((state) => state.users)
  const { tableData, requestSort, sortArrow } = useTableData(users)

  const filterArray = (array) => {
    return array.filter((item) => {
      return props.query !== ''
        ? [item._id, item.username]
            .join(' ')
            .toString()
            .toLowerCase()
            .indexOf(props.query.toLowerCase()) > -1
        : true
    })
  }

  const listUsers = () => {
    return filterArray(tableData).map((user) => {
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
  }

  return (
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
      <tbody>
        {isLoading ? (
          <tr>
            <td>Loading...</td>
          </tr>
        ) : (
          listUsers()
        )}
      </tbody>
    </table>
  )
}

export default UserList
