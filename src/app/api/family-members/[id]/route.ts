import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { writeFile, mkdir, unlink } from 'fs/promises'; // For file system operations
import path from 'path'; // For path manipulation
import { Prisma } from '@prisma/client'; // Import Prisma namespace for types

// GET /api/family-members/[id] - Fetch a single family member by ID
export async function GET(request: Request, { params }: { params: { id: string } }) {
  const { id } = await params;
  try {
    const member = await prisma.familyMember.findUnique({
      where: { id },
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

// PATCH /api/family-members/[id] - Update a family member by ID, now handles multipart/form-data
export async function PATCH(request: Request, { params }: { params: { id: string } }) {
  const { id } = params;

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
      return NextResponse.json({ message: 'Family member not found' }, { status: 404 });
    }
    oldPicturePath = existingMember.pictureUrl ?? null;

    if (file) {
      if (file.size === 0) {
        // Handle empty file upload if necessary
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
        const filenameBase = path.basename(file.name, path.extname(file.name));
        const filename = `${filenameBase}-${uniqueSuffix}${extension}`;
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
            updateData[key] = new Date(value);
          } else {
            console.warn(`Invalid date format for ${key}: ${value}. Skipping update for this field.`);
          }
        } else if (key === 'parentId1' || key === 'parentId2') {
          updateData[key] = value === '' ? null : value;
        } else {
          updateData[key] = value;
        }
      }
    });

    if (newPicturePath !== undefined) {
      updateData.pictureUrl = newPicturePath;
    }

    if (Object.keys(updateData).length === 0) {
      const currentMember = await prisma.familyMember.findUnique({ where: { id } });
      return NextResponse.json(currentMember);
    }

    const updatedMember = await prisma.familyMember.update({
      where: { id },
      data: updateData,
    });

    if (newPicturePath !== undefined && oldPicturePath && oldPicturePath !== newPicturePath) {
      try {
        const fullOldPath = path.join(process.cwd(), 'public', oldPicturePath);
        await unlink(fullOldPath);
        console.log(`Deleted old picture: ${oldPicturePath}`);
      } catch (e: any) {
        if (e.code !== 'ENOENT') {
          console.error(`Failed to delete old picture ${oldPicturePath}:`, e);
        }
      }
    }

    return NextResponse.json(updatedMember);
  } catch (error: any) {
    console.error(`Failed to update family member ${id}:`, error);
    if (error.code === 'P2025') {
      return NextResponse.json({ message: 'Family member not found' }, { status: 404 });
    }
    return NextResponse.json({ message: `Failed to update family member: ${error.message || 'Internal Server Error'}` }, { status: 500 });
  }
}

// DELETE /api/family-members/[id] - Delete a family member by ID
export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  const { id } = params;
  let pictureToDelete: string | null = null;

  try {
    const member = await prisma.familyMember.findUnique({
      where: { id },
      select: { pictureUrl: true },
    });

    if (member && member.pictureUrl) {
      pictureToDelete = member.pictureUrl;
    }

    await prisma.familyMember.delete({
      where: { id },
    });

    if (pictureToDelete) {
      try {
        const fullPath = path.join(process.cwd(), 'public', pictureToDelete);
        await unlink(fullPath);
        console.log(`Deleted picture file: ${pictureToDelete}`);
      } catch (e: any) {
        if (e.code !== 'ENOENT') {
          console.error(`Failed to delete picture file ${pictureToDelete}:`, e);
        }
      }
    }

    return NextResponse.json({ message: 'Family member deleted successfully' }, { status: 200 });
  } catch (error: any) {
    console.error(`Failed to delete family member ${id}:`, error);
    if (error.code === 'P2025') {
      return NextResponse.json({ message: 'Family member not found' }, { status: 404 });
    }
    return NextResponse.json({ message: 'Failed to delete family member' }, { status: 500 });
  }
}
