/**
 * MetricsGrid Component
 * 
 * A responsive dashboard component that displays key business metrics in a 2x2
 * grid layout with interactive hover effects and theme support. Each metric card
 * shows a primary value with percentage change and trend indicator, featuring
 * smooth animations and accessibility compliance.
 * 
 * Features:
 * - Interactive hover effects with content swapping
 * - Theme-aware styling (light/dark modes)
 * - Responsive grid layout (2x2 to single column)
 * - Trend indicators with directional icons
 * - CSS custom properties for consistent theming
 * - Accessibility support with ARIA labels
 * - Performance optimized animations
 * 
 * Design Specifications:
 * - Grid: 2x2 layout on desktop, single column on mobile
 * - Card Height: 118px (matches ProjectionsChart height)
 * - Max Width: 400px on desktop
 * - Gap: 16px between cards
 * 
 * @component
 * @example
 * return (
 *   <MetricsGrid />
 * )
 * 
 * @author Your Name
 * @since 1.0.0
 * @version 2.1.0
 */

import React from 'react';
import styles from './MetricsGrid.module.css';

// =============================================================================
// ASSET IMPORTS - Trend Indicators
// =============================================================================
/** Upward trend arrow icon from Figma design system */
import trendUpIcon from '../../assets/icons/trend-up.png';

/** Downward trend arrow icon from Figma design system */
import trendDownIcon from '../../assets/icons/trend-down.png';

/**
 * MetricsGrid functional component
 * 
 * Renders a grid of metric cards displaying key performance indicators
 * with interactive hover effects and responsive design.
 * 
 * @returns {JSX.Element} The rendered metrics grid component
 */
const MetricsGrid = () => {
  // ===========================================================================
  // COMPONENT DATA - Business Metrics Configuration
  // ===========================================================================
  
  /**
   * Static metrics data configuration
   * 
   * Contains the core business metrics to display in the dashboard.
   * Each metric includes display value, percentage change, trend direction,
   * and visual variant for theme-specific styling.
   * 
   * @type {Array<Object>}
   * @property {number} id - Unique identifier for React key prop
   * @property {string} title - Display name for the metric
   * @property {string} value - Formatted metric value (with currency/percentage)
   * @property {string} change - Percentage change with direction indicator
   * @property {('up'|'down')} trend - Trend direction for icon selection
   * @property {('customers'|'orders'|'revenue'|'growth')} variant - Card style variant
   */
  const metricsData = [
    {
      id: 1,
      title: 'Customers',
      value: '3,781',
      change: '+11.01%',
      trend: 'up',
      variant: 'customers' // Light blue background theme
    },
    {
      id: 2,
      title: 'Orders',
      value: '1,219', 
      change: '-0.03%',
      trend: 'down',
      variant: 'orders' // Light gray background theme
    },
    {
      id: 3,
      title: 'Revenue',
      value: '$695',
      change: '+15.03%',
      trend: 'up',
      variant: 'revenue' // Light gray background theme
    },
    {
      id: 4,
      title: 'Growth',
      value: '30.1%',
      change: '+6.08%',
      trend: 'up',
      variant: 'growth' // Light purple background theme
    }
  ];

  // ===========================================================================
  // UTILITY FUNCTIONS
  // ===========================================================================
  
  /**
   * Gets appropriate trend icon based on metric trend direction
   * 
   * @param {('up'|'down')} trend - The trend direction
   * @returns {string} Path to the appropriate trend icon
   */
  const getTrendIcon = (trend) => {
    return trend === 'up' ? trendUpIcon : trendDownIcon;
  };

  /**
   * Generates accessible description for trend change
   * 
   * @param {string} change - The percentage change string
   * @param {string} trend - The trend direction
   * @returns {string} Human-readable trend description
   */
  const getTrendDescription = (change, trend) => {
    const direction = trend === 'up' ? 'increase' : 'decrease';
    return `${Math.abs(parseFloat(change))}% ${direction}`;
  };

  // ===========================================================================
  // COMPONENT RENDER
  // ===========================================================================
  
  return (
    <div 
      className={styles.metricsGrid}
      role="region"
      aria-label="Key performance metrics dashboard"
    >
      {metricsData.map((metric) => (
        <article 
          key={metric.id}
          className={`${styles.metricCard} ${styles[metric.variant]}`}
          role="article"
          aria-labelledby={`metric-title-${metric.id}`}
          aria-describedby={`metric-change-${metric.id}`}
          tabIndex="0" // Make cards focusable for keyboard navigation
        >
          {/* ==================================================================
              CARD HEADER - Metric Title
              ================================================================== */}
          <header className={styles.cardHeader}>
            <h3 
              id={`metric-title-${metric.id}`}
              className={styles.title}
            >
              {metric.title}
            </h3>
          </header>
          
          {/* ==================================================================
              CARD CONTENT - Values with Hover Animation System
              ================================================================== */}
          <div 
            className={styles.cardContent}
            aria-live="polite" // Announce changes to screen readers
          >
            {/* ===============================================================
                DEFAULT STATE - Primary Value Display
                =============================================================== */}
            <div 
              className={styles.mainValue}
              aria-label={`Current ${metric.title.toLowerCase()}: ${metric.value}`}
            >
              <span 
                className={styles.value}
                role="text"
              >
                {metric.value}
              </span>
            </div>
            
            {/* ===============================================================
                DEFAULT STATE - Trend Change Display
                =============================================================== */}
            <div 
              className={styles.changeDisplay}
              id={`metric-change-${metric.id}`}
              aria-label={getTrendDescription(metric.change, metric.trend)}
            >
              <span 
                className={`${styles.change} ${styles[metric.trend]}`}
                role="text"
              >
                {metric.change}
              </span>
              <img 
                src={getTrendIcon(metric.trend)}
                alt={`${metric.trend}ward trend`}
                className={styles.trendIcon}
                role="img"
                aria-hidden="false" // Important for trend indication
                loading="lazy" // Optimize loading for non-critical images
              />
            </div>
            
            {/* ===============================================================
                HOVER STATE - Swapped Content Layout
                =============================================================== */}
            <div 
              className={styles.hoverContent}
              aria-hidden="true" // Hidden by default, duplicate content
            >
              {/* Trend change - moved to left on hover */}
              <div className={styles.hoverChange}>
                <span className={`${styles.change} ${styles[metric.trend]}`}>
                  {metric.change}
                </span>
                <img 
                  src={getTrendIcon(metric.trend)}
                  alt={`${metric.trend}ward trend`}
                  className={styles.trendIcon}
                  loading="lazy"
                />
              </div>
              
              {/* Primary value - moved to right on hover */}
              <div className={styles.hoverValue}>
                <span className={styles.value}>
                  {metric.value}
                </span>
              </div>
            </div>
          </div>
        </article>
      ))}
    </div>
  );
};

