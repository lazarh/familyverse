'use client';

/**
 * STUB — the real add/edit drawer (486px right panel: photo, fields, N
 * parent rows with role selects, partner picker, bio editor, footer actions)
 * is built in the screen batch (ticket #16, content from #14).
 *
 * Signature is FROZEN: the tree page and the profile page both mount this.
 */
export interface MemberDrawerProps {
  familyId: number;
  /** `add` opens an empty form; `edit` prefills from `personId`. */
  mode: 'add' | 'edit';
  /** Required in edit mode. */
  personId?: number;
  onClose: () => void;
  /** Called after a successful save/delete so mount points can refetch. */
  onSaved?: () => void;
}

export default function MemberDrawer(props: MemberDrawerProps) {
  void props;
  return null;
}
