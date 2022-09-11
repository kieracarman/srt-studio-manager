import Link from 'next/link'

import styles from './UserListItem.module.css'

type UserListItemProps = {
  id: string
  firstName: string
  lastName: string
  role: string
  accessLevel: string
}

const UserListItem = ({
  id,
  firstName,
  lastName,
  role,
  accessLevel
}: UserListItemProps) => {
  return (
    <Link href={`/users/${id}`}>
      <tr className={styles.listItem}>
        <td className='bold'>{`${firstName} ${lastName}`}</td>
        <td>{role}</td>
        <td>{accessLevel}</td>
      </tr>
    </Link>
  )
}

export default UserListItem
