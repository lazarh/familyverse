import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getUserIdFromSession } from '@/lib/sessionUtils'; // Import the shared function

// POST /api/families - Create a new family
export async function POST(request: Request) {
  const userId = await getUserIdFromSession();
  if (!userId) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { name } = await request.json();

    if (!name || typeof name !== 'string' || name.trim() === '') {
      return NextResponse.json({ message: 'Family name is required and must be a non-empty string' }, { status: 400 });
    }

    // Use a transaction to create the family and link the user
    const newFamily = await prisma.$transaction(async (tx) => {
      const family = await tx.family.create({
        data: {
          name: name.trim(),
        },
      });

      await tx.userFamily.create({
        data: {
          userId: userId,
          familyId: family.id,
          // role: 'admin', // Optionally assign a role
        },
      });
      return family;
    });

    return NextResponse.json(newFamily, { status: 201 });
  } catch (error) {
    console.error('Failed to create family:', error);
    if (error instanceof SyntaxError) {
        return NextResponse.json({ message: 'Invalid JSON payload' }, { status: 400 });
    }
    return NextResponse.json({ message: 'Failed to create family' }, { status: 500 });
  }
}

// GET /api/families - Fetch all families for the logged-in user
export async function GET(request: Request) {
  const userId = await getUserIdFromSession();
  if (!userId) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  try {
    const userFamilies = await prisma.userFamily.findMany({
      where: { userId: userId },
      include: {
        family: true, // Include the family details
      },
    });

    const families = userFamilies.map(uf => uf.family);
    return NextResponse.json(families);
  } catch (error) {
    console.error('Failed to fetch families:', error);
    return NextResponse.json({ message: 'Failed to fetch families' }, { status: 500 });
  }
}
