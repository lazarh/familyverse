/**
 * /api/people/[id] — profile bootstrap, update, delete (#15).
 *
 * GET    → { person, familyIds } — groups are derived client-side from the
 *          family feed (one derivation source, #15 decision point 1).
 * PATCH  → multipart person fields (any subset) + optional `removePicture`
 *          + optional `parents` / `partnerships` JSON = the DESIRED FULL SETS;
 *          the server diffs edges/partnerships and canonicalises pairs.
 * DELETE → delete the person entirely (cascades only their own edges,
 *          partnerships and memberships — #5); unlinks their picture file.
 */
import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getUserIdFromSession } from '@/lib/sessionUtils';
import { Prisma } from '@/generated/prisma';
import { validatePicture, pictureFilename } from '@/lib/pictures';
import { savePicture, removePictureFile } from '@/lib/pictures.server';
import {
  parentEdgesOf,
  partnershipsOf,
  personAllowed,
  personFamilyIds,
  personSelect,
  toPersonDto,
} from '@/lib/personRepo.server';
import { PARENT_ROLES, PARTNERSHIP_KINDS, type ParentRole, type PartnershipKind } from '@/types/feed';

interface IdParams {
  params: Promise<{ id: string }>;
}

function badRequest(message: string, code?: string) {
  return NextResponse.json({ message, code }, { status: 400 });
}

function parseId(raw: string): number | null {
  const id = Number.parseInt(raw, 10);
  return Number.isNaN(id) ? null : id;
}

function parseDateField(value: string): Date | null | 'invalid' {
  if (value === '') return null;
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? 'invalid' : date;
}

export async function GET(_request: Request, { params }: IdParams) {
  const userId = await getUserIdFromSession();
  if (!userId) return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });

  const { id: idString } = await params;
  const id = parseId(idString);
  if (id === null) return badRequest('Invalid person ID format');

  try {
    const person = await prisma.person.findUnique({ where: { id }, select: personSelect });
    if (!person) return NextResponse.json({ message: 'Person not found' }, { status: 404 });
    if (!(await personAllowed(userId, id))) {
      return NextResponse.json({ message: 'Forbidden' }, { status: 403 });
    }
    const familyIds = await personFamilyIds(id);
    return NextResponse.json({ person: toPersonDto(person), familyIds });
  } catch (error) {
    console.error(`Failed to fetch person ${id}:`, error);
    return NextResponse.json({ message: 'Failed to fetch person' }, { status: 500 });
  }
}

