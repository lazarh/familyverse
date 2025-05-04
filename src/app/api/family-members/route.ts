import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { writeFile, mkdir } from 'fs/promises'; // For file system operations
import path from 'path'; // For path manipulation
import { Prisma } from '@/generated/prisma'; // Corrected import path
import { getServerSession } from 'next-auth/next'; // Import getServerSession
import { authOptions } from '@/app/api/auth/[...nextauth]/route'; // Import authOptions

// Helper function to get user ID from session
async function getUserIdFromSession(): Promise<string | null> {
    const session = await getServerSession(authOptions);
    return (session?.user as any)?.id ?? null;
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

    const createData: Prisma.FamilyMemberCreateInput = {
        fullName: '',
        gender: '',
        birthDate: new Date(), // Placeholder
        user: { connect: { id: userId } } // Connect to the logged-in user
    };
    let picturePath: string | null = null;

    // --- Process file upload if present ---
    if (file && file.size > 0) {
        const uploadDir = path.join(process.cwd(), 'public', 'uploads', 'family-member-pictures');
        // Ensure directory exists
        try {
            await mkdir(uploadDir, { recursive: true });
        } catch (err: any) {
            if (err.code !== 'EEXIST') {
                console.error('Failed to create upload directory:', err);
                throw new Error('Failed to create upload directory');
            }
        }

        // Generate unique filename
        const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1E9)}`;
        const extension = path.extname(file.name) || '.jpg';
        const filenameBase = path.basename(file.name, path.extname(file.name)).replace(/[^a-zA-Z0-9_-]/g, ''); // Sanitize base name
        const filename = `${filenameBase || 'upload'}-${uniqueSuffix}${extension}`;
        const filePath = path.join(uploadDir, filename);

        // Save file
        const buffer = Buffer.from(await file.arrayBuffer());
        await writeFile(filePath, buffer);
        picturePath = `/uploads/family-member-pictures/${filename}`; // Relative path for DB/URL
    }
    // --- End Process file upload ---

    // --- Process other form fields ---
    let missingRequiredFields: string[] = ['fullName', 'gender', 'birthDate'];

    formData.forEach((value, key) => {
      if (key === 'picture') return; // Skip file field

      if (typeof value === 'string') {
          // Remove field from missing list if found
          missingRequiredFields = missingRequiredFields.filter(f => f !== key);

          if (key === 'birthDate' || key === 'deathDate') {
              if (value === '') {
                  createData[key] = null;
              } else if (!isNaN(Date.parse(value))) {
                  const date = new Date(value);
                  date.setUTCHours(0, 0, 0, 0); // Set to UTC midnight
                  createData[key] = date;
              } else {
                  console.warn(`Invalid date format for ${key}: ${value}. Setting to null.`);
                  createData[key] = null;
              }
          } else if (key === 'parentId1' || key === 'parentId2') {
              createData[key] = value === '' ? null : value;
          } else if (key in prisma.familyMember.fields) { // Check if key is a valid model field
             if (['fullName', 'gender', 'birthPlace'].includes(key)) {
                 (createData as any)[key] = value;
             }
          } else {
              console.warn(`Skipping unknown form field: ${key}`);
          }
      }
    });
    // --- End Process other form fields ---

    // --- Validation ---
    if (missingRequiredFields.length > 0) {
        return NextResponse.json({ message: `Missing required fields: ${missingRequiredFields.join(', ')}` }, { status: 400 });
    }
    // --- End Validation ---

    // --- Add picture path to data ---
    if (picturePath) {
        createData.pictureUrl = picturePath;
    }
    // --- End Add picture path ---

    // --- Create member in DB ---
    const newMember = await prisma.familyMember.create({
      data: createData,
    });
    // --- End Create member ---

    return NextResponse.json(newMember, { status: 201 });

  } catch (error: any) {
    console.error("Failed to create family member:", error);
    return NextResponse.json({ message: `Failed to create family member: ${error.message || 'Internal Server Error'}` }, { status: 500 });
  }
}
