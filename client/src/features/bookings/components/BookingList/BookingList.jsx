import styles from './BookingList.module.css'
import { BookingListItem } from '../'
import { useTableData } from '../../../../hooks'

const BookingList = ({ query, bookings, error }) => {
  const { tableData, requestSort, sortArrow } = useTableData(bookings)

  const filterArray = (array) => {
    return array.filter((item) => {
      return query !== ''
        ? [item._id, item.title, item.bookingDate, item.author]
            .join(' ')
            .toString()
            .toLowerCase()
            .indexOf(query.toLowerCase()) > -1
        : true
    })
  }

  const tableContent = filterArray(tableData).map((booking) => {
    return (
      <BookingListItem
        key={booking._id}
        id={booking._id}
        title={booking.title}
        author={booking.author}
        bookingDate={booking.bookingDate}
        room={booking.room}
        status={booking.status}
      />
    )
  })

  const content = (
    <table className={styles.list}>
      <thead>
        <tr>
          <th onClick={() => requestSort('title')}>
            Title{sortArrow('title')}
          </th>
          <th onClick={() => requestSort('author')}>
            Author{sortArrow('author')}
          </th>
          <th onClick={() => requestSort('room')}>Room{sortArrow('room')}</th>
          <th onClick={() => requestSort('bookingDate')}>
            Booking Date{sortArrow('bookingDate')}
          </th>
          <th onClick={() => requestSort('status')}>
            Status{sortArrow('status')}
          </th>
        </tr>
      </thead>
      <tbody>
        {error && (
          <tr>
            <td>{error}</td>
          </tr>
        )}
        {tableContent}
      </tbody>
    </table>
  )

  return content
}

export default BookingList
