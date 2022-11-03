import { PropsWithChildren } from 'react'

import { Topbar } from '@components/ui'

const Layout = ({ children }: PropsWithChildren) => {
  return (
    <div>
      <header>
        <Topbar />
      </header>
      <main>{children}</main>
    </div>
  )
}

export default Layout
