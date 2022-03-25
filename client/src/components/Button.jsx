import React from 'react';

const Button = ({ children, to, type }) => {
  return (
    <a 
      className={type || 'btn'}
      href={to}
    >
      {children || 'label'}
    </a>
  );
};

export default Button;