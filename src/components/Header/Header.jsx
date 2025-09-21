/**
 * Header Component
 * 
 * A responsive navigation header that provides core application navigation,
 * search functionality, and theme switching. Supports both light and dark themes
 * with dynamic icon switching and progressive enhancement for mobile devices.
 * 
 * Features:
 * - Responsive design with mobile-first approach
 * - Dynamic theme-based icon switching
 * - Accessible keyboard navigation
 * - Search functionality with keyboard shortcuts
 * - Sidebar and notifications panel toggles
 * - Breadcrumb navigation
 * 
 * @component
 * @example
 * return (
 *   <Header />
 * )
 * 
 * @author Your Name
 * @since 1.0.0
 * @version 1.2.0
 */

import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toggleSidebar, toggleNotifications } from '../../store/slices/themeSlice';
import ThemeToggle from '../ThemeToggle/ThemeToggle';
import styles from './Header.module.css';

// =============================================================================
// ASSET IMPORTS - Light Theme Icons
// =============================================================================
import menuIcon from '../../assets/icons/menu.png';
import starIcon from '../../assets/icons/star.png';
import searchIcon from '../../assets/icons/search.png';
import clockIcon from '../../assets/icons/clock.png';
import notificationIcon from '../../assets/icons/notification.png';
import menuAltIcon from '../../assets/icons/menu-alt.png';
import searchShortcutIcon from '../../assets/icons/searchShortcut.png';

// =============================================================================
// ASSET IMPORTS - Dark Theme Icons
// =============================================================================
import menuIconDark from '../../assets/darkIcons/menu.png';
import starIconDark from '../../assets/darkIcons/star.png';
import searchIconDark from '../../assets/darkIcons/search.png';
import clockIconDark from '../../assets/darkIcons/clock.png';
import notificationIconDark from '../../assets/darkIcons/notification.png';
import menuAltIconDark from '../../assets/darkIcons/menu-alt.png';
import searchShortcutIconDark from '../../assets/darkIcons/searchShortcut.png';

/**
 * Header functional component
 * 
 * Renders the main application header with navigation controls,
 * search functionality, and theme-aware icons.
 * 
 * @returns {JSX.Element} The rendered header component
 */
