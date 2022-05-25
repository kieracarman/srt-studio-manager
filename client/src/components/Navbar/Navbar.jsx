import React from 'react';
import { NavLink } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Activity, List, Users, LogOut } from 'react-feather';

import styles from './Navbar.module.css';
import * as actionType from '../../constants/actionTypes';

const items = [
  { path: '', name: 'Dashboard', icon: <Activity /> },
  { path: 'assets', name: 'Assets', icon: <List /> },
  { path: 'users', name: 'Users', icon: <Users /> }
]

const Navbar = (props) => {
  const dispatch = useDispatch();

  const logout = (e) => {
    e.preventDefault();
    
    dispatch({ type: actionType.LOGOUT });
  };

  return (
    <section className={styles.navbar}>
      {items.map((item) => (
        <NavLink
          key={item.name}
          end
          to={`/${item.path}`}
          className={({ isActive }) => (
            styles.navbarLink + (isActive ? ` ${styles.navbarLinkActive}` : '')
          )}
        >
          {item.icon}
          {item.name}
        </NavLink>
      ))}
      <NavLink to='/logout' className={styles.navbarLink} onClick={logout}>
        <LogOut />
        Logout
      </NavLink>
    </section>
  );
};

export default Navbar;