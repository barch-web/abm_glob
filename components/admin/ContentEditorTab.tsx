'use client';

import React, { useState } from 'react';
import { Check, Save } from 'lucide-react';
import { useCMS } from '@/components/cms/CMSContext';
import type { ServiceItem, SiteContent } from '@/lib/cms-types';

export function ContentEditorTab() {
  const { state, updateSiteContent, updateService } = useCMS();
  const [form, setForm] = useState<SiteContent>(state.content);
  const [services, setServices] = useState<ServiceItem[]>(state.services);
  const [savedNotice, setSavedNotice] = useState('');

  const handleSaveAll = async (e: React.FormEvent) => {
    e.preventDefault();
    await updateSiteContent(form);
    for (const srv of services) {
      await updateService(srv);
    }
    setSavedNotice('All website content, mission/vision, contact details, and service copy saved.');
    setTimeout(() => setSavedNotice(''), 4000);
  };

  return (
    <form onSubmit={handleSaveAll} className="space-y-8">
      {/* Hero & Brand */}
      <div className="bg-white border border-slate-200 rounded-xl p-6 space-y-4">
        <h2 className="text-base font-bold text-[#0A192F]">
          Homepage Hero & Brand Positioning
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-[#0A192F] mb-1.5">
              Company Name
            </label>
            <input
              type="text"
              value={form.companyName}
              onChange={(e) => setForm({ ...form, companyName: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-lg bg-[#F4F6F9] border border-slate-300 text-sm text-[#0A192F]"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-[#0A192F] mb-1.5">
              Hero Eyebrow Label
            </label>
            <input
              type="text"
              value={form.heroEyebrow}
              onChange={(e) => setForm({ ...form, heroEyebrow: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-lg bg-[#F4F6F9] border border-slate-300 text-sm text-[#0A192F]"
            />
          </div>
          <div className="md:col-span-2">
            <label className="block text-xs font-semibold text-[#0A192F] mb-1.5">
              Brand Tagline
            </label>
            <input
              type="text"
              value={form.tagline}
              onChange={(e) => setForm({ ...form, tagline: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-lg bg-[#F4F6F9] border border-slate-300 text-sm text-[#0A192F]"
            />
          </div>
          <div className="md:col-span-2">
            <label className="block text-xs font-semibold text-[#0A192F] mb-1.5">
              Hero Main Headline
            </label>
            <input
              type="text"
              value={form.heroHeadline}
              onChange={(e) => setForm({ ...form, heroHeadline: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-lg bg-[#F4F6F9] border border-slate-300 text-sm text-[#0A192F]"
            />
          </div>
          <div className="md:col-span-2">
            <label className="block text-xs font-semibold text-[#0A192F] mb-1.5">
              Hero Subheadline
            </label>
            <textarea
              rows={3}
              value={form.heroSubheadline}
              onChange={(e) => setForm({ ...form, heroSubheadline: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-lg bg-[#F4F6F9] border border-slate-300 text-sm text-[#0A192F]"
            />
          </div>
        </div>
      </div>

      {/* About, Mission, Vision & Consulting */}
      <div className="bg-white border border-slate-200 rounded-xl p-6 space-y-4">
        <h2 className="text-base font-bold text-[#0A192F]">
          About Us, Mission, Vision & Consulting Info
        </h2>
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-[#0A192F] mb-1.5">
              Company Overview
            </label>
            <textarea
              rows={3}
              value={form.aboutOverview}
              onChange={(e) => setForm({ ...form, aboutOverview: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-lg bg-[#F4F6F9] border border-slate-300 text-sm text-[#0A192F]"
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-[#0A192F] mb-1.5">
                Mission Statement
              </label>
              <textarea
                rows={3}
                value={form.missionStatement}
                onChange={(e) => setForm({ ...form, missionStatement: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-lg bg-[#F4F6F9] border border-slate-300 text-sm text-[#0A192F]"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-[#0A192F] mb-1.5">
                Vision Statement
              </label>
              <textarea
                rows={3}
                value={form.visionStatement}
                onChange={(e) => setForm({ ...form, visionStatement: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-lg bg-[#F4F6F9] border border-slate-300 text-sm text-[#0A192F]"
              />
            </div>
          </div>
          <div>
            <label className="block text-xs font-semibold text-[#0A192F] mb-1.5">
              Consultation Page Description
            </label>
            <textarea
              rows={2}
              value={form.consultingDescription}
              onChange={(e) =>
                setForm({ ...form, consultingDescription: e.target.value })
              }
              className="w-full px-3.5 py-2.5 rounded-lg bg-[#F4F6F9] border border-slate-300 text-sm text-[#0A192F]"
            />
          </div>
        </div>
      </div>

      {/* Contact & Social Media */}
      <div className="bg-white border border-slate-200 rounded-xl p-6 space-y-4">
        <h2 className="text-base font-bold text-[#0A192F]">
          Contact Details, WhatsApp & Social Links
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-[#0A192F] mb-1.5">
              Display Phone Number
            </label>
            <input
              type="text"
              value={form.phoneDisplay}
              onChange={(e) => setForm({ ...form, phoneDisplay: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-lg bg-[#F4F6F9] border border-slate-300 text-sm text-[#0A192F]"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-[#0A192F] mb-1.5">
              WhatsApp Number (International Digits)
            </label>
            <input
              type="text"
              value={form.whatsappNumber}
              onChange={(e) => setForm({ ...form, whatsappNumber: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-lg bg-[#F4F6F9] border border-slate-300 text-sm text-[#0A192F]"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-[#0A192F] mb-1.5">
              Support Email
            </label>
            <input
              type="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-lg bg-[#F4F6F9] border border-slate-300 text-sm text-[#0A192F]"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-[#0A192F] mb-1.5">
              Accra Office Address
            </label>
            <input
              type="text"
              value={form.address}
              onChange={(e) => setForm({ ...form, address: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-lg bg-[#F4F6F9] border border-slate-300 text-sm text-[#0A192F]"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-[#0A192F] mb-1.5">
              LinkedIn URL
            </label>
            <input
              type="url"
              value={form.socialLinks.linkedin}
              onChange={(e) =>
                setForm({
                  ...form,
                  socialLinks: { ...form.socialLinks, linkedin: e.target.value },
                })
              }
              className="w-full px-3.5 py-2.5 rounded-lg bg-[#F4F6F9] border border-slate-300 text-sm text-[#0A192F]"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-[#0A192F] mb-1.5">
              Facebook URL
            </label>
            <input
              type="url"
              value={form.socialLinks.facebook}
              onChange={(e) =>
                setForm({
                  ...form,
                  socialLinks: { ...form.socialLinks, facebook: e.target.value },
                })
              }
              className="w-full px-3.5 py-2.5 rounded-lg bg-[#F4F6F9] border border-slate-300 text-sm text-[#0A192F]"
            />
          </div>
        </div>
      </div>

      {/* 6 Services Live Description Editor */}
      <div className="bg-white border border-slate-200 rounded-xl p-6 space-y-4">
        <h2 className="text-base font-bold text-[#0A192F]">
          Core Service Summaries & Descriptions
        </h2>
        <div className="space-y-4">
          {services.map((srv, idx) => (
            <div
              key={srv.id}
              className="p-4 rounded-xl bg-[#F4F6F9] border border-slate-200 space-y-3"
            >
              <p className="text-xs font-bold text-[#D97706]">
                {srv.code}. {srv.title}
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-slate-600 mb-1">
                    Card Summary
                  </label>
                  <textarea
                    rows={2}
                    value={srv.summary}
                    onChange={(e) => {
                      const next = [...services];
                      next[idx] = { ...srv, summary: e.target.value };
                      setServices(next);
                    }}
                    className="w-full px-3 py-2 rounded-lg bg-white border border-slate-300 text-xs text-[#0A192F]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-600 mb-1">
                    Full Service Description
                  </label>
                  <textarea
                    rows={2}
                    value={srv.description}
                    onChange={(e) => {
                      const next = [...services];
                      next[idx] = { ...srv, description: e.target.value };
                      setServices(next);
                    }}
                    className="w-full px-3 py-2 rounded-lg bg-white border border-slate-300 text-xs text-[#0A192F]"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {savedNotice && (
        <div className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-[#ECFDF5] border border-[#A7F3D0] text-xs font-semibold text-[#047857]">
          <Check className="w-4 h-4" aria-hidden="true" />
          <span>{savedNotice}</span>
        </div>
      )}

      <div>
        <button
          type="submit"
          className="inline-flex items-center gap-2 bg-[#F59E0B] hover:bg-[#D97706] text-[#0A192F] font-semibold text-sm px-6 py-3 rounded-lg transition-colors"
        >
          <Save className="w-4 h-4" aria-hidden="true" />
          <span>Save All Content Changes</span>
        </button>
      </div>
    </form>
  );
}