export async function PATCH(request: Request, { params }: IdParams) {
  const userId = await getUserIdFromSession();
  if (!userId) return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });

  const { id: idString } = await params;
  const id = parseId(idString);
  if (id === null) return badRequest('Invalid person ID format');
  if (!(await personAllowed(userId, id))) {
    return NextResponse.json({ message: 'Forbidden' }, { status: 403 });
  }

  let stagedPicture: string | null = null;

  try {
    const formData = await request.formData();

    const update: Record<string, unknown> = {};

    if (formData.has('fullName')) {
      const fullName = ((formData.get('fullName') as string) ?? '').trim();
      if (!fullName) return NextResponse.json({ message: 'fullName cannot be empty', code: 'MISSING_FIELD' }, { status: 400 });
      update.fullName = fullName;
    }
    if (formData.has('gender')) {
      const gender = ((formData.get('gender') as string) ?? '').trim();
      if (!gender) return NextResponse.json({ message: 'gender cannot be empty', code: 'MISSING_FIELD' }, { status: 400 });
      update.gender = gender;
    }
    if (formData.has('birthDate')) {
      const parsed = parseDateField((formData.get('birthDate') as string) ?? '');
      if (parsed === 'invalid') return badRequest('Invalid birthDate', 'INVALID_VALUE');
      update.birthDate = parsed;
    }
    if (formData.has('deathDate')) {
      const parsed = parseDateField((formData.get('deathDate') as string) ?? '');
      if (parsed === 'invalid') return badRequest('Invalid deathDate', 'INVALID_VALUE');
      update.deathDate = parsed;
    }
    if (formData.has('birthPlace')) {
      update.birthPlace = ((formData.get('birthPlace') as string) ?? '').trim() || null;
    }
    if (formData.has('bio')) {
      update.bio = ((formData.get('bio') as string) ?? '').trim() || null;
    }

    const current = await prisma.person.findUnique({ where: { id }, select: { picturePath: true } });
    if (!current) return NextResponse.json({ message: 'Person not found' }, { status: 404 });

    const pictureFile = formData.get('picture');
    const removePicture = formData.get('removePicture') === 'true';
    if (pictureFile instanceof File && pictureFile.size > 0) {
      const bytes = new Uint8Array(await pictureFile.arrayBuffer());
      const validation = validatePicture(bytes);
      if (!validation.ok) {
        return NextResponse.json({ message: validation.message, code: validation.code }, { status: 400 });
      }
      stagedPicture = pictureFilename(validation.ext);
      await savePicture(bytes, stagedPicture);
      update.picturePath = stagedPicture;
    } else if (removePicture) {
      update.picturePath = null;
    }
    const pictureChanged = 'picturePath' in update;

    // `parents` = desired full set of THIS person's parent edges.
    let desiredParents: { parentId: number; role: ParentRole }[] | null = null;
    if (formData.has('parents')) {
      let raw: unknown;
      try {
        raw = JSON.parse((formData.get('parents') as string) ?? '[]');
      } catch {
        return badRequest('Invalid parents JSON', 'INVALID_VALUE');
      }
      if (!Array.isArray(raw)) return badRequest('parents must be an array', 'INVALID_VALUE');
      const seen = new Set<number>();
      desiredParents = [];
      for (const entry of raw) {
        const record = entry as { parentId?: unknown; role?: unknown };
        const parentId = Number(record.parentId);
        const role = record.role as ParentRole;
        if (!Number.isInteger(parentId)) return badRequest('Invalid parentId', 'INVALID_VALUE');
        if (!PARENT_ROLES.includes(role)) return badRequest(`Invalid parent role: ${String(record.role)}`, 'INVALID_VALUE');
        if (parentId === id) return badRequest('A person cannot be their own parent', 'INVALID_VALUE');
        if (seen.has(parentId)) continue;
        seen.add(parentId);
        desiredParents.push({ parentId, role });
      }
      if (desiredParents.length > 0) {
        const found = await prisma.person.count({ where: { id: { in: desiredParents.map((p) => p.parentId) } } });
        if (found !== desiredParents.length) {
          return NextResponse.json({ message: 'A referenced parent does not exist', code: 'BAD_REFERENCE' }, { status: 400 });
        }
      }
    }

    // `partnerships` = desired full set for THIS person: diff on the
    // canonical pair, update kind in place, delete what's gone, add what's new.
    let desiredPartnerships: { personId: number; kind: PartnershipKind }[] | null = null;
    if (formData.has('partnerships')) {
      let raw: unknown;
      try {
        raw = JSON.parse((formData.get('partnerships') as string) ?? '[]');
      } catch {
        return badRequest('Invalid partnerships JSON', 'INVALID_VALUE');
      }
      if (!Array.isArray(raw)) return badRequest('partnerships must be an array', 'INVALID_VALUE');
      const byPair = new Map<string, { personId: number; kind: PartnershipKind }>();
      for (const entry of raw) {
        const record = entry as { personId?: unknown; kind?: unknown };
        const personId = Number(record.personId);
        const kind = record.kind as PartnershipKind;
        if (!Number.isInteger(personId)) return badRequest('Invalid personId', 'INVALID_VALUE');
        if (!PARTNERSHIP_KINDS.includes(kind)) return badRequest(`Invalid partnership kind: ${String(record.kind)}`, 'INVALID_VALUE');
        if (personId === id) return badRequest('Cannot partner with yourself', 'INVALID_VALUE');
        const pair = [Math.min(id, personId), Math.max(id, personId)].join(':');
        if (!byPair.has(pair)) byPair.set(pair, { personId, kind });
      }
      desiredPartnerships = [...byPair.values()];
      if (desiredPartnerships.length > 0) {
        const found = await prisma.person.count({ where: { id: { in: desiredPartnerships.map((p) => p.personId) } } });
        if (found !== desiredPartnerships.length) {
          return NextResponse.json({ message: 'A referenced partner does not exist', code: 'BAD_REFERENCE' }, { status: 400 });
        }
      }
    }

    await prisma.$transaction(async (tx) => {
      await tx.person.update({ where: { id }, data: update });

      if (desiredParents) {
        // Edges carry no timestamps: replace-all is a faithful diff for the
        // desired full set (same PK rows are simply recreated).
        await tx.parentChild.deleteMany({ where: { childId: id } });
        if (desiredParents.length > 0) {
          await tx.parentChild.createMany({ data: desiredParents.map((p) => ({ childId: id, ...p })) });
        }
      }

      if (desiredPartnerships) {
        const existing = await tx.partnership.findMany({
          where: { OR: [{ personAId: id }, { personBId: id }] },
        });
        const existingByPair = new Map(
          existing.map((row) => {
            const other = row.personAId === id ? row.personBId : row.personAId;
            return [[Math.min(id, other), Math.max(id, other)].join(':'), row] as const;
          }),
        );
        const desiredPairs = new Set(
          desiredPartnerships.map((p) => [Math.min(id, p.personId), Math.max(id, p.personId)].join(':')),
        );

        for (const row of existing) {
          const other = row.personAId === id ? row.personBId : row.personAId;
          const pair = [Math.min(id, other), Math.max(id, other)].join(':');
          if (!desiredPairs.has(pair)) {
            await tx.partnership.delete({ where: { id: row.id } });
          }
        }
        for (const desired of desiredPartnerships) {
          const pair = [Math.min(id, desired.personId), Math.max(id, desired.personId)].join(':');
          const row = existingByPair.get(pair);
          if (row) {
            if (row.kind !== desired.kind) {
              await tx.partnership.update({ where: { id: row.id }, data: { kind: desired.kind } });
            }
          } else {
            await tx.partnership.create({
              data: {
                personAId: Math.min(id, desired.personId),
                personBId: Math.max(id, desired.personId),
                kind: desired.kind,
              },
            });
          }
        }
      }
    });

    // Success: retire the old/removed file. Failure path unlinks the staged one.
    if (pictureChanged && current.picturePath && current.picturePath !== stagedPicture) {
      await removePictureFile(current.picturePath).catch((error) => console.error('Failed to remove old picture:', error));
    }

    const person = await prisma.person.findUniqueOrThrow({ where: { id }, select: personSelect });
    const [parentChild, partnerships] = await Promise.all([parentEdgesOf(id), partnershipsOf(id)]);
    return NextResponse.json({ person: toPersonDto(person), parentChild, partnerships });
  } catch (error) {
    if (stagedPicture) {
      await removePictureFile(stagedPicture).catch(() => undefined);
    }
    console.error(`Failed to update person ${id}:`, error);
    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2003') {
      return NextResponse.json({ message: 'A referenced record does not exist', code: 'BAD_REFERENCE' }, { status: 400 });
    }
    if (error instanceof SyntaxError) return badRequest('Invalid request format');
    return NextResponse.json({ message: 'Failed to update person' }, { status: 500 });
  }
}

export async function DELETE(_request: Request, { params }: IdParams) {
  const userId = await getUserIdFromSession();
  if (!userId) return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });

  const { id: idString } = await params;
  const id = parseId(idString);
  if (id === null) return badRequest('Invalid person ID format');
  if (!(await personAllowed(userId, id))) {
    return NextResponse.json({ message: 'Forbidden' }, { status: 403 });
  }

  try {
    const person = await prisma.person.findUnique({ where: { id }, select: { picturePath: true } });
    if (!person) return NextResponse.json({ message: 'Person not found' }, { status: 404 });

    // Cascades own edges/partnerships/memberships only (#5).
    await prisma.person.delete({ where: { id } });
    if (person.picturePath) {
      await removePictureFile(person.picturePath).catch((error) => console.error('Failed to remove picture file:', error));
    }
    return NextResponse.json({ message: 'Person deleted successfully' });
  } catch (error) {
    console.error(`Failed to delete person ${id}:`, error);
    return NextResponse.json({ message: 'Failed to delete person' }, { status: 500 });
  }
}
