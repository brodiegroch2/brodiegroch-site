'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navigation() {
  const pathname = usePathname();

  const isActive = (path: string) => {
    if (path === "/" && pathname === "/") return true;
    if (path !== "/" && pathname.startsWith(path)) return true;
    return false;
  };

  const getLinkClasses = (path: string) => {
    const baseClasses = "transition-colors duration-200";
    const activeClasses = "text-blue-600 dark:text-blue-400 font-semibold";
    const inactiveClasses = "text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400";
    
    return `${baseClasses} ${isActive(path) ? activeClasses : inactiveClasses}`;
  };

  return (
    <nav className="fixed top-0 w-full bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm z-50 border-b border-gray-200 dark:border-gray-800">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="font-bold text-lg">
            Brodie Groch
          </Link>
          <div className="hidden md:flex space-x-8">
            <Link href="/" className={getLinkClasses("/")}>
              Home
            </Link>
            <Link href="/about" className={getLinkClasses("/about")}>
              About
            </Link>
            <Link href="/essays" className={getLinkClasses("/essays")}>
              Insights
            </Link>
            <Link href="/contact" className={getLinkClasses("/contact")}>
              Contact
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
} 