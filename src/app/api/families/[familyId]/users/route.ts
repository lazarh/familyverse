import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/authOptions';

// Helper function to get user ID from session
async function getUserIdFromSession(): Promise<number | null> {
  const session = await getServerSession(authOptions);
  const userIdString = (session?.user as { id?: string })?.id;
  if (!userIdString) return null;
  const userId = parseInt(userIdString, 10);
  return isNaN(userId) ? null : userId;
}

// GET /api/families/[familyId]/users - Fetch all users for a specific family
export async function GET(request: Request, { params }: { params: { familyId: string } }) {
  const { familyId: familyIdString } = await params; // Corrected: Removed await
  const currentUserId = await getUserIdFromSession();

  if (!currentUserId) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  const familyId = parseInt(familyIdString, 10);
  if (isNaN(familyId)) {
    return NextResponse.json({ message: 'Invalid family ID format' }, { status: 400 });
  }

  try {
    // 1. Verify the current user is a member of the family they are trying to fetch users from
    const currentUserFamilyLink = await prisma.userFamily.findUnique({
      where: {
        userId_familyId: {
          userId: currentUserId,
          familyId: familyId,
        },
      },
    });

    if (!currentUserFamilyLink) {
      return NextResponse.json({ message: 'Forbidden: You are not a member of this family.' }, { status: 403 });
    }

    // 2. Fetch all UserFamily records for the given familyId, including the related User details
    const userFamilies = await prisma.userFamily.findMany({
      where: { familyId: familyId },
      include: {
        user: {
          select: {
            id: true,
            email: true,
            // Add any other user fields you want to return, e.g., name
          },
        },
      },
    });

    // Extract the user objects from the UserFamily records
    const usersInFamily = userFamilies
      .map(uf => uf.user)
      .filter(user => user.id !== currentUserId); // Ensure current user is not in the list

    return NextResponse.json(usersInFamily);

  } catch (error) {
    console.error(`Failed to fetch users for family ${familyId}:`, error);
    return NextResponse.json({ message: 'Failed to fetch users for family' }, { status: 500 });
  }
}
