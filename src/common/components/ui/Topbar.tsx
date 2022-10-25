import Link from 'next/link'

const Topbar = () => {
  return (
    <div className='h-full flex justify-start items-center border-b border-gray-200'>
      <div className='px-2 xl:px-6 xl:text-2xl'>
        <Link href='/'>SRT Studio Manager</Link>
      </div>
    </div>
  )
}

export default Topbar
