import React from 'react';
import { useNavigate } from 'react-router-dom';

import styles from './BookingListItem.module.css';

const BookingListItem = (props) => {
  const navigate = useNavigate();

  return (
    <tr className={styles.listItem} onClick={() => navigate(`/bookings/${props.id}`)}>
      <td className='bold'>{props.title}</td>
      <td>{props.author}</td>
      <td>{props.room}</td>
      <td>{props.bookingDate}</td>
      <td><span className={`${styles.statusTag} ${
        (props.status === 'in') ? styles.complete
        : (props.status === 'out') ? styles.inProgress
        : (props.status === 'lost') ? styles.pending
        : ''
      }`}>{props.status}</span></td>
    </tr>
  );
};

export default BookingListItem;