import Link from 'next/link';
import type { PeopleFeed, PersonDto } from '@/types/feed';
import { miniTree } from '@/lib/derive';
import { Panel } from './Panel';
import { firstName } from './format';

export interface InTreePanelProps {
  person: PersonDto;
  feed: PeopleFeed;
}

/** member.html `.pill`: 12px/650, line-strong border on --card. */
const PILL =
  'inline-flex items-center gap-[7px] rounded-full border bg-[var(--card)] px-3 py-1.5 text-[12px] font-650';
const PILL_LINK =
  'border-[var(--line-strong)] hover:border-[var(--clay)] hover:text-[var(--clay)]';
/** `.pill.here` — the profile's own pill, highlighted and not a link. */
const PILL_HERE =
  'cursor-default border-[var(--clay)] bg-[#F6E9E2] text-[var(--clay-dark)]';

/**
 * In the tree (member.html `.mini`): three pill rows from
 * miniTree(personId, feed) — grandparents, parents, self+siblings+partners —
 * each pill navigating to /person/[id], the self pill highlighted, plus the
 * `Center on … →` link back to `/?focus=<id>` (#13 decision 4).
 *
 * generationOf is deliberately NOT shown here: #14 puts `Generation N` in
 * the header chips (ProfileHeader).
 */
export function InTreePanel({ person, feed }: InTreePanelProps) {
  const tree = miniTree(person.id, feed);
  const rows = [tree.grandparents, tree.parents, tree.selfRow].filter((row) => row.length > 0);

  return (
    <Panel
      title="In the tree"
      action={
        <Link
          href={`/?focus=${person.id}`}
          className="text-[12px] font-semibold text-[var(--clay)] hover:underline"
        >
          {`Center on ${firstName(person.fullName)} →`}
        </Link>
      }
    >
      {rows.length === 0 ? (
        <p className="px-[22px] py-5 text-[13.5px] text-[var(--muted)]">
          Not linked into the tree yet.
        </p>
      ) : (
        <div
          className="px-[22px] pt-[18px] pb-[22px]"
          style={{ background: 'linear-gradient(180deg, #FFFEFB 0%, #FAF4EA 100%)' }}
        >
          {rows.map((row, rowIndex) => (
            <div
              key={rowIndex}
              className={[
                'flex flex-wrap items-center justify-center gap-2.5',
                // the prototype's hairline tick joining the generations
                rowIndex > 0
                  ? 'relative mt-3.5 before:absolute before:-top-[11px] before:left-1/2 before:h-2 before:w-px before:bg-[var(--line-strong)]'
                  : '',
              ]
                .filter(Boolean)
                .join(' ')}
            >
              {row.map((other) => {
                const label = firstName(other.fullName);
                if (other.id === person.id) {
                  return (
                    <span key={other.id} title={other.fullName} className={`${PILL} ${PILL_HERE}`}>
                      {label}
                    </span>
                  );
                }
                return (
                  <Link
                    key={other.id}
                    href={`/person/${other.id}`}
                    title={other.fullName}
                    className={`${PILL} ${PILL_LINK}`}
                  >
                    {label}
                  </Link>
                );
              })}
            </div>
          ))}
        </div>
      )}
    </Panel>
  );
}
