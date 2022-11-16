import { ChevronDown } from 'react-feather'

type StudentBookingCardProps = {
  description: string
  startDate: Date
}

const StudentBookingCard = ({
  description,
  startDate
}: StudentBookingCardProps) => (
  <div className='flex items-center justify-between rounded-lg border border-gray-300 py-4 px-5 shadow-sm'>
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

export default StudentBookingCard
