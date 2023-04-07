import { Room, User } from '@prisma/client'
import Link from 'next/link'

import styles from './BookingListItem.module.css'

type BookingListItemProps = {
  id: string
  description: string
  createdBy: User
  room: Room
  startDate: Date
  status: string
}

const BookingListItem = ({
  id,
  description,
  createdBy,
  room,
  startDate,
  status
}: BookingListItemProps) => {
  return (
    <Link href={`/bookings/${id}`} legacyBehavior>
      <tr className={styles.listItem}>
        <td className='bold'>{description}</td>
        <td>{createdBy.name}</td>
        <td>{room.name}</td>
        <td>{startDate.toLocaleDateString()}</td>
        <td>
          <span
            className={`${styles.statusTag} ${
              status === 'in'
                ? styles.complete
                : status === 'out'
                ? styles.inProgress
                : status === 'lost'
                ? styles.pending
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

export default BookingListItem
