/**
 * Client-side derivation: one source of truth for relationship groups,
 * generations and kinship labels — used by both the tree and the profile
 * (#13: "lib/derive.ts — one derivation source").
 *
 * Pure functions over the flat feed from #15; missing endpoints (a person
 * outside the family) are skipped rather than throwing.
 */
import type {
  ParentRole,
  PartnershipDto,
  PartnershipKind,
  PeopleFeed,
  PersonDto,
} from '@/types/feed';

// ---------------------------------------------------------------------------
// lookups
// ---------------------------------------------------------------------------

/** Map of person id → person. */
export function peopleById(feed: PeopleFeed): Map<number, PersonDto> {
  return new Map(feed.people.map((p) => [p.id, p]));
}

// ---------------------------------------------------------------------------
// groups
// ---------------------------------------------------------------------------

export interface PersonWithRole {
  person: PersonDto;
  role: ParentRole;
}

/** Parents of `personId` (edges where they are the child). */
export function parentsOf(personId: number, feed: PeopleFeed): PersonWithRole[] {
  const byId = peopleById(feed);
  const out: PersonWithRole[] = [];
  for (const edge of feed.parentChild) {
    if (edge.childId !== personId) continue;
    const person = byId.get(edge.parentId);
    if (person) out.push({ person, role: edge.role });
  }
  return out;
}

/** Children of `personId` (edges where they are the parent). */
export function childrenOf(personId: number, feed: PeopleFeed): PersonWithRole[] {
  const byId = peopleById(feed);
  const out: PersonWithRole[] = [];
  for (const edge of feed.parentChild) {
    if (edge.parentId !== personId) continue;
    const person = byId.get(edge.childId);
    if (person) out.push({ person, role: edge.role });
  }
  return out;
}

export interface PartnerEntry {
  person: PersonDto;
  partnership: PartnershipDto;
}

/** Partnerships `personId` takes part in, with the other end resolved. */
export function partnersOf(personId: number, feed: PeopleFeed): PartnerEntry[] {
  const byId = peopleById(feed);
  const out: PartnerEntry[] = [];
  for (const partnership of feed.partnerships) {
    let otherId: number | null = null;
    if (partnership.personAId === personId) otherId = partnership.personBId;
    else if (partnership.personBId === personId) otherId = partnership.personAId;
    if (otherId === null) continue;
    const person = byId.get(otherId);
    if (person) out.push({ person, partnership });
  }
  return out;
}

export interface SiblingEntry {
  person: PersonDto;
  /** True when the pair shares exactly one parent edge (any role). */
  isHalf: boolean;
}

/** Siblings of `personId`: people sharing ≥ 1 parent (roles count — the
 *  label logic is display-only, see the kinship tag helpers). */
export function siblingsOf(personId: number, feed: PeopleFeed): SiblingEntry[] {
  const byId = peopleById(feed);
  const myParents = new Set(
    feed.parentChild.filter((e) => e.childId === personId).map((e) => e.parentId),
  );
  if (myParents.size === 0) return [];

  const sharedCounts = new Map<number, number>();
  for (const edge of feed.parentChild) {
    if (!myParents.has(edge.parentId)) continue;
    sharedCounts.set(edge.childId, (sharedCounts.get(edge.childId) ?? 0) + 1);
  }

  const out: SiblingEntry[] = [];
  for (const [otherId, shared] of sharedCounts) {
    if (otherId === personId) continue;
    const person = byId.get(otherId);
    if (person) out.push({ person, isHalf: shared === 1 });
  }
  return out;
}

export interface GrandparentEntry {
  person: PersonDto;
  /** The child's parent through whom this grandparent is reached. */
  viaParentId: number;
  /** paternal/maternal from the linking parent's gender; null when unsaid. */
  side: 'paternal' | 'maternal' | null;
}

/** Grandparents of `personId` (parents' parents), with the linking side. */
export function grandparentsOf(personId: number, feed: PeopleFeed): GrandparentEntry[] {
  const parents = parentsOf(personId, feed);
  const out: GrandparentEntry[] = [];
  const seen = new Set<string>();
  for (const { person: parent } of parents) {
    for (const { person: grandparent } of parentsOf(parent.id, feed)) {
      const key = `${parent.id}:${grandparent.id}`;
      if (seen.has(key)) continue;
      seen.add(key);
      out.push({ person: grandparent, viaParentId: parent.id, side: genderSide(parent.gender) });
    }
  }
  return out;
}

/**
 * Longest chain of ancestors + 1 (roots are generation 1). Cycle-safe:
 * a corrupt edge loop cannot hang the profile page.
 */
