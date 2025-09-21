/**
 * WorldMap Component
 * 
 * A geographic revenue visualization component that displays global sales data
 * through an interactive world map with location markers and progress bars.
 * Features coordinate-positioned location dots, hover tooltips, and proportional
 * progress bars showing relative revenue performance by location.
 * 
 * Features:
 * - Interactive world map with precise location positioning
 * - Hover-responsive location dots with tooltip information
 * - Dynamic progress bars scaled to maximum revenue value
 * - Geographic revenue distribution visualization
 * - Responsive map scaling for mobile devices
 * - Dark/light theme support with image filtering
 * - Location data sorted by performance/revenue
 * - Professional tooltip system with revenue display
 * 
 * Geographic Locations:
 * - New York: $72K (100% bar width - highest performer)
 * - San Francisco: $39K (~54% bar width)
 * - Sydney: $25K (~35% bar width)
 * - Singapore: $61K (~85% bar width)
 * 
 * Design Specifications:
 * - Component: 222px × 318px (matching TotalSales)
 * - Map: 140px × 90px maximum with contain fit
 * - Location dots: 4px diameter, expandable to 6px on hover
 * - Progress bars: 2px height with 80px border-radius
 * - Colors: Cyan (#A8C5DA) bars, Gray (#374151) dots
 * 
 * @component
 * @example
 * return (
 *   <WorldMap />
 * )
 * 
 * @author Your Name
 * @since 1.0.0
 * @version 1.8.0
 */

// src/components/WorldMap/WorldMap.jsx
import React from 'react';
import styles from './WorldMap.module.css';
import worldMapSvg from '../../assets/images/World-Map.png';

/**
 * WorldMap functional component
 * 
 * Renders an interactive world map with location-based revenue visualization
 * through positioned markers and proportional progress bars.
 * 
 * @returns {JSX.Element} The rendered world map component
 */
const WorldMap = () => {
  // ===========================================================================
  // GEOGRAPHIC REVENUE DATA - Location Performance Metrics
  // ===========================================================================
  
  /**
   * Location-based revenue data with geographic and financial metrics
   * 
   * Contains revenue performance data for key global locations with
   * formatted display values and numeric values for calculations.
   * Data is ordered by business importance/revenue contribution.
   * 
   * @type {Array<Object>}
   * @property {string} location - City name for display
   * @property {string} revenue - Formatted revenue string (e.g., "72K")
   * @property {number} value - Numeric revenue value for calculations and bar sizing
   */
  const locationData = [
    { 
      location: 'New York',          // Primary market - East Coast US
      revenue: '72K',                // Highest revenue generator
      value: 72                      // Maximum value for bar width calculation
    },
    { 
      location: 'San Francisco',     // West Coast US market
      revenue: '39K',                // Mid-tier performance
      value: 39                      // ~54% of maximum value
    },
    { 
      location: 'Sydney',            // Asia-Pacific market
      revenue: '25K',                // Emerging market performance
      value: 25                      // ~35% of maximum value
    },
    { 
      location: 'Singapore',         // Southeast Asia hub
      revenue: '61K',                // Strong market performance
      value: 61                      // ~85% of maximum value
    }
  ];

  // ===========================================================================
  // DATA PROCESSING - Progress Bar Calculations
  // ===========================================================================

  /**
   * Calculates maximum revenue value for progress bar scaling
   * 
   * Determines the highest revenue value to use as 100% width reference
   * for proportional progress bar sizing across all locations.
   * 
   * @type {number} Maximum revenue value from location data
   */
  // Get max value for bar width calculation
  const maxValue = Math.max(...locationData.map(item => item.value));

  // ===========================================================================
  // COMPONENT RENDER - Map Visualization and Location Data
  // ===========================================================================

  return (
    <div className={styles.worldMap}>
      {/* =====================================================================
          COMPONENT HEADER - Title Section
          ===================================================================== */}
      
      {/* Header */}
      <div className={styles.header}>
        <h3 className={styles.title}>Revenue by Location</h3>
      </div>

      {/* =====================================================================
          WORLD MAP VISUALIZATION - Interactive Geographic Display
          ===================================================================== */}

      {/* Map Container */}
      <div className={styles.mapContainer}>
        <div className={styles.mapImageWrapper}>
          {/* World Map Background Image */}
          <img 
            src={worldMapSvg} 
            alt="World Map showing global revenue locations" 
            className={styles.mapImage}
          />
          
          {/* Interactive Location Markers Overlay */}
          {/* Location Dots overlay */}
          <div className={styles.locationDotsOverlay}>
            
            {/* New York Marker - Northeast US */}
            <div 
              className={styles.locationDot} 
              style={{ left: '28%', top: '40%' }}     /* Approximate NYC coordinates */
              title="New York - 72K"                  /* Hover tooltip */
            ></div>
            
            {/* San Francisco Marker - West Coast US */}
            <div 
              className={styles.locationDot} 
              style={{ left: '20%', top: '43%' }}     /* Approximate SF coordinates */
              title="San Francisco - 39K"             /* Hover tooltip */
            ></div>
            
            {/* Sydney Marker - Australia */}
            <div 
              className={styles.locationDot} 
              style={{ left: '74%', top: '68%' }}     /* Approximate Sydney coordinates */
              title="Sydney - 25K"                    /* Hover tooltip */
            ></div>
            
            {/* Singapore Marker - Southeast Asia */}
            <div 
              className={styles.locationDot} 
              style={{ left: '66%', top: '52%' }}     /* Approximate Singapore coordinates */
              title="Singapore - 61K"                 /* Hover tooltip */
            ></div>
          </div>
        </div>
      </div>

      {/* =====================================================================
          LOCATION DATA LIST - Revenue Performance Breakdown
          ===================================================================== */}

      {/* Location List with full-width bars */}
      <div className={styles.locationList}>
        {locationData.map((item, index) => (
          <div key={index} className={styles.locationItem}>
            
            {/* Location Name and Revenue Display */}
            <div className={styles.locationRow}>
              <span className={styles.locationName}>{item.location}</span>
              <span className={styles.locationRevenue}>{item.revenue}</span>
            </div>
            
            {/* Proportional Progress Bar */}
            <div className={styles.barContainer}>
              <div 
                className={styles.progressBar}
                style={{ 
                  width: `${(item.value / maxValue) * 100}%`  /* Dynamic width based on revenue proportion */
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
