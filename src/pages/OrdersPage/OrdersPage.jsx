/**
 * OrdersPage Component
 * 
 * A dedicated page for order management featuring a clean layout with the OrdersTable
 * component. Implements the same sophisticated responsive layout system as DashboardPage
 * with dynamic width calculations, mobile overlay panels, and intelligent state management.
 * 
 * Features:
 * - Consistent layout architecture with DashboardPage
 * - Dynamic width calculations based on panel states
 * - Auto-close notifications panel on page load for clean UX
 * - Mobile overlay system for sidebar and notifications
 * - Backdrop click handling for intuitive panel closure
 * - Responsive design with progressive mobile optimizations
 * - Theme-aware styling with dark mode support
 * - Accessibility support with reduced motion preferences
 * - Smooth panel transitions and animations
 * 
 * Layout Architecture:
 * - Desktop: Sidebar (212px) + Main Area + Notifications (280px)
 * - Mobile: Full-width main area with overlay panels
 * - Content: Header + Page Title + OrdersTable component
 * - Width calculations: calc(100% - panel widths) approach
 * 
 * Page Behavior:
 * - Notifications panel auto-closes on page load
 * - Maintains sidebar state from previous navigation
 * - Responsive panel behavior matches dashboard patterns
 * - Clean focus on order management functionality
 * 
 * @component
 * @page
 * @example
 * return (
 *   <OrdersPage />
 * )
 * 
 * @author Your Name
 * @since 1.0.0
 * @version 2.8.0
 */

// src/pages/OrdersPage/OrdersPage.jsx
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { closeSidebar, closeNotifications } from '../../store/slices/themeSlice';
import Header from '../../components/Header/Header';
import Sidebar from '../../components/Sidebar/Sidebar';
import NotificationsPanel from '../../components/NotificationsPanel/NotificationsPanel';
// import OrdersList from '../../components/OrdersList/OrdersList';
import styles from './OrdersPage.module.css';
import OrdersTable from '../../components/OrdersTable/OrdersTable';

/**
 * OrdersPage functional component
 * 
 * Renders the order management page with consistent layout architecture,
 * featuring the OrdersTable component and intelligent panel management.
 * 
 * @returns {JSX.Element} The rendered orders page
 */
const OrdersPage = () => {
  // ===========================================================================
  // HOOKS & STATE MANAGEMENT
  // ===========================================================================
  
  /** Redux dispatch function for state management */
  const dispatch = useDispatch();
  
  /** 
   * Panel state from Redux store for layout calculations
   * @type {Object}
   * @property {boolean} sidebarOpen - Sidebar panel visibility state
   * @property {boolean} notificationsPanelOpen - Notifications panel visibility state
   */
  const { sidebarOpen, notificationsPanelOpen } = useSelector((state) => state.theme);

  // ===========================================================================
  // SIDE EFFECTS - Page Initialization and Cleanup
  // ===========================================================================

  /**
   * Page initialization effect
   * 
   * Auto-closes the notifications panel when the OrdersPage loads to provide
   * a clean, focused experience for order management. This ensures users
   * aren't distracted by notifications when managing orders.
   */
  // ✅ Close notifications panel by default when OrdersPage loads
  useEffect(() => {
    dispatch(closeNotifications());
  }, []); // Empty dependency array means this runs once on mount

  // ===========================================================================
  // EVENT HANDLERS - Panel Management and Interactions
  // ===========================================================================

  /**
   * Handles backdrop click for panel closure
   * 
   * Closes panels when user clicks on the backdrop overlay area,
   * providing intuitive mobile interaction patterns consistent
   * with the dashboard page behavior.
   * 
   * @param {Event} e - Click event object
   */
  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      if (sidebarOpen) dispatch(closeSidebar());
      if (notificationsPanelOpen) dispatch(closeNotifications());
    }
  };

  // ===========================================================================
  // COMPONENT RENDER - Orders Page Layout Structure
  // ===========================================================================

  return (
    <div 
      className={styles.ordersPage}
      data-sidebar-open={sidebarOpen}                    // CSS data attribute for styling
      data-notifications-open={notificationsPanelOpen}  // CSS data attribute for width calculations
    >
      <div className={styles.layout}>
        
        {/* =====================================================================
            SIDEBAR PANEL - Navigation with Responsive Behavior
            ===================================================================== */}
        
        {/* Sidebar */}
        {sidebarOpen && (
          <div className={styles.sidebarContainer} onClick={handleBackdropClick}>
            <Sidebar />
          </div>
        )}
        
        {/* =====================================================================
            MAIN ORDERS AREA - Content and Order Management
            ===================================================================== */}
        
        <div className={styles.mainArea}>
          {/* Page Header */}
          <Header />
          
          {/* Main Orders Content */}
          <main className={styles.content}>
            
            {/* Page Title Section */}
            <div className={styles.pageHeader}>
              <h1 className={styles.pageTitle}>Order List</h1>
            </div>

            {/* Orders Management Content */}
            <div className={styles.ordersContent}>
              {/* Primary OrdersTable Component */}
              <OrdersTable />
            </div>
          </main>
        </div>
        
        {/* =====================================================================
            NOTIFICATIONS PANEL - Contextual Information with Responsive Behavior
            ===================================================================== */}
        
        {/* Notifications Panel */}
        {notificationsPanelOpen && (
          <div className={styles.notificationsContainer} onClick={handleBackdropClick}>
            <NotificationsPanel />
          </div>
        )}
      </div>
    </div>
  );
};

export default OrdersPage;
