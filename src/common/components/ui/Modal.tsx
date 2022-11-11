import { useState, useEffect, PropsWithChildren } from 'react'
import { createPortal } from 'react-dom'

import { Button } from '@components/form'

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
    <div className='fixed top-0 left-0 z-10 h-full w-full overflow-hidden bg-white'>
      <header className='sticky top-0 flex justify-end overflow-hidden border-b border-b-gray-200 p-2'>
        <Button variant='secondary' href={onClose}>
          Close
        </Button>
      </header>
      <section className='overflow-auto'>{children}</section>
    </div>
  )

  return mounted
    ? createPortal(content, document.querySelector('#modal') as HTMLElement)
    : null
}

export default Modal
