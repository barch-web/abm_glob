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
      <section className="bg-[#0A192F] text-white py-14 lg:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-4">
            <p className="text-xs sm:text-sm font-semibold text-[#F59E0B]">
              Announcements & Events
            </p>
            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">
              Upcoming IT Training Batches, Seminars & Company Updates
            </h1>
            <p className="text-base text-slate-300 leading-relaxed">
              Stay informed on cohort enrollment windows, educator workshops, and enterprise service notices from ABM Global Ltd in Accra.
            </p>
          </div>
        </div>
      </section>

      {/* Filter Bar */}
      <section className="bg-[#F4F6F9] border-b border-slate-200 py-5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-1.5 bg-white p-1 rounded-lg border border-slate-200">
            {TYPES.map((type) => {
              const active = selectedType === type;
              return (
                <button
                  key={type}
                  type="button"
                  onClick={() => setSelectedType(type)}
                  className={`px-3.5 py-1.5 rounded-md text-xs font-semibold transition-colors whitespace-nowrap shrink-0 ${
                    active
                      ? 'bg-[#0A192F] text-white'
                      : 'text-slate-600 hover:text-[#0A192F] hover:bg-slate-100'
                  }`}
                >
                  {type}
                </button>
              );
            })}
          </div>
          <p className="text-xs text-slate-500 tabular-nums">
            Showing {items.length} {items.length === 1 ? 'update' : 'updates'}
          </p>
        </div>
      </section>

      {/* Updates Feed */}
      <section className="py-14">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          {items.length === 0 ? (
            <div className="bg-[#F4F6F9] border border-slate-200 rounded-xl p-10 text-center space-y-3">
              <p className="text-base font-semibold text-[#0A192F]">
                No announcements published in this category right now.
              </p>
              <button
                type="button"
                onClick={() => setSelectedType('All')}
                className="px-4 py-2 rounded-lg bg-[#0A192F] text-white text-xs font-semibold"
              >
                View All Updates
              </button>
            </div>
          ) : (
            items.map((item) => (
              <article
                key={item.id}
                className="bg-[#F4F6F9] border border-slate-200 rounded-xl p-6 sm:p-8 space-y-4"
              >
                <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs font-semibold text-slate-500">
                  <span className="text-[#D97706]">{item.type}</span>
                  <span aria-hidden="true">·</span>
                  <span className="inline-flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5" aria-hidden="true" />
                    <span>{item.date}</span>
                  </span>
                  <span aria-hidden="true">·</span>
                  <span className="inline-flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5" aria-hidden="true" />
                    <span>{item.location}</span>
                  </span>
                </div>

                <h2 className="text-xl sm:text-2xl font-bold text-[#0A192F] tracking-tight">
                  {item.title}
                </h2>

                <p className="text-sm sm:text-base font-medium text-slate-700 leading-relaxed">
                  {item.summary}
                </p>

                <p className="text-sm text-slate-600 leading-relaxed">
                  {item.details}
                </p>

                <div className="pt-2 flex flex-wrap items-center gap-3">
                  <Link
                    href={item.ctaHref || '/enquire'}
                    className="inline-flex items-center gap-2 bg-[#F59E0B] hover:bg-[#D97706] text-[#0A192F] font-semibold text-xs sm:text-sm px-5 py-2.5 rounded-lg transition-colors whitespace-nowrap"
                  >
                    <span>{item.ctaLabel || 'Enquire Now'}</span>
                    <ArrowRight className="w-4 h-4" aria-hidden="true" />
                  </Link>
                  <Link
                    href="/book-consultation"
                    className="inline-flex items-center gap-2 border border-slate-300 hover:border-[#0A192F] text-[#0A192F] font-semibold text-xs sm:text-sm px-5 py-2.5 rounded-lg transition-colors whitespace-nowrap"
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
