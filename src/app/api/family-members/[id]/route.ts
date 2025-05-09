import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { writeFile, mkdir, unlink } from 'fs/promises';
import path from 'path';
// Import Prisma types
import { Prisma } from '@/generated/prisma';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/authOptions';

// Helper function to get user ID from session
async function getUserIdFromSession(): Promise<string | null> {
  const session = await getServerSession(authOptions);
  return (session?.user as { id: string })?.id ?? null;
}

// Update the `checkOwnership` function to handle numeric IDs
// Helper function to check ownership
async function checkOwnership(memberId: number, userId: number): Promise<boolean> {
  if (!memberId || !userId) return false;
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
  // Ensure `getUserIdFromSession` handles null properly
  const sessionUserIdString = await getUserIdFromSession();
  if (!sessionUserIdString) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }
  const sessionUserId = parseInt(sessionUserIdString, 10);
  if (isNaN(sessionUserId)) {
    return NextResponse.json({ message: 'Invalid session user ID' }, { status: 400 });
  }
  const { id } = await params;
  if (!id) {
    return NextResponse.json({ message: 'Member ID is required' }, { status: 400 });
  }

  try {
    // Fetch the member, explicitly selecting userId
    const member = await prisma.familyMember.findUnique({
      where: { id: id },
      select: { // Re-add select, including userId
        id: true,
        fullName: true,
        gender: true,
        birthDate: true,
        deathDate: true,
        birthPlace: true,
        pictureUrl: true,
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
  const userId = await getUserIdFromSession();
  if (!userId) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }
  const { id } = await params;
  if (!id) {
    return NextResponse.json({ message: 'Member ID is required' }, { status: 400 });
  }

  // Ensure the `id` is converted to an integer before querying
  const numericId = parseInt(id, 10);
  if (isNaN(numericId)) {
    return NextResponse.json({ message: 'Invalid member ID format' }, { status: 400 });
  }

  const isOwner = await checkOwnership(numericId, userId);
  if (!isOwner) {
    return NextResponse.json({ message: 'Forbidden' }, { status: 403 });
  }

  try {
    const formData = await request.formData();
    const file = formData.get('picture') as File | null;

    const updateData: Prisma.FamilyMemberUpdateInput = {};
    let newPicturePath: string | null | undefined = undefined;
    let oldPicturePath: string | null = null;

    const existingMember = await prisma.familyMember.findUnique({
      where: { id: numericId },
      select: { pictureUrl: true },
    });
    if (!existingMember) {
      return NextResponse.json({ message: 'Family member not found' }, { status: 404 });
    }
    oldPicturePath = existingMember.pictureUrl ?? null;

    const removePictureFlag = formData.get('removePicture') === 'true';

    if (removePictureFlag) {
      newPicturePath = null;
      updateData.pictureUrl = null;
    } else if (file && file.size > 0) {
      const uploadDir = path.join(process.cwd(), 'public', 'uploads', 'family-member-pictures');
      try {
        await mkdir(uploadDir, { recursive: true });
      } catch (err: unknown) {
        // Check if err is an object with a code property
        if (typeof err === 'object' && err !== null && 'code' in err && (err as { code: string }).code !== 'EEXIST') {
          console.error('Failed to create upload directory:', err);
          return NextResponse.json({ message: 'Server error creating upload directory' }, { status: 500 });
        } else if (typeof err === 'object' && err !== null && !('code' in err)) {
          // Handle cases where err is an object but doesn't have 'code'
          console.error('Failed to create upload directory (unknown error type):', err);
          return NextResponse.json({ message: 'Server error creating upload directory' }, { status: 500 });
        }
        // If err.code is 'EEXIST' or err is not an object with 'code', we can ignore it or log differently
      }
      const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
      const extension = path.extname(file.name) || '.jpg';
      const filenameBase = path.basename(file.name, path.extname(file.name)).replace(/[^a-zA-Z0-9_-]/g, '');
      const filename = `${filenameBase || 'upload'}-${uniqueSuffix}${extension}`;
      const filePath = path.join(uploadDir, filename);
      const buffer = Buffer.from(await file.arrayBuffer());
      await writeFile(filePath, buffer);
      newPicturePath = `/uploads/family-member-pictures/${filename}`;
      updateData.pictureUrl = newPicturePath;
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
      if (newPicturePath === undefined && !removePictureFlag) {
        const currentMember = await prisma.familyMember.findUnique({ where: { id: numericId } });
        return NextResponse.json(currentMember);
      }
    }

    const updatedMember = await prisma.familyMember.update({
      where: { id: numericId },
      data: updateData,
    });

    if ((newPicturePath !== undefined || removePictureFlag) && oldPicturePath && oldPicturePath !== newPicturePath) {
      try {
        const fullOldPath = path.join(process.cwd(), 'public', oldPicturePath);
        await unlink(fullOldPath);
        console.log(`Deleted old picture: ${oldPicturePath}`);
      } catch (unlinkError: unknown) {
        // Check if unlinkError is an object with a code property
        if (typeof unlinkError === 'object' && unlinkError !== null && 'code' in unlinkError && (unlinkError as { code: string }).code !== 'ENOENT') {
          console.error(`Failed to delete old picture ${oldPicturePath}:`, unlinkError);
        } else if (typeof unlinkError === 'object' && unlinkError !== null && !('code' in unlinkError)) {
          console.error(`Failed to delete old picture ${oldPicturePath} (unknown error type):`, unlinkError);
        }
        // If unlinkError.code is 'ENOENT' or not an object with 'code', we can ignore it or log differently
      }
    }

    return NextResponse.json(updatedMember);
  } catch (error: unknown) {
    console.error(`Failed to update family member ${id}:`, error);
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
  const userId = await getUserIdFromSession();
  if (!userId) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }
  const { id } = await params;
  if (!id) {
    return NextResponse.json({ message: 'Member ID is required' }, { status: 400 });
  }

  // Ensure the `id` is converted to an integer before querying
  const numericId = parseInt(id, 10);
  if (isNaN(numericId)) {
    return NextResponse.json({ message: 'Invalid member ID format' }, { status: 400 });
  }

  const isOwner = await checkOwnership(numericId, userId);
  if (!isOwner) {
    return NextResponse.json({ message: 'Family member not found or access denied' }, { status: 404 });
  }

  let pictureToDelete: string | null = null;

  try {
    const member = await prisma.familyMember.findUnique({
      where: { id: numericId },
      select: { pictureUrl: true },
    });

    if (member && member.pictureUrl) {
      pictureToDelete = member.pictureUrl;
    }

    await prisma.familyMember.delete({
      where: { id: numericId },
    });

    if (pictureToDelete) {
      try {
        const fullPath = path.join(process.cwd(), 'public', pictureToDelete);
        await unlink(fullPath);
        console.log(`Deleted picture file: ${pictureToDelete}`);
      } catch (unlinkError: unknown) {
        // Check if unlinkError is an object with a code property
        if (typeof unlinkError === 'object' && unlinkError !== null && 'code' in unlinkError && (unlinkError as { code: string }).code !== 'ENOENT') {
          console.error(`Failed to delete picture file ${pictureToDelete}:`, unlinkError);
        } else if (typeof unlinkError === 'object' && unlinkError !== null && !('code' in unlinkError)) {
          console.error(`Failed to delete picture file ${pictureToDelete} (unknown error type):`, unlinkError);
        }
        // If unlinkError.code is 'ENOENT' or not an object with 'code', we can ignore it or log differently
      }
    }

    return NextResponse.json({ message: 'Family member deleted successfully' }, { status: 200 });
  } catch (error: unknown) {
    console.error(`Failed to delete family member ${id}:`, error);
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
