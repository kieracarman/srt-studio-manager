import React from 'react';
import { Link } from 'react-router-dom';

const Button = ({ children, to, type }) => {
  return (
    <Link 
      className={type || 'btn'}
      to={to}
      type='button'
    >
      {children || 'label'}
    </Link>
  );
};

export default Button;