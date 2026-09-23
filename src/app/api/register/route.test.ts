import { beforeEach, describe, expect, it, vi } from 'vitest';
import { POST } from './route';

// #20 route-level tests: the D2 resend decision (create/resend/conflict) as
// the HTTP surface sees it, the D7 min-8 check, and mail failures surfacing
// as retriable 502s. Prisma and the mailer are mocked — no DB, no sockets.

const { findUnique, update, create, sendConfirmationEmail } = vi.hoisted(() => ({
  findUnique: vi.fn(),
  update: vi.fn(),
  create: vi.fn(),
  sendConfirmationEmail: vi.fn(),
}));

vi.mock('@/lib/prisma', () => ({
  default: {
    user: { findUnique, update, create },
    $transaction: vi.fn(async (fn: (tx: unknown) => Promise<unknown>) =>
      fn({ user: { create } }),
    ),
  },
}));

vi.mock('@/lib/mailer', () => ({ sendConfirmationEmail }));

function post(body: unknown): Request {
  return new Request('http://localhost/api/register', {
    method: 'POST',
    body: JSON.stringify(body),
  });
}

const VALID = { email: 'new@familyverse.local', password: 'secret123', website_url: '' };

beforeEach(() => {
  vi.clearAllMocks();
  findUnique.mockResolvedValue(null);
  create.mockResolvedValue({ id: 1, email: VALID.email });
  update.mockResolvedValue({});
  sendConfirmationEmail.mockResolvedValue(undefined);
});

describe('POST /api/register (#20)', () => {
  it('creates the account with a 24h token and mails the link (201)', async () => {
    const res = await POST(post(VALID));

    expect(res.status).toBe(201);
    expect((await res.json()).message).toBe('Registration successful, confirmation email sent.');

    const created = create.mock.calls[0][0].data;
    expect(created.isConfirmed).toBe(false);
    expect(created.confirmationToken).toMatch(/^[0-9a-f-]{36}$/);
    expect(new Date(created.confirmationTokenExpiry).getTime()).toBeCloseTo(
      Date.now() + 24 * 60 * 60 * 1000,
      -3,
    );
    expect(sendConfirmationEmail).toHaveBeenCalledWith({
      to: VALID.email,
      token: created.confirmationToken,
    });
  });

  it('rejects a 6-char password with the min-8 message (#20 D7)', async () => {
    const res = await POST(post({ ...VALID, password: 'secret1' }));

    expect(res.status).toBe(400);
    expect((await res.json()).error).toBe('Password must be at least 8 characters long');
    expect(create).not.toHaveBeenCalled();
  });

  it('accepts an 8-char password (the new boundary)', async () => {
    expect((await POST(post({ ...VALID, password: '12345678' }))).status).toBe(201);
  });

  it('confirmed email → 409, no rotation, no mail', async () => {
    findUnique.mockResolvedValue({ id: 5, email: VALID.email, isConfirmed: true });

    const res = await POST(post(VALID));

    expect(res.status).toBe(409);
    expect((await res.json()).error).toBe('User already exists');
    expect(update).not.toHaveBeenCalled();
    expect(sendConfirmationEmail).not.toHaveBeenCalled();
  });

  it('unconfirmed email → 200, token rotated (fresh 24h), same email resent (#20 D2)', async () => {
    findUnique.mockResolvedValue({
      id: 5,
      email: VALID.email,
      isConfirmed: false,
      confirmationToken: 'stale-token',
    });

    const res = await POST(post(VALID));

    expect(res.status).toBe(200);
    expect((await res.json()).message).toBe('Confirmation email sent again. Check your inbox.');
    expect(create).not.toHaveBeenCalled();

    const rotated = update.mock.calls[0][0];
    expect(rotated.where).toEqual({ id: 5 });
    expect(rotated.data.confirmationToken).not.toBe('stale-token');
    expect(new Date(rotated.data.confirmationTokenExpiry).getTime()).toBeCloseTo(
      Date.now() + 24 * 60 * 60 * 1000,
      -3,
    );
    expect(sendConfirmationEmail).toHaveBeenCalledWith({
      to: VALID.email,
      token: rotated.data.confirmationToken,
    });
  });

  it('mail failure on create → retriable 502 with code, account left resendable (#20 D2)', async () => {
    sendConfirmationEmail.mockRejectedValue(new Error('smtp down'));

    const res = await POST(post(VALID));

    expect(res.status).toBe(502);
    const body = await res.json();
    expect(body.code).toBe('MAIL_SEND_FAILED');
    expect(body.error).toMatch(/try again/i);
    // the row exists, so retrying the same form takes the resend path above
    expect(create).toHaveBeenCalledTimes(1);
  });

  it('mail failure on resend → the same retriable 502 (#20 D2)', async () => {
    findUnique.mockResolvedValue({ id: 5, email: VALID.email, isConfirmed: false });
    sendConfirmationEmail.mockRejectedValue(new Error('smtp down'));

    const res = await POST(post(VALID));

    expect(res.status).toBe(502);
    expect((await res.json()).code).toBe('MAIL_SEND_FAILED');
  });

  it('honeypot still short-circuits generically (#20 D6 non-goal: unchanged)', async () => {
    const res = await POST(post({ ...VALID, website_url: 'http://spam' }));

    expect(res.status).toBe(400);
    expect((await res.json()).error).toBe('Registration failed.');
    expect(findUnique).not.toHaveBeenCalled();
  });
});
