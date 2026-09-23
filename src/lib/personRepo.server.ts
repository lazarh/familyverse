/**
 * Server-side person data access + DTO mapping for the #15 contract.
 * Route handlers own sessions and status codes; this file owns queries.
 * (".server" suffix: never import from client components — it pulls in Prisma.)
 */
import prisma from '@/lib/prisma';
import { toPictureUrl } from '@/lib/pictures';
import type { ParentChildDto, PartnershipDto, PeopleFeed, PersonDto } from '@/types/feed';
import type { Prisma } from '@/generated/prisma';

/** Column set that becomes a PersonDto (note: picturePath never leaks). */
export const personSelect = {
  id: true,
  fullName: true,
  gender: true,
  birthDate: true,
  deathDate: true,
  birthPlace: true,
  bio: true,
  picturePath: true,
} satisfies Prisma.PersonSelect;

export type PersonRecord = Prisma.PersonGetPayload<{ select: typeof personSelect }>;

/** Wire shape: ISO date strings, `pictureUrl` instead of a stored path. */
export function toPersonDto(record: PersonRecord): PersonDto {
  return {
    id: record.id,
    fullName: record.fullName,
    gender: record.gender,
    birthDate: record.birthDate ? record.birthDate.toISOString() : null,
    deathDate: record.deathDate ? record.deathDate.toISOString() : null,
    birthPlace: record.birthPlace,
    bio: record.bio,
    pictureUrl: toPictureUrl(record.picturePath),
  };
}

/** True when the user is a member of `familyId`. */
export async function familyAllowed(userId: number, familyId: number): Promise<boolean> {
  const link = await prisma.userFamily.findUnique({
    where: { userId_familyId: { userId, familyId } },
    select: { familyId: true },
  });
  return link !== null;
}

/** Ids of every family `personId` belongs to (global person, N memberships). */
export async function personFamilyIds(personId: number): Promise<number[]> {
  const memberships = await prisma.familyMembership.findMany({
    where: { personId },
    select: { familyId: true },
  });
  return memberships.map((m) => m.familyId);
}

/**
 * True when the user and the person share at least one family — the access
 * rule for a global Person (orthogonal UserFamily check per #5).
 */
export async function personAllowed(userId: number, personId: number): Promise<boolean> {
  const userFamilies = await prisma.userFamily.findMany({
    where: { userId },
    select: { familyId: true },
  });
  if (userFamilies.length === 0) return false;
  const shared = await prisma.familyMembership.findFirst({
    where: { personId, familyId: { in: userFamilies.map((f) => f.familyId) } },
    select: { familyId: true },
  });
  return shared !== null;
}

/**
 * The flat tree feed for one family: its members, plus the parent edges and
 * partnerships whose BOTH ends are in the family (dangling cross-family
 * references are omitted rather than half-sent — #15).
 */
export async function feedForFamily(familyId: number): Promise<PeopleFeed> {
  const memberRecords = await prisma.person.findMany({
    where: { memberships: { some: { familyId } } },
    select: personSelect,
    orderBy: [{ birthDate: 'asc' }, { id: 'asc' }],
  });
  const ids = memberRecords.map((p) => p.id);

  const [edges, partnerships] = await Promise.all([
    ids.length === 0
      ? Promise.resolve([])
      : prisma.parentChild.findMany({
          where: { childId: { in: ids }, parentId: { in: ids } },
          select: { childId: true, parentId: true, role: true },
        }),
    ids.length === 0
      ? Promise.resolve([])
      : prisma.partnership.findMany({
          where: { personAId: { in: ids }, personBId: { in: ids } },
          select: {
            id: true,
            personAId: true,
            personBId: true,
            kind: true,
            startDate: true,
            endDate: true,
          },
        }),
  ]);

  return {
    people: memberRecords.map(toPersonDto),
    parentChild: edges satisfies ParentChildDto[],
    partnerships: partnerships.map((p) => ({
      ...p,
      startDate: p.startDate ? p.startDate.toISOString() : null,
      endDate: p.endDate ? p.endDate.toISOString() : null,
    })) satisfies PartnershipDto[],
  };
}

/** Parent edges where the person is the child (their own edges). */
export async function parentEdgesOf(personId: number): Promise<ParentChildDto[]> {
  const edges = await prisma.parentChild.findMany({
    where: { childId: personId },
    select: { childId: true, parentId: true, role: true },
  });
  return edges;
}

/** Partnerships involving the person. */
export async function partnershipsOf(personId: number): Promise<PartnershipDto[]> {
  const rows = await prisma.partnership.findMany({
    where: { OR: [{ personAId: personId }, { personBId: personId }] },
    select: {
      id: true,
      personAId: true,
      personBId: true,
      kind: true,
      startDate: true,
      endDate: true,
    },
  });
  return rows.map((p) => ({
    ...p,
    startDate: p.startDate ? p.startDate.toISOString() : null,
    endDate: p.endDate ? p.endDate.toISOString() : null,
  }));
}