export function generationOf(personId: number, feed: PeopleFeed): number {
  const inFeed = new Set(feed.people.map((p) => p.id));
  const parentIdsByChild = new Map<number, number[]>();
  for (const edge of feed.parentChild) {
    // Dangling edges (an end outside the family) don't count as ancestry —
    // feeds filter them, but be defensive so a root stays generation 1.
    if (!inFeed.has(edge.childId) || !inFeed.has(edge.parentId)) continue;
    const list = parentIdsByChild.get(edge.childId);
    if (list) list.push(edge.parentId);
    else parentIdsByChild.set(edge.childId, [edge.parentId]);
  }

  // Per-branch visited copies so sibling branches don't starve each other's
  // depth, with a cycle guard: a corrupt edge loop cannot hang the page.
  const walk = (id: number, visited: Set<number>): number => {
    if (visited.has(id)) return 0;
    const parents = parentIdsByChild.get(id);
    if (!parents || parents.length === 0) return 1;
    let best = 0;
    for (const parentId of parents) {
      const next = new Set(visited);
      next.add(id);
      best = Math.max(best, walk(parentId, next));
    }
    return 1 + best;
  };

  return walk(personId, new Set());
}

export interface MiniTree {
  grandparents: PersonDto[];
  parents: PersonDto[];
  /** The profile's own row: self, then siblings, then partners. */
  selfRow: PersonDto[];
}

/** Rows for the profile's "In the tree" panel (member.html). */
export function miniTree(personId: number, feed: PeopleFeed): MiniTree {
  const byId = peopleById(feed);
  const self = byId.get(personId);
  const seenGrand = new Set<number>();
  const grandparents: PersonDto[] = [];
  for (const entry of grandparentsOf(personId, feed)) {
    if (seenGrand.has(entry.person.id)) continue; // dedupe both sides
    seenGrand.add(entry.person.id);
    grandparents.push(entry.person);
  }
  const parents = parentsOf(personId, feed).map((e) => e.person);
  const siblings = siblingsOf(personId, feed).map((e) => e.person);
  const partners = partnersOf(personId, feed).map((e) => e.person);
  const selfRow = [...(self ? [self] : []), ...siblings, ...partners];
  return { grandparents, parents, selfRow };
}

// ---------------------------------------------------------------------------
// kinship labels (#14 tag rules)
// ---------------------------------------------------------------------------

const ROLE_LABELS: Record<ParentRole, string> = {
  BIOLOGICAL: 'biological',
  ADOPTIVE: 'adoptive',
  STEP: 'step',
  FOSTER: 'foster',
  LEGAL_GUARDIAN: 'legal guardian',
};

function genderToken(gender: string | null | undefined): string {
  return (gender ?? '').trim().toLowerCase();
}

/** paternal from a Male linking parent, maternal from Female, else null. */
function genderSide(gender: string | null | undefined): 'paternal' | 'maternal' | null {
  const token = genderToken(gender);
  if (token === 'male') return 'paternal';
  if (token === 'female') return 'maternal';
  return null;
}

/**
 * Parent-row tag: the role when it isn't plain biological
 * (`adoptive`, `step`, `foster`, `legal guardian`), otherwise the gendered
 * kinship of that parent (`father` / `mother` / `parent`).
 */
export function parentTag(person: PersonDto, role: ParentRole): string {
  if (role !== 'BIOLOGICAL') return ROLE_LABELS[role];
  const token = genderToken(person.gender);
  if (token === 'male') return 'father';
  if (token === 'female') return 'mother';
  return 'parent';
}

/** Partnership-row tag from kind: `married` / `civil union` / `cohabiting`. */
export function partnerTag(kind: PartnershipKind): string {
  switch (kind) {
    case 'MARRIED':
      return 'married';
    case 'CIVIL_UNION':
      return 'civil union';
    case 'COHABITATION':
      return 'cohabiting';
  }
}

/** Gendered kinship word for a child or sibling row (falls back to the
 *  neutral word for Non-binary / Not said / unknown values). */
export function kinWord(person: PersonDto, kind: 'child' | 'sibling'): string {
  const token = genderToken(person.gender);
  if (kind === 'child') {
    if (token === 'female') return 'daughter';
    if (token === 'male') return 'son';
    return 'child';
  }
  if (token === 'female') return 'sister';
  if (token === 'male') return 'brother';
  return 'sibling';
}

/** Grandparent-row tag: `paternal` / `maternal` / `grandparent`. */
export function grandparentTag(side: 'paternal' | 'maternal' | null): string {
  return side ?? 'grandparent';
}

/**
 * The profile header chip: `Daughter of Daniel & Anita`, `child of …` when
 * gender is unsaid, first names only; >2 parents → `A & B + n more`.
 * Null when the person has no parents in the feed.
 */
export function childOfChip(person: PersonDto, feed: PeopleFeed): string | null {
  const parents = parentsOf(person.id, feed);
  if (parents.length === 0) return null;

  const childWord = (() => {
    const token = genderToken(person.gender);
    if (token === 'female') return 'Daughter';
    if (token === 'male') return 'Son';
    return 'Child';
  })();

  const firstNames = parents.map((p) => p.person.fullName.trim().split(/\s+/)[0]);
  let names: string;
  if (firstNames.length <= 2) {
    names = firstNames.join(' & ');
  } else {
    names = `${firstNames[0]} & ${firstNames[1]} + ${firstNames.length - 2} more`;
  }
  return `${childWord} of ${names}`;
}
