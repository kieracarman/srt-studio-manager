import { NextPage } from 'next'
import { useRouter } from 'next/router'

import { Modal } from '@components/ui'
import EditBookingForm from '@modules/bookings/EditBookingForm/EditBookingForm'
import { trpc } from '@utils/trpc'

const EditBooking: NextPage = () => {
  const router = useRouter()

  if (!router.query.id) return <p>Loading...</p>

  const id = router.query.id.toString()

  const { data, isSuccess } = trpc.useQuery(['booking.getOne', { id }])

  if (isSuccess) {
    return (
      <Modal onClose='/bookings'>
        <EditBookingForm booking={data} />
      </Modal>
    )
  }

  return <p>Loading...</p>
}

export default EditBooking
