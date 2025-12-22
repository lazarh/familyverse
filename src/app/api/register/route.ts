import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';
import nodemailer from 'nodemailer';

export async function POST(request: Request) {
  try {
    const { email, password, website_url } = await request.json(); // Add website_url for honeypot

    // Honeypot check
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
    if (password.length < 6) {
      return NextResponse.json({ error: 'Password must be at least 6 characters long' }, { status: 400 });
    }

    // No invite code required anymore; use email confirmation flow instead

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json({ error: 'User already exists' }, { status: 409 }); // 409 Conflict
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    try {
      // Generate a confirmation token and expiry (24 hours)
      const token = uuidv4();
      const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24h

      // Use Prisma transaction to create user with confirmation token.
      const newUser = await prisma.$transaction(async (tx) => {
        const user = await tx.user.create({
          data: {
            email,
            password: hashedPassword,
            isConfirmed: false,
            confirmationToken: token,
            confirmationTokenExpiry: expiresAt,
          },
        });

        return user;
      });

      // Send confirmation email via SMTP (MailHog by default on localhost:1025)
      const smtpHost = process.env.SMTP_HOST || 'mailhog.flat.local';
      const smtpPort = Number(process.env.SMTP_PORT || '1025');
      const fromAddress = process.env.SMTP_FROM || 'no-reply@familyverse.local';
      const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';

      const transporter = nodemailer.createTransport({
        host: smtpHost,
        port: smtpPort,
        secure: false,
        tls: { rejectUnauthorized: false },
      });

      const confirmLink = `${appUrl}/confirm?token=${token}`;

      const mailOptions = {
        from: fromAddress,
        to: email,
        subject: 'Confirm your Familyverse account',
        html: `<p>Thanks for registering. Please confirm your email by clicking the link below:</p>
               <p><a href="${confirmLink}">Confirm your email</a></p>
               <p>If you did not sign up, ignore this message.</p>`,
      };

      try {
        await transporter.sendMail(mailOptions);
      } catch (mailErr) {
        console.error('Failed to send confirmation email:', mailErr);
        // Note: We created the user already; in production you might roll back or retry.
      }

      // Exclude password from the returned user object
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password: _, ...userWithoutPassword } = newUser;

      return NextResponse.json({ message: 'Registration successful, confirmation email sent.' }, { status: 201 });
    } catch (error: unknown) {
      console.error('Registration transaction error:', error);
      if (error instanceof Error && error.message.includes('Unique constraint failed')) {
        return NextResponse.json({ error: 'User already exists or a related unique constraint failed.' }, { status: 409 });
      }
      return NextResponse.json({ error: 'An unexpected error occurred during registration processing.' }, { status: 500 });
    }
  } catch (error) {
    // Catch errors from request.json() or initial validation
    console.error('Outer registration error:', error);
    if (error instanceof SyntaxError) {
        return NextResponse.json({ error: 'Invalid JSON payload' }, { status: 400 });
    }
    return NextResponse.json({ error: 'An unexpected error occurred.' }, { status: 500 });
  }
}
