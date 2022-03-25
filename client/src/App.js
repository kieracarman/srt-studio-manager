import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';

import store from './store';
import './App.css';

import { Dashboard, Login } from './containers';
import { PrivateRoute, Topbar, Navbar } from './components';

/*
// Check for token to keep user logged in
if (localStorage.jwtToken) {
  // Decode token and get user info and exp
  const decoded = jwt_decode(localStorage.jwtToken);

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
}*/

const App = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <div className='App'>
          <Routes>
            <Route path='/login' element={<Login />} />
            {/*<PrivateRoute path='/' element={<Topbar />} />
            <div className='middle'>
              <PrivateRoute path='/*' element={<Navbar />} />
              <div className='content'>
                <PrivateRoute path='/' element={<Dashboard />} />
                <PrivateRoute path='assets/*' element={<Assets />} />
                <PrivateRoute path='users/*' element={<Users />} />
              </div>
            </div>*/}
          </Routes>
        </div>
      </BrowserRouter>
    </Provider>
  );
};

export default App;
