import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { Prisma } from '@/generated/prisma';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/authOptions';

// Helper function to get user ID from session
async function getUserIdFromSession(): Promise<number | null> {
  const session = await getServerSession(authOptions);
  const userIdString = (session?.user as { id: string })?.id;
  if (!userIdString) return null;
  const userId = parseInt(userIdString, 10);
  return isNaN(userId) ? null : userId;
}

// Update the `checkOwnership` function to handle numeric IDs
// Helper function to check ownership
async function checkOwnership(memberId: number, userId: number): Promise<boolean> {
  if (isNaN(memberId) || isNaN(userId)) return false;
  try {
    const member = await prisma.familyMember.findUnique({
      where: { id: memberId },
      select: { userId: true },
    });
    return !!member && member.userId === userId;
  } catch (error) {
    console.error(`Error checking ownership for member ${memberId}:`, error);
    return false;
  }
}

// GET /api/family-members/[id] - Fetch a single family member by ID if owned by user
export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const sessionUserId = await getUserIdFromSession();
  if (sessionUserId === null) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  const { id: idString } = await params;
  if (!idString) {
    return NextResponse.json({ message: 'Member ID is required' }, { status: 400 });
  }
  const id = parseInt(idString, 10);
  if (isNaN(id)) {
    return NextResponse.json({ message: 'Invalid member ID format' }, { status: 400 });
  }

  try {
    const member = await prisma.familyMember.findUnique({
      where: { id: id },
      select: {
        id: true,
        fullName: true,
        gender: true,
        birthDate: true,
        deathDate: true,
        birthPlace: true,
        picture: true, // Changed from pictureUrl to picture
        parentId1: true,
        parentId2: true,
        createdAt: true,
        updatedAt: true,
        userId: true,
      },
    });

    if (!member || member.userId !== sessionUserId) {
      return NextResponse.json({ message: 'Family member not found' }, { status: 404 });
    }
    return NextResponse.json(member);
  } catch (error) {
    console.error(`Failed to fetch family member ${id}:`, error);
    return NextResponse.json({ message: 'Failed to fetch family member' }, { status: 500 });
  }
}

// PATCH /api/family-members/[id] - Update a family member by ID if owned by user
export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const sessionUserId = await getUserIdFromSession();
  if (sessionUserId === null) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }
  const { id: idString } = await params;
  if (!idString) {
    return NextResponse.json({ message: 'Member ID is required' }, { status: 400 });
  }

  const numericId = parseInt(idString, 10);
  if (isNaN(numericId)) {
    return NextResponse.json({ message: 'Invalid member ID format' }, { status: 400 });
  }

  const isOwner = await checkOwnership(numericId, sessionUserId);
  if (!isOwner) {
    return NextResponse.json({ message: 'Forbidden' }, { status: 403 });
  }

  try {
    const formData = await request.formData();
    const file = formData.get('picture') as File | null;
    const removePictureFlag = formData.get('removePicture') === 'true';

    const updateData: Prisma.FamilyMemberUpdateInput = {};

    const existingMember = await prisma.familyMember.findUnique({
      where: { id: numericId },
      select: { picture: true }, // Select picture (Bytes)
    });

    if (!existingMember) {
      return NextResponse.json({ message: 'Family member not found' }, { status: 404 });
    }

    if (removePictureFlag) {
      updateData.picture = null;
    } else if (file && file.size > 0) {
      const buffer = Buffer.from(await file.arrayBuffer());
      updateData.picture = buffer;
    }

    formData.forEach((value, key) => {
      if (key === 'picture' || key === 'removePicture' || key === 'id' || key === 'userId' || key === 'createdAt' || key === 'updatedAt') return;

      if (typeof value === 'string') {
        if (key === 'birthDate' || key === 'deathDate') {
          if (value === '') {
            updateData[key] = null;
          } else if (!isNaN(Date.parse(value))) {
            const date = new Date(value);
            date.setUTCHours(0, 0, 0, 0);
            updateData[key] = date;
          } else {
            console.warn(`Invalid date format for ${key}: ${value}. Skipping update.`);
          }
        } else if (key === 'parentId1') {
          const parentId1 = value === '' ? null : parseInt(value, 10);
          if (parentId1 === null || !isNaN(parentId1)) {
            updateData.parent1 = parentId1 === null ? { disconnect: true } : { connect: { id: parentId1 } };
          } else {
            console.warn(`Invalid parentId1 format: ${value}. Skipping update.`);
          }
        } else if (key === 'parentId2') {
          const parentId2 = value === '' ? null : parseInt(value, 10);
          if (parentId2 === null || !isNaN(parentId2)) {
            updateData.parent2 = parentId2 === null ? { disconnect: true } : { connect: { id: parentId2 } };
          } else {
            console.warn(`Invalid parentId2 format: ${value}. Skipping update.`);
          }
        } else if (key in prisma.familyMember.fields) {
          (updateData as Record<string, unknown>)[key] = value === '' ? null : value;
        } else {
          console.warn(`Skipping unknown form field: ${key}`);
        }
      }
    });

    if (Object.keys(updateData).length === 0) {
      const currentMemberForNoOp = await prisma.familyMember.findUnique({ where: { id: numericId } });
      return NextResponse.json(currentMemberForNoOp);
    }

    const updatedMember = await prisma.familyMember.update({
      where: { id: numericId },
      data: updateData,
    });

    return NextResponse.json(updatedMember);
  } catch (error: unknown) {
    console.error(`Failed to update family member ${idString}:`, error);
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === 'P2025') {
        return NextResponse.json({ message: 'Family member not found' }, { status: 404 });
      }
      if (error.code === 'P2003') {
        return NextResponse.json({ message: 'Invalid parent ID provided.' }, { status: 400 });
      }
      if (error.code === 'P2002') {
        return NextResponse.json({ message: 'Update failed due to unique constraint.' }, { status: 409 });
      }
    }
    const errorMessage = error instanceof Error ? error.message : 'Internal Server Error';
    return NextResponse.json({ message: `Failed to update family member: ${errorMessage}` }, { status: 500 });
  }
}

// DELETE /api/family-members/[id] - Delete a family member by ID if owned by user
export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const sessionUserId = await getUserIdFromSession();
  if (sessionUserId === null) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }
  const { id: idString } = await params;
  if (!idString) {
    return NextResponse.json({ message: 'Member ID is required' }, { status: 400 });
  }

  const numericId = parseInt(idString, 10);
  if (isNaN(numericId)) {
    return NextResponse.json({ message: 'Invalid member ID format' }, { status: 400 });
  }

  const isOwner = await checkOwnership(numericId, sessionUserId);
  if (!isOwner) {
    return NextResponse.json({ message: 'Family member not found or access denied' }, { status: 404 });
  }

  try {
    await prisma.familyMember.delete({
      where: { id: numericId },
    });

    return NextResponse.json({ message: 'Family member deleted successfully' }, { status: 200 });
  } catch (error: unknown) {
    console.error(`Failed to delete family member ${idString}:`, error);
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === 'P2025') {
        return NextResponse.json({ message: 'Family member not found' }, { status: 404 });
      }
      if (error.code === 'P2003') {
        return NextResponse.json({ message: 'Cannot delete member: They are referenced as a parent by another member.' }, { status: 409 });
      }
    }
    const errorMessage = error instanceof Error ? error.message : 'Internal Server Error';
    return NextResponse.json({ message: `Failed to delete family member: ${errorMessage}` }, { status: 500 });
  }
}
