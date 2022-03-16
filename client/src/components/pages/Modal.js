import React from 'react';
import ReactDOM from 'react-dom';

import Button from '../atoms/Button';

const Modal = ({ children, onClose }) => {
  return ReactDOM.createPortal(
    <div className='modal'>
      <div className='modal-header'>
        <div className='modal-header-nav'>
          <Button to={onClose} type='btn-outline'>Close</Button>
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