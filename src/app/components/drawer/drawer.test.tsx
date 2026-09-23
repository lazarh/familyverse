import { describe, expect, it } from 'vitest';
import { renderToStaticMarkup } from 'react-dom/server';
import type { PeopleFeed, PersonDto } from '../../../types/feed';
import { applyMarkdown } from './BioEditor';
import { BioEditor } from './BioEditor';
import { filterPeople, PersonPicker } from './PersonPicker';
import { buildPersonFormData, GENDER_OPTIONS, normalizeGender } from './MemberForm';
import type { PersonPayload } from './MemberForm';
import MemberDrawer from './MemberDrawer';

// Node-environment tests, ui.test.tsx precedent: pure helpers + markup via
// renderToStaticMarkup. No jsdom, no testing-library, no new dependencies.

const daniel: PersonDto = {
  id: 3,
  fullName: 'Daniel Kessler',
  gender: 'Male',
  birthDate: '1965-02-12T00:00:00.000Z',
  deathDate: null,
  birthPlace: 'Bristol, England',
  bio: null,
  pictureUrl: null,
};

const anita: PersonDto = {
  id: 4,
  fullName: 'Anita Kessler',
  gender: 'Female',
  birthDate: '1968-07-03T00:00:00.000Z',
  deathDate: null,
  birthPlace: 'Accra, Ghana',
  bio: null,
  pictureUrl: null,
};

const walter: PersonDto = {
  id: 1,
  fullName: 'Walter Kessler',
  gender: 'Male',
  birthDate: '1941-01-01T00:00:00.000Z',
  deathDate: '2016-05-05T00:00:00.000Z',
  birthPlace: 'Kraków, Poland',
  bio: null,
  pictureUrl: null,
};

const feed: PeopleFeed = { people: [daniel, anita, walter], parentChild: [], partnerships: [] };

/* ------------------------------------------------------------------ *
 * applyMarkdown (BioEditor)
 * ------------------------------------------------------------------ */

describe('applyMarkdown', () => {
  it('bold wraps the selection and selects the wrapped text', () => {
    const edit = applyMarkdown('plain', 0, 5, 'bold');
    expect(edit.value).toBe('**plain**');
    expect(edit.start).toBe(2);
    expect(edit.end).toBe(7);
  });

  it('bold unwraps an already-wrapped selection', () => {
    const edit = applyMarkdown('**x**', 0, 5, 'bold');
    expect(edit.value).toBe('x');
    expect(edit.start).toBe(0);
    expect(edit.end).toBe(1);
  });

  it('bold with no selection inserts an empty marker pair, caret in the middle', () => {
    const edit = applyMarkdown('ab', 1, 1, 'bold');
    expect(edit.value).toBe('a****b');
    expect(edit.start).toBe(3);
    expect(edit.end).toBe(3);
  });

  it('italic uses single-star markers', () => {
    const edit = applyMarkdown('x', 0, 1, 'italic');
    expect(edit.value).toBe('*x*');
    expect(edit.start).toBe(1);
    expect(edit.end).toBe(2);
  });

  it('heading prefixes the line with ## and shifts the caret past it', () => {
    const edit = applyMarkdown('hello', 0, 5, 'heading');
    expect(edit.value).toBe('## hello');
    expect(edit.start).toBe(3);
    expect(edit.end).toBe(8);
  });

  it('list prefixes every selected line', () => {
    const edit = applyMarkdown('a\nb', 0, 3, 'list');
    expect(edit.value).toBe('- a\n- b');
    expect(edit.start).toBe(2);
    expect(edit.end).toBe(7);
  });

  it('list expands a mid-line selection to whole lines and keeps the caret sane', () => {
    const edit = applyMarkdown('x\nhello', 3, 8, 'quote');
    expect(edit.value).toBe('x\n> hello');
    expect(edit.start).toBe(5);
    expect(edit.end).toBe(10);
  });

  it('link writes [text](url) with the caret after the closing paren', () => {
    const edit = applyMarkdown('hi', 0, 2, 'link', 'https://x.test');
    expect(edit.value).toBe('[hi](https://x.test)');
    expect(edit.start).toBe('[hi](https://x.test)'.length);
    expect(edit.end).toBe('[hi](https://x.test)'.length);
  });

  it('link with no selection uses "link" as the text', () => {
    const edit = applyMarkdown('', 0, 0, 'link', 'u');
    expect(edit.value).toBe('[link](u)');
    expect(edit.start).toBe('[link](u)'.length);
  });
});

