import { beforeEach, describe, expect, it, vi } from 'vitest';
import nodemailer from 'nodemailer';
import { confirmationMailOptions, sendConfirmationEmail, smtpSettings } from './mailer';

// #20 D2 amendment ("configurable SMTP"): the transport config moved out of
// the register route into this shared mailer, so every env knob gets a spec
// test here. The transport itself is mocked — unit tests open no sockets.

const { sendMail } = vi.hoisted(() => ({ sendMail: vi.fn() }));

vi.mock('nodemailer', () => ({
  default: { createTransport: vi.fn(() => ({ sendMail })) },
}));

describe('smtpSettings (env parsing)', () => {
  it('defaults to the compose dev stack: mailhog:1025, familyverse no-reply, plaintext, no auth, TLS verified', () => {
    expect(smtpSettings({})).toEqual({
      host: 'mailhog',
      port: 1025,
      from: 'no-reply@familyverse.local',
      secure: false,
      requireTLS: false,
      rejectUnauthorized: true,
      auth: undefined,
    });
  });

  it('honours host/port/from overrides', () => {
    expect(
      smtpSettings({ SMTP_HOST: 'smtp.example', SMTP_PORT: '587', SMTP_FROM: 'hi@example' }),
    ).toMatchObject({ host: 'smtp.example', port: 587, from: 'hi@example' });
  });

  it('falls back to 1025 for empty, garbage or non-positive ports', () => {
    expect(smtpSettings({ SMTP_PORT: '' }).port).toBe(1025);
    expect(smtpSettings({ SMTP_PORT: 'not-a-port' }).port).toBe(1025);
    expect(smtpSettings({ SMTP_PORT: '-1' }).port).toBe(1025);
    expect(smtpSettings({ SMTP_PORT: '0' }).port).toBe(1025);
  });

  it('SMTP_SECURE: "true" → implicit TLS, "starttls" → requireTLS, anything else → plaintext', () => {
    expect(smtpSettings({ SMTP_SECURE: 'true' })).toMatchObject({ secure: true, requireTLS: false });
    expect(smtpSettings({ SMTP_SECURE: 'TRUE' })).toMatchObject({ secure: true, requireTLS: false });
    expect(smtpSettings({ SMTP_SECURE: 'starttls' })).toMatchObject({
      secure: false,
      requireTLS: true,
    });
    expect(smtpSettings({ SMTP_SECURE: 'false' })).toMatchObject({
      secure: false,
      requireTLS: false,
    });
    expect(smtpSettings({ SMTP_SECURE: 'tls' })).toMatchObject({ secure: false, requireTLS: false });
  });

  it('SMTP_TLS_REJECT_UNAUTHORIZED: verification on by default, exact "false" opts out (self-signed LAN servers)', () => {
    expect(smtpSettings({}).rejectUnauthorized).toBe(true);
    expect(smtpSettings({ SMTP_TLS_REJECT_UNAUTHORIZED: 'true' }).rejectUnauthorized).toBe(true);
    expect(smtpSettings({ SMTP_TLS_REJECT_UNAUTHORIZED: '' }).rejectUnauthorized).toBe(true);
    expect(smtpSettings({ SMTP_TLS_REJECT_UNAUTHORIZED: 'no' }).rejectUnauthorized).toBe(true);
    expect(smtpSettings({ SMTP_TLS_REJECT_UNAUTHORIZED: 'false' }).rejectUnauthorized).toBe(false);
    expect(smtpSettings({ SMTP_TLS_REJECT_UNAUTHORIZED: 'FALSE' }).rejectUnauthorized).toBe(false);
  });

  it('attaches auth only when BOTH SMTP_USER and SMTP_PASS are set', () => {
    expect(smtpSettings({ SMTP_USER: 'u', SMTP_PASS: 'p' }).auth).toEqual({
      user: 'u',
      pass: 'p',
    });
    expect(smtpSettings({ SMTP_USER: 'u' }).auth).toBeUndefined();
    expect(smtpSettings({ SMTP_PASS: 'p' }).auth).toBeUndefined();
    expect(smtpSettings({ SMTP_USER: '', SMTP_PASS: '' }).auth).toBeUndefined();
  });
});

describe('confirmationMailOptions (the mail body, shared by send + resend)', () => {
  it('builds the confirm link from NEXT_PUBLIC_APP_URL with the default from-address', () => {
    const options = confirmationMailOptions({ to: 'pending@familyverse.local', token: 'tok-123', env: {} });
    expect(options.from).toBe('no-reply@familyverse.local');
    expect(options.to).toBe('pending@familyverse.local');
    expect(options.subject).toBe('Confirm your Family Verse account');
    expect(options.html).toContain('http://localhost:3000/confirm?token=tok-123');
  });

  it('honours SMTP_FROM and a custom app URL; resend is the SAME body (#20 D2)', () => {
    const env = { SMTP_FROM: 'boards@example', NEXT_PUBLIC_APP_URL: 'https://family.example' };
    const first = confirmationMailOptions({ to: 'a@familyverse.local', token: 'tok', env });
    const again = confirmationMailOptions({ to: 'a@familyverse.local', token: 'tok', env });

    expect(first.from).toBe('boards@example');
    expect(first.html).toContain('https://family.example/confirm?token=tok');
    expect(again).toEqual(first);
  });
});

describe('sendConfirmationEmail (transport wiring)', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('creates the transport from env and sends the built options', async () => {
    await sendConfirmationEmail({
      to: 'a@familyverse.local',
      token: 'tok-1',
      env: { SMTP_HOST: 'smtp.example', SMTP_PORT: '2525', SMTP_USER: 'u', SMTP_PASS: 'p' },
    });

    expect(nodemailer.createTransport).toHaveBeenCalledWith(
      expect.objectContaining({ host: 'smtp.example', port: 2525, auth: { user: 'u', pass: 'p' } }),
    );
    expect(sendMail).toHaveBeenCalledWith(
      expect.objectContaining({ to: 'a@familyverse.local', subject: 'Confirm your Family Verse account' }),
    );
  });

  it('propagates transport failures so the routes can answer a retriable 5xx (#20 D2)', async () => {
    sendMail.mockRejectedValueOnce(new Error('connection refused'));
    await expect(
      sendConfirmationEmail({ to: 'a@familyverse.local', token: 'tok', env: {} }),
    ).rejects.toThrow('connection refused');
  });
});
