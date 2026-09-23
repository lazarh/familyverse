/**
 * /api/families/[familyId]/people — the tree feed (#15).
 *
 * GET  → PeopleFeed { people, parentChild, partnerships } (flat arrays;
 *        `pictureUrl` only, never bytes or a raw picturePath).
 * POST → create a person in this family (multipart): fields + optional
 *        `picture` file (jpeg/png/webp, ≤5 MB, magic-byte checked) +
 *        `parents` / `partnerships` JSON desired sets.
 */
import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getUserIdFromSession } from '@/lib/sessionUtils';
import { Prisma } from '@/generated/prisma';
import { validatePicture, pictureFilename } from '@/lib/pictures';
import { savePicture, removePictureFile } from '@/lib/pictures.server';
import { familyAllowed, feedForFamily, parentEdgesOf, partnershipsOf, personSelect, toPersonDto } from '@/lib/personRepo.server';
import { PARENT_ROLES, PARTNERSHIP_KINDS, type ParentRole, type PartnershipKind } from '@/types/feed';

interface Params {
  params: Promise<{ familyId: string }>;
}

function badRequest(message: string, code?: string) {
  return NextResponse.json({ message, code }, { status: 400 });
}

export async function GET(_request: Request, { params }: Params) {
  const userId = await getUserIdFromSession();
  if (!userId) return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });

  const { familyId: familyIdString } = await params;
  const familyId = Number.parseInt(familyIdString, 10);
  if (Number.isNaN(familyId)) return badRequest('Invalid familyId format');

  if (!(await familyAllowed(userId, familyId))) {
    return NextResponse.json({ message: 'Forbidden: User is not a member of this family' }, { status: 403 });
  }

  try {
    return NextResponse.json(await feedForFamily(familyId));
  } catch (error) {
    console.error('Failed to fetch people feed:', error);
    return NextResponse.json({ message: 'Failed to fetch family people' }, { status: 500 });
  }
}

function parseDateField(value: string): Date | null | 'invalid' {
  if (value === '') return null;
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? 'invalid' : date;
}

interface ParentInput {
  parentId: number;
  role: ParentRole;
}

interface PartnerInput {
  personId: number;
  kind: PartnershipKind;
}

