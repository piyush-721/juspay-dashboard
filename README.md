
Juspay Dashboard - eCommerce Analytics Platform
A React-based eCommerce dashboard with data visualization, responsive design, and theme management.

🚀 Links
🌐 Live Demo: https://juspay-dashboard-topaz.vercel.app/
📁 GitHub: https://github.com/piyush-721/juspay-dashboard
    Video link for Dashboard Walkthrough: https://drive.google.com/file/d/1YMGVpsfs_I2BYxNsPKxvYb0be54Tt4iQ/view?usp=sharing
🛠️ Local Setup
Prerequisites
Node.js (v16.0.0+)

npm or yarn

VS Code (recommended)

VS Code Extensions
text
ES7+ React/Redux/React-Native snippets
Auto Rename Tag
CSS Modules
Prettier - Code formatter
ESLint
Installation
bash
# Clone repository
git clone https://github.com/piyush-721/juspay-dashboard.git
cd juspay-dashboard

# Install dependencies
npm install

# Required libraries
npm install react@^18.2.0 react-dom@^18.2.0 react-router-dom@^6.8.0 @reduxjs/toolkit@^1.9.0 react-redux@^8.0.0 chart.js@^4.2.0 react-chartjs-2@^5.2.0 recharts@^2.5.0

# Start development server
npm start

🎯 Features
Dashboard: Multiple chart types, metrics grid, responsive layout

Theme System: Light/dark mode with system preference detection

Responsive Design: Works on desktop, tablet, and mobile

Navigation: Sidebar and routing between pages

State Management: Redux for theme and UI state

🚧 Challenges Faced & Solutions
1. Chart Implementation
Problem: Difficulty creating bar charts and pie charts with different libraries
Solution: Used Chart.js for doughnut charts and Recharts for line charts with custom configurations

2. Responsive Design
Problem: Making all pages responsive across devices
Solution: Implemented progressive breakpoint system and CSS Grid/Flexbox combination. Still needs refinement with more time.

3. Redux Store for Dark Theme
Problem: Setting up theme management with persistence
Solution: Created theme slice with localStorage integration and system preference detection

4. Horizontal Scrolling
Problem: Layout overflow on smaller screens
Solution: Used overflow: hidden, min-width: 0, and responsive grid transformations

🏗️ Improvements Made
File Structure: Organized components with CSS modules in separate folders

DashboardPage: Advanced grid system with dynamic width calculations

OrdersPage: Consistent layout with auto-close notifications

Responsiveness: Prevented horizontal scrolling with proper overflow handling

🚀 Deployment
Deployed on Vercel with automatic builds from GitHub main branch.

Developer: Piyush Shinde
Tech Stack: JavaScript, React 18, Redux Toolkit, Chart.js, Recharts, CSS Modules

