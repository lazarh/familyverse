"use client";

/**
 * Segmented control — the 2–4 equal-choice alternative to a `<select>` (form.html
 * `.seg`, used for gender). Real radios, visually hidden inside the labels, so
 * keyboard arrow-keys and form submission work natively; the wrapper carries
 * `role="radiogroup"` for assistive tech.
 */
import { useId } from "react";
import type { ReactNode } from "react";

export interface SegmentedOption {
  /** Value reported to `onChange` (also the radio `value`). */
  value: string;
  /** Visible label. */
  label: ReactNode;
}

export interface SegmentedProps {
  /** 2–4 equal choices (prototype range; more than 4 gets cramped). */
  options: SegmentedOption[];
  /** Currently selected value. */
  value: string;
  /** Called with the newly selected `value`. */
  onChange: (value: string) => void;
  /** Radio group name; auto-generated when omitted. */
  name?: string;
  /** Extra class on the container. */
  className?: string;
  /** id on the container. */
  id?: string;
  /** Disables every option. */
  disabled?: boolean;
  /** Accessible name when the control has no surrounding Field label. */
  "aria-label"?: string;
  /** Points the group at an external label element. */
  "aria-labelledby"?: string;
}

const GROUP_CLASS =
  "flex gap-[3px] rounded-[8px] border border-[var(--line)] bg-[#F4EDE3] p-[3px]";

/**
 * Segmented control.
 *
 * @example <Segmented options={genderOptions} value={gender} onChange={setGender} name="gender" />
 */
export function Segmented({
  options,
  value,
  onChange,
  name,
  className = "",
  id,
  disabled,
  "aria-label": ariaLabel,
  "aria-labelledby": ariaLabelledBy,
}: SegmentedProps) {
  const autoId = useId();
  const groupName = name ?? `segmented${autoId.replace(/:/g, "")}`;

  return (
    <div
      id={id}
      role="radiogroup"
      aria-label={ariaLabel}
      aria-labelledby={ariaLabelledBy}
      className={`${GROUP_CLASS} ${className}`}
    >
      {options.map((option) => {
        const selected = option.value === value;
        return (
          <label
            key={option.value}
            className={[
              "relative flex h-8 flex-1 cursor-pointer items-center justify-center rounded-[6px]",
              "text-[13px] font-semibold",
              selected
                ? "bg-[var(--card)] text-[var(--ink)] shadow-[0_1px_2px_rgba(60,42,24,0.14)]"
                : "text-[var(--ink-soft)] hover:text-[var(--ink)]",
              // focus ring around the whole cell, driven by the hidden radio
              "has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-[var(--clay)] has-[:focus-visible]:outline-offset-2",
              disabled ? "cursor-not-allowed opacity-50" : "",
            ]
              .filter(Boolean)
              .join(" ")}
          >
            <input
              type="radio"
              className="sr-only"
              name={groupName}
              value={option.value}
              checked={selected}
              disabled={disabled}
              onChange={() => onChange(option.value)}
            />
            {option.label}
          </label>
        );
      })}
    </div>
  );
}
