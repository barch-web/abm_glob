'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'motion/react';
import {
  ArrowRight,
  CalendarCheck,
  CheckCircle2,
  MessageCircle,
  Phone,
  ShieldCheck,
  Wrench,
} from 'lucide-react';
import { useCMS } from '@/components/cms/CMSContext';
import { SafeImage } from '@/components/ui/SafeImage';

const VALUE_PILLARS = [
  {
    code: '01',
    problem: 'Abandoned After Installation?',
    solution: 'Dedicated After-Sales Support',
    detail:
      'Every network, workstation, and surveillance rollout includes documented handover notes and responsive Accra-based follow-up care.',
  },
  {
    code: '02',
    problem: 'Overpriced Vendor Guesswork?',
    solution: 'Affordable, Honest Consultancy',
    detail:
      'Clear infrastructure audits and transparent scope breakdowns tailored to your actual operational needs and budget.',
  },
  {
    code: '03',
    problem: 'Theory Without Job Readiness?',
    solution: '100% Practical Lab Training',
    detail:
      'Individuals, students, and IT educators train directly on real switches, patch panels, diagnostic benches, and live systems.',
  },
  {
    code: '04',
    problem: 'Risk of Counterfeit Hardware?',
    solution: 'Verified Sourcing & Procurement',
    detail:
      'Genuine business laptops, UPS units, and network hardware with serial verification, pre-delivery imaging, and local warranty handling.',
  },
];

