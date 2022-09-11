import { User } from '@prisma/client'

import styles from './UserList.module.css'
import UserListItem from '../UserListItem/UserListItem'
import useTableData from '@hooks/useTableData'

type UserListProps = {
  query: string
  users: User[]
  error?: string
}

const UserList = ({ query, users, error }: UserListProps) => {
  const { tableData, requestSort, sortArrow } = useTableData<User>(users, {
    direction: '',
    key: ''
  })

  const filterArray = (array: User[]) => {
    return array.filter((item) => {
      return query !== ''
        ? [item.id, item.firstName, item.lastName, item.role, item.accessLevel]
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
        key={user.id}
        id={user.id}
        firstName={user.firstName}
        lastName={user.lastName}
        role={user.role}
        accessLevel={user.accessLevel}
      />
    )
  })

  const content = (
    <table className={styles.list}>
      <thead>
        <tr>
          <th onClick={() => requestSort('firstName')}>
            Name{sortArrow('firstName')}
          </th>
          <th onClick={() => requestSort('role')}>Role{sortArrow('role')}</th>
          <th onClick={() => requestSort('accessLevel')}>
            Access Level{sortArrow('accessLevel')}
          </th>
        </tr>
      </thead>
      <tbody>
        {error && (
          <tr>
            <td>{error}</td>
          </tr>
        )}
        {tableContent}
      </tbody>
    </table>
  )

  return content
}

export default UserList
