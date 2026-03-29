import { NextResponse } from 'next/server';
import db from '@/lib/db';
import { userFamilies } from '@/db/schema';
import { eq, and } from 'drizzle-orm';
import { auth } from '@/lib/auth';

async function getUserIdFromSession(): Promise<number | null> {
  const session = await auth.api.getSession();
  if (!session?.user?.id) return null;
  return parseInt(session.user.id, 10) || null;
}

interface DeleteMemberParams {
  familyId: string;
  memberUserId: string;
}

export async function DELETE(
  request: Request,
  context: { params: Promise<DeleteMemberParams> } 
) {
  const params = await context.params;
  const { familyId, memberUserId } = params;

  const currentUserId = await getUserIdFromSession();

  if (!currentUserId) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  const familyIdInt = parseInt(familyId, 10);
  if (isNaN(familyIdInt)) {
    return NextResponse.json({ message: 'Invalid family ID format' }, { status: 400 });
  }

  const memberUserIdToRemove = parseInt(memberUserId, 10);
  if (isNaN(memberUserIdToRemove)) {
    return NextResponse.json({ message: 'Invalid member user ID format' }, { status: 400 });
  }

  if (currentUserId === memberUserIdToRemove) {
    return NextResponse.json({ message: 'You cannot remove yourself from the family.' }, { status: 400 });
  }

  try {
    const currentUserFamilyLink = await db.select()
      .from(userFamilies)
      .where(and(
        eq(userFamilies.userId, currentUserId),
        eq(userFamilies.familyId, familyIdInt)
      ))
      .limit(1);

    if (!currentUserFamilyLink.length) {
      return NextResponse.json({ message: 'Forbidden: You are not a member of this family or do not have permission to remove users.' }, { status: 403 });
    }

    const targetUserFamilyLink = await db.select()
      .from(userFamilies)
      .where(and(
        eq(userFamilies.userId, memberUserIdToRemove),
        eq(userFamilies.familyId, familyIdInt)
      ))
      .limit(1);

    if (!targetUserFamilyLink.length) {
      return NextResponse.json({ message: 'User to remove is not a member of this family.' }, { status: 404 });
    }

    await db.delete(userFamilies)
      .where(and(
        eq(userFamilies.userId, memberUserIdToRemove),
        eq(userFamilies.familyId, familyIdInt)
      ));

    return NextResponse.json({ message: 'User removed from family successfully' }, { status: 200 });

  } catch (error) {
    console.error(`Failed to remove user ${memberUserIdToRemove} from family ${familyId}:`, error);
    return NextResponse.json({ message: 'Failed to remove user from family' }, { status: 500 });
  }
}
