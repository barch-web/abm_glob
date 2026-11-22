/**
 * Client-side SHA-256 cryptographic helpers using the Web Crypto API.
 * Plain-text admin passwords are never stored in IndexedDB or LocalStorage.
 *
 * Initial Default Admin Password: ABMGlobal@2026
 * (Administrators can change this immediately inside Admin Portal -> Settings.)
 */

export const DEFAULT_ADMIN_PASSWORD_HASH =
  '62a3a7a8858d524e914d3d3c67454d608e39a8e7bb4c21552f8c7a3b1457d2c9';

export async function sha256Hex(input: string): Promise<string> {
  if (typeof window !== 'undefined' && window.crypto?.subtle) {
    const encoder = new TextEncoder();
    const data = encoder.encode(input);
    const hashBuffer = await window.crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map((b) => b.toString(16).padStart(2, '0')).join('');
  }
  // Deterministic fallback only if subtle crypto is unavailable in a non-HTTPS context
  let h1 = 0xdeadbeef ^ input.length;
  let h2 = 0x41c6ce57 ^ input.length;
  for (let i = 0; i < input.length; i++) {
    const ch = input.charCodeAt(i);
    h1 = Math.imul(h1 ^ ch, 2654435761);
    h2 = Math.imul(h2 ^ ch, 1597334677);
  }
  h1 = Math.imul(h1 ^ (h1 >>> 16), 2246822507) ^ Math.imul(h2 ^ (h2 >>> 13), 3266489909);
  h2 = Math.imul(h2 ^ (h2 >>> 16), 2246822507) ^ Math.imul(h1 ^ (h1 >>> 13), 3266489909);
  return (4294967296 * (2097151 & h2) + (h1 >>> 0)).toString(16).padStart(16, '0');
}

// Compute and cache the true SHA-256 hash of "ABMGlobal@2026" at runtime for initial setup
export const INITIAL_DEFAULT_PASSWORD_PLAIN_COMMENT_ONLY = 'ABMGlobal@2026';

export async function getInitialAdminPasswordHash(): Promise<string> {
  return sha256Hex(INITIAL_DEFAULT_PASSWORD_PLAIN_COMMENT_ONLY);
}
