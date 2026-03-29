import { NextResponse } from 'next/server';
import db from '@/lib/db';
import { familyMembers, userFamilies } from '@/db/schema';
import { eq, and, asc } from 'drizzle-orm';
import { getUserIdFromSession } from '@/lib/sessionUtils';

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
    const userFamilyLink = await db.select()
      .from(userFamilies)
      .where(and(
        eq(userFamilies.userId, userId),
        eq(userFamilies.familyId, familyId)
      ))
      .limit(1);

    if (!userFamilyLink.length) {
      return NextResponse.json({ message: 'Forbidden: User is not a member of this family' }, { status: 403 });
    }

    const members = await db.select()
      .from(familyMembers)
      .where(eq(familyMembers.familyId, familyId))
      .orderBy(asc(familyMembers.birthDate));

    return NextResponse.json(members);
  } catch (error) {
    console.error("Failed to fetch family members:", error);
    return NextResponse.json({ message: 'Failed to fetch family members' }, { status: 500 });
  }
}

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

    const userFamilyLink = await db.select()
      .from(userFamilies)
      .where(and(
        eq(userFamilies.userId, userId),
        eq(userFamilies.familyId, familyId)
      ))
      .limit(1);

    if (!userFamilyLink.length) {
      return NextResponse.json({ message: 'Forbidden: You are not a member of this family' }, { status: 403 });
    }

    let pictureBuffer: Uint8Array | undefined = undefined;
    if (pictureFile) {
      const arrayBuffer = await pictureFile.arrayBuffer();
      pictureBuffer = new Uint8Array(arrayBuffer);
    }

    if (parentId1String && isNaN(parseInt(parentId1String, 10))) {
      return NextResponse.json({ message: 'Invalid parentId1 format' }, { status: 400 });
    }
    if (parentId2String && isNaN(parseInt(parentId2String, 10))) {
      return NextResponse.json({ message: 'Invalid parentId2 format' }, { status: 400 });
    }

    const newFamilyMember = await db.insert(familyMembers).values({
      fullName,
      gender,
      familyId,
      birthDate: birthDateString ? new Date(birthDateString) : null,
      deathDate: deathDateString ? new Date(deathDateString) : null,
      birthPlace: birthPlace || null,
      picture: pictureBuffer,
      parentId1: parentId1String ? parseInt(parentId1String, 10) : null,
      parentId2: parentId2String ? parseInt(parentId2String, 10) : null,
    }).returning();

    return NextResponse.json(newFamilyMember[0], { status: 201 });
  } catch (error) {
    console.error("Failed to create family member:", error);
    if (error instanceof SyntaxError) {
        return NextResponse.json({ message: 'Invalid request format' }, { status: 400 });
    }
    return NextResponse.json({ message: 'Failed to create family member' }, { status: 500 });
  }
}
