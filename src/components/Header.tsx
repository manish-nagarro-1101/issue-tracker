import React from 'react';
import styles from './HeaderFooter.module.css';
const Header = () => {
  return (
    <header className={styles.header}>
      <h1>Issue Tracker</h1>
      {/* Add logo or navigation links if needed */}
    </header>
  );
};

export default Header;