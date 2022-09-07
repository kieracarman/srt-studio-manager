import useAuth from '../../hooks/useAuth'
import { StudentBookingForm } from './'

const Student = () => {
  const { userId } = useAuth()

  return <StudentBookingForm author={userId} />
}
export default Student
