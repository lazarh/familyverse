import type { PeopleFeed, PersonDto } from '@/types/feed';
import { Button, Chip, Monogram } from '@/app/components/ui';
import { childOfChip, generationOf } from '@/lib/derive';
import { profileVital } from '@/lib/vitalDates';
import { displayGender } from './format';

export interface ProfileHeaderProps {
  person: PersonDto;
  /** The family feed every value on this screen is derived from. */
  feed: PeopleFeed;
  /** Opens the edit drawer — the screen's ONE primary action. */
  onEdit: () => void;
}

/** The prototype's pencil (member.html Edit profile). */
const PENCIL = (
  <svg
    width="15"
    height="15"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M12 20h9" />
    <path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4Z" />
  </svg>
);

/**
 * The profile card (member.html `.profile`): 104px photo-or-monogram on the
 * prototype's warm ring, display-size name, vital line, origin line, chips
 * (Living ⇔ deathDate null — no stored flag, #14), actions top-right.
 */
export function ProfileHeader({ person, feed, onEdit }: ProfileHeaderProps) {
  const vital = profileVital(person.birthDate, person.deathDate);
  const gender = displayGender(person.gender);
  const place = person.birthPlace?.trim() || null;
  const origin = [place, gender].filter(Boolean).join(' · ');
  const childOf = childOfChip(person, feed);

  return (
    <section className="relative mb-[22px] flex items-center gap-6 overflow-hidden rounded-[16px] border border-[var(--line)] bg-[var(--card)] px-7 py-[26px] shadow-[var(--shadow)]">
      {/* the prototype's 5px clay edge */}
      <span aria-hidden="true" className="absolute inset-y-0 left-0 w-[5px] bg-[var(--clay)]" />

      <span className="relative flex-none rounded-full shadow-[0_0_0_5px_#F6EFE5]">
        {person.pictureUrl ? (
          // Same-origin, cookie-authed proxy (#15) — next/image's optimizer
          // would fetch it without the session cookie, so a plain img it is.
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={person.pictureUrl}
            alt=""
            width={104}
            height={104}
            className="h-[104px] w-[104px] rounded-full object-cover"
          />
        ) : (
          <Monogram name={person.fullName} personId={person.id} size={104} decorative />
        )}
      </span>

      <div className="min-w-0 flex-1">
        <h1 className="text-[34px] leading-[1.15] tracking-[-0.02em]">{person.fullName}</h1>
        {vital !== null && <p className="mt-1.5 text-[15px] text-[var(--ink-soft)]">{vital}</p>}
        {origin !== '' && <p className="mt-[3px] text-[13.5px] text-[var(--muted)]">{origin}</p>}
        <div className="mt-3 flex flex-wrap gap-2">
          {/* No stored living flag: the chip exists exactly when deathDate is null (#14). */}
          {person.deathDate === null && (
            <Chip variant="living" dot>
              Living
            </Chip>
          )}
          {childOf !== null && <Chip>{childOf}</Chip>}
          <Chip>Generation {generationOf(person.id, feed)}</Chip>
        </div>
      </div>

      <div className="flex flex-none items-start gap-2.5 self-start">
        <Button onClick={onEdit}>
          {PENCIL}
          Edit profile
        </Button>
        <Button variant="ghost" href={`/?focus=${person.id}`}>
          ← Back to tree
        </Button>
      </div>
    </section>
  );
}
