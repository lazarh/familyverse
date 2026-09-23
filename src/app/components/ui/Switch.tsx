"use client";

/**
 * Switch — the "Living" toggle (form.html `.switch`): 44×26 pill, sage when
 * on, warm neutral when off, 20px knob that slides. `role="switch"` on a real
 * button; the clay focus ring comes from the global `:focus-visible` rule.
 */
import { useCallback, useState } from "react";

export interface SwitchProps {
  /** Controlled on/off state. Leave undefined for uncontrolled use. */
  checked?: boolean;
  /** Initial state when uncontrolled. @default false */
  defaultChecked?: boolean;
  /** Called with the next state on every toggle. */
  onCheckedChange?: (checked: boolean) => void;
  /** Disabled switch. */
  disabled?: boolean;
  /** id (pair with a Field label when needed). */
  id?: string;
  /** Extra class on the track. */
  className?: string;
  /** Accessible name when no visible label is wired via aria-labelledby. */
  "aria-label"?: string;
  /** Points the switch at an external label element. */
  "aria-labelledby"?: string;
  /** Describes the switch (e.g. an id of the hint line). */
  "aria-describedby"?: string;
}

/**
 * Toggle switch.
 *
 * @example <Switch checked={living} onCheckedChange={setLiving} aria-label="Living" />
 */
export function Switch({
  checked,
  defaultChecked = false,
  onCheckedChange,
  disabled,
  id,
  className = "",
  "aria-label": ariaLabel,
  "aria-labelledby": ariaLabelledBy,
  "aria-describedby": ariaDescribedBy,
}: SwitchProps) {
  const [internalChecked, setInternalChecked] = useState(defaultChecked);
  const isOn = checked ?? internalChecked;

  const toggle = useCallback(() => {
    if (disabled) return;
    const next = !isOn;
    if (checked === undefined) setInternalChecked(next);
    onCheckedChange?.(next);
  }, [checked, disabled, isOn, onCheckedChange]);

  return (
    <button
      type="button"
      id={id}
      role="switch"
      aria-checked={isOn}
      aria-label={ariaLabel}
      aria-labelledby={ariaLabelledBy}
      aria-describedby={ariaDescribedBy}
      disabled={disabled}
      onClick={toggle}
      className={[
        // 44×26 pill; prototype keeps `inset` shadow on the track
        "relative m-0 h-[26px] w-[44px] flex-none cursor-pointer rounded-full border-0 p-0",
        "shadow-[inset_0_1px_2px_rgba(0,0,0,0.18)]",
        isOn ? "bg-[var(--sage)]" : "bg-[var(--line-strong)]",
        disabled ? "cursor-not-allowed opacity-50" : "",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {/* knob: left 3px at rest → +18px translate = right 3px when on */}
      <span
        aria-hidden="true"
        className={[
          "absolute top-[3px] left-[3px] h-5 w-5 rounded-full bg-white",
          "shadow-[0_1px_2px_rgba(0,0,0,0.3)] transition-transform duration-[120ms]",
          isOn ? "translate-x-[18px]" : "",
        ]
          .filter(Boolean)
          .join(" ")}
      />
    </button>
  );
}
