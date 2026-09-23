import { describe, expect, it, vi } from 'vitest';
import { renderToStaticMarkup } from 'react-dom/server';
import { ReactFlowProvider } from 'reactflow';
import type { NodeProps } from 'reactflow';
import PersonCard from './PersonCard';
import type { PersonCardData } from './layout';
import type { PersonDto } from '../../../types/feed';

// Node environment like ui.test.tsx: markup via renderToStaticMarkup, no
// jsdom/testing-library (none installed, no new deps allowed). Navigation on
// click is a one-line router.push — not exercised here for want of a DOM.

const push = vi.hoisted(() => vi.fn());
vi.mock('next/navigation', () => ({
  useRouter: () => ({ push, replace: vi.fn(), prefetch: vi.fn() }),
}));

function person(extra: Partial<PersonDto> = {}): PersonDto {
  return {
    id: 5,
    fullName: 'Maya Kessler',
    gender: 'Female',
    birthDate: '1994-03-14',
    deathDate: null,
    birthPlace: 'Bristol, England',
    bio: null,
    pictureUrl: null,
    ...extra,
  };
}

function markupFor(data: PersonCardData, id = 'n1'): string {
  const props = {
    id,
    type: 'person',
    data,
    selected: false,
    dragging: false,
    zIndex: 0,
    isConnectable: false,
    xPos: 0,
    yPos: 0,
  } as unknown as NodeProps<PersonCardData>;
  return (
    renderToStaticMarkup(
      <ReactFlowProvider>
        <PersonCard {...props} />
      </ReactFlowProvider>,
    ) ?? ''
  );
}

describe('PersonCard', () => {
  it('renders name, cardDates and birth place — and never an age', () => {
    const markup = markupFor({ person: person(), focused: false });
    expect(markup).toContain('Maya Kessler');
    expect(markup).toContain('b. 14 Mar 1994'); // cardDates, long-form month never leaks
    expect(markup).toContain('Bristol, England');
    // no age anywhere (#14): not an age string, not a parenthesised number
    expect(markup).not.toMatch(/\d+\s*years old/i);
    expect(markup).not.toMatch(/\(\d{2}\)/);
  });

  it('falls back to a monogram when there is no picture', () => {
    const markup = markupFor({ person: person(), focused: false });
    expect(markup).not.toContain('<img');
    expect(markup).toContain('>MK<'); // monogramInitials on the full name
  });

  it('renders the photo when pictureUrl is present', () => {
    const markup = markupFor({
      person: person({ pictureUrl: 'https://cdn.test/maya.png' }),
      focused: false,
    });
    expect(markup).toContain('<img');
    expect(markup).toContain('https://cdn.test/maya.png');
    expect(markup).toContain('alt=""');
  });

  it('marks the focused card with the clay ring', () => {
    const focused = markupFor({ person: person(), focused: true });
    const plain = markupFor({ person: person(), focused: false });
    expect(focused).toContain('ring-[var(--clay)]');
    expect(plain).not.toContain('ring-[var(--clay)]');
    expect(plain).toContain('border-[var(--line)]');
  });

  it('carries the prototype card geometry (236×96)', () => {
    const markup = markupFor({ person: person(), focused: false });
    expect(markup).toContain('h-[96px]');
    expect(markup).toContain('w-[236px]');
  });

  it('omits the dates and place lines when nothing is known', () => {
    const markup = markupFor({
      person: person({ birthDate: null, birthPlace: null }),
      focused: false,
    });
    expect(markup).toContain('Maya Kessler');
    expect(markup).not.toContain('b. ');
    expect(markup).not.toContain('Bristol');
  });

  it('renders the four invisible edge handles (t/b/l/r)', () => {
    const markup = markupFor({ person: person(), focused: false });
    for (const handleId of ['t', 'b', 'l', 'r']) {
      expect(markup).toContain(`data-handleid="${handleId}"`);
    }
    expect(markup).toContain('background:transparent');
    expect(markup).toContain('border:0');
  });
});
