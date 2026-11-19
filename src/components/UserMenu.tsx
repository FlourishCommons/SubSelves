'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { usersRepo } from '@/lib/storage/db';
import type { PublicUser, User } from '@/lib/types';
import Image from 'next/image';

interface UserMenuProps {
  user: PublicUser;
  onLogout: () => void;
  onClose: () => void;
}

export function UserMenu({ user, onLogout, onClose }: UserMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest('.user-menu')) {
        setIsOpen(false);
        onClose();
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [onClose]);

  const handleNavigate = (href: string) => {
    router.push(href);
    setIsOpen(false);
    onClose();
  };

  const handleLogout = () => {
    onLogout();
    setIsOpen(false);
    onClose();
  };

  const initials = user.displayName
    .split(' ')
    .map(n => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);

  return (
    <div className="relative user-menu">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-teal-tint/60 transition-colors"
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        {user.avatar ? (
          <Image
            src={user.avatar}
            alt=""
            width={32}
            height={32}
            className="h-8 w-8 rounded-full object-cover"
          />
        ) : (
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-teal-tint text-teal-deep font-medium text-sm">
            {initials}
          </div>
        )}
        <span className="text-sm font-medium text-ink truncate max-w-[120px]">{user.displayName}</span>
        <svg className="w-4 h-4 text-ink/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl border border-ink/10 shadow-xl shadow-teal/10 z-50 py-1">
          <div className="px-3 py-2 border-b border-ink/10">
            <p className="font-medium text-ink">{user.displayName}</p>
            <p className="text-xs text-ink/50 truncate">{user.email}</p>
          </div>
          <nav className="py-1">
            <button
              onClick={() => handleNavigate('/profile')}
              className="w-full flex items-center gap-3 px-3 py-2 text-sm text-ink/70 hover:bg-teal-tint/60 transition-colors"
            >
              <svg className="w-5 h-5 text-ink/50" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h18a7 7 0 00-7-7z" /></svg>
              <span>My Profile</span>
            </button>
            <button
              onClick={() => handleNavigate('/settings')}
              className="w-full flex items-center gap-3 px-3 py-2 text-sm text-ink/70 hover:bg-teal-tint/60 transition-colors"
            >
              <svg className="w-5 h-5 text-ink/50" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
              <span>Settings</span>
            </button>
            <button
              onClick={() => handleNavigate('/community')}
              className="w-full flex items-center gap-3 px-3 py-2 text-sm text-ink/70 hover:bg-teal-tint/60 transition-colors"
            >
              <svg className="w-5 h-5 text-ink/50" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
              <span>Community</span>
            </button>
            <button
              onClick={() => handleNavigate('/notifications')}
              className="w-full flex items-center gap-3 px-3 py-2 text-sm text-ink/70 hover:bg-teal-tint/60 transition-colors relative"
            >
              <svg className="w-5 h-5 text-ink/50" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-1.5-.329m-12.452 0A5.987 5.987 0 006 14.158V17H3m13.971-4.144A12.062 12.062 0 013 14.158V11a5.994 5.994 0 011.5-.329m0 0l4.113-4.113" /></svg>
              <span>Notifications</span>
            </button>
          </nav>
          <div className="border-t border-ink/10 p-2">
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-3 px-3 py-2 text-sm text-apricot-deep hover:bg-apricot-tint/60 transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>
              <span>Log out</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}