'use client'

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navigation() {
  const pathname = usePathname();

  const navLinks = [
    { href: '/', label: 'Dashboard' },
    { href: '/courses', label: 'Courses' },
    { href: '/deliverables', label: 'Deliverables' },
    { href: '/todo', label: 'To Do' },
    { href: '/schedule', label: 'Schedule' },
    { href: '/quick-links', label: 'Quick Links' },
  ];

  return (
    <nav className="main-nav">
      <div className="nav-container">
        <h1 className="nav-title">UniHUB</h1>
        <ul className="nav-links">
          {navLinks.map((link) => (
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
      </div>
    </nav>
  );
}
