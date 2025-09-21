// src/components/Sidebar/Sidebar.jsx - UPDATED FOR DARK MODE ICONS
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toggleSidebar } from '../../store/slices/themeSlice';
import styles from './Sidebar.module.css';

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

const Sidebar = () => {
  const dispatch = useDispatch();
  const { sidebarOpen, theme } = useSelector((state) => state.theme); // ✅ Get theme from Redux
  const navigate = useNavigate();

  const [expandedItems, setExpandedItems] = useState({
    ecommerce: false,
    projects: false,
    onlineCourses: false,
    userProfile: true,
    account: false,
    corporate: false,
    blog: false,
    social: false
  });

  const toggleItem = (item) => {
    setExpandedItems(prev => ({
      ...prev,
      [item]: !prev[item]
    }));
  };

  const handleCloseSidebar = () => {
    dispatch(toggleSidebar());
  };

  // ✅ Navigation handlers
  const handleNavigation = (path) => {
    navigate(path);
    // Close sidebar on mobile after navigation
    if (window.innerWidth <= 768) {
      dispatch(toggleSidebar());
    }
  };

  // ✅ Helper function to get correct icon based on theme
  const getIcon = (lightIcon, darkIcon) => {
    return theme === 'dark' ? darkIcon : lightIcon;
  };

  if (!sidebarOpen) return null;

  return (
    <div className={styles.sidebarWrapper}>
      <div className={styles.sidebar}>
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

        {/* Logo Section */}
        <div className={styles.logoSection}>
          <div className={styles.logo}>
            <img 
              src={getIcon(logoIcon, logoIconDark)} 
              alt="Logo" 
              className={styles.logoIcon} 
            />
            <span className={styles.logoText}>ByeWind</span>
          </div>
        </div>

        {/* Favorites Section */}
        <div className={styles.menuSection}>
          <div className={styles.sectionHeader}>
            <span className={styles.sectionTitle}>Favorites</span>
            <span className={styles.sectionBadge}>Recently</span>
          </div>
          <nav className={styles.menuList}>
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

        {/* Dashboards Section */}
        <div className={styles.menuSection}>
          <div className={styles.sectionHeader}>
            <span className={styles.sectionTitleNoHover}>Dashboards</span>
          </div>
          <nav className={styles.menuList}>
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

        {/* Pages Section */}
        <div className={styles.menuSection}>
          <div className={styles.sectionHeader}>
            <span className={styles.sectionTitleNoHover}>Pages</span>
          </div>
          <nav className={styles.menuList}>
            
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
