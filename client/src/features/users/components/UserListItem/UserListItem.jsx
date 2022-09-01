import { useNavigate } from 'react-router-dom'

import styles from './UserListItem.module.css'

const UserListItem = ({ id, username, role, accessLevel }) => {
  const navigate = useNavigate()

  return (
    <tr className={styles.listItem} onClick={() => navigate(`/users/${id}`)}>
      <td className='bold'>{username}</td>
      <td>{role}</td>
      <td>{accessLevel}</td>
    </tr>
  )
}

export default UserListItem
