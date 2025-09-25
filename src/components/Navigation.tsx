'use client'

import Link from 'next/link';
import Image from 'next/image';
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
        <Link href="/" className="nav-logo">
          <Image 
            src="/images/Logo.png" 
            alt="UniHUB Logo" 
            width={120} 
            height={40}
            priority
          />
        </Link>
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
