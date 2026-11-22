'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, Phone, X } from 'lucide-react';
import { useCMS } from '@/components/cms/CMSContext';

const NAV_LINKS = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/services', label: 'Services' },
  { href: '/gallery', label: 'Gallery' },
  { href: '/updates', label: 'Updates' },
  { href: '/book-consultation', label: 'Consult' },
  { href: '/enquire', label: 'Enquire' },
];

export function SiteHeader() {
  const pathname = usePathname();
  const { state } = useCMS();
  const [mobileOpen, setMobileOpen] = useState(false);

  const { companyName, phoneDisplay, phoneTel } = state.content;

  return (
    <header className="sticky top-0 z-40 bg-[#0A192F] text-white border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-8">
        {/* Zone 1: Single-line Brand Wordmark */}
        <Link
          href="/"
          className="text-lg sm:text-xl font-bold tracking-tight text-white whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F59E0B] rounded"
        >
          {companyName}
        </Link>

        {/* Zone 2: Clean single-line Navigation Links */}
        <nav
          aria-label="Primary Navigation"
          className="hidden lg:flex items-center gap-6 text-sm font-medium"
        >
          {NAV_LINKS.map((item) => {
            const isActive =
              item.href === '/'
                ? pathname === '/'
                : pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`whitespace-nowrap shrink-0 py-1 transition-colors border-b-2 ${
                  isActive
                    ? 'text-[#F59E0B] border-[#F59E0B]'
                    : 'text-slate-200 border-transparent hover:text-white hover:border-white/40'
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Zone 3: Single Primary Action + Mobile Menu Trigger */}
        <div className="flex items-center gap-3 shrink-0">
          <a
            href={`tel:${phoneTel}`}
            className="inline-flex items-center gap-2 bg-[#F59E0B] hover:bg-[#D97706] text-[#0A192F] font-semibold text-xs sm:text-sm px-3.5 sm:px-4 py-2.5 rounded-lg transition-colors whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
          >
            <Phone className="w-4 h-4 shrink-0" aria-hidden="true" />
            <span>Call Us: {phoneDisplay}</span>
          </a>

          <button
            type="button"
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-expanded={mobileOpen}
            aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
            className="lg:hidden inline-flex items-center justify-center w-11 h-11 rounded-lg border border-white/15 text-white hover:bg-white/10 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F59E0B]"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileOpen && (
        <nav
          aria-label="Mobile Navigation"
          className="lg:hidden bg-[#0A192F] border-t border-white/10 px-4 py-4 space-y-1"
        >
          {NAV_LINKS.map((item) => {
            const isActive =
              item.href === '/'
                ? pathname === '/'
                : pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className={`block px-3 py-3 rounded-lg text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-white/10 text-[#F59E0B]'
                    : 'text-slate-200 hover:bg-white/5 hover:text-white'
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
      )}
    </header>
  );
}
