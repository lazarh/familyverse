import { describe, expect, it } from 'vitest';
import {
  childOfChip,
  childrenOf,
  generationOf,
  grandparentTag,
  grandparentsOf,
  kinWord,
  miniTree,
  parentTag,
  partnerTag,
  parentsOf,
  partnersOf,
  siblingsOf,
} from './derive';
import type { PeopleFeed, PersonDto } from '@/types/feed';

// Kessler-shaped fixture (the prototype's family) + one foster edge:
//
//   Walter(M) — Ruth(F)          gen 1
//        └── Daniel(M) — Anita(F)   gen 2
//              ├── Maya(F) — Sam(M)   gen 3
//              ├── Theo(M)
//              └── Nina(F)  [via Daniel, FOSTER]
//
// Maya — Alex (COHABITATION) exercises N-partnerships.

function person(
  id: number,
  fullName: string,
  gender: string,
  birthDate: string | null = null,
  deathDate: string | null = null,
  birthPlace: string | null = null,
  bio: string | null = null,
): PersonDto {
  return { id, fullName, gender, birthDate, deathDate, birthPlace, bio, pictureUrl: null };
}

const people: PersonDto[] = [
  person(1, 'Walter Kessler', 'Male', '1941-05-02', '2016-11-30', 'Kraków, Poland'),
  person(2, 'Ruth Kessler', 'Female', '1940-01-15', '2021-06-04', 'Malmö, Sweden'),
  person(3, 'Daniel Kessler', 'Male', '1965-02-12', null, 'Bristol, England'),
  person(4, 'Anita Kessler', 'Female', '1968-07-03', null, 'Accra, Ghana'),
  person(5, 'Maya Kessler', 'Female', '1994-03-14', null, 'Bristol, England'),
  person(6, 'Sam Ortega', 'Male', '1992-11-02', null, 'Porto, Portugal'),
  person(7, 'Theo Kessler', 'Male', '1997-09-27', null, 'Bristol, England'),
  person(8, 'Nina Kessler', 'Non-binary', '2010-04-01', null, 'Bristol, England'),
  person(9, 'Alex Rivera', 'Not said', '1996-08-09', null, 'Lisbon, Portugal'),
];

const feed: PeopleFeed = {
  people,
  parentChild: [
    { childId: 3, parentId: 1, role: 'BIOLOGICAL' },
    { childId: 3, parentId: 2, role: 'BIOLOGICAL' },
    { childId: 5, parentId: 3, role: 'BIOLOGICAL' },
    { childId: 5, parentId: 4, role: 'BIOLOGICAL' },
    { childId: 7, parentId: 3, role: 'BIOLOGICAL' },
    { childId: 7, parentId: 4, role: 'BIOLOGICAL' },
    { childId: 8, parentId: 3, role: 'FOSTER' },
    { childId: 1, parentId: 99, role: 'BIOLOGICAL' }, // dangling — must be skipped
  ],
  partnerships: [
    { id: 10, personAId: 1, personBId: 2, kind: 'MARRIED', startDate: null, endDate: null },
    { id: 11, personAId: 3, personBId: 4, kind: 'MARRIED', startDate: null, endDate: null },
    { id: 12, personAId: 5, personBId: 6, kind: 'MARRIED', startDate: null, endDate: null },
    { id: 13, personAId: 5, personBId: 9, kind: 'COHABITATION', startDate: null, endDate: null },
  ],
};

describe('parentsOf / childrenOf', () => {
  it('resolves parents with roles and skips dangling edges', () => {
    const parents = parentsOf(5, feed);
    expect(parents.map((p) => [p.person.fullName, p.role])).toEqual([
      ['Daniel Kessler', 'BIOLOGICAL'],
      ['Anita Kessler', 'BIOLOGICAL'],
    ]);
    // Walter's dangling edge to id 99 is skipped, not thrown on.
    expect(parentsOf(1, feed)).toEqual([]);
  });

  it('foster edge appears for the child and lists the child as a foster child', () => {
    expect(parentsOf(8, feed).map((p) => p.role)).toEqual(['FOSTER']);
    expect(childrenOf(3, feed).map((c) => c.person.fullName)).toEqual([
      'Maya Kessler',
      'Theo Kessler',
      'Nina Kessler',
    ]);
  });
});

describe('partnersOf', () => {
  it('resolves the other end regardless of slot order', () => {
    expect(partnersOf(1, feed).map((p) => p.person.fullName)).toEqual(['Ruth Kessler']);
    expect(partnersOf(2, feed).map((p) => p.person.fullName)).toEqual(['Walter Kessler']);
  });

  it('supports N partnerships per person (Maya: Sam + Alex)', () => {
    const maya = partnersOf(5, feed);
    expect(maya.map((p) => p.person.fullName)).toEqual(['Sam Ortega', 'Alex Rivera']);
    expect(maya.map((p) => p.partnership.kind)).toEqual(['MARRIED', 'COHABITATION']);
  });
});

describe('siblingsOf', () => {
  it('full siblings share both parents', () => {
    const mayaSibs = siblingsOf(5, feed).filter((s) => s.person.id === 7);
    expect(mayaSibs).toEqual([{ person: people[6], isHalf: false }]);
  });

  it('half siblings share exactly one parent (foster counts — display-only)', () => {
    const nina = siblingsOf(5, feed).find((s) => s.person.id === 8);
    expect(nina?.isHalf).toBe(true);
  });

  it('root people with no parents have no siblings', () => {
    expect(siblingsOf(1, feed)).toEqual([]);
  });
});

