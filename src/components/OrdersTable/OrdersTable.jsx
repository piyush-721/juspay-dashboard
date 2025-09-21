/**
 * OrdersTable Component
 * 
 * A sophisticated data table component for managing order information with advanced features
 * including sorting, filtering, searching, pagination, and bulk selection. Features responsive
 * design with theme-aware icons and custom checkbox styling.
 * 
 * Features:
 * - Advanced search with 300ms debouncing
 * - Multi-column sorting with visual indicators
 * - Status-based filtering with dropdown UI
 * - Custom checkbox system with hover-based visibility
 * - Pagination with page navigation
 * - Bulk row selection capabilities
 * - Theme-aware icon switching (light/dark)
 * - Responsive design with mobile optimizations
 * - Real-time data filtering and sorting
 * 
 * Design Specifications:
 * - Fixed dimensions: 1070px × 536px
 * - 10 items per page pagination
 * - Custom black/white checkbox styling
 * - Right-aligned pagination controls
 * - Dropdown overlays with backdrop
 * 
 * @component
 * @example
 * return (
 *   <OrdersTable />
 * )
 * 
 * @author Your Name
 * @since 1.0.0
 * @version 3.2.0
 */

// src/components/OrdersTable/OrdersTable.jsx - UPDATED FOR DARK MODE ICONS & CUSTOM CHECKBOXES
import React, { useState, useMemo, useCallback, useRef } from 'react';
import { useSelector } from 'react-redux';
import styles from './OrdersTable.module.css';

// =============================================================================
// ASSET IMPORTS - Light Theme Icons
// =============================================================================

// Light theme icons
import searchIcon from '../../assets/icons/search.png';
import filterIcon from '../../assets/icons/filter.png';
import sortIcon from '../../assets/icons/sort.png';
import addIcon from '../../assets/icons/add.png';

// =============================================================================
// ASSET IMPORTS - Dark Theme Icons
// =============================================================================

// ✅ Dark theme icons
import searchIconDark from '../../assets/darkIcons/search.png';
import filterIconDark from '../../assets/darkIcons/filter.png';
import sortIconDark from '../../assets/darkIcons/sort.png';
import addIconDark from '../../assets/darkIcons/add.png';

// =============================================================================
// ASSET IMPORTS - User Avatar Images (Theme Independent)
// =============================================================================

// Import avatars (these don't change with theme)
import avatar1 from '../../assets/avatars/avatar1.png';
import avatar2 from '../../assets/avatars/avatar2.png';
import avatar3 from '../../assets/avatars/avatar3.png';
import avatar4 from '../../assets/avatars/avatar4.png';
import avatar5 from '../../assets/avatars/avatar5.png';
import avatar6 from '../../assets/avatars/avatar6.png';

// =============================================================================
// SAMPLE DATA CONFIGURATION - Order Records
// =============================================================================

/**
 * Sample order data with comprehensive order information
 * 
 * Contains realistic order data for demonstration and development.
 * Each order includes user info, project details, location, timestamps,
 * and status information. Date objects are provided for proper sorting.
 * 
 * @type {Array<Object>}
 * @property {string} id - Unique order identifier with # prefix
 * @property {Object} user - User information object
 * @property {string} user.name - Full name of the user
 * @property {string} user.avatar - Path to user's avatar image
 * @property {string} project - Project name/description
 * @property {string} address - User's address information
 * @property {string} date - Human-readable date string
 * @property {Date} dateValue - Date object for accurate sorting
 * @property {string} status - Order status for filtering and display
 */
