'use client';

/**
 * PersonPicker — the search-select used for parent/partner rows (form.html
 * `.pick`, #14 "PersonPicker + role select").
 *
 * Three states:
 *  - empty     → dashed "+ …" slot (prototype `.pick.empty`)
 *  - picking   → text input + filtered result list (Monogram + name +
 *                `relationshipMeta` dates); Enter-friendly via buttons
 *  - selected  → the prototype's pick box: monogram + name + meta + *Change*
 *
 * Exclusions (self, people already picked in sibling rows) are the caller's
 * job via `exclude`; `filterPeople` is exported pure for tests.
 *
 * Keyboard: Tab reaches the slot/Change button, results are real `<button>`s
 * (Tab/Enter activate), Escape cancels search WITHOUT closing the drawer —
 * it's consumed by a capture-phase listener ahead of the drawer's own
 * Escape handler.
 */
import { useEffect, useState } from 'react';
import type { PersonDto } from '../../../types/feed';
import { Input, Monogram } from '../ui';
import { relationshipMeta } from '../../../lib/vitalDates';

export interface PersonPickerProps {
  /** Candidate people — normally `feed.people`. */
  people: PersonDto[];
  /** Currently picked person id, or null (dashed empty slot). */
  value: number | null;
  /** Called with the newly picked id (never null — rows are removed, not cleared). */
  onChange: (id: number) => void;
  /** Ids that must not appear in results (self + people picked in other rows). */
  exclude?: Iterable<number>;
  /** Dashed-slot copy, e.g. `+ Link an existing person as partner`. */
  emptyLabel: string;
  /** Accessible name for the search input (usually the row label). */
  label: string;
}

/** Dashed empty-slot skin (prototype `.pick.empty`) — shared with the
 *  "Add parent / Add partner" buttons in MemberForm. */
export const EMPTY_SLOT_CLASS = [
  'flex w-full cursor-pointer items-center justify-center rounded-[8px] border border-dashed',
  'border-[var(--line-strong)] bg-[#FAF5EC] px-3 py-[15px]',
  'text-[14px] font-650 text-[var(--muted)]',
  'hover:border-[var(--clay)] hover:text-[var(--clay)]',
].join(' ');

/**
 * Pure filter: drop excluded ids, match `query` case-insensitively against
 * the full name (empty query matches everyone), sort by name.
 */
export function filterPeople(
  people: PersonDto[],
  excluded: Iterable<number>,
  query: string,
): PersonDto[] {
  const excludedSet = excluded instanceof Set ? excluded : new Set(excluded);
  const q = query.trim().toLowerCase();
  return people
    .filter(
      (person) =>
        !excludedSet.has(person.id) &&
        (q === '' || person.fullName.toLowerCase().includes(q)),
    )
    .sort((a, b) => a.fullName.localeCompare(b.fullName));
}

/** Muted dates/place line under a name (`b. 1965 · Bristol, England`), or null. */
function metaOf(person: PersonDto): string | null {
  return relationshipMeta(person.birthDate, person.deathDate, person.birthPlace);
}

export function PersonPicker({
  people,
  value,
  onChange,
  exclude = [],
  emptyLabel,
  label,
}: PersonPickerProps) {
  const [searching, setSearching] = useState(false);
  const [query, setQuery] = useState('');

  const selected = value === null ? null : (people.find((p) => p.id === value) ?? null);

  // Escape cancels the search — captured at window so the drawer (which
  // listens on the bubble phase) never sees it and closes underneath us.
  useEffect(() => {
    if (!searching) return;
    function onKeyDown(event: KeyboardEvent) {
      if (event.key !== 'Escape') return;
      event.preventDefault();
      event.stopPropagation();
      setSearching(false);
    }
    window.addEventListener('keydown', onKeyDown, true);
    return () => window.removeEventListener('keydown', onKeyDown, true);
  }, [searching]);

  function pick(id: number) {
    onChange(id);
    setQuery('');
    setSearching(false);
  }

  function startSearch() {
    setQuery('');
    setSearching(true);
  }

  if (searching) {
    const results = filterPeople(people, exclude, query);
    return (
      <div className="relative">
        <Input
          autoFocus
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          onKeyDown={(event) => {
            // Enter picks the first result — never submits the drawer's form.
            if (event.key !== 'Enter') return;
            event.preventDefault();
            const first = filterPeople(people, exclude, query)[0];
            if (first) pick(first.id);
          }}
          placeholder="Search people by name…"
          aria-label={label}
          autoComplete="off"
        />
        <ul className="absolute top-[46px] right-0 left-0 z-20 max-h-[224px] overflow-y-auto rounded-[8px] border border-[var(--line)] bg-[var(--card)] p-1 shadow-[var(--shadow-lift)]">
          {results.map((person) => {
            const meta = metaOf(person);
            return (
              <li key={person.id}>
                <button
                  type="button"
                  onClick={() => pick(person.id)}
                  className="flex w-full cursor-pointer items-center gap-3 rounded-[6px] px-2 py-2 text-left hover:bg-[#F4EDE3]"
                >
                  <Monogram name={person.fullName} personId={person.id} size={32} decorative />
                  <span className="min-w-0">
                    <span className="block truncate text-[14px] font-650 text-[var(--ink)]">
                      {person.fullName}
                    </span>
                    {meta !== null && (
                      <span className="block truncate text-[12px] text-[var(--muted)]">
                        {meta}
                      </span>
                    )}
                  </span>
                </button>
              </li>
            );
          })}
          {results.length === 0 && (
            <li className="px-2 py-2 text-[13.5px] text-[var(--muted)]">
              No matching people in this family.
            </li>
          )}
        </ul>
      </div>
    );
  }

  if (selected === null) {
    return (
      <button type="button" onClick={startSearch} className={EMPTY_SLOT_CLASS}>
        {emptyLabel}
      </button>
    );
  }

  const meta = metaOf(selected);
  return (
    <div className="flex items-center gap-3 rounded-[8px] border border-[var(--line-strong)] bg-[var(--card)] px-3 py-[10px]">
      <Monogram name={selected.fullName} personId={selected.id} size={34} decorative />
      <span className="min-w-0 flex-1">
        <span className="block truncate text-[14px] font-650 text-[var(--ink)]">
          {selected.fullName}
        </span>
        {meta !== null && (
          <span className="block truncate text-[12px] text-[var(--muted)]">{meta}</span>
        )}
      </span>
      <button
        type="button"
        onClick={startSearch}
        className="shrink-0 cursor-pointer rounded-[6px] border-0 bg-transparent px-[6px] py-1 text-[12px] font-650 text-[var(--clay)] hover:bg-[#F6E9E2]"
      >
        Change
      </button>
    </div>
  );
}
