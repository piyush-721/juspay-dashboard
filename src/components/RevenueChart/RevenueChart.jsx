/**
 * RevenueChart Component
 * 
 * A sophisticated dual-line chart component that visualizes current vs previous week
 * revenue data using Recharts. Features a unique dual-line system where the current
 * week line transitions from solid to dotted to indicate projected vs actual data.
 * 
 * Features:
 * - Dual-line revenue comparison (current vs previous week)
 * - Smart line rendering: solid portion (actual) + dotted portion (projected)
 * - Custom legend with revenue values and color coding
 * - Responsive design with progressive scaling breakpoints
 * - Custom grid lines and axis formatting
 * - Smooth curve animations with subtle drop shadows
 * - Dark/light theme support
 * - Mobile-first responsive design
 * 
 * Design Specifications:
 * - Desktop: 650px width, 318px height
 * - Colors: Black (#000000) current, Light blue (#A8B8D0) previous
 * - Chart transition point: April (solid to dotted line)
 * - Revenue values: Current $58,211, Previous $68,768
 * 
 * @component
 * @example
 * return (
 *   <RevenueChart />
 * )
 * 
 * @author Your Name
 * @since 1.0.0
 * @version 2.5.0
 */

// src/components/RevenueChart/RevenueChart.jsx
import React from 'react';
import {
  ComposedChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer
} from 'recharts';
import styles from './RevenueChart.module.css';

/**
 * RevenueChart functional component
 * 
 * Renders a responsive line chart comparing current and previous week revenue
 * with intelligent solid/dotted line rendering for actual vs projected data.
 * 
 * @returns {JSX.Element} The rendered revenue chart component
 */
