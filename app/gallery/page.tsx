'use client';

import React, { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { ChevronLeft, ChevronRight, Expand, MapPin, X } from 'lucide-react';
import { useCMS } from '@/components/cms/CMSContext';
import { SafeImage } from '@/components/ui/SafeImage';

export default function GalleryPage() {
  const { state } = useCMS();
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const categories = useMemo(
    () => ['All', ...state.galleryCategories],
    [state.galleryCategories]
  );

  const filteredItems = useMemo(() => {
    if (activeCategory === 'All') return state.gallery;
    return state.gallery.filter((item) => item.category === activeCategory);
  }, [activeCategory, state.gallery]);

  useEffect(() => {
    if (lightboxIndex === null) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setLightboxIndex(null);
      } else if (e.key === 'ArrowRight') {
        setLightboxIndex((prev) =>
          prev === null ? null : (prev + 1) % filteredItems.length
        );
      } else if (e.key === 'ArrowLeft') {
        setLightboxIndex((prev) =>
          prev === null
            ? null
            : (prev - 1 + filteredItems.length) % filteredItems.length
        );
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [lightboxIndex, filteredItems.length]);

  const activeItem =
    lightboxIndex !== null && filteredItems[lightboxIndex]
      ? filteredItems[lightboxIndex]
      : null;

  return (
    <div className="bg-white min-h-screen">
      {/* Header */}
      <section className="bg-[#F3EFE6] text-[#1F1A14] py-14 lg:py-16 border-b border-[#E2DAC8]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-4">
            <p className="text-xs sm:text-sm font-semibold text-[#92400E]">
              Works & Completed Projects
            </p>
            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#1F1A14]">
              Field Installations, Audits & Practical Training Gallery
            </h1>
            <p className="text-base text-[#574E42] leading-relaxed">
              Browse real deployments across Greater Accra and beyond—categorized across our six core engineering and training disciplines.
            </p>
          </div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="bg-[#FAF8F3] border-b border-[#E2DAC8] py-5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center gap-2">
            {categories.map((cat) => {
              const selected = activeCategory === cat;
              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => {
                    setActiveCategory(cat);
                    setLightboxIndex(null);
                  }}
                  className={`px-3.5 py-2 rounded-lg text-xs font-semibold transition-colors whitespace-nowrap shrink-0 ${
                    selected
                      ? 'bg-[#F59E0B] text-[#1F1A14]'
                      : 'bg-white text-[#1F1A14] border border-[#E2DAC8] hover:border-[#B45309]'
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {filteredItems.length === 0 ? (
            <div className="bg-[#FAF8F3] border border-[#E2DAC8] rounded-xl p-12 text-center space-y-3">
              <p className="text-base font-semibold text-[#1F1A14]">
                No projects listed under this category yet.
              </p>
              <p className="text-sm text-[#574E42]">
                Select another category or request a custom site portfolio during consultation.
              </p>
              <button
                type="button"
                onClick={() => setActiveCategory('All')}
                className="inline-flex items-center px-4 py-2 rounded-lg bg-[#F59E0B] hover:bg-[#D97706] text-[#1F1A14] text-xs font-semibold transition-colors"
              >
                Show All Projects
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
              {filteredItems.map((item, idx) => (
                <article
                  key={item.id}
                  className="bg-[#FAF8F3] border border-[#E2DAC8] rounded-xl overflow-hidden flex flex-col justify-between group"
                >
                  <div>
                    <button
                      type="button"
                      onClick={() => setLightboxIndex(idx)}
                      aria-label={`Inspect ${item.title}`}
                      className="relative block w-full aspect-[4/3] overflow-hidden bg-[#EFE8D8] text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F59E0B]"
                    >
                      <SafeImage
                        src={item.imageUrl}
                        alt={item.title}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                        fallbackTitle={item.title}
                      />
                      <span className="absolute bottom-3 right-3 inline-flex items-center gap-1.5 bg-[#231D15]/90 text-[#FBBF24] text-xs font-medium px-2.5 py-1.5 rounded-md">
                        <Expand className="w-3.5 h-3.5" aria-hidden="true" />
                        <span>Inspect</span>
                      </span>
                    </button>

                    <div className="p-6 space-y-2.5">
                      <p className="text-xs font-semibold text-[#92400E]">
                        {item.category}
                      </p>
                      <h2 className="text-lg font-semibold text-[#1F1A14] leading-snug">
                        {item.title}
                      </h2>
                      <p className="text-sm text-[#574E42] leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </div>

                  <div className="px-6 pb-5 pt-3 border-t border-[#E2DAC8] flex items-center justify-between text-xs text-[#574E42]">
                    <span className="inline-flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-[#B45309]" aria-hidden="true" />
                      <span>{item.location}</span>
                    </span>
                    <span className="tabular-nums">{item.completedDate}</span>
                  </div>
                </article>
              ))}
            </div>
          )}

          <div className="mt-14 bg-[#231D15] text-[#FAF8F3] rounded-xl p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 border border-[#3E3426]">
            <div>
              <h2 className="text-xl font-bold">
                Planning a Similar Installation or Training Cohort?
              </h2>
              <p className="text-sm text-[#D8D0C2] mt-1">
                Tell us your site location and timeline for a clear technical quotation.
              </p>
            </div>
            <Link
              href="/enquire"
              className="inline-flex items-center px-5 py-3 rounded-lg bg-[#F59E0B] hover:bg-[#D97706] text-[#1F1A14] font-semibold text-sm transition-colors whitespace-nowrap shrink-0"
            >
              Request a Quote
            </Link>
          </div>
        </div>
      </section>

      {/* Lightbox Modal */}
      {activeItem && lightboxIndex !== null && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={activeItem.title}
          className="fixed inset-0 z-50 bg-[#1A150F]/90 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setLightboxIndex(null)}
        >
          <div
            className="bg-white rounded-xl max-w-4xl w-full overflow-hidden shadow-2xl border border-[#E2DAC8]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between px-5 py-3.5 border-b border-[#E2DAC8] bg-[#FAF8F3]">
              <p className="text-xs font-semibold text-[#92400E]">
                {activeItem.category} · {activeItem.location}
              </p>
              <button
                type="button"
                onClick={() => setLightboxIndex(null)}
                aria-label="Close lightbox"
                className="p-1.5 rounded-lg text-[#574E42] hover:bg-[#EFE8D8] hover:text-[#1F1A14] transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="relative bg-[#1A150F] aspect-[16/10] max-h-[65vh] w-full flex items-center justify-center">
              <SafeImage
                src={activeItem.imageUrl}
                alt={activeItem.title}
                className="w-full h-full object-contain"
                fallbackTitle={activeItem.title}
              />

              {filteredItems.length > 1 && (
                <>
                  <button
                    type="button"
                    aria-label="Previous project image"
                    onClick={() =>
                      setLightboxIndex(
                        (lightboxIndex - 1 + filteredItems.length) %
                          filteredItems.length
                      )
                    }
                    className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/90 hover:bg-white text-[#1F1A14] flex items-center justify-center shadow"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    type="button"
                    aria-label="Next project image"
                    onClick={() =>
                      setLightboxIndex((lightboxIndex + 1) % filteredItems.length)
                    }
                    className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/90 hover:bg-white text-[#1F1A14] flex items-center justify-center shadow"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </>
              )}
            </div>

            <div className="p-6 space-y-2">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <h3 className="text-lg font-bold text-[#1F1A14]">
                  {activeItem.title}
                </h3>
                <span className="text-xs font-medium text-[#6B5F51] tabular-nums">
                  Completed {activeItem.completedDate}
                </span>
              </div>
              <p className="text-sm text-[#574E42] leading-relaxed">
                {activeItem.description}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
