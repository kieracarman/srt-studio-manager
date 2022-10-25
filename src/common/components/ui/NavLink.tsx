import Link from 'next/link'
import { useRouter } from 'next/router'
import { PropsWithChildren } from 'react'

type NavLinkProps = PropsWithChildren<{
  href: string
}>

const NavLink = ({ href, children }: NavLinkProps) => {
  const router = useRouter()
  const isActive = router.asPath === href

  return (
    <>
      <Link href={href}>
        <a
          className={`flex w-full flex-col items-center gap-2 py-2 px-0 text-[0.65rem] opacity-75 hover:opacity-100 md:p-2 md:last:row-start-7 xl:flex-row xl:gap-4 xl:py-[14px] xl:px-6 xl:text-xl ${
            isActive &&
            'border-t-[3px] border-black bg-gray-100 opacity-100 md:border-t-0 md:border-r-[3px]'
          }`}
        >
          {children}
        </a>
      </Link>
    </>
  )
}

export default NavLink
