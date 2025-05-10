import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getUserIdFromSession } from '@/lib/sessionUtils';
import { Prisma } from '@/generated/prisma'; // Correct import for Prisma namespace

// GET /api/family-members - Fetch all family members for the families the logged-in user belongs to.
// Expects a `familyId` query parameter to specify which family's members to fetch.
export async function GET(request: Request) {
  const userId = await getUserIdFromSession();
  if (!userId) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const familyIdString = searchParams.get('familyId');

  if (!familyIdString) {
    return NextResponse.json({ message: 'familyId query parameter is required' }, { status: 400 });
  }

  const familyId = parseInt(familyIdString, 10);
  if (isNaN(familyId)) {
    return NextResponse.json({ message: 'Invalid familyId format' }, { status: 400 });
  }

  try {
    // Check if the user is part of the requested family
    const userFamilyLink = await prisma.userFamily.findUnique({
      where: {
        userId_familyId: {
          userId: userId,
          familyId: familyId,
        },
      },
    });

    if (!userFamilyLink) {
      return NextResponse.json({ message: 'Forbidden: User is not a member of this family' }, { status: 403 });
    }

    // Fetch family members for the specified family
    const familyMembers = await prisma.familyMember.findMany({
      where: { familyId: familyId }, // Filter by familyId
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
        familyId: true, // Ensure familyId is selected
      },
      orderBy: {
        birthDate: 'asc',
      },
    });
    return NextResponse.json(familyMembers);
  } catch (error) {
    console.error("Failed to fetch family members:", error);
    return NextResponse.json({ message: 'Failed to fetch family members' }, { status: 500 });
  }
}

// POST /api/family-members - Create a new family member for a specific family.
// Expects `familyId` in the request body.
export async function POST(request: Request) {
  const userId = await getUserIdFromSession();
  if (!userId) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  try {
    const formData = await request.formData();
    const familyIdString = formData.get('familyId') as string | null;
    const fullName = formData.get('fullName') as string | null;
    const gender = formData.get('gender') as string | null;
    const birthDateString = formData.get('birthDate') as string | null;
    const deathDateString = formData.get('deathDate') as string | null;
    const birthPlace = formData.get('birthPlace') as string | null;
    const pictureFile = formData.get('picture') as File | null;
    const parentId1String = formData.get('parentId1') as string | null;
    const parentId2String = formData.get('parentId2') as string | null;

    if (!familyIdString || !fullName || !gender) {
      return NextResponse.json({ message: 'Missing required fields: familyId, fullName, gender' }, { status: 400 });
    }

    const familyId = parseInt(familyIdString, 10);
    if (isNaN(familyId)) {
      return NextResponse.json({ message: 'Invalid familyId format' }, { status: 400 });
    }

    // Check if the user is part of the family they are trying to add a member to
    const userFamilyLink = await prisma.userFamily.findUnique({
      where: {
        userId_familyId: {
          userId: userId,
          familyId: familyId,
        },
      },
    });

    if (!userFamilyLink) {
      return NextResponse.json({ message: 'Forbidden: You are not a member of this family' }, { status: 403 });
    }

    let pictureBuffer: Buffer | undefined = undefined;
    if (pictureFile) {
      const arrayBuffer = await pictureFile.arrayBuffer();
      pictureBuffer = Buffer.from(arrayBuffer);
    }

    const data: Prisma.FamilyMemberCreateInput = {
      fullName,
      gender,
      family: { connect: { id: familyId } }, // Link to the specified family
      birthDate: birthDateString ? new Date(birthDateString) : null,
      deathDate: deathDateString ? new Date(deathDateString) : null,
      birthPlace: birthPlace || null,
      picture: pictureBuffer,
      // Correctly map parentId1 and parentId2 to parent1 and parent2 relations
      parent1: parentId1String ? { connect: { id: parseInt(parentId1String, 10) } } : undefined,
      parent2: parentId2String ? { connect: { id: parseInt(parentId2String, 10) } } : undefined,
    };

    // Ensure parent IDs are valid numbers if provided
    if (parentId1String && isNaN(parseInt(parentId1String, 10))) {
      return NextResponse.json({ message: 'Invalid parentId1 format' }, { status: 400 });
    }
    if (parentId2String && isNaN(parseInt(parentId2String, 10))) {
      return NextResponse.json({ message: 'Invalid parentId2 format' }, { status: 400 });
    }

    const newFamilyMember = await prisma.familyMember.create({
      data,
      select: {
        id: true,
        fullName: true,
        gender: true,
        birthDate: true,
        deathDate: true,
        birthPlace: true,
        parentId1: true, // Keep selecting parentId1 and parentId2 if needed for response
        parentId2: true,
        createdAt: true,
        updatedAt: true,
        familyId: true,
      },
    });

    return NextResponse.json(newFamilyMember, { status: 201 });
  } catch (error: unknown) {
    console.error("Failed to create family member:", error);
    if (error instanceof Prisma.PrismaClientKnownRequestError) { // Use Prisma.PrismaClientKnownRequestError
      if (error.code === 'P2002') { // Unique constraint violation
        return NextResponse.json({ message: 'A unique constraint was violated.', details: error.meta }, { status: 409 });
      }
      if (error.code === 'P2025') { // Record to connect not found (e.g. familyId or parentId)
        const target = (error.meta?.target as string[] | undefined)?.join(', ') || 'related record';
        return NextResponse.json({ message: `Failed to create family member. The specified ${target} was not found.` }, { status: 400 });
      }
    }
    if (error instanceof SyntaxError) { // Error parsing formData or JSON
        return NextResponse.json({ message: 'Invalid request format' }, { status: 400 });
    }
    return NextResponse.json({ message: 'Failed to create family member' }, { status: 500 });
  }
}
