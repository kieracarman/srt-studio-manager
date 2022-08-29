import { useNavigate } from 'react-router-dom'

import styles from './UserListItem.module.css'

const UserListItem = (props) => {
  const navigate = useNavigate()

  return (
    <tr
      className={styles.listItem}
      onClick={() => navigate(`/users/${props.id}`)}
    >
      <td className='bold'>{props.username}</td>
      <td>{props.role}</td>
      <td>{props.accessLevel}</td>
    </tr>
  )
}

export default UserListItem
