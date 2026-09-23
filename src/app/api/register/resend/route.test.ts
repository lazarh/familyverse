import { beforeEach, describe, expect, it, vi } from 'vitest';
import { POST } from './route';

// #20 D2: POST /api/register/resend is the /confirm page's escape hatch —
// these are its HTTP contracts (pending/unknown/confirmed/send-failure).

const { findUnique, update, sendConfirmationEmail } = vi.hoisted(() => ({
  findUnique: vi.fn(),
  update: vi.fn(),
  sendConfirmationEmail: vi.fn(),
}));

vi.mock('@/lib/prisma', () => ({
  default: { user: { findUnique, update } },
}));

vi.mock('@/lib/mailer', () => ({ sendConfirmationEmail }));

function post(body: unknown): Request {
  return new Request('http://localhost/api/register/resend', {
    method: 'POST',
    body: JSON.stringify(body),
  });
}

const EMAIL = 'pending@familyverse.local';

beforeEach(() => {
  vi.clearAllMocks();
  findUnique.mockResolvedValue({ id: 9, email: EMAIL, isConfirmed: false, confirmationToken: 'stale' });
  update.mockResolvedValue({});
  sendConfirmationEmail.mockResolvedValue(undefined);
});

describe('POST /api/register/resend (#20 D2)', () => {
  it('rotates the token (fresh 24h) and resends for a pending account (200)', async () => {
    const res = await POST(post({ email: EMAIL }));

    expect(res.status).toBe(200);
    expect((await res.json()).message).toBe('Confirmation email sent again. Check your inbox.');

    const rotated = update.mock.calls[0][0];
    expect(rotated.where).toEqual({ id: 9 });
    expect(rotated.data.confirmationToken).not.toBe('stale');
    expect(new Date(rotated.data.confirmationTokenExpiry).getTime()).toBeCloseTo(
      Date.now() + 24 * 60 * 60 * 1000,
      -3,
    );
    expect(sendConfirmationEmail).toHaveBeenCalledWith({
      to: EMAIL,
      token: rotated.data.confirmationToken,
    });
  });

  it('unknown email → 404 (nothing pending)', async () => {
    findUnique.mockResolvedValue(null);

    const res = await POST(post({ email: 'nobody@familyverse.local' }));

    expect(res.status).toBe(404);
    expect((await res.json()).error).toMatch(/waiting for confirmation/);
    expect(update).not.toHaveBeenCalled();
    expect(sendConfirmationEmail).not.toHaveBeenCalled();
  });

  it('confirmed email → 409 ALREADY_CONFIRMED, points at sign-in', async () => {
    findUnique.mockResolvedValue({ id: 9, email: EMAIL, isConfirmed: true });

    const res = await POST(post({ email: EMAIL }));

    expect(res.status).toBe(409);
    const body = await res.json();
    expect(body.code).toBe('ALREADY_CONFIRMED');
    expect(body.error).toMatch(/sign in/i);
    expect(sendConfirmationEmail).not.toHaveBeenCalled();
  });

  it('missing email → 400', async () => {
    const res = await POST(post({}));

    expect(res.status).toBe(400);
    expect(findUnique).not.toHaveBeenCalled();
  });

  it('send failure → retriable 502 with code (#20 D2: never a dead end)', async () => {
    sendConfirmationEmail.mockRejectedValue(new Error('smtp down'));

    const res = await POST(post({ email: EMAIL }));

    expect(res.status).toBe(502);
    expect((await res.json()).code).toBe('MAIL_SEND_FAILED');
  });

  it('invalid JSON → 400, not a 500', async () => {
    const res = await POST(
      new Request('http://localhost/api/register/resend', { method: 'POST', body: 'not json' }),
    );

    expect(res.status).toBe(400);
  });
});
