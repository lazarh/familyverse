import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { calculateLifeDates } from './dates';

// Characterisation tests for the birth/death year + age block extracted from
// src/app/components/FamilyNode.tsx. They pin CURRENT behaviour — including the
// naive getFullYear() subtraction that ignores month/day — so the extraction is
// behaviour-preserving. Do not "improve" expectations here without a ticket.
describe('calculateLifeDates', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date(2026, 8, 22)); // 22 Sep 2026, local time
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  describe('no birth date', () => {
    it('returns all nulls for a null birth date', () => {
      expect(calculateLifeDates(null, null)).toEqual({
        birthYear: null,
        deathYear: null,
        age: null,
      });
    });

    it('returns all nulls for an undefined birth date', () => {
      expect(calculateLifeDates(undefined, undefined)).toEqual({
        birthYear: null,
        deathYear: null,
        age: null,
      });
    });

    it('returns all nulls for an empty-string birth date (falsy, as sent by form inputs)', () => {
      expect(calculateLifeDates('', '')).toEqual({
        birthYear: null,
        deathYear: null,
        age: null,
      });
    });

    it('ignores a death date when there is no birth date', () => {
      expect(calculateLifeDates(null, new Date(2010, 5, 15))).toEqual({
        birthYear: null,
        deathYear: null,
        age: null,
      });
    });
  });

  describe('birth date, no death date', () => {
    it('returns the birth year and an age relative to the current year', () => {
      // System time is pinned to 2026 → 2026 - 1990 = 36.
      expect(calculateLifeDates(new Date(1990, 5, 15), null)).toEqual({
        birthYear: 1990,
        deathYear: null,
        age: 36,
      });
    });

    it('accepts a serialised date string (JSON round-trip from the API)', () => {
      // Mid-year timestamp: unambiguous in any local timezone.
      expect(calculateLifeDates('1990-06-15T00:00:00.000Z', null)).toEqual({
        birthYear: 1990,
        deathYear: null,
        age: 36,
      });
    });

    it('treats an empty-string death date as still living (falsy, as sent by form inputs)', () => {
      expect(calculateLifeDates(new Date(1990, 5, 15), '')).toEqual({
        birthYear: 1990,
        deathYear: null,
        age: 36,
      });
    });
  });

  describe('birth and death dates', () => {
    it('computes age from the death year, not the current year', () => {
      // System time is pinned to 2026; a current-year calculation would give 36.
      expect(calculateLifeDates(new Date(1990, 0, 1), new Date(2010, 5, 15))).toEqual({
        birthYear: 1990,
        deathYear: 2010,
        age: 20,
      });
    });

    it('subtracts calendar years naively (no month/day adjustment)', () => {
      // Died the day after turning 19 — still reported as age 20 because the
      // calculation is plain getFullYear() subtraction.
      expect(calculateLifeDates(new Date(1990, 11, 31), new Date(1991, 0, 1))).toEqual({
        birthYear: 1990,
        deathYear: 1991,
        age: 1,
      });
    });

    it('does not validate that death comes after birth', () => {
      expect(calculateLifeDates(new Date(1990, 0, 1), new Date(1980, 0, 1))).toEqual({
        birthYear: 1990,
        deathYear: 1980,
        age: -10,
      });
    });
  });

  describe('invalid input', () => {
    it('propagates NaN for an unparseable birth date (no validation)', () => {
      const result = calculateLifeDates('not-a-date', null);
      expect(result.birthYear).toBe(NaN);
      expect(result.deathYear).toBeNull();
      expect(result.age).toBe(NaN);
    });
  });
});
