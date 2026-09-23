"use client";

/**
 * Menu — the rounded dropdown panel under a pill/avatar trigger (prototype
 * index.html `.menu`). React-controlled on purpose (NOT `<details>`): screens
 * get programmatic control via `open`/`onOpenChange`.
 *
 * Behaviour: click trigger toggles; click outside or Escape closes; Escape and
 * item activation return focus to the trigger; ArrowUp/ArrowDown rove between
 * items. ARIA: trigger has `aria-haspopup="menu"`/`aria-expanded`, panel is
 * `role="menu"` with `MenuGroup` → `role="group"` and items `role="menuitem"`.
 *
 * The trigger is a transparent shell — render the pill/avatar styles either on
 * `children` or on `triggerClassName`. Chevrons can react to state with
 * `group-data-[open=true]:rotate-180` (the wrapper carries `group` + `data-open`).
 */
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import type { KeyboardEvent, MouseEvent, ReactNode } from "react";

/* ------------------------------------------------------------------ *
 * Keyboard helper — the component wires this up; exported so the
 * Escape/arrow contract is unit-testable without a DOM.
 * ------------------------------------------------------------------ */

export interface MenuKeyHandlers {
  /** Close the menu (called on Escape). */
  close: () => void;
  /** Focus the next item (ArrowDown). */
  focusNext?: () => void;
  /** Focus the previous item (ArrowUp). */
  focusPrev?: () => void;
}

/** Maps menu keys to actions: Escape → close, ArrowDown/ArrowUp → rove, everything else ignored. */
export function handleMenuKeyDown(key: string, handlers: MenuKeyHandlers): void {
  if (key === "Escape") {
    handlers.close();
  } else if (key === "ArrowDown") {
    handlers.focusNext?.();
  } else if (key === "ArrowUp") {
    handlers.focusPrev?.();
  }
}

/* ------------------------------------------------------------------ *
 * Context: lets MenuItem close the menu it lives in.
 * ------------------------------------------------------------------ */

interface MenuContextValue {
  /** Closes the menu and returns focus to the trigger. */
  close: () => void;
}

const MenuContext = createContext<MenuContextValue | null>(null);

/* ------------------------------------------------------------------ *
 * Menu
 * ------------------------------------------------------------------ */

export interface MenuProps {
  /** Trigger content — this is what renders as the pill / avatar / summary. */
  children: ReactNode;
  /** Panel contents: `MenuGroup`, `MenuItem` and `MenuSeparator` elements. */
  panel: ReactNode;
  /** Which edge of the trigger the panel aligns to. @default 'left' */
  align?: "left" | "right";
  /** Controlled open state. Leave undefined for uncontrolled use. */
  open?: boolean;
  /** Initial open state when uncontrolled. @default false */
  defaultOpen?: boolean;
  /** Called whenever the menu wants to change open state. */
  onOpenChange?: (open: boolean) => void;
  /** Extra class for the trigger button — put pill/avatar styles here or on `children`. */
  triggerClassName?: string;
  /** Accessible name shared by trigger and panel (e.g. "Family switcher"). */
  label?: string;
  /** Extra class on the positioning wrapper. */
  className?: string;
}

/**
 * Dropdown menu.
 *
 * @example
 * <Menu label="Family switcher" triggerClassName={pillClasses} panel={<>
 *   <MenuGroup label="Switch family">
 *     <MenuItem active hint="7 people">The Kessler Family</MenuItem>
 *   </MenuGroup>
 * </>}>
 *   The Kessler Family
 * </Menu>
 */
