import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import jwt_decode from 'jwt-decode';

import store from './store';
import setAuthToken from './utils/setAuthToken';
import { setCurrentUser, logoutUser } from './actions/authActions';
import './App.css';

import { Dashboard, Assets, Users, Login } from './containers';
import { PrivateRoute, Topbar, Navbar } from './components';

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

const App = () => {
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
              <PrivateRoute path='/users' component={Users} />
            </div>
          </div>
        </div>
      </Router>
    </Provider>
  );
};

export default App;
