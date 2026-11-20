import { useState } from "react";
import { Leaf } from "lucide-react";

interface MediaImageProps {
  src: string;
  alt: string;
  className?: string;
  fallbackTitle?: string;
  /** Above-the-fold image: load eagerly instead of lazily. */
  priority?: boolean;
}

export function MediaImage({ src, alt, className = "", fallbackTitle, priority = false }: MediaImageProps) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div
        className={`flex flex-col items-center justify-center bg-gradient-to-br from-surface-container-low via-secondary-fixed/40 to-primary-fixed/30 text-on-surface-variant p-6 text-center ${className}`}
        role="img"
        aria-label={alt}
      >
        <div className="w-10 h-10 rounded-full bg-surface-container-lowest/80 flex items-center justify-center text-secondary mb-2 shadow-xs">
          <Leaf className="w-5 h-5" />
        </div>
        {fallbackTitle && (
          <span className="font-serif text-sm text-on-surface">{fallbackTitle}</span>
        )}
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      loading={priority ? "eager" : "lazy"}
      decoding="async"
      referrerPolicy="no-referrer"
      onError={() => setFailed(true)}
      className={className}
    />
  );
}

export function MoyoWellLogo({ className = "w-7 h-7" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 36 36"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <rect width="36" height="36" rx="10" fill="#f1f4ef" />
      <path
        d="M18 28.5C18 28.5 8.5 22.3 8.5 14.8C8.5 11.4 11.1 8.8 14.3 8.8C16.2 8.8 17.5 9.8 18 11C18.5 9.8 19.8 8.8 21.7 8.8C24.9 8.8 27.5 11.4 27.5 14.8C27.5 22.3 18 28.5 18 28.5Z"
        fill="#8b4a34"
        fillOpacity="0.16"
        stroke="#8b4a34"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M18 23.5C18 19 20.4 15.2 23.8 13.3"
        stroke="#3f665a"
        strokeWidth="1.75"
        strokeLinecap="round"
      />
      <path
        d="M18 19.5C16.2 17.2 14.2 15.8 12.2 15.2"
        stroke="#3f665a"
        strokeWidth="1.75"
        strokeLinecap="round"
      />
    </svg>
  );
}
