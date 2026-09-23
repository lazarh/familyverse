'use client';

/**
 * ShareFamilyDialog — "Share & manage family" (prototype form.html/index.html
 * family menu), replacing BOTH legacy modals: Add-User and Remove-User
 * (#13 responsibility map).
 *
 * Consumes the three unchanged legacy routes:
 *  - POST   /api/families/[familyId]/members           { email } (JSON)
 *           → 404 unknown email, 409 already in THIS family, 409 already in
 *             ANOTHER family ("target not already in a family" restriction)
 *  - GET    /api/families/[familyId]/users              → [{ id, email }]
 *           (the session user is filtered out server-side)
 *  - DELETE /api/families/[familyId]/members/[memberUserId]
 *           → 400 self-removal, 403 non-member, 404 not in family
 *
 * Every API message is surfaced verbatim; per-row Remove always goes
 * through an inline confirm step first.
 *
 * The interface is FROZEN (the family switcher in AppNav mounts this).
 */
import { useCallback, useEffect, useState } from 'react';
import type { FormEvent } from 'react';
import { ApiError, apiFetch } from '../../../lib/api';
import { Button, Dialog, EmptyState, Field, Input, Monogram } from '../ui';

export interface ShareFamilyDialogProps {
  familyId: number;
  open: boolean;
  onClose: () => void;
}

/** What GET .../users returns: the family's user accounts, minus yourself. */
interface FamilyUser {
  id: number;
  email: string;
}

/** Inline error copy from an apiFetch throw ({ status, code, message }). */
function errorMessage(error: unknown): string {
  if (error instanceof ApiError) return error.message;
  if (error instanceof TypeError) return 'Could not reach the server — check your connection and try again.';
  return 'Something went wrong. Please try again.';
}

const ERROR_BANNER_CLASS =
  'mb-4 rounded-[8px] border border-[#E4C4BE] bg-[#F8ECEA] px-3 py-2 text-[13.5px] text-[var(--brick)]';
const SUCCESS_BANNER_CLASS =
  'mb-4 rounded-[8px] border border-[#CFDFD3] bg-[#E9F0EA] px-3 py-2 text-[13.5px] text-[var(--sage)]';
const SECTION_TITLE_CLASS =
  'mb-3 text-[12px] font-bold tracking-[0.07em] text-[var(--muted)] uppercase';

/** Monogram copy from an email: `maya.kessler@…` → `MK`. */
function monogramName(email: string): string {
  return email.split('@')[0].replace(/[._-]+/g, ' ');
}

