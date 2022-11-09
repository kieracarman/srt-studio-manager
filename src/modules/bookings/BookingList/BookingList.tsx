import { Prisma } from '@prisma/client'

import styles from './BookingList.module.css'
import BookingListItem from '../BookingListItem/BookingListItem'
import useTableData from '@hooks/useTableData'
import { Empty, Loader } from '@components/ui'

type BookingWithRelations = Prisma.BookingGetPayload<{
  include: {
    createdBy: true
    room: true
  }
}>

type BookingListProps = {
  query: string
  bookings: BookingWithRelations[]
  error?: string
}

const BookingList = ({ query, bookings, error }: BookingListProps) => {
  const { tableData, requestSort, sortArrow } =
    useTableData<BookingWithRelations>(bookings, {
      direction: '',
      key: ''
    })

  const filterArray = (array: BookingWithRelations[]) => {
    return array.filter((item) => {
      return query !== ''
        ? [item.id, item.title, item.bookingDate, item.createdBy.name]
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
        key={booking.id}
        id={booking.id}
        title={booking.title}
        createdBy={booking.createdBy}
        bookingDate={booking.bookingDate}
        room={booking.room}
        status={booking.status}
      />
    )
  })

  let content

  if (bookings.length === 0) {
    content = <Empty item='booking' />
  } else if (bookings.length !== 0) {
    content = (
      <table className={styles.list}>
        <thead>
          <tr>
            <th onClick={() => requestSort('title')}>
              Title{sortArrow('title')}
            </th>
            <th onClick={() => requestSort('createdBy.name')}>
              Created By{sortArrow('createdBy.name')}
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
  } else {
    content = <Loader />
  }

  return content
}

export default BookingList
