import { useEffect, useRef, useState } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

import { useRefreshMutation } from './authApiSlice'
import { selectCurrentToken } from './authSlice'

const PersistLogin = () => {
  const persist = true

  const navigate = useNavigate()
  const token = useSelector(selectCurrentToken)
  const effectRan = useRef(false)
  const [trueSuccess, setTrueSuccess] = useState(false)

  const [refresh, { isUninitialized, isLoading, isSuccess, isError, error }] =
    useRefreshMutation()

  useEffect(() => {
    if (effectRan.current === true || process.env.NODE_ENV !== 'development') {
      const verifyRefreshToken = async () => {
        try {
          await refresh()
          setTrueSuccess(true)
        } catch (err) {
          console.error(err)
        }
      }

      if (!token && persist) verifyRefreshToken()
    }

    return () => (effectRan.current = true)

    // eslint-disable-next-line
  }, [])

  let content

  if (!persist || (isSuccess && trueSuccess) || (token && isUninitialized)) {
    content = <Outlet />
  } else if (isLoading) {
    content = <p>Loading...</p>
  } else if (isError) {
    console.log(error)
  }

  return content
}

export default PersistLogin
