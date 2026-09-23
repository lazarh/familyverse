import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import bcrypt from 'bcrypt';
import {
  issueConfirmationToken,
  MAIL_SEND_FAILED,
  RESENT_MESSAGE,
  registrationPlan,
} from '@/lib/confirmation';
import { sendConfirmationEmail } from '@/lib/mailer';

export async function POST(request: Request) {
  try {
    const { email, password, website_url } = await request.json(); // Add website_url for honeypot

    // Honeypot check. #20 D6 is a NON-GOAL: registration stays open with
    // email confirmation as the only step — the honeypot is unchanged.
    if (website_url) {
      // If honeypot field is filled, it's likely a bot
      console.log('Honeypot triggered for email:', email);
      // Return a generic error to avoid revealing the honeypot mechanism
      return NextResponse.json({ error: 'Registration failed.' }, { status: 400 }); 
    }

    // Basic validation
    if (!email || !password) {
      return NextResponse.json({ error: 'Email and password are required' }, { status: 400 });
    }
    // #20 D7: minimum raised 6 → 8 (UI hint and tests moved with it).
    if (password.length < 8) {
      return NextResponse.json({ error: 'Password must be at least 8 characters long' }, { status: 400 });
    }

    // No invite code required anymore; use email confirmation flow instead
    // (#20 D6 re-affirmed: no registration gate of any kind).

    // Check what already exists for this email, then act on the shared plan
    // (#20 D2: create / resend / conflict — see registrationPlan).
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });
    const plan = registrationPlan(existingUser);

    if (plan.action === 'conflict') {
      return NextResponse.json({ error: 'User already exists' }, { status: 409 }); // 409 Conflict
    }

    // #20 D2: an UNCONFIRMED duplicate is not a conflict — rotate the token
    // (fresh 24h) and resend the same email instead of dead-ending. The
    // password is deliberately left as first submitted: the caller has not
    // proven ownership, and the decision record only rotates the token.
    if (plan.action === 'resend') {
      const { token, expiresAt } = issueConfirmationToken();
      await prisma.user.update({
        where: { id: plan.userId },
        data: { confirmationToken: token, confirmationTokenExpiry: expiresAt },
      });

      try {
        await sendConfirmationEmail({ to: email, token });
      } catch (mailErr) {
        console.error('Failed to resend confirmation email:', mailErr);
        return NextResponse.json(MAIL_SEND_FAILED, { status: 502 });
      }

      return NextResponse.json({ message: RESENT_MESSAGE }, { status: 200 });
    }

    // plan.action === 'create' — new account + first confirmation token (24h).
    const hashedPassword = await bcrypt.hash(password, 10);
    const { token, expiresAt } = issueConfirmationToken();

    try {
      // Use Prisma transaction to create user with confirmation token
      // (wrapper kept from the pre-#20 route; a single create is atomic
      // either way, the shape is deliberately unchanged).
      await prisma.$transaction(async (tx) => {
        await tx.user.create({
          data: {
            email,
            password: hashedPassword,
            isConfirmed: false,
            confirmationToken: token,
            confirmationTokenExpiry: expiresAt,
          },
        });
      });
    } catch (error: unknown) {
      console.error('Registration transaction error:', error);
      if (error instanceof Error && error.message.includes('Unique constraint failed')) {
        return NextResponse.json({ error: 'User already exists or a related unique constraint failed.' }, { status: 409 });
      }
      return NextResponse.json({ error: 'An unexpected error occurred during registration processing.' }, { status: 500 });
    }

    try {
      await sendConfirmationEmail({ to: email, token });
    } catch (mailErr) {
      // #20 D2: surfaced, never swallowed — the account EXISTS but is
      // unconfirmed, so answer 5xx with a code the UI can show. It is not a
      // dead end: resubmitting the form takes the resend path above, and the
      // /confirm page has its own resend affordance.
      console.error('Failed to send confirmation email:', mailErr);
      return NextResponse.json(MAIL_SEND_FAILED, { status: 502 });
    }

    return NextResponse.json({ message: 'Registration successful, confirmation email sent.' }, { status: 201 });
  } catch (error) {
    // Catch errors from request.json() or initial validation
    console.error('Outer registration error:', error);
    if (error instanceof SyntaxError) {
        return NextResponse.json({ error: 'Invalid JSON payload' }, { status: 400 });
    }
    return NextResponse.json({ error: 'An unexpected error occurred.' }, { status: 500 });
  }
}
