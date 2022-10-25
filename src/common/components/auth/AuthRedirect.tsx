import { PropsWithChildren } from 'react'
import { useRouter } from 'next/router'
import { useSession } from 'next-auth/react'

import { Loader } from '@components/ui'
import { trpc } from '@utils/trpc'

const RedirectStudent = () => {
  const router = useRouter()

  router.replace('/')

  return <Loader />
}

const AuthRedirect = ({ children }: PropsWithChildren) => {
  const router = useRouter()

  const { status } = useSession({
    required: true
  })

  const { data: role, isLoading } = trpc.useQuery(['user.getCurrentRole'])

  if (status !== 'authenticated' || isLoading) {
    return <Loader />
  }

  if (
    (router.pathname.startsWith('/assets') ||
      router.pathname.startsWith('/bookings') ||
      router.pathname.startsWith('/tickets') ||
      router.pathname.startsWith('/users')) &&
    role === 'basic'
  ) {
    return <RedirectStudent />
  }

  return <>{children}</>
}

export default AuthRedirect
