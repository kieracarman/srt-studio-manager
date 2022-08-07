import { useSelector } from 'react-redux';

import styles from './BookingList.module.css';
import { BookingListItem } from '../';
import { useTableData } from '../../../hooks';

const BookingList = (props) => {
  const { bookings, isLoading } = useSelector((state) => state.bookings);
  const { tableData, requestSort, sortArrow } = useTableData(bookings); 
  
  const filterArray = array => {
    return array.filter(item => {
      return props.query !== '' ? (
        [
          item._id,
          item.title,
          item.bookingDate,
          item.author
        ].join(' ')
          .toString()
          .toLowerCase()
          .indexOf(props.query.toLowerCase()) > -1
      ) : true;
    });
  };

  const listBookings = () => {
    return filterArray(tableData).map((booking) => {
      return(
        <BookingListItem
          key={booking._id}
          id={booking._id}
          title={booking.title}
          author={booking.author}
          bookingDate={booking.bookingDate}
          room={booking.room}
          status={booking.status}
        />
      );
    });
  };

  return (
    <table className={styles.list}>
      <thead>
        <tr>
          <th onClick={() => requestSort('title')}>Title{sortArrow('title')}</th>
          <th onClick={() => requestSort('author')}>Author{sortArrow('author')}</th>
          <th onClick={() => requestSort('room')}>Room{sortArrow('room')}</th>
          <th onClick={() => requestSort('bookingDate')}>Booking Date{sortArrow('bookingDate')}</th>
          <th onClick={() => requestSort('status')}>Status{sortArrow('status')}</th>
        </tr>
      </thead>
      <tbody>
        {isLoading ? <tr><td></td><td>Loading...</td></tr> : listBookings()}
      </tbody>
    </table>
  );
};

export default BookingList;