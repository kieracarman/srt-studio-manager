import { useEffect } from 'react'
import { Outlet } from 'react-router-dom'

import { store } from '../../app/store'

const Prefetch = () => {
  useEffect(() => {
    console.log('subscribing')

    return () => {
      console.log('unsubscribing')
    }
  }, [])

  return <Outlet />
}

export default Prefetch
