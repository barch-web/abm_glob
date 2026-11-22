'use client';

import React, { Suspense, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { CheckCircle2, MessageCircle, Send } from 'lucide-react';
import { useCMS } from '@/components/cms/CMSContext';
import type { BusinessEnquiry } from '@/lib/cms-types';

function EnquireFormContent() {
  const searchParams = useSearchParams();
  const { state, submitEnquiry } = useCMS();

  const serviceOptions = [
    ...state.services.map((s) => s.title),
    'General Enquiry',
  ];

  const initialServiceParam = searchParams.get('service');

  const [name, setName] = useState('');
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const serviceName =
    selectedService ??
    (initialServiceParam && serviceOptions.includes(initialServiceParam)
      ? initialServiceParam
      : serviceOptions[0]);
  const [expectedStartDate, setExpectedStartDate] = useState('');
  const [expectedEndDate, setExpectedEndDate] = useState('');
  const [specificDetails, setSpecificDetails] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [location, setLocation] = useState('');
  const [additionalMessage, setAdditionalMessage] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedEnquiry, setSubmittedEnquiry] =
    useState<BusinessEnquiry | null>(null);
  const [whatsappUrl, setWhatsappUrl] = useState<string>('');

  const whatsappBase =
    state.content.whatsappNumber.replace(/\D/g, '') || '233594607188';

  const buildWhatsAppHref = (enq: BusinessEnquiry) => {
    const lines = [
      `NEW BUSINESS ENQUIRY — ABM GLOBAL LTD`,
      `Reference ID: ${enq.referenceId}`,
      ``,
      `Name / Organization: ${enq.name}`,
      `Service / Solution: ${enq.serviceName}`,
      `Expected Start Date: ${enq.expectedStartDate}`,
      `Expected End Date: ${enq.expectedEndDate}`,
      `Location (City/Area): ${enq.location}`,
      `Phone: ${enq.phone}`,
      `Email: ${enq.email}`,
      ``,
      `Specific Service Details:`,
      enq.specificDetails,
      enq.additionalMessage ? `\nAdditional Message:\n${enq.additionalMessage}` : '',
    ]
      .filter(Boolean)
      .join('\n');

    return `https://wa.me/${whatsappBase}?text=${encodeURIComponent(lines)}`;
  };

  const validate = () => {
    const next: Record<string, string> = {};
    if (name.trim().length < 2) {
      next.name = 'Please enter your individual, group, or organization name.';
    }
    if (!serviceName) {
      next.serviceName = 'Please select a service or solution.';
    }
    if (!expectedStartDate) {
      next.expectedStartDate = 'Please choose an expected start date.';
    }
    if (!expectedEndDate) {
      next.expectedEndDate = 'Please choose an expected end date.';
    } else if (expectedStartDate && expectedEndDate < expectedStartDate) {
      next.expectedEndDate = 'End date cannot be earlier than start date.';
    }
    if (specificDetails.trim().length < 10) {
      next.specificDetails =
        'Please specify the scope, number of trainees/workstations, or equipment needed.';
    }
    if (phone.replace(/\D/g, '').length < 9) {
      next.phone = 'Please enter a valid contact phone number.';
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      next.email = 'Please enter a valid email address.';
    }
    if (location.trim().length < 2) {
      next.location = 'Please enter your city or area in Ghana (e.g., East Legon, Accra).';
    }
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setIsSubmitting(true);
    try {
      const created = await submitEnquiry({
        name: name.trim(),
        serviceName,
        expectedStartDate,
        expectedEndDate,
        specificDetails: specificDetails.trim(),
        phone: phone.trim(),
        email: email.trim(),
        location: location.trim(),
        additionalMessage: additionalMessage.trim(),
      });
      const waHref = buildWhatsAppHref(created);
      setSubmittedEnquiry(created);
      setWhatsappUrl(waHref);

      // Automatically trigger WhatsApp handoff in a new tab via anchor element
      const anchor = document.createElement('a');
      anchor.href = waHref;
      anchor.target = '_blank';
      anchor.rel = 'noopener noreferrer';
      document.body.appendChild(anchor);
      anchor.click();
      document.body.removeChild(anchor);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submittedEnquiry) {
    return (
      <div className="bg-[#F4F6F9] border border-slate-200 rounded-xl p-6 sm:p-10 space-y-6">
        <div className="flex items-start gap-3">
          <CheckCircle2 className="w-8 h-8 text-[#059669] shrink-0 mt-0.5" />
          <div>
            <p className="text-xs font-semibold text-[#059669]">
              Enquiry Saved & Formatted for WhatsApp
            </p>
            <h2 className="text-2xl font-bold text-[#0A192F] mt-1">
              Thank You — Your Quote Request Is Ready
            </h2>
            <p className="text-sm text-slate-600 mt-1">
              Your enquiry has been recorded in our system. If WhatsApp did not open automatically due to browser popup rules, click the green button below to send your pre-filled details immediately.
            </p>
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-5 space-y-3 text-sm">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <span className="text-slate-500">Reference ID</span>
            <span className="font-mono-tabular font-semibold text-[#0A192F]">
              {submittedEnquiry.referenceId}
            </span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <p className="text-xs text-slate-500">Client / Organization</p>
              <p className="font-semibold text-[#0A192F]">{submittedEnquiry.name}</p>
            </div>
            <div>
              <p className="text-xs text-slate-500">Selected Service</p>
              <p className="font-semibold text-[#0A192F]">{submittedEnquiry.serviceName}</p>
            </div>
            <div>
              <p className="text-xs text-slate-500">Target Timeline</p>
              <p className="font-medium text-[#0A192F] tabular-nums">
                {submittedEnquiry.expectedStartDate} → {submittedEnquiry.expectedEndDate}
              </p>
            </div>
            <div>
              <p className="text-xs text-slate-500">Location & Contact</p>
              <p className="font-medium text-[#0A192F]">
                {submittedEnquiry.location} · {submittedEnquiry.phone}
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-[#059669] hover:bg-[#047857] text-white font-semibold text-sm px-6 py-3.5 rounded-lg transition-colors whitespace-nowrap"
          >
            <MessageCircle className="w-4 h-4" aria-hidden="true" />
            <span>Open WhatsApp With Pre-Filled Enquiry</span>
          </a>

          <button
            type="button"
            onClick={() => {
              setSubmittedEnquiry(null);
              setName('');
              setSpecificDetails('');
              setAdditionalMessage('');
            }}
            className="px-5 py-3.5 rounded-lg border border-slate-300 hover:border-[#0A192F] text-sm font-semibold text-[#0A192F] transition-colors"
          >
            Submit Another Enquiry
          </button>
        </div>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="bg-[#F4F6F9] border border-slate-200 rounded-xl p-6 sm:p-8 space-y-6"
    >
      <div className="space-y-1">
        <h2 className="text-xl sm:text-2xl font-bold text-[#0A192F]">
          Online Business Enquiry & Quote Form
        </h2>
        <p className="text-sm text-slate-600">
          Complete all required fields below. Submitting saves your request and routes a pre-filled summary straight to our Accra WhatsApp desk.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label
            htmlFor="enq-name"
            className="block text-xs font-semibold text-[#0A192F] mb-1.5"
          >
            Individual / Group / Organization Name *
          </label>
          <input
            id="enq-name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g. Apex Builders Ghana Ltd"
            className="w-full px-3.5 py-2.5 rounded-lg bg-white border border-slate-300 text-sm text-[#0A192F] focus:outline-none focus:ring-2 focus:ring-[#F59E0B]"
          />
          {errors.name && <p className="mt-1 text-xs text-red-600">{errors.name}</p>}
        </div>

        <div>
          <label
            htmlFor="enq-service"
            className="block text-xs font-semibold text-[#0A192F] mb-1.5"
          >
            Service / Solution / Product Name *
          </label>
          <select
            id="enq-service"
            value={serviceName}
            onChange={(e) => setSelectedService(e.target.value)}
            className="w-full px-3.5 py-2.5 rounded-lg bg-white border border-slate-300 text-sm text-[#0A192F] focus:outline-none focus:ring-2 focus:ring-[#F59E0B]"
          >
            {serviceOptions.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
          {errors.serviceName && (
            <p className="mt-1 text-xs text-red-600">{errors.serviceName}</p>
          )}
        </div>

        <div>
          <label
            htmlFor="enq-start"
            className="block text-xs font-semibold text-[#0A192F] mb-1.5"
          >
            Expected Start Date *
          </label>
          <input
            id="enq-start"
            type="date"
            value={expectedStartDate}
            onChange={(e) => setExpectedStartDate(e.target.value)}
            className="w-full px-3.5 py-2.5 rounded-lg bg-white border border-slate-300 text-sm text-[#0A192F] focus:outline-none focus:ring-2 focus:ring-[#F59E0B]"
          />
          {errors.expectedStartDate && (
            <p className="mt-1 text-xs text-red-600">{errors.expectedStartDate}</p>
          )}
        </div>

        <div>
          <label
            htmlFor="enq-end"
            className="block text-xs font-semibold text-[#0A192F] mb-1.5"
          >
            Expected End Date *
          </label>
          <input
            id="enq-end"
            type="date"
            value={expectedEndDate}
            onChange={(e) => setExpectedEndDate(e.target.value)}
            className="w-full px-3.5 py-2.5 rounded-lg bg-white border border-slate-300 text-sm text-[#0A192F] focus:outline-none focus:ring-2 focus:ring-[#F59E0B]"
          />
          {errors.expectedEndDate && (
            <p className="mt-1 text-xs text-red-600">{errors.expectedEndDate}</p>
          )}
        </div>

        <div>
          <label
            htmlFor="enq-phone"
            className="block text-xs font-semibold text-[#0A192F] mb-1.5"
          >
            Contact Phone Number *
          </label>
          <input
            id="enq-phone"
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="e.g. 0594607188"
            className="w-full px-3.5 py-2.5 rounded-lg bg-white border border-slate-300 text-sm text-[#0A192F] focus:outline-none focus:ring-2 focus:ring-[#F59E0B]"
          />
          {errors.phone && <p className="mt-1 text-xs text-red-600">{errors.phone}</p>}
        </div>

        <div>
          <label
            htmlFor="enq-email"
            className="block text-xs font-semibold text-[#0A192F] mb-1.5"
          >
            Email Address *
          </label>
          <input
            id="enq-email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="e.g. procurement@company.com"
            className="w-full px-3.5 py-2.5 rounded-lg bg-white border border-slate-300 text-sm text-[#0A192F] focus:outline-none focus:ring-2 focus:ring-[#F59E0B]"
          />
          {errors.email && <p className="mt-1 text-xs text-red-600">{errors.email}</p>}
        </div>

        <div className="sm:col-span-2">
          <label
            htmlFor="enq-location"
            className="block text-xs font-semibold text-[#0A192F] mb-1.5"
          >
            Location (City / Area) *
          </label>
          <input
            id="enq-location"
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="e.g. East Legon, Accra or Community 6, Tema"
            className="w-full px-3.5 py-2.5 rounded-lg bg-white border border-slate-300 text-sm text-[#0A192F] focus:outline-none focus:ring-2 focus:ring-[#F59E0B]"
          />
          {errors.location && (
            <p className="mt-1 text-xs text-red-600">{errors.location}</p>
          )}
        </div>

        <div className="sm:col-span-2">
          <label
            htmlFor="enq-details"
            className="block text-xs font-semibold text-[#0A192F] mb-1.5"
          >
            Specific Service Details *
          </label>
          <textarea
            id="enq-details"
            rows={4}
            value={specificDetails}
            onChange={(e) => setSpecificDetails(e.target.value)}
            placeholder="Specify number of participants, network ports, CCTV cameras, hardware models, or audit scope..."
            className="w-full px-3.5 py-2.5 rounded-lg bg-white border border-slate-300 text-sm text-[#0A192F] focus:outline-none focus:ring-2 focus:ring-[#F59E0B]"
          />
          {errors.specificDetails && (
            <p className="mt-1 text-xs text-red-600">{errors.specificDetails}</p>
          )}
        </div>

        <div className="sm:col-span-2">
          <label
            htmlFor="enq-message"
            className="block text-xs font-semibold text-[#0A192F] mb-1.5"
          >
            Additional Message (Optional)
          </label>
          <textarea
            id="enq-message"
            rows={3}
            value={additionalMessage}
            onChange={(e) => setAdditionalMessage(e.target.value)}
            placeholder="Any preferred inspection times, budget guidelines, or special access notes..."
            className="w-full px-3.5 py-2.5 rounded-lg bg-white border border-slate-300 text-sm text-[#0A192F] focus:outline-none focus:ring-2 focus:ring-[#F59E0B]"
          />
        </div>
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#F59E0B] hover:bg-[#D97706] disabled:opacity-60 text-[#0A192F] font-semibold text-sm px-7 py-3.5 rounded-lg transition-colors"
      >
        <Send className="w-4 h-4" aria-hidden="true" />
        <span>
          {isSubmitting ? 'Submitting Enquiry...' : 'Submit Enquiry & Open WhatsApp'}
        </span>
      </button>
    </form>
  );
}

export default function EnquirePage() {
  return (
    <div className="bg-white min-h-screen">
      <section className="bg-[#0A192F] text-white py-14 lg:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-4">
            <p className="text-xs sm:text-sm font-semibold text-[#F59E0B]">
              Request a Technical Quotation
            </p>
            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">
              Enquire or Get a Custom Service Quote
            </h1>
            <p className="text-base text-slate-300 leading-relaxed">
              Submit your project, training, or procurement specifications below for immediate confirmation and direct WhatsApp coordination with our Accra engineering desk.
            </p>
          </div>
        </div>
      </section>

      <section className="py-14 lg:py-18">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Suspense
            fallback={
              <div className="bg-[#F4F6F9] border border-slate-200 rounded-xl p-8 text-sm text-slate-600">
                Loading enquiry form...
              </div>
            }
          >
            <EnquireFormContent />
          </Suspense>
        </div>
      </section>
    </div>
  );
}
