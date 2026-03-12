'use client';

import { usePathname } from 'next/navigation';
import { useEffect } from 'react';

export default function Template({ children }) {
  const pathname = usePathname();

  useEffect(() => {
    if (pathname) {
    }
  }, [pathname]);

  return children;
}
