// src/components/Header/Header.jsx - UPDATED FOR DARK MODE ICONS
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toggleSidebar, toggleNotifications } from '../../store/slices/themeSlice';
import ThemeToggle from '../ThemeToggle/ThemeToggle';
import styles from './Header.module.css';

// Import light theme icons
import menuIcon from '../../assets/icons/menu.png';
import starIcon from '../../assets/icons/star.png';
import searchIcon from '../../assets/icons/search.png';
import clockIcon from '../../assets/icons/clock.png';
import notificationIcon from '../../assets/icons/notification.png';
import menuAltIcon from '../../assets/icons/menu-alt.png';
import searchShortcutIcon from '../../assets/icons/searchShortcut.png';

// ✅ Import dark theme icons
import menuIconDark from '../../assets/darkIcons/menu.png';
import starIconDark from '../../assets/darkIcons/star.png';
import searchIconDark from '../../assets/darkIcons/search.png';
import clockIconDark from '../../assets/darkIcons/clock.png';
import notificationIconDark from '../../assets/darkIcons/notification.png';
import menuAltIconDark from '../../assets/darkIcons/menu-alt.png';
import searchShortcutIconDark from '../../assets/darkIcons/searchShortcut.png';

const Header = () => {
  const dispatch = useDispatch();
  const theme = useSelector((state) => state.theme.theme); // ✅ Get current theme

  const handleToggleSidebar = () => {
    dispatch(toggleSidebar());
  };

  const handleToggleNotifications = () => {
    dispatch(toggleNotifications());
  };

  // ✅ Helper function to get correct icon based on theme
  const getIcon = (lightIcon, darkIcon) => {
    return theme === 'dark' ? darkIcon : lightIcon;
  };

  return (
    <header className={styles.header}>
      <div className={styles.leftSection}>
        {/* Sidebar Toggle - Menu Icon */}
        <button 
          className={styles.iconButton}
          onClick={handleToggleSidebar}
          aria-label="Toggle sidebar"
        >
          <img 
            src={getIcon(menuIcon, menuIconDark)} 
            alt="Menu" 
            className={styles.icon} 
          />
        </button>
        
        {/* Star Icon */}
        <button className={styles.iconButton}>
          <img 
            src={getIcon(starIcon, starIconDark)} 
            alt="Star" 
            className={styles.icon} 
          />
        </button>
        
        {/* Breadcrumb Navigation */}
        <div className={styles.breadcrumb}>
          <span className={styles.breadcrumbText}>Dashboards</span>
          <span className={styles.breadcrumbSeparator}>/</span>
          <span className={styles.breadcrumbCurrent}>Default</span>
        </div>
      </div>

      <div className={styles.rightSection}>
        {/* Search Bar with Icon */}
        <div className={styles.searchContainer}>
          <img 
            src={getIcon(searchIcon, searchIconDark)} 
            alt="Search" 
            className={styles.searchIcon} 
          />
          <input 
            type="text" 
            placeholder="Search"
            className={styles.searchInput}
          />
          <img 
            src={getIcon(searchShortcutIcon, searchShortcutIconDark)} 
            alt="Search shortcut" 
            className={styles.searchShortcut} 
          />
        </div>
        
        {/* Theme Toggle */}
        <ThemeToggle />
        
        {/* Clock */}
        <button className={styles.iconButton}>
          <img 
            src={getIcon(clockIcon, clockIconDark)} 
            alt="Clock" 
            className={styles.icon} 
          />
        </button>
        
        {/* Notification Bell */}
        <button className={styles.iconButton}>
          <img 
            src={getIcon(notificationIcon, notificationIconDark)} 
            alt="Notifications" 
            className={styles.icon} 
          />
        </button>
        
        {/* Notifications Panel Toggle */}
        <button 
          className={styles.iconButton}
          onClick={handleToggleNotifications}
          aria-label="Toggle notifications panel"
        >
          <img 
            src={getIcon(menuAltIcon, menuAltIconDark)} 
            alt="Toggle panel" 
            className={styles.icon} 
          />
        </button>
      </div>
    </header>
  );
};

export default Header;
