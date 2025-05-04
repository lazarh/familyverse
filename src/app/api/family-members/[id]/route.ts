import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { writeFile, mkdir, unlink } from 'fs/promises';
import path from 'path';
import { Prisma } from '@/generated/prisma'; // Corrected import path
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

// Helper function to get user ID from session
async function getUserIdFromSession(): Promise<string | null> {
  const session = await getServerSession(authOptions);
  return (session?.user as any)?.id ?? null;
}

// Helper function to check ownership
async function checkOwnership(memberId: string, userId: string): Promise<boolean> {
  if (!memberId || !userId) return false;
  try {
    const member = await prisma.familyMember.findUnique({
      where: { id: memberId },
      select: { userId: true },
    });
    return member?.userId === userId;
  } catch (error) {
    console.error(`Error checking ownership for member ${memberId}:`, error);
    return false;
  }
}

// GET /api/family-members/[id] - Fetch a single family member by ID if owned by user
export async function GET(request: Request, { params }: { params: { id: string } }) {
  const userId = await getUserIdFromSession();
  if (!userId) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }
  const { id } = params;
  if (!id) {
    return NextResponse.json({ message: 'Member ID is required' }, { status: 400 });
  }

  try {
    const member = await prisma.familyMember.findUnique({
      where: {
        id: id,
        userId: userId,
      },
    });
    if (!member) {
      return NextResponse.json({ message: 'Family member not found' }, { status: 404 });
    }
    return NextResponse.json(member);
  } catch (error) {
    console.error(`Failed to fetch family member ${id}:`, error);
    return NextResponse.json({ message: 'Failed to fetch family member' }, { status: 500 });
  }
}

// PATCH /api/family-members/[id] - Update a family member by ID if owned by user
export async function PATCH(request: Request, { params }: { params: { id: string } }) {
  const userId = await getUserIdFromSession();
  if (!userId) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }
  const { id } = params;
  if (!id) {
    return NextResponse.json({ message: 'Member ID is required' }, { status: 400 });
  }

  const isOwner = await checkOwnership(id, userId);
  if (!isOwner) {
    return NextResponse.json({ message: 'Family member not found' }, { status: 404 });
  }

  try {
    const formData = await request.formData();
    const file = formData.get('picture') as File | null;

    const updateData: Prisma.FamilyMemberUpdateInput = {};
    let newPicturePath: string | null | undefined = undefined;
    let oldPicturePath: string | null = null;

    const existingMember = await prisma.familyMember.findUnique({
      where: { id },
      select: { pictureUrl: true },
    });
    if (!existingMember) {
      return NextResponse.json({ message: 'Family member not found during update process' }, { status: 404 });
    }
    oldPicturePath = existingMember.pictureUrl ?? null;

    if (file) {
      if (file.size === 0) {
      } else {
        const uploadDir = path.join(process.cwd(), 'public', 'uploads', 'family-member-pictures');
        try {
          await mkdir(uploadDir, { recursive: true });
        } catch (err: any) {
          if (err.code !== 'EEXIST') {
            console.error('Failed to create upload directory:', err);
            throw new Error('Failed to create upload directory');
          }
        }

        const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
        const extension = path.extname(file.name) || '.jpg';
        const filenameBase = path.basename(file.name, path.extname(file.name)).replace(/[^a-zA-Z0-9_-]/g, '');
        const filename = `${filenameBase || 'upload'}-${uniqueSuffix}${extension}`;
        const filePath = path.join(uploadDir, filename);

        const buffer = Buffer.from(await file.arrayBuffer());
        await writeFile(filePath, buffer);
        newPicturePath = `/uploads/family-member-pictures/${filename}`;
      }
    }

    if (formData.get('removePicture') === 'true') {
      newPicturePath = null;
    }

    formData.forEach((value, key) => {
      if (key === 'picture' || key === 'removePicture') return;

      if (typeof value === 'string') {
        if (key === 'birthDate' || key === 'deathDate') {
          if (value === '') {
            updateData[key] = null;
          } else if (!isNaN(Date.parse(value))) {
            const date = new Date(value);
            date.setUTCHours(0, 0, 0, 0);
            updateData[key] = date;
          } else {
            console.warn(`Invalid date format for ${key}: ${value}. Skipping update for this field.`);
          }
        } else if (key === 'parentId1' || key === 'parentId2') {
          updateData[key] = value === '' ? null : value;
        } else if (key in prisma.familyMember.fields && key !== 'userId' && key !== 'id') {
          (updateData as any)[key] = value;
        }
      }
    });

    if (newPicturePath !== undefined) {
      updateData.pictureUrl = newPicturePath;
    }

    if (Object.keys(updateData).length === 0) {
      const currentMemberData = await prisma.familyMember.findUnique({ where: { id } });
      return NextResponse.json(currentMemberData);
    }

    const updatedMember = await prisma.familyMember.update({
      where: { id: id },
      data: updateData,
    });

    if (newPicturePath !== undefined && oldPicturePath && oldPicturePath !== newPicturePath) {
      try {
        const fullOldPath = path.join(process.cwd(), 'public', oldPicturePath);
        try {
          await unlink(fullOldPath);
          console.log(`Deleted old picture: ${oldPicturePath}`);
        } catch (unlinkError: any) {
          if (unlinkError.code !== 'ENOENT') {
            throw unlinkError;
          }
        }
      } catch (e: any) {
        console.error(`Failed to delete old picture ${oldPicturePath}:`, e);
      }
    }

    return NextResponse.json(updatedMember);
  } catch (error: any) {
    console.error(`Failed to update family member ${id}:`, error);
    if (error.code === 'P2025') {
      return NextResponse.json({ message: 'Family member not found' }, { status: 404 });
    }
    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2003') {
      return NextResponse.json({ message: 'Invalid parent ID provided.' }, { status: 400 });
    }
    return NextResponse.json({ message: `Failed to update family member: ${error.message || 'Internal Server Error'}` }, { status: 500 });
  }
}

