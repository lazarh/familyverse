'use client';

/**
 * STUB — the real AppNav (brand + FamilySwitcher + AvatarMenu, 60px sticky
 * bar per the approved prototype) is built in the screen batch (ticket #16,
 * structure from #13). Standalone on purpose: it imports nothing else, so
 * every parallel screen can typecheck against the (app) layout immediately.
 */
export default function AppNav() {
  return (
    <header
      style={{
        height: 60,
        display: 'flex',
        alignItems: 'center',
        padding: '0 24px',
        borderBottom: '1px solid var(--line, #E5DACA)',
      }}
    >
      Familyverse
    </header>
  );
}