export default MetricsGrid;

// =============================================================================
// COMPONENT METADATA & DOCUMENTATION
// =============================================================================

/**
 * Component Data Structure Documentation
 * 
 * @typedef {Object} MetricData
 * @property {number} id - Unique identifier for React reconciliation
 * @property {string} title - Metric display name (max 12 characters recommended)
 * @property {string} value - Formatted display value with appropriate units
 * @property {string} change - Percentage change with + or - prefix
 * @property {('up'|'down')} trend - Determines icon and color theming
 * @property {('customers'|'orders'|'revenue'|'growth')} variant - CSS class modifier
 */

/**
 * Theme Variants and Color Mapping:
 * 
 * Light Theme:
 * - customers: Light blue background (#E3F5FF)
 * - orders: Light gray background (#F7F9FB)  
 * - revenue: Light gray background (#F7F9FB)
 * - growth: Light purple background (#E5ECF6)
 * 
 * Dark Theme:
 * - customers: Light blue background (unchanged for contrast)
 * - orders: Black background (#000000) with white text
 * - revenue: Black background (#000000) with white text  
 * - growth: Light blue background (unchanged for contrast)
 */

/**
 * Accessibility Features:
 * - ARIA labels for screen reader support
 * - Semantic HTML structure (article, header, h3)
 * - Keyboard navigation support (tabIndex)
 * - Live regions for dynamic content
 * - High contrast mode compatibility
 * - Focus indicators for keyboard users
 * - Alt text for trend icons
 * 
 * Performance Optimizations:
 * - Lazy loading for trend icons
 * - CSS transforms for smooth animations
 * - Hardware acceleration via GPU
 * - Efficient CSS selectors
 * - Minimal DOM repaints
 * 
 * Responsive Behavior:
 * - Desktop: 2x2 grid layout (400px max-width)
 * - Tablet: 2x2 grid with reduced spacing
 * - Mobile Landscape: 2x2 grid with compressed height
 * - Mobile Portrait: Single column stack
 * - Extra Small: Further compressed dimensions
 * 
 * Browser Support:
 * - Modern browsers with CSS Grid support
 * - CSS custom properties (CSS variables)
 * - CSS transforms and transitions
 * - Graceful degradation for older browsers
 */

/**
 * Animation System:
 * 
 * The component implements a sophisticated hover animation system:
 * 
 * 1. Default State:
 *    - mainValue: visible, positioned left
 *    - changeDisplay: visible, positioned right
 *    - hoverContent: invisible, offset down
 * 
 * 2. Hover State:
 *    - mainValue: fades out, moves up
 *    - changeDisplay: fades out, moves up  
 *    - hoverContent: fades in, positions center
 *    - Card: lifts up with shadow
 * 
 * 3. Transition Properties:
 *    - Duration: 0.3s for content, 0.2s for card
 *    - Easing: ease function for natural motion
 *    - Hardware acceleration: translateY transforms
 */

/**
 * Future Enhancements:
 * - Dynamic data loading from API
 * - Real-time updates with WebSocket
 * - Customizable metric configurations
 * - Export functionality (PNG/PDF)
 * - Drill-down navigation to detailed views
 * - Historical data comparison
 * - Alert thresholds and notifications
 */
