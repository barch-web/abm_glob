'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import { SiteHeader } from './SiteHeader';
import { SiteFooter } from './SiteFooter';
import { WhatsAppWidget } from './WhatsAppWidget';

export function SiteShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdmin = pathname.startsWith('/admin');

  if (isAdmin) {
    return <div className="min-h-screen bg-[#F4F6F9] text-[#0A192F]">{children}</div>;
  }

  return (
    <div className="min-h-screen flex flex-col bg-white text-[#0A192F]">
      <SiteHeader />
      <main className="flex-1">{children}</main>
      <SiteFooter />
      <WhatsAppWidget />
    </div>
  );
}
