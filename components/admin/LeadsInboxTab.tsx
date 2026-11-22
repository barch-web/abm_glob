'use client';

import React, { useMemo, useState } from 'react';
import {
  CalendarCheck,
  Inbox,
  MessageCircle,
  Search,
  Trash2,
} from 'lucide-react';
import { useCMS } from '@/components/cms/CMSContext';
import type { LeadStatus } from '@/lib/cms-types';

const STATUS_OPTIONS: ('All' | LeadStatus)[] = [
  'All',
  'Pending',
  'Contacted',
  'Resolved',
];

function statusStyle(status: LeadStatus) {
  if (status === 'Resolved') {
    return 'text-[#047857] bg-[#ECFDF5] border-[#A7F3D0]';
  }
  if (status === 'Contacted') {
    return 'text-[#B45309] bg-[#FFFBEB] border-[#FDE68A]';
  }
  return 'text-[#0A192F] bg-slate-100 border-slate-300';
}

export function LeadsInboxTab() {
  const {
    state,
    updateEnquiryStatus,
    deleteEnquiry,
    updateBookingStatus,
    deleteBooking,
  } = useCMS();

  const [view, setView] = useState<'enquiries' | 'bookings'>('enquiries');
  const [statusFilter, setStatusFilter] = useState<'All' | LeadStatus>('All');
  const [search, setSearch] = useState('');

  const whatsappBase =
    state.content.whatsappNumber.replace(/\D/g, '') || '233594607188';

  const filteredEnquiries = useMemo(() => {
    const q = search.trim().toLowerCase();
    return state.enquiries.filter((e) => {
      if (statusFilter !== 'All' && e.status !== statusFilter) return false;
      if (!q) return true;
      return (
        e.name.toLowerCase().includes(q) ||
        e.serviceName.toLowerCase().includes(q) ||
        e.location.toLowerCase().includes(q) ||
        e.referenceId.toLowerCase().includes(q) ||
        e.phone.toLowerCase().includes(q)
      );
    });
  }, [state.enquiries, statusFilter, search]);

  const filteredBookings = useMemo(() => {
    const q = search.trim().toLowerCase();
    return state.bookings.filter((b) => {
      if (statusFilter !== 'All' && b.status !== statusFilter) return false;
      if (!q) return true;
      return (
        b.fullName.toLowerCase().includes(q) ||
        b.purpose.toLowerCase().includes(q) ||
        b.referenceId.toLowerCase().includes(q) ||
        b.phone.toLowerCase().includes(q)
      );
    });
  }, [state.bookings, statusFilter, search]);

  return (
    <div className="space-y-6">
      {/* Summary Strip */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white border border-slate-200 rounded-xl p-5">
          <p className="text-xs font-medium text-slate-500">Total Enquiries</p>
          <p className="text-2xl font-bold text-[#0A192F] mt-1 tabular-nums">
            {state.enquiries.length}
          </p>
        </div>
        <div className="bg-white border border-slate-200 rounded-xl p-5">
          <p className="text-xs font-medium text-slate-500">Pending Enquiries</p>
          <p className="text-2xl font-bold text-[#D97706] mt-1 tabular-nums">
            {state.enquiries.filter((e) => e.status === 'Pending').length}
          </p>
        </div>
        <div className="bg-white border border-slate-200 rounded-xl p-5">
          <p className="text-xs font-medium text-slate-500">Consultation Bookings</p>
          <p className="text-2xl font-bold text-[#0A192F] mt-1 tabular-nums">
            {state.bookings.length}
          </p>
        </div>
        <div className="bg-white border border-slate-200 rounded-xl p-5">
          <p className="text-xs font-medium text-slate-500">Pending Consultations</p>
          <p className="text-2xl font-bold text-[#D97706] mt-1 tabular-nums">
            {state.bookings.filter((b) => b.status === 'Pending').length}
          </p>
        </div>
      </div>

      {/* Controls */}
      <div className="bg-white border border-slate-200 rounded-xl p-4 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => setView('enquiries')}
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold transition-colors whitespace-nowrap ${
              view === 'enquiries'
                ? 'bg-[#0A192F] text-white'
                : 'bg-[#F4F6F9] text-slate-700 hover:text-[#0A192F]'
            }`}
          >
            <Inbox className="w-4 h-4" aria-hidden="true" />
            <span>Business Enquiries ({state.enquiries.length})</span>
          </button>
          <button
            type="button"
            onClick={() => setView('bookings')}
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold transition-colors whitespace-nowrap ${
              view === 'bookings'
                ? 'bg-[#0A192F] text-white'
                : 'bg-[#F4F6F9] text-slate-700 hover:text-[#0A192F]'
            }`}
          >
            <CalendarCheck className="w-4 h-4" aria-hidden="true" />
            <span>Consultation Bookings ({state.bookings.length})</span>
          </button>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <div className="relative flex-1 sm:w-64">
            <Search
              className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2"
              aria-hidden="true"
            />
            <input
              type="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search name, ref ID, phone..."
              aria-label="Search leads and bookings"
              className="w-full pl-9 pr-3 py-2 rounded-lg border border-slate-200 bg-[#F4F6F9] text-xs text-[#0A192F] focus:outline-none focus:ring-2 focus:ring-[#F59E0B]"
            />
          </div>

          <div className="flex items-center gap-1 bg-[#F4F6F9] p-1 rounded-lg border border-slate-200">
            {STATUS_OPTIONS.map((st) => (
              <button
                key={st}
                type="button"
                onClick={() => setStatusFilter(st)}
                className={`px-2.5 py-1 rounded-md text-xs font-semibold transition-colors ${
                  statusFilter === st
                    ? 'bg-white text-[#0A192F] shadow-sm'
                    : 'text-slate-600 hover:text-[#0A192F]'
                }`}
              >
                {st}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Enquiries View */}
      {view === 'enquiries' && (
        <div className="space-y-4">
          {filteredEnquiries.length === 0 ? (
            <div className="bg-white border border-slate-200 rounded-xl p-10 text-center text-sm text-slate-500">
              No business enquiries match your current filter.
            </div>
          ) : (
            filteredEnquiries.map((enq) => {
              const replyText = `Hello ${enq.name}, following up on your ABM Global Ltd enquiry (${enq.referenceId}) regarding ${enq.serviceName}.`;
              const digitsOnly = enq.phone.replace(/\D/g, '');
              const normalizedPhone = digitsOnly.startsWith('0')
                ? `233${digitsOnly.slice(1)}`
                : digitsOnly || whatsappBase;

              return (
                <div
                  key={enq.id}
                  className="bg-white border border-slate-200 rounded-xl p-6 space-y-4"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
                    <div>
                      <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500">
                        <span className="font-mono-tabular font-semibold text-[#0A192F]">
                          {enq.referenceId}
                        </span>
                        <span aria-hidden="true">·</span>
                        <span className="tabular-nums">
                          {new Date(enq.createdAt).toLocaleDateString()}
                        </span>
                        <span aria-hidden="true">·</span>
                        <span>{enq.location}</span>
                      </div>
                      <h3 className="text-lg font-bold text-[#0A192F] mt-1">
                        {enq.name}
                      </h3>
                      <p className="text-xs font-semibold text-[#D97706] mt-0.5">
                        {enq.serviceName}
                      </p>
                    </div>

                    <div className="flex flex-wrap items-center gap-2">
                      <select
                        aria-label={`Update status for ${enq.referenceId}`}
                        value={enq.status}
                        onChange={(e) =>
                          updateEnquiryStatus(enq.id, e.target.value as LeadStatus)
                        }
                        className={`px-3 py-1.5 rounded-lg border text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-[#F59E0B] ${statusStyle(
                          enq.status
                        )}`}
                      >
                        <option value="Pending">Pending</option>
                        <option value="Contacted">Contacted</option>
                        <option value="Resolved">Resolved</option>
                      </select>

                      <a
                        href={`https://wa.me/${normalizedPhone}?text=${encodeURIComponent(
                          replyText
                        )}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#059669] hover:bg-[#047857] text-white text-xs font-semibold transition-colors"
                      >
                        <MessageCircle className="w-3.5 h-3.5" aria-hidden="true" />
                        <span>Reply</span>
                      </a>

                      <button
                        type="button"
                        onClick={() => deleteEnquiry(enq.id)}
                        aria-label={`Delete enquiry ${enq.referenceId}`}
                        className="p-2 rounded-lg border border-slate-200 text-slate-500 hover:text-red-600 hover:border-red-200 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                    <div>
                      <p className="text-slate-500">Contact Phone</p>
                      <p className="font-semibold text-[#0A192F] tabular-nums mt-0.5">
                        {enq.phone}
                      </p>
                    </div>
                    <div>
                      <p className="text-slate-500">Email Address</p>
                      <p className="font-semibold text-[#0A192F] break-all mt-0.5">
                        {enq.email}
                      </p>
                    </div>
                    <div>
                      <p className="text-slate-500">Expected Timeline</p>
                      <p className="font-semibold text-[#0A192F] tabular-nums mt-0.5">
                        {enq.expectedStartDate} → {enq.expectedEndDate}
                      </p>
                    </div>
                  </div>

                  <div className="bg-[#F4F6F9] rounded-lg p-4 text-sm text-slate-700 space-y-2">
                    <p>
                      <span className="font-semibold text-[#0A192F]">Scope Details: </span>
                      {enq.specificDetails}
                    </p>
                    {enq.additionalMessage && (
                      <p className="text-xs text-slate-600">
                        <span className="font-semibold text-[#0A192F]">Additional Note: </span>
                        {enq.additionalMessage}
                      </p>
                    )}
                  </div>
                </div>
              );
            })
          )}
        </div>
      )}

      {/* Bookings View */}
      {view === 'bookings' && (
        <div className="space-y-4">
          {filteredBookings.length === 0 ? (
            <div className="bg-white border border-slate-200 rounded-xl p-10 text-center text-sm text-slate-500">
              No consultation bookings match your current filter.
            </div>
          ) : (
            filteredBookings.map((bk) => {
              const replyText = `Hello ${bk.fullName}, confirming your consultation request (${bk.referenceId}) with ABM Global Ltd for ${bk.preferredDate} at ${bk.preferredTime}.`;
              const digitsOnly = bk.phone.replace(/\D/g, '');
              const normalizedPhone = digitsOnly.startsWith('0')
                ? `233${digitsOnly.slice(1)}`
                : digitsOnly || whatsappBase;

              return (
                <div
                  key={bk.id}
                  className="bg-white border border-slate-200 rounded-xl p-6 space-y-4"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
                    <div>
                      <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500">
                        <span className="font-mono-tabular font-semibold text-[#0A192F]">
                          {bk.referenceId}
                        </span>
                        <span aria-hidden="true">·</span>
                        <span className="tabular-nums">
                          Slot: {bk.preferredDate} at {bk.preferredTime}
                        </span>
                        <span aria-hidden="true">·</span>
                        <span className="tabular-nums">
                          {bk.visitorCount} {bk.visitorCount === 1 ? 'visitor' : 'visitors'}
                        </span>
                      </div>
                      <h3 className="text-lg font-bold text-[#0A192F] mt-1">
                        {bk.fullName}
                      </h3>
                    </div>

                    <div className="flex flex-wrap items-center gap-2">
                      <select
                        aria-label={`Update status for ${bk.referenceId}`}
                        value={bk.status}
                        onChange={(e) =>
                          updateBookingStatus(bk.id, e.target.value as LeadStatus)
                        }
                        className={`px-3 py-1.5 rounded-lg border text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-[#F59E0B] ${statusStyle(
                          bk.status
                        )}`}
                      >
                        <option value="Pending">Pending</option>
                        <option value="Contacted">Contacted</option>
                        <option value="Resolved">Resolved</option>
                      </select>

                      <a
                        href={`https://wa.me/${normalizedPhone}?text=${encodeURIComponent(
                          replyText
                        )}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#059669] hover:bg-[#047857] text-white text-xs font-semibold transition-colors"
                      >
                        <MessageCircle className="w-3.5 h-3.5" aria-hidden="true" />
                        <span>WhatsApp</span>
                      </a>

                      <button
                        type="button"
                        onClick={() => deleteBooking(bk.id)}
                        aria-label={`Delete booking ${bk.referenceId}`}
                        className="p-2 rounded-lg border border-slate-200 text-slate-500 hover:text-red-600 hover:border-red-200 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-6 text-xs">
                    <div>
                      <span className="text-slate-500">Phone: </span>
                      <span className="font-semibold text-[#0A192F] tabular-nums">
                        {bk.phone}
                      </span>
                    </div>
                    <div>
                      <span className="text-slate-500">Logged: </span>
                      <span className="font-medium text-[#0A192F] tabular-nums">
                        {new Date(bk.createdAt).toLocaleString()}
                      </span>
                    </div>
                  </div>

                  <div className="bg-[#F4F6F9] rounded-lg p-4 text-sm text-slate-700">
                    <span className="font-semibold text-[#0A192F]">Purpose: </span>
                    {bk.purpose}
                  </div>
                </div>
              );
            })
          )}
        </div>
      )}
    </div>
  );
}
