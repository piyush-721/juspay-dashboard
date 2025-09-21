/**
 * Theme Slice - Redux State Management
 * 
 * A sophisticated Redux Toolkit slice managing application theme and UI panel states
 * with advanced features including localStorage persistence, system theme detection,
 * responsive behavior, and DOM synchronization for seamless theme switching.
 * 
 * Features:
 * - Intelligent theme detection (localStorage → system preference → default)
 * - Persistent theme storage with localStorage integration
 * - Automatic DOM attribute synchronization for CSS theming
 * - Responsive panel state management based on screen size
 * - Mobile-first UI state initialization
 * - Server-side rendering (SSR) compatibility with window checks
 * - Comprehensive panel control actions for sidebar and notifications
 * - Dynamic responsive behavior with resize event handling
 * 
 * State Management:
 * - Theme: 'light' | 'dark' with system preference detection
 * - Sidebar: Open/closed state with responsive behavior
 * - Notifications: Open/closed state with responsive behavior
 * - Responsive: Automatic state adjustment based on screen size
 * 
 * Persistence Strategy:
 * - Theme preferences saved to localStorage
 * - DOM data-theme attribute updated automatically
 * - System color-scheme preference detection
 * - Graceful fallbacks for SSR environments
 * 
 * Responsive Behavior:
 * - Desktop (>1024px): Both panels open by default
 * - Mobile (≤1024px): Both panels closed by default
 * - Dynamic adjustment on window resize events
 * 
 * @slice
 * @namespace themeSlice
 * @example
 * // Usage in components
 * const { theme, sidebarOpen, notificationsPanelOpen } = useSelector(state => state.theme);
 * dispatch(toggleTheme());
 * dispatch(toggleSidebar());
 * 
 * @author Your Name
 * @since 1.0.0
 * @version 3.2.0
 */

// src/store/slices/themeSlice.js
import { createSlice } from '@reduxjs/toolkit';

// =============================================================================
// INITIALIZATION FUNCTIONS - Smart State Detection
// =============================================================================

/**
 * Intelligent theme initialization with preference cascade
 * 
 * Implements a sophisticated theme detection system that checks multiple
 * sources in priority order to determine the initial theme state:
 * 1. localStorage saved theme (user's explicit choice)
 * 2. System color-scheme preference (OS/browser setting)
 * 3. Default 'light' theme (fallback)
 * 
 * Includes SSR compatibility checks to prevent hydration mismatches.
 * 
 * @function
 * @returns {('light'|'dark')} The determined initial theme
 */
// ✅ Get theme from localStorage with system preference fallback
const getInitialTheme = () => {
  // SSR compatibility check
  if (typeof window !== 'undefined') {
    // Priority 1: Check for explicitly saved user preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme && (savedTheme === 'light' || savedTheme === 'dark')) {
      return savedTheme;
    }
    
    // Priority 2: Detect system color-scheme preference
    // Uses CSS media query to check OS/browser dark mode setting
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }
  
  // Priority 3: SSR fallback to light theme
  return 'light';
};

/**
 * Responsive UI state initialization based on screen size
 * 
 * Determines initial panel states based on device screen size to provide
 * optimal user experience across different form factors:
 * - Desktop: Both panels open for full dashboard experience
 * - Mobile: Both panels closed to maximize content area
 * 
 * Critical breakpoint: 1024px (tablet landscape boundary)
 * 
 * @function
 * @returns {Object} Initial UI state object with panel configurations
 * @property {boolean} sidebarOpen - Initial sidebar visibility state
 * @property {boolean} notificationsPanelOpen - Initial notifications panel state
 */
// ✅ Responsive initial state
const getInitialUIState = () => {
  // Determine if current viewport is mobile-sized
  const isMobile = typeof window !== 'undefined' && window.innerWidth <= 1024;
  
  return {
    sidebarOpen: !isMobile,           // Desktop: open, Mobile: closed
    notificationsPanelOpen: !isMobile, // Desktop: open, Mobile: closed
  };
};

// =============================================================================
// INITIAL STATE CONFIGURATION
// =============================================================================

/**
 * Redux slice initial state with smart defaults
 * 
 * Combines intelligent theme detection with responsive UI state
 * to provide optimal initial experience across all device types.
 */
const initialState = {
  // Theme state with intelligent detection
  // ✅ Theme state with system preference detection
  theme: getInitialTheme(),
  
  // UI panel states with responsive behavior
  // ✅ Responsive UI state
  ...getInitialUIState(),
};

// =============================================================================
// REDUX SLICE DEFINITION - Actions and Reducers
// =============================================================================

/**
 * Theme slice with comprehensive state management
 * 
 * Implements all theme and UI panel actions with advanced features
 * including persistence, DOM synchronization, and responsive behavior.
 */
