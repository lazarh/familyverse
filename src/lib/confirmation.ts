/**
 * Email-confirmation rules shared by POST /api/register (create AND resend)
 * and POST /api/register/resend (#20 D2: an unconfirmed account must never be
 * a dead end — a duplicate registration re-issues the token instead of
 * 409ing, and the /confirm page can trigger the same resend).
 *
 * Pure on purpose (no prisma import): the decision matrix and token issuance
 * are unit-testable without a database; the routes own the DB reads/writes.
 */
import { v4 as uuidv4 } from 'uuid';

/** #20 D2: every issued token is valid 24h — a resend issues a FRESH 24h. */
export const CONFIRMATION_TOKEN_TTL_MS = 24 * 60 * 60 * 1000;

/** Shared success copy so register-resend and the resend endpoint agree. */
export const RESENT_MESSAGE = 'Confirmation email sent again. Check your inbox.';

/** Shared body for a send failure — #20 D2: retriable (HTTP 502), never
 *  swallowed, with a code the UI can show. */
export const MAIL_SEND_FAILED = {
  error: 'We could not send the confirmation email. Please try again in a moment.',
  code: 'MAIL_SEND_FAILED',
} as const;

/** What POST /api/register does for a given email (#20 D2):
 *  - no row            → create the account
 *  - row, unconfirmed  → resend: rotate the token (fresh 24h), mail again
 *  - row, confirmed    → conflict: keep the historical 409 */
export type RegistrationPlan =
  | { action: 'create' }
  | { action: 'resend'; userId: number }
  | { action: 'conflict' };

export function registrationPlan(
  existing: { id: number; isConfirmed: boolean } | null,
): RegistrationPlan {
  if (!existing) return { action: 'create' };
  if (existing.isConfirmed) return { action: 'conflict' };
  return { action: 'resend', userId: existing.id };
}

/** Fresh confirmation token + expiry (uuid v4, now + 24h) for create/resend. */
export function issueConfirmationToken(
  now: number = Date.now(),
): { token: string; expiresAt: Date } {
  return { token: uuidv4(), expiresAt: new Date(now + CONFIRMATION_TOKEN_TTL_MS) };
}
