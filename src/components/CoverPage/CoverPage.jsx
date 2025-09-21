// CoverPage.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './CoverPage.module.css';

// Import assets
import coverBg from '../../assets/images/cover-background.png';
import vector from '../../assets/images/Vector.png';
import ellipse1 from '../../assets/images/Ellipse 1.png';
import ellipse2 from '../../assets/images/Ellipse 2.png';

const CoverPage = () => {
  const navigate = useNavigate();

  const handleAssignmentClick = () => {
    navigate('/dashboard');
  };

  return (
    <div 
      className={styles.coverContainer}
      style={{
        backgroundImage: `url(${coverBg})`,
        width: '100vw',
        height: '100vh',
      }}
    >
      <div className={styles.heroSection}>
        {/* Decorative elements */}
        <img className={styles.vector} src={vector} alt="Decorative vector graphic" />
        <img className={styles.ellipse1} src={ellipse1} alt="ellipse1" />
        <img className={styles.ellipse2} src={ellipse2} alt="ellipse2" />
        
        {/* Button with shadow effect */}
        <div className={styles.buttonWrapper}>
          <button 
            className={styles.assignmentButton}
            onClick={handleAssignmentClick}
            type="button"
          >
            ASSIGNMENT
          </button>
          {/* Shadow button (decorative only) */}
          <button 
            className={styles.shadowAssignmentButton}
            onClick={handleAssignmentClick}
            type="button"
            aria-hidden="true"
          />
        </div>
        
        <h1 className={styles.heroTitle}>
          UI DEVELOPER<br />
          <span className={styles.heroAssignment}>ASSIGNMENT</span> 
        </h1>
      </div>

      <div className={styles.companyInfo}>
        <h3 className={styles.companyLabel}>COMPANY</h3>
        <p className={styles.companyName}>Juspay Technologies Private Limited</p>
      </div>
    </div>
  );
};

export default CoverPage;
