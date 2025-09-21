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

const RevenueChart = () => {
  // ✅ Complete data set for both curves
  const revenueData = [
    { month: 'Jan', current: 13, previous: 8, currentSolid: 13, currentDotted: null },
    { month: 'Feb', current: 10, previous: 17, currentSolid: 10, currentDotted: null },
    { month: 'Mar', current: 8, previous: 17, currentSolid: 8, currentDotted: null },
    { month: 'Apr', current: 10, previous: 14, currentSolid: 10, currentDotted: 10 }, // Transition point
    { month: 'May', current: 16, previous: 11, currentSolid: null, currentDotted: 16 },
    { month: 'Jun', current: 20, previous: 20, currentSolid: null, currentDotted: 20 }
  ];

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

  return (
    <div className={styles.revenueChart}>
      {/* ✅ Header */}
      <div className={styles.chartHeader}>
        <h3 className={styles.chartTitle}>Revenue</h3>
        <span className={styles.smallVerticalBar}>|</span>
        <CustomLegend />
      </div>

      {/* ✅ Chart Container */}
      <div className={styles.chartContainer}>
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart
            data={revenueData}
            margin={{ top: 20, right: 30, left: 0, bottom: 20 }}
          >
            {/* ✅ Grid lines */}
            <CartesianGrid
              strokeDasharray="none"
              stroke="#E5E7EB"
              strokeWidth={0.8}
              horizontal={true}
              vertical={false}
            />
            
            {/* ✅ Y-Axis */}
            <YAxis
              domain={[0, 30]}
              ticks={[0, 10, 20, 30]}
              tickFormatter={(value) => value === 0 ? '0' : `${value}M`}
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: '#9CA3AF', fontFamily: 'Inter' }}
              width={35}
            />
            
            {/* ✅ X-Axis */}
            <XAxis
              dataKey="month"
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: '#9CA3AF', fontFamily: 'Inter' }}
              tickMargin={15}
            />
            
            {/* ✅ CURVE 1: Previous Week - Complete solid line (light blue) */}
            <Line
              type="monotone"
              dataKey="previous"
              stroke="#A8B8D0"
              strokeWidth={2.5}
              dot={false}
              activeDot={false}
              className={styles.previousLine}
            />
            
            {/* ✅ CURVE 2a: Current Week SOLID portion (Jan-Apr) */}
            <Line
              type="monotone"
              dataKey="currentSolid"
              stroke="#000000"
              strokeWidth={2.5}
              dot={false}
              activeDot={false}
              connectNulls={false}
              className={styles.currentSolidLine}
            />
            
            {/* ✅ CURVE 2b: Current Week DOTTED portion (Apr-Jun) */}
            <Line
              type="monotone"
              dataKey="currentDotted"
              stroke="#000000"
              strokeWidth={2.5}
              strokeDasharray="5,5"
              dot={false}
              activeDot={false}
              connectNulls={false}
              className={styles.currentDottedLine}
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default RevenueChart;
