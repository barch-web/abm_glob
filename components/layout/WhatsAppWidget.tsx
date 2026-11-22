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
    <div className="fixed bottom-5 right-5 z-50 flex flex-col items-end gap-3">
      {open && (
        <div
          role="dialog"
          aria-label="WhatsApp Topic Selector"
          className="w-80 max-w-[calc(100vw-2.5rem)] bg-white border border-slate-200 rounded-xl shadow-xl overflow-hidden"
        >
          <div className="bg-[#0A192F] text-white px-4 py-3.5 flex items-center justify-between gap-3">
            <div>
              <p className="text-sm font-semibold">Chat on WhatsApp</p>
              <p className="text-xs text-slate-300">
                Select a topic to message {state.content.phoneDisplay}
              </p>
            </div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close WhatsApp menu"
              className="p-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-white/10 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="p-2 divide-y divide-slate-100">
            {WHATSAPP_TOPICS.map((topic) => (
              <a
                key={topic.label}
                href={buildHref(topic.greeting)}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setOpen(false)}
                className="flex items-center justify-between gap-2 px-3 py-2.5 rounded-lg text-sm font-medium text-[#0A192F] hover:bg-[#F4F6F9] transition-colors"
              >
                <span>{topic.label}</span>
                <ChevronRight className="w-4 h-4 text-[#059669] shrink-0" aria-hidden="true" />
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
        className="inline-flex items-center gap-2.5 bg-[#059669] hover:bg-[#047857] text-white font-semibold text-sm px-4 py-3 rounded-full shadow-lg transition-transform hover:scale-[1.02] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0A192F] whitespace-nowrap"
      >
        <MessageCircle className="w-5 h-5 shrink-0" aria-hidden="true" />
        <span className="hidden sm:inline">WhatsApp Support</span>
      </button>
    </div>
  );
}
