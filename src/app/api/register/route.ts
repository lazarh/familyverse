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
    const saltRounds = 10; // Recommended salt rounds
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Create the user
    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
      },
    });

    // Don't return the password hash
    const { password: _, ...userWithoutPassword } = user;

    return NextResponse.json(userWithoutPassword, { status: 201 }); // 201 Created
  } catch (error) {
    console.error('Registration error:', error);
    // In production, consider more specific error handling or logging
    if (error instanceof Error && error.message.includes('Unique constraint failed')) {
        return NextResponse.json({ error: 'User already exists' }, { status: 409 });
    }
    return NextResponse.json({ error: 'An unexpected error occurred during registration' }, { status: 500 });
  }
}
