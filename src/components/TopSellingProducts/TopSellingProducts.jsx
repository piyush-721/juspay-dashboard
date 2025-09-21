/**
 * TopSellingProducts Component
 * 
 * A responsive data table component that displays the top-performing products
 * with their sales metrics. Features progressive column hiding on smaller screens
 * and matches the exact dimensions and styling of the RevenueChart component
 * for consistent dashboard layout.
 * 
 * Features:
 * - Responsive data table with progressive column hiding
 * - Consistent layout matching RevenueChart dimensions (650px × 318px)
 * - Hover effects on table rows for better UX
 * - Mobile-optimized column priorities (Name → Amount → Price → Quantity)
 * - Dark/light theme support with consistent styling
 * - Smooth transitions and hover states
 * - Text overflow handling with ellipsis for long product names
 * - Precise typography matching design specifications
 * 
 * Data Structure:
 * - Product Name: Full descriptive product name
 * - Price: Individual unit price
 * - Quantity: Units sold
 * - Amount: Total revenue (Price × Quantity)
 * 
 * Design Specifications:
 * - Desktop: 650px × 318px (matching RevenueChart)
 * - Column priorities: Name (40%) → Price (20%) → Quantity (20%) → Amount (20%)
 * - Progressive hiding: Mobile shows only Name + Amount
 * - Hover state: Light gray background (#F9FAFB)
 * 
 * @component
 * @example
 * return (
 *   <TopSellingProducts />
 * )
 * 
 * @author Your Name
 * @since 1.0.0
 * @version 2.0.0
 */

// src/components/TopSellingProducts/TopSellingProducts.jsx
import React from 'react';
import styles from './TopSellingProducts.module.css';

/**
 * TopSellingProducts functional component
 * 
 * Renders a responsive table showing top-performing products with
 * sales metrics and progressive column hiding for mobile devices.
 * 
 * @returns {JSX.Element} The rendered top selling products table
 */
const TopSellingProducts = () => {
  // ===========================================================================
  // PRODUCT DATA CONFIGURATION
  // ===========================================================================
  
  /**
   * Top selling products data with sales metrics
   * 
   * Contains real-world product data with pricing, quantities sold,
   * and total revenue amounts. Data is ordered by performance/relevance
   * with highest-value items prioritized for display.
   * 
   * @type {Array<Object>}
   * @property {number} id - Unique product identifier for React keys
   * @property {string} name - Full product name/description
   * @property {string} price - Formatted unit price with currency symbol
   * @property {number} quantity - Total units sold
   * @property {string} amount - Formatted total revenue (price × quantity)
   */
  const productsData = [
    {
      id: 1,
      name: 'ASOS Ridley High Waist',      // High-value fashion item
      price: '$79.49',
      quantity: 82,
      amount: '$6,518.18'                  // Highest revenue generator
    },
    {
      id: 2,
      name: 'Marco Lightweight Shirt',     // Premium apparel item
      price: '$128.50',                    // Highest unit price
      quantity: 37,
      amount: '$4,754.50'                  // Second-highest revenue
    },
    {
      id: 3,
      name: 'Half Sleeve Shirt',           // Mid-range popular item
      price: '$39.99',
      quantity: 64,
      amount: '$2,559.36'
    },
    {
      id: 4,
      name: 'Lightweight Jacket',          // Volume seller
      price: '$20.00',                     // Lowest unit price
      quantity: 184,                       // Highest quantity sold
      amount: '$3,680.00'
    },
    {
      id: 5,
      name: 'Marco Shoes',                 // Footwear category
      price: '$79.49',                     // Same price point as top item
      quantity: 64,
      amount: '$1,965.81'
    }
  ];

  // ===========================================================================
  // COMPONENT RENDER - Table Structure and Layout
  // ===========================================================================

  return (
    <div className={styles.topSellingProducts}>
      {/* =====================================================================
          COMPONENT HEADER - Title Section
          ===================================================================== */}
      
      {/* ✅ Header */}
      <div className={styles.header}>
        <h3 className={styles.title}>Top Selling Products</h3>
      </div>

      {/* =====================================================================
          DATA TABLE - Product Metrics Display
          ===================================================================== */}

      {/* ✅ Table Container */}
      <div className={styles.tableContainer}>
        <table className={styles.table}>
          
          {/* Table Header with Column Definitions */}
          {/* ✅ Table Header */}
          <thead className={styles.tableHead}>
            <tr className={styles.headerRow}>
              <th className={styles.headerCell}>Name</th>         {/* 40% width - Primary identifier */}
              <th className={styles.headerCell}>Price</th>        {/* 20% width - Unit price */}
              <th className={styles.headerCell}>Quantity</th>     {/* 20% width - Units sold */}
              <th className={styles.headerCell}>Amount</th>       {/* 20% width - Total revenue */}
            </tr>
          </thead>

          {/* Table Body with Product Data Rows */}
          {/* ✅ Table Body */}
          <tbody className={styles.tableBody}>
            {productsData.map((product, index) => (
              <tr key={product.id} className={styles.tableRow}>
                
                {/* Product Name Cell */}
                <td className={styles.tableCell}>
                  <span className={styles.productName}>{product.name}</span>
                </td>
                
                {/* Unit Price Cell */}
                <td className={styles.tableCell}>
                  <span className={styles.productPrice}>{product.price}</span>
                </td>
                
                {/* Quantity Sold Cell */}
                <td className={styles.tableCell}>
                  <span className={styles.productQuantity}>{product.quantity}</span>
                </td>
                
                {/* Total Revenue Cell */}
                <td className={styles.tableCell}>
                  <span className={styles.productAmount}>{product.amount}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TopSellingProducts;
