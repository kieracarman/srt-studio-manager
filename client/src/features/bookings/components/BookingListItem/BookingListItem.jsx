import { useNavigate } from 'react-router-dom'

import styles from './BookingListItem.module.css'

const BookingListItem = ({ id, title, author, room, bookingDate, status }) => {
  const navigate = useNavigate()

  return (
    <tr className={styles.listItem} onClick={() => navigate(`/bookings/${id}`)}>
      <td className='bold'>{title}</td>
      <td>{author}</td>
      <td>{room}</td>
      <td>{bookingDate}</td>
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
  )
}

export default BookingListItem
