import { useState } from 'react'

import { trpc } from '@utils/trpc'
import { Loader } from '@components/ui'
import BookingCard from './BookingCard'
import NewBookingCard from './NewBookingCard'
import BookingModal from './BookingModal'

const StudentBookingList = () => {
  const { data, isLoading, isSuccess, isError, error } = trpc.useQuery([
    'booking.getAll'
  ])

  const [open, setOpen] = useState(false)

  if (isLoading) return <Loader />

  if (isError) return <p>{error?.message}</p>

  if (isSuccess) {
    return (
      <div className='flex flex-col gap-4'>
        {data.map((booking) => (
          <BookingCard
            key={booking.id}
            description={booking.description}
            startDate={booking.startDate}
          />
        ))}
        <NewBookingCard setOpen={setOpen} />
        <BookingModal open={open} setOpen={setOpen} />
      </div>
    )
  }

  return null
}

export default StudentBookingList
