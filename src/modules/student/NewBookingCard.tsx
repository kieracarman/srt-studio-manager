import Link from 'next/link'
import { Plus } from 'react-feather'

const NewBookingCard = () => (
  <Link href='#'>
    <a className='flex items-center justify-center gap-1 rounded-lg border-4 border-dashed border-gray-300 p-6 text-gray-400 shadow-sm'>
      New booking
      <Plus />
    </a>
  </Link>
)

export default NewBookingCard
