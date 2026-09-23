import type { ReactNode } from 'react';
import Link from 'next/link';
import type { PeopleFeed, PersonDto } from '@/types/feed';
import { Monogram } from '@/app/components/ui';
import {
  childrenOf,
  grandparentTag,
  grandparentsOf,
  kinWord,
  parentTag,
  partnerTag,
  parentsOf,
  partnersOf,
  siblingsOf,
} from '@/lib/derive';
import { relationshipMeta } from '@/lib/vitalDates';
import { Panel } from './Panel';

export interface FamilyPanelProps {
  person: PersonDto;
  feed: PeopleFeed;
}

/** One relationship row (member.html `.rel`): monogram · name/meta · tag · chevron. */
function RelRow({ other, tag }: { other: PersonDto; tag: string }) {
  const meta = relationshipMeta(other.birthDate, other.deathDate, other.birthPlace);
  return (
    <Link
      href={`/person/${other.id}`}
      className="group flex items-center gap-[13px] rounded-[10px] px-3 py-[9px] transition-colors hover:bg-[#F4EDE3]"
    >
      <Monogram name={other.fullName} personId={other.id} size={36} decorative />
      <span className="min-w-0 flex-1">
        <span className="block text-[14.5px] font-650 tracking-[-0.01em] text-[var(--ink)]">
          {other.fullName}
        </span>
        {meta !== null && <span className="block text-[12px] text-[var(--muted)]">{meta}</span>}
      </span>
      <span className="rounded-full border border-[var(--line)] bg-[#F4EDE3] px-[9px] py-0.5 text-[12px] font-semibold text-[var(--ink-soft)]">
        {tag}
      </span>
      <svg
        className="flex-none text-[var(--line-strong)] transition-colors group-hover:text-[var(--clay)]"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        aria-hidden="true"
      >
        <path d="m9 6 6 6-6 6" />
      </svg>
    </Link>
  );
}

/** Uppercase group label + rows, hairline-separated (member.html `.rel-group`). */
function RelGroup({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="border-t border-[var(--line)] px-2.5 pt-1.5 pb-2.5 first:border-t-0">
      <div className="px-3 pt-2.5 pb-1 text-[12px] font-bold tracking-[0.07em] text-[var(--muted)] uppercase">
        {label}
      </div>
      {children}
    </div>
  );
}

/**
 * Relationships (member.html + #14): Parents, Partners, Children (the #14
 * amendment — the prototype forgot them), Siblings, Grandparents — every
 * group, tag and meta derived from lib/derive.ts + vitalDates, every row
 * navigating to /person/[id]. Empty groups are omitted (the draft is
 * silent; the prototype never shows one).
 */
export function FamilyPanel({ person, feed }: FamilyPanelProps) {
  const parents = parentsOf(person.id, feed);
  const partners = partnersOf(person.id, feed);
  const children = childrenOf(person.id, feed);
  const siblings = siblingsOf(person.id, feed);

  // Dedupe: a grandparent reachable through both parents appears only once.
  const grandSeen = new Set<number>();
  const grandparents = grandparentsOf(person.id, feed).filter((entry) => {
    if (grandSeen.has(entry.person.id)) return false;
    grandSeen.add(entry.person.id);
    return true;
  });

  const total = parents.length + partners.length + children.length + siblings.length + grandparents.length;

  return (
    <Panel
      title="Relationships"
      action={
        <span className="text-[12px] font-semibold text-[var(--muted)]">
          {total} {total === 1 ? 'person' : 'people'}
        </span>
      }
    >
      {total === 0 ? (
        <p className="px-[22px] py-5 text-[13.5px] text-[var(--muted)]">
          No family links yet — use Edit profile to add parents, a partner or children.
        </p>
      ) : (
        <>
          {parents.length > 0 && (
            <RelGroup label="Parents">
              {parents.map(({ person: other, role }, index) => (
                <RelRow key={`${other.id}-${index}`} other={other} tag={parentTag(other, role)} />
              ))}
            </RelGroup>
          )}
          {partners.length > 0 && (
            <RelGroup label="Partners">
              {partners.map(({ person: other, partnership }, index) => (
                <RelRow
                  key={`${other.id}-${index}`}
                  other={other}
                  tag={partnerTag(partnership.kind)}
                />
              ))}
            </RelGroup>
          )}
          {children.length > 0 && (
            <RelGroup label="Children">
              {children.map(({ person: other }, index) => (
                <RelRow key={`${other.id}-${index}`} other={other} tag={kinWord(other, 'child')} />
              ))}
            </RelGroup>
          )}
          {siblings.length > 0 && (
            <RelGroup label="Siblings">
              {siblings.map(({ person: other, isHalf }, index) => {
                const word = kinWord(other, 'sibling');
                return (
                  <RelRow
                    key={`${other.id}-${index}`}
                    other={other}
                    tag={isHalf ? `half-${word}` : word}
                  />
                );
              })}
            </RelGroup>
          )}
          {grandparents.length > 0 && (
            <RelGroup label="Grandparents">
              {grandparents.map((entry, index) => (
                <RelRow
                  key={`${entry.person.id}-${index}`}
                  other={entry.person}
                  tag={grandparentTag(entry.side)}
                />
              ))}
            </RelGroup>
          )}
        </>
      )}
    </Panel>
  );
}