export default function ShareFamilyDialog({
  familyId,
  open,
  onClose,
}: ShareFamilyDialogProps) {
  const [users, setUsers] = useState<FamilyUser[] | null>(null);
  const [listError, setListError] = useState<string | null>(null);

  const [email, setEmail] = useState('');
  const [inviting, setInviting] = useState(false);
  const [inviteError, setInviteError] = useState<string | null>(null);
  const [inviteSuccess, setInviteSuccess] = useState<string | null>(null);

  const [confirmingRemoveId, setConfirmingRemoveId] = useState<number | null>(null);
  const [removingId, setRemovingId] = useState<number | null>(null);
  const [removeError, setRemoveError] = useState<string | null>(null);

  const loadUsers = useCallback(async () => {
    setListError(null);
    try {
      const list = await apiFetch<FamilyUser[]>(`/api/families/${familyId}/users`);
      setUsers(list);
    } catch (error) {
      setUsers(null);
      setListError(errorMessage(error));
    }
  }, [familyId]);

  // Fresh state every time the dialog opens.
  useEffect(() => {
    if (!open) return;
    setEmail('');
    setInviteError(null);
    setInviteSuccess(null);
    setConfirmingRemoveId(null);
    setRemoveError(null);
    void loadUsers();
  }, [open, loadUsers]);

  async function invite(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const target = email.trim();
    if (target === '') {
      setInviteError('Enter an email address.');
      return;
    }
    setInviteError(null);
    setInviteSuccess(null);
    setInviting(true);
    try {
      await apiFetch(`/api/families/${familyId}/members`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: target }),
      });
      setEmail('');
      setInviteSuccess(`${target} now has access to this family.`);
      await loadUsers();
    } catch (error) {
      // Routes' own messages: unknown email, already in this family,
      // already in another family, forbidden, …
      setInviteError(errorMessage(error));
    } finally {
      setInviting(false);
    }
  }

  async function removeUser(userId: number) {
    setRemoveError(null);
    setRemovingId(userId);
    try {
      await apiFetch(`/api/families/${familyId}/members/${userId}`, { method: 'DELETE' });
      setConfirmingRemoveId(null);
      await loadUsers();
    } catch (error) {
      // e.g. "You cannot remove yourself from the family." / 404 not a member
      setRemoveError(errorMessage(error));
      setConfirmingRemoveId(null);
    } finally {
      setRemovingId(null);
    }
  }

  if (!open) return null;

  return (
    <Dialog
      open
      onClose={onClose}
      title="Share & manage family"
      subtitle="Invite people to open this family's tree, or take access away."
      maxWidth={560}
    >
      <p className={SECTION_TITLE_CLASS}>Invite someone</p>
      <form onSubmit={invite}>
        <Field
          label="Email address"
          tag="req"
          hint="They need an existing Familyverse account with this email — no invite email is sent."
        >
          <div className="flex items-center gap-2">
            <div className="min-w-0 flex-1">
              <Input
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="maya@kessler.family"
                autoComplete="off"
              />
            </div>
            <Button type="submit" variant="primary" disabled={inviting}>
              {inviting ? 'Adding…' : 'Add to family'}
            </Button>
          </div>
        </Field>
      </form>

      {inviteError !== null && (
        <p role="alert" className={ERROR_BANNER_CLASS}>
          {inviteError}
        </p>
      )}
      {inviteSuccess !== null && (
        <p role="status" className={SUCCESS_BANNER_CLASS}>
          {inviteSuccess}
        </p>
      )}

      <p className={`${SECTION_TITLE_CLASS} mt-6 border-t border-[var(--line)] pt-[18px]`}>
        People with access
      </p>

      {removeError !== null && (
        <p role="alert" className={ERROR_BANNER_CLASS}>
          {removeError}
        </p>
      )}

      {listError !== null ? (
        <div>
          <p role="alert" className={ERROR_BANNER_CLASS}>
            {listError}
          </p>
          <Button variant="secondary" onClick={() => void loadUsers()}>
            Try again
          </Button>
        </div>
      ) : users === null ? (
        // first paint (and any refetch with no previous list): loading
        <p className="text-[13.5px] text-[var(--muted)]">Loading people…</p>
      ) : users.length === 0 ? (
        <EmptyState
          title="You're the only account with access"
          body="Add people by email above — they'll be able to open this family's tree."
        />
      ) : (
        <ul className="flex flex-col gap-2">
          {users.map((user) => {
            const confirming = confirmingRemoveId === user.id;
            return (
              <li
                key={user.id}
                className="flex items-center gap-3 rounded-[8px] border border-[var(--line)] bg-[var(--card)] px-3 py-[10px]"
              >
                <Monogram name={monogramName(user.email)} personId={user.id} size={34} decorative />
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-[14px] font-650 text-[var(--ink)]">
                    {user.email}
                  </span>
                  {confirming && (
                    <span className="block text-[12.5px] text-[var(--brick)]">
                      Remove {user.email} from the family?
                    </span>
                  )}
                </span>
                {confirming ? (
                  <span className="flex shrink-0 gap-2">
                    <Button
                      variant="ghost"
                      onClick={() => setConfirmingRemoveId(null)}
                      disabled={removingId === user.id}
                    >
                      Cancel
                    </Button>
                    <Button
                      variant="danger"
                      onClick={() => void removeUser(user.id)}
                      disabled={removingId === user.id}
                    >
                      {removingId === user.id ? 'Removing…' : 'Remove'}
                    </Button>
                  </span>
                ) : (
                  <Button
                    variant="danger"
                    onClick={() => setConfirmingRemoveId(user.id)}
                    title={`Remove ${user.email} from this family`}
                  >
                    Remove
                  </Button>
                )}
              </li>
            );
          })}
        </ul>
      )}

      <p className="mt-3 text-[12px] text-[var(--muted)]">
        {`Your own account isn't listed here — you already have access.`}
      </p>
    </Dialog>
  );
}
