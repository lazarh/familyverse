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
interface GetFamiliesParams {
  familyIdString: string;
}

// GET /api/families/[familyId] - Fetch details of a specific family
export async function GET(
  request: Request, 
  { params }: { params: Promise<GetFamiliesParams> }
) {
  const resolvedParams = await params;
  const { familyIdString } = resolvedParams;

  const userId = await getUserIdFromSession();
  if (!userId) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  const familyId = parseInt(familyIdString, 10);
  if (isNaN(familyId)) {
    return NextResponse.json({ message: 'Invalid family ID format' }, { status: 400 });
  }

  try {
    // First, check if the user is a member of this family
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

    // Fetch the family details, including its members (users) and family members (tree nodes)
    const familyDetails = await prisma.family.findUnique({
      where: { id: familyId },
      include: {
        userFamilies: {
          include: {
            user: {
              select: { id: true, email: true }, // Select only necessary user fields
            },
          },
        },
        familyMembers: { // Include the actual family tree members
          orderBy: {
            birthDate: 'asc',
          }
        }
      },
    });

    if (!familyDetails) {
      return NextResponse.json({ message: 'Family not found' }, { status: 404 });
    }

    return NextResponse.json(familyDetails);
  } catch (error) {
    console.error(`Failed to fetch family ${familyId}:`, error);
    return NextResponse.json({ message: 'Failed to fetch family details' }, { status: 500 });
  }
}
