import Link from 'next/link'

import styles from './UserListItem.module.css'

type UserListItemProps = {
  id: string
  name: string | null
  role: string
  accessLevel: string
}

const UserListItem = ({ id, name, role, accessLevel }: UserListItemProps) => {
  return (
    <Link href={`/users/${id}`} legacyBehavior>
      <tr className={styles.listItem}>
        <td className='bold'>{name}</td>
        <td>{role}</td>
        <td>{accessLevel}</td>
      </tr>
    </Link>
  );
}

export default UserListItem
