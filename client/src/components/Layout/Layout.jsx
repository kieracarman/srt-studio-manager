import React from 'react';
import { Outlet } from 'react-router-dom';

import styles from './Layout.module.css';
import { Topbar, Navbar } from '../';

const Layout = () => (
  <div className={styles.container}>
    <header className={styles.topbar}><Topbar /></header>
    <main className={styles.content}><Outlet /></main>
    <nav className={styles.navbar}><Navbar /></nav>
  </div>
);

export default Layout;