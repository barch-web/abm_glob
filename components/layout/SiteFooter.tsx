'use client';

import React from 'react';
import Link from 'next/link';
import { Clock, Mail, MapPin, Phone } from 'lucide-react';
import { useCMS } from '@/components/cms/CMSContext';

export function SiteFooter() {
  const { state } = useCMS();
  const { content, services } = state;

  return (
    <footer className="bg-[#231D15] text-[#EDE7DC] border-t border-[#3E3426]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Column 1: Brand Summary */}
          <div className="space-y-4">
            <Link href="/" className="inline-block text-xl font-bold text-[#FAF8F3] tracking-tight">
              {content.companyName}
            </Link>
            <p className="text-sm leading-relaxed text-[#D8D0C2]">
              {content.tagline}
            </p>
            <div className="flex flex-wrap items-center gap-4 pt-2 text-xs font-medium text-[#D8D0C2]">
              <a
                href={content.socialLinks.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#FBBF24] transition-colors"
              >
                LinkedIn
              </a>
              <span aria-hidden="true" className="text-[#5C4E3C]">·</span>
              <a
                href={content.socialLinks.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#FBBF24] transition-colors"
              >
                Facebook
              </a>
              <span aria-hidden="true" className="text-[#5C4E3C]">·</span>
              <a
                href={content.socialLinks.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#FBBF24] transition-colors"
              >
                Instagram
              </a>
              <span aria-hidden="true" className="text-[#5C4E3C]">·</span>
              <a
                href={content.socialLinks.x}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#FBBF24] transition-colors"
              >
                X
              </a>
            </div>
          </div>

          {/* Column 2: Core Services */}
          <div>
            <h3 className="text-sm font-semibold text-[#FAF8F3] mb-4">Core Services</h3>
            <ul className="space-y-2.5 text-sm">
              {services.map((srv) => (
                <li key={srv.id}>
                  <Link
                    href={`/enquire?service=${encodeURIComponent(srv.title)}`}
                    className="text-[#D8D0C2] hover:text-[#FBBF24] transition-colors"
                  >
                    {srv.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Navigation */}
          <div>
            <h3 className="text-sm font-semibold text-[#FAF8F3] mb-4">Company & Portals</h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/about" className="text-[#D8D0C2] hover:text-[#FBBF24] transition-colors">
                  About Us & Mission
                </Link>
              </li>
              <li>
                <Link href="/services" className="text-[#D8D0C2] hover:text-[#FBBF24] transition-colors">
                  Detailed Service Guide
                </Link>
              </li>
              <li>
                <Link href="/gallery" className="text-[#D8D0C2] hover:text-[#FBBF24] transition-colors">
                  Works & Project Gallery
                </Link>
              </li>
              <li>
                <Link href="/updates" className="text-[#D8D0C2] hover:text-[#FBBF24] transition-colors">
                  Training Batches & Updates
                </Link>
              </li>
              <li>
                <Link href="/book-consultation" className="text-[#D8D0C2] hover:text-[#FBBF24] transition-colors">
                  Book a Consultation
                </Link>
              </li>
              <li>
                <Link href="/enquire" className="text-[#D8D0C2] hover:text-[#FBBF24] transition-colors">
                  Request a Quote
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Accra Contact Info */}
          <div>
            <h3 className="text-sm font-semibold text-[#FAF8F3] mb-4">Accra Office & Support</h3>
            <ul className="space-y-3 text-sm text-[#D8D0C2]">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#F59E0B] shrink-0 mt-0.5" aria-hidden="true" />
                <span>{content.address}</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#F59E0B] shrink-0" aria-hidden="true" />
                <a
                  href={`tel:${content.phoneTel}`}
                  className="hover:text-[#FBBF24] transition-colors tabular-nums"
                >
                  {content.phoneDisplay} ({content.phoneTel})
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#F59E0B] shrink-0" aria-hidden="true" />
                <a
                  href={`mailto:${content.email}`}
                  className="hover:text-[#FBBF24] transition-colors break-all"
                >
                  {content.email}
                </a>
              </li>
              <li className="flex items-start gap-2.5">
                <Clock className="w-4 h-4 text-[#F59E0B] shrink-0 mt-0.5" aria-hidden="true" />
                <span>{content.officeHours}</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#BEB3A1]">
          <p>
            © {new Date().getFullYear()} {content.companyName}. Registered IT Training & Solutions Provider, Accra, Ghana.
          </p>
          <Link
            href="/admin"
            className="text-[#BEB3A1] hover:text-[#FBBF24] transition-colors whitespace-nowrap"
          >
            Admin Portal
          </Link>
        </div>
      </div>
    </footer>
  );
}
