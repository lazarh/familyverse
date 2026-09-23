"use client";

/**
 * Dialog — centred modal over the warm scrim (form.html `.scrim`):
 * `rgba(36,28,21,.42)`, card at 16px radius with the lifted shadow.
 * Escape and the ✕ close it, focus is trapped inside while open and returns
 * to the opener on close; `role="dialog" aria-modal="true"`.
 *
 * Signature note: `{ open, onClose }` matches the frozen ShareFamilyDialog
 * stub the family switcher mounts.
 */
import { useCallback, useEffect, useId, useRef } from "react";
import type { ReactNode } from "react";

export interface DialogProps {
  /** Whether the dialog is visible. */
  open: boolean;
  /** Called when the user asks to close (Esc, ✕, scrim click). */
  onClose: () => void;
  /** Dialog title (rendered in an `<h2>` at --t-h2). */
  title?: ReactNode;
  /** Optional line under the title (prototype drawer `.sub`). */
  subtitle?: ReactNode;
  /** Scrolling body content. */
  children?: ReactNode;
  /** Sticky footer actions (right-aligned by convention; use `me-auto`/`mr-auto` for a left action). */
  footer?: ReactNode;
  /** Maximum card width. @default 520 */
  maxWidth?: number | string;
  /** Hides the ✕ button (Escape and scrim click still close). */
  hideCloseButton?: boolean;
  /** Accessible name when there is no `title`. */
  "aria-label"?: string;
  /** Extra class on the card. */
  className?: string;
}

const FOCUSABLE =
  'a[href], button:not([disabled]), input:not([disabled]), textarea:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])';

/** Modal dialog.
 *
 * @example
 * <Dialog open={open} onClose={close} title="Share & manage family" footer={<Button>Invite</Button>}>
 *   …
 * </Dialog>
 */
export function Dialog({
  open,
  onClose,
  title,
  subtitle,
  children,
  footer,
  maxWidth = 520,
  hideCloseButton,
  "aria-label": ariaLabel,
  className = "",
}: DialogProps) {
  const titleId = useId();
  const cardRef = useRef<HTMLDivElement>(null);
  const openerRef = useRef<HTMLElement | null>(null);

  // Keep the latest onClose without re-running the trap effect every render.
  const onCloseRef = useRef(onClose);
  useEffect(() => {
    onCloseRef.current = onClose;
  }, [onClose]);

  const requestClose = useCallback(() => onCloseRef.current(), []);

  useEffect(() => {
    if (!open) return;

    openerRef.current = document.activeElement instanceof HTMLElement ? document.activeElement : null;

    // Focus lands on the card; Tab cycles through the focusables inside it.
    const card = cardRef.current;
    card?.focus();

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        // defaultPrevented = a Menu inside the dialog already consumed the Escape.
        if (event.defaultPrevented) return;
        event.preventDefault();
        onCloseRef.current();
        return;
      }
      if (event.key !== "Tab") return;
      const root = cardRef.current;
      if (!root) return;
      const focusables = Array.from(root.querySelectorAll<HTMLElement>(FOCUSABLE));
      if (focusables.length === 0) {
        event.preventDefault();
        return;
      }
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      const active = document.activeElement;
      if (event.shiftKey) {
        if (active === first || active === root || !root.contains(active)) {
          event.preventDefault();
          last.focus();
        }
      } else if (active === last) {
        event.preventDefault();
        first.focus();
      }
    }

    document.addEventListener("keydown", onKeyDown);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
      openerRef.current?.focus();
      openerRef.current = null;
    };
  }, [open]);

  if (!open) return null;

  const handleScrimClick = () => requestClose();

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
      {/* warm scrim (form.html) — click it to close */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[rgba(36,28,21,0.42)]"
        onClick={handleScrimClick}
      />
      <div
        ref={cardRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={title !== undefined ? titleId : undefined}
        aria-label={title !== undefined ? undefined : ariaLabel}
        tabIndex={-1}
        style={{ maxWidth: typeof maxWidth === "number" ? `${maxWidth}px` : maxWidth }}
        className={[
          "relative z-10 flex max-h-[85vh] w-full flex-col overflow-hidden rounded-[16px]",
          "border border-[var(--line)] bg-[var(--card)] shadow-[var(--shadow-lift)]",
          "focus:outline-none",
          className,
        ].join(" ")}
      >
        {(title !== undefined || !hideCloseButton) && (
          <div className="flex items-start justify-between gap-4 border-b border-[var(--line)] px-[26px] pt-[20px] pb-[16px]">
            <div className="min-w-0">
              {title !== undefined && (
                <h2 id={titleId} className="text-[20px]">
                  {title}
                </h2>
              )}
              {subtitle !== undefined && (
                <p className="mt-[3px] text-[13.5px] text-[var(--muted)]">{subtitle}</p>
              )}
            </div>
            {!hideCloseButton && (
              <button
                type="button"
                aria-label="Close"
                onClick={requestClose}
                className="flex h-8 w-8 flex-none cursor-pointer items-center justify-center rounded-[8px] border border-[var(--line)] bg-[var(--card)] text-[16px] leading-none text-[var(--ink-soft)] hover:bg-[#F4EDE3]"
              >
                ✕
              </button>
            )}
          </div>
        )}

        <div className="flex-1 overflow-y-auto px-[26px] py-[22px]">{children}</div>

        {footer !== undefined && (
          <div className="flex items-center justify-end gap-[10px] border-t border-[var(--line)] bg-[var(--card)] px-[26px] py-[16px]">
            {footer}
          </div>
        )}
      </div>
    </div>
  );
}
