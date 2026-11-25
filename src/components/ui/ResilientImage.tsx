import { useState } from 'react';
import { Server } from 'lucide-react';

interface ResilientImageProps {
  src: string;
  alt: string;
  className?: string;
  fallbackLabel?: string;
  loading?: 'lazy' | 'eager';
}

export function ResilientImage({
  src,
  alt,
  className = '',
  fallbackLabel = 'NEXUS CORE',
  loading = 'lazy',
}: ResilientImageProps) {
  const [hasError, setHasError] = useState(false);

  if (hasError) {
    return (
      <div
        role="img"
        aria-label={alt}
        className={`flex flex-col items-center justify-center bg-gradient-to-br from-[#0B1324] via-[#0F1E3A] to-[#060B16] border border-cyan-500/20 text-slate-300 ${className}`}
      >
        <Server className="w-8 h-8 text-cyan-400/70 mb-2" aria-hidden="true" />
        <span className="text-xs font-medium tracking-wide text-slate-400">{fallbackLabel}</span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      loading={loading}
      referrerPolicy="no-referrer"
      onError={() => setHasError(true)}
      className={className}
    />
  );
}
