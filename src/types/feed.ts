/**
 * Wire types for the tree feed and person payloads — the contract from #15.
 * Server routes produce these; screens and src/lib/derive.ts consume them.
 * Dates are ISO strings (JSON-serialised Date) or null; format them with
 * src/lib/vitalDates.ts, never ad hoc.
 */

export type ParentRole = 'BIOLOGICAL' | 'ADOPTIVE' | 'STEP' | 'FOSTER' | 'LEGAL_GUARDIAN';

export const PARENT_ROLES: readonly ParentRole[] = [
  'BIOLOGICAL',
  'ADOPTIVE',
  'STEP',
  'FOSTER',
  'LEGAL_GUARDIAN',
] as const;

export type PartnershipKind = 'MARRIED' | 'CIVIL_UNION' | 'COHABITATION';

export const PARTNERSHIP_KINDS: readonly PartnershipKind[] = [
  'MARRIED',
  'CIVIL_UNION',
  'COHABITATION',
] as const;

/** A person, serialised for the wire. Never carries bytes or a raw picturePath. */
export interface PersonDto {
  id: number;
  fullName: string;
  gender: string;
  birthDate: string | null;
  deathDate: string | null;
  birthPlace: string | null;
  bio: string | null;
  /** Same-origin proxy URL, null ⇒ monogram fallback. */
  pictureUrl: string | null;
}

export interface ParentChildDto {
  childId: number;
  parentId: number;
  role: ParentRole;
}

export interface PartnershipDto {
  id: number;
  personAId: number;
  personBId: number;
  kind: PartnershipKind;
  startDate: string | null;
  endDate: string | null;
}

/** GET /api/families/[familyId]/people */
export interface PeopleFeed {
  people: PersonDto[];
  parentChild: ParentChildDto[];
  partnerships: PartnershipDto[];
}

/** GET /api/people/[id] */
export interface PersonBootstrap {
  person: PersonDto;
  familyIds: number[];
}

/** Response to POST/PATCH person — the touched slices, feed-shaped. */
export interface PersonMutationResult {
  person: PersonDto;
  parentChild: ParentChildDto[];
  partnerships: PartnershipDto[];
}
