/**
 * Vital-date display formatting — the card/profile rules decided in #14.
 *
 * Replaces src/lib/dates.ts (deleted): age arithmetic is gone entirely, the
 * card never shows an age, and parsing uses UTC getters so a UTC-midnight
 * date (what `<input type="date">` → Prisma round-trips produce) never
 * shifts a day/weekend across timezones.
 *
 * Formats:
 *   cardDates, living + birth   → `b. 14 Mar 1994`
 *   cardDates, deceased + birth → `1941 – 2016`
 *   cardDates, deceased only    → `d. 2016`
 *   cardDates, otherwise        → null (line omitted)
 *   profileVital                → long-month form of the living case
 *   detailsDates                → full dates for the Details panel
 */

/** The date fields of a person, as `Date` objects or JSON strings. */
export type MaybeDate = Date | string | null | undefined;

const SHORT_MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'] as const;
const LONG_MONTHS = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
] as const;

/** Parse a falsy/unparseable date to null; otherwise a valid Date. */
function parse(value: MaybeDate): Date | null {
  if (!value) return null;
  const date = value instanceof Date ? value : new Date(value);
  return Number.isNaN(date.getTime()) ? null : date;
}

function yearOf(date: Date): number {
  return date.getUTCFullYear();
}

function fullDate(date: Date, longMonth: boolean): string {
  const month = longMonth ? LONG_MONTHS[date.getUTCMonth()] : SHORT_MONTHS[date.getUTCMonth()];
  return `${date.getUTCDate()} ${month} ${yearOf(date)}`;
}

/**
 * The tree-card dates line (short month, no age).
 * Returns null when the line should be omitted.
 */
export function cardDates(birthDate: MaybeDate, deathDate: MaybeDate): string | null {
  const birth = parse(birthDate);
  const death = parse(deathDate);

  if (death) {
    if (birth) return `${yearOf(birth)} – ${yearOf(death)}`;
    return `d. ${yearOf(death)}`;
  }
  if (birth) return `b. ${fullDate(birth, false)}`;
  return null;
}

/**
 * The profile header vital line: `b. 14 March 1994` (long month) while
 * living, `1941 – 2016` when deceased, `d. 2016` deceased without birth.
 * Returns null when nothing is known.
 */
export function profileVital(birthDate: MaybeDate, deathDate: MaybeDate): string | null {
  const birth = parse(birthDate);
  const death = parse(deathDate);

  if (death) {
    if (birth) return `${yearOf(birth)} – ${yearOf(death)}`;
    return `d. ${yearOf(death)}`;
  }
  if (birth) return `b. ${fullDate(birth, true)}`;
  return null;
}

/**
 * Full dates for the Details panel. `died` is the string `Living` when the
 * person has no death date (per the prototype), a full date otherwise.
 */
export function detailsDates(
  birthDate: MaybeDate,
  deathDate: MaybeDate,
): { born: string | null; died: string } {
  const birth = parse(birthDate);
  const death = parse(deathDate);
  return {
    born: birth ? fullDate(birth, true) : null,
    died: death ? fullDate(death, true) : 'Living',
  };
}

/**
 * Relationship-row meta: `b. 1994 · Bristol, England` (living),
 * `1941 – 2016 · Malmö, Sweden` (deceased). Empty parts are skipped;
 * returns null when neither a year nor a place is known.
 */
export function relationshipMeta(
  birthDate: MaybeDate,
  deathDate: MaybeDate,
  place: string | null | undefined,
): string | null {
  const birth = parse(birthDate);
  const death = parse(deathDate);

  let dates: string | null = null;
  if (death && birth) dates = `${yearOf(birth)} – ${yearOf(death)}`;
  else if (death) dates = `d. ${yearOf(death)}`;
  else if (birth) dates = `b. ${yearOf(birth)}`;

  const trimmedPlace = place?.trim() || null;
  if (dates && trimmedPlace) return `${dates} · ${trimmedPlace}`;
  return dates ?? trimmedPlace;
}
