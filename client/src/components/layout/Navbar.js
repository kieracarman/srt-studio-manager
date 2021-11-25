import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { logoutUser } from '../../actions/authActions';
import { Activity, List, BookOpen, Tool, Users, LogOut } from 'react-feather';

class Navbar extends Component {
  onLogoutClick = e => {
    e.preventDefault();
    this.props.logoutUser();
  };

  render() {
    return (
      <div>
        <nav className='navbar'>
          <ul className='navbar-list'>
            <li className='navbar-item'>
              <NavLink exact to='/' className='navbar-link' activeClassName='navbar-link-active'>
                <Activity className='navbar-link-icon'/>
                <div className='navbar-link-text'>Dashboard</div>
              </NavLink>
            </li>
            <li className='navbar-item'>
              <NavLink to='/assets' className='navbar-link' activeClassName='navbar-link-active'>
                <List className='navbar-link-icon'/>
                <div className='navbar-link-text'>Assets</div>
              </NavLink>
            </li>
            <li className='navbar-item'>
              <NavLink to='/bookings' className='navbar-link' activeClassName='navbar-link-active'>
                <BookOpen className='navbar-link-icon'/>
                <div className='navbar-link-text'>Bookings</div>
              </NavLink>
            </li>
            <li className='navbar-item'>
              <NavLink to='/tickets' className='navbar-link' activeClassName='navbar-link-active'>
                <Tool className='navbar-link-icon'/>
                <div className='navbar-link-text'>Tickets</div>
              </NavLink>
            </li>
            <li className='navbar-item'>
              <NavLink to='/users' className='navbar-link' activeClassName='navbar-link-active'>
                <Users className='navbar-link-icon'/>
                <div className='navbar-link-text'>Users</div>
              </NavLink>
            </li>
          </ul>
          <ul className='navbar-footer'>
            <li className='navbar-item'>
              <NavLink to='/logout' className='navbar-link' onClick={this.onLogoutClick}>
                <LogOut className='navbar-link-icon'/>
                <div className='navbar-link-text'>Logout</div>
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>
    );
  };
};

Navbar.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
})

export default connect(
  mapStateToProps,
  { logoutUser }
)(Navbar);
