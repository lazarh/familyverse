'use client';

/**
 * The tree screen (#16, structure from #13, visual truth prototype/index.html):
 *
 *  - page head: family name + people/generations sub-line; actions =
 *    **Add member** (the one primary button on this screen), the export
 *    menu (PNG image / PDF document, #9), and the wired zoom bar;
 *  - canvas: dot-grid warm canvas hosting TreeCanvas + the prototype legend;
 *  - states: loading / error+retry / empty family (EmptyState owns the
 *    primary button while the head's is hidden — still one primary per screen);
 *  - drawer mount: `<MemberDrawer mode="add">`, saved → `reload`;
 *  - `?focus=<personId>` centres + highlights that card (the profile's
 *    "Center on … →" link), read via useSearchParams inside Suspense as
 *    Next 15 requires for prerendering.
 */
import { Suspense, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import ExportButton from '@/app/components/ExportButton';
import MemberDrawer from '@/app/components/drawer/MemberDrawer';
import { useActiveFamily } from '@/app/components/nav/FamilySwitcher';
import { Button, EmptyState } from '@/app/components/ui';
import TreeCanvas from '@/app/components/tree/TreeCanvas';
import type { TreeCanvasHandle } from '@/app/components/tree/TreeCanvas';
import { useFamilyTree } from '@/app/components/tree/useFamilyTree';
import { generationOf } from '@/lib/derive';

/** Canvas height (prototype `.canvas` min-height 640). */
const CANVAS_CLASS = 'h-[640px] rounded-[16px] border border-[var(--line)]';

export default function TreePage() {
  return (
    <Suspense fallback={<div className="mx-auto max-w-[1440px] px-6 pt-7 pb-10" />}>
      <TreeScreen />
    </Suspense>
  );
}

function TreeScreen() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const focusParam = searchParams.get('focus');
  const focusId =
    focusParam !== null && /^[1-9]\d*$/.test(focusParam) ? Number(focusParam) : null;

  const {
    families,
    loading: familiesLoading,
    error: familiesError,
    activeId,
    reloadFamilies,
  } = useActiveFamily();
  const family = families?.find((candidate) => candidate.id === activeId) ?? null;
  const { feed, error, reload } = useFamilyTree(activeId);

  const [drawerOpen, setDrawerOpen] = useState(false);
  const canvasRef = useRef<TreeCanvasHandle>(null);
  const [zoom, setZoom] = useState(1);

  const openAdd = useCallback(() => setDrawerOpen(true), []);
  const closeDrawer = useCallback(() => setDrawerOpen(false), []);

  // Route table (#13): no families → /create-family. (Session guard lives in
  // the (app) layout's bootstrap, not on this screen.)
  useEffect(() => {
    if (families !== null && families.length === 0) {
      router.replace('/create-family');
    }
  }, [families, router]);

  const generationCount = useMemo(() => {
    if (!feed) return 0;
    let max = 0;
    for (const person of feed.people) {
      max = Math.max(max, generationOf(person.id, feed));
    }
    return max;
  }, [feed]);

  const memberCount = feed?.people.length ?? 0;
  const isEmpty = feed !== null && memberCount === 0;

  const sub = (() => {
    if (familiesError !== null) return familiesError;
    if (families === null || familiesLoading) return 'Loading family…';
    if (error !== null) return 'This family could not be loaded.';
    if (feed === null) return 'Loading people…';
    if (memberCount === 0) return 'No people yet';
    const generations = generationCount > 0 ? ` · ${generationCount} generations` : '';
    return `${memberCount} people${generations} · partners shown as linked pairs`;
  })();

  const canvasShell = `${CANVAS_CLASS} relative overflow-hidden bg-[var(--canvas)] dot-grid`;

  const content = (() => {
    if (feed) {
      if (memberCount === 0) {
        return (
          <EmptyState
            title="Start your family"
            body="Every tree starts with one person — add the first member and grow from there. Parents decide where the cards fall."
          >
            <Button onClick={openAdd}>
              <svg
                aria-hidden="true"
                width="15"
                height="15"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.4"
                strokeLinecap="round"
              >
                <path d="M12 5v14M5 12h14" />
              </svg>
              Add member
            </Button>
          </EmptyState>
        );
      }
      return (
        <div className={`${canvasShell} tree-export-target`}>
          <TreeCanvas
            ref={canvasRef}
            feed={feed}
            focusId={focusId}
            onZoomChange={setZoom}
          />
          <CanvasLegend />
        </div>
      );
    }
    if (error !== null) {
      return (
        <div className={`${canvasShell} flex flex-col items-center justify-center gap-4 bg-[var(--canvas)]`}>
          <p className="text-[15px] text-[var(--ink)]">{error}</p>
          <Button variant="secondary" onClick={reload}>
            Try again
          </Button>
        </div>
      );
    }
    if (familiesError !== null) {
      return (
        <div className={`${canvasShell} flex flex-col items-center justify-center gap-4 bg-[var(--canvas)]`}>
          <p className="text-[15px] text-[var(--ink)]">{familiesError}</p>
          <Button variant="secondary" onClick={reloadFamilies}>
            Try again
          </Button>
        </div>
      );
    }
    return (
      <div
        className={`${canvasShell} flex items-center justify-center text-[13.5px] text-[var(--muted)]`}
        role="status"
      >
        {families === null ? 'Loading family…' : 'Loading people…'}
      </div>
    );
  })();

  return (
    <div className="mx-auto max-w-[1440px] px-6 pt-7 pb-10">
      <div className="mb-5 flex flex-wrap items-end justify-between gap-5">
        <div className="min-w-0">
          <h1 className="truncate text-[26px]">
            {family?.name ?? (familiesError !== null ? 'Family Verse' : '…')}
          </h1>
          <p className="mt-1 text-[13.5px] text-[var(--muted)]">{sub}</p>
        </div>
        <div className="flex items-center gap-[10px]">
          {/* The screen's ONE primary button — hidden while the empty state
              shows the same action, so there is never a second primary. */}
          {!isEmpty && (
            <Button onClick={openAdd}>
              <svg
                aria-hidden="true"
                width="15"
                height="15"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.4"
                strokeLinecap="round"
              >
                <path d="M12 5v14M5 12h14" />
              </svg>
              Add member
            </Button>
          )}
          {/* Export menu (#9): the trigger is styled byte-for-byte like a
              primary Button so it stays aligned with Add member (the rule
              from #16's review); formats + capture live in lib/export. */}
          <ExportButton familyName={family?.name ?? 'Family'} />
          <ZoomBar
            zoom={zoom}
            onZoomOut={() => canvasRef.current?.zoomOut()}
            onZoomIn={() => canvasRef.current?.zoomIn()}
            onFit={() => canvasRef.current?.fitView()}
          />
        </div>
      </div>

      {content}

      {drawerOpen && activeId !== null && (
        <MemberDrawer
          familyId={activeId}
          mode="add"
          onClose={closeDrawer}
          onSaved={reload}
        />
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ *
 * Page-head zoom bar (prototype `.zoombar`), wired to the canvas.
 * ------------------------------------------------------------------ */

interface ZoomBarProps {
  zoom: number;
  onZoomOut: () => void;
  onZoomIn: () => void;
  onFit: () => void;
}

function ZoomBar({ zoom, onZoomOut, onZoomIn, onFit }: ZoomBarProps) {
  return (
    <div className="flex items-center gap-[2px] rounded-full border border-[var(--line)] bg-[rgba(255,254,251,0.94)] px-2 py-[5px] text-[12px] font-semibold text-[var(--ink-soft)] shadow-[var(--shadow)]">
      <button
        type="button"
        aria-label="Zoom out"
        onClick={onZoomOut}
        className="h-[26px] w-[26px] cursor-pointer rounded-full border-0 bg-transparent text-[15px] leading-none text-inherit hover:bg-[var(--canvas)]"
      >
        −
      </button>
      <span aria-live="polite" className="min-w-[44px] text-center tabular-nums">
        {Math.round(zoom * 100)}%
      </span>
      <button
        type="button"
        aria-label="Zoom in"
        onClick={onZoomIn}
        className="h-[26px] w-[26px] cursor-pointer rounded-full border-0 bg-transparent text-[15px] leading-none text-inherit hover:bg-[var(--canvas)]"
      >
        +
      </button>
      <button
        type="button"
        onClick={onFit}
        className="h-[26px] cursor-pointer rounded-none border-0 border-x border-[var(--line)] bg-transparent px-[10px] text-[12px] leading-none text-inherit hover:bg-[var(--canvas)]"
      >
        Fit to screen
      </button>
    </div>
  );
}

/* ------------------------------------------------------------------ *
 * Legend (prototype `.legend`, bottom-left of the canvas).
 * ------------------------------------------------------------------ */

function CanvasLegend() {
  return (
    <div className="pointer-events-none absolute bottom-[14px] left-[14px] z-10 flex items-center gap-4 rounded-full border border-[var(--line)] bg-[rgba(255,254,251,0.94)] px-[15px] py-[7px] text-[12px] text-[var(--ink-soft)] shadow-[var(--shadow)]">
      <span className="flex items-center gap-[7px]">
        <svg width="26" height="8" aria-hidden="true" fill="none">
          <path d="M1 4 H25" stroke="#C0AE93" strokeWidth="2" strokeLinecap="round" />
        </svg>
        parent &amp; child
      </span>
      <span className="flex items-center gap-[7px]">
        <svg width="26" height="10" aria-hidden="true" fill="none">
          <path d="M1 5 H10" stroke="#C0AE93" strokeWidth="2" />
          <circle cx="13" cy="5" r="3.5" fill="#F1E9DC" stroke="#C0AE93" strokeWidth="2" />
          <path d="M16 5 H25" stroke="#C0AE93" strokeWidth="2" />
        </svg>
        partners
      </span>
      <span>click a card to open their profile</span>
    </div>
  );
}
