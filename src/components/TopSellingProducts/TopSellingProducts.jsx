// src/components/TopSellingProducts/TopSellingProducts.jsx
import React from 'react';
import styles from './TopSellingProducts.module.css';

const TopSellingProducts = () => {
  const productsData = [
    {
      id: 1,
      name: 'ASOS Ridley High Waist',
      price: '$79.49',
      quantity: 82,
      amount: '$6,518.18'
    },
    {
      id: 2,
      name: 'Marco Lightweight Shirt',
      price: '$128.50',
      quantity: 37,
      amount: '$4,754.50'
    },
    {
      id: 3,
      name: 'Half Sleeve Shirt',
      price: '$39.99',
      quantity: 64,
      amount: '$2,559.36'
    },
    {
      id: 4,
      name: 'Lightweight Jacket',
      price: '$20.00',
      quantity: 184,
      amount: '$3,680.00'
    },
    {
      id: 5,
      name: 'Marco Shoes',
      price: '$79.49',
      quantity: 64,
      amount: '$1,965.81'
    }
  ];

  return (
    <div className={styles.topSellingProducts}>
      {/* ✅ Header */}
      <div className={styles.header}>
        <h3 className={styles.title}>Top Selling Products</h3>
      </div>

      {/* ✅ Table Container */}
      <div className={styles.tableContainer}>
        <table className={styles.table}>
          {/* ✅ Table Header */}
          <thead className={styles.tableHead}>
            <tr className={styles.headerRow}>
              <th className={styles.headerCell}>Name</th>
              <th className={styles.headerCell}>Price</th>
              <th className={styles.headerCell}>Quantity</th>
              <th className={styles.headerCell}>Amount</th>
            </tr>
          </thead>

          {/* ✅ Table Body */}
          <tbody className={styles.tableBody}>
            {productsData.map((product, index) => (
              <tr key={product.id} className={styles.tableRow}>
                <td className={styles.tableCell}>
                  <span className={styles.productName}>{product.name}</span>
                </td>
                <td className={styles.tableCell}>
                  <span className={styles.productPrice}>{product.price}</span>
                </td>
                <td className={styles.tableCell}>
                  <span className={styles.productQuantity}>{product.quantity}</span>
                </td>
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
