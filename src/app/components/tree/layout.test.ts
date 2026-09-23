import { describe, expect, it } from 'vitest';
import {
  buildGraph,
  CARD_H,
  CARD_W,
  generationRanks,
  layoutTree,
} from './layout';
import type { ParentEdgeData, PartnerEdgeData } from './layout';
import type { PeopleFeed, PersonDto } from '../../../types/feed';

// Kessler-shaped fixture — the prototype's family from index.html:
//
//   Walter(1) — Ruth(2)          gen 1
//        └── Daniel(3) — Anita(4)      gen 2   (Anita has no parents of her own)
//              ├── Maya(5) — Sam(6)    gen 3   (Sam has no parents either)
//              └── Theo(7)             gen 3
//
// plus Lone(8), a person with no relationships at all.

function person(
  id: number,
  fullName: string,
  extra: Partial<PersonDto> = {},
): PersonDto {
  return {
    id,
    fullName,
    gender: 'Not said',
    birthDate: null,
    deathDate: null,
    birthPlace: null,
    bio: null,
    pictureUrl: null,
    ...extra,
  };
}

const kessler: PeopleFeed = {
  people: [
    person(1, 'Walter Kessler', {
      gender: 'Male',
      birthDate: '1941-01-01',
      deathDate: '2016-01-01',
      birthPlace: 'Kraków, Poland',
    }),
    person(2, 'Ruth Kessler', {
      gender: 'Female',
      birthDate: '1940-01-01',
      deathDate: '2021-01-01',
    }),
    person(3, 'Daniel Kessler', {
      gender: 'Male',
      birthDate: '1965-02-12',
      birthPlace: 'Bristol, England',
    }),
    person(4, 'Anita Kessler', { gender: 'Female', birthDate: '1968-07-03' }),
    person(5, 'Maya Kessler', {
      gender: 'Female',
      birthDate: '1994-03-14',
      birthPlace: 'Bristol, England',
    }),
    person(6, 'Sam Ortega', { gender: 'Male', birthDate: '1992-11-02' }),
    person(7, 'Theo Kessler', { gender: 'Male', birthDate: '1997-09-27' }),
    person(8, 'Lone Riverside'),
  ],
  parentChild: [
    { childId: 3, parentId: 1, role: 'BIOLOGICAL' },
    { childId: 3, parentId: 2, role: 'BIOLOGICAL' },
    { childId: 5, parentId: 3, role: 'BIOLOGICAL' },
    { childId: 5, parentId: 4, role: 'BIOLOGICAL' },
    { childId: 7, parentId: 3, role: 'ADOPTIVE' },
    { childId: 7, parentId: 4, role: 'BIOLOGICAL' },
    // duplicate parent edge — buildGraph must drop it
    { childId: 5, parentId: 3, role: 'BIOLOGICAL' },
    // dangling edge — an end outside the family, skipped not thrown
    { childId: 8, parentId: 99, role: 'BIOLOGICAL' },
  ],
  partnerships: [
    { id: 1, personAId: 1, personBId: 2, kind: 'MARRIED', startDate: null, endDate: null },
    { id: 2, personAId: 3, personBId: 4, kind: 'MARRIED', startDate: null, endDate: null },
    { id: 3, personAId: 5, personBId: 6, kind: 'CIVIL_UNION', startDate: null, endDate: null },
    // reversed duplicate of partnership 1 — deduped by the A/B pair key
    { id: 4, personAId: 2, personBId: 1, kind: 'MARRIED', startDate: null, endDate: null },
  ],
};

describe('generationRanks', () => {
  it('gives prototype generations: roots 1, children deeper', () => {
    const ranks = generationRanks(kessler);
    expect(ranks.get(1)).toBe(1); // Walter
    expect(ranks.get(3)).toBe(2); // Daniel
    expect(ranks.get(5)).toBe(3); // Maya
    expect(ranks.get(7)).toBe(3); // Theo
  });

  it('equalises partners onto one rank (marrying in, no ancestors)', () => {
    const ranks = generationRanks(kessler);
    expect(ranks.get(4)).toBe(2); // Anita lifts gen 1 → beside Daniel
    expect(ranks.get(6)).toBe(3); // Sam lifts gen 1 → beside Maya
    expect(ranks.get(4)).toBe(ranks.get(3));
    expect(ranks.get(6)).toBe(ranks.get(5));
  });

  it('terminates on a corrupt parent cycle instead of hanging', () => {
    const cyclic: PeopleFeed = {
      people: [person(1, 'A'), person(2, 'B')],
      parentChild: [
        { childId: 1, parentId: 2, role: 'BIOLOGICAL' },
        { childId: 2, parentId: 1, role: 'BIOLOGICAL' },
      ],
      partnerships: [],
    };
    const ranks = generationRanks(cyclic);
    expect(Number.isFinite(ranks.get(1))).toBe(true);
    expect(Number.isFinite(ranks.get(2))).toBe(true);
  });
});

