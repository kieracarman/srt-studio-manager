import { Fragment } from 'react'
import { useRouter } from 'next/router'
import { Menu, Transition } from '@headlessui/react'
import { ChevronDown } from 'react-feather'

import { Button } from '@components/ui'

const links = [
  { path: '/', name: 'Dashboard' },
  { path: '/assets', name: 'Assets' },
  { path: '/users', name: 'Users' },
  { path: '/tickets', name: 'Tickets' },
  { path: '/bookings', name: 'Bookings' }
]

const Navigation = () => {
  const router = useRouter()
  const currentPage = links.find((obj) => obj.path === router.asPath)

  return (
    <Menu as='nav' className='relative'>
      <Menu.Button
        as={Button}
        variant='ghost'
        className='flex cursor-pointer items-center gap-2 text-2xl font-semibold sm:text-4xl'
      >
        {currentPage?.name}
        <ChevronDown />
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
        <Menu.Items className='absolute left-0 z-20 mt-2 origin-top-left divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none'>
          <div className='flex flex-col gap-1 p-2'>
            {links.map((link) => (
              <Menu.Item key={link.name}>
                {() => (
                  <Button
                    href={link.path}
                    size='large'
                    variant='ghost'
                    className={`
                    text-xl
                    ${link.path === router.asPath && 'text-2xl font-bold'}`}
                  >
                    {link.name}
                  </Button>
                )}
              </Menu.Item>
            ))}
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  )
}

export default Navigation
