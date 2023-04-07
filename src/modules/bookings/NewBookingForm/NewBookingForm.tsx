import { useRouter } from 'next/router'
import { useSession } from 'next-auth/react'
import { useForm, SubmitHandler } from 'react-hook-form'

import styles from './NewBookingForm.module.css'
import { api } from '@utils/api'
import { Button } from '@components/form'

type FormValues = {
  description: string
  startDate: Date
  endDate: Date
  room: string
}

const NewBookingForm = () => {
  const router = useRouter()

  const { data: session } = useSession()

  const { register, handleSubmit } = useForm<FormValues>()

  const utils = api.useContext()

  const addBooking = api.booking.add.useMutation({
    async onSuccess() {
      await utils.booking.invalidate()
    }
  })

  const { data: rooms } = api.room.getAll.useQuery()

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    await addBooking.mutateAsync({
      room: data.room,
      createdBy: session?.user?.id,
      data
    })
    router.push('/bookings')
  }

  const content = (
    <div className={styles.editForm}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label>Description</label>
        <input {...register('description')} />
        <label>Start Date</label>
        <input {...register('startDate')} />
        <label>End Date</label>
        <input {...register('endDate')} />
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
          <Button type='submit'>Save</Button>
        </div>
      </form>
    </div>
  )

  return content
}

export default NewBookingForm
