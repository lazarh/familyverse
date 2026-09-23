/**
 * Tree layout + graph build for the screen (#16, structure from #13).
 *
 * Ranking is a small fixpoint over derive.generationOf:
 *   1. base rank = longest ancestor chain (roots = generation 1),
 *   2. partners are equalised to the higher of the two,
 *   3. every child sits at least one rank below each parent.
 *
 * Step 2 is ours because dagre's ranker cannot express a same-rank
 * constraint: its edge `minlen` is a hard ≥ 1 floor (a `minlen: 0` partner
 * edge is effectively clamped to 1 — verified against dagre 0.8, it splits
 * a couple across two ranks). Dagre is therefore kept from the old graph
 * for what it is good at — horizontal ordering / crossing minimisation —
 * and final geometry is: y from the ranks above, x from dagre with a
 * monotone pass that guarantees the prototype's card gap and keeps couples
 * side by side for the partner bar.
 *
 * Geometry from prototype/index.html: cards 236×96 (ticket #16's build
 * instruction), rank step 220 = 96 + 124 vertical, 80px card gaps, 40px
 * canvas margin (the prototype's first card sits at 40,40).
 */
import dagre from 'dagre';
import { generationOf, parentTag, partnerTag } from '../../../lib/derive';
import type { ParentChildDto, PeopleFeed, PersonDto, PartnershipDto } from '../../../types/feed';
import type { Edge, Node } from 'reactflow';

/** Card width — ticket #16 ("236px-ish per prototype"). */
export const CARD_W = 236;
export const CARD_H = 96;
/** Vertical gap between rank boxes → 220px rank step (prototype tops: 40/260/480). */
const RANK_SEP = 124;
/** Horizontal gap between neighbouring cards in a rank (prototype: 80–100). */
const NODE_GAP = 80;
/** Canvas margin around the laid-out tree. */
const MARGIN = 40;

/** Top-left corner of a card, in flow coordinates. */
export interface CardPos {
  x: number;
  y: number;
}

/** Data handed to the `person` node type (tree/PersonCard). */
export interface PersonCardData {
  person: PersonDto;
  /** True for `?focus=<id>` — the card draws a clay ring. */
  focused: boolean;
}

/** Data handed to the `parent` edge type (tree/TreeEdges). */
export interface ParentEdgeData {
  /** parentTag(parent, role) — `mother`, `adoptive`… */
  label: string;
  labelX: number;
  labelY: number;
  /** Midpoint between a partnered couple, or null for a lone parent. */
  unionX: number | null;
  unionY: number | null;
  /** The horizontal sibling bar's y (prototype: descent splits at mid-gap). */
  barY: number | null;
}

/** Data handed to the `partner` edge type (tree/TreeEdges). */
export interface PartnerEdgeData {
  /** partnerTag(kind) — `married`, `civil union`, `cohabiting`. */
  label: string;
}

export interface TreeGraph {
  nodes: Node<PersonCardData>[];
  edges: Edge<ParentEdgeData | PartnerEdgeData>[];
}

function partnershipKey(a: number, b: number): string {
  return a < b ? `${a}:${b}` : `${b}:${a}`;
}

/**
 * Generation ranks: base ranks, partners equalised, children pushed below
 * parents — iterated to a fixpoint. Bounded by `people.length + 4` passes
 * so a corrupt parent cycle cannot hang the page (ranks only ever grow).
 */
export function generationRanks(feed: PeopleFeed): Map<number, number> {
  const ranks = new Map<number, number>();
  for (const person of feed.people) {
    ranks.set(person.id, generationOf(person.id, feed));
  }

  const pairs: Array<[number, number]> = [];
  const seenPairs = new Set<string>();
  for (const partnership of feed.partnerships) {
    const { personAId, personBId } = partnership;
    if (personAId === personBId) continue;
    if (!ranks.has(personAId) || !ranks.has(personBId)) continue;
    const key = partnershipKey(personAId, personBId);
    if (seenPairs.has(key)) continue;
    seenPairs.add(key);
    pairs.push([personAId, personBId]);
  }

  const parentEdges = feed.parentChild.filter(
    (edge) => ranks.has(edge.childId) && ranks.has(edge.parentId),
  );

  const maxPasses = feed.people.length + 4;
  let changed = true;
  for (let pass = 0; changed && pass < maxPasses; pass += 1) {
    changed = false;
    for (const [a, b] of pairs) {
      const rankA = ranks.get(a);
      const rankB = ranks.get(b);
      if (rankA === undefined || rankB === undefined || rankA === rankB) continue;
      const merged = Math.max(rankA, rankB);
      ranks.set(a, merged);
      ranks.set(b, merged);
      changed = true;
    }
    for (const edge of parentEdges) {
      const childRank = ranks.get(edge.childId);
      const parentRank = ranks.get(edge.parentId);
      if (childRank === undefined || parentRank === undefined) continue;
      if (childRank <= parentRank) {
        ranks.set(edge.childId, parentRank + 1);
        changed = true;
      }
    }
  }

  return ranks;
}