/* ------------------------------------------------------------------ *
 * gender (#14: Other/Unknown → Not said)
 * ------------------------------------------------------------------ */

describe('normalizeGender / GENDER_OPTIONS', () => {
  it('exposes exactly the four #14 segmented values', () => {
    expect(GENDER_OPTIONS.map((option) => option.value)).toEqual([
      'Female',
      'Male',
      'Non-binary',
      'Not said',
    ]);
  });

  it('keeps the four values regardless of casing/whitespace', () => {
    expect(normalizeGender('Female')).toBe('Female');
    expect(normalizeGender(' male ')).toBe('Male');
    expect(normalizeGender('FEMALE')).toBe('Female');
    expect(normalizeGender('non-binary')).toBe('Non-binary');
    expect(normalizeGender('nonbinary')).toBe('Non-binary');
  });

  it('maps legacy Other/Unknown and anything unrecognized to Not said', () => {
    expect(normalizeGender('Other')).toBe('Not said');
    expect(normalizeGender('Unknown')).toBe('Not said');
    expect(normalizeGender('   ')).toBe('Not said');
    expect(normalizeGender(null)).toBe('Not said');
    expect(normalizeGender(undefined)).toBe('Not said');
    expect(normalizeGender('genderfluid')).toBe('Not said');
  });
});

/* ------------------------------------------------------------------ *
 * buildPersonFormData (#15 submit contract)
 * ------------------------------------------------------------------ */

describe('buildPersonFormData', () => {
  const base: PersonPayload = {
    fullName: '  Theo Kessler  ',
    gender: 'Male',
    birthDate: '1997-09-27',
    deathDate: '',
    birthPlace: ' Bristol, England ',
    bio: '',
    parents: [
      { key: 1, parentId: 3, role: 'BIOLOGICAL' },
      { key: 2, parentId: null, role: 'ADOPTIVE' },
    ],
    partnerships: [{ key: 3, personId: 4, kind: 'MARRIED' }],
    removePicture: true,
  };

  it('sets every contract key with trimmed values; "" dates/bio stay present (clear semantics)', () => {
    const form = buildPersonFormData(base);
    expect(form.get('fullName')).toBe('Theo Kessler');
    expect(form.get('gender')).toBe('Male');
    expect(form.get('birthDate')).toBe('1997-09-27');
    expect(form.get('deathDate')).toBe('');
    expect(form.get('birthPlace')).toBe('Bristol, England');
    expect(form.get('bio')).toBe('');
    expect(form.has('birthDate')).toBe(true); // FormData.has contract: present ⇒ applied
    expect(form.has('deathDate')).toBe(true);
    expect(form.get('removePicture')).toBe('true');
    expect(form.get('picture')).toBeNull();
  });

  it('serialises parents/partnerships as JSON full sets, dropping empty rows', () => {
    const form = buildPersonFormData(base);
    expect(JSON.parse(String(form.get('parents')))).toEqual([
      { parentId: 3, role: 'BIOLOGICAL' },
    ]);
    expect(JSON.parse(String(form.get('partnerships')))).toEqual([
      { personId: 4, kind: 'MARRIED' },
    ]);
  });

  it('includes the picture file when one was chosen and omits removePicture', () => {
    const file = new File(['bytes'], 'photo.jpg', { type: 'image/jpeg' });
    const form = buildPersonFormData({ ...base, picture: file, removePicture: false });
    expect(form.get('picture')).toBe(file);
    expect(form.get('removePicture')).toBeNull();
  });

  it('omits removePicture when it is falsy', () => {
    const form = buildPersonFormData({ ...base, removePicture: false });
    expect(form.get('removePicture')).toBeNull();
  });
});

/* ------------------------------------------------------------------ *
 * filterPeople (PersonPicker)
 * ------------------------------------------------------------------ */

