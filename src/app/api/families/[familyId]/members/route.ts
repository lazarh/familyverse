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

// Define the expected structure of your resolved params
interface AddMemberParams {
  familyId: string;
}

// POST /api/families/[familyId]/members - Add a user to a family
export async function POST(
  request: Request, 
  { params }: { params: Promise<AddMemberParams> }
) {
  const resolvedParams = await params;
  const { familyId: familyIdString } = resolvedParams;

  const currentUserId = await getUserIdFromSession(); 
  if (!currentUserId) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  // familyIdString is now the resolved value
  const familyId = parseInt(familyIdString, 10);
  if (isNaN(familyId)) {
    return NextResponse.json({ message: 'Invalid family ID format' }, { status: 400 });
  }

  try {
    const { email: emailOfUserToAdd } = await request.json();

    if (!emailOfUserToAdd || typeof emailOfUserToAdd !== 'string') {
      return NextResponse.json({ message: 'User email to add is required' }, { status: 400 });
    }

    // 1. Verify the current user is a member of the family
    const currentUserFamilyLink = await prisma.userFamily.findUnique({
      where: {
        userId_familyId: {
          userId: currentUserId,
          familyId: familyId,
        },
      },
    });

    if (!currentUserFamilyLink) {
      return NextResponse.json({ message: 'Forbidden: You are not a member of this family or do not have permission to add users.' }, { status: 403 });
      // TODO: Add role-based access control if needed in the future, e.g. only admins can add
    }

    // 2. Find the user to add by their email
    const userToAdd = await prisma.user.findUnique({
      where: { email: emailOfUserToAdd },
    });

    if (!userToAdd) {
      return NextResponse.json({ message: `User with email '${emailOfUserToAdd}' not found.` }, { status: 404 });
    }

    // 3. Check if the target user is already in ANY family
    const userAlreadyInAnyFamily = await prisma.userFamily.findFirst({
      where: { userId: userToAdd.id },
    });

    if (userAlreadyInAnyFamily) {
      if (userAlreadyInAnyFamily.familyId === familyId) {
        return NextResponse.json({ message: 'User is already a member of this family' }, { status: 409 });
      } else {
        return NextResponse.json({ message: 'User is already a member of another family and cannot be added.' }, { status: 409 });
      }
    }

    // 4. Add the user to the family
    const newUserFamilyLink = await prisma.userFamily.create({
      data: {
        userId: userToAdd.id,
        familyId: familyId,
        // role: 'member', // Default role
      },
    });

    return NextResponse.json(newUserFamilyLink, { status: 201 });

  } catch (error) {
    console.error(`Failed to add user to family ${familyId}:`, error);
    if (error instanceof SyntaxError) {
        return NextResponse.json({ message: 'Invalid JSON payload' }, { status: 400 });
    }
    return NextResponse.json({ message: 'Failed to add user to family' }, { status: 500 });
  }
}
