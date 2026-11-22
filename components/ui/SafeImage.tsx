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
        className="w-full h-full min-h-[180px] bg-gradient-to-br from-[#231D15] via-[#342B1F] to-[#4A3B28] flex flex-col items-center justify-center p-6 text-center text-[#FAF8F3]"
        role="img"
        aria-label={alt}
      >
        <Server className="w-8 h-8 text-[#F59E0B] mb-2" strokeWidth={1.75} />
        <span className="text-sm font-semibold tracking-tight text-[#FAF8F3]/90 max-w-xs">
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
