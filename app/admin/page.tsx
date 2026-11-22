'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  ExternalLink,
  FileEdit,
  Image as ImageIcon,
  Inbox,
  LogOut,
  Megaphone,
  Settings,
} from 'lucide-react';
import { AdminAuthGate } from '@/components/admin/AdminAuthGate';
import { LeadsInboxTab } from '@/components/admin/LeadsInboxTab';
import { GalleryManagerTab } from '@/components/admin/GalleryManagerTab';
import { ContentEditorTab } from '@/components/admin/ContentEditorTab';
import { AnnouncementsManagerTab } from '@/components/admin/AnnouncementsManagerTab';
import { SettingsBackupTab } from '@/components/admin/SettingsBackupTab';
import { useCMS } from '@/components/cms/CMSContext';

type AdminTab = 'inbox' | 'gallery' | 'content' | 'announcements' | 'settings';

const TABS: { id: AdminTab; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
  { id: 'inbox', label: 'Leads & Bookings', icon: Inbox },
  { id: 'gallery', label: 'Gallery Manager', icon: ImageIcon },
  { id: 'content', label: 'Content Editor', icon: FileEdit },
  { id: 'announcements', label: 'Announcements & Events', icon: Megaphone },
  { id: 'settings', label: 'Settings & Backup', icon: Settings },
];

export default function AdminDashboardPage() {
  const { state } = useCMS();
  const [activeTab, setActiveTab] = useState<AdminTab>('inbox');

  const activeLabel = TABS.find((t) => t.id === activeTab)?.label || 'Admin';

  return (
    <AdminAuthGate>
      {(lockAdmin) => (
        <div className="min-h-screen bg-[#F4F6F9] flex flex-col lg:flex-row">
          {/* Sidebar Navigation */}
          <aside className="w-full lg:w-64 bg-[#0A192F] text-white shrink-0 flex flex-col justify-between">
            <div className="p-5 space-y-6">
              <div>
                <p className="text-xs font-semibold text-[#F59E0B]">
                  CMS Workspace
                </p>
                <p className="text-lg font-bold tracking-tight mt-0.5">
                  {state.content.companyName}
                </p>
              </div>

              <nav aria-label="Admin Sections" className="space-y-1">
                {TABS.map((tab) => {
                  const Icon = tab.icon;
                  const active = activeTab === tab.id;
                  return (
                    <button
                      key={tab.id}
                      type="button"
                      onClick={() => setActiveTab(tab.id)}
                      className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-sm font-medium transition-colors text-left ${
                        active
                          ? 'bg-[#F59E0B] text-[#0A192F] font-semibold'
                          : 'text-slate-300 hover:bg-white/10 hover:text-white'
                      }`}
                    >
                      <Icon className="w-4 h-4 shrink-0" aria-hidden="true" />
                      <span className="truncate">{tab.label}</span>
                    </button>
                  );
                })}
              </nav>
            </div>

            <div className="p-5 border-t border-white/10 space-y-2">
              <Link
                href="/"
                className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-lg text-xs font-semibold text-slate-200 hover:bg-white/10 transition-colors"
              >
                <span>View Public Website</span>
                <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
              </Link>
              <button
                type="button"
                onClick={lockAdmin}
                className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-lg text-xs font-semibold text-slate-300 hover:bg-white/10 hover:text-white transition-colors"
              >
                <span>Lock Admin Session</span>
                <LogOut className="w-3.5 h-3.5" aria-hidden="true" />
              </button>
            </div>
          </aside>

          {/* Main Workspace */}
          <div className="flex-1 flex flex-col min-w-0">
            <header className="bg-white border-b border-slate-200 px-6 py-4 flex flex-wrap items-center justify-between gap-4">
              <div>
                <p className="text-xs text-slate-500">
                  Admin Portal / <span className="text-[#0A192F] font-semibold">{activeLabel}</span>
                </p>
                <h1 className="text-xl font-bold text-[#0A192F] mt-0.5">
                  {activeLabel}
                </h1>
              </div>

              <div className="text-xs text-slate-500 tabular-nums">
                Last saved: {new Date(state.updatedAt).toLocaleString()}
              </div>
            </header>

            <main className="flex-1 p-6 lg:p-8 max-w-6xl w-full">
              {activeTab === 'inbox' && <LeadsInboxTab />}
              {activeTab === 'gallery' && <GalleryManagerTab />}
              {activeTab === 'content' && <ContentEditorTab />}
              {activeTab === 'announcements' && <AnnouncementsManagerTab />}
              {activeTab === 'settings' && <SettingsBackupTab />}
            </main>
          </div>
        </div>
      )}
    </AdminAuthGate>
  );
}
