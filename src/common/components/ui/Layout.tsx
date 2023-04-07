import { PropsWithChildren } from 'react'

import { Header } from '@components/ui'

const Layout = ({ children }: PropsWithChildren) => {
  return (
    <div>
      <Header />
      <main>{children}</main>
    </div>
  )
}

export default Layout
