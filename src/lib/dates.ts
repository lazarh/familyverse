/**
 * Birth/death year + age calculation.
 *
 * Extracted behaviour-preservingly from src/app/components/FamilyNode.tsx;
 * behaviour is pinned characterisation-style by src/lib/dates.test.ts.
 */
// TODO(domain-model): revisit with ticket #5 — the age calculation is a naive
// getFullYear() subtraction (ignores month/day, does not validate ordering).
// The tests pin that current behaviour on purpose; changing the algorithm is
// domain-model work, not this extraction.

/** The date fields of a family member, as `Date` objects or JSON strings. */
type MaybeDate = Date | string | null | undefined;

export interface LifeDates {
  /** Birth year (NaN when unparseable), or null when the birth date is falsy. */
  birthYear: number | null;
  /** Death year, or null when the member is living (or has no birth date). */
  deathYear: number | null;
  /** Age: death year − birth year, or current year − birth year when living. */
  age: number | null;
}

/**
 * Derive display years and age from a member's birth/death dates.
 *
 * Any falsy birth date yields `{ birthYear: null, deathYear: null, age: null }`
 * (a death date alone is ignored). A falsy death date yields an age relative to
 * the current year; otherwise it is relative to the death year.
 */
export function calculateLifeDates(birthDate: MaybeDate, deathDate: MaybeDate): LifeDates {
  let birthYear: number | null = null;
  let deathYear: number | null = null;
  let age: number | null = null;

  if (birthDate) {
    const birthDateObj = new Date(birthDate);
    birthYear = birthDateObj.getFullYear();

    if (deathDate) {
      const deathDateObj = new Date(deathDate);
      age = deathDateObj.getFullYear() - birthYear;
      deathYear = deathDateObj.getFullYear();
    } else {
      const currentYear = new Date().getFullYear(); // Use current year
      age = currentYear - birthYear;
    }
  }

  return { birthYear, deathYear, age };
}
