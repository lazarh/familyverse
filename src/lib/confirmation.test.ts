import { describe, expect, it } from 'vitest';
import {
  CONFIRMATION_TOKEN_TTL_MS,
  issueConfirmationToken,
  registrationPlan,
} from './confirmation';

// #20 D2 spec tests: the register route's resend decision matrix and the
// token issuance shared by register, register-resend and the resend endpoint.

describe('registrationPlan (register route decision, #20 D2)', () => {
  it('no existing row → create', () => {
    expect(registrationPlan(null)).toEqual({ action: 'create' });
  });

  it('existing UNCONFIRMED row → resend for that user (was: dead-end 409)', () => {
    expect(registrationPlan({ id: 7, isConfirmed: false })).toEqual({ action: 'resend', userId: 7 });
  });

  it('existing CONFIRMED row → conflict (the 409 stays)', () => {
    expect(registrationPlan({ id: 7, isConfirmed: true })).toEqual({ action: 'conflict' });
  });
});

describe('issueConfirmationToken (fresh 24h per issue, #20 D2)', () => {
  it('issues a uuid v4 whose expiry is exactly now + 24h', () => {
    const now = Date.UTC(2026, 8, 23);
    const { token, expiresAt } = issueConfirmationToken(now);

    expect(token).toMatch(/^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/);
    expect(CONFIRMATION_TOKEN_TTL_MS).toBe(24 * 60 * 60 * 1000);
    expect(expiresAt.getTime()).toBe(now + CONFIRMATION_TOKEN_TTL_MS);
  });

  it('two issues never share a token (a resend rotates)', () => {
    expect(issueConfirmationToken().token).not.toBe(issueConfirmationToken().token);
  });
});
