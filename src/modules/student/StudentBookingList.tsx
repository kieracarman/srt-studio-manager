import { trpc } from '@utils/trpc'
import { Loader } from '@components/ui'
import BookingCard from './BookingCard'
import NewBookingCard from './NewBookingCard'

const StudentBookingList = () => {
  const { data, isLoading, isSuccess, isError, error } = trpc.useQuery([
    'booking.getAll'
  ])

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
        <NewBookingCard />
      </div>
    )
  }

  return null
}

export default StudentBookingList