export function HomeView() {
  const { state } = useCMS();
  const { content, services, gallery, announcements } = state;

  const whatsappBase = content.whatsappNumber.replace(/\D/g, '') || '233594607188';
  const featuredGallery = gallery.slice(0, 3);
  const featuredAnnouncements = announcements.slice(0, 3);

  return (
    <div>
      {/* 1. HERO SECTION (Milky Primary Surface + Gold Secondary CTAs) */}
      <section className="bg-[#F3EFE6] text-[#1F1A14] border-b border-[#E2DAC8]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 lg:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-stretch">
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="lg:col-span-6 flex flex-col justify-center space-y-6"
            >
              <p className="text-xs sm:text-sm font-semibold tracking-wide text-[#92400E]">
                {content.heroEyebrow}
              </p>

              <h1 className="text-3xl sm:text-4xl lg:text-[46px] font-bold leading-[1.15] tracking-tight text-[#1F1A14]">
                {content.heroHeadline}
              </h1>

              <p className="text-base sm:text-[17px] leading-relaxed text-[#574E42] max-w-xl">
                {content.heroSubheadline}
              </p>

              <div className="flex flex-wrap items-center gap-3.5 pt-2">
                <Link
                  href="/enquire"
                  className="inline-flex items-center gap-2 bg-[#F59E0B] hover:bg-[#D97706] text-[#1F1A14] font-semibold text-sm px-6 py-3.5 rounded-lg transition-colors whitespace-nowrap"
                >
                  <span>Request a Quote</span>
                  <ArrowRight className="w-4 h-4" aria-hidden="true" />
                </Link>

                <Link
                  href="/book-consultation"
                  className="inline-flex items-center gap-2 bg-white border border-[#231D15]/30 hover:border-[#B45309] hover:bg-[#FAF8F3] text-[#1F1A14] font-semibold text-sm px-6 py-3.5 rounded-lg transition-colors whitespace-nowrap"
                >
                  <CalendarCheck className="w-4 h-4 text-[#B45309]" aria-hidden="true" />
                  <span>Book Consultation</span>
                </Link>

                <a
                  href={`tel:${content.phoneTel}`}
                  className="inline-flex items-center gap-2 text-sm font-semibold text-[#1F1A14] hover:text-[#92400E] px-3 py-3 transition-colors whitespace-nowrap tabular-nums"
                >
                  <Phone className="w-4 h-4 text-[#B45309]" aria-hidden="true" />
                  <span>Call {content.phoneDisplay}</span>
                </a>
              </div>

              <div className="pt-4 border-t border-[#E2DAC8] flex flex-wrap items-center gap-x-6 gap-y-2 text-xs font-medium text-[#574E42]">
                <span>Individuals & Students</span>
                <span aria-hidden="true" className="text-[#D97706]">·</span>
                <span>IT Educators</span>
                <span aria-hidden="true" className="text-[#D97706]">·</span>
                <span>Corporate Organizations</span>
                <span aria-hidden="true" className="text-[#D97706]">·</span>
                <span>Accra & Nationwide Delivery</span>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="lg:col-span-6 flex"
            >
              <div className="relative w-full min-h-[280px] lg:min-h-[420px] rounded-xl overflow-hidden border border-[#E2DAC8] bg-[#231D15]">
                <SafeImage
                  src={content.heroImageUrl}
                  alt="ABM Global Ltd practical IT training and enterprise engineering workshop in Accra"
                  className="w-full h-full object-cover"
                  fallbackTitle="ABM Global Ltd Accra Engineering Lab"
                />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#231D15]/95 via-[#231D15]/60 to-transparent p-6">
                  <p className="text-xs font-semibold text-[#FBBF24]">
                    Practical Excellence · Safety-First Engineering
                  </p>
                  <p className="text-sm text-[#FAF8F3] mt-1">
                    {content.tagline}
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 2. PROBLEM / SOLUTION VALUE GRID */}
      <section className="bg-[#FAF8F3] border-b border-[#E2DAC8] py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mb-10">
            <p className="text-xs font-semibold tracking-wide text-[#92400E] mb-2">
              Why Organizations & Learners Choose ABM Global Ltd
            </p>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#1F1A14] tracking-tight">
              Solving Real IT Reliability Challenges Across Ghana
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {VALUE_PILLARS.map((item) => (
              <div
                key={item.code}
                className="bg-white border border-[#E2DAC8] rounded-xl p-6 flex flex-col justify-between"
              >
                <div>
                  <p className="text-xs font-semibold text-[#B45309] tabular-nums mb-2">
                    {item.code} · {item.problem}
                  </p>
                  <h3 className="text-base font-semibold text-[#1F1A14] mb-2.5">
                    {item.solution}
                  </h3>
                  <p className="text-sm leading-relaxed text-[#574E42]">
                    {item.detail}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. INTERACTIVE 6-SERVICE OVERVIEW CARDS */}
      <section className="bg-white py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div className="max-w-2xl">
              <p className="text-xs font-semibold tracking-wide text-[#92400E] mb-2">
                Six Core Engineering & Training Pillars
              </p>
              <h2 className="text-2xl sm:text-3xl font-bold text-[#1F1A14] tracking-tight">
                Comprehensive IT Services Tailored to Your Goals
              </h2>
            </div>
            <Link
              href="/services"
              className="inline-flex items-center gap-2 text-sm font-semibold text-[#1F1A14] hover:text-[#B45309] transition-colors whitespace-nowrap"
            >
              <span>Explore Detailed Service Specifications</span>
              <ArrowRight className="w-4 h-4 text-[#B45309]" aria-hidden="true" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
            {services.map((service) => {
              const waMessage = `Hello ABM Global Ltd, I would like to enquire about ${service.title}.`;
              const waUrl = `https://wa.me/${whatsappBase}?text=${encodeURIComponent(waMessage)}`;

              return (
                <article
                  key={service.id}
                  className="bg-[#FAF8F3] border border-[#E2DAC8] rounded-xl overflow-hidden flex flex-col justify-between transition-transform duration-200 hover:-translate-y-0.5"
                >
                  <div>
                    <div className="aspect-[4/3] w-full overflow-hidden bg-[#EFE8D8]">
                      <SafeImage
                        src={service.imageUrl}
                        alt={service.title}
                        className="w-full h-full object-cover"
                        fallbackTitle={service.title}
                      />
                    </div>

                    <div className="p-6">
                      <div className="flex items-center gap-2 text-xs font-semibold text-[#92400E] mb-2 tabular-nums">
                        <span>{service.code}.</span>
                        <span aria-hidden="true">·</span>
                        <span>{service.outcomeMetric}</span>
                      </div>

                      <h3 className="text-lg font-semibold text-[#1F1A14] leading-snug mb-2.5">
                        {service.title}
                      </h3>

                      <p className="text-sm leading-relaxed text-[#574E42] mb-4">
                        {service.summary}
                      </p>

                      <p className="text-xs text-[#6B5F51]">
                        For: {service.audiences.join(' · ')}
                      </p>
                    </div>
                  </div>

                  <div className="px-6 pb-6 pt-2 flex items-center gap-3">
                    <Link
                      href={`/enquire?service=${encodeURIComponent(service.title)}`}
                      className="flex-1 inline-flex items-center justify-center gap-1.5 bg-[#F59E0B] hover:bg-[#D97706] text-[#1F1A14] font-semibold text-xs sm:text-sm px-4 py-2.5 rounded-lg transition-colors whitespace-nowrap"
                    >
                      <span>Enquire</span>
                      <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                    </Link>

                    <a
                      href={waUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-1.5 bg-[#B45309] hover:bg-[#92400E] text-white font-semibold text-xs sm:text-sm px-4 py-2.5 rounded-lg transition-colors whitespace-nowrap"
                    >
                      <MessageCircle className="w-3.5 h-3.5" aria-hidden="true" />
                      <span>WhatsApp</span>
                    </a>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* 4. FEATURED GALLERY PREVIEW (Warm Espresso Contrast Band) */}
      <section className="bg-[#231D15] text-[#FAF8F3] py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
            <div className="max-w-2xl">
              <p className="text-xs font-semibold tracking-wide text-[#FBBF24] mb-2">
                Verified Field Deployments
              </p>
              <h2 className="text-2xl sm:text-3xl font-bold text-[#FAF8F3] tracking-tight">
                Recent Works & Projects Across Accra
              </h2>
            </div>
            <Link
              href="/gallery"
              className="inline-flex items-center gap-2 text-sm font-semibold text-[#FBBF24] hover:text-white transition-colors whitespace-nowrap"
            >
              <span>View Full Project Gallery</span>
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featuredGallery.map((project) => (
              <Link
                key={project.id}
                href="/gallery"
                className="group bg-[#2F271C] border border-[#3E3426] rounded-xl overflow-hidden flex flex-col"
              >
                <div className="aspect-[4/3] overflow-hidden bg-[#1A150F]">
                  <SafeImage
                    src={project.imageUrl}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                    fallbackTitle={project.title}
                  />
                </div>
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <p className="text-xs text-[#FBBF24] font-medium mb-1.5">
                      {project.location} · {project.completedDate}
                    </p>
                    <h3 className="text-base font-semibold text-[#FAF8F3] leading-snug mb-2 group-hover:text-[#FBBF24] transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-sm text-[#D8D0C2] line-clamp-2">
                      {project.description}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 5. ANNOUNCEMENTS & EVENTS PREVIEW + CONVERSION BANNER */}
      <section className="bg-[#FAF8F3] py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
            <div>
              <p className="text-xs font-semibold tracking-wide text-[#92400E] mb-2">
                Training Calendar & Announcements
              </p>
              <h2 className="text-2xl sm:text-3xl font-bold text-[#1F1A14] tracking-tight">
                Upcoming Cohorts, Seminars & Updates
              </h2>
            </div>
            <Link
              href="/updates"
              className="inline-flex items-center gap-2 text-sm font-semibold text-[#1F1A14] hover:text-[#B45309] transition-colors whitespace-nowrap"
            >
              <span>All Updates & Events</span>
              <ArrowRight className="w-4 h-4 text-[#B45309]" aria-hidden="true" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-14">
            {featuredAnnouncements.map((item) => (
              <article
                key={item.id}
                className="bg-white border border-[#E2DAC8] rounded-xl p-6 flex flex-col justify-between"
              >
                <div>
                  <p className="text-xs font-semibold text-[#B45309] mb-2">
                    {item.type} · {item.date}
                  </p>
                  <h3 className="text-base font-semibold text-[#1F1A14] mb-2 leading-snug">
                    {item.title}
                  </h3>
                  <p className="text-sm text-[#574E42] leading-relaxed mb-4">
                    {item.summary}
                  </p>
                </div>
                <div className="pt-3 border-t border-[#F0EAE0] flex items-center justify-between gap-3">
                  <span className="text-xs text-[#6B5F51] truncate">{item.location}</span>
                  <Link
                    href={item.ctaHref || '/updates'}
                    className="text-xs font-semibold text-[#92400E] hover:text-[#1F1A14] transition-colors whitespace-nowrap shrink-0"
                  >
                    {item.ctaLabel || 'Read Details'} →
                  </Link>
                </div>
              </article>
            ))}
          </div>

          {/* Direct Conversion Strip */}
          <div className="bg-[#231D15] text-[#FAF8F3] rounded-xl p-8 sm:p-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8 border border-[#3E3426]">
            <div className="max-w-2xl space-y-2.5">
              <div className="flex flex-wrap items-center gap-4 text-xs font-semibold text-[#FBBF24]">
                <span className="inline-flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4" aria-hidden="true" />
                  <span>Safety-First Engineering</span>
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <Wrench className="w-4 h-4" aria-hidden="true" />
                  <span>Verified After-Sales Support</span>
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4" aria-hidden="true" />
                  <span>Accra & Nationwide</span>
                </span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
                Ready to Train Your Team or Upgrade Your Infrastructure?
              </h2>
              <p className="text-sm sm:text-base text-[#D8D0C2]">
                Submit an instant quote request with WhatsApp routing, or schedule an office consultation in Accra.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3 shrink-0">
              <Link
                href="/enquire"
                className="inline-flex items-center gap-2 bg-[#F59E0B] hover:bg-[#D97706] text-[#1F1A14] font-semibold text-sm px-6 py-3.5 rounded-lg transition-colors whitespace-nowrap"
              >
                <span>Request a Quote</span>
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </Link>
              <Link
                href="/book-consultation"
                className="inline-flex items-center gap-2 border border-white/40 hover:border-[#FBBF24] hover:bg-white/10 text-[#FAF8F3] font-semibold text-sm px-6 py-3.5 rounded-lg transition-colors whitespace-nowrap"
              >
                <span>Book Consultation</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
