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

ChartJS.register(ArcElement, Tooltip, Legend);

const TotalSales = () => {
  const salesData = [
    {
      name: 'Direct',
      value: 300.56,
      percentage: 38.6,
      color: '#1C1C1C' // Black - exactly as in image
    },
    {
      name: 'Affiliate',
      value: 135.18,
      percentage: 17.4, // Corrected to match visual proportion
      // Light blue - matching image
      color: '#BAEDBD'
    },
    {
      name: 'Sponsored',
      value: 154.02,
      percentage: 19.8, // Corrected to match visual proportion
      color: '#95A4FC' // Purple/violet - matching image
    },
    {
      name: 'E-mail',
      value: 48.96,
      percentage: 24.2, // Corrected to match visual proportion
       // Light green - matching image
       color: '#B1E3FF' 
    }
  ];

  // Get the largest segment for percentage display
  const largestSegment = salesData.reduce((prev, current) => 
    (prev.percentage > current.percentage) ? prev : current
  );

  const data = {
    labels: salesData.map(item => item.name),
    datasets: [
      {
        data: salesData.map(item => item.percentage),
        backgroundColor: salesData.map(item => item.color),
        borderColor: '#F7F9FB', // Background color for gaps
        borderWidth: 2, // Gap size between segments
        // ✅ Fully rounded outer edges, square inner edges
        borderRadius: {
          outerStart: 30, // Fully rounded outer start
          outerEnd: -60,   // Fully rounded outer end
          innerStart: 30,  // Square inner start
          innerEnd: -60     // Square inner end
        },
        borderSkipped: false,
        spacing: 2, // Spacing between segments
      },
    ],
  };

  const options = {
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        enabled: false,
      },
    },
    cutout: '72%', // Inner radius
    maintainAspectRatio: false,
    responsive: true,
    rotation: -10, // Start from top
  };

  return (
    <div className={styles.totalSales}>
      {/* ✅ Header */}
      <div className={styles.header}>
        <h3 className={styles.title}>Total Sales</h3>
      </div>

      {/* ✅ Chart Container */}
      <div className={styles.chartContainer}>
        <div className={styles.chartWrapper}>
          <Doughnut data={data} options={options} />
          
          {/* ✅ Percentage label positioned correctly */}
          <div className={styles.percentageContainer}>
            <div className={styles.percentageLabel}>
              {largestSegment.percentage}%
            </div>
          </div>
        </div>
      </div>

      {/* ✅ Legend with correct values */}
      <div className={styles.legend}>
        {salesData.map((item, index) => (
          <div key={index} className={styles.legendItem}>
            <div className={styles.legendRow}>
              <div className={styles.legendIndicator}>
                <div 
                  className={styles.legendDot}
                  style={{ backgroundColor: item.color }}
                ></div>
                <span className={styles.legendLabel}>{item.name}</span>
              </div>
              <span className={styles.legendValue}>${item.value}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TotalSales;