export function Menu({
  children,
  panel,
  align = "left",
  open,
  defaultOpen = false,
  onOpenChange,
  triggerClassName = "",
  label,
  className = "",
}: MenuProps) {
  const [internalOpen, setInternalOpen] = useState(defaultOpen);
  const isControlled = open !== undefined;
  const isOpen = isControlled ? open : internalOpen;

  const rootRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  const setMenuOpen = useCallback(
    (next: boolean) => {
      if (open === undefined) setInternalOpen(next);
      onOpenChange?.(next);
    },
    [open, onOpenChange],
  );

  /** Closes and hands focus back to the trigger (Escape / item activation). */
  const closeAndRefocus = useCallback(() => {
    setMenuOpen(false);
    triggerRef.current?.focus();
  }, [setMenuOpen]);

  // Click outside closes (pointerdown so it fires before the click moves focus).
  useEffect(() => {
    if (!isOpen) return;
    function onPointerDown(event: PointerEvent) {
      const target = event.target;
      if (target instanceof Node && rootRef.current && !rootRef.current.contains(target)) {
        setMenuOpen(false);
      }
    }
    document.addEventListener("pointerdown", onPointerDown);
    return () => document.removeEventListener("pointerdown", onPointerDown);
  }, [isOpen, setMenuOpen]);

  /** Roving focus among `[role="menuitem"]` descendants of the panel, cyclically. */
  const focusItemAt = useCallback((delta: 1 | -1) => {
    const panel = panelRef.current;
    if (!panel) return;
    const items = Array.from(
      panel.querySelectorAll<HTMLElement>('[role="menuitem"]:not([aria-disabled="true"])'),
    );
    if (items.length === 0) return;
    const active = document.activeElement;
    const current = active instanceof HTMLElement ? items.indexOf(active) : -1;
    const nextIndex =
      current === -1
        ? delta === 1
          ? 0
          : items.length - 1
        : (current + delta + items.length) % items.length;
    items[nextIndex].focus();
  }, []);

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    handleMenuKeyDown(event.key, {
      close: () => {
        if (!isOpen) return;
        // preventDefault marks the Escape so a wrapping Dialog can skip its own close.
        event.preventDefault();
        event.stopPropagation();
        closeAndRefocus();
      },
      focusNext: () => {
        if (!isOpen) return;
        event.preventDefault();
        focusItemAt(1);
      },
      focusPrev: () => {
        if (!isOpen) return;
        event.preventDefault();
        focusItemAt(-1);
      },
    });
  };

  const menuContext: MenuContextValue = { close: closeAndRefocus };

  return (
    <MenuContext.Provider value={menuContext}>
      <div
        ref={rootRef}
        className={`group relative inline-block ${className}`}
        data-open={isOpen}
        onKeyDown={handleKeyDown}
      >
        <button
          type="button"
          ref={triggerRef}
          className={`m-0 appearance-none cursor-pointer border-0 bg-transparent p-0 text-inherit ${triggerClassName}`}
          aria-haspopup="menu"
          aria-expanded={isOpen}
          aria-label={label}
          onClick={() => setMenuOpen(!isOpen)}
        >
          {children}
        </button>

        {isOpen && (
          <div
            ref={panelRef}
            role="menu"
            aria-label={label}
            className={[
              "absolute top-[calc(100%_+_8px)] z-50 min-w-[264px] rounded-[12px] border border-[var(--line)]",
              "bg-[var(--card)] p-[6px] shadow-[var(--shadow-lift)]",
              align === "right" ? "right-0" : "left-0",
            ].join(" ")}
          >
            {panel}
          </div>
        )}
      </div>
    </MenuContext.Provider>
  );
}

/* ------------------------------------------------------------------ *
 * MenuGroup — uppercase micro-heading with optional sub-line.
 * ------------------------------------------------------------------ */

export interface MenuGroupProps {
  /** Micro-heading text (uppercased by CSS, 12px/700/0.07em). */
  label: ReactNode;
  /** Normal-case sub-line under the heading (prototype: "Maya Kessler · maya@…"). */
  sub?: ReactNode;
  /** The group's items. */
  children?: ReactNode;
  /** Extra class on the group wrapper (also carries `role="group"`). */
  className?: string;
}

/** Grouped menu section: heading + items, exposed to screen readers as `role="group"`. */
export function MenuGroup({ label, sub, children, className = "" }: MenuGroupProps) {
  return (
    <div
      role="group"
      aria-label={typeof label === "string" ? label : undefined}
      className={className}
    >
      <div className="px-[11px] pt-[9px] pb-[7px] text-[12px] font-bold tracking-[0.07em] text-[var(--muted)] uppercase">
        {label}
        {sub !== undefined && (
          <span className="mt-[2px] block text-[13.5px] font-medium tracking-normal text-[var(--ink-soft)] normal-case">
            {sub}
          </span>
        )}
      </div>
      {children}
    </div>
  );
}

