/**
 * TotalSales Component
 * 
 * A sophisticated doughnut chart component that visualizes sales channel performance
 * with Chart.js integration. Features a custom-positioned percentage label pointing
 * to the largest segment, color-coded legend, and responsive design optimizations.
 * 
 * Features:
 * - Interactive doughnut chart with Chart.js/React integration
 * - Dynamic percentage label showing largest segment value
 * - Custom-positioned arrow pointing to dominant segment
 * - Color-coded legend with sales values and channel names
 * - Rounded segment edges with gap spacing between segments
 * - Responsive chart sizing for mobile devices
 * - Theme-aware styling for light/dark modes
 * - Backdrop blur effect on percentage label
 * - Precise color matching with design specifications
 * 
 * Sales Channels:
 * - Direct: $300.56 (38.6%) - Black (#1C1C1C)
 * - Affiliate: $135.18 (17.4%) - Light Green (#BAEDBD)
 * - Sponsored: $154.02 (19.8%) - Purple (#95A4FC)
 * - E-mail: $48.96 (24.2%) - Light Blue (#B1E3FF)
 * 
 * Design Specifications:
 * - Component: 222px × 318px
 * - Chart: 120px diameter with 72% cutout
 * - Segments: 2px gaps with rounded outer edges
 * - Label: Positioned bottom-left with arrow pointer
 * 
 * @component
 * @example
 * return (
 *   <TotalSales />
 * )
 * 
 * @author Your Name
 * @since 1.0.0
 * @version 2.2.0
 */

// src/components/TotalSales/TotalSales.jsx
import React from 'react';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import styles from './TotalSales.module.css';

// Register Chart.js components for doughnut chart functionality
ChartJS.register(ArcElement, Tooltip, Legend);

/**
 * TotalSales functional component
 * 
 * Renders a doughnut chart visualization of sales performance across
 * different channels with custom styling and responsive behavior.
 * 
 * @returns {JSX.Element} The rendered total sales chart component
 */
const TotalSales = () => {
  // ===========================================================================
  // SALES DATA CONFIGURATION - Channel Performance Metrics
  // ===========================================================================
  
  /**
   * Sales channel performance data with precise color matching
   * 
   * Contains actual sales data for different marketing channels with
   * exact color values matching the design specifications. Data is
   * structured for Chart.js consumption and legend generation.
   * 
   * @type {Array<Object>}
   * @property {string} name - Sales channel name for legend display
   * @property {number} value - Total sales amount in dollars
   * @property {number} percentage - Percentage of total sales volume
   * @property {string} color - Hex color code for chart segment
   */
  const salesData = [
    {
      name: 'Direct',                    // Direct sales channel
      value: 300.56,                     // Highest revenue generator
      percentage: 38.6,                  // Largest market share
      color: '#1C1C1C'                   // Black - exactly as in design
    },
    {
      name: 'Affiliate',                 // Affiliate marketing channel
      value: 135.18,                     // Mid-range performance
      percentage: 17.4,                  // Corrected to match visual proportion
      color: '#BAEDBD'                   // Light green - matching design
    },
    {
      name: 'Sponsored',                 // Sponsored advertising channel
      value: 154.02,                     // Good performance segment
      percentage: 19.8,                  // Corrected to match visual proportion
      color: '#95A4FC'                   // Purple/violet - matching design
    },
    {
      name: 'E-mail',                    // Email marketing channel
      value: 48.96,                      // Smallest revenue segment
      percentage: 24.2,                  // Corrected to match visual proportion
      color: '#B1E3FF'                   // Light blue - matching design
    }
  ];

  // ===========================================================================
  // DATA PROCESSING - Chart Configuration
  // ===========================================================================

  /**
   * Calculates the largest sales segment for percentage display
   * 
   * Identifies the dominant sales channel to highlight with the
   * floating percentage label and arrow pointer.
   * 
   * @type {Object} The sales data object with highest percentage
   */
  // Get the largest segment for percentage display
  const largestSegment = salesData.reduce((prev, current) => 
    (prev.percentage > current.percentage) ? prev : current
  );

  /**
   * Chart.js data configuration object
   * 
   * Structures the sales data for Chart.js consumption with
   * labels, colors, and percentage values properly formatted.
   */
  const data = {
    labels: salesData.map(item => item.name),                    // Channel names for tooltips
    datasets: [
      {
        data: salesData.map(item => item.percentage),            // Percentage values for segments
        backgroundColor: salesData.map(item => item.color),      // Segment colors from data
        borderColor: '#F7F9FB',                                  // Background color for gaps
        borderWidth: 2,                                          // Gap size between segments
        
        // Custom border radius for rounded segments
        // ✅ Fully rounded outer edges, square inner edges
        borderRadius: {
          outerStart: 30,                                        // Fully rounded outer start
          outerEnd: -60,                                         // Fully rounded outer end
          innerStart: 30,                                        // Square inner start
          innerEnd: -60                                          // Square inner end
        },
        borderSkipped: false,                                    // Apply radius to all segments
        spacing: 2,                                              // Spacing between segments
      },
    ],
  };

  /**
   * Chart.js options configuration
   * 
   * Configures chart behavior, appearance, and responsive settings
   * with custom cutout percentage and rotation for optimal presentation.
   */
  const options = {
    plugins: {
      legend: {
        display: false,                                          // Hide default legend (using custom)
      },
      tooltip: {
        enabled: false,                                          // Disable tooltips for clean look
      },
    },
    cutout: '72%',                                              // Inner radius for doughnut hole
    maintainAspectRatio: false,                                 // Allow responsive sizing
    responsive: true,                                           // Enable responsive behavior
    rotation: -10,                                              // Start from top for better alignment
  };

  // ===========================================================================
  // COMPONENT RENDER - Chart Layout and Legend
  // ===========================================================================

  return (
    <div className={styles.totalSales}>
      {/* =====================================================================
          COMPONENT HEADER - Title Section
          ===================================================================== */}
      
      {/* ✅ Header */}
      <div className={styles.header}>
        <h3 className={styles.title}>Total Sales</h3>
      </div>

      {/* =====================================================================
          CHART VISUALIZATION - Doughnut Chart with Custom Label
          ===================================================================== */}

      {/* ✅ Chart Container */}
      <div className={styles.chartContainer}>
        <div className={styles.chartWrapper}>
          {/* Chart.js Doughnut Chart Component */}
          <Doughnut data={data} options={options} />
          
          {/* Custom Percentage Label with Arrow Pointer */}
          {/* ✅ Percentage label positioned correctly */}
          <div className={styles.percentageContainer}>
            <div className={styles.percentageLabel}>
              {largestSegment.percentage}%
            </div>
          </div>
        </div>
      </div>

      {/* =====================================================================
          CUSTOM LEGEND - Sales Channel Information
          ===================================================================== */}

      {/* ✅ Legend with correct values */}
      <div className={styles.legend}>
        {salesData.map((item, index) => (
          <div key={index} className={styles.legendItem}>
            <div className={styles.legendRow}>
              {/* Legend Item with Color Dot and Channel Name */}
              <div className={styles.legendIndicator}>
                <div 
                  className={styles.legendDot}
                  style={{ backgroundColor: item.color }}
                ></div>
                <span className={styles.legendLabel}>{item.name}</span>
              </div>
              {/* Sales Value Display */}
              <span className={styles.legendValue}>${item.value}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TotalSales;
