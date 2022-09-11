import Link from 'next/link'
import { useState, useEffect, PropsWithChildren } from 'react'
import { createPortal } from 'react-dom'

import styles from './Modal.module.css'

type ModalProps = PropsWithChildren<{
  onClose: string
}>

const Modal = ({ children, onClose }: ModalProps) => {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)

    return () => setMounted(false)
  }, [])

  const content = (
    <div className={styles.modal}>
      <header>
        <Link className='button' href={onClose}>
          Close
        </Link>
      </header>
      <section>{children}</section>
    </div>
  )

  return mounted
    ? createPortal(content, document.querySelector('#modal') as HTMLElement)
    : null
}

export default Modal