describe('layoutTree', () => {
  const ranks = generationRanks(kessler);
  const positions = layoutTree(kessler, ranks);

  it('starts at the 40px canvas margin', () => {
    let minX = Infinity;
    let minY = Infinity;
    for (const pos of positions.values()) {
      minX = Math.min(minX, pos.x);
      minY = Math.min(minY, pos.y);
    }
    expect(minX).toBe(40);
    expect(minY).toBe(40);
  });

  it('puts partners side by side on the same row', () => {
    const maya = positions.get(5)!;
    const sam = positions.get(6)!;
    expect(sam.y).toBe(maya.y);
    const daniel = positions.get(3)!;
    const anita = positions.get(4)!;
    expect(anita.y).toBe(daniel.y);
    expect(Math.abs(anita.x - daniel.x)).toBeGreaterThanOrEqual(CARD_W);
  });

  it('spends the prototype rank step between generations (96 + 124 = 220)', () => {
    const daniel = positions.get(3)!;
    const maya = positions.get(5)!;
    expect(maya.y - daniel.y).toBe(CARD_H + 124);
    expect(daniel.y - positions.get(1)!.y).toBe(CARD_H + 124);
  });

  it('keeps the 80px prototype gap between neighbouring cards in a rank', () => {
    const byRow = new Map<number, Array<{ x: number }>>();
    for (const pos of positions.values()) {
      const row = byRow.get(pos.y);
      if (row) row.push(pos);
      else byRow.set(pos.y, [pos]);
    }
    for (const row of byRow.values()) {
      row.sort((a, b) => a.x - b.x);
      for (let i = 1; i < row.length; i += 1) {
        expect(row[i].x - row[i - 1].x).toBeGreaterThanOrEqual(CARD_W + 80);
      }
    }
  });
});

describe('buildGraph', () => {
  it('renders one person node per family member, focus flagged', () => {
    const { nodes } = buildGraph(kessler, 5);
    expect(nodes).toHaveLength(8);
    const maya = nodes.find((node) => node.id === '5');
    expect(maya?.type).toBe('person');
    expect(maya?.data.focused).toBe(true);
    expect(maya?.data.person.fullName).toBe('Maya Kessler');
    expect(nodes.filter((node) => node.data.focused)).toHaveLength(1);
  });

  it('drops duplicate and dangling parent edges', () => {
    const { edges } = buildGraph(kessler, null);
    const parentEdges = edges.filter((edge) => edge.type === 'parent');
    // 6 real parent edges (duplicates/dangling filtered): 1→3, 2→3, 3→5,
    // 4→5, 3→7, 4→7
    expect(parentEdges).toHaveLength(6);
    expect(edges.find((edge) => edge.id === 'pc-99-8')).toBeUndefined();
    expect(edges.filter((edge) => edge.id === 'pc-3-5')).toHaveLength(1);
  });

  it('descends from the couple union with stacked kinship labels', () => {
    const { edges } = buildGraph(kessler, null);
    const fromWalter = edges.find((edge) => edge.id === 'pc-1-3')?.data as ParentEdgeData;
    const fromRuth = edges.find((edge) => edge.id === 'pc-2-3')?.data as ParentEdgeData;
    const fromDaniel = edges.find((edge) => edge.id === 'pc-3-5')?.data as ParentEdgeData;
    const fromAnita = edges.find((edge) => edge.id === 'pc-4-5')?.data as ParentEdgeData;

    // union point between Walter and Ruth; both drop from it
    expect(fromWalter.unionX).not.toBeNull();
    expect(fromRuth.unionX).toBe(fromWalter.unionX);
    expect(fromWalter.unionY).toBe(fromRuth.unionY);
    // labels stack (father over mother) instead of overprinting
    expect(fromWalter.label).toBe('father');
    expect(fromRuth.label).toBe('mother');
    expect(fromRuth.labelY).toBeGreaterThan(fromWalter.labelY);
    expect(fromWalter.labelX).toBe(fromRuth.labelX);

    // role beats gendered kinship (#14): ADOPTIVE edge says "adoptive"
    expect(fromAnita.label).toBe('mother');
    expect(fromDaniel.label).toBe('father');
    const adoptive = edges.find((edge) => edge.id === 'pc-3-7')?.data as ParentEdgeData;
    expect(adoptive.label).toBe('adoptive');

    // sibling bar sits midway between the union and the children
    expect(fromWalter.barY).not.toBeNull();
    expect(fromWalter.barY!).toBeGreaterThan(fromWalter.unionY!);
    expect(fromWalter.barY!).toBeLessThan(
      (buildGraph(kessler, null).nodes.find((n) => n.id === '5')?.position.y ?? 0),
    );
  });

  it('draws one partner bar per partnership, left → right, with the kind label', () => {
    const { edges } = buildGraph(kessler, null);
    const partnerEdges = edges.filter((edge) => edge.type === 'partner');
    // 3 unique pairs (the reversed duplicate is deduped)
    expect(partnerEdges).toHaveLength(3);

    const mayaSam = partnerEdges.find((edge) => edge.id === 'pp-3');
    expect(mayaSam).toBeDefined();
    const source = Number(mayaSam!.source);
    const target = Number(mayaSam!.target);
    const nodes = buildGraph(kessler, null).nodes;
    const sourceNode = nodes.find((node) => node.id === mayaSam!.source)!;
    const targetNode = nodes.find((node) => node.id === mayaSam!.target)!;
    expect(sourceNode.position.x).toBeLessThan(targetNode.position.x);
    expect(source).not.toBe(target);
    expect(target).not.toBe(5 - 5); // sanity: ids are real
    expect((mayaSam!.data as PartnerEdgeData).label).toBe('civil union');

    const walterRuth = partnerEdges.find((edge) => edge.id === 'pp-1');
    expect((walterRuth?.data as PartnerEdgeData).label).toBe('married');
  });

  it('lays out an empty family without throwing', () => {
    const empty: PeopleFeed = { people: [], parentChild: [], partnerships: [] };
    const graph = buildGraph(empty, null);
    expect(graph.nodes).toHaveLength(0);
    expect(graph.edges).toHaveLength(0);
  });
});
