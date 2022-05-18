import React from 'react';
import { NavLink } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Activity, List, Users, LogOut } from 'react-feather';

import styles from './Navbar.module.css';
import * as actionType from '../../constants/actionTypes';

const items = [
  { path: '', name: 'Dashboard', icon: <Activity className={styles.navbarLinkIcon} /> },
  { path: 'assets', name: 'Assets', icon: <List className={styles.navbarLinkIcon} /> },
  { path: 'users', name: 'Users', icon: <Users className={styles.navbarLinkIcon} /> }
]

const Navbar = (props) => {
  const dispatch = useDispatch();

  const logout = (e) => {
    e.preventDefault();
    
    dispatch({ type: actionType.LOGOUT });
  };

  return (
    <div className={styles.navbar}>
      <ul className={styles.navbarList}>
        {items.map((item) => (
          <li className={styles.navbarItem} key={item.name}>
            <NavLink end to={`/${item.path}`} className={({ isActive }) => styles.navbarLink + (isActive ? ` ${styles.navbarLinkActive}` : '')}>
              {item.icon}
              <div className={styles.navbarLinkText}>{item.name}</div>
            </NavLink>
          </li>
        ))}
      </ul>

      <ul className={styles.navbarFooter}>
        <li className={styles.navbarItem}>
          <NavLink to='/logout' className={styles.navbarLink} onClick={logout}>
            <LogOut className={styles.navbarLinkIcon}/>
            <div className={styles.navbarLinkText}>Logout</div>
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

export default Navbar;