import { describe, expect, it } from 'vitest';
import { renderToStaticMarkup } from 'react-dom/server';
import { AboutPanel, type AboutPanelPerson } from './AboutPanel';
import { displayGender, firstName } from './format';

// Node environment, markup via renderToStaticMarkup — same precedent as
// ui.test.tsx: no jsdom, no testing-library, no new dependencies.
// (ProfileHeader/FamilyPanel/… pull `@/`-aliased libs at runtime, which the
// shared vitest config doesn't resolve yet — see the build report.)

const maya: AboutPanelPerson = { fullName: 'Maya Kessler', bio: null };

describe('AboutPanel', () => {
  it('renders the prototype panel head with the first name', () => {
    const html = renderToStaticMarkup(
      <AboutPanel person={{ ...maya, bio: 'A short life.' }} />,
    );
    expect(html).toContain('About Maya');
    expect(html).toContain('prose');
  });

  it('renders markdown natively — bold and lists become real elements', () => {
    const html = renderToStaticMarkup(
      <AboutPanel
        person={{
          ...maya,
          bio: '**heads the history department**\n\n- kept every letter',
        }}
      />,
    );
    expect(html).toContain('<strong>');
    expect(html).toContain('<li>');
    expect(html).toContain('kept every letter');
  });

  it('never parses raw HTML — no rehype-raw (#5 / #14 sanitized render)', () => {
    const html = renderToStaticMarkup(
      <AboutPanel person={{ ...maya, bio: '<b>bold?</b>\n\n<script>alert(1)</script>' }} />,
    );
    // The markup survives only as escaped *text* — no element is created,
    // so the script can never execute.
    expect(html).not.toContain('<b>');
    expect(html).not.toContain('<script>');
    expect(html).toContain('&lt;script&gt;alert(1)&lt;/script&gt;');
  });

  it('gives links target="_blank" rel="noopener noreferrer"', () => {
    const html = renderToStaticMarkup(
      <AboutPanel person={{ ...maya, bio: 'see [the naming note](https://example.com/note)' }} />,
    );
    expect(html).toContain('href="https://example.com/note"');
    expect(html).toContain('target="_blank"');
    expect(html).toContain('rel="noopener noreferrer"');
  });

  it('drops unsafe urls (react-markdown default url transform)', () => {
    const html = renderToStaticMarkup(
      <AboutPanel person={{ ...maya, bio: '[click me](javascript:alert(1))' }} />,
    );
    expect(html).not.toContain('javascript:');
  });

  it('empty bio shows the quiet "No story yet" prompt instead of prose', () => {
    for (const bio of [null, '', '   \n  ']) {
      const html = renderToStaticMarkup(<AboutPanel person={{ ...maya, bio }} />);
      expect(html).toContain('No story yet');
      expect(html).toContain('Edit profile');
      expect(html).not.toContain('class="prose"');
    }
  });
});

describe('displayGender', () => {
  it('maps the legacy Other/Unknown values to Not said (#14 decision 4)', () => {
    expect(displayGender('Other')).toBe('Not said');
    expect(displayGender('other')).toBe('Not said');
    expect(displayGender('Unknown')).toBe('Not said');
  });

  it('passes the approved values through untouched', () => {
    expect(displayGender('Female')).toBe('Female');
    expect(displayGender('Non-binary')).toBe('Non-binary');
    expect(displayGender('Not said')).toBe('Not said');
    expect(displayGender('  Male  ')).toBe('Male');
  });

  it('empty input becomes null so the row can show an em dash', () => {
    expect(displayGender('')).toBeNull();
    expect(displayGender('   ')).toBeNull();
    expect(displayGender(null)).toBeNull();
    expect(displayGender(undefined)).toBeNull();
  });
});

describe('firstName', () => {
  it('takes the first whitespace-separated word', () => {
    expect(firstName('Maya Kessler')).toBe('Maya');
    expect(firstName('  Daniel  Kessler ')).toBe('Daniel');
    expect(firstName('Cher')).toBe('Cher');
    expect(firstName('')).toBe('');
  });
});
