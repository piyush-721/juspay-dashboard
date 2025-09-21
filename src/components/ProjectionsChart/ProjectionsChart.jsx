/**
 * ProjectionsChart Component
 * 
 * A responsive bar chart component that visualizes projections vs actual data
 * using Recharts library. Features custom grid lines, responsive design, and
 * theme support. Displays monthly data with stacked bar visualization showing
 * base values and overlay projections.
 * 
 * Features:
 * - Responsive bar chart with custom styling
 * - Custom grid lines overlay for better data readability
 * - Stacked bar visualization (base + overlay)
 * - Custom Y-axis labels positioned outside chart area
 * - Mobile-first responsive design with breakpoints
 * - Dark/light theme support
 * - Flexible container sizing with min/max constraints
 * - Performance optimizations for mobile devices
 * 
 * Design Specifications:
 * - Desktop: 432px max-width, 252px height
 * - Mobile: Full width with adaptive height
 * - Color scheme: Blue gradient (#7c9feb base, #bdd1ff overlay)
 * - Grid lines: Subtle background guides at 30%, 50%, 83.3%
 * 
 * @component
 * @example
 * return (
 *   <ProjectionsChart />
 * )
 * 
 * @author Your Name
 * @since 1.0.0
 * @version 2.1.0
 */

// src/components/ProjectionsChart/ProjectionsChart.jsx
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, ReferenceLine  } from 'recharts';
import styles from './ProjectionsChart.module.css';

/**
 * ProjectionsChart functional component
 * 
 * Renders a responsive bar chart displaying monthly projections vs actual values
 * with custom styling and responsive behavior.
 * 
 * @returns {JSX.Element} The rendered chart component
 */
const ProjectionsChart = () => {
  // ===========================================================================
  // CHART DATA CONFIGURATION
  // ===========================================================================
  
  /**
   * Monthly chart data for projections vs actuals visualization
   * 
   * Contains 6 months of sample data showing base values and overlay projections.
   * Base values represent actual data while overlay represents projected values.
   * Data is structured for Recharts stacked bar chart consumption.
   * 
   * @type {Array<Object>}
   * @property {string} month - Three-letter month abbreviation for X-axis labels
   * @property {number} base - Base/actual value (darker blue bar segment)
   * @property {number} overlay - Projection/forecast value (lighter blue bar segment)
   */
  const chartData = [
    { month: 'Jan', base: 15, overlay: 4 }, // January: 15M actual + 4M projected
    { month: 'Feb', base: 20, overlay: 4 }, // February: 20M actual + 4M projected  
    { month: 'Mar', base: 16, overlay: 3 }, // March: 16M actual + 3M projected
    { month: 'Apr', base: 22, overlay: 5 }, // April: 22M actual + 5M projected
    { month: 'May', base: 13, overlay: 3 }, // May: 13M actual + 3M projected
    { month: 'Jun', base: 20, overlay: 4 }  // June: 20M actual + 4M projected
  ];

  // ===========================================================================
  // COMPONENT RENDER
  // ===========================================================================

  return (
    <div className={styles.projectionsChart}>
      {/* =====================================================================
          CHART HEADER - Title Section
          ===================================================================== */}
      
      {/* Chart Header */}
      <div className={styles.chartHeader}>
        <h3 className={styles.title}>Projections vs Actuals</h3>
      </div>

      {/* =====================================================================
          CHART VISUALIZATION - Main Chart Area with Grid Lines
          ===================================================================== */}

      {/* Chart Wrapper */}
      <div className={styles.chartWrapper}>
        
        {/* Custom Y-Axis Labels */}
        <div className={styles.yAxisLabels}>
          <span className={styles.yLabel}>30M</span> {/* Maximum value label */}
          <span className={styles.yLabel}>20M</span> {/* Mid-high value label */}
          <span className={styles.yLabel}>10M</span> {/* Mid-low value label */}
          <span className={styles.yLabel}>0</span>   {/* Minimum value label */}
        </div>

        {/* Main Chart Container with Grid Overlay */}
        <div className={styles.chartContainer}>
          
          {/* Custom Grid Lines Overlay */}
          {/* ✅ Fixed Grid Lines - Now Visible */}
          <div className={styles.gridLines}>
            {/* Horizontal grid lines positioned at specific chart percentages */}
            <div className={styles.gridLine} style={{ top: '16.7%' }}></div> {/* ~25M line */}
            <div className={styles.gridLine} style={{ top: '50%' }}></div>   {/* ~15M line */}
            <div className={styles.gridLine} style={{ top: '83.3%' }}></div> {/* ~5M line */}
          </div>

          {/* Recharts Bar Chart Implementation */}
          {/* Chart */}
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={chartData}
              margin={{ top: 10, right: 10, left: 10, bottom: 0 }}
              barCategoryGap="25%" /* Space between bar groups */
            >
              {/* X-Axis Configuration */}
              <XAxis 
                dataKey="month"
                axisLine={false}        /* Hide axis line for clean look */
                tickLine={false}       /* Hide tick marks */
                tick={{ 
                  fontSize: 12, 
                  fill: '#9ca3af',     /* Light gray text color */
                  fontFamily: 'Inter, sans-serif'
                }}
                dy={10}                /* Offset labels below axis */
              />
              
              {/* Y-Axis Configuration (Hidden - using custom labels) */}
              <YAxis 
                hide                   /* Hide default Y-axis */
                domain={[0, 30]}       /* Set scale from 0 to 30M */
              />

                 <ReferenceLine 
      y={0} 
      stroke="#d1d5db" 
      strokeWidth={1}
    />
              
              {/* Base Data Bars (Darker Blue) */}
              <Bar 
                dataKey="base" 
                stackId="stack"        /* Enable bar stacking */
                fill="#7c9feb"         /* Darker blue color for actual values */
                radius={[0, 0, 0, 0]}  /* No rounded corners for base bars */
              />
              
              {/* Overlay Projection Bars (Lighter Blue) */}
              <Bar 
                dataKey="overlay" 
                stackId="stack"        /* Stack on top of base bars */
                fill="#bdd1ff"         /* Lighter blue for projected values */
                radius={[2, 2, 0, 0]}  /* Rounded top corners for stacked effect */
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default ProjectionsChart;
