"use client";

/**
 * Button — the prototype's `.btn` (DIRECTION §3–4): 9px radius, 14–15px
 * semibold, one primary (clay) per screen. Keeping that convention is the
 * CALLER's job; this component only provides the looks.
 *
 * Renders a `<button>` by default, or an `<a>` styled identically when given
 * `href` (the prototypes use links styled as buttons for navigation).
 */
import type { HTMLAttributes, ReactNode } from "react";

export type ButtonVariant = "primary" | "secondary" | "ghost" | "danger";

/**
 * - `md` — 36px, the prototype default (index/member.html).
 * - `lg` — 38px, the form-drawer primary (form.html).
 * - `xl` — 42px, the auth card primary (auth.html).
 */
export type ButtonSize = "md" | "lg" | "xl";

export interface ButtonProps extends HTMLAttributes<HTMLElement> {
  /** Visual variant. @default 'primary' — one primary per screen is the caller's rule. */
  variant?: ButtonVariant;
  /** Height preset. @default 'md' (36px) */
  size?: ButtonSize;
  /** When set, renders an `<a href>` with identical styling instead of a `<button>`. */
  href?: string;
  /** Button type (only used when there is no `href`). @default 'button' */
  type?: "button" | "submit" | "reset";
  /** Disabled state; anchors render without `href` and get `aria-disabled`. */
  disabled?: boolean;
  /** Anchor target, only meaningful with `href`. */
  target?: string;
  /** Anchor rel, only meaningful with `href`. */
  rel?: string;
  children?: ReactNode;
}

const VARIANT_CLASSES: Record<ButtonVariant, string> = {
  // clay fill, the one accent; hover/pressed → --clay-dark
  primary:
    "bg-[var(--clay)] text-white shadow-[0_1px_2px_rgba(60,30,15,0.28)] hover:bg-[var(--clay-dark)]",
  // card fill + line-strong border (DIRECTION §4)
  secondary: "bg-[var(--card)] border-[var(--line-strong)] text-[var(--ink)] hover:bg-[#F7F1E7]",
  // transparent, quiet
  ghost: "bg-transparent text-[var(--ink-soft)] hover:bg-[rgba(36,28,21,0.06)]",
  // brick text, pale red hover (member.html; DIRECTION §4)
  danger: "bg-[var(--card)] border-[#E4C4BE] text-[var(--brick)] hover:bg-[#F8ECEA]",
};

const SIZE_CLASSES: Record<ButtonSize, string> = {
  md: "h-9 px-[14px] text-[14px] font-semibold",
  lg: "h-[38px] px-4 text-[14px] font-semibold",
  xl: "h-[42px] px-[18px] text-[15px] font-650",
};

/** Shared shell: inline-flex, 7px gap, 9px radius, nowrap — identical for `<button>` and `<a>`. */
function buttonClassName(variant: ButtonVariant, size: ButtonSize, className: string): string {
  return [
    "inline-flex items-center justify-center gap-[7px] rounded-[9px] border border-transparent",
    "cursor-pointer whitespace-nowrap tracking-[-0.005em] no-underline",
    SIZE_CLASSES[size],
    VARIANT_CLASSES[variant],
    className,
  ]
    .filter(Boolean)
    .join(" ");
}

/**
 * Prototype button. Pass `href` to render a link that looks exactly the same.
 *
 * @example <Button onClick={addMember}>Add member</Button>
 * @example <Button variant="secondary" href="/members/find">Find a person</Button>
 */
export function Button({
  variant = "primary",
  size = "md",
  href,
  type = "button",
  disabled,
  target,
  rel,
  className = "",
  children,
  ...rest
}: ButtonProps) {
  const classes = buttonClassName(variant, size, className);

  if (href !== undefined) {
    if (disabled) {
      // No href → not navigable; aria-disabled keeps the state announced.
      return (
        <a target={target} rel={rel} aria-disabled="true" {...rest} className={classes}>
          {children}
        </a>
      );
    }
    return (
      <a href={href} target={target} rel={rel} {...rest} className={classes}>
        {children}
      </a>
    );
  }

  return (
    <button type={type} disabled={disabled} {...rest} className={classes}>
      {children}
    </button>
  );
}
