'use client';

import React, { useState } from 'react';
import { Pencil, Plus, Trash2 } from 'lucide-react';
import { useCMS } from '@/components/cms/CMSContext';
import type { AnnouncementItem, AnnouncementType } from '@/lib/cms-types';

export function AnnouncementsManagerTab() {
  const { state, upsertAnnouncement, deleteAnnouncement } = useCMS();

  const [editingId, setEditingId] = useState<string | null>(null);
  const [title, setTitle] = useState('');
  const [type, setType] = useState<AnnouncementType>('Training Batch');
  const [date, setDate] = useState('');
  const [location, setLocation] = useState('');
  const [summary, setSummary] = useState('');
  const [details, setDetails] = useState('');
  const [ctaLabel, setCtaLabel] = useState('Enquire Now');
  const [ctaHref, setCtaHref] = useState('/enquire');
  const [notice, setNotice] = useState('');

  const resetForm = () => {
    setEditingId(null);
    setTitle('');
    setType('Training Batch');
    setDate('');
    setLocation('');
    setSummary('');
    setDetails('');
    setCtaLabel('Enquire Now');
    setCtaHref('/enquire');
  };

  const startEdit = (item: AnnouncementItem) => {
    setEditingId(item.id);
    setTitle(item.title);
    setType(item.type);
    setDate(item.date);
    setLocation(item.location);
    setSummary(item.summary);
    setDetails(item.details);
    setCtaLabel(item.ctaLabel || 'Enquire Now');
    setCtaHref(item.ctaHref || '/enquire');
    setNotice('');
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !date.trim() || !summary.trim()) {
      setNotice('Please provide a title, date, and summary.');
      return;
    }

    await upsertAnnouncement({
      id: editingId || `ann-${Date.now()}`,
      title: title.trim(),
      type,
      date: date.trim(),
      location: location.trim() || 'Accra, Ghana',
      summary: summary.trim(),
      details: details.trim(),
      ctaLabel: ctaLabel.trim() || 'Enquire Now',
      ctaHref: ctaHref.trim() || '/enquire',
    });

    setNotice(editingId ? 'Announcement updated.' : 'New announcement published.');
    resetForm();
  };

  return (
    <div className="space-y-8">
      <form
        onSubmit={handleSave}
        className="bg-white border border-[#E2DAC8] rounded-xl p-6 space-y-4"
      >
        <div className="flex items-center justify-between">
          <h2 className="text-base font-bold text-[#1F1A14]">
            {editingId ? 'Edit Announcement / Event' : 'Create Announcement or Training Event'}
          </h2>
          {editingId && (
            <button
              type="button"
              onClick={resetForm}
              className="text-xs font-semibold text-[#574E42] hover:text-[#1F1A14]"
            >
              Cancel Edit
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="md:col-span-2">
            <label className="block text-xs font-semibold text-[#1F1A14] mb-1.5">
              Title *
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. February Networking & Fiber Termination Cohort"
              className="w-full px-3.5 py-2.5 rounded-lg bg-[#FAF8F3] border border-[#D5CBB4] text-sm text-[#1F1A14]"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#1F1A14] mb-1.5">
              Type
            </label>
            <select
              value={type}
              onChange={(e) => setType(e.target.value as AnnouncementType)}
              className="w-full px-3.5 py-2.5 rounded-lg bg-[#FAF8F3] border border-[#D5CBB4] text-sm text-[#1F1A14]"
            >
              <option value="Training Batch">Training Batch</option>
              <option value="Seminar">Seminar</option>
              <option value="Company News">Company News</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#1F1A14] mb-1.5">
              Event Date / Schedule *
            </label>
            <input
              type="text"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              placeholder="e.g. February 10 – February 21, 2027"
              className="w-full px-3.5 py-2.5 rounded-lg bg-[#FAF8F3] border border-[#D5CBB4] text-sm text-[#1F1A14]"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#1F1A14] mb-1.5">
              Location
            </label>
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="e.g. ABM Global Lab, Accra"
              className="w-full px-3.5 py-2.5 rounded-lg bg-[#FAF8F3] border border-[#D5CBB4] text-sm text-[#1F1A14]"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#1F1A14] mb-1.5">
              CTA Button Label
            </label>
            <input
              type="text"
              value={ctaLabel}
              onChange={(e) => setCtaLabel(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-lg bg-[#FAF8F3] border border-[#D5CBB4] text-sm text-[#1F1A14]"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-xs font-semibold text-[#1F1A14] mb-1.5">
              Summary *
            </label>
            <textarea
              rows={2}
              value={summary}
              onChange={(e) => setSummary(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-lg bg-[#FAF8F3] border border-[#D5CBB4] text-sm text-[#1F1A14]"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-xs font-semibold text-[#1F1A14] mb-1.5">
              Detailed Notes
            </label>
            <textarea
              rows={2}
              value={details}
              onChange={(e) => setDetails(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-lg bg-[#FAF8F3] border border-[#D5CBB4] text-sm text-[#1F1A14]"
            />
          </div>
        </div>

        {notice && (
          <p className="text-xs font-semibold text-[#92400E]">{notice}</p>
        )}

        <button
          type="submit"
          className="inline-flex items-center gap-2 bg-[#F59E0B] hover:bg-[#D97706] text-[#1F1A14] font-semibold text-sm px-5 py-2.5 rounded-lg transition-colors"
        >
          <Plus className="w-4 h-4" aria-hidden="true" />
          <span>{editingId ? 'Save Update' : 'Publish Announcement'}</span>
        </button>
      </form>

      <div className="space-y-3">
        {state.announcements.map((item) => (
          <div
            key={item.id}
            className="bg-white border border-[#E2DAC8] rounded-xl p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
          >
            <div className="space-y-1">
              <p className="text-xs font-semibold text-[#92400E]">
                {item.type} · {item.date} · {item.location}
              </p>
              <h3 className="text-base font-bold text-[#1F1A14]">{item.title}</h3>
              <p className="text-xs text-[#574E42]">{item.summary}</p>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <button
                type="button"
                onClick={() => startEdit(item)}
                aria-label={`Edit ${item.title}`}
                className="p-2 rounded-lg border border-[#E2DAC8] text-[#574E42] hover:text-[#1F1A14]"
              >
                <Pencil className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => deleteAnnouncement(item.id)}
                aria-label={`Delete ${item.title}`}
                className="p-2 rounded-lg border border-[#E2DAC8] text-[#574E42] hover:text-red-600"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
