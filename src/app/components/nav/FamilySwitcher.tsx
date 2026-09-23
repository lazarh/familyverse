'use client';

/**
 * FamilySwitcher — the nav's family pill + menu (prototype index.html
 * `.family-pill`): the user's families with the active one ticked, then the
 * family-scoped actions "Create family" and "Share & manage family" (#13:
 * *page actions on the page, family actions in the family menu*).
 *
 * This file also owns the shared family store behind `useActiveFamily()`:
 * GET /api/families once, active family id seeded from the first family and
 * persisted to localStorage `familyverse.familyId` so reloads keep context.
 * The tree page imports the same hook — #13 wants the selection shared
 * tree⇄profile — which is why the store lives here rather than inside the
 * component (the file list for this ticket allows extra helpers under
 * tree/ only; the store is switcher-shaped and re-exported for everyone).
 */
import { useCallback, useEffect, useState, useSyncExternalStore } from 'react';
import { apiFetch } from '@/lib/api';
import { Menu, MenuGroup, MenuItem, MenuSeparator } from '@/app/components/ui';
import ShareFamilyDialog from '@/app/components/share/ShareFamilyDialog';

export interface Family {
  id: number;
  name: string;
}

/** localStorage key for the active family id (#13, exact spelling). */
export const ACTIVE_FAMILY_STORAGE_KEY = 'familyverse.familyId';

interface FamilyStoreState {
  families: Family[] | null;
  loading: boolean;
  error: string | null;
  activeId: number | null;
}

const INITIAL_STATE: FamilyStoreState = {
  families: null,
  loading: false,
  error: null,
  activeId: null,
};

let store: FamilyStoreState = INITIAL_STATE;
let inFlight: Promise<void> | null = null;
const listeners = new Set<() => void>();

function emit(): void {
  for (const listener of listeners) listener();
}

function update(patch: Partial<FamilyStoreState>): void {
  store = { ...store, ...patch };
  emit();
}

function readStoredId(): number | null {
  try {
    const raw = window.localStorage.getItem(ACTIVE_FAMILY_STORAGE_KEY);
    if (raw === null) return null;
    const id = Number(raw);
    return Number.isInteger(id) && id > 0 ? id : null;
  } catch {
    return null; // storage unavailable (private mode) — fall back to first family
  }
}

function persist(id: number): void {
  try {
    window.localStorage.setItem(ACTIVE_FAMILY_STORAGE_KEY, String(id));
  } catch {
    // Non-fatal: the selection still holds for this session.
  }
}

/** Stored id when it is still one of the user's families, else the first. */
function pickActive(families: Family[]): number | null {
  if (families.length === 0) return null;
  const stored = readStoredId();
  if (stored !== null && families.some((family) => family.id === stored)) return stored;
  return families[0].id;
}

function loadFamilies(): Promise<void> {
  if (inFlight) return inFlight;
  update({ loading: true, error: null });
  inFlight = apiFetch<Family[]>('/api/families')
    .then((families) => {
      const current = store.activeId;
      const activeId =
        current !== null && families.some((family) => family.id === current)
          ? current
          : pickActive(families);
      if (activeId !== null) persist(activeId);
      update({ families, activeId, loading: false });
    })
    .catch((err: unknown) => {
      update({
        loading: false,
        error: err instanceof Error ? err.message : 'Could not load families.',
      });
    })
    .finally(() => {
      inFlight = null;
    });
  return inFlight;
}

function setActiveId(id: number): void {
  if (store.activeId === id) return;
  persist(id);
  update({ activeId: id });
}

function subscribe(listener: () => void): () => void {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

const getSnapshot = () => store;
// Server render and the hydration pass both see the untouched initial state,
// so the pill can't hydrate-mismatch before the fetch lands.
const getServerSnapshot = () => INITIAL_STATE;

export interface ActiveFamily extends FamilyStoreState {
  /** Switch the active family (persists + refetches consumers' feeds). */
  setActiveId: (id: number) => void;
  /** Refetch the family list after a failure. */
  reloadFamilies: () => void;
}

/** Shared family list + active id: fetched once, localStorage-backed. */
export function useActiveFamily(): ActiveFamily {
  const snapshot = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  useEffect(() => {
    void loadFamilies();
  }, []);

  const switchTo = useCallback((id: number) => setActiveId(id), []);
  const reloadFamilies = useCallback(() => {
    inFlight = null;
    void loadFamilies();
  }, []);

  return { ...snapshot, setActiveId: switchTo, reloadFamilies };
}

/**
 * The pill + menu. Renders `ShareFamilyDialog` itself when the menu item is
 * picked (its `familyId, open, onClose` signature is frozen).
 */
export default function FamilySwitcher() {
  const { families, loading, error, activeId, setActiveId, reloadFamilies } =
    useActiveFamily();
  const [shareOpen, setShareOpen] = useState(false);

  const active = families?.find((family) => family.id === activeId) ?? null;
  const pillLabel = active
    ? active.name
    : error
      ? 'Family'
      : families === null || loading
        ? 'Loading…'
        : 'No family';

  const panel = (
    <>
      <MenuGroup label="Families">
        {families === null && error === null && (
          <MenuItem disabled>Loading families…</MenuItem>
        )}
        {error !== null && (
          <MenuItem hint="Retry" onClick={reloadFamilies}>
            Couldn’t load families
          </MenuItem>
        )}
        {families !== null && families.length === 0 && (
          <MenuItem disabled>No families yet</MenuItem>
        )}
        {families?.map((family) => (
          <MenuItem
            key={family.id}
            active={family.id === activeId}
            onClick={() => setActiveId(family.id)}
          >
            {family.name}
          </MenuItem>
        ))}
      </MenuGroup>
      <MenuSeparator />
      <MenuItem href="/create-family">Create family</MenuItem>
      <MenuItem onClick={() => setShareOpen(true)}>Share &amp; manage family</MenuItem>
    </>
  );

  return (
    <>
      <Menu label="Family switcher" panel={panel}>
        <span className="inline-flex h-9 items-center gap-[9px] rounded-full border border-[var(--line-strong)] bg-[var(--card)] px-3 text-[14px] font-semibold text-[var(--ink)] hover:bg-[#F7F1E7]">
          <span aria-hidden="true" className="h-[9px] w-[9px] rounded-full bg-[var(--clay)]" />
          <span className="max-w-[240px] truncate">{pillLabel}</span>
          <svg
            aria-hidden="true"
            width="12"
            height="12"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.4"
            strokeLinecap="round"
            className="text-[var(--muted)] transition-transform duration-150 group-data-[open=true]:rotate-180"
          >
            <path d="m6 9 6 6 6-6" />
          </svg>
        </span>
      </Menu>
      {activeId !== null && (
        <ShareFamilyDialog
          familyId={activeId}
          open={shareOpen}
          onClose={() => setShareOpen(false)}
        />
      )}
    </>
  );
}
