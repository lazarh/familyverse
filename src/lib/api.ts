/**
 * Thin API client for the endpoints from #15. Throws ApiError (message +
 * optional machine `code`) on non-2xx so screens can render `err.message`.
 */
import type { PeopleFeed, PersonBootstrap, PersonMutationResult } from '@/types/feed';

export class ApiError extends Error {
  readonly status: number;
  readonly code?: string;

  constructor(status: number, message: string, code?: string) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.code = code;
  }
}

/** Fetch + JSON parse + error unwrapping (`{ message, code? }` bodies). */
export async function apiFetch<T>(url: string, init?: RequestInit): Promise<T> {
  const response = await fetch(url, init);
  let body: unknown = null;
  try {
    body = await response.json();
  } catch {
    // Non-JSON body (e.g. proxy 404) — fall through to the status message.
  }
  if (!response.ok) {
    const record = (body ?? {}) as { message?: string; code?: string };
    throw new ApiError(
      response.status,
      record.message ?? `Request failed with status ${response.status}`,
      record.code,
    );
  }
  return body as T;
}

/** GET /api/families/[familyId]/people — the flat tree feed. */
export function fetchPeopleFeed(familyId: number): Promise<PeopleFeed> {
  return apiFetch<PeopleFeed>(`/api/families/${familyId}/people`);
}

/** GET /api/people/[id] — profile bootstrap ({ person, familyIds }). */
export function fetchPerson(id: number): Promise<PersonBootstrap> {
  return apiFetch<PersonBootstrap>(`/api/people/${id}`);
}

export type { PeopleFeed, PersonBootstrap, PersonMutationResult };
