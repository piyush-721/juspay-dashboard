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

const DashboardPage = () => {
  const dispatch = useDispatch();
  const { sidebarOpen, notificationsPanelOpen } = useSelector((state) => state.theme);

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      if (sidebarOpen) dispatch(closeSidebar());
      if (notificationsPanelOpen) dispatch(closeNotifications());
    }
  };

  useEffect(() => {
  const handleResize = () => {
    dispatch(setResponsivePanelState());
  };

  window.addEventListener('resize', handleResize);
  return () => window.removeEventListener('resize', handleResize);
}, [dispatch]);

  return (
    <div 
      className={styles.dashboard}
      data-sidebar-open={sidebarOpen}
      data-notifications-open={notificationsPanelOpen}
    >
      <div className={styles.layout}>
        {/* Sidebar */}
        {sidebarOpen && (
          <div className={styles.sidebarContainer} onClick={handleBackdropClick}>
            <Sidebar />
          </div>
        )}
        
        <div className={styles.mainArea}>
          <Header />
          
          <main className={styles.content}>
            <div className={styles.pageHeader}>
              <h1 className={styles.pageTitle}>eCommerce</h1>
            </div>

            <div className={styles.dashboardGrid}>
              {/* First Row: MetricsGrid + ProjectionsChart */}
              <div className={styles.topRow}>
                <div className={styles.metricsSection}>
                  <MetricsGrid />
                </div>
                <div className={styles.chartsSection}>
                  <ProjectionsChart />
                </div>
              </div>

              {/* ✅ UNIFIED GRID: All 4 components in single 2x2 grid */}
              <div className={styles.chartsGrid}>
                <div className={styles.revenueSection}>
                  <RevenueChart />
                </div>
                <div className={styles.mapSection}>
                  <WorldMap />
                </div>
                <div className={styles.productsSection}>
                  <TopSellingProducts />
                </div>
                <div className={styles.salesSection}>
                  <TotalSales />
                </div>
              </div>
            </div>
          </main>
        </div>
        
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
