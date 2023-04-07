import { type AppType } from 'next/app'
import { type Session } from 'next-auth'
import { SessionProvider } from 'next-auth/react'

import { api } from '@utils/api'
import { AuthRedirect } from '@components/auth'
import '@styles/globals.css'
import '@fontsource/inter'
import 'react-datepicker/dist/react-datepicker.css'

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps }
}) => {
  return (
    <SessionProvider session={session}>
      <AuthRedirect>
        <Component {...pageProps} />
      </AuthRedirect>
    </SessionProvider>
  )
}

export default api.withTRPC(MyApp)
