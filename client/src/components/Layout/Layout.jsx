import React from 'react';
import { Outlet } from 'react-router-dom';

import styles from './Layout.module.css';
import { Topbar, Navbar } from '../';

const Layout = () => (
  <>
    <Topbar />
    <div className={styles.middle}>
      <Navbar />
      <div className={styles.content}>
        <Outlet />
      </div>
    </div>
  </>
);

export default Layout;