const sampleOrders = [
  {
    id: '#CM9801',
    user: { name: 'Natali Craig', avatar: avatar1 },
    project: 'Landing Page',
    address: 'Meadow Lane Oakland',
    date: 'Just now',
    dateValue: new Date('2023-03-30T10:00:00'),
    status: 'In Progress'
  },
  {
    id: '#CM9802',
    user: { name: 'Kate Morrison', avatar: avatar2 },
    project: 'CRM Admin pages',
    address: 'Larry San Francisco',
    date: 'A minute ago',
    dateValue: new Date('2023-03-30T09:59:00'),
    status: 'Complete'
  },
  {
    id: '#CM9803',
    user: { name: 'Drew Cano', avatar: avatar3 },
    project: 'Client Project',
    address: 'Bagwell Avenue Ocala',
    date: '1 hour ago',
    dateValue: new Date('2023-03-30T09:00:00'),
    status: 'Pending'
  },
  {
    id: '#CM9804',
    user: { name: 'Orlando Diggs', avatar: avatar4 },
    project: 'Admin Dashboard',
    address: 'Washburn Baton Rouge',
    date: 'Yesterday',
    dateValue: new Date('2023-03-29T10:00:00'),
    status: 'Approved'
  },
  {
    id: '#CM9805',
    user: { name: 'Andi Lane', avatar: avatar5 },
    project: 'App Landing Page',
    address: 'Nest Lane Olivette',
    date: 'Feb 2, 2023',
    dateValue: new Date('2023-02-02T10:00:00'),
    status: 'Rejected'
  },
  {
    id: '#CM9806',
    user: { name: 'Ryan Howard', avatar: avatar1 },
    project: 'E-Commerce Platform',
    address: 'Elm Street Denver',
    date: '2 days ago',
    dateValue: new Date('2023-03-28T10:00:00'),
    status: 'In Progress'
  },
  {
    id: '#CM9807',
    user: { name: 'Sophia Turner', avatar: avatar2 },
    project: 'Portfolio Website',
    address: 'Broadway New York',
    date: 'Mar 1, 2023',
    dateValue: new Date('2023-03-01T10:00:00'),
    status: 'Complete'
  },
  {
    id: '#CM9808',
    user: { name: 'Ethan Hunt', avatar: avatar3 },
    project: 'Mobile Banking App',
    address: 'Sunset Blvd Los Angeles',
    date: 'Mar 10, 2023',
    dateValue: new Date('2023-03-10T10:00:00'),
    status: 'Pending'
  },
  {
    id: '#CM9809',
    user: { name: 'Liam Johnson', avatar: avatar4 },
    project: 'Inventory System',
    address: 'Lakeview Chicago',
    date: 'Mar 12, 2023',
    dateValue: new Date('2023-03-12T10:00:00'),
    status: 'Approved'
  },
  {
    id: '#CM9810',
    user: { name: 'Emma Wilson', avatar: avatar5 },
    project: 'Healthcare Dashboard',
    address: 'Greenwood Ave Seattle',
    date: 'Mar 15, 2023',
    dateValue: new Date('2023-03-15T10:00:00'),
    status: 'Rejected'
  },
  {
    id: '#CM9811',
    user: { name: 'Daniel Carter', avatar: avatar6 },
    project: 'Travel Booking System',
    address: 'Ocean Drive Miami',
    date: 'Mar 18, 2023',
    dateValue: new Date('2023-03-18T10:00:00'),
    status: 'In Progress'
  },
  {
    id: '#CM9812',
    user: { name: 'Olivia Brown', avatar: avatar1 },
    project: 'Learning Management',
    address: 'King Street Boston',
    date: 'Mar 20, 2023',
    dateValue: new Date('2023-03-20T10:00:00'),
    status: 'Pending'
  },
  {
    id: '#CM9813',
    user: { name: 'James Miller', avatar: avatar2 },
    project: 'Restaurant POS',
    address: 'Riverwalk San Antonio',
    date: 'Mar 22, 2023',
    dateValue: new Date('2023-03-22T10:00:00'),
    status: 'Approved'
  },
  {
    id: '#CM9814',
    user: { name: 'Sophia Lee', avatar: avatar3 },
    project: 'Fitness App',
    address: 'Maple Street Austin',
    date: 'Mar 25, 2023',
    dateValue: new Date('2023-03-25T10:00:00'),
    status: 'Complete'
  },
  {
    id: '#CM9815',
    user: { name: 'Michael Scott', avatar: avatar4 },
    project: 'Chat Application',
    address: 'Scranton Pennsylvania',
    date: 'Mar 28, 2023',
    dateValue: new Date('2023-03-28T10:00:00'),
    status: 'Rejected'
  }
];

/**
 * OrdersTable functional component
 * 
 * Main component that renders the complete orders management interface
 * with all interactive features and responsive behavior.
 * 
 * @returns {JSX.Element} The rendered orders table component
 */
