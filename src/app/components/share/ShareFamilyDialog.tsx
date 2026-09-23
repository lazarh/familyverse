'use client';

/**
 * STUB — the real "Share & manage family" dialog (invite form + user list
 * with remove, replacing the old Add-User/Remove-User modals) is built in
 * the screen batch (ticket #16, structure from #13).
 *
 * Signature is FROZEN: the family switcher in AppNav mounts this.
 */
export interface ShareFamilyDialogProps {
  familyId: number;
  open: boolean;
  onClose: () => void;
}

export default function ShareFamilyDialog(props: ShareFamilyDialogProps) {
  void props;
  return null;
}
