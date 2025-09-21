// src/components/ThemeProvider/ThemeProvider.jsx
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setTheme } from '../../store/slices/themeSlice';

const ThemeProvider = ({ children }) => {
  const theme = useSelector((state) => state.theme.theme);
  const dispatch = useDispatch();

  useEffect(() => {
    // ✅ Apply theme to document on mount and theme change
    document.documentElement.setAttribute('data-theme', theme);
    document.body.setAttribute('data-theme', theme);
    
    // ✅ Handle system theme changes (when user hasn't manually set preference)
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleSystemThemeChange = (e) => {
      const savedTheme = localStorage.getItem('theme');
      // Only follow system if user hasn't manually set a preference
      if (!savedTheme) {
        dispatch(setTheme(e.matches ? 'dark' : 'light'));
      }
    };

    mediaQuery.addEventListener('change', handleSystemThemeChange);
    return () => mediaQuery.removeEventListener('change', handleSystemThemeChange);
  }, [theme, dispatch]);

  return children;
};

export default ThemeProvider;
