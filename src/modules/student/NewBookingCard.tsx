import { Dispatch, SetStateAction } from 'react'
import { Plus } from 'react-feather'

type NewBookingCardProps = {
  setOpen: Dispatch<SetStateAction<boolean>>
}

const NewBookingCard = ({ setOpen }: NewBookingCardProps) => (
  <button
    onClick={() => setOpen(true)}
    className='flex items-center justify-center gap-1 rounded-lg border-4 border-dashed border-gray-300 p-6 text-gray-400 shadow-sm'
  >
    New booking
    <Plus />
  </button>
)

export default NewBookingCard