export async function POST(request: Request, { params }: Params) {
  const userId = await getUserIdFromSession();
  if (!userId) return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });

  const { familyId: familyIdString } = await params;
  const familyId = Number.parseInt(familyIdString, 10);
  if (Number.isNaN(familyId)) return badRequest('Invalid familyId format');

  if (!(await familyAllowed(userId, familyId))) {
    return NextResponse.json({ message: 'Forbidden: You are not a member of this family' }, { status: 403 });
  }

  let pictureBytes: Uint8Array | null = null;
  let pictureName: string | null = null;

  try {
    const formData = await request.formData();

    const fullName = (formData.get('fullName') as string | null)?.trim() ?? '';
    const gender = (formData.get('gender') as string | null)?.trim() ?? '';
    if (!fullName || !gender) {
      return NextResponse.json({ message: 'Missing required fields: fullName, gender', code: 'MISSING_FIELD' }, { status: 400 });
    }

    let birthDate: Date | null = null;
    let deathDate: Date | null = null;
    if (formData.has('birthDate')) {
      const parsed = parseDateField((formData.get('birthDate') as string) ?? '');
      if (parsed === 'invalid') return badRequest('Invalid birthDate', 'INVALID_VALUE');
      birthDate = parsed;
    }
    if (formData.has('deathDate')) {
      const parsed = parseDateField((formData.get('deathDate') as string) ?? '');
      if (parsed === 'invalid') return badRequest('Invalid deathDate', 'INVALID_VALUE');
      deathDate = parsed;
    }
    const birthPlace = ((formData.get('birthPlace') as string | null) ?? '').trim() || null;
    const bio = ((formData.get('bio') as string | null) ?? '').trim() || null;

    // Desired parent edges: [{ parentId, role }], deduped, all must exist.
    const parents: ParentInput[] = [];
    if (formData.has('parents')) {
      let raw: unknown;
      try {
        raw = JSON.parse((formData.get('parents') as string) ?? '[]');
      } catch {
        return badRequest('Invalid parents JSON', 'INVALID_VALUE');
      }
      if (!Array.isArray(raw)) return badRequest('parents must be an array', 'INVALID_VALUE');
      const seen = new Set<number>();
      for (const entry of raw) {
        const record = entry as { parentId?: unknown; role?: unknown };
        const parentId = Number(record.parentId);
        const role = record.role as ParentRole;
        if (!Number.isInteger(parentId)) return badRequest('Invalid parentId', 'INVALID_VALUE');
        if (!PARENT_ROLES.includes(role)) return badRequest(`Invalid parent role: ${String(record.role)}`, 'INVALID_VALUE');
        if (seen.has(parentId)) continue;
        seen.add(parentId);
        parents.push({ parentId, role });
      }
      if (parents.length > 0) {
        const found = await prisma.person.count({ where: { id: { in: parents.map((p) => p.parentId) } } });
        if (found !== parents.length) {
          return NextResponse.json({ message: 'A referenced parent does not exist', code: 'BAD_REFERENCE' }, { status: 400 });
        }
      }
    }

    // Desired partnerships: [{ personId, kind }] — canonicalised server-side.
    const partnerships: PartnerInput[] = [];
    if (formData.has('partnerships')) {
      let raw: unknown;
      try {
        raw = JSON.parse((formData.get('partnerships') as string) ?? '[]');
      } catch {
        return badRequest('Invalid partnerships JSON', 'INVALID_VALUE');
      }
      if (!Array.isArray(raw)) return badRequest('partnerships must be an array', 'INVALID_VALUE');
      const seenPairs = new Set<number>();
      for (const entry of raw) {
        const record = entry as { personId?: unknown; kind?: unknown };
        const personId = Number(record.personId);
        const kind = record.kind as PartnershipKind;
        if (!Number.isInteger(personId)) return badRequest('Invalid personId', 'INVALID_VALUE');
        if (!PARTNERSHIP_KINDS.includes(kind)) return badRequest(`Invalid partnership kind: ${String(record.kind)}`, 'INVALID_VALUE');
        if (seenPairs.has(personId)) continue;
        seenPairs.add(personId);
        partnerships.push({ personId, kind });
      }
      if (partnerships.length > 0) {
        const found = await prisma.person.count({ where: { id: { in: partnerships.map((p) => p.personId) } } });
        if (found !== partnerships.length) {
          return NextResponse.json({ message: 'A referenced partner does not exist', code: 'BAD_REFERENCE' }, { status: 400 });
        }
      }
    }

    // Picture: validate by magic bytes + size, then stage the file.
    const pictureFile = formData.get('picture');
    if (pictureFile instanceof File && pictureFile.size > 0) {
      pictureBytes = new Uint8Array(await pictureFile.arrayBuffer());
      const validation = validatePicture(pictureBytes);
      if (!validation.ok) {
        return NextResponse.json({ message: validation.message, code: validation.code }, { status: 400 });
      }
      pictureName = pictureFilename(validation.ext);
      await savePicture(pictureBytes, pictureName);
    }

    // Person + edges + partnerships atomically; canonical pair ordering
    // (personAId < personBId, #5/Q3) needs the new id, so partnerships are
    // created in the same transaction rather than nested on the person.
    const created = await prisma.$transaction(async (tx) => {
      const person = await tx.person.create({
        data: {
          fullName,
          gender,
          birthDate,
          deathDate,
          birthPlace,
          bio,
          picturePath: pictureName,
          memberships: { create: { familyId } },
          childEdges: parents.length > 0 ? { createMany: { data: parents } } : undefined,
        },
        select: personSelect,
      });
      if (partnerships.length > 0) {
        await tx.partnership.createMany({
          data: partnerships.map((p) => ({
            personAId: Math.min(p.personId, person.id),
            personBId: Math.max(p.personId, person.id),
            kind: p.kind,
          })),
        });
      }
      return person;
    });

    const [parentChild, partnershipRows] = await Promise.all([
      parentEdgesOf(created.id),
      partnershipsOf(created.id),
    ]);

    return NextResponse.json(
      { person: toPersonDto(created), parentChild, partnerships: partnershipRows },
      { status: 201 },
    );
  } catch (error) {
    // A failed create must not leave an orphaned file behind.
    if (pictureName) {
      await removePictureFile(pictureName).catch(() => undefined);
    }
    console.error('Failed to create person:', error);
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === 'P2003') {
        return NextResponse.json({ message: 'A referenced record does not exist', code: 'BAD_REFERENCE' }, { status: 400 });
      }
      if (error.code === 'P2002') {
        return NextResponse.json({ message: 'A unique constraint was violated', code: 'CONFLICT' }, { status: 409 });
      }
    }
    if (error instanceof SyntaxError) return badRequest('Invalid request format');
    return NextResponse.json({ message: 'Failed to create person' }, { status: 500 });
  }
}
