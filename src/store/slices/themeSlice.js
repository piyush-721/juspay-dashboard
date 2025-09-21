// src/store/slices/themeSlice.js
import { createSlice } from '@reduxjs/toolkit';

// ✅ Get theme from localStorage with system preference fallback
const getInitialTheme = () => {
  if (typeof window !== 'undefined') {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme && (savedTheme === 'light' || savedTheme === 'dark')) {
      return savedTheme;
    }
    
    // Check system preference
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }
  return 'light';
};

// ✅ Responsive initial state
const getInitialUIState = () => {
  const isMobile = typeof window !== 'undefined' && window.innerWidth <= 1024;
  
  return {
    sidebarOpen: !isMobile,
    notificationsPanelOpen: !isMobile,
  };
};

const initialState = {
  // ✅ Theme state with system preference detection
  theme: getInitialTheme(),
  
  // ✅ Responsive UI state
  ...getInitialUIState(),
};

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    // ✅ Enhanced theme actions with localStorage and DOM updates
    toggleTheme: (state) => {
      state.theme = state.theme === 'light' ? 'dark' : 'light';
      if (typeof window !== 'undefined') {
        localStorage.setItem('theme', state.theme);
        document.documentElement.setAttribute('data-theme', state.theme);
      }
    },
    setTheme: (state, action) => {
      state.theme = action.payload;
      if (typeof window !== 'undefined') {
        localStorage.setItem('theme', action.payload);
        document.documentElement.setAttribute('data-theme', action.payload);
      }
    },
    
    // UI actions (unchanged)
    toggleSidebar: (state) => {
      state.sidebarOpen = !state.sidebarOpen;
    },
    closeSidebar: (state) => {
      state.sidebarOpen = false;
    },
    openSidebar: (state) => {
      state.sidebarOpen = true;
    },
    toggleNotifications: (state) => {
      state.notificationsPanelOpen = !state.notificationsPanelOpen;
    },
    closeNotifications: (state) => {
      state.notificationsPanelOpen = false;
    },
    openNotifications: (state) => {
      state.notificationsPanelOpen = true;
    },
    
    // ✅ Enhanced responsive action
    setResponsivePanelState: (state) => {
      const isMobile = typeof window !== 'undefined' && window.innerWidth <= 1024;
      if (isMobile) {
        state.sidebarOpen = false;
        state.notificationsPanelOpen = false;
      } else {
        state.sidebarOpen = true;
        state.notificationsPanelOpen = true;
      }
    },
  },
});

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

export default themeSlice.reducer;
