'use client';

/**
 * PersonCard — the prototype's `.person` card (index.html): 236×96, photo or
 * monogram left, name / dates / birth place right, hover lifts 2px. Replaces
 * the old FamilyNode (byte pictures + age are gone per #14 — dates only via
 * `cardDates`, never an age).
 *
 * Click (or Enter on the focused button) navigates to the read-only profile
 * `/person/<id>` — #13: card click opens the profile, not an edit modal.
 *
 * The four invisible handles are the edge anchors: `t`/`b` for parent-child
 * lines, `l`/`r` for the partner bar.
 */
import { useRouter } from 'next/navigation';
import { Handle, Position } from 'reactflow';
import type { NodeProps } from 'reactflow';
import { Monogram } from '../ui';
import { cardDates } from '../../../lib/vitalDates';
import type { PersonCardData } from './layout';

/** Invisible handle skin — keeps reactflow's anchor geometry, drops the dots. */
const INVISIBLE_HANDLE = { background: 'transparent', border: '0' } as const;

export default function PersonCard({ data }: NodeProps<PersonCardData>) {
  const router = useRouter();
  const { person, focused } = data;

  const dates = cardDates(person.birthDate, person.deathDate);
  const place = person.birthPlace?.trim() || null;

  return (
    <>
      <Handle
        id="t"
        type="target"
        position={Position.Top}
        isConnectable={false}
        style={INVISIBLE_HANDLE}
      />
      <Handle
        id="b"
        type="source"
        position={Position.Bottom}
        isConnectable={false}
        style={INVISIBLE_HANDLE}
      />
      <Handle
        id="l"
        type="target"
        position={Position.Left}
        isConnectable={false}
        style={INVISIBLE_HANDLE}
      />
      <Handle
        id="r"
        type="source"
        position={Position.Right}
        isConnectable={false}
        style={INVISIBLE_HANDLE}
      />

      <button
        type="button"
        onClick={() => router.push(`/person/${person.id}`)}
        className={[
          'flex h-[96px] w-[236px] cursor-pointer items-center gap-[13px] rounded-[12px]',
          'border bg-[var(--card)] p-[14px_16px] text-left',
          'shadow-[var(--shadow)] transition-[box-shadow,transform,border-color] duration-[120ms] ease-out',
          'hover:-translate-y-[2px] hover:border-[var(--line-strong)] hover:shadow-[var(--shadow-lift)]',
          focused
            ? 'border-[var(--line-strong)] ring-2 ring-[var(--clay)]'
            : 'border-[var(--line)]',
        ].join(' ')}
      >
        {person.pictureUrl ? (
          /* eslint-disable-next-line @next/next/no-img-element -- pictureUrl is a
             same-origin proxy URL; next/image would need remote-pattern config
             that this ticket may not touch. */
          <img
            src={person.pictureUrl}
            alt=""
            className="h-[44px] w-[44px] flex-none rounded-full object-cover shadow-[inset_0_0_0_1px_rgba(255,255,255,0.22)]"
          />
        ) : (
          <Monogram name={person.fullName} personId={person.id} size={44} decorative />
        )}
        <span className="min-w-0 flex-1">
          <span className="block truncate text-[15.5px] leading-[1.25] font-650 tracking-[-0.01em] text-[var(--ink)]">
            {person.fullName}
          </span>
          {dates && (
            <span className="mt-[2px] block truncate text-[13.5px] leading-[1.4] text-[var(--ink-soft)]">
              {dates}
            </span>
          )}
          {place && (
            <span className="mt-[1px] block truncate text-[12px] leading-[1.4] text-[var(--muted)]">
              {place}
            </span>
          )}
        </span>
      </button>
    </>
  );
}
