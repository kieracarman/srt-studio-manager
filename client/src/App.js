import { Routes, Route, Navigate } from 'react-router-dom';

import './App.css';

import { Dashboard, Login, Assets, Users, Tickets, Modal } from './containers';
import { Layout, PrivateRoute } from './components';
import { EditAsset } from './components/Assets';
import { EditUser } from './components/Users';
import { EditTicket } from './components/Tickets';

const App = () => {
  return (
    <Routes>
      <Route path='login' element={localStorage.jwtToken ? <Navigate to='/' replace /> : <Login />} />

      {/* Protected routes */}
      <Route path='/' element={<PrivateRoute />}>
        <Route path='/' element={<Layout />}>
          <Route path='/' element={<Dashboard />} />
          
          {/* Asset routes */}
          <Route path='assets/:id' element={<Modal onClose='/assets'><EditAsset /></Modal>} />
          <Route path='assets' element={<Assets />} />

          {/* User routes */}
          <Route path='users/:id' element={<Modal onClose='/users'><EditUser /></Modal>} />
          <Route path='users' element={<Users />} />

          {/* Ticket routes */}
          <Route path='tickets/:id' element={<Modal onClose='/tickets'><EditTicket /></Modal>} />
          <Route path='tickets' element={<Tickets />} />
        </Route>
      </Route>
    </Routes>
  );
};

export default App;
