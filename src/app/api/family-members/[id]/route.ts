import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getUserIdFromSession } from '@/lib/sessionUtils'; // Import shared utility

// New helper function to check if the user is authorized for a specific family member's family
async function isUserAuthorizedForFamilyMember(memberId: number, userId: number): Promise<boolean> {
  if (isNaN(memberId) || isNaN(userId)) {
    console.error('Invalid input: memberId or userId is NaN.');
    return false;
  }
  try {
    const member = await prisma.familyMember.findUnique({
      where: { id: memberId },
      select: { familyId: true },
    });

    if (!member || member.familyId === null) {
      return false;
    }

    const userFamilyLink = await prisma.userFamily.findUnique({
      where: {
        userId_familyId: {
          userId: userId,
          familyId: member.familyId,
        },
      },
    });
    return !!userFamilyLink;
  } catch (error) {
    console.error(`Error checking family membership for member ${memberId} and user ${userId}:`, error);
    return false;
  }
}

interface FamilyMemberParams {
  id: string;
}

// GET /api/family-members/[id] - Fetch a single family member by ID
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
    const familyMember = await prisma.familyMember.findUnique({
      where: { id },
      select: {
        id: true,
        fullName: true,
        gender: true,
        birthDate: true,
        deathDate: true,
        birthPlace: true,
        picture: true,
        parentId1: true,
        parentId2: true,
        createdAt: true,
        updatedAt: true,
        familyId: true,
      },
    });

    if (!familyMember) {
      return NextResponse.json({ message: 'Family member not found' }, { status: 404 });
    }
    return NextResponse.json(familyMember);
  } catch (error) {
    console.error(`Failed to fetch family member ${id}:`, error);
    return NextResponse.json({ message: 'Failed to fetch family member' }, { status: 500 });
  }
}

interface UpdateFamilyMemberParams {
  id: string;
}

// PATCH /api/family-members/[id] - Update a family member by ID
export async function PATCH(request: Request, { params }: { params: Promise<UpdateFamilyMemberParams> }) {
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
    const updateData: Record<string, any> = {};
    let pictureActionTaken = false; // To ensure only one picture operation is prioritized

    for (const [key, value] of formDataPayload.entries()) {
      if (key === 'picture' && value instanceof File) {
        if (value.size > 0) { // Process file only if it has content
          const buffer = Buffer.from(await value.arrayBuffer());
          updateData.picture = buffer;
          pictureActionTaken = true;
        }
        // If file is empty, it's ignored, existing picture remains unless 'removePicture' is true
      } else if (typeof value === 'string') {
        if (key === 'id' || key === 'familyId') {
          // Skip id and familyId, should not be updatable from client payload this way
          continue;
        }

        if (key === 'removePicture' && value === 'true') {
          if (!pictureActionTaken) { // Prioritize actual file upload if both sent
            updateData.picture = null;
            pictureActionTaken = true;
          }
        } else if (key === 'pictureUrl') {
          if (!pictureActionTaken && value.startsWith('data:image') && value.includes('base64,')) {
            const base64Data = value.substring(value.indexOf('base64,') + 7);
            if (base64Data) { // Only process if there's actual base64 data
              updateData.picture = Buffer.from(base64Data, 'base64');
              pictureActionTaken = true;
            }
            // If base64Data is empty (e.g., "data:image/jpeg;base64,"), do nothing here.
            // This means an empty data URL won't change the picture unless removePicture is also true.
          }
          // Crucially, do not add 'pictureUrl' key itself to updateData
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
        } else if (key !== 'removePicture') { // Ensure 'removePicture' itself isn't added
          updateData[key] = value;
        }
      }
    }

    if (Object.keys(updateData).length === 0 && !pictureActionTaken) {
      // No actual data fields are changing, and no picture actions were taken.
      // This could happen if only 'id', 'familyId', or an empty 'pictureUrl' was sent.
      // Return a 304 Not Modified or the current object, or a specific message.
      // For simplicity, let's fetch and return the current member if no changes.
      // However, Prisma's update with empty data might just work fine (no-op).
      // If Prisma throws error on empty data, then handle here.
      // For now, let Prisma handle it; it usually doesn't update if data is identical or empty.
    }
    
    // console.log(`Processed updateData for member ${numericId}:`, updateData);

    const updatedMember = await prisma.familyMember.update({
      where: { id: numericId },
      data: updateData,
    });
    return NextResponse.json(updatedMember);
  } catch (error: unknown) {
    console.error(`Failed to update family member ${numericId}:`, error);
    if (error instanceof Error && error.message.includes('already consumed')) {
        return NextResponse.json({ message: 'Request body already consumed or malformed.' }, { status: 400 });
    }
    if (error instanceof SyntaxError) { // Should not happen if using formData, but as a fallback
        return NextResponse.json({ message: 'Invalid JSON payload if not using FormData.' }, { status: 400 });
    }
    // Catch other potential errors during formData processing or Prisma update
    return NextResponse.json({ message: 'Failed to update family member due to an internal error.' }, { status: 500 });
  }
}


interface DeleteFamilyMemberParams {
  id: string;
}

// DELETE /api/family-members/[id] - Delete a family member by ID
export async function DELETE(request: Request, { params }: { params: Promise<DeleteFamilyMemberParams> }) {
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
    await prisma.familyMember.delete({
      where: { id: numericId },
    });
    return NextResponse.json({ message: 'Family member deleted successfully' }, { status: 200 });
  } catch (error: unknown) {
    console.error(`Failed to delete family member ${numericId}:`, error);
    return NextResponse.json({ message: 'Failed to delete family member' }, { status: 500 });
  }
}
