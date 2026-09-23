'use client';

/**
 * AppNav — the sticky 60px bar from prototype/index.html: brand + family
 * switcher on the left, avatar menu on the right, warm translucent paper
 * with a hairline bottom border (#13 route-group nav).
 */
import Link from 'next/link';
import FamilySwitcher from './FamilySwitcher';
import AvatarMenu from './AvatarMenu';

export default function AppNav() {
  return (
    <header className="sticky top-0 z-40 flex h-[60px] items-center justify-between gap-4 border-b border-[var(--line)] bg-[rgba(251,247,240,0.92)] px-6 backdrop-blur-[8px]">
      <div className="flex min-w-0 items-center gap-[14px]">
        <Link
          href="/"
          className="flex flex-none items-center gap-[9px] text-[17px] font-bold tracking-[-0.02em] text-[var(--ink)]"
        >
          <svg
            aria-hidden="true"
            width="21"
            height="21"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            className="text-[var(--clay)]"
          >
            <circle cx="12" cy="4.8" r="2.6" />
            <circle cx="5.6" cy="18.6" r="2.6" />
            <circle cx="18.4" cy="18.6" r="2.6" />
            <path d="M12 7.4v4.2M12 11.6 6.4 16.4M12 11.6l5.6 4.8" />
          </svg>
          Familyverse
        </Link>
        <span aria-hidden="true" className="h-[22px] w-px flex-none bg-[var(--line-strong)]" />
        <FamilySwitcher />
      </div>
      <div className="flex flex-none items-center gap-[14px]">
        <AvatarMenu />
      </div>
    </header>
  );
}