const OrdersTable = () => {
  // ===========================================================================
  // HOOKS & STATE MANAGEMENT
  // ===========================================================================
  
  /** Get current theme from Redux store */
  const theme = useSelector((state) => state.theme.theme); // ✅ Get current theme
  
  /** Search input state - immediate UI feedback */
  const [searchTerm, setSearchTerm] = useState('');
  
  /** Debounced search term for actual filtering */
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');
  
  /** Sorting configuration with column and direction */
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });
  
  /** Current status filter selection */
  const [statusFilter, setStatusFilter] = useState('All');
  
  /** Current pagination page number */
  const [currentPage, setCurrentPage] = useState(1);
  
  /** Array of selected order IDs for bulk operations */
  const [selectedOrders, setSelectedOrders] = useState([]);
  
  /** Currently hovered row for checkbox visibility */
  const [hoveredRow, setHoveredRow] = useState(null);
  
  /** Filter dropdown visibility state */
  const [showFilterDropdown, setShowFilterDropdown] = useState(false);
  
  /** Sort dropdown visibility state */
  const [showSortDropdown, setShowSortDropdown] = useState(false);
  
  /** Number of items displayed per page */
  const itemsPerPage = 10;

  /** Reference to debounce timeout for search input */
  const debounceTimeoutRef = useRef(null);

  // ===========================================================================
  // UTILITY FUNCTIONS
  // ===========================================================================

  // ✅ Helper function to get correct icon based on theme
  const getIcon = (lightIcon, darkIcon) => {
    return theme === 'dark' ? darkIcon : lightIcon;
  };

  // ===========================================================================
  // CONFIGURATION DATA - Filter and Sort Options
  // ===========================================================================

  /** Available status options for filtering */
  const statusOptions = ['All', 'In Progress', 'Complete', 'Pending', 'Approved', 'Rejected'];
  
  /** 
   * Available sort options with column mappings
   * @type {Array<Object>}
   */
  const sortOptions = [
    { key: 'id', label: 'Order ID' },
    { key: 'user', label: 'User Name' },
    { key: 'project', label: 'Project' },
    { key: 'address', label: 'Address' },
    { key: 'date', label: 'Date' },
    { key: 'status', label: 'Status' }
  ];

  // ===========================================================================
  // SEARCH FUNCTIONALITY - Debounced Search Implementation
  // ===========================================================================

  // ✅ Debouncing logic for search
  const debouncedSearch = useCallback((value) => {
    if (debounceTimeoutRef.current) {
      clearTimeout(debounceTimeoutRef.current);
    }
    
    debounceTimeoutRef.current = setTimeout(() => {
      setDebouncedSearchTerm(value);
      setCurrentPage(1); // Reset to first page on search
    }, 300); // 300ms debounce delay for optimal UX
  }, []);

  /**
   * Handles search input changes with debouncing
   * Updates UI immediately but delays actual filtering
   */
  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    debouncedSearch(value);
  };

  // ===========================================================================
  // STYLING HELPERS
  // ===========================================================================

  /**
   * Returns appropriate CSS class for status styling
   * Maps status strings to corresponding CSS classes
   * 
   * @param {string} status - Order status
   * @returns {string} CSS class name
   */
  const getStatusClass = (status) => {
    switch (status) {
      case 'In Progress': return styles.statusInProgress;
      case 'Complete': return styles.statusComplete;
      case 'Pending': return styles.statusPending;
      case 'Approved': return styles.statusApproved;
      case 'Rejected': return styles.statusRejected;
      default: return '';
    }
  };

  // ===========================================================================
  // EVENT HANDLERS - User Interactions
  // ===========================================================================

  // ✅ Add new order handler
  const handleAddOrder = () => {
    console.log('Add new order clicked');
    // TODO: Implement add order functionality
    // This would typically open a modal or navigate to an add order form
  };

  // ✅ Filter handler
  const handleFilterChange = (status) => {
    setStatusFilter(status);
    setShowFilterDropdown(false);
    setCurrentPage(1); // Reset pagination on filter change
  };

  // ✅ Sort handler from dropdown
  const handleSortChange = (key, direction = 'asc') => {
    setSortConfig({ key, direction });
    setShowSortDropdown(false);
    setCurrentPage(1); // Reset pagination on sort change
  };

  // ===========================================================================
  // DATA PROCESSING - Filtering, Sorting, and Pagination
  // ===========================================================================

  /**
   * Filter and search logic with debounced search term
   * Filters orders based on search term and status selection
   */
  const filteredOrders = useMemo(() => {
    return sampleOrders.filter(order => {
      // Multi-column search across ID, user name, project, and address
      const matchesSearch = 
        order.id.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) ||
        order.user.name.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) ||
        order.project.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) ||
        order.address.toLowerCase().includes(debouncedSearchTerm.toLowerCase());
      
      // Status filter logic
      const matchesStatus = statusFilter === 'All' || order.status === statusFilter;
      
      return matchesSearch && matchesStatus;
    });
  }, [debouncedSearchTerm, statusFilter]);

  /**
   * Enhanced sorting logic with proper date sorting
   * Handles different data types including Date objects and strings
   */
  const sortedOrders = useMemo(() => {
    if (!sortConfig.key) return filteredOrders;

    return [...filteredOrders].sort((a, b) => {
      let aValue, bValue;

      // Handle special column mappings
      if (sortConfig.key === 'user') {
        aValue = a.user.name;
        bValue = b.user.name;
      } else if (sortConfig.key === 'date') {
        // Use Date objects for accurate chronological sorting
        aValue = a.dateValue;
        bValue = b.dateValue;
      } else {
        aValue = a[sortConfig.key];
        bValue = b[sortConfig.key];
      }

      // Handle Date objects with proper time comparison
      if (aValue instanceof Date && bValue instanceof Date) {
        return sortConfig.direction === 'asc' 
          ? aValue.getTime() - bValue.getTime()
          : bValue.getTime() - aValue.getTime();
      }

      // Handle strings and other types with locale-aware comparison
      if (aValue < bValue) {
        return sortConfig.direction === 'asc' ? -1 : 1;
      }
      if (aValue > bValue) {
        return sortConfig.direction === 'asc' ? 1 : -1;
      }
      return 0;
    });
  }, [filteredOrders, sortConfig]);

  // ===========================================================================
  // PAGINATION LOGIC
  // ===========================================================================

  /** Calculate total pages based on filtered results */
  const totalPages = Math.ceil(sortedOrders.length / itemsPerPage);
  
  /** Get current page's data slice */
  const paginatedOrders = sortedOrders.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // ===========================================================================
  // TABLE INTERACTION HANDLERS
  // ===========================================================================

  /**
   * Handle sorting from table headers
   * Toggles sort direction if same column is clicked
   */
  const handleSort = (key) => {
    setSortConfig(prevConfig => ({
      key,
      direction: prevConfig.key === key && prevConfig.direction === 'asc' ? 'desc' : 'asc'
    }));
  };

  /**
   * Handle individual row selection
   * Adds or removes order ID from selection array
   */
  const handleSelectOrder = (orderId) => {
    setSelectedOrders(prev => 
      prev.includes(orderId) 
        ? prev.filter(id => id !== orderId)
        : [...prev, orderId]
    );
  };

  /**
   * Handle select all checkbox
   * Selects all visible orders or deselects all
   */
  const handleSelectAll = () => {
    if (selectedOrders.length === paginatedOrders.length) {
      setSelectedOrders([]);
    } else {
      setSelectedOrders(paginatedOrders.map(order => order.id));
    }
  };

  // ===========================================================================
  // COMPONENT RENDER
  // ===========================================================================

  return (
    <div className={styles.ordersTable}>
      {/* =====================================================================
          TABLE HEADER - Action Controls and Search
          ===================================================================== */}
      
      {/* Header Section */}
      <div className={styles.tableHeader}>
        <div className={styles.leftActions}>
          {/* Add New Order Button */}
          {/* ✅ Add Button with dynamic icon */}
          <button className={styles.actionButton} onClick={handleAddOrder}>
            <img src={getIcon(addIcon, addIconDark)} alt="Add" className={styles.icon} />
          </button>
          
          {/* Filter Dropdown Control */}
          {/* ✅ Filter Button with Dropdown */}
          <div className={styles.dropdown}>
            <button 
              className={`${styles.actionButton} ${showFilterDropdown ? styles.active : ''}`}
              onClick={() => {
                setShowFilterDropdown(!showFilterDropdown);
                setShowSortDropdown(false); // Close other dropdown
              }}
            >
              <img src={getIcon(filterIcon, filterIconDark)} alt="Filter" className={styles.icon} />
            </button>
            {showFilterDropdown && (
              <div className={styles.dropdownMenu}>
                <div className={styles.dropdownHeader}>Filter by Status</div>
                {statusOptions.map(status => (
                  <button
                    key={status}
                    className={`${styles.dropdownItem} ${statusFilter === status ? styles.active : ''}`}
                    onClick={() => handleFilterChange(status)}
                  >
                    <span className={`${styles.statusDot} ${styles[`status${status.replace(' ', '')}`]}`}></span>
                    {status}
                  </button>
                ))}
              </div>
            )}
          </div>
          
          {/* Sort Dropdown Control */}
          {/* ✅ Sort Button with Dropdown */}
          <div className={styles.dropdown}>
            <button 
              className={`${styles.actionButton} ${showSortDropdown ? styles.active : ''}`}
              onClick={() => {
                setShowSortDropdown(!showSortDropdown);
                setShowFilterDropdown(false); // Close other dropdown
              }}
            >
              <img src={getIcon(sortIcon, sortIconDark)} alt="Sort" className={styles.icon} />
            </button>
            {showSortDropdown && (
              <div className={styles.dropdownMenu}>
                <div className={styles.dropdownHeader}>Sort by</div>
                {sortOptions.map(option => (
                  <div key={option.key} className={styles.sortGroup}>
                    <button
                      className={`${styles.dropdownItem} ${sortConfig.key === option.key && sortConfig.direction === 'asc' ? styles.active : ''}`}
                      onClick={() => handleSortChange(option.key, 'asc')}
                    >
                      {option.label} ↑
                    </button>
                    <button
                      className={`${styles.dropdownItem} ${sortConfig.key === option.key && sortConfig.direction === 'desc' ? styles.active : ''}`}
                      onClick={() => handleSortChange(option.key, 'desc')}
                    >
                      {option.label} ↓
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Search Control */}
        <div className={styles.rightActions}>
          <div className={styles.searchContainer}>
            <img src={getIcon(searchIcon, searchIconDark)} alt="Search" className={styles.searchIcon} />
            <input
              type="text"
              placeholder="Search"
              value={searchTerm}
              onChange={handleSearchChange}
              className={styles.searchInput}
            />
          </div>
        </div>
      </div>

      {/* =====================================================================
          DATA TABLE - Orders Display with Custom Checkboxes
          ===================================================================== */}

      {/* Table */}
      <div className={styles.tableContainer}>
        <table className={styles.table}>
          {/* Table Header with Sortable Columns */}
          <thead>
            <tr>
              {/* Select All Checkbox */}
              <th className={styles.checkboxHeader}>
                <div className={styles.customCheckbox}>
                  <input
                    type="checkbox"
                    checked={selectedOrders.length === paginatedOrders.length && paginatedOrders.length > 0}
                    onChange={handleSelectAll}
                    className={styles.checkboxInput}
                  />
                  <div className={styles.checkboxCustom}>
                    {selectedOrders.length === paginatedOrders.length && paginatedOrders.length > 0 && (
                      <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M10 3L4.5 8.5L2 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    )}
                  </div>
                </div>
              </th>
              
              {/* Sortable Column Headers */}
              <th className={styles.headerCell} onClick={() => handleSort('id')}>
                Order ID
                {sortConfig.key === 'id' && (
                  <span className={styles.sortIndicator}>
                    {sortConfig.direction === 'asc' ? '↑' : '↓'}
                  </span>
                )}
              </th>
              <th className={styles.headerCell} onClick={() => handleSort('user')}>
                User
                {sortConfig.key === 'user' && (
                  <span className={styles.sortIndicator}>
                    {sortConfig.direction === 'asc' ? '↑' : '↓'}
                  </span>
                )}
              </th>
              <th className={styles.headerCell} onClick={() => handleSort('project')}>
                Project
                {sortConfig.key === 'project' && (
                  <span className={styles.sortIndicator}>
                    {sortConfig.direction === 'asc' ? '↑' : '↓'}
                  </span>
                )}
              </th>
              <th className={styles.headerCell} onClick={() => handleSort('address')}>
                Address
                {sortConfig.key === 'address' && (
                  <span className={styles.sortIndicator}>
                    {sortConfig.direction === 'asc' ? '↑' : '↓'}
                  </span>
                )}
              </th>
              <th className={styles.headerCell} onClick={() => handleSort('date')}>
                Date
                {sortConfig.key === 'date' && (
                  <span className={styles.sortIndicator}>
                    {sortConfig.direction === 'asc' ? '↑' : '↓'}
                  </span>
                )}
              </th>
              <th className={styles.headerCell} onClick={() => handleSort('status')}>
                Status
                {sortConfig.key === 'status' && (
                  <span className={styles.sortIndicator}>
                    {sortConfig.direction === 'asc' ? '↑' : '↓'}
                  </span>
                )}
              </th>
              <th className={styles.headerCell}></th> {/* Actions column */}
            </tr>
          </thead>
          
          {/* Table Body with Order Rows */}
          <tbody>
            {paginatedOrders.map((order) => (
              <tr 
                key={order.id} 
                className={styles.tableRow}
                onMouseEnter={() => setHoveredRow(order.id)}
                onMouseLeave={() => setHoveredRow(null)}
              >
                {/* Row Selection Checkbox */}
                <td className={styles.checkboxCell}>
                  <div className={`${styles.customCheckbox} ${
                    hoveredRow === order.id || selectedOrders.includes(order.id) 
                      ? styles.checkboxVisible 
                      : styles.checkboxHidden
                  }`}>
                    <input
                      type="checkbox"
                      checked={selectedOrders.includes(order.id)}
                      onChange={() => handleSelectOrder(order.id)}
                      className={styles.checkboxInput}
                    />
                    <div className={styles.checkboxCustom}>
                      {selectedOrders.includes(order.id) && (
                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M10 3L4.5 8.5L2 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      )}
                    </div>
                  </div>
                </td>
                
                {/* Order Data Columns */}
                <td className={styles.tableCell}>
                  <span className={styles.orderId}>{order.id}</span>
                </td>
                <td className={styles.tableCell}>
                  <div className={styles.userInfo}>
                    <img src={order.user.avatar} alt={order.user.name} className={styles.avatar} />
                    <span className={styles.userName}>{order.user.name}</span>
                  </div>
                </td>
                <td className={styles.tableCell}>
                  <span className={styles.projectName}>{order.project}</span>
                </td>
                <td className={styles.tableCell}>
                  <span className={styles.address}>{order.address}</span>
                </td>
                <td className={styles.tableCell}>
                  <div className={styles.dateContainer}>
                    <svg className={styles.dateIcon} width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M5.33333 1.33331V3.99998M10.6667 1.33331V3.99998M2 6.66665H14M3.33333 2.66665H12.6667C13.403 2.66665 14 3.26369 14 3.99998V13.3333C14 14.0696 13.403 14.6666 12.6667 14.6666H3.33333C2.59695 14.6666 2 14.0696 2 13.3333V3.99998C2 3.26369 2.59695 2.66665 3.33333 2.66665Z" stroke="#9CA3AF" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    <span className={styles.date}>{order.date}</span>
                  </div>
                </td>
                <td className={styles.tableCell}>
                  <span className={`${styles.status} ${getStatusClass(order.status)}`}>
                    {order.status}
                  </span>
                </td>
                <td className={styles.tableCell}>
                  <button className={styles.moreButton}>
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M8 8.66669C8.36819 8.66669 8.66667 8.36821 8.66667 8.00002C8.66667 7.63183 8.36819 7.33335 8 7.33335C7.63181 7.33335 7.33333 7.63183 7.33333 8.00002C7.33333 8.36821 7.63181 8.66669 8 8.66669Z" stroke="#9CA3AF" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M8 4.00002C8.36819 4.00002 8.66667 3.70154 8.66667 3.33335C8.66667 2.96516 8.36819 2.66669 8 2.66669C7.63181 2.66669 7.33333 2.96516 7.33333 3.33335C7.33333 3.70154 7.63181 4.00002 8 4.00002Z" stroke="#9CA3AF" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M8 13.3334C8.36819 13.3334 8.66667 13.0349 8.66667 12.6667C8.66667 12.2985 8.36819 12 8 12C7.63181 12 7.33333 12.2985 7.33333 12.6667C7.33333 13.0349 7.63181 13.3334 8 13.3334Z" stroke="#9CA3AF" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* =====================================================================
          PAGINATION CONTROLS - Page Navigation
          ===================================================================== */}

      {/* Pagination */}
      <div className={styles.pagination}>
        {/* Previous Page Button */}
        <button 
          className={styles.paginationNav}
          onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
        >
          ←
        </button>
        
        {/* Page Number Buttons */}
        {Array.from({ length: totalPages }, (_, i) => i + 1).map(pageNum => (
          <button
            key={pageNum}
            className={`${styles.paginationNumber} ${currentPage === pageNum ? styles.active : ''}`}
            onClick={() => setCurrentPage(pageNum)}
          >
            {pageNum}
          </button>
        ))}
        
        {/* Next Page Button */}
        <button 
          className={styles.paginationNav}
          onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
        >
          →
        </button>
      </div>

      {/* =====================================================================
          OVERLAY - Dropdown Backdrop for Mobile
          ===================================================================== */}

      {/* ✅ Click outside to close dropdowns */}
      {(showFilterDropdown || showSortDropdown) && (
        <div 
          className={styles.overlay}
          onClick={() => {
            setShowFilterDropdown(false);
            setShowSortDropdown(false);
          }}
        />
      )}
    </div>
  );
};

export default OrdersTable;
