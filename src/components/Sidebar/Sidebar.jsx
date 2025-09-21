/**
 * Sidebar Component
 * 
 * A comprehensive navigation sidebar with expandable menu sections, theme-aware
 * icon switching, and intelligent responsive behavior. Features hierarchical
 * navigation with collapsible sections, active state management, and seamless
 * mobile overlay functionality.
 * 
 * Features:
 * - Hierarchical navigation with expandable sections
 * - Theme-aware dynamic icon switching (light/dark)
 * - Responsive design: fixed sidebar on desktop, overlay on mobile
 * - Active state management with visual indicators
 * - Smooth expand/collapse animations with rotation effects
 * - React Router integration for navigation
 * - Mobile-only close button with backdrop overlay
 * - Expandable submenu system (User Profile)
 * - Intelligent mobile navigation with auto-close
 * 
 * Design Specifications:
 * - Desktop: 212px width, fixed position
 * - Mobile: 280px overlay with backdrop blur
 * - Breakpoint: 768px for mobile transformation
 * - Logo branding: "ByeWind" with icon
 * - Three main sections: Favorites, Dashboards, Pages
 * 
 * @component
 * @example
 * return (
 *   <Sidebar />
 * )
 * 
 * @author Your Name
 * @since 1.0.0
 * @version 3.0.0
 */

// src/components/Sidebar/Sidebar.jsx - UPDATED FOR DARK MODE ICONS
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toggleSidebar } from '../../store/slices/themeSlice';
import styles from './Sidebar.module.css';

// =============================================================================
// ASSET IMPORTS - Light Theme Icons
// =============================================================================

// Light theme icons
import logoIcon from '../../assets/icons/logo.png';
import overviewIcon from '../../assets/icons/overview.png';
import projectsIcon from '../../assets/icons/projects.png';
import defaultIcon from '../../assets/icons/default.png';
import ecommerceIcon from '../../assets/icons/ecommerce.png';
import coursesIcon from '../../assets/icons/courses.png';
import userProfileIcon from '../../assets/icons/user-profile.png';
import accountIcon from '../../assets/icons/account.png';
import corporateIcon from '../../assets/icons/corporate.png';
import blogIcon from '../../assets/icons/blog.png';
import socialIcon from '../../assets/icons/social.png';

// =============================================================================
// ASSET IMPORTS - Dark Theme Icons
// =============================================================================

// ✅ Dark theme icons
import logoIconDark from '../../assets/darkIcons/logo.png';
import overviewIconDark from '../../assets/darkIcons/overview.png';
import projectsIconDark from '../../assets/darkIcons/projects.png';
import defaultIconDark from '../../assets/darkIcons/default.png';
import ecommerceIconDark from '../../assets/darkIcons/ecommerce.png';
import coursesIconDark from '../../assets/darkIcons/courses.png';
import userProfileIconDark from '../../assets/darkIcons/user-profile.png';
import accountIconDark from '../../assets/darkIcons/account.png';
import corporateIconDark from '../../assets/darkIcons/corporate.png';
import blogIconDark from '../../assets/darkIcons/blog.png';
import socialIconDark from '../../assets/darkIcons/social.png';

/**
 * Sidebar functional component
 * 
 * Renders the main navigation sidebar with expandable menu sections,
 * theme support, and responsive behavior for mobile devices.
 * 
 * @returns {JSX.Element|null} The rendered sidebar component or null if closed
 */
