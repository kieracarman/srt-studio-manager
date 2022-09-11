import { Room, User } from '@prisma/client'
import Link from 'next/link'

import styles from './BookingListItem.module.css'

type BookingListItemProps = {
  id: string
  title: string
  createdBy: User
  room: Room
  bookingDate: Date
  status: string
}

const BookingListItem = ({
  id,
  title,
  createdBy,
  room,
  bookingDate,
  status
}: BookingListItemProps) => {
  return (
    <Link href={`/bookings/${id}`}>
      <tr className={styles.listItem}>
        <td className='bold'>{title}</td>
        <td>{`${createdBy.firstName} ${createdBy.lastName}`}</td>
        <td>{room.name}</td>
        <td>{bookingDate.toString()}</td>
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
  )
}

export default BookingListItem
