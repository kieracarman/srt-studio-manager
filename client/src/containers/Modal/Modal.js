import React from 'react'
import ReactDOM from 'react-dom'
import { useNavigate } from 'react-router-dom'

import styles from './Modal.module.css'

const Modal = ({ children, onClose }) => {
  const navigate = useNavigate()

  return ReactDOM.createPortal(
    <div className={styles.modal}>
      <header>
        <button onClick={() => navigate(onClose)} className='outline'>
          Close
        </button>
      </header>
      <section>{children}</section>
    </div>,
    document.getElementById('portal')
  )
}

export default Modal
