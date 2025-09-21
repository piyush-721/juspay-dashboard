// src/components/OrdersTable/OrdersTable.jsx
import React, { useState, useMemo, useCallback, useRef } from 'react';
import styles from './OrdersTable.module.css';

// Import icons
import searchIcon from '../../assets/icons/search.png';
import filterIcon from '../../assets/icons/filter.png';
import sortIcon from '../../assets/icons/sort.png';
import addIcon from '../../assets/icons/add.png';

// Import avatars
import avatar1 from '../../assets/avatars/avatar1.png';
import avatar2 from '../../assets/avatars/avatar2.png';
import avatar3 from '../../assets/avatars/avatar3.png';
import avatar4 from '../../assets/avatars/avatar4.png';
import avatar5 from '../../assets/avatars/avatar5.png';
import avatar6 from '../../assets/avatars/avatar6.png';

// Sample data with proper date sorting values
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

const OrdersTable = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });
  const [statusFilter, setStatusFilter] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedOrders, setSelectedOrders] = useState([]);
  const [hoveredRow, setHoveredRow] = useState(null);
  const [showFilterDropdown, setShowFilterDropdown] = useState(false);
  const [showSortDropdown, setShowSortDropdown] = useState(false);
  const itemsPerPage = 10;

  const debounceTimeoutRef = useRef(null);

  // Status options for filtering
  const statusOptions = ['All', 'In Progress', 'Complete', 'Pending', 'Approved', 'Rejected'];
  
  // Sort options
  const sortOptions = [
    { key: 'id', label: 'Order ID' },
    { key: 'user', label: 'User Name' },
    { key: 'project', label: 'Project' },
    { key: 'address', label: 'Address' },
    { key: 'date', label: 'Date' },
    { key: 'status', label: 'Status' }
  ];

  // ✅ Debouncing logic for search
  const debouncedSearch = useCallback((value) => {
    if (debounceTimeoutRef.current) {
      clearTimeout(debounceTimeoutRef.current);
    }
    
    debounceTimeoutRef.current = setTimeout(() => {
      setDebouncedSearchTerm(value);
      setCurrentPage(1);
    }, 300);
  }, []);

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    debouncedSearch(value);
  };

  // Get status class for styling
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

  // ✅ Add new order handler
  const handleAddOrder = () => {
    console.log('Add new order clicked');
    // Implement add order functionality
  };

  // ✅ Filter handler
  const handleFilterChange = (status) => {
    setStatusFilter(status);
    setShowFilterDropdown(false);
    setCurrentPage(1);
  };

  // ✅ Sort handler from dropdown
  const handleSortChange = (key, direction = 'asc') => {
    setSortConfig({ key, direction });
    setShowSortDropdown(false);
    setCurrentPage(1);
  };

  // Filter and search logic with debounced search term
  const filteredOrders = useMemo(() => {
    return sampleOrders.filter(order => {
      const matchesSearch = 
        order.id.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) ||
        order.user.name.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) ||
        order.project.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) ||
        order.address.toLowerCase().includes(debouncedSearchTerm.toLowerCase());
      
      const matchesStatus = statusFilter === 'All' || order.status === statusFilter;
      
      return matchesSearch && matchesStatus;
    });
  }, [debouncedSearchTerm, statusFilter]);

  // Enhanced sorting logic with proper date sorting
  const sortedOrders = useMemo(() => {
    if (!sortConfig.key) return filteredOrders;

    return [...filteredOrders].sort((a, b) => {
      let aValue, bValue;

      if (sortConfig.key === 'user') {
        aValue = a.user.name;
        bValue = b.user.name;
      } else if (sortConfig.key === 'date') {
        aValue = a.dateValue;
        bValue = b.dateValue;
      } else {
        aValue = a[sortConfig.key];
        bValue = b[sortConfig.key];
      }

      // Handle Date objects
      if (aValue instanceof Date && bValue instanceof Date) {
        return sortConfig.direction === 'asc' 
          ? aValue.getTime() - bValue.getTime()
          : bValue.getTime() - aValue.getTime();
      }

      // Handle strings and other types
      if (aValue < bValue) {
        return sortConfig.direction === 'asc' ? -1 : 1;
      }
      if (aValue > bValue) {
        return sortConfig.direction === 'asc' ? 1 : -1;
      }
      return 0;
    });
  }, [filteredOrders, sortConfig]);

  // Pagination logic
  const totalPages = Math.ceil(sortedOrders.length / itemsPerPage);
  const paginatedOrders = sortedOrders.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Handle sorting from table headers
  const handleSort = (key) => {
    setSortConfig(prevConfig => ({
      key,
      direction: prevConfig.key === key && prevConfig.direction === 'asc' ? 'desc' : 'asc'
    }));
  };

  // Handle row selection
  const handleSelectOrder = (orderId) => {
    setSelectedOrders(prev => 
      prev.includes(orderId) 
        ? prev.filter(id => id !== orderId)
        : [...prev, orderId]
    );
  };

  // Handle select all
  const handleSelectAll = () => {
    if (selectedOrders.length === paginatedOrders.length) {
      setSelectedOrders([]);
    } else {
      setSelectedOrders(paginatedOrders.map(order => order.id));
    }
  };

  return (
    <div className={styles.ordersTable}>
      {/* Header Section */}
      <div className={styles.tableHeader}>
        <div className={styles.leftActions}>
          {/* ✅ Add Button */}
          <button className={styles.actionButton} onClick={handleAddOrder}>
            <img src={addIcon} alt="Add" className={styles.icon} />
          </button>
          
          {/* ✅ Filter Button with Dropdown */}
          <div className={styles.dropdown}>
            <button 
              className={`${styles.actionButton} ${showFilterDropdown ? styles.active : ''}`}
              onClick={() => {
                setShowFilterDropdown(!showFilterDropdown);
                setShowSortDropdown(false);
              }}
            >
              <img src={filterIcon} alt="Filter" className={styles.icon} />
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
          
          {/* ✅ Sort Button with Dropdown */}
          <div className={styles.dropdown}>
            <button 
              className={`${styles.actionButton} ${showSortDropdown ? styles.active : ''}`}
              onClick={() => {
                setShowSortDropdown(!showSortDropdown);
                setShowFilterDropdown(false);
              }}
            >
              <img src={sortIcon} alt="Sort" className={styles.icon} />
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

        <div className={styles.rightActions}>
          <div className={styles.searchContainer}>
            <img src={searchIcon} alt="Search" className={styles.searchIcon} />
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

      {/* Table */}
      <div className={styles.tableContainer}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th className={styles.checkboxHeader}>
                <input
                  type="checkbox"
                  checked={selectedOrders.length === paginatedOrders.length && paginatedOrders.length > 0}
                  onChange={handleSelectAll}
                  className={styles.checkbox}
                />
              </th>
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
              <th className={styles.headerCell}></th>
            </tr>
          </thead>
          <tbody>
            {paginatedOrders.map((order) => (
              <tr 
                key={order.id} 
                className={styles.tableRow}
                onMouseEnter={() => setHoveredRow(order.id)}
                onMouseLeave={() => setHoveredRow(null)}
              >
                <td className={styles.checkboxCell}>
                  <input
                    type="checkbox"
                    checked={selectedOrders.includes(order.id)}
                    onChange={() => handleSelectOrder(order.id)}
                    className={`${styles.checkbox} ${
                      hoveredRow === order.id || selectedOrders.includes(order.id) 
                        ? styles.checkboxVisible 
                        : styles.checkboxHidden
                    }`}
                  />
                </td>
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

      {/* Pagination */}
      <div className={styles.pagination}>
        <button 
          className={styles.paginationNav}
          onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
        >
          ←
        </button>
        
        {Array.from({ length: totalPages }, (_, i) => i + 1).map(pageNum => (
          <button
            key={pageNum}
            className={`${styles.paginationNumber} ${currentPage === pageNum ? styles.active : ''}`}
            onClick={() => setCurrentPage(pageNum)}
          >
            {pageNum}
          </button>
        ))}
        
        <button 
          className={styles.paginationNav}
          onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
        >
          →
        </button>
      </div>

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
