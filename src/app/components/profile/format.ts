/**
 * Tiny display-only text helpers shared by the profile's header and panels.
 * Pure formatting — relationship derivation lives in src/lib/derive.ts only
 * (one derivation source, never re-derived inline).
 */

/**
 * Gender as it should read on screen. The legacy `Other` / `Unknown` values
 * map to `Not said` per #14 decision 4 (gender is a display-only field);
 * empty input comes back as null so the caller can show an em dash.
 */
export function displayGender(gender: string | null | undefined): string | null {
  const trimmed = gender?.trim();
  if (!trimmed) return null;
  const token = trimmed.toLowerCase();
  if (token === 'other' || token === 'unknown') return 'Not said';
  return trimmed;
}

/** First name (first whitespace-separated word) for headings, pills, crumbs. */
export function firstName(fullName: string): string {
  return fullName.trim().split(/\s+/)[0] ?? '';
}
