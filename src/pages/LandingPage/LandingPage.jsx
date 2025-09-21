import React from 'react';
import CoverPage from '../../components/CoverPage/CoverPage';
import styles from './LandingPage.module.css';

const LandingPage = () => {
  return (
    <div className={styles.landingPage}>
      <CoverPage />
    </div>
  );
};

export default LandingPage;
