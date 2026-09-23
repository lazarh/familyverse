'use client';

/**
 * AvatarMenu — the session menu top-right (prototype index.html `.avatar-btn`):
 * a circular monogram avatar from the signed-in email, the email as the
 * group's micro-line, and Sign out (#13: *session actions live with the
 * signed-in identity*).
 */
import { signOut, useSession } from 'next-auth/react';
import { Menu, MenuGroup, MenuItem, Monogram } from '@/app/components/ui';

/**
 * Steel blue — the prototype avatar's colour, and any palette slot satisfies
 * the ticket ("any palette colour"); slot 2 keeps the artifact identical.
 */
const AVATAR_COLOR_SLOT = 2;

/**
 * Name handed to `Monogram`, which runs `monogramInitials` on it: the email's
 * local part with `.`/`_` treated as word breaks, so `maya.kessler@…`
 * monograms to `MK` (`monogramInitials` itself only splits whitespace/hyphens).
 */
function initialsFromEmail(email: string | null | undefined): string {
  if (!email) return '';
  const local = email.split('@')[0];
  return local.replace(/[._]+/g, ' ').trim();
}

export default function AvatarMenu() {
  const { data: session } = useSession();
  const email = session?.user?.email ?? null;
  const initialsSource = initialsFromEmail(email);
  const displayName = initialsSource || email || '?';

  const panel = (
    <MenuGroup label="Signed in" sub={email ?? 'Not signed in'}>
      <MenuItem danger onClick={() => signOut()}>
        Sign out
      </MenuItem>
    </MenuGroup>
  );

  return (
    <Menu label="Account menu" align="right" panel={panel}>
      <span className="inline-flex rounded-full shadow-[0_0_0_2px_var(--paper),0_0_0_3px_var(--line-strong)]">
        <Monogram
          name={displayName}
          personId={AVATAR_COLOR_SLOT}
          size={34}
          decorative
        />
      </span>
    </Menu>
  );
}
