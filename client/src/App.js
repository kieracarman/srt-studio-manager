import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import setAuthToken from './utils/setAuthToken';
import { setCurrentUser, logoutUser } from './actions/authActions';
import './App.css';

import { Provider } from 'react-redux';
import store from './store';

import PrivateRoute from './components/private-route/PrivateRoute';
import Topbar from './components/layout/Topbar';
import Navbar from './components/layout/Navbar';
import Login from './components/auth/Login';
import Dashboard from './components/views/Dashboard';
import Assets from './components/views/Assets';
import Bookings from './components/views/Bookings';
import Tickets from './components/views/Tickets';
import Users from './components/views/Users';

// Check for token to keep user logged in
if (localStorage.jwtToken) {
  // Set auth token header auth
  const token = localStorage.jwtToken;
  setAuthToken(token);

  // Decode token and get user info and exp
  const decoded = jwt_decode(token);

  // Set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));

  // Check for expired token
  const currentTime = Date.now() / 1000; // to get in milliseconds
  if (decoded.exp < currentTime) {
    // Logout user
    store.dispatch(logoutUser());

    // redirect to login
    window.location.href = '/login';
  }
}

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className='App'>
            <Route path='/login' component={Login} />
            <PrivateRoute path='/' component={Topbar} />
            <div className='middle'>
              <PrivateRoute path='/' component={Navbar} />
              <div className='content'>
                <PrivateRoute path='/' exact component={Dashboard} />
                <PrivateRoute path='/assets' component={Assets} />
                <PrivateRoute path='/bookings' component={Bookings} />
                <PrivateRoute path='/tickets' component={Tickets} />
                <PrivateRoute path='/users' component={Users} />
              </div>
            </div>
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;