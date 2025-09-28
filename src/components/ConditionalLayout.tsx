"use client";

import { usePathname } from 'next/navigation';
import Navbar from './sections/Navbar';
import Footer from './sections/Footer';

export default function ConditionalLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  
  // Hide main navbar on dashboard routes
  const isDashboardRoute = pathname === '/dashboard' || 
                          pathname.startsWith('/amazon/dashboard') || 
                          pathname.startsWith('/marketplace');
  
  return (
    <>
      {!isDashboardRoute && <Navbar />}
      {children}
      {!isDashboardRoute && <Footer />}
    </>
  );
}