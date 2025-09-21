// src/components/WorldMap/WorldMap.jsx
import React from 'react';
import styles from './WorldMap.module.css';
import worldMapSvg from '../../assets/images/World-Map.png';

const WorldMap = () => {
  const locationData = [
    { location: 'New York', revenue: '72K', value: 72 },
    { location: 'San Francisco', revenue: '39K', value: 39 },
    { location: 'Sydney', revenue: '25K', value: 25 },
    { location: 'Singapore', revenue: '61K', value: 61 }
  ];

  // Get max value for bar width calculation
  const maxValue = Math.max(...locationData.map(item => item.value));

  return (
    <div className={styles.worldMap}>
      {/* Header */}
      <div className={styles.header}>
        <h3 className={styles.title}>Revenue by Location</h3>
      </div>

      {/* Map Container */}
      <div className={styles.mapContainer}>
        <div className={styles.mapImageWrapper}>
          <img 
            src={worldMapSvg} 
            alt="World Map" 
            className={styles.mapImage}
          />
          
          {/* Location Dots overlay */}
          <div className={styles.locationDotsOverlay}>
            <div 
              className={styles.locationDot} 
              style={{ left: '28%', top: '40%' }}
              title="New York - 72K"
            ></div>
            <div 
              className={styles.locationDot} 
              style={{ left: '20%', top: '43%' }}
              title="San Francisco - 39K"
            ></div>
            <div 
              className={styles.locationDot} 
              style={{ left: '74%', top: '68%' }}
              title="Sydney - 25K"
            ></div>
            <div 
              className={styles.locationDot} 
              style={{ left: '66%', top: '52%' }}
              title="Singapore - 61K"
            ></div>
          </div>
        </div>
      </div>

      {/* Location List with full-width bars */}
      <div className={styles.locationList}>
        {locationData.map((item, index) => (
          <div key={index} className={styles.locationItem}>
            <div className={styles.locationRow}>
              <span className={styles.locationName}>{item.location}</span>
              <span className={styles.locationRevenue}>{item.revenue}</span>
            </div>
            <div className={styles.barContainer}>
              <div 
                className={styles.progressBar}
                style={{ 
                  width: `${(item.value / maxValue) * 100}%`
                }}
              ></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WorldMap;