/**
 * Dagre's horizontal centres (its own ranks are discarded — see header).
 * Defensive: a dagre failure or a dangling edge falls back to feed order
 * rather than taking the screen down.
 */
function dagreCenterXs(feed: PeopleFeed): Map<number, number> {
  const xs = new Map<number, number>();
  const present = new Set(feed.people.map((person) => person.id));

  const graph = new dagre.graphlib.Graph({ directed: true });
  graph.setGraph({
    rankdir: 'TB',
    nodesep: NODE_GAP,
    ranksep: RANK_SEP,
    marginx: MARGIN,
    marginy: MARGIN,
  });
  graph.setDefaultEdgeLabel(() => ({}));
  for (const person of feed.people) {
    graph.setNode(String(person.id), { width: CARD_W, height: CARD_H });
  }
  for (const edge of feed.parentChild) {
    if (!present.has(edge.childId) || !present.has(edge.parentId)) continue;
    graph.setEdge(String(edge.parentId), String(edge.childId), { minlen: 1, weight: 1 });
  }

  try {
    dagre.layout(graph);
    for (const id of graph.nodes()) {
      const node = graph.node(id) as { x?: number } | undefined;
      if (node && typeof node.x === 'number' && Number.isFinite(node.x)) {
        xs.set(Number(id), node.x);
      }
    }
  } catch {
    // Fall through: every missing centre is patched below.
  }

  for (const person of feed.people) {
    if (!xs.has(person.id)) xs.set(person.id, MARGIN + CARD_W / 2);
  }
  return xs;
}

/**
 * Card positions: dagre x (sorted within each rank), couples made adjacent,
 * then a monotone pass enforcing the prototype gap, finally normalised so
 * the tree starts at the 40px margin.
 */
export function layoutTree(feed: PeopleFeed, ranks: Map<number, number>): Map<number, CardPos> {
  const centers = dagreCenterXs(feed);
  const positions = new Map<number, CardPos>();

  const byRank = new Map<number, number[]>();
  for (const person of feed.people) {
    const rank = ranks.get(person.id);
    if (rank === undefined) continue;
    const list = byRank.get(rank);
    if (list) list.push(person.id);
    else byRank.set(rank, [person.id]);
  }

  const rankValues = [...byRank.keys()].sort((a, b) => a - b);
  for (const rank of rankValues) {
    const list = byRank.get(rank);
    if (!list || list.length === 0) continue;

    // Dagre's horizontal order inside this rank.
    list.sort((a, b) => (centers.get(a) ?? 0) - (centers.get(b) ?? 0));

    // Couples side by side — the partner bar must not have a card between
    // its ends. Move the second partner next to the first.
    const seenPairs = new Set<string>();
    for (const partnership of feed.partnerships) {
      const { personAId, personBId } = partnership;
      if (personAId === personBId) continue;
      const key = partnershipKey(personAId, personBId);
      if (seenPairs.has(key)) continue;
      seenPairs.add(key);
      const indexA = list.indexOf(personAId);
      const indexB = list.indexOf(personBId);
      if (indexA === -1 || indexB === -1 || Math.abs(indexA - indexB) <= 1) continue;
      const [moved] = list.splice(indexB, 1);
      const newA = list.indexOf(personAId);
      list.splice(newA + 1, 0, moved);
    }

    // x: dagre's left edge, monotonically enforced to keep order + gap.
    let cursor = Number.NEGATIVE_INFINITY;
    for (const id of list) {
      const preferred = (centers.get(id) ?? 0) - CARD_W / 2;
      const x = Math.max(preferred, cursor);
      positions.set(id, { x, y: (rank - 1) * (CARD_H + RANK_SEP) });
      cursor = x + CARD_W + NODE_GAP;
    }
  }

  // Normalise into the canvas margin (prototype: first card at 40,40).
  let minX = Number.POSITIVE_INFINITY;
  let minY = Number.POSITIVE_INFINITY;
  for (const pos of positions.values()) {
    if (pos.x < minX) minX = pos.x;
    if (pos.y < minY) minY = pos.y;
  }
  if (!Number.isFinite(minX) || !Number.isFinite(minY)) return positions;
  const dx = MARGIN - minX;
  const dy = MARGIN - minY;
  for (const [id, pos] of positions) {
    positions.set(id, { x: Math.round(pos.x + dx), y: Math.round(pos.y + dy) });
  }
  return positions;
}

