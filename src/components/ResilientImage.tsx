import React, { useState } from 'react';
import { Image as ImageIcon } from 'lucide-react';

interface ResilientImageProps {
  src: string;
  alt: string;
  fallbackTitle?: string;
  className?: string;
  containerClassName?: string;
}

export const ResilientImage: React.FC<ResilientImageProps> = ({
  src,
  alt,
  fallbackTitle,
  className = 'w-full h-full object-cover',
  containerClassName = 'w-full h-full',
}) => {
  const [hasError, setHasError] = useState(false);

  if (hasError || !src) {
    return (
      <div
        className={`${containerClassName} flex flex-col items-center justify-center bg-gradient-to-br from-[#ECE9E2] to-[#DDD8CE] dark:from-[#18181B] dark:to-[#111113] p-6 text-center`}
        role="img"
        aria-label={alt}
      >
        <ImageIcon className="w-7 h-7 text-black/30 dark:text-white/30 mb-3" strokeWidth={1.5} />
        {fallbackTitle && (
          <span className="text-sm font-medium text-black/60 dark:text-white/60 max-w-[22ch] leading-snug">
            {fallbackTitle}
          </span>
        )}
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      referrerPolicy="no-referrer"
      loading="lazy"
      onError={() => setHasError(true)}
      className={className}
    />
  );
};
