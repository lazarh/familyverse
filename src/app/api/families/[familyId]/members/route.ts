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

export async function POST(
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
    const { email: emailOfUserToAdd } = await request.json();

    if (!emailOfUserToAdd || typeof emailOfUserToAdd !== 'string') {
      return NextResponse.json({ message: 'User email to add is required' }, { status: 400 });
    }

    const currentUserFamilyLink = await db.select()
      .from(userFamilies)
      .where(and(
        eq(userFamilies.userId, currentUserId),
        eq(userFamilies.familyId, familyId)
      ))
      .limit(1);

    if (!currentUserFamilyLink.length) {
      return NextResponse.json({ message: 'Forbidden: You are not a member of this family or do not have permission to add users.' }, { status: 403 });
    }

    const userToAdd = await db.select()
      .from(users)
      .where(eq(users.email, emailOfUserToAdd))
      .limit(1);

    if (!userToAdd.length) {
      return NextResponse.json({ message: `User with email '${emailOfUserToAdd}' not found.` }, { status: 404 });
    }

    const userAlreadyInAnyFamily = await db.select()
      .from(userFamilies)
      .where(eq(userFamilies.userId, userToAdd[0].id))
      .limit(1);

    if (userAlreadyInAnyFamily.length) {
      if (userAlreadyInAnyFamily[0].familyId === familyId) {
        return NextResponse.json({ message: 'User is already a member of this family' }, { status: 409 });
      } else {
        return NextResponse.json({ message: 'User is already a member of another family and cannot be added.' }, { status: 409 });
      }
    }

    const newUserFamilyLink = await db.insert(userFamilies).values({
      userId: userToAdd[0].id,
      familyId: familyId,
    }).returning();

    return NextResponse.json(newUserFamilyLink[0], { status: 201 });

  } catch (error) {
    console.error(`Failed to add user to family ${familyId}:`, error);
    if (error instanceof SyntaxError) {
        return NextResponse.json({ message: 'Invalid JSON payload' }, { status: 400 });
    }
    return NextResponse.json({ message: 'Failed to add user to family' }, { status: 500 });
  }
}
