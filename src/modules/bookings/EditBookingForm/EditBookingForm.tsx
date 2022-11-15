import { useState } from 'react'
import { useRouter } from 'next/router'
import { useForm, SubmitHandler } from 'react-hook-form'

import styles from './EditBookingForm.module.css'
import { trpc } from '@utils/trpc'
import { Prisma } from '@prisma/client'
import { Alert } from '@components/ui'
import { Button } from '@components/form'

type BookingWithRoom = Prisma.BookingGetPayload<{
  include: { room: true }
}>

type FormValues = {
  description: string
  startDate: Date
  endDate: Date
  room: string
  status: string
}

const EditBookingForm = ({ booking }: { booking: BookingWithRoom }) => {
  const router = useRouter()

  const { register, handleSubmit } = useForm<FormValues>()

  const utils = trpc.useContext()

  const editBooking = trpc.useMutation('booking.edit', {
    async onSuccess() {
      await utils.invalidateQueries(['booking.getAll'])
      await utils.invalidateQueries(['booking.getOne', { id: booking.id }])
    }
  })

  const deleteBooking = trpc.useMutation(['booking.delete'], {
    async onSuccess() {
      await utils.invalidateQueries(['booking.getAll'])
    }
  })

  const { data: rooms } = trpc.useQuery(['room.getAll'])

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    await editBooking.mutateAsync({
      id: booking.id,
      room: data.room,
      data
    })
  }

  const [open, setOpen] = useState(false)

  const handleDelete = async () => {
    await deleteBooking.mutateAsync({ id: booking.id })
    router.push('/bookings')
  }

  const content = (
    <div className={styles.editForm}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label>Description</label>
        <input {...register('description')} id='description' />
        <label>Start Date</label>
        <input {...register('startDate')} id='startDate' />
        <label>End Date</label>
        <input {...register('endDate')} id='endDate' />
        <label>Room</label>
        <select {...register('room')} id='room' defaultValue={booking.room.id}>
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
          <Button variant='secondary' onClick={() => setOpen(true)}>
            Delete booking
          </Button>
          <Button type='submit'>Save</Button>
        </div>
      </form>
      <Alert
        open={open}
        setOpen={setOpen}
        action={handleDelete}
        title='Are you sure?'
        description='Once a booking is deleted, it cannot be recovered. Deleting a booking is permanent.'
        confirmText='Yes, delete booking'
      />
    </div>
  )

  return content
}

export default EditBookingForm
