import React from 'react';
import { NavLink } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Activity, List, Users, LogOut } from 'react-feather';

import * as actionType from '../constants/actionTypes';

const items = [
  { path: '', name: 'Dashboard', icon: <Activity className='navbar-link-icon' /> },
  { path: 'assets', name: 'Assets', icon: <List className='navbar-link-icon' /> },
  { path: 'users', name: 'Users', icon: <Users className='navbar-link-icon' /> }
]

const Navbar = (props) => {
  const dispatch = useDispatch();

  const logout = (e) => {
    e.preventDefault();
    
    dispatch({ type: actionType.LOGOUT });
  };

  return (
    <div className='navbar'>
      <ul className='navbar-list'>
        {items.map((item) => (
          <li className='navbar-item' key={item.name}>
            <NavLink exact to={`/${item.path}`} className='navbar-link' activeClassName='navbar-link-active'>
              {item.icon}
              <div className='navbar-link-text'>{item.name}</div>
            </NavLink>
          </li>
        ))}
      </ul>

      <ul className='navbar-footer'>
        <li className='navbar-item'>
          <NavLink to='/logout' className='navbar-link' onClick={logout}>
            <LogOut className='navbar-link-icon'/>
            <div className='navbar-link-text'>Logout</div>
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

export default Navbar;