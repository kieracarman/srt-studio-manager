import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Provider } from 'react-redux'
import jwt_decode from 'jwt-decode'

import App from './App'
import './index.css'
import store from './store'
import { LOGIN, LOGOUT } from './constants/actionTypes'

if (localStorage.jwtToken) {
  // Decode token to get user and exp
  const decoded = jwt_decode(localStorage.jwtToken)

  // Authenticate with token
  store.dispatch({ type: LOGIN, token: decoded })

  // Check for expired token
  const currentTime = Date.now() / 1000
  if (decoded.exp < currentTime) {
    store.dispatch({ type: LOGOUT })

    // Redirect to login page
    window.location.href = '/login'
  }
}

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path='/*' element={<App />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
)
