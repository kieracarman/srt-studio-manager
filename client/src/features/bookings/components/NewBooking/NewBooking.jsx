import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import styles from './NewBooking.module.css'
import { useAddNewBookingMutation } from '../../bookingsApiSlice'

const NewBooking = () => {
  const [addNewBooking, { isLoading, isSuccess, isError, error }] =
    useAddNewBookingMutation()

  const navigate = useNavigate()

  const [title, setTitle] = useState('')
  const [bookingDate, setBookingDate] = useState('')
  const [room, setRoom] = useState('')

  useEffect(() => {
    if (isSuccess) {
      setTitle('')
      setBookingDate('')
      setRoom('')
      navigate('/bookings')
    }
  }, [isSuccess, navigate])

  const onTitleChanged = (e) => setTitle(e.target.value)
  const onBookingDateChanged = (e) => setBookingDate(e.target.value)
  const onRoomChanged = (e) => setRoom(e.target.value)

  const canSave = [title, bookingDate, room].every(Boolean) && !isLoading

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (canSave) {
      await addNewBooking({
        title,
        bookingDate,
        room
      })
    }
  }

  const errClass = isError ? 'errmsg' : 'offscreen'
  const errContent = error?.data?.message ?? ''

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
          <span></span>
          <button
            className={disabledButtonClass}
            type='submit'
            disabled={!canSave}
          >
            Save
          </button>
        </div>
      </form>
    </div>
  )

  return content
}

export default NewBooking