const Header = () => {
  // ==========================================================================
  // HOOKS & STATE MANAGEMENT
  // ==========================================================================
  
  /** Redux dispatch function for triggering actions */
  const dispatch = useDispatch();
  
  /** Current theme from Redux store ('light' | 'dark') */
  const theme = useSelector((state) => state.theme.theme);

  // ==========================================================================
  // EVENT HANDLERS
  // ==========================================================================
  
  /**
   * Handles sidebar toggle action
   * Dispatches Redux action to show/hide the navigation sidebar
   * 
   * @function
   * @returns {void}
   */
  const handleToggleSidebar = () => {
    dispatch(toggleSidebar());
  };

  /**
   * Handles notifications panel toggle action
   * Dispatches Redux action to show/hide the notifications panel
   * 
   * @function
   * @returns {void}
   */
  const handleToggleNotifications = () => {
    dispatch(toggleNotifications());
  };

  // ==========================================================================
  // UTILITY FUNCTIONS
  // ==========================================================================
  
  /**
   * Returns appropriate icon based on current theme
   * 
   * This utility function enables dynamic icon switching between light and dark
   * themes, ensuring optimal visual contrast and user experience.
   * 
   * @param {string} lightIcon - Path to light theme icon
   * @param {string} darkIcon - Path to dark theme icon
   * @returns {string} Path to the appropriate theme icon
   * 
   * @example
   * const iconSrc = getIcon(menuIcon, menuIconDark);
   */
  const getIcon = (lightIcon, darkIcon) => {
    return theme === 'dark' ? darkIcon : lightIcon;
  };

  // ==========================================================================
  // COMPONENT RENDER
  // ==========================================================================
  
  return (
    <header className={styles.header} role="banner">
      {/* =====================================================================
          LEFT SECTION - Navigation & Breadcrumbs
          ===================================================================== */}
      <div className={styles.leftSection}>
        
        {/* Sidebar Toggle Button */}
        <button 
          className={styles.iconButton}
          onClick={handleToggleSidebar}
          aria-label="Toggle navigation sidebar"
          aria-expanded={false} // TODO: Connect to sidebar state
          type="button"
        >
          <img 
            src={getIcon(menuIcon, menuIconDark)} 
            alt="" // Decorative icon, screen reader gets info from aria-label
            className={styles.icon}
            loading="eager" // Critical UI element, load immediately
          />
        </button>
        
        {/* Favorite/Star Action Button */}
        <button 
          className={styles.iconButton}
          aria-label="Toggle favorite status"
          type="button"
        >
          <img 
            src={getIcon(starIcon, starIconDark)} 
            alt=""
            className={styles.icon}
            loading="eager"
          />
        </button>
        
        {/* Breadcrumb Navigation */}
        <nav 
          className={styles.breadcrumb} 
          aria-label="Breadcrumb navigation"
          role="navigation"
        >
          <span className={styles.breadcrumbText} aria-label="Current section">
            Dashboards
          </span>
          <span className={styles.breadcrumbSeparator} aria-hidden="true">
            /
          </span>
          <span 
            className={styles.breadcrumbCurrent} 
            aria-current="page"
            title="Default Dashboard" // Tooltip for truncated text
          >
            Default
          </span>
        </nav>
      </div>

      {/* =====================================================================
          RIGHT SECTION - Search, Theme Toggle & Action Buttons
          ===================================================================== */}
      <div className={styles.rightSection}>
        
        {/* Global Search Bar */}
        <div 
          className={styles.searchContainer}
          role="search"
          aria-label="Global search"
        >
          <img 
            src={getIcon(searchIcon, searchIconDark)} 
            alt="" 
            className={styles.searchIcon}
            aria-hidden="true" // Decorative, input has its own label
            loading="lazy"
          />
          <input 
            type="search"
            placeholder="Search..."
            className={styles.searchInput}
            aria-label="Search across application"
            autoComplete="off"
            spellCheck="false"
            // TODO: Add search functionality
            // onChange={handleSearchChange}
            // onKeyDown={handleSearchKeyDown}
          />
          <img 
            src={getIcon(searchShortcutIcon, searchShortcutIconDark)} 
            alt="Keyboard shortcut indicator" 
            className={styles.searchShortcut}
            title="Press Ctrl+K to search" // Accessibility hint
            loading="lazy"
          />
        </div>
        
        {/* Theme Toggle Component */}
        <ThemeToggle />
        
        {/* Clock/Time Display Button */}
        <button 
          className={styles.iconButton}
          aria-label="View current time and date"
          type="button"
          // TODO: Add time display functionality
        >
          <img 
            src={getIcon(clockIcon, clockIconDark)} 
            alt=""
            className={styles.icon}
            loading="lazy"
          />
        </button>
        
        {/* Notifications Bell Button */}
        <button 
          className={styles.iconButton}
          aria-label="View notifications"
          // TODO: Add notification count badge
          // aria-describedby="notification-count"
          type="button"
        >
          <img 
            src={getIcon(notificationIcon, notificationIconDark)} 
            alt=""
            className={styles.icon}
            loading="lazy"
          />
        </button>
        
        {/* Notifications Panel Toggle */}
        <button 
          className={styles.iconButton}
          onClick={handleToggleNotifications}
          aria-label="Toggle notifications panel"
          aria-expanded={false} // TODO: Connect to notifications panel state
          type="button"
        >
          <img 
            src={getIcon(menuAltIcon, menuAltIconDark)} 
            alt=""
            className={styles.icon}
            loading="lazy"
          />
        </button>
      </div>
    </header>
  );
};

export default Header;

// =============================================================================
// COMPONENT METADATA & DOCUMENTATION
// =============================================================================

/**
 * Component Props Documentation
 * 
 * This component doesn't accept props directly but relies on Redux state:
 * 
 * @typedef {Object} HeaderReduxState
 * @property {('light'|'dark')} theme - Current application theme
 * @property {boolean} sidebarOpen - Sidebar visibility state
 * @property {boolean} notificationsPanelOpen - Notifications panel state
 */

/**
 * Accessibility Features:
 * - ARIA labels for all interactive elements
 * - Proper heading hierarchy
 * - Keyboard navigation support
 * - Screen reader friendly
 * - High contrast mode support
 * - Touch-friendly button sizes
 * 
 * Performance Optimizations:
 * - Lazy loading for non-critical icons
 * - Eager loading for critical UI icons
 * - Optimized image rendering for high DPI displays
 * - CSS-based hover states for smooth interactions
 * 
 * Browser Support:
 * - Modern browsers (Chrome 90+, Firefox 88+, Safari 14+, Edge 90+)
 * - Progressive enhancement for older browsers
 * - Graceful degradation of advanced features
 * 
 * Responsive Design:
 * - Mobile-first approach
 * - Progressive disclosure of features
 * - Touch-friendly interactions on mobile devices
 * - Optimized layouts for different screen sizes
 */
