import type { PersonDto } from '@/types/feed';
import { detailsDates } from '@/lib/vitalDates';
import { Panel } from './Panel';
import { displayGender } from './format';

export interface DetailsPanelProps {
  person: PersonDto;
}

interface DetailRow {
  label: string;
  /** null → em dash, muted (`--muted`, weight 500 — prototype `.dl-row dd.na`). */
  value: string | null;
  /** Force the muted treatment for known-empty states like `Living` / `None`. */
  na?: boolean;
}

/**
 * Details (member.html `.details-list` + #14 §4): full name, gender, Born /
 * Died from detailsDates (full dates; `Living` when deathDate is null),
 * birth place, photo Uploaded/None. Nothing here is derived — it's all the
 * person row itself.
 */
export function DetailsPanel({ person }: DetailsPanelProps) {
  const { born, died } = detailsDates(person.birthDate, person.deathDate);

  const rows: DetailRow[] = [
    { label: 'Full name', value: person.fullName },
    { label: 'Gender', value: displayGender(person.gender) },
    { label: 'Born', value: born },
    { label: 'Birth place', value: person.birthPlace?.trim() || null },
    { label: 'Died', value: died, na: died === 'Living' },
    { label: 'Photo', value: person.pictureUrl ? 'Uploaded' : 'None', na: !person.pictureUrl },
  ];

  return (
    <Panel title="Details">
      <dl className="px-[22px] pt-2 pb-[18px]">
        {rows.map((row) => (
          <div
            key={row.label}
            className="flex justify-between gap-4 border-b border-[var(--line)] py-[11px] last:border-b-0"
          >
            <dt className="text-[13.5px] text-[var(--muted)]">{row.label}</dt>
            <dd
              className={[
                'm-0 text-right text-[13.5px]',
                row.value === null || row.na
                  ? 'font-medium text-[var(--muted)]'
                  : 'font-semibold',
              ].join(' ')}
            >
              {row.value ?? '—'}
            </dd>
          </div>
        ))}
      </dl>
    </Panel>
  );
}
