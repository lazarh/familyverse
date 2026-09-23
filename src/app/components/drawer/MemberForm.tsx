'use client';

/**
 * MemberForm — the add/edit form inside the 486px MemberDrawer (form.html,
 * field set from #14, submit contract from #15).
 *
 * Body: photo slot → full name → gender segmented → Living switch + Born/Died
 * → birth place → bio editor → repeatable parent rows (picker + 5-role
 * select) and partner rows (picker + 3-kind select) → footer.
 *
 * Submit contract (#15):
 *  - add    → POST /api/families/[familyId]/people (multipart)
 *  - edit   → PATCH /api/people/[id] (multipart, FormData.has semantics:
 *             '' clears dates/place/bio; `parents`/`partnerships` are ALWAYS
 *             the desired FULL SETS; `removePicture=true` only when the
 *             server-side picture should go)
 *  - edit footer also carries the two distinct destructive actions from #14:
 *    "Remove from family" (membership only) and "Delete person" (everything,
 *    behind a confirm dialog) — never collapsed into one.
 *
 * `buildPersonFormData` / `normalizeGender` are exported for tests.
 */
import { useEffect, useId, useRef, useState } from 'react';
import type { ChangeEvent, FormEvent } from 'react';
import { ApiError, apiFetch } from '../../../lib/api';
import type { ParentRole, PartnershipKind, PeopleFeed, PersonDto, PersonMutationResult } from '../../../types/feed';
import { PARENT_ROLES, PARTNERSHIP_KINDS } from '../../../types/feed';
import { parentsOf, partnersOf } from '../../../lib/derive';
import { PICTURE_MAX_BYTES, validatePicture } from '../../../lib/pictures';
import { Button, Dialog, Field, Input, Segmented, Switch, inputClass } from '../ui';
import { BioEditor } from './BioEditor';
import { EMPTY_SLOT_CLASS, PersonPicker } from './PersonPicker';

/* ------------------------------------------------------------------ *
 * Options & labels (#14 — deliberate value changes for gender)
 * ------------------------------------------------------------------ */

export const GENDER_OPTIONS = [
  { value: 'Female', label: 'Female' },
  { value: 'Male', label: 'Male' },
  { value: 'Non-binary', label: 'Non-binary' },
  { value: 'Not said', label: 'Not said' },
] as const;

/**
 * Map any stored gender (legacy `Other` / `Unknown` / `other` casing) onto
 * the four segmented values — `Other`/`Unknown` display as `Not said` (#14).
 */
export function normalizeGender(raw: string | null | undefined): string {
  const token = (raw ?? '').trim().toLowerCase();
  if (token === 'female') return 'Female';
  if (token === 'male') return 'Male';
  if (token === 'non-binary' || token === 'nonbinary' || token === 'non binary') {
    return 'Non-binary';
  }
  return 'Not said';
}

const ROLE_LABELS: Record<ParentRole, string> = {
  BIOLOGICAL: 'Biological',
  ADOPTIVE: 'Adoptive',
  STEP: 'Step',
  FOSTER: 'Foster',
  LEGAL_GUARDIAN: 'Legal guardian',
};

const KIND_LABELS: Record<PartnershipKind, string> = {
  MARRIED: 'Married',
  CIVIL_UNION: 'Civil union',
  COHABITATION: 'Cohabitation',
};

/* ------------------------------------------------------------------ *
 * Rows + payload building (pure — unit-tested)
 * ------------------------------------------------------------------ */

export interface ParentRow {
  /** React/diff identity (row keys are never sent). */
  key: number;
  parentId: number | null;
  role: ParentRole;
}

export interface PartnerRow {
  key: number;
  personId: number | null;
  kind: PartnershipKind;
}

let rowSeq = 0;
function nextRowKey(): number {
  rowSeq += 1;
  return rowSeq;
}

export interface PersonPayload {
  fullName: string;
  gender: string;
  birthDate: string;
  /** Living ⇒ '' (clears any stored date — the Living switch is pure UI sugar). */
  deathDate: string;
  birthPlace: string;
  bio: string;
  parents: ParentRow[];
  partnerships: PartnerRow[];
  /** New photo file, if one was chosen. */
  picture?: File | null;
  /** True when an existing server-side photo should be deleted. */
  removePicture?: boolean;
}

