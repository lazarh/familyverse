import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { FamilyMember } from '@prisma/client'; // Import generated Prisma type

// GET /api/family-members - Fetch all family members
export async function GET() {
  try {
    const familyMembers = await prisma.familyMember.findMany({
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

// POST /api/family-members - Create a new family member
export async function POST(request: Request) {
  try {
    const data: Omit<FamilyMember, 'id' | 'createdAt' | 'updatedAt'> = await request.json();

    // Basic validation (consider using a library like Zod for more robust validation)
    if (!data.fullName || !data.gender || !data.birthDate) {
      return NextResponse.json({ message: 'Full Name, Gender, and Birth Date are required.' }, { status: 400 });
    }

    // Ensure dates are handled correctly (Prisma expects Date objects or ISO strings)
    const birthDate = data.birthDate ? new Date(data.birthDate) : null;
    const deathDate = data.deathDate ? new Date(data.deathDate) : null;

    const newMember = await prisma.familyMember.create({
      data: {
        ...data,
        birthDate: birthDate,
        deathDate: deathDate,
        // Ensure parent IDs are null if empty string or null/undefined
        parentId1: data.parentId1 || null,
        parentId2: data.parentId2 || null,
      },
    });
    return NextResponse.json(newMember, { status: 201 });
  } catch (error) {
    console.error("Failed to create family member:", error);
    // Add more specific error handling (e.g., validation errors)
    return NextResponse.json({ message: 'Failed to create family member' }, { status: 500 });
  }
}
