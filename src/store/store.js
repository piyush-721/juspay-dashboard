/**
 * Redux Store Configuration
 * 
 * Central Redux store setup using Redux Toolkit for the eCommerce dashboard.
 * Manages global application state including theme preferences and UI panel states.
 * 
 * @store
 * @author Your Name
 * @version 1.0.0
 */
import { configureStore } from '@reduxjs/toolkit';
import themeSlice from './slices/themeSlice';

/**
 * Main Redux store instance
 * 
 * Configures the application store with theme slice for managing:
 * - Light/dark theme switching with localStorage persistence
 * - Sidebar and notifications panel visibility states
 * - Responsive behavior based on screen size (1024px breakpoint)
 * - System theme preference detection
 * 
 * Redux Toolkit provides automatic:
 * - Redux DevTools integration (development only)
 * - Immutability and serializability checks (development only)
 * - Thunk middleware for async actions
 * 
 * @constant {Object} store - Configured Redux store
 */
export const store = configureStore({
  reducer: {
    /**
     * Theme slice managing application theme and UI panel states
     * 
     * State structure:
     * - theme: 'light' | 'dark'
     * - sidebarOpen: boolean
     * - notificationsPanelOpen: boolean
     */
    theme: themeSlice,
  },
});

/**
 * Type definitions for TypeScript compatibility
 * 
 * @typedef {ReturnType<typeof store.getState>} RootState - Complete app state shape
 * @typedef {typeof store.dispatch} AppDispatch - Typed dispatch function
 */
