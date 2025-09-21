// NotificationsPanel.jsx
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toggleNotifications, closeSidebar } from '../../store/slices/themeSlice';
import styles from './NotificationsPanel.module.css';

// Import icons from Figma assets
import bugIcon from '../../assets/icons/bug.png';
import userIcon from '../../assets/icons/user.png';
import antennaIcon from '../../assets/icons/antenna.png';
import avatarIcon1 from '../../assets/avatars/avatar1.png';
import avatarIcon2 from '../../assets/avatars/avatar2.png';
import avatarIcon3 from '../../assets/avatars/avatar3.png';
import avatarIcon4 from '../../assets/avatars/avatar4.png';
import avatarIcon5 from '../../assets/avatars/avatar5.png';
import avatarIcon6 from '../../assets/avatars/avatar6.png';

const NotificationsPanel = () => {
  const dispatch = useDispatch();
  const { notificationsPanelOpen, sidebarOpen } = useSelector((state) => state.theme);

  const handleClosePanel = () => {
    dispatch(toggleNotifications());
  };

  // ✅ Auto-close sidebar when notifications panel opens on small screens
  useEffect(() => {
    if (notificationsPanelOpen && window.innerWidth <= 887) {
      if (sidebarOpen) {
        dispatch(closeSidebar());
      }
    }
  }, [notificationsPanelOpen, dispatch, sidebarOpen]);

  if (!notificationsPanelOpen) return null;

  const notificationsData = [
    {
      id: 1,
      type: 'bug',
      icon: bugIcon,
      title: 'You have a bug that needs...',
      time: 'Just now'
    },
    {
      id: 2,
      type: 'user',
      icon: userIcon,
      title: 'New user registered',
      time: '59 minutes ago'
    },
    {
      id: 3,
      type: 'bug',
      icon: bugIcon,
      title: 'You have a bug that needs...',
      time: '12 hours ago'
    },
    {
      id: 4,
      type: 'antenna',
      icon: antennaIcon,
      title: 'Andi Lane subscribed to you',
      time: 'Today, 11:59 AM'
    }
  ];

  const activitiesData = [
    {
      id: 1,
      avatar: avatarIcon1,
      name: '',
      title: 'You have a bug that needs...',
      time: 'Just now'
    },
    {
      id: 2,
      avatar: avatarIcon2,
      name: '',
      title: 'Released a new version',
      time: '59 minutes ago'
    },
    {
      id: 3,
      avatar: avatarIcon3,
      name: '',
      title: 'Submitted a bug',
      time: '12 hours ago'
    },
    {
      id: 4,
      avatar: avatarIcon4,
      name: '',
      title: 'Modified A data in Page X',
      time: 'Today, 11:59 AM'
    },
    {
      id: 5,
      avatar: avatarIcon5,
      name: '',
      title: 'Deleted a page in Project X',
      time: 'Feb 2, 2023'
    }
  ];

  const contactsData = [
    { id: 1, avatar: avatarIcon1, name: 'Natali Craig' },
    { id: 2, avatar: avatarIcon2, name: 'Drew Cano' },
    { id: 3, avatar: avatarIcon3, name: 'Orlando Diggs' },
    { id: 4, avatar: avatarIcon4, name: 'Andi Lane' },
    { id: 5, avatar: avatarIcon5, name: 'Kate Morrison' },
    { id: 6, avatar: avatarIcon6, name: 'Koray Okumus' }
  ];

  return (
    <div className={styles.panelWrapper}>
      <div className={styles.notificationsPanel}>
        {/* ✅ Header with close button for mobile */}
        <div className={styles.header}>
          <h2 className={styles.title}>Notifications</h2>
          <button 
            className={styles.closeButton}
            onClick={handleClosePanel}
            aria-label="Close notifications"
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M15 5L5 15M5 5L15 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>

        <div className={styles.content}>
          {/* Notifications Section */}
          <div className={styles.section}>
            {notificationsData.map((notification) => (
              <div key={notification.id} className={styles.notificationItem}>
                <div className={styles.iconContainer}>
                  <img src={notification.icon} alt="Notification" className={styles.notificationIcon} />
                </div>
                <div className={styles.notificationContent}>
                  <p className={styles.notificationTitle}>{notification.title}</p>
                  <span className={styles.notificationTime}>{notification.time}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Activities Section */}
          <div className={styles.section}>
            <h3 className={styles.sectionTitle}>Activities</h3>
            {activitiesData.map((activity) => (
              <div key={activity.id} className={styles.activityItem}>
                <div className={styles.avatarContainer}>
                  <img src={activity.avatar} alt="User" className={styles.avatar} />
                </div>
                <div className={styles.activityContent}>
                  <p className={styles.activityTitle}>{activity.title}</p>
                  <span className={styles.activityTime}>{activity.time}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Contacts Section */}
          <div className={styles.section}>
            <h3 className={styles.sectionTitle}>Contacts</h3>
            {contactsData.map((contact) => (
              <div key={contact.id} className={styles.contactItem}>
                <div className={styles.avatarContainer}>
                  <img src={contact.avatar} alt={contact.name} className={styles.avatar} />
                </div>
                <div className={styles.contactContent}>
                  <p className={styles.contactName}>{contact.name}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotificationsPanel;
