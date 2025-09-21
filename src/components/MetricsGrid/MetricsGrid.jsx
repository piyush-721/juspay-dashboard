// src/components/MetricsGrid/MetricsGrid.jsx
import React from 'react';
import styles from './MetricsGrid.module.css';

// Import trend icons from Figma
import trendUpIcon from '../../assets/icons/trend-up.png';
import trendDownIcon from '../../assets/icons/trend-down.png';

const MetricsGrid = () => {
  const metricsData = [
    {
      id: 1,
      title: 'Customers',
      value: '3,781',
      change: '+11.01%',
      trend: 'up',
      variant: 'customers' // ✅ Changed to customers
    },
    {
      id: 2,
      title: 'Orders',
      value: '1,219', 
      change: '-0.03%',
      trend: 'down',
      variant: 'orders' // ✅ Changed to orders
    },
    {
      id: 3,
      title: 'Revenue',
      value: '$695',
      change: '+15.03%',
      trend: 'up',
      variant: 'revenue' // ✅ Changed to revenue
    },
    {
      id: 4,
      title: 'Growth',
      value: '30.1%',
      change: '+6.08%',
      trend: 'up',
      variant: 'growth' // ✅ Changed to growth
    }
  ];

  return (
    <div className={styles.metricsGrid}>
      {metricsData.map((metric) => (
        <div 
          key={metric.id} 
          className={`${styles.metricCard} ${styles[metric.variant]}`}
        >
          <div className={styles.cardHeader}>
            <h3 className={styles.title}>{metric.title}</h3>
          </div>
          
          <div className={styles.cardContent}>
            {/* ✅ Main display - swaps on hover */}
            <div className={styles.mainValue}>
              <span className={styles.value}>{metric.value}</span>
            </div>
            
            {/* ✅ Change display - swaps on hover */}
            <div className={styles.changeDisplay}>
              <span className={`${styles.change} ${styles[metric.trend]}`}>
                {metric.change}
              </span>
              <img 
                src={metric.trend === 'up' ? trendUpIcon : trendDownIcon}
                alt={metric.trend}
                className={styles.trendIcon}
              />
            </div>
            
            {/* ✅ Hover state - shows swapped version */}
            <div className={styles.hoverContent}>
              <div className={styles.hoverChange}>
                <span className={`${styles.change} ${styles[metric.trend]}`}>
                  {metric.change}
                </span>
                <img 
                  src={metric.trend === 'up' ? trendUpIcon : trendDownIcon}
                  alt={metric.trend}
                  className={styles.trendIcon}
                />
              </div>
              
              <div className={styles.hoverValue}>
                <span className={styles.value}>{metric.value}</span>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MetricsGrid;