describe('filterPeople', () => {
  const people = [daniel, anita, walter];

  it('excludes given ids (self, already-picked people)', () => {
    const result = filterPeople(people, [3], '');
    expect(result.map((p) => p.id)).toEqual([4, 1]); // sorted: Anita, Walter
  });

  it('matches the query case-insensitively against the full name', () => {
    expect(filterPeople(people, [], 'KES').map((p) => p.id)).toEqual([4, 3, 1]); // sorted
    expect(filterPeople(people, [], 'wal').map((p) => p.id)).toEqual([1]);
    expect(filterPeople(people, [], 'anita k').map((p) => p.id)).toEqual([4]);
    expect(filterPeople(people, [], 'smith')).toEqual([]);
  });

  it('sorts by name for a stable list', () => {
    expect(filterPeople(people, [], '').map((p) => p.fullName)).toEqual([
      'Anita Kessler',
      'Daniel Kessler',
      'Walter Kessler',
    ]);
  });
});

/* ------------------------------------------------------------------ *
 * Rendered markup
 * ------------------------------------------------------------------ */

describe('PersonPicker (rendered)', () => {
  it('selected: monogram box with name, vital meta and Change', () => {
    const html = renderToStaticMarkup(
      <PersonPicker
        people={feed.people}
        value={3}
        onChange={() => {}}
        emptyLabel="+ Find a parent"
        label="Parent 1"
      />,
    );
    expect(html).toContain('Daniel Kessler');
    expect(html).toContain('b. 1965 · Bristol, England');
    expect(html).toContain('Change');
    expect(html).not.toContain('+ Find a parent');
  });

  it('deceased person meta shows the year range', () => {
    const html = renderToStaticMarkup(
      <PersonPicker
        people={feed.people}
        value={1}
        onChange={() => {}}
        emptyLabel="+ Find a parent"
        label="Parent 2"
      />,
    );
    expect(html).toContain('1941 – 2016 · Kraków, Poland');
  });

  it('empty: the dashed prototype slot', () => {
    const html = renderToStaticMarkup(
      <PersonPicker
        people={feed.people}
        value={null}
        onChange={() => {}}
        emptyLabel="+ Link an existing person as partner"
        label="Partner 1"
      />,
    );
    expect(html).toContain('+ Link an existing person as partner');
    expect(html).toContain('border-dashed');
    expect(html).not.toContain('Change');
  });
});

describe('BioEditor (rendered)', () => {
  it('renders the toolbar (H, bold, italic, list, quote, link) + Preview toggle + textarea', () => {
    const html = renderToStaticMarkup(<BioEditor value="hi" onChange={() => {}} />);
    expect(html).toContain('role="toolbar"');
    expect(html).toContain('aria-label="Heading"');
    expect(html).toContain('aria-label="Bold"');
    expect(html).toContain('aria-label="Italic"');
    expect(html).toContain('aria-label="Bulleted list"');
    expect(html).toContain('aria-label="Quote"');
    expect(html).toContain('aria-label="Link"');
    expect(html).toContain('>Preview<');
    expect(html).toContain('placeholder="Stories, nicknames');
    expect(html).toContain('min-h-[132px]');
  });
});

describe('MemberDrawer (rendered)', () => {
  it('is the prototype drawer: scrim, 486px panel, role=dialog, close button', () => {
    const html = renderToStaticMarkup(
      <MemberDrawer familyId={1} mode="add" onClose={() => {}} />,
    );
    expect(html).toContain('role="dialog"');
    expect(html).toContain('aria-modal="true"');
    expect(html).toContain('w-[486px]');
    expect(html).toContain('z-[90]');
    expect(html).toContain('z-[80]'); // warm scrim behind it
    expect(html).toContain('aria-label="Close"');
    expect(html).toContain('Add family member');
    // effects don't run in static markup, so the shell shows its loading state
    expect(html).toContain('Loading…');
    expect(html).not.toContain('Save member');
  });

  it('keeps the frozen props interface (edit mode labels itself)', () => {
    const html = renderToStaticMarkup(
      <MemberDrawer familyId={2} mode="edit" personId={7} onClose={() => {}} onSaved={() => {}} />,
    );
    expect(html).toContain('aria-label="Edit family member"');
    expect(html).toContain('Edit family member');
  });
});
