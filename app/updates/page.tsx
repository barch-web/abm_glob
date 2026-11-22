'use client';

import React, { useMemo, useState } from 'react';
import Link from 'next/link';
import { ArrowRight, Calendar, MapPin } from 'lucide-react';
import { useCMS } from '@/components/cms/CMSContext';
import type { AnnouncementType } from '@/lib/cms-types';

const TYPES: ('All' | AnnouncementType)[] = [
  'All',
  'Training Batch',
  'Seminar',
  'Company News',
];

export default function UpdatesPage() {
  const { state } = useCMS();
  const [selectedType, setSelectedType] = useState<'All' | AnnouncementType>('All');

  const items = useMemo(() => {
    if (selectedType === 'All') return state.announcements;
    return state.announcements.filter((a) => a.type === selectedType);
  }, [selectedType, state.announcements]);

  return (
    <div className="bg-white min-h-screen">
      {/* Header */}
      <section className="bg-[#F3EFE6] text-[#1F1A14] py-14 lg:py-16 border-b border-[#E2DAC8]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-4">
            <p className="text-xs sm:text-sm font-semibold text-[#92400E]">
              Announcements & Events
            </p>
            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#1F1A14]">
              Upcoming IT Training Batches, Seminars & Company Updates
            </h1>
            <p className="text-base text-[#574E42] leading-relaxed">
              Stay informed on cohort enrollment windows, educator workshops, and enterprise service notices from ABM Global Ltd in Accra.
            </p>
          </div>
        </div>
      </section>

      {/* Filter Bar */}
      <section className="bg-[#FAF8F3] border-b border-[#E2DAC8] py-5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-1.5 bg-white p-1 rounded-lg border border-[#E2DAC8]">
            {TYPES.map((type) => {
              const active = selectedType === type;
              return (
                <button
                  key={type}
                  type="button"
                  onClick={() => setSelectedType(type)}
                  className={`px-3.5 py-1.5 rounded-md text-xs font-semibold transition-colors whitespace-nowrap shrink-0 ${
                    active
                      ? 'bg-[#F59E0B] text-[#1F1A14]'
                      : 'text-[#574E42] hover:text-[#1F1A14] hover:bg-[#FAF8F3]'
                  }`}
                >
                  {type}
                </button>
              );
            })}
          </div>
          <p className="text-xs text-[#574E42] tabular-nums">
            Showing {items.length} {items.length === 1 ? 'update' : 'updates'}
          </p>
        </div>
      </section>

      {/* Updates Feed */}
      <section className="py-14">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          {items.length === 0 ? (
            <div className="bg-[#FAF8F3] border border-[#E2DAC8] rounded-xl p-10 text-center space-y-3">
              <p className="text-base font-semibold text-[#1F1A14]">
                No announcements published in this category right now.
              </p>
              <button
                type="button"
                onClick={() => setSelectedType('All')}
                className="px-4 py-2 rounded-lg bg-[#F59E0B] hover:bg-[#D97706] text-[#1F1A14] text-xs font-semibold transition-colors"
              >
                View All Updates
              </button>
            </div>
          ) : (
            items.map((item) => (
              <article
                key={item.id}
                className="bg-[#FAF8F3] border border-[#E2DAC8] rounded-xl p-6 sm:p-8 space-y-4"
              >
                <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs font-semibold text-[#574E42]">
                  <span className="text-[#92400E]">{item.type}</span>
                  <span aria-hidden="true">·</span>
                  <span className="inline-flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-[#B45309]" aria-hidden="true" />
                    <span>{item.date}</span>
                  </span>
                  <span aria-hidden="true">·</span>
                  <span className="inline-flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-[#B45309]" aria-hidden="true" />
                    <span>{item.location}</span>
                  </span>
                </div>

                <h2 className="text-xl sm:text-2xl font-bold text-[#1F1A14] tracking-tight">
                  {item.title}
                </h2>

                <p className="text-sm sm:text-base font-medium text-[#3D352B] leading-relaxed">
                  {item.summary}
                </p>

                <p className="text-sm text-[#574E42] leading-relaxed">
                  {item.details}
                </p>

                <div className="pt-2 flex flex-wrap items-center gap-3">
                  <Link
                    href={item.ctaHref || '/enquire'}
                    className="inline-flex items-center gap-2 bg-[#F59E0B] hover:bg-[#D97706] text-[#1F1A14] font-semibold text-xs sm:text-sm px-5 py-2.5 rounded-lg transition-colors whitespace-nowrap"
                  >
                    <span>{item.ctaLabel || 'Enquire Now'}</span>
                    <ArrowRight className="w-4 h-4" aria-hidden="true" />
                  </Link>
                  <Link
                    href="/book-consultation"
                    className="inline-flex items-center gap-2 bg-white border border-[#D5CBB4] hover:border-[#B45309] text-[#1F1A14] font-semibold text-xs sm:text-sm px-5 py-2.5 rounded-lg transition-colors whitespace-nowrap"
                  >
                    <span>Book Office Visit</span>
                  </Link>
                </div>
              </article>
            ))
          )}
        </div>
      </section>
    </div>
  );
}
