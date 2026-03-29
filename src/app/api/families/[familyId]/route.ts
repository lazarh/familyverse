import { NextResponse } from 'next/server';
import db from '@/lib/db';
import { families, userFamilies, users, familyMembers } from '@/db/schema';
import { eq, and } from 'drizzle-orm';
import { auth } from '@/lib/auth';

async function getUserIdFromSession(): Promise<number | null> {
  const session = await auth.api.getSession();
  if (!session?.user?.id) return null;
  return parseInt(session.user.id, 10) || null;
}

interface GetFamiliesParams {
  familyIdString: string;
}

export async function GET(
  request: Request, 
  { params }: { params: Promise<GetFamiliesParams> }
) {
  const resolvedParams = await params;
  const { familyIdString } = resolvedParams;

  const userId = await getUserIdFromSession();
  if (!userId) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  const familyId = parseInt(familyIdString, 10);
  if (isNaN(familyId)) {
    return NextResponse.json({ message: 'Invalid family ID format' }, { status: 400 });
  }

  try {
    const userFamilyLink = await db.select()
      .from(userFamilies)
      .where(and(
        eq(userFamilies.userId, userId),
        eq(userFamilies.familyId, familyId)
      ))
      .limit(1);

    if (!userFamilyLink.length) {
      return NextResponse.json({ message: 'Forbidden: You are not a member of this family' }, { status: 403 });
    }

    const familyDetails = await db.select()
      .from(families)
      .where(eq(families.id, familyId))
      .limit(1);

    if (!familyDetails.length) {
      return NextResponse.json({ message: 'Family not found' }, { status: 404 });
    }

    const userFamiliesData = await db.select({
      userId: userFamilies.userId,
      familyId: userFamilies.familyId,
      createdAt: userFamilies.createdAt,
      updatedAt: userFamilies.updatedAt,
      user: {
        id: users.id,
        email: users.email,
      },
    })
    .from(userFamilies)
    .innerJoin(users, eq(userFamilies.userId, users.id))
    .where(eq(userFamilies.familyId, familyId));

    const membersData = await db.select()
      .from(familyMembers)
      .where(eq(familyMembers.familyId, familyId));

    return NextResponse.json({
      ...familyDetails[0],
      userFamilies: userFamiliesData,
      familyMembers: membersData,
    });
  } catch (error) {
    console.error(`Failed to fetch family ${familyId}:`, error);
    return NextResponse.json({ message: 'Failed to fetch family details' }, { status: 500 });
  }
}