/**
 * The multipart body for POST (add) and PATCH (edit) — same key set for
 * both; #15's FormData.has contract means every key present is applied
 * (`''` clears dates/place/bio, `parents`/`partnerships` are full sets).
 */
export function buildPersonFormData(payload: PersonPayload): FormData {
  const form = new FormData();
  form.set('fullName', payload.fullName.trim());
  form.set('gender', payload.gender);
  form.set('birthDate', payload.birthDate);
  form.set('deathDate', payload.deathDate);
  form.set('birthPlace', payload.birthPlace.trim());
  form.set('bio', payload.bio);
  form.set(
    'parents',
    JSON.stringify(
      payload.parents
        .filter((row): row is ParentRow & { parentId: number } => row.parentId !== null)
        .map((row) => ({ parentId: row.parentId, role: row.role })),
    ),
  );
  form.set(
    'partnerships',
    JSON.stringify(
      payload.partnerships
        .filter((row): row is PartnerRow & { personId: number } => row.personId !== null)
        .map((row) => ({ personId: row.personId, kind: row.kind })),
    ),
  );
  if (payload.picture) form.set('picture', payload.picture);
  if (payload.removePicture) form.set('removePicture', 'true');
  return form;
}

/** ISO datetime / wire string → `<input type="date">` value. */
function inputDate(value: string | null | undefined): string {
  return value ? value.slice(0, 10) : '';
}

/** Inline error copy from an apiFetch throw ({ status, code, message }). */
function errorMessage(error: unknown): string {
  if (error instanceof ApiError) {
    if (error.code === 'PICTURE_INVALID_TYPE') return 'Picture must be a JPEG, PNG or WebP image.';
    if (error.code === 'PICTURE_TOO_LARGE') return 'Picture must be 5 MB or smaller.';
    return error.message;
  }
  if (error instanceof TypeError) return 'Could not reach the server — check your connection and try again.';
  return 'Something went wrong. Please try again.';
}

function initialParentRows(person: PersonDto | null, feed: PeopleFeed): ParentRow[] {
  if (!person) return [];
  return parentsOf(person.id, feed).map(({ person: parent, role }) => ({
    key: nextRowKey(),
    parentId: parent.id,
    role,
  }));
}

function initialPartnerRows(person: PersonDto | null, feed: PeopleFeed): PartnerRow[] {
  if (!person) return [];
  return partnersOf(person.id, feed).map(({ person: other, partnership }) => ({
    key: nextRowKey(),
    personId: other.id,
    kind: partnership.kind,
  }));
}

/* ------------------------------------------------------------------ *
 * Component
 * ------------------------------------------------------------------ */

export interface MemberFormProps {
  familyId: number;
  mode: 'add' | 'edit';
  /** Required in edit mode. */
  personId?: number;
  /** The family feed — person pickers search over it (fetched by the drawer). */
  feed: PeopleFeed;
  /** Prefetched person (edit mode; null in add mode). */
  person: PersonDto | null;
  onClose: () => void;
  /** Called after a successful save / remove / delete. */
  onSaved?: () => void;
}

