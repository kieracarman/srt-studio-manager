import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

import styles from './EditBooking.module.css'
import {
  selectBookingById,
  useUpdateBookingMutation,
  useDeleteBookingMutation
} from '../../bookingsApiSlice'

const EditBooking = () => {
  const [updateBooking, { isLoading, isSuccess, isError, error }] =
    useUpdateBookingMutation()

  const [
    deleteBooking,
    { isSuccess: isDeleteSuccess, isError: isDeleteError, error: deleteError }
  ] = useDeleteBookingMutation()

  const { id } = useParams()
  const navigate = useNavigate()

  const booking = useSelector((state) => selectBookingById(state, id))

  const [title, setTitle] = useState(booking.title)
  const [bookingDate, setBookingDate] = useState(booking.bookingDate)
  const [room, setRoom] = useState(booking.room)
  const [deleteText, setDeleteText] = useState('Delete Booking')

  useEffect(() => {
    if (isSuccess || isDeleteSuccess) {
      setTitle('')
      setBookingDate('')
      setRoom('')
      navigate('/bookings')
    }
  }, [isSuccess, isDeleteSuccess, navigate])

  const onTitleChanged = (e) => setTitle(e.target.value)
  const onBookingDateChanged = (e) => setBookingDate(e.target.value)
  const onRoomChanged = (e) => setRoom(e.target.value)

  const canSave = [title, bookingDate, room].every(Boolean) && !isLoading

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (canSave) {
      await updateBooking({
        id,
        title,
        bookingDate,
        room
      })
    }
  }

  const handleDelete = async (e) => {
    e.preventDefault()

    deleteText === 'Delete Booking'
      ? setDeleteText('Are you sure?')
      : await deleteBooking({ id })
  }

  const errClass = isError || isDeleteError ? 'errmsg' : 'offscreen'
  const errContent = (error?.data?.message || deleteError?.data?.message) ?? ''

  const disabledButtonClass = canSave ? '' : 'disabled'

  const content = (
    <div className={styles.editForm}>
      <span className={errClass}>{errContent}</span>
      <form onSubmit={handleSubmit}>
        <label>Title</label>
        <input onChange={onTitleChanged} value={title} id='title' />
        <label>Booking Date</label>
        <input
          onChange={onBookingDateChanged}
          value={bookingDate}
          id='bookingDate'
        />
        <label>Room</label>
        <select onChange={onRoomChanged} value={room} id='room'>
          <option value='' disabled selected hidden>
            Select...
          </option>
          <option value='114'>114</option>
          <option value='212'>212</option>
          <option value='213'>213</option>
        </select>
        <div>
          <button type='button' onClick={handleDelete} className='alert'>
            {deleteText}
          </button>
          <button
            className={disabledButtonClass}
            type='submit'
            disabled={!canSave}
          >
            {canSave ? 'Save' : 'Missing Required Fields'}
          </button>
        </div>
      </form>
    </div>
  )

  return content
}

export default EditBooking
