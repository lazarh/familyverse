import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { writeFile, mkdir } from 'fs/promises'; // For file system operations
import path from 'path'; // For path manipulation
import { Prisma } from '@prisma/client'; // Import Prisma namespace for types

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

// POST /api/family-members - Create a new family member, now handles multipart/form-data
export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get('picture') as File | null;

    const createData: Prisma.FamilyMemberCreateInput = {
        // Initialize required fields that MUST come from formData
        fullName: '', 
        gender: '', 
        birthDate: new Date() // Placeholder, will be overwritten
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
        const filenameBase = path.basename(file.name, path.extname(file.name));
        const filename = `${filenameBase}-${uniqueSuffix}${extension}`;
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
                  createData[key] = new Date(value);
              } else {
                  // Handle invalid date format - potentially throw error or return bad request
                  console.warn(`Invalid date format for ${key}: ${value}. Setting to null.`);
                  createData[key] = null; // Or handle as error
              }
          } else if (key === 'parentId1' || key === 'parentId2') {
              createData[key] = value === '' ? null : value;
          } else if (key in prisma.familyMember.fields) { // Check if key is a valid model field
             createData[key] = value;
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
    // Clean up uploaded file if DB operation failed?
    // Consider adding more specific error handling (e.g., validation errors from Prisma)
    return NextResponse.json({ message: `Failed to create family member: ${error.message || 'Internal Server Error'}` }, { status: 500 });
  }
}
