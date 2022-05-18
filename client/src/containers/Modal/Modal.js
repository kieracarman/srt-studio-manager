import React from 'react';
import ReactDOM from 'react-dom';
import { useNavigate } from 'react-router-dom';

import styles from './Modal.module.css';

const Modal = ({ children, onClose }) => {
  const navigate = useNavigate();

  return ReactDOM.createPortal(
    <div className={styles.modal}>
      <div className={styles.modalHeader}>
        <div className={styles.modalHeaderNav}>
          <button onClick={() => navigate(onClose)} className='outline'>Close</button>
        </div>
      </div>
      <div className={styles.modalBody}>
        {children}
      </div>
    </div>,
    document.getElementById('portal')
  );
};

export default Modal;