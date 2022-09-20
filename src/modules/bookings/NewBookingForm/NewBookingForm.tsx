import { useRouter } from 'next/router'
import { useForm, SubmitHandler } from 'react-hook-form'

import styles from './NewBookingForm.module.css'
import { trpc } from '@utils/trpc'

type FormValues = {
  title: string
  bookingDate: Date
  room: string
}

const NewBookingForm = () => {
  const router = useRouter()

  const { register, handleSubmit } = useForm<FormValues>()

  const utils = trpc.useContext()

  const addBooking = trpc.useMutation(['booking.add'], {
    async onSuccess() {
      await utils.invalidateQueries(['booking.getAll'])
    }
  })

  const { data: rooms } = trpc.useQuery(['room.getAll'])

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    await addBooking.mutateAsync({
      room: data.room,
      data
    })
    router.push('/bookings')
  }

  const content = (
    <div className={styles.editForm}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label>Title</label>
        <input {...register('title')} />
        <label>Booking Date</label>
        <input {...register('bookingDate')} />
        <label>Room</label>
        <select {...register('room')} defaultValue=''>
          <option value='' disabled>
            Select...
          </option>
          {rooms?.map((room) => (
            <option key={room.id} value={room.id}>
              {room.name}
            </option>
          ))}
        </select>
        <div>
          <span></span>
          <button className='button' type='submit'>
            Save
          </button>
        </div>
      </form>
    </div>
  )

  return content
}

export default NewBookingForm
