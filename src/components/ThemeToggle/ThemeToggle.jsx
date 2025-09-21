/**
 * ThemeToggle Component
 * 
 * A sophisticated theme switching button that toggles between light and dark modes
 * with smooth animations and visual feedback. Features contextual icon switching
 * (moon for dark mode, sun for light mode) with accessibility support and
 * responsive design optimizations.
 * 
 * Features:
 * - Smooth theme switching with Redux state management
 * - Contextual SVG icons (moon/sun) with rotation animations
 * - Accessibility compliance with ARIA labels and tooltips
 * - Responsive sizing for mobile devices
 * - Smooth hover and press animations with scaling effects
 * - High contrast and reduced motion support
 * - Theme-aware styling for both light and dark modes
 * - Hardware-accelerated animations for smooth performance
 * 
 * Design Specifications:
 * - Desktop: 32px × 32px button size
 * - Mobile: 28px × 28px (tablet), 26px × 26px (mobile)
 * - Hover effects: 5% scale up with rotation
 * - Press effects: 5% scale down with background change
 * - Icon opacity: 0.7 for subtle appearance
 * 
 * @component
 * @example
 * return (
 *   <ThemeToggle />
 * )
 * 
 * @author Your Name
 * @since 1.0.0
 * @version 1.5.0
 */

// src/components/ThemeToggle/ThemeToggle.jsx
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toggleTheme } from '../../store/slices/themeSlice';
import styles from './ThemeToggle.module.css';

/**
 * ThemeToggle functional component
 * 
 * Renders a theme toggle button that switches between light and dark modes
 * with appropriate visual indicators and smooth animations.
 * 
 * @returns {JSX.Element} The rendered theme toggle button
 */
const ThemeToggle = () => {
  // ===========================================================================
  // HOOKS & STATE MANAGEMENT
  // ===========================================================================
  
  /** 
   * Current theme state from Redux store
   * @type {('light'|'dark')} theme - Current application theme
   */
  const theme = useSelector((state) => state.theme.theme);
  
  /** Redux dispatch function for theme actions */
  const dispatch = useDispatch();

  // ===========================================================================
  // EVENT HANDLERS
  // ===========================================================================
  
  /**
   * Handles theme toggle action
   * 
   * Dispatches Redux action to switch between light and dark themes.
   * Updates global theme state and applies theme-specific styling.
   */
  const handleToggle = () => {
    dispatch(toggleTheme());
  };

  // ===========================================================================
  // COMPONENT RENDER - Theme Toggle Button
  // ===========================================================================

  return (
    <button
      onClick={handleToggle}
      className={styles.themeToggle}
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
      title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
    >
      {/* =====================================================================
          CONDITIONAL ICON RENDERING - Theme-Specific SVG Icons
          ===================================================================== */}
      
      {theme === 'light' ? (
        /* Light Mode: Show Moon Icon (Indicates "Switch to Dark Mode") */
        // 🌙 Moon icon for switching to dark mode
        <svg 
          width="20" 
          height="20" 
          viewBox="0 0 20 20" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
          role="img"
          aria-hidden="true"
        >
          <path 
            d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" 
            fill="currentColor"
            fillOpacity="0.7"  /* Subtle opacity for elegant appearance */
          />
        </svg>
      ) : (
        /* Dark Mode: Show Sun Icon (Indicates "Switch to Light Mode") */
        // ☀️ Sun icon for switching to light mode
        <svg 
          width="20" 
          height="20" 
          viewBox="0 0 20 20" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
          role="img"
          aria-hidden="true"
        >
          <g 
            fill="currentColor" 
            fillOpacity="0.7"  /* Consistent opacity with moon icon */
          >
            {/* Sun center circle and radiating rays */}
            <path d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"/>
          </g>
        </svg>
      )}
    </button>
  );
};

export default ThemeToggle;
