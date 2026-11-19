'use client';

import Image from 'next/image';

interface IconProps {
  className?: string;
  'aria-hidden'?: boolean;
}

export function LibraryIcon({ className, 'aria-hidden': ariaHidden }: IconProps) {
  return (
    <svg
      aria-hidden={ariaHidden ?? true}
      viewBox="0 0 24 24"
      className={`h-6 w-6 ${className ?? ''}`}
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H20v15H6.5A2.5 2.5 0 0 0 4 20.5v-15Z" />
      <path d="M4 20.5A2.5 2.5 0 0 1 6.5 18H20" />
      <path d="M8 7h8M8 10h5" />
    </svg>
  );
}

export function ChatIcon({ className, 'aria-hidden': ariaHidden }: IconProps) {
  return (
    <svg
      aria-hidden={ariaHidden ?? true}
      viewBox="0 0 24 24"
      className={`h-6 w-6 ${className ?? ''}`}
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4 5.5A2.5 2.5 0 0 1 6.5 3h7A2.5 2.5 0 0 1 16 5.5v4A2.5 2.5 0 0 1 13.5 12H9l-5 4V5.5Z" />
      <path d="M18 8.5h.5A2.5 2.5 0 0 1 21 11v7l-4-3h-3.5A2.5 2.5 0 0 1 11 12.5" />
    </svg>
  );
}

export function SaveIcon({ className, 'aria-hidden': ariaHidden }: IconProps) {
  return (
    <svg
      aria-hidden={ariaHidden ?? true}
      viewBox="0 0 24 24"
      className={`h-6 w-6 ${className ?? ''}`}
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M6 3h12a1 1 0 0 1 1 1v17l-7-4-7 4V4a1 1 0 0 1 1-1Z" />
      <path d="M9 7h6" />
    </svg>
  );
}

export function HarmonyIcon({ className, 'aria-hidden': ariaHidden }: IconProps) {
  return (
    <svg
      aria-hidden={ariaHidden ?? true}
      viewBox="0 0 24 24"
      className={`h-6 w-6 ${className ?? ''}`}
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.6-7 10-7 10Z" />
      <path d="M8.5 11.5c1 .8 2.2 1.2 3.5 1.2s2.5-.4 3.5-1.2" />
    </svg>
  );
}

export function ArrowIcon({ className, 'aria-hidden': ariaHidden }: IconProps) {
  return (
    <svg
      aria-hidden={ariaHidden ?? true}
      viewBox="0 0 20 20"
      className={`h-4 w-4 transition-transform group-hover:translate-x-0.5 ${className ?? ''}`}
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4 10h12M11 5l5 5-5 5" />
    </svg>
  );
}

export function CommunityIcon({ className, 'aria-hidden': ariaHidden }: IconProps) {
  return (
    <svg
      aria-hidden={ariaHidden ?? true}
      viewBox="0 0 24 24"
      className={`h-6 w-6 ${className ?? ''}`}
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
    </svg>
  );
}

export function CostsIcon({ className, 'aria-hidden': ariaHidden }: IconProps) {
  return (
    <svg
      aria-hidden={ariaHidden ?? true}
      viewBox="0 0 24 24"
      className={`h-6 w-6 ${className ?? ''}`}
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8zm0-2c3.31 0 6 2.69 6 6s-2.69 6-6 6-6-2.69-6-6 2.69-6 6zm0-10c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2z" />
    </svg>
  );
}

export function SageIcon({ className, 'aria-hidden': ariaHidden }: IconProps) {
  return (
    <svg
      aria-hidden={ariaHidden ?? true}
      viewBox="0 0 24 24"
      className={`h-6 w-6 ${className ?? ''}`}
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8zm0-2c3.31 0 6 2.69 6 6s-2.69 6-6 6-6-2.69-6-6 2.69-6 6zm0-10c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2z" />
    </svg>
  );
}