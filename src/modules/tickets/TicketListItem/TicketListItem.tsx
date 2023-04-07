import { User } from '@prisma/client'
import Link from 'next/link'

import styles from './TicketListItem.module.css'

type TicketListItemProps = {
  id: string
  title: string
  createdBy: User
  assignedRole: string
  status: string
}

const TicketListItem = ({
  id,
  title,
  createdBy,
  assignedRole,
  status
}: TicketListItemProps) => {
  return (
    <Link href={`/tickets/${id}`} legacyBehavior>
      <tr className={styles.listItem}>
        <td className='bold'>{title}</td>
        <td>{createdBy.name}</td>
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
    </Link>
  );
}

export default TicketListItem