const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    
    // =========================================================================
    // THEME MANAGEMENT ACTIONS - Persistent Theme Control
    // =========================================================================
    
    /**
     * Toggles between light and dark themes with persistence
     * 
     * Switches theme state, saves to localStorage for persistence,
     * and updates DOM data-theme attribute for immediate CSS application.
     * Includes SSR safety checks to prevent server-side errors.
     * 
     * @reducer
     * @param {Object} state - Current Redux state
     */
    // ✅ Enhanced theme actions with localStorage and DOM updates
    toggleTheme: (state) => {
      // Toggle theme state
      state.theme = state.theme === 'light' ? 'dark' : 'light';
      
      // Browser environment checks for SSR compatibility
      if (typeof window !== 'undefined') {
        // Persist theme preference to localStorage
        localStorage.setItem('theme', state.theme);
        
        // Update DOM data-theme attribute for immediate CSS theme application
        document.documentElement.setAttribute('data-theme', state.theme);
      }
    },
    
    /**
     * Sets specific theme with persistence and DOM sync
     * 
     * Allows direct theme setting (useful for theme selection UI),
     * with the same persistence and DOM synchronization as toggle.
     * 
     * @reducer
     * @param {Object} state - Current Redux state
     * @param {Object} action - Action with theme payload ('light' | 'dark')
     */
    setTheme: (state, action) => {
      // Set specific theme from action payload
      state.theme = action.payload;
      
      // Browser environment checks for SSR compatibility
      if (typeof window !== 'undefined') {
        // Persist theme preference to localStorage
        localStorage.setItem('theme', action.payload);
        
        // Update DOM data-theme attribute for immediate CSS application
        document.documentElement.setAttribute('data-theme', action.payload);
      }
    },
    
    // =========================================================================
    // SIDEBAR MANAGEMENT ACTIONS - Navigation Panel Control
    // =========================================================================
    
    /**
     * Toggles sidebar open/closed state
     * 
     * Simple state toggle for sidebar visibility, commonly used
     * by hamburger menu buttons and navigation controls.
     * 
     * @reducer
     * @param {Object} state - Current Redux state
     */
    // UI actions (unchanged)
    toggleSidebar: (state) => {
      state.sidebarOpen = !state.sidebarOpen;
    },
    
    /**
     * Explicitly closes the sidebar
     * 
     * Used for backdrop clicks, navigation actions, and
     * programmatic sidebar closure on mobile devices.
     * 
     * @reducer
     * @param {Object} state - Current Redux state
     */
    closeSidebar: (state) => {
      state.sidebarOpen = false;
    },
    
    /**
     * Explicitly opens the sidebar
     * 
     * Used for programmatic sidebar opening and
     * ensuring sidebar visibility when needed.
     * 
     * @reducer
     * @param {Object} state - Current Redux state
     */
    openSidebar: (state) => {
      state.sidebarOpen = true;
    },
    
    // =========================================================================
    // NOTIFICATIONS PANEL ACTIONS - Contextual Information Control
    // =========================================================================
    
    /**
     * Toggles notifications panel open/closed state
     * 
     * Controls the visibility of the notifications panel,
     * typically triggered by notification bell icons.
     * 
     * @reducer
     * @param {Object} state - Current Redux state
     */
    toggleNotifications: (state) => {
      state.notificationsPanelOpen = !state.notificationsPanelOpen;
    },
    
    /**
     * Explicitly closes the notifications panel
     * 
     * Used for backdrop clicks, navigation actions, and
     * auto-closure when switching to focused pages like OrdersPage.
     * 
     * @reducer
     * @param {Object} state - Current Redux state
     */
    closeNotifications: (state) => {
      state.notificationsPanelOpen = false;
    },
    
    /**
     * Explicitly opens the notifications panel
     * 
     * Used for programmatic notifications panel opening
     * and ensuring visibility when new notifications arrive.
     * 
     * @reducer
     * @param {Object} state - Current Redux state
     */
    openNotifications: (state) => {
      state.notificationsPanelOpen = true;
    },
    
    // =========================================================================
    // RESPONSIVE BEHAVIOR ACTION - Dynamic Layout Adjustment
    // =========================================================================
    
    /**
     * Adjusts panel states based on current screen size
     * 
     * Implements intelligent responsive behavior by checking current
     * window width and adjusting panel states accordingly:
     * - Mobile (≤1024px): Close both panels for space
     * - Desktop (>1024px): Open both panels for full experience
     * 
     * This action is typically called on window resize events
     * to maintain optimal UX across device rotations and window changes.
     * 
     * @reducer
     * @param {Object} state - Current Redux state
     */
    // ✅ Enhanced responsive action
    setResponsivePanelState: (state) => {
      // Check current screen size for responsive behavior
      const isMobile = typeof window !== 'undefined' && window.innerWidth <= 1024;
      
      if (isMobile) {
        // Mobile: Close both panels to maximize content area
        state.sidebarOpen = false;
        state.notificationsPanelOpen = false;
      } else {
        // Desktop: Open both panels for full dashboard experience
        state.sidebarOpen = true;
        state.notificationsPanelOpen = true;
      }
    },
  },
});

