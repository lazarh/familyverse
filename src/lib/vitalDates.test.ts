import { describe, expect, it } from 'vitest';
import { cardDates, detailsDates, profileVital, relationshipMeta } from './vitalDates';

// Spec tests for the #14 display rules. These REPLACE the old
// dates.test.ts characterisation tests (age arithmetic is gone by decision).

describe('cardDates', () => {
  it('living with birth: short b. form', () => {
    expect(cardDates('1994-03-14', null)).toBe('b. 14 Mar 1994');
    expect(cardDates(new Date('1965-02-12T00:00:00Z'), undefined)).toBe('b. 12 Feb 1965');
  });

  it('deceased with birth: year range', () => {
    expect(cardDates('1941-05-02', '2016-11-30')).toBe('1941 – 2016');
  });

  it('deceased without birth: d. form', () => {
    expect(cardDates(null, '2016-11-30')).toBe('d. 2016');
  });

  it('no dates: line omitted', () => {
    expect(cardDates(null, null)).toBeNull();
    expect(cardDates('', '')).toBeNull();
    expect(cardDates('not-a-date', null)).toBeNull();
  });

  it('birth alone never invents a death year (no age anywhere)', () => {
    // Old behaviour would compute an age here; the card must not show one.
    expect(cardDates('1994-03-14', null)).toBe('b. 14 Mar 1994');
  });

  it('uses UTC getters: Jan 1 UTC-midnight does not shift a year west of UTC', () => {
    // 1994-01-01T00:00:00Z is 1993-12-31 in UTC-5 — the year must stay 1994.
    expect(cardDates('1994-01-01T00:00:00Z', null)).toBe('b. 1 Jan 1994');
    expect(profileVital('1994-01-01T00:00:00Z', null)).toBe('b. 1 January 1994');
  });
});

describe('profileVital', () => {
  it('living: long month', () => {
    expect(profileVital('1994-03-14', null)).toBe('b. 14 March 1994');
  });

  it('deceased: year range', () => {
    expect(profileVital('1941-05-02', '2016-11-30')).toBe('1941 – 2016');
  });

  it('deceased without birth: d. form', () => {
    expect(profileVital(null, '2016-11-30')).toBe('d. 2016');
  });

  it('unknown: null', () => {
    expect(profileVital(null, null)).toBeNull();
  });
});

describe('detailsDates', () => {
  it('full dates and Living', () => {
    expect(detailsDates('1994-03-14', null)).toEqual({
      born: '14 March 1994',
      died: 'Living',
    });
    expect(detailsDates('1941-05-02', '2016-11-30')).toEqual({
      born: '2 May 1941',
      died: '30 November 2016',
    });
  });

  it('missing birth yields null born', () => {
    expect(detailsDates(null, '2016-11-30')).toEqual({ born: null, died: '30 November 2016' });
  });
});

describe('relationshipMeta', () => {
  it('living: b. year · place', () => {
    expect(relationshipMeta('1992-11-02', null, 'Porto, Portugal')).toBe('b. 1992 · Porto, Portugal');
  });

  it('deceased: year range · place', () => {
    expect(relationshipMeta('1941-05-02', '2016-11-30', 'Kraków, Poland')).toBe(
      '1941 – 2016 · Kraków, Poland',
    );
  });

  it('skips empty parts', () => {
    expect(relationshipMeta('1992-11-02', null, null)).toBe('b. 1992');
    expect(relationshipMeta(null, null, 'Porto, Portugal')).toBe('Porto, Portugal');
    expect(relationshipMeta(null, null, '  ')).toBeNull();
  });
});
