import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import bcrypt from 'bcrypt';

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    // Basic validation
    if (!email || !password) {
      return NextResponse.json({ error: 'Email and password are required' }, { status: 400 });
    }
    if (password.length < 6) {
      return NextResponse.json({ error: 'Password must be at least 6 characters long' }, { status: 400 });
    }

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
      // Use Prisma transaction to create user.
      const newUser = await prisma.$transaction(async (tx) => {
        const user = await tx.user.create({
          data: {
            email,
            password: hashedPassword,
          },
        });

        return user; // Return only the user
      });

      // Exclude password from the returned user object
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password: _, ...userWithoutPassword } = newUser;

      return NextResponse.json(userWithoutPassword, { status: 201 });
    } catch (error: unknown) {
      console.error('Registration transaction error:', error);
      // In production, consider more specific error handling or logging
      if (error instanceof Error && error.message.includes('Unique constraint failed')) {
        // This might be redundant if the initial email check is thorough, but good for safety
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
