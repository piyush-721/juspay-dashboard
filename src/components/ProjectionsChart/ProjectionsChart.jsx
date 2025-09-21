// src/components/ProjectionsChart/ProjectionsChart.jsx
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer } from 'recharts';
import styles from './ProjectionsChart.module.css';

const ProjectionsChart = () => {
  const chartData = [
    { month: 'Jan', base: 15, overlay: 4 },
    { month: 'Feb', base: 20, overlay: 4 },
    { month: 'Mar', base: 16, overlay: 3 },
    { month: 'Apr', base: 22, overlay: 5 },
    { month: 'May', base: 13, overlay: 3 },
    { month: 'Jun', base: 20, overlay: 4 }
  ];

  return (
    <div className={styles.projectionsChart}>
      {/* Chart Header */}
      <div className={styles.chartHeader}>
        <h3 className={styles.title}>Projections vs Actuals</h3>
      </div>

      {/* Chart Wrapper */}
      <div className={styles.chartWrapper}>
        <div className={styles.yAxisLabels}>
          <span className={styles.yLabel}>30M</span>
          <span className={styles.yLabel}>20M</span>
          <span className={styles.yLabel}>10M</span>
          <span className={styles.yLabel}>0</span>
        </div>

        <div className={styles.chartContainer}>
          {/* ✅ Fixed Grid Lines - Now Visible */}
          <div className={styles.gridLines}>
            <div className={styles.gridLine} style={{ top: '16.7%' }}></div>
            <div className={styles.gridLine} style={{ top: '50%' }}></div>
            <div className={styles.gridLine} style={{ top: '83.3%' }}></div>
          </div>

          {/* Chart */}
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={chartData}
              margin={{ top: 10, right: 10, left: 10, bottom: 0 }}
              barCategoryGap="25%"
            >
              <XAxis 
                dataKey="month"
                axisLine={false}
                tickLine={false}
                tick={{ 
                  fontSize: 12, 
                  fill: '#9ca3af',
                  fontFamily: 'Inter, sans-serif'
                }}
                dy={10}
              />
              <YAxis hide domain={[0, 30]} />
              
              {/* Base bars (Darker blue) */}
              <Bar 
                dataKey="base" 
                stackId="stack"
                fill="#7c9feb"
                radius={[0, 0, 0, 0]}
              />
              
              {/* Overlay bars (Lighter blue) */}
              <Bar 
                dataKey="overlay" 
                stackId="stack"
                fill="#bdd1ff"
                radius={[2, 2, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default ProjectionsChart;
