import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { issueConfirmationToken, MAIL_SEND_FAILED, RESENT_MESSAGE } from '@/lib/confirmation';
import { sendConfirmationEmail } from '@/lib/mailer';

/**
 * POST /api/register/resend — #20 D2: the /confirm page's escape hatch.
 * An expired/invalid link used to be a dead end; this endpoint rotates the
 * token for a PENDING (unconfirmed) account and mails the link again, via
 * the same token-issuance + mailer code path as POST /api/register.
 *
 * Deliberate: the answers distinguish unknown (404) from already-confirmed
 * (409, "sign in instead") because that is genuinely useful on the confirm
 * page — account enumeration is an accepted deferral at household scale
 * (#20 D7, and /api/register already answers 409 for a confirmed email).
 */
export async function POST(request: Request) {
  try {
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 });
    }

    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
      return NextResponse.json(
        { error: 'No account is waiting for confirmation at that email.' },
        { status: 404 },
      );
    }

    if (user.isConfirmed) {
      return NextResponse.json(
        { error: 'This email is already confirmed — sign in instead.', code: 'ALREADY_CONFIRMED' },
        { status: 409 },
      );
    }

    // #20 D2: fresh token, fresh 24h — the previously mailed link stays dead.
    const { token, expiresAt } = issueConfirmationToken();
    await prisma.user.update({
      where: { id: user.id },
      data: { confirmationToken: token, confirmationTokenExpiry: expiresAt },
    });

    try {
      await sendConfirmationEmail({ to: email, token });
    } catch (mailErr) {
      console.error('Failed to resend confirmation email:', mailErr);
      return NextResponse.json(MAIL_SEND_FAILED, { status: 502 });
    }

    return NextResponse.json({ message: RESENT_MESSAGE }, { status: 200 });
  } catch (error) {
    console.error('Resend confirmation error:', error);
    if (error instanceof SyntaxError) {
      return NextResponse.json({ error: 'Invalid JSON payload' }, { status: 400 });
    }
    return NextResponse.json({ error: 'An unexpected error occurred.' }, { status: 500 });
  }
}
