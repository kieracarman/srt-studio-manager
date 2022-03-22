import React from 'react';
import { NavLink } from 'react-router-dom';

const Topbar = () => (
  <div className='topbar'>
    <div className='navbar-brand'>
      <NavLink to='/'>SRT Studio Manager</NavLink>
    </div>
  </div>
);

export default Topbar;