describe('grandparentsOf', () => {
  it("collects both sides with the linking parent's side from gender", () => {
    const gps = grandparentsOf(5, feed);
    expect(gps.map((g) => [g.person.fullName, g.side])).toEqual([
      ['Walter Kessler', 'paternal'],
      ['Ruth Kessler', 'paternal'],
    ]);
  });

  it('side is null when the linking parent gender is unsaid', () => {
    const altered: PeopleFeed = {
      ...feed,
      people: feed.people.map((p) => (p.id === 3 ? { ...p, gender: 'Not said' } : p)),
    };
    const gps = grandparentsOf(5, altered);
    expect(gps.every((g) => g.side === null)).toBe(true);
  });
});

describe('generationOf', () => {
  it('roots are generation 1', () => {
    expect(generationOf(1, feed)).toBe(1);
    expect(generationOf(9, feed)).toBe(1); // no parents in feed
  });

  it('walks the longest chain, not the first parent found', () => {
    expect(generationOf(3, feed)).toBe(2);
    expect(generationOf(5, feed)).toBe(3);
    expect(generationOf(8, feed)).toBe(3);
  });

  it('cycle guard: a corrupt loop returns a number instead of hanging', () => {
    const looped: PeopleFeed = {
      ...feed,
      parentChild: [...feed.parentChild, { childId: 1, parentId: 5, role: 'BIOLOGICAL' }],
    };
    expect(generationOf(5, looped)).toBeGreaterThanOrEqual(1);
  });
});

describe('miniTree', () => {
  it('rows: grandparents (deduped), parents, self+sibs+partners', () => {
    const mini = miniTree(5, feed);
    expect(mini.grandparents.map((p) => p.fullName)).toEqual(['Walter Kessler', 'Ruth Kessler']);
    expect(mini.parents.map((p) => p.fullName)).toEqual(['Daniel Kessler', 'Anita Kessler']);
    expect(mini.selfRow.map((p) => p.fullName)).toEqual([
      'Maya Kessler',
      'Theo Kessler',
      'Nina Kessler',
      'Sam Ortega',
      'Alex Rivera',
    ]);
  });
});

describe('kinship tags (#14 rules)', () => {
  it('parent tag: role wins, else gendered, else neutral', () => {
    expect(parentTag(people[7], 'FOSTER')).toBe('foster');
    expect(parentTag(people[2], 'BIOLOGICAL')).toBe('father');
    expect(parentTag(people[3], 'BIOLOGICAL')).toBe('mother');
    expect(parentTag({ ...people[2], gender: 'Not said' }, 'BIOLOGICAL')).toBe('parent');
    expect(parentTag(people[7], 'LEGAL_GUARDIAN')).toBe('legal guardian');
    expect(parentTag(people[7], 'ADOPTIVE')).toBe('adoptive');
    expect(parentTag(people[7], 'STEP')).toBe('step');
  });

  it('partner tag from kind', () => {
    expect(partnerTag('MARRIED')).toBe('married');
    expect(partnerTag('CIVIL_UNION')).toBe('civil union');
    expect(partnerTag('COHABITATION')).toBe('cohabiting');
  });

  it('kin words are gendered with neutral fallbacks (case-insensitive)', () => {
    expect(kinWord(people[4], 'child')).toBe('daughter');
    expect(kinWord(people[6], 'child')).toBe('son');
    expect(kinWord(people[8], 'child')).toBe('child');
    expect(kinWord({ ...people[4], gender: 'female' }, 'sibling')).toBe('sister');
    expect(kinWord(people[7], 'sibling')).toBe('sibling'); // Non-binary
  });

  it('grandparent tag', () => {
    expect(grandparentTag('paternal')).toBe('paternal');
    expect(grandparentTag('maternal')).toBe('maternal');
    expect(grandparentTag(null)).toBe('grandparent');
  });
});

describe('childOfChip', () => {
  it('gendered child-of with first names', () => {
    expect(childOfChip(people[4], feed)).toBe('Daughter of Daniel & Anita');
    expect(childOfChip(people[6], feed)).toBe('Son of Daniel & Anita'); // Theo
    // Sam (people[5]) and Walter have no parents in the feed → no chip.
    expect(childOfChip(people[5], feed)).toBeNull();
    expect(childOfChip(people[1], feed)).toBeNull();
  });

  it('>2 parents: first two + n more', () => {
    const withGuardian: PeopleFeed = {
      ...feed,
      parentChild: [...feed.parentChild, { childId: 5, parentId: 1, role: 'LEGAL_GUARDIAN' }],
    };
    expect(childOfChip(people[4], withGuardian)).toBe('Daughter of Daniel & Anita + 1 more');
  });

  it('unsaid gender falls back to Child', () => {
    const altered: PeopleFeed = {
      ...feed,
      people: feed.people.map((p) => (p.id === 8 ? { ...p, gender: 'Not said' } : p)),
    };
    expect(childOfChip(altered.people[7], altered)).toBe('Child of Daniel');
  });
});
