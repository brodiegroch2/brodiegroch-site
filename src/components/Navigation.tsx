'use client'

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect, useRef } from 'react';

export default function Navigation() {
  const pathname = usePathname();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const mainNavLinks = [
    { href: '/', label: 'Dashboard' },
    { href: '/courses', label: 'Courses' },
    { href: '/deliverables', label: 'Deliverables' },
    { href: '/schedule', label: 'Schedule' },
  ];

  const dropdownLinks = [
    { href: '/quick-links', label: 'Quick Links' },
  ];

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    if (isDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isDropdownOpen]);

  return (
    <nav className="main-nav">
      <div className="nav-container">
        <h1 className="nav-title">UniHUB</h1>
        
        {/* Desktop Navigation */}
        <div className="desktop-nav">
          <ul className="nav-links">
            {mainNavLinks.map((link) => (
              <li key={link.href}>
                <Link 
                  href={link.href} 
                  className={`nav-link ${pathname === link.href ? 'active' : ''}`}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
          
          {/* Desktop Dropdown */}
          <div className="nav-dropdown" ref={dropdownRef}>
            <button 
              className="dropdown-toggle"
              onClick={toggleDropdown}
              aria-expanded={isDropdownOpen}
            >
              More
              <svg className="dropdown-arrow" width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path d="M3 4.5L6 7.5L9 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            
            {isDropdownOpen && (
              <div className="dropdown-menu">
                {dropdownLinks.map((link) => (
                  <Link 
                    key={link.href}
                    href={link.href} 
                    className={`dropdown-link ${pathname === link.href ? 'active' : ''}`}
                    onClick={() => setIsDropdownOpen(false)}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>

      </div>
    </nav>
  );
}
