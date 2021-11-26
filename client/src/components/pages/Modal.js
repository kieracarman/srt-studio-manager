import React from 'react';
import ReactDOM from 'react-dom';

import Button from '../atoms/Button';

const Modal = ({ open, children, onClose }) => {
  if (!open) return null;
  return ReactDOM.createPortal(
    <div className='modal'>
      <div className='modal-header'>
        <div className='modal-header-nav'>
          <Button type='btn-outline' onClick={onClose}>Close</Button>
        </div>
      </div>
      <div className='modal-body'>
        {children}
      </div>
    </div>,
    document.getElementById('portal')
  );
};

export default Modal;