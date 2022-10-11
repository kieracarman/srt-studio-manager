import { NextPage } from 'next'

import { Modal } from '@components/ui'
import NewBookingForm from '@modules/bookings/NewBookingForm/NewBookingForm'

const NewBooking: NextPage = () => {
  return (
    <Modal onClose='/bookings'>
      <NewBookingForm />
    </Modal>
  )
}

export default NewBooking
