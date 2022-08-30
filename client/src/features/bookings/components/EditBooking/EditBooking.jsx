import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import styles from './EditBooking.module.css'

const EditBooking = () => {
  const { booking, isLoading } = useSelector((state) => state.bookings)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { id } = useParams()
  const [modifiedBooking, setModifiedBooking] = useState({ description: '' })
  const [deleteText, setDeleteText] = useState('Delete Booking')

  useEffect(() => {
    if (id !== 'new') setModifiedBooking(booking)
  }, [booking])

  const handleChange = (e) => {
    setModifiedBooking({ ...modifiedBooking, [e.target.id]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (id === 'new') {
    }
  }

  const handleDelete = (e) => {
    e.preventDefault()

    deleteText === 'Delete Booking' ?? setDeleteText('Are you sure?')
  }

  return (
    <div className={styles.editForm}>
      {isLoading ? (
        <h3>Loading...</h3>
      ) : (
        <form onSubmit={handleSubmit}>
          <label>Title</label>
          <input
            onChange={handleChange}
            value={modifiedBooking.title}
            id='title'
          />
          <label>Booking Date</label>
          <input
            onChange={handleChange}
            value={modifiedBooking.bookingDate}
            id='bookingDate'
          />
          <label>Room</label>
          <select
            onChange={handleChange}
            value={modifiedBooking.room}
            id='room'
          >
            <option value='' disabled selected hidden>
              Select...
            </option>
            <option value='114'>114</option>
            <option value='212'>212</option>
            <option value='213'>213</option>
          </select>
          <div>
            {id !== 'new' ? (
              <button type='button' onClick={handleDelete} className='alert'>
                Delete Booking
              </button>
            ) : (
              <span></span>
            )}
            <button type='submit'>Save</button>
          </div>
        </form>
      )}
    </div>
  )
}

export default EditBooking
