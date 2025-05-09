import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { writeFile, mkdir } from 'fs/promises'; // For file system operations
import path from 'path'; // For path manipulation
import { Prisma } from '@/generated/prisma'; // Corrected import path
import { getServerSession } from 'next-auth/next'; // Import getServerSession
import { authOptions } from '@/lib/authOptions'; // Correct the import path for authOptions

// Helper function to get user ID from session
async function getUserIdFromSession(): Promise<number | null> {
  const session = await getServerSession(authOptions);
  const userIdString = (session?.user as { id: string })?.id;
  if (!userIdString) return null;
  const userId = parseInt(userIdString, 10);
  return isNaN(userId) ? null : userId;
}

// GET /api/family-members - Fetch all family members for the logged-in user
export async function GET() {
  const userId = await getUserIdFromSession();
  if (!userId) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  try {
    const familyMembers = await prisma.familyMember.findMany({
      where: { userId: userId }, // Filter by userId
      orderBy: {
        birthDate: 'asc', // Optional: Order by birth date
      },
    });
    return NextResponse.json(familyMembers);
  } catch (error) {
    console.error("Failed to fetch family members:", error);
    return NextResponse.json({ message: 'Failed to fetch family members' }, { status: 500 });
  }
}

// POST /api/family-members - Create a new family member for the logged-in user
export async function POST(request: Request) {
  const userId = await getUserIdFromSession();
  if (!userId) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  try {
    const formData = await request.formData();
    const file = formData.get('picture') as File | null;

    const requiredFields = ['fullName', 'gender'];
    const missingRequiredFields: string[] = [];
    requiredFields.forEach(field => {
      if (!formData.has(field) || !formData.get(field)) {
        missingRequiredFields.push(field);
      }
    });

    if (missingRequiredFields.length > 0) {
      return NextResponse.json({ message: `Missing required fields: ${missingRequiredFields.join(', ')}` }, { status: 400 });
    }

    const memberData: Prisma.FamilyMemberCreateInput = {
      user: { connect: { id: userId } }, // userId is now a number
      fullName: formData.get('fullName') as string,
      gender: formData.get('gender') as string,
      birthPlace: formData.get('birthPlace') as string | null,
      pictureUrl: null, // Initialize pictureUrl as null
    };

    const birthDateStr = formData.get('birthDate') as string | null;
    if (birthDateStr) {
      const birthDate = new Date(birthDateStr);
      if (!isNaN(birthDate.getTime())) {
        birthDate.setUTCHours(0, 0, 0, 0);
        memberData.birthDate = birthDate;
      } else {
        console.warn(`Invalid birthDate format: ${birthDateStr}. Skipping.`);
      }
    }

    const deathDateStr = formData.get('deathDate') as string | null;
    if (deathDateStr) {
      const deathDate = new Date(deathDateStr);
      if (!isNaN(deathDate.getTime())) {
        deathDate.setUTCHours(0, 0, 0, 0);
        memberData.deathDate = deathDate;
      } else {
        console.warn(`Invalid deathDate format: ${deathDateStr}. Skipping.`);
      }
    }

    const parentId1String = formData.get('parentId1') as string | null;
    if (parentId1String && parentId1String !== '') {
      const parentId1 = parseInt(parentId1String, 10);
      if (!isNaN(parentId1)) {
        memberData.parent1 = { connect: { id: parentId1 } };
      } else {
        console.warn(`Invalid parentId1 format: ${parentId1String}. Skipping connection.`);
      }
    }

    const parentId2String = formData.get('parentId2') as string | null;
    if (parentId2String && parentId2String !== '') {
      const parentId2 = parseInt(parentId2String, 10);
      if (!isNaN(parentId2)) {
        memberData.parent2 = { connect: { id: parentId2 } };
      } else {
        console.warn(`Invalid parentId2 format: ${parentId2String}. Skipping connection.`);
      }
    }

    let picturePath: string | null = null;
    if (file && file.size > 0) {
      const uploadDir = path.join(process.cwd(), 'public', 'uploads', 'family-member-pictures');
      try {
        await mkdir(uploadDir, { recursive: true });
      } catch (err: unknown) {
        if (typeof err === 'object' && err !== null && 'code' in err && (err as { code: string }).code !== 'EEXIST') {
          console.error('Failed to create upload directory:', err);
          return NextResponse.json({ message: 'Server error creating upload directory' }, { status: 500 });
        } else if (typeof err === 'object' && err !== null && !('code' in err)) {
          console.error('Failed to create upload directory (unknown error type):', err);
          return NextResponse.json({ message: 'Server error creating upload directory' }, { status: 500 });
        }
      }
      const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
      const extension = path.extname(file.name) || '.jpg';
      const filenameBase = path.basename(file.name, path.extname(file.name)).replace(/[^a-zA-Z0-9_-]/g, '');
      const filename = `${filenameBase || 'upload'}-${uniqueSuffix}${extension}`;
      const filePath = path.join(uploadDir, filename);
      const buffer = Buffer.from(await file.arrayBuffer());
      await writeFile(filePath, buffer);
      picturePath = `/uploads/family-member-pictures/${filename}`;
      memberData.pictureUrl = picturePath;
    }

    const newMember = await prisma.familyMember.create({
      data: memberData,
    });

    return NextResponse.json(newMember, { status: 201 });
  } catch (error: unknown) {
    console.error('Failed to create family member:', error);
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === 'P2003') {
        return NextResponse.json({ message: 'Invalid parent ID provided.' }, { status: 400 });
      }
    }
    const errorMessage = error instanceof Error ? error.message : 'Internal Server Error';
    return NextResponse.json({ message: `Failed to create family member: ${errorMessage}` }, { status: 500 });
  }
}
