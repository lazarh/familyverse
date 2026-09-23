import type { ReactNode } from 'react';

export interface PanelProps {
  /** Panel heading (h2, 17px/650 — prototype `.panel-head h2`). */
  title: ReactNode;
  /** Right-hand side of the head: a count, a quiet action link. */
  action?: ReactNode;
  children: ReactNode;
  /** Extra classes on the panel (spacing between stacked panels). */
  className?: string;
}

/**
 * The prototype's `.panel` + `.panel-head` chrome (member.html), shared by
 * every profile panel: --card on --line, 16px radius, resting shadow, head
 * padded 16/22/13 over a hairline border.
 */
export function Panel({ title, action, children, className = '' }: PanelProps) {
  return (
    <section
      className={[
        'overflow-hidden rounded-[16px] border border-[var(--line)] bg-[var(--card)] shadow-[var(--shadow)]',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      <div className="flex items-center justify-between gap-3 border-b border-[var(--line)] px-[22px] pt-4 pb-[13px]">
        <h2 className="text-[17px]">{title}</h2>
        {action}
      </div>
      {children}
    </section>
  );
}
