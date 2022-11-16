import { UserMenu } from '@components/ui'
import StudentBookingList from './StudentBookingList'

const StudentHome = () => {
  return (
    <div>
      <header className='flex items-center justify-between p-4 sm:p-8'>
        <h1 className='px-2 text-2xl font-semibold sm:text-4xl'>My bookings</h1>
        <UserMenu />
      </header>
      <main className='p-4'>
        <StudentBookingList />
      </main>
    </div>
  )
}

export default StudentHome