// DELETE /api/family-members/[id] - Delete a family member by ID if owned by user
export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  const userId = await getUserIdFromSession();
  if (!userId) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }
  const { id } = params;
  if (!id) {
    return NextResponse.json({ message: 'Member ID is required' }, { status: 400 });
  }

  const isOwner = await checkOwnership(id, userId);
  if (!isOwner) {
    return NextResponse.json({ message: 'Family member not found' }, { status: 404 });
  }

  let pictureToDelete: string | null = null;

  try {
    const member = await prisma.familyMember.findUnique({
      where: { id: id },
      select: { pictureUrl: true },
    });
    if (member && member.pictureUrl) {
      pictureToDelete = member.pictureUrl;
    }

    await prisma.familyMember.delete({
      where: { id: id },
    });

    if (pictureToDelete) {
      try {
        const fullPath = path.join(process.cwd(), 'public', pictureToDelete);
        try {
          await unlink(fullPath);
          console.log(`Deleted picture file: ${pictureToDelete}`);
        } catch (unlinkError: any) {
          if (unlinkError.code !== 'ENOENT') {
            throw unlinkError;
          }
        }
      } catch (e: any) {
        console.error(`Failed to delete picture file ${pictureToDelete}:`, e);
      }
    }

    return NextResponse.json({ message: 'Family member deleted successfully' }, { status: 200 });
  } catch (error: any) {
    console.error(`Failed to delete family member ${id}:`, error);
    if (error.code === 'P2025') {
      return NextResponse.json({ message: 'Family member not found' }, { status: 404 });
    }
    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2003') {
      return NextResponse.json({ message: 'Cannot delete member: They are referenced as a parent by another member.' }, { status: 409 });
    }
    return NextResponse.json({ message: 'Failed to delete family member' }, { status: 500 });
  }
}
