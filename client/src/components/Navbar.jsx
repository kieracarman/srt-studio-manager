import React from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { Activity, List, Users, LogOut } from 'react-feather';
import PropTypes from 'prop-types';

import { logoutUser } from '../actions/authActions';

const items = [
  { path: '', name: 'Dashboard', icon: <Activity className='navbar-link-icon' /> },
  { path: 'assets', name: 'Assets', icon: <List className='navbar-link-icon' /> },
  { path: 'users', name: 'Users', icon: <Users className='navbar-link-icon' /> }
]

const Navbar = () => {
  const onLogoutClick = (e) => {
    e.preventDefault();
    logoutUser();
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
          <NavLink to='/logout' className='navbar-link' onClick={onLogoutClick}>
            <LogOut className='navbar-link-icon'/>
            <div className='navbar-link-text'>Logout</div>
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

Navbar.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({ auth: state.auth });

export default connect(
  mapStateToProps,
  { logoutUser }
)(Navbar);
