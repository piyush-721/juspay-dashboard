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

const OrdersPage = () => {
  const dispatch = useDispatch();
  const { sidebarOpen, notificationsPanelOpen } = useSelector((state) => state.theme);

  // ✅ Close notifications panel by default when OrdersPage loads
  useEffect(() => {
    dispatch(closeNotifications());
  }, []); // Empty dependency array means this runs once on mount

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      if (sidebarOpen) dispatch(closeSidebar());
      if (notificationsPanelOpen) dispatch(closeNotifications());
    }
  };

  return (
    <div 
      className={styles.ordersPage}
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
              <h1 className={styles.pageTitle}>Order List</h1>
            </div>

            <div className={styles.ordersContent}>
              <OrdersTable />
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

export default OrdersPage;
