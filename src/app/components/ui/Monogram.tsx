/**
 * Monogram — the circular initials avatar that stands in for photos
 * (DIRECTION §1 "Avatar monograms"): white bold initials from the first and
 * last word, background cycled through the approved 8-colour palette by
 * `personId % 8`.
 *
 * `monogramInitials` / `monogramColor` are exported for direct use (tree
 * cards, relationship rows) and for tests.
 */

/**
 * The seven approved monogram colours (DIRECTION §1) plus an eighth muted
 * ochre from the same family — no hue repeats, all dark enough for white text.
 */
export const MONOGRAM_COLORS = [
  "#8A6B3B", // bronze (Walter)
  "#7A5B7E", // plum (Ruth)
  "#55708E", // steel blue (Daniel)
  "#4F6B55", // sage (Anita)
  "#9C4A2E", // clay (Maya)
  "#4E7A72", // teal (Sam)
  "#6E5F8E", // violet (Theo)
  "#8A7B3F", // muted ochre (eighth slot, chosen for this implementation)
] as const;

/**
 * Initials for a monogram: first letter of the first and last word, uppercased.
 * Words are separated by whitespace or hyphens, so `Jean-Luc` → `JL`.
 *
 * - `"Maya Kessler"` → `"MK"`
 * - `"Jean-Luc Picard"` → `"JP"` (hyphen inside the first word does not leak)
 * - `"Cher"` → `"C"` (single word → single initial)
 * - `""` / `"   "` → `""`
 */
export function monogramInitials(name: string): string {
  const words = name.trim().split(/[\s-]+/).filter(Boolean);
  if (words.length === 0) return "";
  const first = words[0].charAt(0);
  if (words.length === 1) return first.toUpperCase();
  const last = words[words.length - 1].charAt(0);
  return (first + last).toUpperCase();
}

/**
 * Background colour for a person id: the palette cycled by `personId % 8`.
 * Negative ids are wrapped into range (`-1` → the last colour).
 */
export function monogramColor(personId: number): string {
  const palette = MONOGRAM_COLORS as readonly string[];
  const index = (((personId % palette.length) + palette.length) % palette.length) | 0;
  return palette[index];
}

export interface MonogramProps {
  /** Full name; initials are derived from it. */
  name: string;
  /** Person id; picks the palette slot via `personId % 8`. */
  personId: number;
  /** Diameter in px (prototype card = 44). @default 44 */
  size?: number;
  /** Extra class (positioning, ring…). */
  className?: string;
  /** Hides it from assistive tech — use when the name is already visible next to it. */
  decorative?: boolean;
  /** Tooltip; omitted by default (the name is usually right beside it). */
  title?: string;
}

/**
 * Circular initials avatar.
 *
 * @example <Monogram name="Maya Kessler" personId={4} />
 */
export default function Monogram({
  name,
  personId,
  size = 44,
  className = "",
  decorative,
  title,
}: MonogramProps) {
  return (
    <span
      role={decorative ? undefined : "img"}
      aria-hidden={decorative ? true : undefined}
      aria-label={decorative ? undefined : name}
      title={title}
      className={[
        "inline-flex flex-none select-none items-center justify-center rounded-full",
        "text-white shadow-[inset_0_0_0_1px_rgba(255,255,255,0.22)]",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      style={{
        width: size,
        height: size,
        // prototype .mono: 44px → 15px, i.e. ~34% of the diameter
        fontSize: Math.max(10, Math.round(size * 0.34)),
        fontWeight: 700,
        letterSpacing: "0.02em",
        background: monogramColor(personId),
      }}
    >
      {monogramInitials(name)}
    </span>
  );
}
