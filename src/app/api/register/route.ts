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
      // Use Prisma transaction to create user and default family member
      const newUser = await prisma.$transaction(async (tx) => {
        const user = await tx.user.create({
          data: {
            email,
            password: hashedPassword,
          },
        });

        // Create a default family member for the user
        await tx.familyMember.create({
          data: {
            userId: user.id,
            fullName: `User ${user.id}`, // Default name, user can change later
            gender: 'Unknown', // Default gender
            // Add other default fields as necessary, or leave them null/undefined
          },
        });

        return user;
      });

      // Exclude password from the returned user object
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password: _, ...userWithoutPassword } = newUser;

      return NextResponse.json(userWithoutPassword, { status: 201 });
    } catch (error: unknown) {
      console.error('Registration error:', error);
      // In production, consider more specific error handling or logging
      if (error instanceof Error && error.message.includes('Unique constraint failed')) {
        return NextResponse.json({ error: 'User already exists' }, { status: 409 });
      }
      return NextResponse.json({ error: 'An unexpected error occurred during registration' }, { status: 500 });
    }
  } catch (error) {
    console.error('Registration error:', error);
    // In production, consider more specific error handling or logging
    if (error instanceof Error && error.message.includes('Unique constraint failed')) {
        return NextResponse.json({ error: 'User already exists' }, { status: 409 });
    }
    return NextResponse.json({ error: 'An unexpected error occurred during registration' }, { status: 500 });
  }
}