const Sidebar = () => {
  // ===========================================================================
  // HOOKS & STATE MANAGEMENT
  // ===========================================================================
  
  /** Redux dispatch function for state management */
  const dispatch = useDispatch();
  
  /** 
   * Sidebar and theme state from Redux store
   * @type {Object}
   * @property {boolean} sidebarOpen - Sidebar visibility state
   * @property {('light'|'dark')} theme - Current application theme
   */
  const { sidebarOpen, theme } = useSelector((state) => state.theme); // ✅ Get theme from Redux
  
  /** React Router navigation hook */
  const navigate = useNavigate();

  /**
   * Expandable menu items state management
   * 
   * Tracks which menu sections are expanded or collapsed.
   * User Profile is expanded by default for better UX.
   * 
   * @type {Object}
   * @property {boolean} ecommerce - eCommerce section expansion state
   * @property {boolean} projects - Projects section expansion state
   * @property {boolean} onlineCourses - Online Courses section expansion state
   * @property {boolean} userProfile - User Profile section expansion state (default: true)
   * @property {boolean} account - Account section expansion state
   * @property {boolean} corporate - Corporate section expansion state
   * @property {boolean} blog - Blog section expansion state
   * @property {boolean} social - Social section expansion state
   */
  const [expandedItems, setExpandedItems] = useState({
    ecommerce: false,
    projects: false,
    onlineCourses: false,
    userProfile: true,    // Default expanded for better UX
    account: false,
    corporate: false,
    blog: false,
    social: false
  });

  // ===========================================================================
  // EVENT HANDLERS - Menu Interactions and Navigation
  // ===========================================================================

  /**
   * Toggles the expansion state of a menu item
   * 
   * Updates the expanded state for collapsible menu sections,
   * enabling smooth expand/collapse animations.
   * 
   * @param {string} item - The menu item key to toggle
   */
  const toggleItem = (item) => {
    setExpandedItems(prev => ({
      ...prev,
      [item]: !prev[item]
    }));
  };

  /**
   * Handles sidebar close action
   * 
   * Dispatches Redux action to hide the sidebar.
   * Used by mobile close button.
   */
  const handleCloseSidebar = () => {
    dispatch(toggleSidebar());
  };

  /**
   * Handles navigation to different routes
   * 
   * Navigates to the specified path using React Router and automatically
   * closes the sidebar on mobile devices for better UX.
   * 
   * @param {string} path - The route path to navigate to
   */
  // ✅ Navigation handlers
  const handleNavigation = (path) => {
    navigate(path);
    // Auto-close sidebar on mobile after navigation for better UX
    if (window.innerWidth <= 768) {
      dispatch(toggleSidebar());
    }
  };

  // ===========================================================================
  // UTILITY FUNCTIONS
  // ===========================================================================

  /**
   * Theme-aware icon selector
   * 
   * Returns the appropriate icon based on current theme setting,
   * ensuring optimal visual contrast and consistency.
   * 
   * @param {string} lightIcon - Path to light theme icon
   * @param {string} darkIcon - Path to dark theme icon
   * @returns {string} Path to the appropriate theme icon
   */
  // ✅ Helper function to get correct icon based on theme
  const getIcon = (lightIcon, darkIcon) => {
    return theme === 'dark' ? darkIcon : lightIcon;
  };

  // ===========================================================================
  // EARLY RETURN - Sidebar Visibility Check
  // ===========================================================================

  // Render nothing if sidebar is closed
  if (!sidebarOpen) return null;

  // ===========================================================================
  // COMPONENT RENDER - Sidebar Layout and Navigation Structure
  // ===========================================================================

  return (
    <div className={styles.sidebarWrapper}>
      <div className={styles.sidebar}>
        
        {/* =====================================================================
            MOBILE HEADER - Close Button (Mobile Only)
            ===================================================================== */}
        
        {/* ✅ Close Button - Only visible on mobile */}
        <div className={styles.mobileHeader}>
          <button 
            className={styles.closeButton}
            onClick={handleCloseSidebar}
            aria-label="Close sidebar"
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M15 5L5 15M5 5L15 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>

        {/* =====================================================================
            LOGO SECTION - Brand Identity
            ===================================================================== */}

        {/* Logo Section */}
        <div className={styles.logoSection}>
          <div className={styles.logo}>
            <img 
              src={getIcon(logoIcon, logoIconDark)} 
              alt="ByeWind Logo" 
              className={styles.logoIcon} 
            />
            <span className={styles.logoText}>ByeWind</span>
          </div>
        </div>

        {/* =====================================================================
            FAVORITES SECTION - Quick Access Items
            ===================================================================== */}

        {/* Favorites Section */}
        <div className={styles.menuSection}>
          <div className={styles.sectionHeader}>
            <span className={styles.sectionTitle}>Favorites</span>
            <span className={styles.sectionBadge}>Recently</span>
          </div>
          <nav className={styles.menuList}>
            {/* Overview - Main Dashboard */}
            <div 
              className={styles.menuItem}
              onClick={() => handleNavigation('/dashboard')}
            >
              <img 
                src={getIcon(overviewIcon, overviewIconDark)} 
                alt="Overview" 
                className={styles.menuIcon} 
              />
              <span className={styles.menuText}>Overview</span>
            </div>
            
            {/* Orders List - Order Management */}
            {/* ✅ Orders List with navigation */}
            <div 
              className={styles.menuItem}
              onClick={() => handleNavigation('/orders')}
            >
              <img 
                src={getIcon(overviewIcon, overviewIconDark)} 
                alt="Orders List" 
                className={styles.menuIcon} 
              />
              <span className={styles.menuText}>Orders List</span>
            </div>
          </nav>
        </div>

        {/* =====================================================================
            DASHBOARDS SECTION - Main Dashboard Categories
            ===================================================================== */}

        {/* Dashboards Section */}
        <div className={styles.menuSection}>
          <div className={styles.sectionHeader}>
            <span className={styles.sectionTitleNoHover}>Dashboards</span>
          </div>
          <nav className={styles.menuList}>
            
            {/* Default Dashboard - Currently Active */}
            {/* Default - No arrow, active */}
            <div 
              className={`${styles.menuItem} ${styles.active}`}
              onClick={() => handleNavigation('/dashboard')}
            >
              <img 
                src={getIcon(defaultIcon, defaultIconDark)} 
                alt="Default" 
                className={styles.menuIcon} 
              />
              <span className={styles.menuText}>Default</span>
            </div>
            
            {/* eCommerce Dashboard - Expandable Section */}
            {/* eCommerce - With arrow */}
            <div className={styles.menuItemExpandable}>
              <div 
                className={styles.menuItemHeader}
                onClick={() => toggleItem('ecommerce')}
              >
                <span className={`${styles.expandIcon} ${expandedItems.ecommerce ? styles.expanded : ''}`}>
                  &gt;
                </span>
                <img 
                  src={getIcon(ecommerceIcon, ecommerceIconDark)} 
                  alt="eCommerce" 
                  className={styles.menuIcon} 
                />
                <span className={styles.menuText}>eCommerce</span>
              </div>
            </div>
            
            {/* Projects Dashboard - Expandable Section */}
            {/* Projects - With arrow */}
            <div className={styles.menuItemExpandable}>
              <div 
                className={styles.menuItemHeader}
                onClick={() => toggleItem('projects')}
              >
                <span className={`${styles.expandIcon} ${expandedItems.projects ? styles.expanded : ''}`}>
                  &gt;
                </span>
                <img 
                  src={getIcon(projectsIcon, projectsIconDark)} 
                  alt="Projects" 
                  className={styles.menuIcon} 
                />
                <span className={styles.menuText}>Projects</span>
              </div>
            </div>
            
            {/* Online Courses Dashboard - Expandable Section */}
            {/* Online Courses - With arrow */}
            <div className={styles.menuItemExpandable}>
              <div 
                className={styles.menuItemHeader}
                onClick={() => toggleItem('onlineCourses')}
              >
                <span className={`${styles.expandIcon} ${expandedItems.onlineCourses ? styles.expanded : ''}`}>
                  &gt;
                </span>
                <img 
                  src={getIcon(coursesIcon, coursesIconDark)} 
                  alt="Online Courses" 
                  className={styles.menuIcon} 
                />
                <span className={styles.menuText}>Online Courses</span>
              </div>
            </div>
          </nav>
        </div>

        {/* =====================================================================
            PAGES SECTION - Application Pages and Modules
            ===================================================================== */}

        {/* Pages Section */}
        <div className={styles.menuSection}>
          <div className={styles.sectionHeader}>
            <span className={styles.sectionTitleNoHover}>Pages</span>
          </div>
          <nav className={styles.menuList}>
            
            {/* User Profile - Expandable with Submenu */}
            {/* User Profile - Expandable with arrow */}
            <div className={styles.menuItemExpandable}>
              <div
                className={styles.menuItemHeader}
                onClick={() => toggleItem('userProfile')}
              >
                <span className={`${styles.expandIcon} ${expandedItems.userProfile ? styles.expanded : ''}`}>
                  &gt;
                </span>
                <img 
                  src={getIcon(userProfileIcon, userProfileIconDark)} 
                  alt="User Profile" 
                  className={styles.menuIcon} 
                />
                <span className={styles.menuText}>User Profile</span>
              </div>
              
              {/* User Profile Submenu - Expanded by Default */}
              {expandedItems.userProfile && (
                <div className={styles.subMenu}>
                  <div 
                    className={styles.subMenuItem}
                    onClick={() => handleNavigation('/profile/overview')}
                  >
                    <span className={styles.menuText}>Overview</span>
                  </div>
                  <div 
                    className={styles.subMenuItem}
                    onClick={() => handleNavigation('/profile/projects')}
                  >
                    <span className={styles.menuText}>Projects</span>
                  </div>
                  <div 
                    className={styles.subMenuItem}
                    onClick={() => handleNavigation('/profile/campaigns')}
                  >
                    <span className={styles.menuText}>Campaigns</span>
                  </div>
                  <div 
                    className={styles.subMenuItem}
                    onClick={() => handleNavigation('/profile/documents')}
                  >
                    <span className={styles.menuText}>Documents</span>
                  </div>
                  <div 
                    className={styles.subMenuItem}
                    onClick={() => handleNavigation('/profile/followers')}
                  >
                    <span className={styles.menuText}>Followers</span>
                  </div>
                </div>
              )}
            </div>
            
            {/* Account Management - Expandable Section */}
            {/* Account - Expandable with arrow */}
            <div className={styles.menuItemExpandable}>
              <div
                className={styles.menuItemHeader}
                onClick={() => toggleItem('account')}
              >
                <span className={`${styles.expandIcon} ${expandedItems.account ? styles.expanded : ''}`}>
                  &gt;
                </span>
                <img 
                  src={getIcon(accountIcon, accountIconDark)} 
                  alt="Account" 
                  className={styles.menuIcon} 
                />
                <span className={styles.menuText}>Account</span>
              </div>
            </div>
            
            {/* Corporate Features - Expandable Section */}
            {/* Corporate - Expandable with arrow */}
            <div className={styles.menuItemExpandable}>
              <div 
                className={styles.menuItemHeader}
                onClick={() => toggleItem('corporate')}
              >
                <span className={`${styles.expandIcon} ${expandedItems.corporate ? styles.expanded : ''}`}>
                  &gt;
                </span>
                <img 
                  src={getIcon(corporateIcon, corporateIconDark)} 
                  alt="Corporate" 
                  className={styles.menuIcon} 
                />
                <span className={styles.menuText}>Corporate</span>
              </div>
            </div>
            
            {/* Blog Management - Expandable Section */}
            {/* Blog - Expandable with arrow */}
            <div className={styles.menuItemExpandable}>
              <div 
                className={styles.menuItemHeader}
                onClick={() => toggleItem('blog')}
              >
                <span className={`${styles.expandIcon} ${expandedItems.blog ? styles.expanded : ''}`}>
                  &gt;
                </span>
                <img 
                  src={getIcon(blogIcon, blogIconDark)} 
                  alt="Blog" 
                  className={styles.menuIcon} 
                />
                <span className={styles.menuText}>Blog</span>
              </div>
            </div>
            
            {/* Social Features - Expandable Section */}
            {/* Social - Expandable with arrow */}
            <div className={styles.menuItemExpandable}>
              <div 
                className={styles.menuItemHeader}
                onClick={() => toggleItem('social')}
              >
                <span className={`${styles.expandIcon} ${expandedItems.social ? styles.expanded : ''}`}>
                  &gt;
                </span>
                <img 
                  src={getIcon(socialIcon, socialIconDark)} 
                  alt="Social" 
                  className={styles.menuIcon} 
                />
                <span className={styles.menuText}>Social</span>
              </div>
            </div>
            
          </nav>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
