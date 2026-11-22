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
    return <div className="min-h-screen bg-[#FAF8F3] text-[#1F1A14]">{children}</div>;
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF8F3] text-[#1F1A14]">
      <SiteHeader />
      <main className="flex-1">{children}</main>
      <SiteFooter />
      <WhatsAppWidget />
    </div>
  );
}
