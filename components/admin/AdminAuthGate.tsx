'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Lock } from 'lucide-react';
import { useCMS } from '@/components/cms/CMSContext';

/**
 * Password-only Admin Gate backed by SHA-256 verification.
 * Initial default password (documented in lib/crypto.ts): ABMGlobal@2026
 * Change it anytime via Admin Portal -> Settings & Backup.
 */

const SESSION_KEY = 'abm_admin_unlocked_v1';

export function AdminAuthGate({
  children,
}: {
  children: (lockAdmin: () => void) => React.ReactNode;
}) {
  const { verifyAdminPassword, isHydrated } = useCMS();
  const [unlocked, setUnlocked] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false;
    return window.sessionStorage.getItem(SESSION_KEY) === 'true';
  });
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [checking, setChecking] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setChecking(true);
    try {
      const valid = await verifyAdminPassword(password);
      if (valid) {
        setUnlocked(true);
        setPassword('');
        window.sessionStorage.setItem(SESSION_KEY, 'true');
      } else {
        setError('Incorrect administrator password. Please try again.');
      }
    } finally {
      setChecking(false);
    }
  };

  const lockAdmin = () => {
    setUnlocked(false);
    window.sessionStorage.removeItem(SESSION_KEY);
  };

  if (!isHydrated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FAF8F3] text-sm text-[#574E42]">
        Loading ABM Global CMS...
      </div>
    );
  }

  if (unlocked) {
    return <>{children(lockAdmin)}</>;
  }

  return (
    <div className="min-h-screen bg-[#231D15] flex flex-col items-center justify-center px-4 py-12">
      <div className="w-full max-w-md bg-[#FAF8F3] border border-[#E2DAC8] rounded-xl p-8 shadow-xl space-y-6">
        <div className="space-y-2">
          <div className="w-11 h-11 rounded-lg bg-[#231D15] text-[#FBBF24] flex items-center justify-center">
            <Lock className="w-5 h-5" aria-hidden="true" />
          </div>
          <h1 className="text-xl font-bold text-[#1F1A14] pt-2">
            ABM Global Ltd Admin Portal
          </h1>
          <p className="text-sm text-[#574E42]">
            Enter your administrator password to manage leads, gallery projects, announcements, and site content.
          </p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label
              htmlFor="admin-password"
              className="block text-xs font-semibold text-[#1F1A14] mb-1.5"
            >
              Administrator Password
            </label>
            <input
              id="admin-password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoFocus
              placeholder="Enter password"
              className="w-full px-3.5 py-2.5 rounded-lg bg-white border border-[#D5CBB4] text-sm text-[#1F1A14] focus:outline-none focus:ring-2 focus:ring-[#F59E0B]"
            />
          </div>

          {error && <p className="text-xs font-semibold text-red-600">{error}</p>}

          <button
            type="submit"
            disabled={checking}
            className="w-full bg-[#F59E0B] hover:bg-[#D97706] disabled:opacity-60 text-[#1F1A14] font-semibold text-sm py-3 rounded-lg transition-colors"
          >
            {checking ? 'Verifying SHA-256 Hash...' : 'Unlock Admin Dashboard'}
          </button>
        </form>

        <div className="pt-4 border-t border-[#E2DAC8] flex items-center justify-between text-xs text-[#6B5F51]">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 font-semibold text-[#1F1A14] hover:text-[#B45309]"
          >
            <ArrowLeft className="w-3.5 h-3.5" aria-hidden="true" />
            <span>Back to Public Website</span>
          </Link>
          <span>SHA-256 Protected</span>
        </div>
      </div>
    </div>
  );
}