/* ------------------------------------------------------------------ *
 * MenuItem
 * ------------------------------------------------------------------ */

export interface MenuItemProps {
  /** Item label. */
  children?: ReactNode;
  /** When set, renders an `<a href>` (prototype navigation items) instead of a `<button>`. */
  href?: string;
  /** Current item: 650 weight + a clay ✓ tick (unless `leading` supplies its own). */
  active?: boolean;
  /** Right-aligned micro hint ("7 people", "GEDCOM · CSV"). */
  hint?: ReactNode;
  /** Destructive item: brick text with pale-red hover. */
  danger?: boolean;
  /** Content rendered before the label (icon/tick). Include your own spacing. */
  leading?: ReactNode;
  /** Content rendered after the hint, at the right edge. */
  trailing?: ReactNode;
  /** Non-interactive: announced as disabled, clicks ignored. */
  disabled?: boolean;
  /** Called on activation; the menu closes afterwards regardless. */
  onClick?: (event: MouseEvent<HTMLElement>) => void;
  /** Extra class on the item. */
  className?: string;
}

/**
 * One row in a menu panel. Uses `href` for navigation or `onClick` for actions;
 * activating it closes the enclosing `Menu` and refocuses the trigger.
 */
export function MenuItem({
  children,
  href,
  active,
  hint,
  danger,
  leading,
  trailing,
  disabled,
  onClick,
  className = "",
}: MenuItemProps) {
  const menu = useContext(MenuContext);

  const handleClick = (event: MouseEvent<HTMLElement>) => {
    if (disabled) {
      event.preventDefault();
      return;
    }
    onClick?.(event);
    menu?.close();
  };

  const classes = [
    // prototype .menu-item: flex, space-between, 12px gap, 8px/11px padding, r8, 14px
    "flex w-full items-center justify-between gap-3 rounded-[8px] px-[11px] py-2 text-left text-[14px] cursor-pointer",
    danger ? "text-[var(--brick)] hover:bg-[#F8ECEA]" : "text-[var(--ink)] hover:bg-[#F4EDE3]",
    active ? "font-650" : "",
    disabled ? "cursor-not-allowed opacity-50" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const tick =
    active && leading === undefined ? (
      <span aria-hidden="true" className="text-[var(--clay)] font-bold">
        {"✓ "}
      </span>
    ) : null;

  const left = (
    <span className="flex min-w-0 items-center">
      {tick}
      {leading}
      {children}
    </span>
  );
  const right =
    hint !== undefined || trailing !== undefined ? (
      <span className="flex shrink-0 items-center gap-2">
        {hint !== undefined && (
          <span className="text-[12px] text-[var(--muted)]">{hint}</span>
        )}
        {trailing}
      </span>
    ) : null;

  if (href !== undefined) {
    return (
      <a
        href={disabled ? undefined : href}
        role="menuitem"
        aria-disabled={disabled ? true : undefined}
        aria-current={active ? "true" : undefined}
        className={classes}
        onClick={handleClick}
      >
        {left}
        {right}
      </a>
    );
  }

  return (
    <button
      type="button"
      role="menuitem"
      disabled={disabled}
      aria-current={active ? "true" : undefined}
      className={classes}
      onClick={handleClick}
    >
      {left}
      {right}
    </button>
  );
}

/* ------------------------------------------------------------------ *
 * MenuSeparator
 * ------------------------------------------------------------------ */

export interface MenuSeparatorProps {
  /** Extra class on the `<hr>`. */
  className?: string;
}

/** Hairline divider between menu sections (prototype `hr.menu-sep`: 6px/4px margins). */
export function MenuSeparator({ className = "" }: MenuSeparatorProps) {
  return (
    <hr
      role="separator"
      className={`my-[6px] mx-1 border-0 border-t border-[var(--line)] ${className}`}
    />
  );
}
