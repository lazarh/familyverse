import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function POST(request: Request) {
  try {
    const { token } = await request.json();

    if (!token) {
      return NextResponse.json({ error: 'Token is required' }, { status: 400 });
    }

    const user = await prisma.user.findFirst({ where: { confirmationToken: token } });

    if (!user) {
      return NextResponse.json({ error: 'Invalid or expired token' }, { status: 400 });
    }

    if (user.confirmationTokenExpiry && user.confirmationTokenExpiry < new Date()) {
      return NextResponse.json({ error: 'Token has expired' }, { status: 410 });
    }

    await prisma.user.update({
      where: { id: user.id },
      data: {
        isConfirmed: true,
        confirmationToken: null,
        confirmationTokenExpiry: null,
      },
    });

    return NextResponse.json({ message: 'Email confirmed successfully' });
  } catch (err) {
    console.error('Confirm route error:', err);
    return NextResponse.json({ error: 'An unexpected error occurred' }, { status: 500 });
  }
}
