import Link from 'next/link'
import { useRouter } from 'next/router'
import { PropsWithChildren } from 'react'

import styles from './NavLink.module.css'

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
          className={`${styles.navbarLink} ${
            isActive && styles.navbarLinkActive
          }`}
        >
          {children}
        </a>
      </Link>
    </>
  )
}

export default NavLink