const RevenueChart = () => {
  // ===========================================================================
  // CHART DATA CONFIGURATION - Revenue Comparison Dataset
  // ===========================================================================
  
  /**
   * Revenue data with intelligent line segment control
   * 
   * Contains monthly revenue data for current and previous weeks with special
   * handling for solid vs dotted line segments. The current week line transitions
   * from solid (actual data) to dotted (projected data) at April.
   * 
   * Data Structure Explanation:
   * - month: X-axis labels (3-letter abbreviations)
   * - current: Complete current week data (for reference)
   * - previous: Complete previous week data (always solid line)
   * - currentSolid: Jan-Apr actual data (solid black line)
   * - currentDotted: Apr-Jun projected data (dotted black line)
   * 
   * @type {Array<Object>}
   * @property {string} month - Month abbreviation for X-axis display
   * @property {number} current - Complete current week revenue value
   * @property {number} previous - Previous week revenue value (full line)
   * @property {number|null} currentSolid - Actual data segment (Jan-Apr)
   * @property {number|null} currentDotted - Projected data segment (Apr-Jun)
   */
  // ✅ Complete data set for both curves
  const revenueData = [
    { month: 'Jan', current: 13, previous: 8, currentSolid: 13, currentDotted: null },   // Actual data
    { month: 'Feb', current: 10, previous: 17, currentSolid: 10, currentDotted: null },  // Actual data
    { month: 'Mar', current: 8, previous: 17, currentSolid: 8, currentDotted: null },    // Actual data
    { month: 'Apr', current: 10, previous: 14, currentSolid: 10, currentDotted: 10 },    // Transition point
    { month: 'May', current: 16, previous: 11, currentSolid: null, currentDotted: 16 },  // Projected data
    { month: 'Jun', current: 20, previous: 20, currentSolid: null, currentDotted: 20 }   // Projected data
  ];

  // ===========================================================================
  // CUSTOM LEGEND COMPONENT - Revenue Values Display
  // ===========================================================================
  
  /**
   * Custom legend component with revenue values and color coding
   * 
   * Displays current and previous week revenue totals with color-coded dots
   * matching the chart lines. Uses horizontal layout for optimal space usage.
   * 
   * Revenue Values:
   * - Current Week: $58,211 (black dot, bold value)
   * - Previous Week: $68,768 (light blue dot, bold value)
   * 
   * @returns {JSX.Element} Custom legend with dots and revenue values
   */
  // ✅ Simple Custom Legend Component - One horizontal line
  const CustomLegend = () => {
    return (
      <div className={styles.customLegend}>
        <span className={styles.legendText}>
          <span className={styles.legendDot} style={{ backgroundColor: '#000000' }}></span>
          Current Week <span className={styles.legendValue}>$58,211</span>
        </span>
        <span className={styles.legendText}>
          <span className={styles.legendDot} style={{ backgroundColor: '#A8B8D0' }}></span>
          Previous Week <span className={styles.legendValue}>$68,768</span>
        </span>
      </div>
    );
  };

  // ===========================================================================
  // COMPONENT RENDER - Chart Layout and Configuration
  // ===========================================================================

  return (
    <div className={styles.revenueChart}>
      {/* =====================================================================
          CHART HEADER - Title and Legend Section
          ===================================================================== */}
      
      {/* ✅ Header */}
      <div className={styles.chartHeader}>
        <h3 className={styles.chartTitle}>Revenue</h3>
        <span className={styles.smallVerticalBar}>|</span> {/* Visual separator */}
        <CustomLegend />
      </div>

      {/* =====================================================================
          CHART VISUALIZATION - Recharts Implementation
          ===================================================================== */}

      {/* ✅ Chart Container */}
      <div className={styles.chartContainer}>
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart
            data={revenueData}
            margin={{ top: 20, right: 30, left: 0, bottom: 20 }}
          >
            
            {/* Grid Lines Configuration */}
            {/* ✅ Grid lines */}
            <CartesianGrid
              strokeDasharray="none"    /* Solid grid lines */
              stroke="#E5E7EB"          /* Light gray color */
              strokeWidth={0.8}         /* Thin, subtle lines */
              horizontal={true}         /* Show horizontal guides */
              vertical={false}          /* Hide vertical lines for clean look */
            />
            
            {/* Y-Axis Configuration */}
            {/* ✅ Y-Axis */}
            <YAxis
              domain={[0, 30]}                                          /* Scale: 0-30M */
              ticks={[0, 10, 20, 30]}                                   /* Custom tick positions */
              tickFormatter={(value) => value === 0 ? '0' : `${value}M`} /* Format: 10M, 20M, etc. */
              axisLine={false}                                          /* Hide axis line */
              tickLine={false}                                          /* Hide tick marks */
              tick={{ fontSize: 12, fill: '#9CA3AF', fontFamily: 'Inter' }} /* Styling */
              width={35}                                                /* Fixed width for alignment */
            />
            
            {/* X-Axis Configuration */}
            {/* ✅ X-Axis */}
            <XAxis
              dataKey="month"                                           /* Use month field */
              axisLine={false}                                          /* Clean appearance */
              tickLine={false}                                          /* No tick marks */
              tick={{ fontSize: 12, fill: '#9CA3AF', fontFamily: 'Inter' }} /* Consistent styling */
              tickMargin={15}                                           /* Space below axis */
            />
            
            {/* Line Chart Components - Three Lines for Complex Visualization */}
            
            {/* Previous Week Line - Complete Solid Line */}
            {/* ✅ CURVE 1: Previous Week - Complete solid line (light blue) */}
            <Line
              type="monotone"           /* Smooth curve interpolation */
              dataKey="previous"        /* Data field for previous week */
              stroke="#A8B8D0"          /* Light blue color */
              strokeWidth={2.5}         /* Medium thickness for visibility */
              dot={false}               /* No dots on data points */
              activeDot={false}         /* No hover dots */
              className={styles.previousLine} /* CSS class for styling */
            />
            
            {/* Current Week Solid Portion - Jan to Apr */}
            {/* ✅ CURVE 2a: Current Week SOLID portion (Jan-Apr) */}
            <Line
              type="monotone"           /* Smooth curve matching previous line */
              dataKey="currentSolid"    /* Solid data segment */
              stroke="#000000"          /* Black color for current week */
              strokeWidth={2.5}         /* Matching thickness */
              dot={false}               /* Clean line appearance */
              activeDot={false}         /* No interaction dots */
              connectNulls={false}      /* Don't connect null values */
              className={styles.currentSolidLine} /* CSS styling class */
            />
            
            {/* Current Week Dotted Portion - Apr to Jun */}
            {/* ✅ CURVE 2b: Current Week DOTTED portion (Apr-Jun) */}
            <Line
              type="monotone"           /* Consistent curve style */
              dataKey="currentDotted"   /* Projected data segment */
              stroke="#000000"          /* Same black color */
              strokeWidth={2.5}         /* Consistent line weight */
              strokeDasharray="5,5"     /* Dotted line pattern (5px dash, 5px gap) */
              dot={false}               /* No data point markers */
              activeDot={false}         /* No hover indicators */
              connectNulls={false}      /* Separate from solid segment */
              className={styles.currentDottedLine} /* CSS styling class */
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default RevenueChart;
