import Link from 'next/link'

import styles from './UserListItem.module.css'

type UserListItemProps = {
  id: string
  name: string
  role: string
  accessLevel: string
}

const UserListItem = ({ id, name, role, accessLevel }: UserListItemProps) => {
  return (
    <Link href={`/users/${id}`}>
      <tr className={styles.listItem}>
        <td className='bold'>{name}</td>
        <td>{role}</td>
        <td>{accessLevel}</td>
      </tr>
    </Link>
  )
}

export default UserListItem
