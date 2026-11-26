'use client';

import React, { useState } from 'react';
import { ChevronRight, MessageCircle, X } from 'lucide-react';
import { useCMS } from '@/components/cms/CMSContext';

const WHATSAPP_TOPICS = [
  {
    label: 'Computer Training',
    greeting:
      'Hello ABM Global Ltd, I would like to enquire about Basic & General Knowledge IT Training cohorts and schedules.',
  },
  {
    label: 'Networking & Troubleshooting',
    greeting:
      'Hello ABM Global Ltd, I need assistance with Computer Networking, office cabling, or network troubleshooting.',
  },
  {
    label: 'IT Auditing',
    greeting:
      'Hello ABM Global Ltd, our organization would like to schedule an IT Infrastructure Audit.',
  },
  {
    label: 'CCTV & Surveillance',
    greeting:
      'Hello ABM Global Ltd, I am interested in CCTV & Surveillance Systems installation or technical training.',
  },
  {
    label: 'Hardware Procurement',
    greeting:
      'Hello ABM Global Ltd, I would like a quote for sourcing computers, networking hardware, or genuine IT accessories.',
  },
  {
    label: 'General Enquiries',
    greeting:
      'Hello ABM Global Ltd, I have a general enquiry regarding your IT support and consultancy services in Accra.',
  },
];

export function WhatsAppWidget() {
  const { state } = useCMS();
  const [open, setOpen] = useState(false);

  const whatsappNumber = state.content.whatsappNumber.replace(/\D/g, '') || '233594607188';

  const buildHref = (greeting: string) =>
    `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(greeting)}`;

  return (
    <div className="fixed bottom-5 left-1/2 -translate-x-1/2 z-50 flex flex-col items-center gap-3">
      {open && (
        <div
          role="dialog"
          aria-label="WhatsApp Topic Selector"
          className="w-80 max-w-[calc(100vw-2rem)] bg-[#FAF8F3] border border-[#E2DAC8] rounded-xl shadow-xl overflow-hidden"
        >
          <div className="bg-[#065F46] text-white px-4 py-3.5 flex items-center justify-between gap-3">
            <div>
              <p className="text-sm font-semibold">Chat on WhatsApp</p>
              <p className="text-xs text-[#A7F3D0]">
                Select a topic to message {state.content.phoneDisplay}
              </p>
            </div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close WhatsApp menu"
              className="p-1.5 rounded-lg text-[#D1FAE5] hover:text-white hover:bg-white/10 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="p-2 divide-y divide-[#E2DAC8]/70">
            {WHATSAPP_TOPICS.map((topic) => (
              <a
                key={topic.label}
                href={buildHref(topic.greeting)}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setOpen(false)}
                className="flex items-center justify-between gap-2 px-3 py-2.5 rounded-lg text-sm font-medium text-[#1F1A14] hover:bg-[#F3EFE6] transition-colors"
              >
                <span>{topic.label}</span>
                <ChevronRight className="w-4 h-4 text-[#047857] shrink-0" aria-hidden="true" />
              </a>
            ))}
          </div>
        </div>
      )}

      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        aria-expanded={open}
        aria-label="Open WhatsApp support topics"
        className="inline-flex items-center gap-2.5 bg-[#047857] hover:bg-[#065F46] text-white font-semibold text-sm px-5 py-3 rounded-full shadow-lg border border-[#34D399]/60 transition-transform hover:scale-[1.02] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1F1A14] whitespace-nowrap"
      >
        <MessageCircle className="w-5 h-5 shrink-0 text-[#ECFDF5]" aria-hidden="true" />
        <span className="sm:hidden">WhatsApp</span>
        <span className="hidden sm:inline">WhatsApp Support</span>
      </button>
    </div>
  );
}
