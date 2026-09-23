'use client';

/**
 * useFamilyTree — the tree screen's feed hook (#13 responsibility map:
 * "member feed fetch → useFamilyTree"). Fetch + cache + reload over
 * fetchPeopleFeed (#15's flat feed).
 *
 * The cache is keyed by family id, so switching families paints instantly
 * with that family's last-known rows (and shows loading, not the previous
 * family's people, when there is none) while the refetch runs — every mount
 * and every `reload()` still goes to the network (the drawer's onSaved
 * depends on that to show freshly saved members).
 */
import { useCallback, useEffect, useState } from 'react';
import { fetchPeopleFeed } from '../../../lib/api';
import type { PeopleFeed } from '../../../types/feed';

/** Last feed per family id, shared across mounts (tree ⇄ profile). */
const feedCache = new Map<number, PeopleFeed>();

export interface FamilyTreeState {
  /** Null while nothing has loaded yet (or no family is selected). */
  feed: PeopleFeed | null;
  loading: boolean;
  /** `message` from apiFetch's thrown ApiError (or a generic fallback). */
  error: string | null;
}

export interface UseFamilyTreeResult extends FamilyTreeState {
  /** Refetch the current family; the cache is overwritten with the result. */
  reload: () => void;
}

interface LoadedState extends FamilyTreeState {
  /** Which family the rows/error below belong to. */
  familyId: number | null;
}

/**
 * Fetch + cache + reload for one family's feed.
 *
 * @param familyId Active family, or null while the family list is loading.
 */
export function useFamilyTree(familyId: number | null): UseFamilyTreeResult {
  const [loaded, setLoaded] = useState<LoadedState>({
    familyId: null,
    feed: null,
    loading: false,
    error: null,
  });
  const [nonce, setNonce] = useState(0);

  const reload = useCallback(() => setNonce((value) => value + 1), []);

  useEffect(() => {
    if (familyId === null) {
      setLoaded({ familyId: null, feed: null, loading: false, error: null });
      return;
    }

    let cancelled = false;
    fetchPeopleFeed(familyId)
      .then((feed) => {
        feedCache.set(familyId, feed);
        if (!cancelled) setLoaded({ familyId, feed, loading: false, error: null });
      })
      .catch((err: unknown) => {
        if (!cancelled) {
          setLoaded({
            familyId,
            feed: null,
            loading: false,
            error:
              err instanceof Error
                ? err.message
                : 'Something went wrong while loading this family.',
          });
        }
      });

    return () => {
      cancelled = true;
    };
  }, [familyId, nonce]);

  // Derived per render so a family switch is correct before the effect runs:
  // stale-family results are ignored, the cache paints or loading shows.
  if (familyId === null) return { feed: null, loading: false, error: null, reload };
  if (loaded.familyId !== familyId) {
    const cached = feedCache.get(familyId) ?? null;
    return { feed: cached, loading: cached === null, error: null, reload };
  }
  return { feed: loaded.feed, loading: loaded.loading, error: loaded.error, reload };
}
