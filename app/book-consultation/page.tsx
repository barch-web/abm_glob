'use client';

import React, { useState } from 'react';
import {
  CalendarCheck,
  CheckCircle2,
  Clock,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
} from 'lucide-react';
import { useCMS } from '@/components/cms/CMSContext';
import type { ConsultationBooking } from '@/lib/cms-types';

export default function BookConsultationPage() {
  const { state, submitBooking } = useCMS();
  const { content } = state;

  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [preferredDate, setPreferredDate] = useState('');
  const [preferredTime, setPreferredTime] = useState('10:00');
  const [visitorCount, setVisitorCount] = useState('1');
  const [purpose, setPurpose] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [confirmedBooking, setConfirmedBooking] =
    useState<ConsultationBooking | null>(null);

  const whatsappBase = content.whatsappNumber.replace(/\D/g, '') || '233594607188';

  const validate = () => {
    const nextErrors: Record<string, string> = {};
    if (fullName.trim().length < 2) {
      nextErrors.fullName = 'Please enter your full name or organization.';
    }
    const digits = phone.replace(/\D/g, '');
    if (digits.length < 9) {
      nextErrors.phone = 'Enter a valid Ghana or international phone number.';
    }
    if (!preferredDate) {
      nextErrors.preferredDate = 'Please select your preferred consultation date.';
    }
    if (!preferredTime) {
      nextErrors.preferredTime = 'Please select a preferred time.';
    }
    const visitors = Number(visitorCount);
    if (!Number.isFinite(visitors) || visitors < 1 || visitors > 20) {
      nextErrors.visitorCount = 'Number of visitors must be between 1 and 20.';
    }
    if (purpose.trim().length < 10) {
      nextErrors.purpose =
        'Please describe the purpose of your consultation (at least 10 characters).';
    }
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setIsSubmitting(true);
    try {
      const booking = await submitBooking({
        fullName: fullName.trim(),
        phone: phone.trim(),
        preferredDate,
        preferredTime,
        visitorCount: Number(visitorCount),
        purpose: purpose.trim(),
      });
      setConfirmedBooking(booking);
    } finally {
      setIsSubmitting(false);
    }
  };

  const buildBookingWhatsAppHref = (bk: ConsultationBooking) => {
    const message = [
      `Hello ABM Global Ltd, I have booked a company consultation.`,
      ``,
      `Reference ID: ${bk.referenceId}`,
      `Name / Organization: ${bk.fullName}`,
      `Phone: ${bk.phone}`,
      `Preferred Date: ${bk.preferredDate}`,
      `Preferred Time: ${bk.preferredTime}`,
      `Number of Visitors: ${bk.visitorCount}`,
      `Purpose of Visit: ${bk.purpose}`,
    ].join('\n');
    return `https://wa.me/${whatsappBase}?text=${encodeURIComponent(message)}`;
  };

  return (
    <div className="bg-white min-h-screen">
      {/* Header */}
      <section className="bg-[#F3EFE6] text-[#1F1A14] py-14 lg:py-16 border-b border-[#E2DAC8]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-4">
            <p className="text-xs sm:text-sm font-semibold text-[#92400E]">
              Accra Office & Technical Advisory
            </p>
            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#1F1A14]">
              {content.consultingHeading}
            </h1>
            <p className="text-base text-[#574E42] leading-relaxed">
              {content.consultingDescription}
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-14 lg:py-18">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            {/* Left: What to Expect & Office Details */}
            <div className="lg:col-span-5 space-y-6">
              <div className="bg-[#FAF8F3] border border-[#E2DAC8] rounded-xl p-6 sm:p-7 space-y-4">
                <h2 className="text-lg font-bold text-[#1F1A14]">
                  What to Expect in Your Session
                </h2>
                <ul className="space-y-3">
                  {content.consultingExpectations.map((item) => (
                    <li key={item} className="flex items-start gap-2.5 text-sm text-[#3D352B]">
                      <CheckCircle2
                        className="w-4 h-4 text-[#B45309] shrink-0 mt-0.5"
                        aria-hidden="true"
                      />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-[#231D15] text-[#FAF8F3] rounded-xl p-6 sm:p-7 space-y-4 border border-[#3E3426]">
                <h2 className="text-lg font-bold">Accra Consultation Desk</h2>
                <ul className="space-y-3 text-sm text-[#D8D0C2]">
                  <li className="flex items-start gap-2.5">
                    <MapPin className="w-4 h-4 text-[#FBBF24] shrink-0 mt-0.5" aria-hidden="true" />
                    <span>{content.address}</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <Phone className="w-4 h-4 text-[#FBBF24] shrink-0" aria-hidden="true" />
                    <a
                      href={`tel:${content.phoneTel}`}
                      className="hover:text-[#FBBF24] tabular-nums"
                    >
                      {content.phoneDisplay} ({content.phoneTel})
                    </a>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <Mail className="w-4 h-4 text-[#FBBF24] shrink-0" aria-hidden="true" />
                    <span>{content.email}</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <Clock className="w-4 h-4 text-[#FBBF24] shrink-0 mt-0.5" aria-hidden="true" />
                    <span>{content.officeHours}</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Right: Interactive Consultation Booking Form or Receipt */}
            <div className="lg:col-span-7">
              {confirmedBooking ? (
                <div className="bg-[#FAF8F3] border border-[#E2DAC8] rounded-xl p-6 sm:p-8 space-y-6">
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-7 h-7 text-[#B45309] shrink-0 mt-0.5" />
                    <div>
                      <p className="text-xs font-semibold text-[#92400E]">
                        Consultation Request Logged
                      </p>
                      <h2 className="text-2xl font-bold text-[#1F1A14] mt-1">
                        Booking Confirmation Receipt
                      </h2>
                    </div>
                  </div>

                  <div className="bg-white border border-[#E2DAC8] rounded-xl p-5 space-y-3 text-sm">
                    <div className="flex items-center justify-between border-b border-[#F0EAE0] pb-3">
                      <span className="text-[#6B5F51]">Reference ID</span>
                      <span className="font-mono-tabular font-semibold text-[#1F1A14]">
                        {confirmedBooking.referenceId}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-[#6B5F51]">Visitor / Organization</span>
                      <span className="font-semibold text-[#1F1A14] text-right">
                        {confirmedBooking.fullName}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-[#6B5F51]">Contact Phone</span>
                      <span className="font-medium text-[#1F1A14] tabular-nums">
                        {confirmedBooking.phone}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-[#6B5F51]">Preferred Slot</span>
                      <span className="font-medium text-[#1F1A14] tabular-nums">
                        {confirmedBooking.preferredDate} at {confirmedBooking.preferredTime}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-[#6B5F51]">Number of Visitors</span>
                      <span className="font-medium text-[#1F1A14] tabular-nums">
                        {confirmedBooking.visitorCount}
                      </span>
                    </div>
                    <div className="pt-2 border-t border-[#F0EAE0]">
                      <p className="text-[#6B5F51] mb-1">Purpose of Visit</p>
                      <p className="text-[#1F1A14]">{confirmedBooking.purpose}</p>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-3">
                    <a
                      href={buildBookingWhatsAppHref(confirmedBooking)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 bg-[#B45309] hover:bg-[#92400E] text-white font-semibold text-sm px-5 py-3 rounded-lg transition-colors whitespace-nowrap"
                    >
                      <MessageCircle className="w-4 h-4" aria-hidden="true" />
                      <span>Send Booking Summary to WhatsApp</span>
                    </a>

                    <button
                      type="button"
                      onClick={() => {
                        setConfirmedBooking(null);
                        setFullName('');
                        setPhone('');
                        setPreferredDate('');
                        setPurpose('');
                      }}
                      className="px-5 py-3 rounded-lg bg-white border border-[#D5CBB4] hover:border-[#B45309] text-sm font-semibold text-[#1F1A14] transition-colors"
                    >
                      Book Another Session
                    </button>
                  </div>
                </div>
              ) : (
                <form
                  onSubmit={handleSubmit}
                  noValidate
                  className="bg-[#FAF8F3] border border-[#E2DAC8] rounded-xl p-6 sm:p-8 space-y-5"
                >
                  <div className="space-y-1">
                    <h2 className="text-xl font-bold text-[#1F1A14]">
                      Schedule Your Consultation
                    </h2>
                    <p className="text-sm text-[#574E42]">
                      Receive an instant reference receipt and optional WhatsApp dispatch to our Accra desk.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div className="sm:col-span-2">
                      <label
                        htmlFor="bk-fullname"
                        className="block text-xs font-semibold text-[#1F1A14] mb-1.5"
                      >
                        Full Name / Organization *
                      </label>
                      <input
                        id="bk-fullname"
                        type="text"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        placeholder="e.g. Samuel Boateng · Horizon Academy"
                        className="w-full px-3.5 py-2.5 rounded-lg bg-white border border-[#D5CBB4] text-sm text-[#1F1A14] focus:outline-none focus:ring-2 focus:ring-[#F59E0B]"
                      />
                      {errors.fullName && (
                        <p className="mt-1 text-xs text-red-600">{errors.fullName}</p>
                      )}
                    </div>

                    <div>
                      <label
                        htmlFor="bk-phone"
                        className="block text-xs font-semibold text-[#1F1A14] mb-1.5"
                      >
                        Phone Number *
                      </label>
                      <input
                        id="bk-phone"
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="e.g. 0594607188"
                        className="w-full px-3.5 py-2.5 rounded-lg bg-white border border-[#D5CBB4] text-sm text-[#1F1A14] focus:outline-none focus:ring-2 focus:ring-[#F59E0B]"
                      />
                      {errors.phone && (
                        <p className="mt-1 text-xs text-red-600">{errors.phone}</p>
                      )}
                    </div>

                    <div>
                      <label
                        htmlFor="bk-visitors"
                        className="block text-xs font-semibold text-[#1F1A14] mb-1.5"
                      >
                        Number of Visitors *
                      </label>
                      <input
                        id="bk-visitors"
                        type="number"
                        min={1}
                        max={20}
                        value={visitorCount}
                        onChange={(e) => setVisitorCount(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-lg bg-white border border-[#D5CBB4] text-sm text-[#1F1A14] tabular-nums focus:outline-none focus:ring-2 focus:ring-[#F59E0B]"
                      />
                      {errors.visitorCount && (
                        <p className="mt-1 text-xs text-red-600">{errors.visitorCount}</p>
                      )}
                    </div>

                    <div>
                      <label
                        htmlFor="bk-date"
                        className="block text-xs font-semibold text-[#1F1A14] mb-1.5"
                      >
                        Preferred Date *
                      </label>
                      <input
                        id="bk-date"
                        type="date"
                        value={preferredDate}
                        onChange={(e) => setPreferredDate(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-lg bg-white border border-[#D5CBB4] text-sm text-[#1F1A14] focus:outline-none focus:ring-2 focus:ring-[#F59E0B]"
                      />
                      {errors.preferredDate && (
                        <p className="mt-1 text-xs text-red-600">{errors.preferredDate}</p>
                      )}
                    </div>

                    <div>
                      <label
                        htmlFor="bk-time"
                        className="block text-xs font-semibold text-[#1F1A14] mb-1.5"
                      >
                        Preferred Time *
                      </label>
                      <select
                        id="bk-time"
                        value={preferredTime}
                        onChange={(e) => setPreferredTime(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-lg bg-white border border-[#D5CBB4] text-sm text-[#1F1A14] focus:outline-none focus:ring-2 focus:ring-[#F59E0B]"
                      >
                        <option value="09:00">09:00 AM</option>
                        <option value="10:30">10:30 AM</option>
                        <option value="12:00">12:00 PM</option>
                        <option value="14:00">02:00 PM</option>
                        <option value="15:30">03:30 PM</option>
                      </select>
                      {errors.preferredTime && (
                        <p className="mt-1 text-xs text-red-600">{errors.preferredTime}</p>
                      )}
                    </div>

                    <div className="sm:col-span-2">
                      <label
                        htmlFor="bk-purpose"
                        className="block text-xs font-semibold text-[#1F1A14] mb-1.5"
                      >
                        Purpose of Visit *
                      </label>
                      <textarea
                        id="bk-purpose"
                        rows={4}
                        value={purpose}
                        onChange={(e) => setPurpose(e.target.value)}
                        placeholder="Describe what you would like to discuss (e.g., office networking rollout, CCTV camera coverage, staff IT training curriculum, or hardware sourcing)..."
                        className="w-full px-3.5 py-2.5 rounded-lg bg-white border border-[#D5CBB4] text-sm text-[#1F1A14] focus:outline-none focus:ring-2 focus:ring-[#F59E0B]"
                      />
                      {errors.purpose && (
                        <p className="mt-1 text-xs text-red-600">{errors.purpose}</p>
                      )}
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#F59E0B] hover:bg-[#D97706] disabled:opacity-60 text-[#1F1A14] font-semibold text-sm px-6 py-3.5 rounded-lg transition-colors"
                  >
                    <CalendarCheck className="w-4 h-4" aria-hidden="true" />
                    <span>
                      {isSubmitting ? 'Confirming Booking...' : 'Confirm Consultation Booking'}
                    </span>
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
