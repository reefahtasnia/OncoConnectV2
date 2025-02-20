import React, { useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function AdminSidebar() {
  const location = useLocation();
  const indicatorRef = useRef(null);
  const itemsRef = useRef([]);

  useEffect(() => {
    // Find the active item
    const activeItem = itemsRef.current.find((item) => {
      const href = item?.getAttribute('href');
      if (href === '/admin') {
        return location.pathname === '/admin';
      }
      return location.pathname.startsWith(href);
    });

    // Update indicator position with a small delay for animation
    if (activeItem && indicatorRef.current) {
      setTimeout(() => {
        indicatorRef.current.style.top = `${activeItem.offsetTop}px`;
        indicatorRef.current.style.height = `${activeItem.offsetHeight}px`;
      }, 50);
    }
  }, [location.pathname]);

  const menuItems = [
    {
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
          <polyline points="9 22 9 12 15 12 15 22" />
        </svg>
      ),
      label: 'Home',
      href: '/admin'
    },
    {
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z" />
          <polyline points="13 2 13 9 20 9" />
        </svg>
      ),
      label: 'Reported Post',
      href: '/admin/reported'
    },
    {
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
          <path d="M14 2v6h6" />
          <path d="M16 13H8" />
          <path d="M16 17H8" />
          <path d="M10 9H8" />
        </svg>
      ),
      label: 'Survival Story',
      href: '/admin/stories'
    },
    {
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
          <path d="M16 3.13a4 4 0 0 1 0 7.75" />
        </svg>
      ),
      label: "Children's Zone",
      href: '/admin/children'
    },
    {
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
          <rect x="8" y="2" width="8" height="4" rx="1" ry="1" />
        </svg>
      ),
      label: 'Caregiver Article',
      href: '/admin/caregiver'
    },
    {
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
        </svg>
      ),
      label: 'Donation',
      href: '/admin/donation'
    },
    {
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
          <polyline points="22 4 12 14.01 9 11.01" />
        </svg>
      ),
      label: 'Doctor Approval',
      href: '/admin/doctor'
    },
    {
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
        </svg>
      ),
      label: 'User Feedback',
      href: '/admin/feedback'
    }
  ];

  return (
    <aside 
      className="admin-sidebar" 
      style={{ 
        width: '200px',
        height: '100vh',
        position: 'fixed',
        left: 0,
        top: 0,
        background: '#f3f0ff',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
        display: 'flex',
        flexDirection: 'column',
        zIndex: 50,
        fontSize: '14px',
        marginTop: '70px'
      }}
    >
      <div 
        className="admin-sidebar-header"
        style={{
          padding: '20px',
          color: '#7c3aed'
        }}
      >
        <h2 className="admin-menu-label">MENU</h2>
      </div>
      <nav 
        className="admin-sidebar-nav"
        style={{
          position: 'relative',
          flex: 1
        }}
      >
        <div 
          ref={indicatorRef}
          className="admin-nav-indicator"
          style={{
            position: 'absolute',
            left: '0',
            width: '4px',
            background: '#7c3aed',
            borderRadius: '0 4px 4px 0',
            transition: 'top 0.3s ease'
          }}
        />
        {menuItems.map((item, index) => (
          <Link
            key={item.href}
            to={item.href}
            ref={el => itemsRef.current[index] = el}
            className="admin-nav-item"
            style={{
              display: 'flex',
              alignItems: 'center',
              padding: '12px 20px',
              color: location.pathname.startsWith(item.href) ? '#7c3aed' : '#6b6b6b',
              textDecoration: 'none',
              transition: 'all 0.3s ease',
              background: location.pathname.startsWith(item.href) ? '#f0ebff' : 'transparent'
            }}
            data-active={location.pathname === item.href || 
              (item.href !== '/admin' && location.pathname.startsWith(item.href))}
          >
            <span style={{ marginRight: '12px' }}>{item.icon}</span>
            <span>{item.label}</span>
          </Link>
        ))}
      </nav>
    </aside>
  );
}