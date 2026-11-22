'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, CheckCircle2, Compass, HeartHandshake, Shield, Target } from 'lucide-react';
import { useCMS } from '@/components/cms/CMSContext';
import { SafeImage } from '@/components/ui/SafeImage';

const CORE_VALUES = [
  {
    icon: HeartHandshake,
    title: 'Holistic Relationship-Building',
    description:
      'We treat every learner, homeowner, and corporate IT lead as a long-term partner—standing behind our work long after handover.',
  },
  {
    icon: Shield,
    title: 'Safety & Standards Discipline',
    description:
      'From electrical grounding and UPS sizing to tidy conduit runs and data hygiene, we never cut corners that endanger people or equipment.',
  },
  {
    icon: CheckCircle2,
    title: 'Practical Excellence Over Pure Profit',
    description:
      'We recommend what genuinely solves your problem sustainably—never pushing bloated hardware specs or unnecessary subscriptions.',
  },
];

export default function AboutPage() {
  const { state } = useCMS();
  const { content } = state;

  return (
    <div className="bg-white">
      {/* Page Header */}
      <section className="bg-[#0A192F] text-white py-14 lg:py-18 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-4">
            <p className="text-xs sm:text-sm font-semibold text-[#F59E0B]">
              About {content.companyName} · Accra, Ghana
            </p>
            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight leading-tight">
              Engineering-Led IT Support, Built on Integrity and After-Sales Accountability
            </h1>
            <p className="text-base text-slate-300 leading-relaxed">
              {content.tagline}
            </p>
          </div>
        </div>
      </section>

      {/* Company Overview Split */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
            <div className="lg:col-span-6 flex flex-col justify-center space-y-5">
              <h2 className="text-2xl sm:text-3xl font-bold text-[#0A192F] tracking-tight">
                Who We Are
              </h2>
              <p className="text-base text-slate-700 leading-relaxed">
                {content.aboutOverview}
              </p>
              <p className="text-base text-slate-600 leading-relaxed">
                Whether guiding a first-time computer user through workplace essentials, auditing a multi-branch corporate server room, or procuring authenticated laptops for a school, our focus remains constant: clarity, reliability, and measurable skill transfer.
              </p>
              <div className="pt-2 flex flex-wrap gap-3">
                <Link
                  href="/services"
                  className="inline-flex items-center gap-2 bg-[#0A192F] hover:bg-[#112240] text-white font-semibold text-sm px-5 py-3 rounded-lg transition-colors whitespace-nowrap"
                >
                  <span>Explore Our 6 Services</span>
                  <ArrowRight className="w-4 h-4" aria-hidden="true" />
                </Link>
                <Link
                  href="/book-consultation"
                  className="inline-flex items-center gap-2 border border-slate-300 hover:border-[#0A192F] text-[#0A192F] font-semibold text-sm px-5 py-3 rounded-lg transition-colors whitespace-nowrap"
                >
                  <span>Visit Our Accra Office</span>
                </Link>
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="h-full min-h-[280px] rounded-xl overflow-hidden border border-slate-200 bg-slate-100">
                <SafeImage
                  src="/images/service-auditing.jpg"
                  alt="ABM Global Ltd IT consultant conducting infrastructure verification"
                  className="w-full h-full object-cover"
                  fallbackTitle="ABM Global Ltd Infrastructure Consultancy"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision (Live Editable via Admin) */}
      <section className="bg-[#F4F6F9] border-y border-slate-200 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white border border-slate-200 rounded-xl p-8 space-y-4">
              <div className="inline-flex items-center gap-2 text-xs font-semibold text-[#D97706]">
                <Target className="w-4 h-4" aria-hidden="true" />
                <span>Our Mission</span>
              </div>
              <h3 className="text-xl font-bold text-[#0A192F]">
                Practical Reliability for Every Client
              </h3>
              <p className="text-base text-slate-700 leading-relaxed">
                {content.missionStatement}
              </p>
            </div>

            <div className="bg-white border border-slate-200 rounded-xl p-8 space-y-4">
              <div className="inline-flex items-center gap-2 text-xs font-semibold text-[#D97706]">
                <Compass className="w-4 h-4" aria-hidden="true" />
                <span>Our Vision</span>
              </div>
              <h3 className="text-xl font-bold text-[#0A192F]">
                West Africa’s Trusted IT Standard
              </h3>
              <p className="text-base text-slate-700 leading-relaxed">
                {content.visionStatement}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Core Philosophy */}
      <section className="py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-12 space-y-3">
            <p className="text-xs font-semibold text-[#D97706]">
              Our Operating Philosophy
            </p>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#0A192F] tracking-tight">
              {content.philosophyHeading}
            </h2>
            <p className="text-base text-slate-600 leading-relaxed">
              {content.philosophyBody}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {CORE_VALUES.map((val) => {
              const Icon = val.icon;
              return (
                <div
                  key={val.title}
                  className="bg-[#F4F6F9] border border-slate-200 rounded-xl p-6 space-y-3"
                >
                  <Icon className="w-6 h-6 text-[#0A192F]" aria-hidden="true" />
                  <h3 className="text-lg font-semibold text-[#0A192F]">
                    {val.title}
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    {val.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
