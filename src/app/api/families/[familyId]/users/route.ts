import { NextResponse } from 'next/server';
import db from '@/lib/db';
import { userFamilies, users } from '@/db/schema';
import { eq, and } from 'drizzle-orm';
import { auth } from '@/lib/auth';

async function getUserIdFromSession(): Promise<number | null> {
  const session = await auth.api.getSession();
  if (!session?.user?.id) return null;
  return parseInt(session.user.id, 10) || null;
}

interface AddMemberParams {
  familyId: string;
}

export async function GET(
  request: Request, 
  { params }: { params: Promise<AddMemberParams> }
) {
  const resolvedParams = await params;
  const { familyId: familyIdString } = resolvedParams;

  const currentUserId = await getUserIdFromSession();

  if (!currentUserId) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  const familyId = parseInt(familyIdString, 10);
  if (isNaN(familyId)) {
    return NextResponse.json({ message: 'Invalid family ID format' }, { status: 400 });
  }

  try {
    const currentUserFamilyLink = await db.select()
      .from(userFamilies)
      .where(and(
        eq(userFamilies.userId, currentUserId),
        eq(userFamilies.familyId, familyId)
      ))
      .limit(1);

    if (!currentUserFamilyLink.length) {
      return NextResponse.json({ message: 'Forbidden: You are not a member of this family.' }, { status: 403 });
    }

    const userFamiliesData = await db.select({
      id: users.id,
      email: users.email,
    })
    .from(userFamilies)
    .innerJoin(users, eq(userFamilies.userId, users.id))
    .where(eq(userFamilies.familyId, familyId));

    const usersInFamily = userFamiliesData
      .filter(user => user.id !== currentUserId);

    return NextResponse.json(usersInFamily);

  } catch (error) {
    console.error(`Failed to fetch users for family ${familyId}:`, error);
    return NextResponse.json({ message: 'Failed to fetch users for family' }, { status: 500 });
  }
}