export function MemberForm({
  familyId,
  mode,
  personId,
  feed,
  person,
  onClose,
  onSaved,
}: MemberFormProps) {
  const uid = useId();

  const [fullName, setFullName] = useState(person?.fullName ?? '');
  const [gender, setGender] = useState(() => normalizeGender(person?.gender));
  const [birthDate, setBirthDate] = useState(() => inputDate(person?.birthDate));
  const [deathDate, setDeathDate] = useState(() => inputDate(person?.deathDate));
  const [living, setLiving] = useState(() => person === null || person.deathDate === null);
  const [birthPlace, setBirthPlace] = useState(person?.birthPlace ?? '');
  const [bio, setBio] = useState(person?.bio ?? '');
  const [parents, setParents] = useState<ParentRow[]>(() => initialParentRows(person, feed));
  const [partnerships, setPartnerships] = useState<PartnerRow[]>(() =>
    initialPartnerRows(person, feed),
  );

  const [pictureFile, setPictureFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(person?.pictureUrl ?? null);
  const [removePicture, setRemovePicture] = useState(false);
  const objectUrlRef = useRef<string | null>(null);

  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);

  const selfId = person?.id;
  const isEdit = mode === 'edit' && personId !== undefined;

  // Revoke the local preview URL when the form goes away.
  useEffect(
    () => () => {
      if (objectUrlRef.current) URL.revokeObjectURL(objectUrlRef.current);
    },
    [],
  );

  /* ----- picture ----- */

  async function handlePictureChange(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    event.target.value = ''; // allow re-picking the same file later
    if (!file) return;
    if (file.size > PICTURE_MAX_BYTES) {
      setError('Picture must be 5 MB or smaller.');
      return;
    }
    let bytes: Uint8Array;
    try {
      bytes = new Uint8Array(await file.arrayBuffer());
    } catch {
      setError('That file could not be read — try another image.');
      return;
    }
    const check = validatePicture(bytes);
    if (!check.ok) {
      setError(check.message);
      return;
    }
    setError(null);
    if (objectUrlRef.current) URL.revokeObjectURL(objectUrlRef.current);
    const url = URL.createObjectURL(file);
    objectUrlRef.current = url;
    setPreviewUrl(url);
    setPictureFile(file);
    setRemovePicture(false);
  }

  function handleRemovePicture() {
    if (objectUrlRef.current) {
      URL.revokeObjectURL(objectUrlRef.current);
      objectUrlRef.current = null;
    }
    setPictureFile(null);
    setPreviewUrl(null);
    // Only tell the server to unlink when it actually has a picture.
    setRemovePicture((person?.pictureUrl ?? null) !== null);
  }

  /* ----- rows ----- */

  const parentExclusions = (rowKey: number): number[] => [
    ...(selfId !== undefined ? [selfId] : []),
    ...parents
      .filter((row) => row.key !== rowKey && row.parentId !== null)
      .map((row) => row.parentId as number),
  ];

  const partnerExclusions = (rowKey: number): number[] => [
    ...(selfId !== undefined ? [selfId] : []),
    ...partnerships
      .filter((row) => row.key !== rowKey && row.personId !== null)
      .map((row) => row.personId as number),
  ];

  function addParent() {
    setParents((rows) => [...rows, { key: nextRowKey(), parentId: null, role: 'BIOLOGICAL' }]);
  }

  function addPartner() {
    setPartnerships((rows) => [...rows, { key: nextRowKey(), personId: null, kind: 'MARRIED' }]);
  }

  /* ----- actions ----- */

  function validate(): string | null {
    if (fullName.trim() === '') return 'Full name is required.';
    const missingParent = parents.findIndex((row) => row.parentId === null);
    if (missingParent !== -1) {
      return `Choose a person for Parent ${missingParent + 1}, or remove the row.`;
    }
    const missingPartner = partnerships.findIndex((row) => row.personId === null);
    if (missingPartner !== -1) {
      return `Choose a person for Partner ${missingPartner + 1}, or remove the row.`;
    }
    return null;
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const problem = validate();
    if (problem) {
      setError(problem);
      return;
    }
    setError(null);
    setSaving(true);
    try {
      const body = buildPersonFormData({
        fullName,
        gender,
        birthDate,
        // Living on ⇒ the death date is cleared (#14 UI sugar over the model).
        deathDate: living ? '' : deathDate,
        birthPlace,
        bio,
        parents,
        partnerships,
        picture: pictureFile,
        removePicture: removePicture && pictureFile === null,
      });
      if (isEdit) {
        await apiFetch<PersonMutationResult>(`/api/people/${personId}`, {
          method: 'PATCH',
          body,
        });
      } else {
        await apiFetch<PersonMutationResult>(`/api/families/${familyId}/people`, {
          method: 'POST',
          body,
        });
      }
      onSaved?.();
      onClose();
    } catch (caught) {
      setError(errorMessage(caught));
      setSaving(false);
    }
  }

  /** Membership only: the person survives (maybe with other memberships). */
  async function removeFromFamily() {
    setError(null);
    setSaving(true);
    try {
      await apiFetch(`/api/families/${familyId}/people/${personId}`, { method: 'DELETE' });
      onSaved?.();
      onClose();
    } catch (caught) {
      setError(errorMessage(caught));
      setSaving(false);
    }
  }

  /** Whole person: cascades their edges, memberships and photo (#14). */
  async function deletePersonEntirely() {
    setError(null);
    setSaving(true);
    try {
      await apiFetch(`/api/people/${personId}`, { method: 'DELETE' });
      setConfirmDelete(false);
      onSaved?.();
      onClose();
    } catch (caught) {
      setError(errorMessage(caught));
      setConfirmDelete(false);
      setSaving(false);
    }
  }

  /* ----- render ----- */

  const photoId = `${uid}-photo`;
  const nameId = `${uid}-name`;
  const birthId = `${uid}-birth`;
  const deathId = `${uid}-death`;
  const placeId = `${uid}-place`;
  const bioId = `${uid}-bio`;

  return (
    <form onSubmit={handleSubmit} className="flex min-h-0 flex-1 flex-col">
      <div className="min-h-0 flex-1 overflow-y-auto px-[26px] pt-[22px] pb-2">
        {error !== null && (
          <p
            role="alert"
            className="mb-[18px] rounded-[8px] border border-[#E4C4BE] bg-[#F8ECEA] px-3 py-2 text-[13.5px] text-[var(--brick)]"
          >
            {error}
          </p>
        )}

        {/* photo row (form.html .photo-row) */}
        <div className="mb-5 flex items-center gap-[18px] border-b border-[var(--line)] pb-5">
          <input
            id={photoId}
            type="file"
            accept="image/jpeg,image/png,image/webp"
            className="sr-only"
            onChange={handlePictureChange}
          />
          {previewUrl !== null ? (
            <label
              htmlFor={photoId}
              title="Change photo"
              className="relative h-[84px] w-[84px] flex-none cursor-pointer has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-[var(--clay)] has-[:focus-visible]:outline-offset-2"
            >
              {/* eslint-disable-next-line @next/next/no-img-element -- object-URL / same-origin proxy preview: next/image can't load blob: URLs */}
              <img
                src={previewUrl}
                alt=""
                className="h-[84px] w-[84px] rounded-full border border-[var(--line)] object-cover shadow-[var(--shadow)]"
              />
            </label>
          ) : (
            <label
              htmlFor={photoId}
              className={[
                'flex h-[84px] w-[84px] flex-none cursor-pointer flex-col items-center justify-center gap-[3px]',
                'rounded-full border-[1.5px] border-dashed border-[var(--line-strong)] bg-[#FAF5EC]',
                'text-center text-[10.5px] font-650 text-[var(--muted)]',
                'hover:border-[var(--clay)] hover:text-[var(--clay)]',
                'has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-[var(--clay)] has-[:focus-visible]:outline-offset-2',
              ].join(' ')}
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                aria-hidden="true"
              >
                <path d="M4 8h3l1.5-2h7L17 8h3v11H4z" />
                <circle cx="12" cy="13" r="3.2" />
              </svg>
              Add photo
            </label>
          )}
          <div className="min-w-0 text-[13.5px] text-[var(--muted)]">
            <b className="mb-[3px] block text-[15px] font-650 text-[var(--ink)]">
              A face makes the tree readable
            </b>
            Optional — initials are used until a photo is uploaded. JPG, PNG or WebP, up to
            5&nbsp;MB.
            {previewUrl !== null && (
              <button
                type="button"
                onClick={handleRemovePicture}
                className="mt-1 block cursor-pointer border-0 bg-transparent p-0 text-[13.5px] font-650 text-[var(--brick)] hover:underline"
              >
                Remove picture
              </button>
            )}
          </div>
        </div>

        {/* full name */}
        <Field label="Full name" tag="req" htmlFor={nameId}>
          <Input
            id={nameId}
            value={fullName}
            onChange={(event) => setFullName(event.target.value)}
            autoComplete="off"
          />
        </Field>

        {/* gender (#14: deliberate Female/Male/Non-binary/Not said change) */}
        <Field label="Gender" tag="req">
          <Segmented
            options={[...GENDER_OPTIONS]}
            value={gender}
            onChange={setGender}
            name={`${uid}-gender`}
            aria-label="Gender"
          />
        </Field>

        {/* Living switch — UI sugar over deathDate (no stored flag, #14) */}
        <div className="mb-[18px] flex items-center justify-between gap-4 rounded-[12px] border border-[var(--line)] bg-[#FAF5EC] px-[14px] py-3">
          <div className="min-w-0">
            <div className="text-[14px] font-650 text-[var(--ink)]">Living</div>
            <div className="mt-[2px] text-[12px] text-[var(--muted)]">
              On by default — switch off to record a date of death.
            </div>
          </div>
          <Switch
            checked={living}
            onCheckedChange={(next) => {
              setLiving(next);
              if (next) setDeathDate(''); // ON ⇒ death date cleared
            }}
            aria-label="Living"
          />
        </div>

        {/* Born / Died */}
        <div className="grid grid-cols-2 gap-[14px]">
          <div className="min-w-0">
            <Field label="Born" htmlFor={birthId}>
              <Input
                id={birthId}
                type="date"
                value={birthDate}
                onChange={(event) => setBirthDate(event.target.value)}
              />
            </Field>
          </div>
          <div className="min-w-0">
            <Field label="Died" htmlFor={deathId}>
              <Input
                id={deathId}
                type="date"
                value={deathDate}
                disabled={living}
                onChange={(event) => setDeathDate(event.target.value)}
              />
            </Field>
          </div>
        </div>

        {/* birth place */}
        <Field
          label="Birth place"
          tag="opt"
          htmlFor={placeId}
          hint="Free text today — structured places may come later."
        >
          <Input
            id={placeId}
            value={birthPlace}
            onChange={(event) => setBirthPlace(event.target.value)}
            autoComplete="off"
          />
        </Field>

        {/* bio (toolbar + sanitized preview in BioEditor) */}
        <Field
          label="Bio"
          tag="opt"
          htmlFor={bioId}
          hint={
            <>
              Bold, italics, headings, lists, quotes, links — markdown, rendered as prose on the
              profile.
            </>
          }
        >
          <BioEditor id={bioId} value={bio} onChange={setBio} />
        </Field>

        {/* parents & partners */}
        <p className="mt-6 mb-3 border-t border-[var(--line)] pt-[18px] text-[12px] font-bold tracking-[0.07em] text-[var(--muted)] uppercase">
          Parents &amp; partners
        </p>

        {parents.map((row, index) => (
          <Field key={row.key} label={`Parent ${index + 1}`} tag="opt">
            <div className="flex items-center gap-2">
              <div className="min-w-0 flex-1">
                <PersonPicker
                  people={feed.people}
                  value={row.parentId}
                  onChange={(id) =>
                    setParents((rows) =>
                      rows.map((r) => (r.key === row.key ? { ...r, parentId: id } : r)),
                    )
                  }
                  exclude={parentExclusions(row.key)}
                  emptyLabel="+ Find a parent"
                  label={`Parent ${index + 1}`}
                />
              </div>
              <div className="w-[136px] shrink-0">
                <select
                  value={row.role}
                  onChange={(event) =>
                    setParents((rows) =>
                      rows.map((r) =>
                        r.key === row.key
                          ? { ...r, role: event.target.value as ParentRole }
                          : r,
                      ),
                    )
                  }
                  aria-label={`Role of parent ${index + 1}`}
                  className={inputClass}
                >
                  {PARENT_ROLES.map((role) => (
                    <option key={role} value={role}>
                      {ROLE_LABELS[role]}
                    </option>
                  ))}
                </select>
              </div>
              <button
                type="button"
                aria-label={`Remove parent ${index + 1}`}
                onClick={() => setParents((rows) => rows.filter((r) => r.key !== row.key))}
                className="flex h-8 w-8 shrink-0 cursor-pointer items-center justify-center rounded-[8px] border border-[var(--line)] bg-[var(--card)] text-[16px] leading-none text-[var(--ink-soft)] hover:bg-[#F4EDE3]"
              >
                ✕
              </button>
            </div>
          </Field>
        ))}

        <button type="button" onClick={addParent} className={EMPTY_SLOT_CLASS}>
          + Add parent
        </button>
        <p className="mt-[5px] mb-[18px] text-[12px] text-[var(--muted)]">
          Picking parents places the card in the tree automatically — no drag-and-drop needed.
        </p>

        {partnerships.map((row, index) => (
          <Field key={row.key} label={`Partner ${index + 1}`} tag="opt">
            <div className="flex items-center gap-2">
              <div className="min-w-0 flex-1">
                <PersonPicker
                  people={feed.people}
                  value={row.personId}
                  onChange={(id) =>
                    setPartnerships((rows) =>
                      rows.map((r) => (r.key === row.key ? { ...r, personId: id } : r)),
                    )
                  }
                  exclude={partnerExclusions(row.key)}
                  emptyLabel="+ Link an existing person as partner"
                  label={`Partner ${index + 1}`}
                />
              </div>
              <div className="w-[136px] shrink-0">
                <select
                  value={row.kind}
                  onChange={(event) =>
                    setPartnerships((rows) =>
                      rows.map((r) =>
                        r.key === row.key
                          ? { ...r, kind: event.target.value as PartnershipKind }
                          : r,
                      ),
                    )
                  }
                  aria-label={`Kind of partnership ${index + 1}`}
                  className={inputClass}
                >
                  {PARTNERSHIP_KINDS.map((kind) => (
                    <option key={kind} value={kind}>
                      {KIND_LABELS[kind]}
                    </option>
                  ))}
                </select>
              </div>
              <button
                type="button"
                aria-label={`Remove partner ${index + 1}`}
                onClick={() => setPartnerships((rows) => rows.filter((r) => r.key !== row.key))}
                className="flex h-8 w-8 shrink-0 cursor-pointer items-center justify-center rounded-[8px] border border-[var(--line)] bg-[var(--card)] text-[16px] leading-none text-[var(--ink-soft)] hover:bg-[#F4EDE3]"
              >
                ✕
              </button>
            </div>
          </Field>
        ))}

        <button type="button" onClick={addPartner} className={EMPTY_SLOT_CLASS}>
          + Add partner
        </button>
        <div className="h-4" />
      </div>

      {/* footer (form.html .drawer-foot): destructive pair left, Cancel + the
          drawer's ONE primary right */}
      <div className="flex items-center gap-[10px] border-t border-[var(--line)] bg-[var(--card)] px-[26px] py-4">
        {isEdit && (
          <>
            <Button
              variant="danger"
              onClick={removeFromFamily}
              disabled={saving}
              title="Remove this person from this family — they stay in Familyverse"
            >
              Remove from family
            </Button>
            <Button
              variant="ghost"
              className="text-[var(--brick)] hover:bg-[#F8ECEA]"
              onClick={() => setConfirmDelete(true)}
              disabled={saving}
              title="Delete this person entirely"
            >
              Delete person
            </Button>
          </>
        )}
        <span className="flex-1" />
        <Button variant="ghost" onClick={onClose} disabled={saving}>
          Cancel
        </Button>
        <Button variant="primary" size="lg" type="submit" disabled={saving}>
          {saving ? 'Saving…' : 'Save member'}
        </Button>
      </div>

      {/* Delete person — whole-person semantics, confirm step (#14 decision 3) */}
      <Dialog
        open={confirmDelete}
        onClose={() => setConfirmDelete(false)}
        title="Delete this person?"
        footer={
          <>
            <Button variant="ghost" onClick={() => setConfirmDelete(false)} disabled={saving}>
              Cancel
            </Button>
            <Button variant="danger" onClick={deletePersonEntirely} disabled={saving}>
              {saving ? 'Deleting…' : 'Delete person'}
            </Button>
          </>
        }
      >
        <p className="text-[15px] text-[var(--ink-soft)]">
          <span className="font-650 text-[var(--ink)]">{fullName}</span> will be removed from
          Familyverse entirely — their relationships, memberships and photo go with them. This
          cannot be undone.
        </p>
        <p className="mt-3 text-[13.5px] text-[var(--muted)]">
          To keep the person but take them out of this family, close this and use{' '}
          <span className="font-650">Remove from family</span> instead.
        </p>
      </Dialog>
    </form>
  );
}
