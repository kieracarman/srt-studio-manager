import { Navigation, UserMenu } from '@components/ui'

const Topbar = () => {
  return (
    <div className='flex items-center justify-between p-4 sm:p-8'>
      <Navigation />
      <UserMenu />
    </div>
  )
}

export default Topbar
