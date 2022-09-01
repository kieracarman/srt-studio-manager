import { useNavigate } from 'react-router-dom'

import styles from './TicketListItem.module.css'

const TicketListItem = ({ id, title, createdBy, assignedRole, status }) => {
  const navigate = useNavigate()

  return (
    <tr className={styles.listItem} onClick={() => navigate(`/tickets/${id}`)}>
      <td className='bold'>{title}</td>
      <td>{createdBy}</td>
      <td>{assignedRole}</td>
      <td>
        <span
          className={`${styles.statusTag} ${
            status === 'pending'
              ? styles.pending
              : status === 'in progress'
              ? styles.inProgress
              : status === 'complete'
              ? styles.complete
              : ''
          }`}
        >
          {status}
        </span>
      </td>
    </tr>
  )
}

export default TicketListItem
