/**
 * Application Entry Point
 * 
 * Bootstraps the React application with Redux state management
 * and React 18's concurrent features enabled through StrictMode.
 * 
 * @author Your Name
 * @version 1.0.0
 */

import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './store/store';
import App from './App';
import './index.css';

// Initialize React 18 root and render application
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
