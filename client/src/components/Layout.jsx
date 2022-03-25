import React from 'react';
import { Outlet } from 'react-router-dom';
import { Topbar, Navbar } from './';

const Layout = () => (
  <>
    <Topbar />
    <div className='middle'>
      <Navbar />
      <div className='content'>
        <Outlet />
      </div>
    </div>
  </>
);

export default Layout;