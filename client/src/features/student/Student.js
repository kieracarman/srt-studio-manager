import useAuth from '../../hooks/useAuth'
import { NewBooking } from '../bookings/components'

const Student = () => {
  const { username } = useAuth()

  return <NewBooking />
}
export default Student
