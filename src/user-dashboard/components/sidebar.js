'use client'

import React, { useEffect, useRef } from 'react'
import { Link, useLocation } from 'react-router-dom'

export default function Sidebar() {
  const location = useLocation()
  const indicatorRef = useRef(null)
  const itemsRef = useRef([])

  useEffect(() => {
    // Find the active item
    const activeItem = itemsRef.current.find((item) => {
      const href = item?.getAttribute('href')
      if (href === '/user') {
        return location.pathname === '/user'
      }
      return location.pathname.startsWith(href)
    })

    // Update indicator position with a small delay for animation
    if (activeItem && indicatorRef.current) {
      setTimeout(() => {
        indicatorRef.current.style.top = `${activeItem.offsetTop}px`
        indicatorRef.current.style.height = `${activeItem.offsetHeight}px`
      }, 50)
    }
  }, [location.pathname])

  const menuItems = [
    {
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
          <polyline points="9 22 9 12 15 12 15 22" />
        </svg>
      ),
      label: 'Home',
      href: '/user'
    },
    {
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
          <line x1="9" y1="3" x2="9" y2="21" />
        </svg>
      ),
      label: 'Medicines',
      href: '/user/medicine'
    },
    {
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
        </svg>
      ),
      label: 'Messages',
      href: '/user/messages'
    },
    {
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
          <line x1="16" y1="2" x2="16" y2="6" />
          <line x1="8" y1="2" x2="8" y2="6" />
          <line x1="3" y1="10" x2="21" y2="10" />
        </svg>
      ),
      label: 'Diary',
      href: '/user/diary'
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
      label: 'Community',
      href: '/user/forum'
    }
  ]

  return (
    <aside className="user-sidebar">
      <div className="sidebar-header">
        <h2 className="menu-label">MENU</h2>
      </div>
      <nav className="sidebar-nav">
        <div 
          ref={indicatorRef}
          className="nav-indicator"
        />
        {menuItems.map((item, index) => (
          <Link
            key={item.href}
            to={item.href}
            ref={el => itemsRef.current[index] = el}
            className="nav-item"
            data-active={location.pathname === item.href || 
              (item.href !== '/user' && location.pathname.startsWith(item.href))}
          >
            {item.icon}
            <span>{item.label}</span>
          </Link>
        ))}
      </nav>
    </aside>
  )
}

