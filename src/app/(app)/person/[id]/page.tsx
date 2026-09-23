'use client';

import { useCallback, useEffect, useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { ApiError, apiFetch, fetchPeopleFeed, fetchPerson } from '@/lib/api';
import type { PeopleFeed, PersonDto } from '@/types/feed';
import MemberDrawer from '@/app/components/drawer/MemberDrawer';
import { Button, EmptyState } from '@/app/components/ui';
import { ProfileHeader } from '@/app/components/profile/ProfileHeader';
import { AboutPanel } from '@/app/components/profile/AboutPanel';
import { FamilyPanel } from '@/app/components/profile/FamilyPanel';
import { DetailsPanel } from '@/app/components/profile/DetailsPanel';
import { InTreePanel } from '@/app/components/profile/InTreePanel';

type Phase = 'loading' | 'ready' | 'error';

/** The prototype's `.page`: 1080px centred, 24/24/48 padding under the 60px bar. */
const SHELL = 'mx-auto max-w-[1080px] px-6 pt-6 pb-12';
/** The responsive split from member.html: `1.5fr 1fr`, collapses below 880px. */
const GRID =
  'grid grid-cols-1 items-start gap-[22px] min-[880px]:grid-cols-[1.5fr_1fr]';

/**
 * The profile screen (member.html, /person/[id] per #13). Bootstrap:
 * fetchPerson → { person, familyIds } + the family feed of the FIRST
 * membership family (v1 = single household — multi-family profiles would
 * need a derivation source per family) — everything else is derived
 * client-side from lib/derive.ts / lib/vitalDates.ts, one source only.
 */
export default function PersonProfilePage() {
  const routeParams = useParams<{ id: string }>();
  const parsedId = Number.parseInt(routeParams.id ?? '', 10);
  const personId = Number.isInteger(parsedId) && parsedId > 0 ? parsedId : null;

  const [phase, setPhase] = useState<Phase>('loading');
  const [error, setError] = useState<Error | null>(null);
  const [person, setPerson] = useState<PersonDto | null>(null);
  const [feed, setFeed] = useState<PeopleFeed | null>(null);
  const [familyId, setFamilyId] = useState<number | null>(null);
  const [familyName, setFamilyName] = useState<string | null>(null);
  const [editing, setEditing] = useState(false);

  const load = useCallback(async () => {
    if (personId === null) return;
    setPhase('loading');
    setError(null);
    setFamilyName(null);
    try {
      const bootstrap = await fetchPerson(personId);
      const homeFamilyId = bootstrap.familyIds[0];
      if (homeFamilyId === undefined) {
        throw new ApiError(403, 'This person doesn’t belong to a family you can see.');
      }
      const nextFeed = await fetchPeopleFeed(homeFamilyId);
      setPerson(bootstrap.person);
      setFamilyId(homeFamilyId);
      setFeed(nextFeed);
      setPhase('ready');
      // Best-effort crumb label — the prototype's "The Kessler Family".
      void apiFetch<{ name: string | null }>(`/api/families/${homeFamilyId}`)
        .then((family) => setFamilyName(family.name))
        .catch(() => undefined);
    } catch (cause) {
      setError(cause instanceof Error ? cause : new Error('Something went wrong.'));
      setPhase('error');
    }
  }, [personId]);

  useEffect(() => {
    void load();
  }, [load]);

  /** Friendly not-found (link home) vs. retryable load failure. */
  const notFound = personId === null || (error instanceof ApiError && (error.status === 403 || error.status === 404));

  if (phase === 'error' || personId === null) {
    return (
      <div className={SHELL}>
        <EmptyState
          title={notFound ? 'Person not found' : 'Couldn’t load this profile'}
          body={
            personId === null
              ? 'That link doesn’t point at a person.'
              : (error?.message ?? 'The profile didn’t load.')
          }
        >
          {notFound ? (
            <Button variant="secondary" href="/">
              Back to the family tree
            </Button>
          ) : (
            <>
              <Button variant="secondary" onClick={() => void load()}>
                Try again
              </Button>
              <Button variant="ghost" href="/">
                Back to the family tree
              </Button>
            </>
          )}
        </EmptyState>
      </div>
    );
  }

  if (phase === 'loading' || person === null || feed === null) {
    return (
      <div className={SHELL} aria-busy="true">
        <div className="mb-[18px] h-5 w-64 animate-pulse rounded bg-[#F1E9DC]" />
        <div className="mb-[22px] h-[156px] animate-pulse rounded-[16px] bg-[#F1E9DC]" />
        <div className="mb-[22px] h-[180px] animate-pulse rounded-[16px] bg-[#F1E9DC]" />
        <div className={GRID}>
          <div className="h-[420px] animate-pulse rounded-[16px] bg-[#F1E9DC]" />
          <div className="flex flex-col gap-[22px]">
            <div className="h-[300px] animate-pulse rounded-[16px] bg-[#F1E9DC]" />
            <div className="h-[240px] animate-pulse rounded-[16px] bg-[#F1E9DC]" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={SHELL}>
      <nav
        aria-label="Breadcrumb"
        className="mb-[18px] flex items-center gap-2 text-[13.5px] text-[var(--muted)]"
      >
        <Link href="/" className="hover:text-[var(--clay)] hover:underline">
          {familyName ?? 'Family tree'}
        </Link>
        <span aria-hidden="true" className="opacity-50">
          /
        </span>
        <span>{person.fullName}</span>
      </nav>

      <ProfileHeader person={person} feed={feed} onEdit={() => setEditing(true)} />
      <AboutPanel person={person} />

      <div className={GRID}>
        <FamilyPanel person={person} feed={feed} />
        <div className="flex flex-col gap-[22px]">
          <DetailsPanel person={person} />
          <InTreePanel person={person} feed={feed} />
        </div>
      </div>

      {editing && familyId !== null && (
        <MemberDrawer
          familyId={familyId}
          mode="edit"
          personId={personId}
          onClose={() => setEditing(false)}
          onSaved={() => void load()}
        />
      )}
    </div>
  );
}
