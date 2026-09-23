import { describe, expect, it } from 'vitest';
import { renderToStaticMarkup } from 'react-dom/server';
import ShareFamilyDialog from './ShareFamilyDialog';

// Node-environment tests, ui.test.tsx precedent: markup via
// renderToStaticMarkup, no jsdom / testing-library / new dependencies.

describe('ShareFamilyDialog (rendered)', () => {
  it('renders nothing while closed (the frozen open/onClose contract)', () => {
    expect(renderToStaticMarkup(<ShareFamilyDialog familyId={1} open={false} onClose={() => {}} />)).toBe('');
  });

  it('when open: the ui/Dialog with the invite form', () => {
    const html = renderToStaticMarkup(<ShareFamilyDialog familyId={1} open onClose={() => {}} />);
    expect(html).toContain('role="dialog"');
    expect(html).toContain('aria-modal="true"');
    // React escapes the title's & on the way to markup
    expect(html).toContain('Share &amp; manage family');
    expect(html).toContain('Invite someone');
    expect(html).toContain('type="email"');
    expect(html).toContain('Add to family');
    expect(html).toContain('aria-label="Close"');
  });

  it('when open: the family user list section with the self-exclusion note', () => {
    const html = renderToStaticMarkup(<ShareFamilyDialog familyId={1} open onClose={() => {}} />);
    expect(html).toContain('People with access');
    // effects do not run in static markup → the list is in its loading state
    expect(html).toContain('Loading people…');
    expect(html).toContain("Your own account isn&#x27;t listed here");
  });
});
