/**
 * Familyverse shared UI primitives — the foundation layer built from the
 * approved prototypes (prototype/DIRECTION.md §1–4).
 *
 * Screens import everything from here:
 * `import { Button, Field, Input, Menu, … } from "@/app/components/ui";`
 */

export { Button } from "./Button";
export type { ButtonProps, ButtonVariant, ButtonSize } from "./Button";

export { Menu, MenuGroup, MenuItem, MenuSeparator, handleMenuKeyDown } from "./Menu";
export type {
  MenuProps,
  MenuGroupProps,
  MenuItemProps,
  MenuSeparatorProps,
  MenuKeyHandlers,
} from "./Menu";

export { Field, Input, TextArea, inputClass, textareaClass } from "./Field";
export type { FieldProps, InputProps, TextAreaProps } from "./Field";

export { Segmented } from "./Segmented";
export type { SegmentedProps, SegmentedOption } from "./Segmented";

export { Switch } from "./Switch";
export type { SwitchProps } from "./Switch";

export { Chip } from "./Chip";
export type { ChipProps } from "./Chip";

export { default as Monogram, monogramInitials, monogramColor, MONOGRAM_COLORS } from "./Monogram";
export type { MonogramProps } from "./Monogram";

export { Dialog } from "./Dialog";
export type { DialogProps } from "./Dialog";

export { EmptyState } from "./EmptyState";
export type { EmptyStateProps } from "./EmptyState";