/**
 * The reactflow graph: `person` nodes from the layout, `parent` edges
 * (orthogonal descent, from the couple's union point when the parents are
 * partnered — prototype `.links`), and `partner` bars between couples.
 * Dangling edges (an end outside the family) are skipped, never thrown.
 */
export function buildGraph(feed: PeopleFeed, focusId: number | null): TreeGraph {
  const ranks = generationRanks(feed);
  const positions = layoutTree(feed, ranks);

  const byId = new Map(feed.people.map((person) => [person.id, person]));

  const nodes: Node<PersonCardData>[] = [];
  for (const person of feed.people) {
    const pos = positions.get(person.id);
    if (!pos) continue;
    nodes.push({
      id: String(person.id),
      type: 'person',
      position: { x: pos.x, y: pos.y },
      data: { person, focused: person.id === focusId },
    });
  }

  const posOf = (id: number): CardPos | null => positions.get(id) ?? null;

  // Deduped partnerships with both ends in the family.
  const partnerships = new Map<string, PartnershipDto>();
  for (const partnership of feed.partnerships) {
    const { personAId, personBId } = partnership;
    if (personAId === personBId) continue;
    if (!byId.has(personAId) || !byId.has(personBId)) continue;
    const key = partnershipKey(personAId, personBId);
    if (!partnerships.has(key)) partnerships.set(key, partnership);
  }

  const edges: Array<Edge<ParentEdgeData | PartnerEdgeData>> = [];

  // Parent → child, one edge per (parent, child), never a duplicate.
  const parentsByChild = new Map<number, ParentChildDto[]>();
  const seenParentEdges = new Set<string>();
  for (const edge of feed.parentChild) {
    if (!byId.has(edge.childId) || !byId.has(edge.parentId)) continue;
    const key = partnershipKey(edge.parentId, edge.childId);
    if (seenParentEdges.has(key)) continue;
    seenParentEdges.add(key);
    const list = parentsByChild.get(edge.childId);
    if (list) list.push(edge);
    else parentsByChild.set(edge.childId, [edge]);
  }

  for (const [childId, list] of parentsByChild) {
    const childPos = posOf(childId);
    if (!childPos) continue;

    for (let i = 0; i < list.length; i += 1) {
      const edge = list[i];
      const parent = byId.get(edge.parentId);
      const parentPos = posOf(edge.parentId);
      if (!parent || !parentPos) continue;

      const parentBottom = parentPos.y + CARD_H;
      const parentCenterX = parentPos.x + CARD_W / 2;

      // A partnered co-parent on the same rank → children descend from the
      // union point between the couple (prototype's `Walter —○— Ruth`).
      let unionX: number | null = null;
      let unionY: number | null = null;
      for (let j = 0; j < list.length; j += 1) {
        if (j === i) continue;
        const otherId = list[j].parentId;
        if (!partnerships.has(partnershipKey(edge.parentId, otherId))) continue;
        const otherPos = posOf(otherId);
        if (!otherPos || Math.abs(otherPos.y - parentPos.y) > 2) continue;
        unionX = Math.round((parentCenterX + otherPos.x + CARD_W / 2) / 2);
        unionY = parentBottom;
        break;
      }

      // Kinship label hangs under the descent start; union labels stack
      // (father/mother under the drop, one slot per parent index) and are
      // identical across a couple's children, so overlapping draws read as
      // a single label.
      const labelX = unionX ?? parentCenterX;
      const labelY =
        (unionY ?? parentBottom) + 14 + (unionX !== null ? i * 15 : 0);
      const barY = unionY !== null ? Math.round((unionY + childPos.y) / 2) : null;

      edges.push({
        id: `pc-${edge.parentId}-${childId}`,
        type: 'parent',
        source: String(edge.parentId),
        target: String(childId),
        sourceHandle: 'b',
        targetHandle: 't',
        data: { label: parentTag(parent, edge.role), labelX, labelY, unionX, unionY, barY },
      });
    }
  }

  // Partner bars: source = the left partner's right handle, target = the
  // right partner's left handle (both sit on one rank, so the bar is
  // horizontal like the prototype's).
  for (const partnership of partnerships.values()) {
    const posA = posOf(partnership.personAId);
    const posB = posOf(partnership.personBId);
    if (!posA || !posB) continue;
    const aIsLeft = posA.x <= posB.x;
    const sourceId = aIsLeft ? partnership.personAId : partnership.personBId;
    const targetId = aIsLeft ? partnership.personBId : partnership.personAId;
    edges.push({
      id: `pp-${partnership.id}`,
      type: 'partner',
      source: String(sourceId),
      target: String(targetId),
      sourceHandle: 'r',
      targetHandle: 'l',
      data: { label: partnerTag(partnership.kind) },
    });
  }

  return { nodes, edges };
}
