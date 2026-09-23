/**
 * Custom reactflow edges for the tree — the prototype's `.links` layer
 * (index.html): warm `#C0AE93` strokes, orthogonal descent with a sibling
 * bar, the partner bar with its centre ring, and the kinship labels from
 * #14 (`parentTag` on the drop, `partnerTag` under the ring).
 *
 * Plain SVG only — no reactflow runtime imports, so these stay trivially
 * renderable in node-environment tests.
 */
import type { EdgeProps } from 'reactflow';
import type { ParentEdgeData, PartnerEdgeData } from './layout';

/** Connector stroke on the warm canvas (prototype `.links path`). */
const LINE = '#C0AE93';

/**
 * Edge label: text on a canvas-coloured pill so the line runs behind it
 * (the prototype draws no edge labels; #13/#14 put kinship on the lines).
 */
function EdgeLabel({ x, y, text }: { x: number; y: number; text: string }) {
  // ~6.4px per char at 12px semibold, +14px padding — good enough for the
  // short kinship words; the pill is centred so slight slack reads fine.
  const width = Math.ceil(text.length * 6.4) + 14;
  return (
    <g transform={`translate(${x} ${y})`} pointerEvents="none">
      <rect x={-width / 2} y={-9} width={width} height={18} rx={9} fill="var(--canvas, #F1E9DC)" />
      <text
        textAnchor="middle"
        dominantBaseline="central"
        fill="var(--ink-soft, #4B4139)"
        fontSize={12}
        fontWeight={600}
      >
        {text}
      </text>
    </g>
  );
}

/**
 * Parent → child: drop from the (union) point, horizontal sibling bar,
 * down to the child — the prototype's `M400 136 V200 H250 V258`.
 */
export function ParentEdge({ sourceX, sourceY, targetX, targetY, data }: EdgeProps<ParentEdgeData>) {
  const startX = data?.unionX ?? sourceX;
  const startY = data?.unionY ?? sourceY;
  const barY = data?.barY ?? Math.round((startY + targetY) / 2);

  const path =
    targetY > startY + 8
      ? `M ${startX} ${startY} V ${barY} H ${targetX} V ${targetY}`
      : `M ${sourceX} ${sourceY} L ${targetX} ${targetY}`;

  return (
    <g>
      <path d={path} fill="none" stroke={LINE} strokeWidth={2} strokeLinecap="round" />
      {data?.label ? (
        <EdgeLabel x={data.labelX} y={data.labelY} text={data.label} />
      ) : null}
    </g>
  );
}

/** Partners: horizontal bar between the cards with the centre ring (`Walter —○— Ruth`). */
export function PartnerEdge({
  sourceX,
  sourceY,
  targetX,
  targetY,
  data,
}: EdgeProps<PartnerEdgeData>) {
  const midX = Math.round((sourceX + targetX) / 2);
  const midY = Math.round((sourceY + targetY) / 2);

  return (
    <g>
      <path
        d={`M ${sourceX} ${sourceY} L ${targetX} ${targetY}`}
        fill="none"
        stroke={LINE}
        strokeWidth={2}
        strokeLinecap="round"
      />
      <circle
        cx={midX}
        cy={midY}
        r={4.5}
        fill="var(--canvas, #F1E9DC)"
        stroke={LINE}
        strokeWidth={2}
      />
      {data?.label ? <EdgeLabel x={midX} y={midY + 17} text={data.label} /> : null}
    </g>
  );
}

/** Module-level so ReactFlow never sees a fresh `edgeTypes` identity. */
export const EDGE_TYPES = { parent: ParentEdge, partner: PartnerEdge };
