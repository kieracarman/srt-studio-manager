import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Activity, List, Users, AlertCircle, Calendar, LogOut } from 'react-feather';

import styles from './Navbar.module.css';
import { logOut } from '../../actions/auth';

const items = [
  { path: '', name: 'Dashboard', icon: <Activity /> },
  { path: 'assets', name: 'Assets', icon: <List /> },
  { path: 'users', name: 'Users', icon: <Users /> },
  { path: 'tickets', name: 'Tickets', icon: <AlertCircle /> },
  { path: 'bookings', name: 'Bookings', icon: <Calendar /> }
]

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogOut = (e) => {
    e.preventDefault();
    
    dispatch(logOut(navigate));
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
      <NavLink to='/logout' className={styles.navbarLink} onClick={handleLogOut}>
        <LogOut />
        Logout
      </NavLink>
    </section>
  );
};

export default Navbar;