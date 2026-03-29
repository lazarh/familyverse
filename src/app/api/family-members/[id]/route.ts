import { NextResponse } from 'next/server';
import db from '@/lib/db';
import { familyMembers, userFamilies } from '@/db/schema';
import { eq, and } from 'drizzle-orm';

async function isUserAuthorizedForFamilyMember(memberId: number, userId: number): Promise<boolean> {
  if (isNaN(memberId) || isNaN(userId)) {
    console.error('Invalid input: memberId or userId is NaN.');
    return false;
  }
  try {
    const member = await db.select({ familyId: familyMembers.familyId })
      .from(familyMembers)
      .where(eq(familyMembers.id, memberId))
      .limit(1);

    if (!member.length || member[0].familyId === null) {
      return false;
    }

    const userFamilyLink = await db.select()
      .from(userFamilies)
      .where(and(
        eq(userFamilies.userId, userId),
        eq(userFamilies.familyId, member[0].familyId)
      ))
      .limit(1);

    return !!userFamilyLink.length;
  } catch (error) {
    console.error(`Error checking family membership for member ${memberId} and user ${userId}:`, error);
    return false;
  }
}

interface FamilyMemberParams {
  id: string;
}

export async function GET(request: Request, { params }: { params: Promise<FamilyMemberParams> }) {
  const resolvedParams = await params;
  const sessionUserId = await getUserIdFromSession();
  if (sessionUserId === null) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  const { id: idString } = resolvedParams;
  if (!idString) {
    return NextResponse.json({ message: 'Family member ID is required' }, { status: 400 });
  }
  const id = parseInt(idString, 10);
  if (isNaN(id)) {
    return NextResponse.json({ message: 'Invalid family member ID format' }, { status: 400 });
  }

  const isAuthorized = await isUserAuthorizedForFamilyMember(id, sessionUserId);
  if (!isAuthorized) {
    return NextResponse.json({ message: 'Forbidden' }, { status: 403 });
  }

  try {
    const member = await db.select()
      .from(familyMembers)
      .where(eq(familyMembers.id, id))
      .limit(1);

    if (!member.length) {
      return NextResponse.json({ message: 'Family member not found' }, { status: 404 });
    }
    return NextResponse.json(member[0]);
  } catch (error) {
    console.error(`Failed to fetch family member ${id}:`, error);
    return NextResponse.json({ message: 'Failed to fetch family member' }, { status: 500 });
  }
}

export async function PATCH(request: Request, { params }: { params: Promise<FamilyMemberParams> }) {
  const resolvedParams = await params;
  const sessionUserId = await getUserIdFromSession();
  if (sessionUserId === null) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }
  const { id: idString } = resolvedParams;
  if (!idString) {
    return NextResponse.json({ message: 'Family member ID is required' }, { status: 400 });
  }

  const numericId = parseInt(idString, 10);
  if (isNaN(numericId)) {
    return NextResponse.json({ message: 'Invalid family member ID format' }, { status: 400 });
  }

  const isAuthorized = await isUserAuthorizedForFamilyMember(numericId, sessionUserId);
  if (!isAuthorized) {
    return NextResponse.json({ message: 'Forbidden' }, { status: 403 });
  }

  try {
    const formDataPayload = await request.formData();
    const updateData: Record<string, unknown> = {};
    let pictureActionTaken = false;

    for (const [key, value] of formDataPayload.entries()) {
      if (key === 'picture' && value instanceof File) {
        if (value.size > 0) {
          const buffer = Buffer.from(await value.arrayBuffer());
          updateData.picture = buffer;
          pictureActionTaken = true;
        }
      } else if (typeof value === 'string') {
        if (key === 'id' || key === 'familyId') {
          continue;
        }

        if (key === 'removePicture') {
          if (!pictureActionTaken) {
            updateData.picture = null;
            pictureActionTaken = true;
          }
        } else if (key === 'pictureUrl') {
          if (!pictureActionTaken && value.startsWith('data:image') && value.includes('base64,')) {
            const base64Data = value.substring(value.indexOf('base64,') + 7);
            if (base64Data) {
              updateData.picture = Buffer.from(base64Data, 'base64');
              pictureActionTaken = true;
            }
          }
        } else if (key === 'birthDate' || key === 'deathDate') {
          updateData[key] = value ? new Date(value) : null;
        } else if (key === 'parentId1' || key === 'parentId2') {
          if (value === '' || value === null || value === undefined) {
            updateData[key] = null;
          } else {
            const parsedId = parseInt(value, 10);
            if (isNaN(parsedId)) {
              return NextResponse.json({ message: `Invalid ${key} format: '${value}' is not a number.` }, { status: 400 });
            }
            updateData[key] = parsedId;
          }
        } else if (key !== 'removePicture') {
          updateData[key] = value;
        }
      }
    }

    const updatedMember = await db.update(familyMembers)
      .set(updateData)
      .where(eq(familyMembers.id, numericId))
      .returning();

    return NextResponse.json(updatedMember[0]);
  } catch (error) {
    console.error(`Failed to update family member ${numericId}:`, error);
    if (error instanceof Error && error.message.includes('already consumed')) {
        return NextResponse.json({ message: 'Request body already consumed or malformed.' }, { status: 400 });
    }
    if (error instanceof SyntaxError) {
        return NextResponse.json({ message: 'Invalid JSON payload if not using FormData.' }, { status: 400 });
    }
    return NextResponse.json({ message: 'Failed to update family member due to an internal error.' }, { status: 500 });
  }
}

export async function DELETE(request: Request, { params }: { params: Promise<FamilyMemberParams> }) {
  const resolvedParams = await params;

  const sessionUserId = await getUserIdFromSession();
  if (sessionUserId === null) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }
  const { id: idString } = resolvedParams;
  if (!idString) {
    return NextResponse.json({ message: 'Family member ID is required' }, { status: 400 });
  }

  const numericId = parseInt(idString, 10);
  if (isNaN(numericId)) {
    return NextResponse.json({ message: 'Invalid family member ID format' }, { status: 400 });
  }

  const isAuthorized = await isUserAuthorizedForFamilyMember(numericId, sessionUserId);
  if (!isAuthorized) {
    return NextResponse.json({ message: 'Forbidden' }, { status: 403 });
  }

  try {
    await db.delete(familyMembers)
      .where(eq(familyMembers.id, numericId));
    return NextResponse.json({ message: 'Family member deleted successfully' }, { status: 200 });
  } catch (error) {
    console.error(`Failed to delete family member ${numericId}:`, error);
    return NextResponse.json({ message: 'Failed to delete family member' }, { status: 500 });
  }
}

async function getUserIdFromSession(): Promise<number | null> {
  const { getUserIdFromSession } = await import('@/lib/sessionUtils');
  return getUserIdFromSession();
}
