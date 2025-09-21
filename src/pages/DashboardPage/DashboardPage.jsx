/**
 * DashboardPage Component
 * 
 * The main eCommerce dashboard page featuring a sophisticated responsive layout
 * with advanced sidebar and notification panel management. Implements intelligent
 * grid systems that adapt from desktop 2x2 layouts to mobile single-column stacks,
 * with dynamic width calculations based on panel states.
 * 
 * Features:
 * - Advanced responsive grid system (2x2 → single column)
 * - Intelligent panel state management with width calculations
 * - Mobile overlay system for sidebar and notifications
 * - Backdrop click handling for panel closure
 * - Resize event handling for responsive panel states
 * - Comprehensive dashboard component integration
 * - Theme-aware styling with dark mode support
 * - Accessibility support with reduced motion preferences
 * - Smooth animations and transitions
 * 
 * Layout Architecture:
 * - Desktop: Sidebar (212px) + Main Area + Notifications (280px)
 * - Mobile: Full-width main area with overlay panels
 * - Grid: MetricsGrid + ProjectionsChart (top row)
 *         RevenueChart + WorldMap (2nd row)
 *         TopSellingProducts + TotalSales (3rd row)
 * 
 * Responsive Breakpoints:
 * - 1441px+: Perfect 2x2 grid with panel width calculations
 * - 1301px-1440px: Maintained 2x2 with slight adjustments
 * - ≤1300px: Single column stack for all components
 * - ≤1024px: Mobile overlays for panels with backdrop blur
 * 
 * @component
 * @page
 * @example
 * return (
 *   <DashboardPage />
 * )
 * 
 * @author Your Name
 * @since 1.0.0
 * @version 3.5.0
 */

// src/pages/DashboardPage/DashboardPage.jsx
import React, {useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { closeSidebar, closeNotifications, setResponsivePanelState } from '../../store/slices/themeSlice';
import Header from '../../components/Header/Header';
import Sidebar from '../../components/Sidebar/Sidebar';
import NotificationsPanel from '../../components/NotificationsPanel/NotificationsPanel';
import MetricsGrid from '../../components/MetricsGrid/MetricsGrid';
import ProjectionsChart from '../../components/ProjectionsChart/ProjectionsChart';
import RevenueChart from '../../components/RevenueChart/RevenueChart';
import WorldMap from '../../components/WorldMap/WorldMap';
import TopSellingProducts from '../../components/TopSellingProducts/TopSellingProducts';
import TotalSales from '../../components/TotalSales/TotalSales';
import styles from './DashboardPage.module.css';

/**
 * DashboardPage functional component
 * 
 * Renders the complete eCommerce dashboard with advanced layout management,
 * responsive grid systems, and intelligent panel state handling.
 * 
 * @returns {JSX.Element} The rendered dashboard page
 */
const DashboardPage = () => {
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
  // EVENT HANDLERS - Panel Management and Interactions
  // ===========================================================================

  /**
   * Handles backdrop click for panel closure
   * 
   * Closes panels when user clicks on the backdrop overlay area,
   * providing intuitive mobile interaction patterns.
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
  // SIDE EFFECTS - Responsive Behavior Management
  // ===========================================================================

  /**
   * Window resize handler for responsive panel state management
   * 
   * Monitors window size changes and updates panel states accordingly
   * to maintain optimal layout behavior across device sizes.
   */
  useEffect(() => {
    const handleResize = () => {
      dispatch(setResponsivePanelState());
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [dispatch]);

  // ===========================================================================
  // COMPONENT RENDER - Dashboard Layout Structure
  // ===========================================================================

  return (
    <div 
      className={styles.dashboard}
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
            MAIN DASHBOARD AREA - Content and Grid Layout
            ===================================================================== */}
        
        <div className={styles.mainArea}>
          {/* Dashboard Header */}
          <Header />
          
          {/* Main Dashboard Content */}
          <main className={styles.content}>
            
            {/* Page Title Section */}
            <div className={styles.pageHeader}>
              <h1 className={styles.pageTitle}>eCommerce</h1>
            </div>

            {/* Dashboard Component Grid System */}
            <div className={styles.dashboardGrid}>
              
              {/* Top Row: Metrics and Projections */}
              {/* First Row: MetricsGrid + ProjectionsChart */}
              <div className={styles.topRow}>
                <div className={styles.metricsSection}>
                  <MetricsGrid />
                </div>
                <div className={styles.chartsSection}>
                  <ProjectionsChart />
                </div>
              </div>

              {/* Advanced 2x2 Grid: Revenue Analytics */}
              {/* ✅ UNIFIED GRID: All 4 components in single 2x2 grid */}
              <div className={styles.chartsGrid}>
                {/* Revenue Chart - Large Component (Left Side) */}
                <div className={styles.revenueSection}>
                  <RevenueChart />
                </div>
                
                {/* World Map - Compact Component (Top Right) */}
                <div className={styles.mapSection}>
                  <WorldMap />
                </div>
                
                {/* Top Selling Products - Large Component (Bottom Left) */}
                <div className={styles.productsSection}>
                  <TopSellingProducts />
                </div>
                
                {/* Total Sales - Compact Component (Bottom Right) */}
                <div className={styles.salesSection}>
                  <TotalSales />
                </div>
              </div>
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

export default DashboardPage;
