import { useEffect } from 'react'
import { Outlet } from 'react-router-dom'

import { store } from '../../app/store'
import { assetsApiSlice } from '../assets/assetsApiSlice'

const Prefetch = () => {
  useEffect(() => {
    console.log('subscribing')
    const assets = store.dispatch(assetsApiSlice.endpoints.getAssets.initiate())

    return () => {
      console.log('unsubscribing')
      assets.unsubscribe()
    }
  }, [])

  return <Outlet />
}

export default Prefetch
