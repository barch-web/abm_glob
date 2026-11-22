'use client';

import React, { useState } from 'react';
import { Server } from 'lucide-react';

interface SafeImageProps {
  src: string;
  alt: string;
  className?: string;
  fallbackTitle?: string;
}

export function SafeImage({
  src,
  alt,
  className = 'w-full h-full object-cover',
  fallbackTitle,
}: SafeImageProps) {
  const [hasError, setHasError] = useState(false);

  if (!src || hasError) {
    return (
      <div
        className="w-full h-full min-h-[180px] bg-gradient-to-br from-[#0A192F] via-[#112240] to-[#1D3557] flex flex-col items-center justify-center p-6 text-center text-white"
        role="img"
        aria-label={alt}
      >
        <Server className="w-8 h-8 text-[#F59E0B] mb-2" strokeWidth={1.75} />
        <span className="text-sm font-semibold tracking-tight text-white/90 max-w-xs">
          {fallbackTitle || alt}
        </span>
      </div>
    );
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={alt}
      referrerPolicy="no-referrer"
      onError={() => setHasError(true)}
      className={className}
    />
  );
}
