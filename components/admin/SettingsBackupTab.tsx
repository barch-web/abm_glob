'use client';

import React, { useState } from 'react';
import { Download, KeyRound, RotateCcw, Upload } from 'lucide-react';
import { useCMS } from '@/components/cms/CMSContext';

export function SettingsBackupTab() {
  const {
    changeAdminPassword,
    exportCMSBackup,
    importCMSBackup,
    resetToDefaults,
  } = useCMS();

  const [currentPw, setCurrentPw] = useState('');
  const [newPw, setNewPw] = useState('');
  const [confirmPw, setConfirmPw] = useState('');
  const [pwStatus, setPwStatus] = useState<{ ok: boolean; msg: string } | null>(
    null
  );

  const [backupStatus, setBackupStatus] = useState<{
    ok: boolean;
    msg: string;
  } | null>(null);
  const [confirmReset, setConfirmReset] = useState(false);

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();
    setPwStatus(null);
    if (newPw !== confirmPw) {
      setPwStatus({ ok: false, msg: 'New passwords do not match.' });
      return;
    }
    const res = await changeAdminPassword(currentPw, newPw);
    if (res.ok) {
      setPwStatus({
        ok: true,
        msg: 'Admin password updated securely with SHA-256 hashing.',
      });
      setCurrentPw('');
      setNewPw('');
      setConfirmPw('');
    } else {
      setPwStatus({ ok: false, msg: res.error || 'Could not update password.' });
    }
  };

  const handleExport = () => {
    const json = exportCMSBackup();
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `abm-global-cms-backup-${new Date()
      .toISOString()
      .slice(0, 10)}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    setBackupStatus({
      ok: true,
      msg: 'JSON backup exported successfully.',
    });
  };

  const handleImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = async () => {
      if (typeof reader.result !== 'string') return;
      const res = await importCMSBackup(reader.result);
      if (res.ok) {
        setBackupStatus({
          ok: true,
          msg: 'CMS backup imported and restored across IndexedDB.',
        });
      } else {
        setBackupStatus({
          ok: false,
          msg: res.error || 'Import failed.',
        });
      }
    };
    reader.readAsText(file);
  };

  const handleReset = async () => {
    await resetToDefaults();
    setConfirmReset(false);
    setBackupStatus({
      ok: true,
      msg: 'CMS restored to default Accra content and sample data.',
    });
  };

  return (
    <div className="space-y-8">
      {/* Change Password */}
      <form
        onSubmit={handlePasswordChange}
        className="bg-white border border-slate-200 rounded-xl p-6 space-y-4 max-w-2xl"
      >
        <div className="flex items-center gap-2">
          <KeyRound className="w-5 h-5 text-[#D97706]" aria-hidden="true" />
          <h2 className="text-base font-bold text-[#0A192F]">
            Change Admin Password
          </h2>
        </div>
        <p className="text-xs text-slate-600">
          Passwords are hashed client-side using Web Crypto SHA-256 before persistence. Plain-text credentials are never stored.
        </p>

        <div className="space-y-3">
          <div>
            <label className="block text-xs font-semibold text-[#0A192F] mb-1">
              Current Password
            </label>
            <input
              type="password"
              value={currentPw}
              onChange={(e) => setCurrentPw(e.target.value)}
              required
              className="w-full px-3.5 py-2.5 rounded-lg bg-[#F4F6F9] border border-slate-300 text-sm text-[#0A192F]"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-[#0A192F] mb-1">
              New Password (minimum 8 characters)
            </label>
            <input
              type="password"
              value={newPw}
              onChange={(e) => setNewPw(e.target.value)}
              required
              className="w-full px-3.5 py-2.5 rounded-lg bg-[#F4F6F9] border border-slate-300 text-sm text-[#0A192F]"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-[#0A192F] mb-1">
              Confirm New Password
            </label>
            <input
              type="password"
              value={confirmPw}
              onChange={(e) => setConfirmPw(e.target.value)}
              required
              className="w-full px-3.5 py-2.5 rounded-lg bg-[#F4F6F9] border border-slate-300 text-sm text-[#0A192F]"
            />
          </div>
        </div>

        {pwStatus && (
          <p
            className={`text-xs font-semibold ${
              pwStatus.ok ? 'text-[#047857]' : 'text-red-600'
            }`}
          >
            {pwStatus.msg}
          </p>
        )}

        <button
          type="submit"
          className="inline-flex items-center gap-2 bg-[#0A192F] hover:bg-[#112240] text-white font-semibold text-xs sm:text-sm px-5 py-2.5 rounded-lg transition-colors"
        >
          Update Admin Password
        </button>
      </form>

      {/* JSON Export / Import */}
      <div className="bg-white border border-slate-200 rounded-xl p-6 space-y-4 max-w-2xl">
        <h2 className="text-base font-bold text-[#0A192F]">
          JSON Backup & Portability
        </h2>
        <p className="text-xs text-slate-600 leading-relaxed">
          Export your entire ABM Global Ltd CMS—including uploaded Base64 gallery photos, custom services, announcements, enquiries, and consultation bookings—to a portable JSON file, or restore from a previous backup.
        </p>

        <div className="flex flex-wrap items-center gap-3 pt-1">
          <button
            type="button"
            onClick={handleExport}
            className="inline-flex items-center gap-2 bg-[#F59E0B] hover:bg-[#D97706] text-[#0A192F] font-semibold text-xs sm:text-sm px-4 py-2.5 rounded-lg transition-colors"
          >
            <Download className="w-4 h-4" aria-hidden="true" />
            <span>Export JSON Backup</span>
          </button>

          <label className="inline-flex items-center gap-2 border border-slate-300 hover:border-[#0A192F] bg-white text-[#0A192F] font-semibold text-xs sm:text-sm px-4 py-2.5 rounded-lg cursor-pointer transition-colors">
            <Upload className="w-4 h-4" aria-hidden="true" />
            <span>Import JSON Backup</span>
            <input
              type="file"
              accept="application/json,.json"
              onChange={handleImport}
              className="hidden"
            />
          </label>
        </div>

        {backupStatus && (
          <p
            className={`text-xs font-semibold ${
              backupStatus.ok ? 'text-[#047857]' : 'text-red-600'
            }`}
          >
            {backupStatus.msg}
          </p>
        )}

        <div className="pt-4 border-t border-slate-100">
          {!confirmReset ? (
            <button
              type="button"
              onClick={() => setConfirmReset(true)}
              className="inline-flex items-center gap-2 text-xs font-semibold text-red-600 hover:text-red-700"
            >
              <RotateCcw className="w-3.5 h-3.5" aria-hidden="true" />
              <span>Reset CMS to Default Content</span>
            </button>
          ) : (
            <div className="flex flex-wrap items-center gap-3">
              <span className="text-xs font-semibold text-red-600">
                Confirm resetting all content and leads?
              </span>
              <button
                type="button"
                onClick={handleReset}
                className="px-3 py-1.5 rounded-lg bg-red-600 text-white text-xs font-semibold"
              >
                Yes, Reset Now
              </button>
              <button
                type="button"
                onClick={() => setConfirmReset(false)}
                className="px-3 py-1.5 rounded-lg border border-slate-300 text-xs font-semibold text-slate-700"
              >
                Cancel
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
