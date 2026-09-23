'use client';

/**
 * MemberDrawer — the 486px right-side add/edit drawer (form.html, #14),
 * mounted by the tree page AND the profile page.
 *
 * The interface is FROZEN (both screens mount it in parallel). This shell:
 *  - fetches what the form needs: the family feed (person pickers) and, in
 *    edit mode, the person via GET /api/people/[id]; parent/partner rows are
 *    prefilled from the feed's `parentChild`/`partnerships` slices (#15:
 *    the bootstrap payload carries no edge slices of its own)
 *  - best-effort fetches the family name for the subtitle copy
 *  - overlays scrim + panel, locks background scroll, focuses itself
 *  - Escape/scrim/✕ close freely (draft decision — no dirty guard); Escape
 *    only counts when the event lands inside the drawer, so the nested
 *    "Delete person?" Dialog keeps its own Escape
 *  - renders MemberForm for the body + footer, and calls onSaved after a
 *    successful save AND after remove/delete (the form forwards it)
 */
import { useEffect, useRef, useState } from 'react';
import { apiFetch, fetchPeopleFeed, fetchPerson } from '../../../lib/api';
import type { PeopleFeed, PersonDto } from '../../../types/feed';
import { MemberForm } from './MemberForm';

/**
 * FROZEN signature — the tree screen and the profile screen both mount this.
 */
export interface MemberDrawerProps {
  familyId: number;
  /** `add` opens an empty form; `edit` prefills from `personId`. */
  mode: 'add' | 'edit';
  /** Required in edit mode. */
  personId?: number;
  onClose: () => void;
  /** Called after a successful save/delete so mount points can refetch. */
  onSaved?: () => void;
}

const ICON_BTN_CLASS = [
  'flex h-8 w-8 flex-none cursor-pointer items-center justify-center rounded-[8px]',
  'border border-[var(--line)] bg-[var(--card)] text-[16px] leading-none text-[var(--ink-soft)]',
  'hover:bg-[#F4EDE3]',
].join(' ');

export default function MemberDrawer({
  familyId,
  mode,
  personId,
  onClose,
  onSaved,
}: MemberDrawerProps) {
  const [feed, setFeed] = useState<PeopleFeed | null>(null);
  const [person, setPerson] = useState<PersonDto | null>(null);
  const [familyName, setFamilyName] = useState<string | null>(null);
  const [loadError, setLoadError] = useState<string | null>(null);

  const drawerRef = useRef<HTMLElement>(null);
  const onCloseRef = useRef(onClose);
  useEffect(() => {
    onCloseRef.current = onClose;
  }, [onClose]);

  // Data bootstrap: feed always, person in edit mode, family name optional.
  useEffect(() => {
    let cancelled = false;
    setFeed(null);
    setPerson(null);
    setLoadError(null);

    fetchPeopleFeed(familyId)
      .then((result) => {
        if (!cancelled) setFeed(result);
      })
      .catch((error: unknown) => {
        if (cancelled) return;
        setLoadError(error instanceof Error ? error.message : 'Could not load this family.');
      });

    if (mode === 'edit' && personId !== undefined) {
      fetchPerson(personId)
        .then((result) => {
          if (!cancelled) setPerson(result.person);
        })
        .catch((error: unknown) => {
          if (cancelled) return;
          setLoadError(error instanceof Error ? error.message : 'Could not load this person.');
        });
    }

    // Subtitle nicety only — failures are silently tolerated.
    apiFetch<{ id: number; name: string | null }>(`/api/families/${familyId}`)
      .then((family) => {
        if (!cancelled) setFamilyName(family.name);
      })
      .catch(() => undefined);

    return () => {
      cancelled = true;
    };
  }, [familyId, mode, personId]);

  // Focus the panel, lock background scroll, restore both on close.
  useEffect(() => {
    drawerRef.current?.focus();
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, []);

  // Escape closes — but only when it lands INSIDE the drawer: the nested
  // "Delete person?" Dialog sits outside it in the DOM and owns its Escape.
  // (PersonPicker's search consumes its Escape earlier, in the capture phase.)
  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key !== 'Escape' || event.defaultPrevented) return;
      const root = drawerRef.current;
      if (root && event.target instanceof Node && !root.contains(event.target)) return;
      onCloseRef.current();
    }
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  const title =
    mode === 'edit'
      ? `Edit ${person?.fullName ?? 'family member'}`
      : 'Add family member';
  const subtitle =
    mode === 'edit'
      ? (familyName ?? 'Change the details, relationships or photo, then save.')
      : familyName
        ? `${familyName} · you can fill in the rest later`
        : 'You can fill in the rest later.';
  const ariaLabel = mode === 'edit' ? 'Edit family member' : 'Add family member';

  const ready = feed !== null && (mode !== 'edit' || person !== null);

  return (
    <>
      {/* warm scrim (form.html .scrim) — click it to close */}
      <div
        aria-hidden="true"
        className="fixed inset-0 z-[80] bg-[rgba(36,28,21,0.42)]"
        onClick={onClose}
      />
      <section
        ref={drawerRef}
        role="dialog"
        aria-modal="true"
        aria-label={ariaLabel}
        tabIndex={-1}
        className={[
          // form.html .drawer: fixed right panel, 486px, card fill, left hairline
          'fixed top-0 right-0 z-[90] box-border flex h-screen w-[486px] max-w-[94vw] flex-col',
          'border-l border-[var(--line)] bg-[var(--card)] shadow-[-28px_0_56px_-28px_rgba(36,28,21,0.4)]',
          'focus:outline-none',
        ].join(' ')}
      >
        <div className="flex items-start justify-between gap-4 border-b border-[var(--line)] px-[26px] pt-5 pb-4">
          <div className="min-w-0">
            <h2 className="text-[20px]">{title}</h2>
            <p className="mt-[3px] text-[13.5px] text-[var(--muted)]">{subtitle}</p>
          </div>
          <button type="button" aria-label="Close" onClick={onClose} className={ICON_BTN_CLASS}>
            ✕
          </button>
        </div>

        {loadError !== null ? (
          <div className="min-h-0 flex-1 overflow-y-auto px-[26px] pt-[22px] pb-2">
            <p
              role="alert"
              className="rounded-[8px] border border-[#E4C4BE] bg-[#F8ECEA] px-3 py-2 text-[13.5px] text-[var(--brick)]"
            >
              {loadError}
            </p>
          </div>
        ) : !ready ? (
          <div className="min-h-0 flex-1 overflow-y-auto px-[26px] pt-[22px] pb-2">
            <p className="text-[13.5px] text-[var(--muted)]">Loading…</p>
          </div>
        ) : feed === null ? (
          // Unreachable (ready ⇒ feed set) — keeps the narrowing obvious.
          null
        ) : (
          <MemberForm
            key={`${mode}-${personId ?? 'new'}`}
            familyId={familyId}
            mode={mode}
            personId={personId}
            feed={feed}
            person={person}
            onClose={onClose}
            onSaved={onSaved}
          />
        )}
      </section>
    </>
  );
}
