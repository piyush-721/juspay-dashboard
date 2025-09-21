/**
 * App Component - Root Application Entry Point
 * 
 * Main application component integrating Redux state management,
 * theme system, and React Router for the eCommerce dashboard.
 * 
 * @component
 * @author Your Name
 * @version 1.0.0
 */

// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store/store';
import ThemeProvider from './components/ThemeProvider/ThemeProvider';
import LandingPage from './pages/LandingPage/LandingPage';
import DashboardPage from './pages/DashboardPage/DashboardPage';
import OrdersPage from './pages/OrdersPage/OrdersPage';

const App = () => {
  return (
    <Provider store={store}>
      <ThemeProvider>
        <Router>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/orders" element={<OrdersPage />} />
          </Routes>
        </Router>
      </ThemeProvider>
    </Provider>
  );
};

export default App;
