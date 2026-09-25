/**
 * Shared SMTP mailer (#20, D2 amendment "configurable SMTP"). This transport
 * config used to be inlined in src/app/api/register/route.ts; it lives here so
 * register (create), register (resend) and POST /api/register/resend all send
 * through ONE code path, and the real server (#18) is wired purely by env.
 *
 * Env (dev defaults match the compose stack — MailHog, no auth, no TLS):
 *   SMTP_HOST     default `mailhog` — the compose service name; host-side bare
 *                 `npm run dev` overrides with localhost (.env.example)
 *   SMTP_PORT     default 1025 (any non-positive/garbage value falls back too)
 *   SMTP_FROM     default no-reply@familyverse.local
 *   SMTP_SECURE   optional: "true" → implicit TLS (SMTPS), "starttls" →
 *                 require STARTTLS; anything else/absent → plaintext
 *   SMTP_USER / SMTP_PASS  optional — auth is attached only when BOTH are set
 *                 (a half-set block would attempt a login MailHog rejects)
 *   SMTP_TLS_REJECT_UNAUTHORIZED  default "true" (verify the server
 *                 certificate). Set "false" for a self-signed/LAN SMTP server
 *                 (#20 integration note: secure-by-default; pre-#20 the route
 *                 hardcoded false, now it's opt-out via env).
 *
 * Failures THROW: callers must surface them as retriable (HTTP 5xx) — an
 * unconfirmed account must never be a dead end (#20 D2).
 */
import nodemailer from 'nodemailer';

/** Anything process.env-shaped; tests pass plain objects. */
export type MailEnv = Record<string, string | undefined>;

export interface SmtpSettings {
  host: string;
  port: number;
  from: string;
  secure: boolean;
  requireTLS: boolean;
  /** Verify the SMTP server certificate — env `SMTP_TLS_REJECT_UNAUTHORIZED`,
   *  default true (secure). Only the exact word "false" opts out. */
  rejectUnauthorized: boolean;
  auth?: { user: string; pass: string };
}

/** Read the SMTP_* env block. Pure — unit-tested in mailer.test.ts (#20). */
export function smtpSettings(env: MailEnv = process.env): SmtpSettings {
  const port = Number(env.SMTP_PORT);
  // Deliberately opt-in: only the exact words "true"/"starttls" turn TLS on,
  // the dev default is plaintext MailHog (#20 lists those two spellings).
  const secureValue = (env.SMTP_SECURE || '').trim().toLowerCase();

  return {
    host: env.SMTP_HOST || 'mailhog',
    port: Number.isInteger(port) && port > 0 ? port : 1025,
    from: env.SMTP_FROM || 'no-reply@familyverse.local',
    secure: secureValue === 'true',
    requireTLS: secureValue === 'starttls',
    rejectUnauthorized: (env.SMTP_TLS_REJECT_UNAUTHORIZED || '').trim().toLowerCase() !== 'false',
    auth:
      env.SMTP_USER && env.SMTP_PASS
        ? { user: env.SMTP_USER, pass: env.SMTP_PASS }
        : undefined,
  };
}

export interface ConfirmationMailInput {
  /** Recipient (the pending account's email). */
  to: string;
  /** Confirmation token — the link is built from NEXT_PUBLIC_APP_URL. */
  token: string;
  env?: MailEnv;
}

/** Subject + HTML for the confirmation mail. Pure, so the link building is
 *  unit-testable without a transport; identical body for first send and
 *  resend ("resend the same email", #20 D2). */
export function confirmationMailOptions({ to, token, env = process.env }: ConfirmationMailInput) {
  const settings = smtpSettings(env);
  const appUrl = env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
  const confirmLink = `${appUrl}/confirm?token=${token}`;

  return {
    from: settings.from,
    to,
    subject: 'Confirm your Family Verse account',
    html: `<p>Thanks for registering. Please confirm your email by clicking the link below:</p>
           <p><a href="${confirmLink}">Confirm your email</a></p>
           <p>If you did not sign up, ignore this message.</p>`,
  };
}

/** Build the transport from env and send. Throws on failure (#20 D2: the
 *  register/resend routes turn that into a retriable 5xx). */
export async function sendConfirmationEmail(input: ConfirmationMailInput): Promise<void> {
  const env = input.env ?? process.env;
  const settings = smtpSettings(env);

  const transporter = nodemailer.createTransport({
    host: settings.host,
    port: settings.port,
    secure: settings.secure,
    requireTLS: settings.requireTLS,
    auth: settings.auth,
    // #20 integration: certificate verification is ON by default (hardening
    // ticket — pre-#20 hardcoded false). Self-signed/LAN servers opt out via
    // SMTP_TLS_REJECT_UNAUTHORIZED=false; compose wiring lands in #18.
    tls: { rejectUnauthorized: settings.rejectUnauthorized },
  });

  await transporter.sendMail(confirmationMailOptions(input));
}
