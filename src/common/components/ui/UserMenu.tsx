import { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { useSession } from 'next-auth/react'

import { Button } from '@components/ui'

const UserMenu = () => {
  const data = useSession()
  console.log(data)

  return (
    <Menu as='div' className='relative'>
      <Menu.Button
        as='div'
        className='flex h-12 w-12 cursor-pointer items-center justify-center rounded-full bg-black text-xl text-white'
      >
        {Array.from(data?.data?.user?.name ?? '')[0]}
      </Menu.Button>
      <Transition
        as={Fragment}
        enter='transition ease-out duration-100'
        enterFrom='transform opacity-0 scale-95'
        enterTo='transform opacity-100 scale-100'
        leave='transition ease-in duration-75'
        leaveFrom='transform opacity-100 scale-100'
        leaveTo='transform opacity-0 scale-95'
      >
        <Menu.Items className='absolute right-0 z-20 mt-2 w-48 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none'>
          <div className='flex flex-col gap-1 px-4 py-2 text-sm'>
            Logged in as{' '}
            <span className='whitespace-nowrap font-semibold'>
              {data?.data?.user?.name}
            </span>
          </div>
          <div className='flex flex-col gap-1 p-1'>
            <Menu.Item>
              <Button href='/api/auth/signout' variant='ghost'>
                Log out
              </Button>
            </Menu.Item>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  )
}

export default UserMenu
