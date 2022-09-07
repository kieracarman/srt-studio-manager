import { useSelector } from 'react-redux'
import { selectCurrentToken } from '../features/auth/authSlice'
import jwtDecode from 'jwt-decode'

const useAuth = () => {
  const token = useSelector(selectCurrentToken)
  let isSupervisor = false
  let isAdmin = false
  let status = 'Basic'

  if (token) {
    const decoded = jwtDecode(token)
    const { username, role } = decoded.UserInfo

    isSupervisor = role === 'Supervisor'
    isAdmin = role === 'Admin'

    if (isSupervisor) status = 'Supervisor'
    if (isAdmin) status = 'Admin'

    return { username, role, status, isSupervisor, isAdmin }
  }

  return { username: '', role: '', status, isSupervisor, isAdmin }
}

export default useAuth
