/**
 * DELETE /api/families/[familyId]/people/[personId] — remove a person FROM
 * THIS FAMILY: the membership row only. The person survives (it may hold
 * other memberships) — the #5 deliberate change, mirrored from family delete.
 */
import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getUserIdFromSession } from '@/lib/sessionUtils';
import { familyAllowed } from '@/lib/personRepo.server';

interface Params {
  params: Promise<{ familyId: string; personId: string }>;
}

export async function DELETE(_request: Request, { params }: Params) {
  const userId = await getUserIdFromSession();
  if (!userId) return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });

  const { familyId: familyIdString, personId: personIdString } = await params;
  const familyId = Number.parseInt(familyIdString, 10);
  const personId = Number.parseInt(personIdString, 10);
  if (Number.isNaN(familyId)) return NextResponse.json({ message: 'Invalid familyId format' }, { status: 400 });
  if (Number.isNaN(personId)) return NextResponse.json({ message: 'Invalid personId format' }, { status: 400 });

  if (!(await familyAllowed(userId, familyId))) {
    return NextResponse.json({ message: 'Forbidden: You are not a member of this family' }, { status: 403 });
  }

  try {
    const deleted = await prisma.familyMembership.deleteMany({
      where: { familyId, personId },
    });
    if (deleted.count === 0) {
      return NextResponse.json({ message: 'Person is not a member of this family' }, { status: 404 });
    }
    return NextResponse.json({ message: 'Person removed from family' });
  } catch (error) {
    console.error(`Failed to remove person ${personId} from family ${familyId}:`, error);
    return NextResponse.json({ message: 'Failed to remove person from family' }, { status: 500 });
  }
}
