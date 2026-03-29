import { NextResponse } from 'next/server';
import db from '@/lib/db';
import { families, userFamilies } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { getUserIdFromSession } from '@/lib/sessionUtils';

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

    const newFamily = await db.transaction(async (tx) => {
      const family = await tx.insert(families).values({
        name: name.trim(),
      }).returning();

      await tx.insert(userFamilies).values({
        userId: userId,
        familyId: family[0].id,
      });
      return family[0];
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
export async function GET() {
  const userId = await getUserIdFromSession();
  if (!userId) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  try {
    const userFamiliesData = await db.select({
      id: userFamilies.userId,
      familyId: userFamilies.familyId,
      family: families,
    })
    .from(userFamilies)
    .innerJoin(families, eq(userFamilies.familyId, families.id))
    .where(eq(userFamilies.userId, userId));

    return NextResponse.json(userFamiliesData.map(uf => uf.family));
  } catch (error) {
    console.error('Failed to fetch families:', error);
    return NextResponse.json({ message: 'Failed to fetch families' }, { status: 500 });
  }
}
