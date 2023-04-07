import { Navigation, UserMenu } from '@components/ui'

const Header = () => {
  return (
    <header className='flex items-center justify-between p-4 sm:p-8'>
      <Navigation />
      <UserMenu />
    </header>
  )
}

export default Header
