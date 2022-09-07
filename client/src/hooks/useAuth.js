import { useSelector } from 'react-redux'
import { selectCurrentToken } from '../features/auth/authSlice'
import jwtDecode from 'jwt-decode'

const useAuth = () => {
  const token = useSelector(selectCurrentToken)
  let isSupervisor = false
  let isAdmin = false
  let status = 'basic'

  if (token) {
    const decoded = jwtDecode(token)
    const { userId, username, firstName, role } = decoded.UserInfo

    isSupervisor = role === 'supervisor'
    isAdmin = role === 'admin'

    if (isSupervisor) status = 'supervisor'
    if (isAdmin) status = 'admin'

    return { userId, username, firstName, role, status, isSupervisor, isAdmin }
  }

  return {
    userId: '',
    username: '',
    firstName: '',
    role: '',
    status,
    isSupervisor,
    isAdmin
  }
}

export default useAuth
