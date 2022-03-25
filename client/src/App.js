import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Provider } from 'react-redux';
import jwt_decode from 'jwt-decode';

import store from './store';
import { LOGIN, LOGOUT } from './constants/actionTypes';
import './App.css';

import { Dashboard, Login, Assets, Users, Modal } from './containers';
import { Layout, PrivateRoute } from './components';
import EditAsset from './components/Assets/EditAsset';

if (localStorage.jwtToken) {
  // Decode token to get user and exp
  const decoded = jwt_decode(localStorage.jwtToken);

  // Authenticate with token
  store.dispatch({ type: LOGIN, user: decoded });

  // Check for expired token
  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    store.dispatch({ type: LOGOUT });

    // Redirect to login page
    window.location.href = '/login';
  }
}

const App = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <div className='App'>
          <Routes>
            <Route path='/login' element={localStorage.jwtToken ? <Navigate to='/' replace /> : <Login />} />
            <Route path='/' element={<PrivateRoute />}>
              <Route path='/' element={<Layout />}>
                <Route path='/' element={<Dashboard />} />
                <Route path='assets/*' element={<Assets />}>
                  <Route path=':id' element={<Modal children={<EditAsset />} onClose='/assets'/>} />
                  <Route path='new' element={<Modal children={<EditAsset />} onClose='/assets'/>} />
                </Route>
                <Route path='users/*' element={<Users />} />
              </Route>
            </Route>
          </Routes>
        </div>
      </BrowserRouter>
    </Provider>
  );
};

export default App;
