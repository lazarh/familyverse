'use client';

/**
 * TreeCanvas — the reactflow wrapper for the tree screen (#16): dagre-driven
 * `person` nodes, `parent`/`partner` edges, dot-grid canvas chrome, zoom
 * wiring and `?focus=<id>` centring. The engine itself is the old graph's
 * (reactflow + dagre), only the node/edge vocabulary is new (#13).
 *
 * The page head owns the zoom bar, so this component is controlled from
 * outside through the imperative `TreeCanvasHandle` (zoomIn/zoomOut/fitView)
 * and reports the live zoom back through `onZoomChange`.
 */
import { forwardRef, useCallback, useEffect, useImperativeHandle, useMemo, useRef } from 'react';
import ReactFlow, { ReactFlowProvider, useReactFlow, useStore } from 'reactflow';
import type { Edge, OnMove } from 'reactflow';
import type { PeopleFeed } from '../../../types/feed';
import { buildGraph, CARD_H, CARD_W } from './layout';
import type { PersonCardData } from './layout';
import PersonCard from './PersonCard';
import { EDGE_TYPES } from './TreeEdges';

/** One identity so ReactFlow never re-registers node types. */
const NODE_TYPES = { person: PersonCard };

const FIT_OPTIONS = { padding: 0.15, duration: 0 } as const;

export interface TreeCanvasHandle {
  zoomIn: () => void;
  zoomOut: () => void;
  fitView: () => void;
}

export interface TreeCanvasProps {
  feed: PeopleFeed;
  /** `?focus=<personId>` — centre + highlight that card after layout. */
  focusId?: number | null;
  /** Live canvas zoom (viewport scale) for the head's `%` readout. */
  onZoomChange?: (zoom: number) => void;
}

const TreeCanvas = forwardRef<TreeCanvasHandle, TreeCanvasProps>(function TreeCanvas(
  { feed, focusId = null, onZoomChange },
  ref,
) {
  return (
    <ReactFlowProvider>
      <CanvasInner ref={ref} feed={feed} focusId={focusId} onZoomChange={onZoomChange} />
    </ReactFlowProvider>
  );
});

const CanvasInner = forwardRef<TreeCanvasHandle, TreeCanvasProps>(function CanvasInner(
  { feed, focusId, onZoomChange },
  ref,
) {
  const rf = useReactFlow();
  // True once the viewport (d3 zoom) is live with real dimensions AND every
  // node has been measured — fitView against unmeasured nodes is a no-op,
  // and `handled` must not mark the initial fit done before it can succeed.
  // NB: `viewportInitialized` lives on the viewport *helper*, not on the
  // zustand store, so the old gate never opened: neither the initial fit nor
  // `?focus=` centring ever ran. The small Kessler demo renders fine at 100%,
  // which masked it; #21's 28-person tree exposed it. (Store internals are
  // cast down: the published `ReactFlowState` type omits them.)
  type StoreExtras = {
    d3Zoom?: unknown;
    d3Selection?: unknown;
    width?: number;
    height?: number;
    nodeInternals?: Map<string, { hidden?: boolean; width?: number; height?: number }>;
  };
  const ready = useStore((state) => {
    const s = state as typeof state & StoreExtras;
    if (!s.d3Zoom || !s.d3Selection || !s.width || !s.height) return false;
    if (!s.nodeInternals || s.nodeInternals.size === 0) return false;
    for (const node of s.nodeInternals.values()) {
      if (node.hidden) continue;
      if (!node.width || !node.height) return false;
    }
    return true;
  });

  const { nodes, edges } = useMemo(
    () => buildGraph(feed, focusId ?? null),
    [feed, focusId],
  );

  useImperativeHandle(
    ref,
    () => ({
      zoomIn: () => rf.zoomIn(),
      zoomOut: () => rf.zoomOut(),
      fitView: () => rf.fitView({ ...FIT_OPTIONS }),
    }),
    [rf],
  );

  // Initial fit (no focus) or centre-on-focus; `handled` makes it once per
  // focus value so later feed reloads don't yank a panned viewport back.
  const handled = useRef<number | null | undefined>(undefined);
  useEffect(() => {
    if (!ready) return;
    const wanted = focusId ?? null;
    if (handled.current === wanted) return;
    handled.current = wanted;

    if (wanted === null) {
      rf.fitView({ ...FIT_OPTIONS });
      return;
    }
    const node = nodes.find((candidate) => candidate.id === String(wanted));
    if (node) {
      rf.setCenter(node.position.x + CARD_W / 2, node.position.y + CARD_H / 2, {
        zoom: Math.min(2, Math.max(1, rf.getZoom())),
        duration: 0,
      });
    } else {
      rf.fitView({ ...FIT_OPTIONS });
    }
  }, [ready, focusId, nodes, rf]);

  const handleMove = useCallback<OnMove>(
    (_event, viewport) => {
      onZoomChange?.(viewport.zoom);
    },
    [onZoomChange],
  );

  return (
    <ReactFlow
      nodes={nodes}
      edges={edges as Edge[]}
      nodeTypes={NODE_TYPES}
      edgeTypes={EDGE_TYPES}
      className="dot-grid"
      aria-label="Family tree"
      onMove={handleMove}
      minZoom={0.25}
      maxZoom={2}
      nodesDraggable={false}
      nodesConnectable={false}
      elementsSelectable={false}
      nodesFocusable={false}
      proOptions={{ hideAttribution: true }}
    />
  );
});

export default TreeCanvas;

/** Re-exported for tests and callers that only need the node data shape. */
export type { PersonCardData };
