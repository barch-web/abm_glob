'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowRight, Check, MessageCircle } from 'lucide-react';
import { useCMS } from '@/components/cms/CMSContext';
import type { AudienceSegment } from '@/lib/cms-types';
import { SafeImage } from '@/components/ui/SafeImage';

const AUDIENCES: ('All' | AudienceSegment)[] = [
  'All',
  'Individuals',
  'Students',
  'IT Educators',
  'Groups',
  'Organizations',
];

export default function ServicesPage() {
  const { state } = useCMS();
  const [selectedAudience, setSelectedAudience] = useState<'All' | AudienceSegment>('All');

  const whatsappBase = state.content.whatsappNumber.replace(/\D/g, '') || '233594607188';

  const filteredServices =
    selectedAudience === 'All'
      ? state.services
      : state.services.filter((s) => s.audiences.includes(selectedAudience));

  return (
    <div className="bg-white">
      {/* Header */}
      <section className="bg-[#F3EFE6] text-[#1F1A14] py-14 lg:py-16 border-b border-[#E2DAC8]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-4">
            <p className="text-xs sm:text-sm font-semibold text-[#92400E]">
              Core Services & Technical Solutions
            </p>
            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#1F1A14]">
              Six Specialized IT Pillars Designed for Individuals, Educators & Enterprises
            </h1>
            <p className="text-base text-[#574E42] leading-relaxed">
              Filter by who you are to inspect deliverables, outcomes, and request a pre-filled quotation or instant WhatsApp advisory.
            </p>
          </div>
        </div>
      </section>

      {/* Audience Filter Bar */}
      <section className="bg-[#FAF8F3] border-b border-[#E2DAC8] py-5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <span className="text-xs font-semibold text-[#1F1A14]">
            Filter Services by Audience:
          </span>
          <div
            role="tablist"
            aria-label="Audience segment filter"
            className="flex flex-wrap items-center gap-1.5 bg-white p-1 rounded-lg border border-[#E2DAC8]"
          >
            {AUDIENCES.map((aud) => {
              const active = selectedAudience === aud;
              return (
                <button
                  key={aud}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  onClick={() => setSelectedAudience(aud)}
                  className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-colors whitespace-nowrap shrink-0 ${
                    active
                      ? 'bg-[#F59E0B] text-[#1F1A14]'
                      : 'text-[#574E42] hover:text-[#1F1A14] hover:bg-[#FAF8F3]'
                  }`}
                >
                  {aud}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Services Detailed List */}
      <section className="py-14 lg:py-18">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          {filteredServices.map((service) => {
            const waText = `Hello ABM Global Ltd, I would like to enquire about ${service.title}${
              selectedAudience !== 'All' ? ` for ${selectedAudience}` : ''
            }.`;
            const waUrl = `https://wa.me/${whatsappBase}?text=${encodeURIComponent(waText)}`;

            return (
              <article
                key={service.id}
                className="bg-[#FAF8F3] border border-[#E2DAC8] rounded-xl overflow-hidden grid grid-cols-1 lg:grid-cols-12 items-stretch"
              >
                <div className="lg:col-span-5 min-h-[240px] bg-[#EFE8D8]">
                  <SafeImage
                    src={service.imageUrl}
                    alt={service.title}
                    className="w-full h-full object-cover"
                    fallbackTitle={service.title}
                  />
                </div>

                <div className="lg:col-span-7 p-6 sm:p-8 flex flex-col justify-between space-y-6">
                  <div className="space-y-4">
                    <div className="flex flex-wrap items-center gap-2 text-xs font-semibold text-[#574E42] tabular-nums">
                      <span className="text-[#92400E]">{service.code}.</span>
                      <span aria-hidden="true">·</span>
                      <span className="text-[#B45309]">{service.outcomeMetric}</span>
                      <span aria-hidden="true">·</span>
                      <span>For {service.audiences.join(', ')}</span>
                    </div>

                    <h2 className="text-2xl font-bold text-[#1F1A14] tracking-tight">
                      {service.title}
                    </h2>

                    <p className="text-sm sm:text-base text-[#3D352B] leading-relaxed">
                      {service.description}
                    </p>

                    <div className="pt-2">
                      <h3 className="text-xs font-semibold text-[#574E42] mb-3">
                        Key Deliverables & Scope
                      </h3>
                      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                        {service.deliverables.map((del) => (
                          <li
                            key={del}
                            className="flex items-start gap-2 text-sm text-[#3D352B]"
                          >
                            <Check
                              className="w-4 h-4 text-[#B45309] shrink-0 mt-0.5"
                              aria-hidden="true"
                            />
                            <span>{del}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-[#E2DAC8] flex flex-wrap items-center gap-3">
                    <Link
                      href={`/enquire?service=${encodeURIComponent(service.title)}`}
                      className="inline-flex items-center gap-2 bg-[#F59E0B] hover:bg-[#D97706] text-[#1F1A14] font-semibold text-sm px-5 py-2.5 rounded-lg transition-colors whitespace-nowrap"
                    >
                      <span>Request Quote for This Service</span>
                      <ArrowRight className="w-4 h-4" aria-hidden="true" />
                    </Link>

                    <a
                      href={waUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 bg-[#047857] hover:bg-[#065F46] text-white font-semibold text-sm px-5 py-2.5 rounded-lg transition-colors whitespace-nowrap"
                    >
                      <MessageCircle className="w-4 h-4" aria-hidden="true" />
                      <span>Chat on WhatsApp</span>
                    </a>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </section>
    </div>
  );
}