// =============================================================================
// ACTION CREATORS EXPORT - Public API
// =============================================================================

/**
 * Exported action creators for theme and UI management
 * 
 * These actions provide the public API for components to interact
 * with the theme slice state. Each action is automatically generated
 * by Redux Toolkit based on the reducer definitions above.
 * 
 * Theme Actions:
 * - toggleTheme: Switch between light/dark with persistence
 * - setTheme: Set specific theme with persistence
 * 
 * Sidebar Actions:
 * - toggleSidebar: Toggle sidebar visibility
 * - closeSidebar: Explicitly close sidebar
 * - openSidebar: Explicitly open sidebar
 * 
 * Notifications Actions:
 * - toggleNotifications: Toggle notifications panel
 * - closeNotifications: Explicitly close notifications
 * - openNotifications: Explicitly open notifications
 * 
 * Responsive Action:
 * - setResponsivePanelState: Adjust panels based on screen size
 */
export const {
  toggleTheme,
  setTheme,
  toggleSidebar,
  closeSidebar,
  openSidebar,
  toggleNotifications,
  closeNotifications,
  openNotifications,
  setResponsivePanelState,
} = themeSlice.actions;

/**
 * Default export of the theme slice reducer
 * 
 * This reducer handles all theme and UI state management for the application.
 * It should be included in the Redux store configuration under the 'theme' key.
 * 
 * @reducer
 * @example
 * // In store configuration
 * import themeReducer from './slices/themeSlice';
 * 
 * export const store = configureStore({
 *   reducer: {
 *     theme: themeReducer,
 *   },
 * });
 * 
 * // In components
 * const { theme, sidebarOpen } = useSelector(state => state.theme);
 * dispatch(toggleTheme());
 */
export default themeSlice.reducer;

// =============================================================================
// TYPE DEFINITIONS AND INTERFACES (for TypeScript projects)
// =============================================================================

/**
 * Type definitions for theme slice state (JSDoc format for JavaScript)
 * 
 * @typedef {Object} ThemeState
 * @property {'light'|'dark'} theme - Current application theme
 * @property {boolean} sidebarOpen - Sidebar panel visibility state
 * @property {boolean} notificationsPanelOpen - Notifications panel visibility state
 */

/**
 * Type definitions for theme actions (JSDoc format for JavaScript)
 * 
 * @typedef {Object} ThemeActions
 * @property {Function} toggleTheme - Toggle theme with persistence
 * @property {Function} setTheme - Set specific theme with persistence
 * @property {Function} toggleSidebar - Toggle sidebar visibility
 * @property {Function} closeSidebar - Close sidebar
 * @property {Function} openSidebar - Open sidebar
 * @property {Function} toggleNotifications - Toggle notifications panel
 * @property {Function} closeNotifications - Close notifications panel
 * @property {Function} openNotifications - Open notifications panel
 * @property {Function} setResponsivePanelState - Adjust panels for screen size
 */

// =============================================================================
// UTILITY FUNCTIONS (for advanced usage)
// =============================================================================

/**
 * Utility function to manually sync theme with DOM
 * 
 * Can be called externally to ensure DOM synchronization,
 * useful for SSR hydration or manual theme management.
 * 
 * @function
 * @param {'light'|'dark'} theme - Theme to sync with DOM
 * @example
 * import { syncThemeWithDOM } from './slices/themeSlice';
 * syncThemeWithDOM('dark');
 */
export const syncThemeWithDOM = (theme) => {
  if (typeof window !== 'undefined') {
    document.documentElement.setAttribute('data-theme', theme);
  }
};

/**
 * Utility function to get current system theme preference
 * 
 * Returns the user's OS/browser color-scheme preference
 * without affecting application state.
 * 
 * @function
 * @returns {'light'|'dark'} System theme preference
 * @example
 * import { getSystemTheme } from './slices/themeSlice';
 * const systemTheme = getSystemTheme();
 */
export const getSystemTheme = () => {
  if (typeof window !== 'undefined') {
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }
  return 'light';
};

/**
 * Utility function to check if current viewport is mobile
 * 
 * Uses the same 1024px breakpoint as the responsive panel logic
 * for consistent behavior across the application.
 * 
 * @function
 * @returns {boolean} True if current viewport is mobile-sized
 * @example
 * import { isMobileViewport } from './slices/themeSlice';
 * if (isMobileViewport()) { ... }
 */
export const isMobileViewport = () => {
  return typeof window !== 'undefined' && window.innerWidth <= 1024;
};
