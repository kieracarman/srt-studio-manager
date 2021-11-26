import React from 'react';

const Button = ({ children, onClick, type, ...props }) => {
  return (
    <button 
      className={type || 'btn'}
      onClick={onClick}
      type='button'
    >
      {children || 'label'}
    </button>
  );
};

export default Button;