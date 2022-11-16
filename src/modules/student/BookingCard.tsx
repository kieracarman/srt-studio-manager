import { ChevronDown } from 'react-feather'

type BookingCardProps = {
  description: string
  startDate: Date
}

const BookingCard = ({ description, startDate }: BookingCardProps) => (
  <div className='flex cursor-pointer items-center justify-between rounded-lg border border-gray-300 py-4 px-5 shadow-sm'>
    <div>
      <h3 className='text-lg font-medium'>{description}</h3>
      <p className='text-sm text-gray-500'>
        {startDate.toLocaleString('en-us', {
          weekday: 'long',
          month: 'numeric',
          day: 'numeric',
          hour: 'numeric',
          minute: 'numeric'
        })}
      </p>
    </div>
    <ChevronDown className='text-gray-600' />
  </div>
)

export default BookingCard
