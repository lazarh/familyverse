import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/authOptions';

// Helper function to get user ID from session (similar to other route files)
async function getUserIdFromSession(): Promise<number | null> {
  const session = await getServerSession(authOptions);
  const userIdString = (session?.user as { id?: string })?.id;
  if (!userIdString) return null;
  const userId = parseInt(userIdString, 10);
  return isNaN(userId) ? null : userId;
}

// Define the expected structure of your resolved params
interface DeleteMemberParams {
  familyId: string;
  memberUserId: string;
}

// DELETE /api/families/[familyId]/members/[memberUserId] - Remove a user from a family
export async function DELETE(
  request: Request,
  context: { params: Promise<DeleteMemberParams> } 
) {
  const params = await context.params;
  const { familyId, memberUserId } = params;

  const currentUserId = await getUserIdFromSession();

  if (!currentUserId) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  const familyIdInt = parseInt(familyId, 10);
  if (isNaN(familyIdInt)) {
    return NextResponse.json({ message: 'Invalid family ID format' }, { status: 400 });
  }

  const memberUserIdToRemove = parseInt(memberUserId, 10);
  if (isNaN(memberUserIdToRemove)) {
    return NextResponse.json({ message: 'Invalid member user ID format' }, { status: 400 });
  }

  if (currentUserId === memberUserIdToRemove) {
    return NextResponse.json({ message: 'You cannot remove yourself from the family.' }, { status: 400 });
  }

  try {
    // 1. Verify the current user is a member of the family (authorization)
    const currentUserFamilyLink = await prisma.userFamily.findUnique({
      where: {
        userId_familyId: {
          userId: currentUserId,
          familyId: familyIdInt,
        },
      },
    });

    if (!currentUserFamilyLink) {
      return NextResponse.json({ message: 'Forbidden: You are not a member of this family or do not have permission to remove users.' }, { status: 403 });
      // Future: Add role-based access control if needed (e.g., only admins can remove)
    }

    // 2. Check if the user to be removed is actually part of this family
    const targetUserFamilyLink = await prisma.userFamily.findUnique({
      where: {
        userId_familyId: {
          userId: memberUserIdToRemove,
          familyId: familyIdInt,
        },
      },
    });

    if (!targetUserFamilyLink) {
      return NextResponse.json({ message: 'User to remove is not a member of this family.' }, { status: 404 });
    }

    // 3. Remove the user from the family
    await prisma.userFamily.delete({
      where: {
        userId_familyId: {
          userId: memberUserIdToRemove,
          familyId: familyIdInt,
        },
      },
    });

    return NextResponse.json({ message: 'User removed from family successfully' }, { status: 200 });

  } catch (error) {
    console.error(`Failed to remove user ${memberUserIdToRemove} from family ${familyId}:`, error);
    // Check for specific Prisma errors if needed, e.g., record not found during delete
    return NextResponse.json({ message: 'Failed to remove user from family' }, { status: 500 });
  }
}
