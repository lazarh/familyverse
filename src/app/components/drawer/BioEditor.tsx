'use client';

/**
 * BioEditor — the formatted textarea from form.html `.editor` (DIRECTION §4):
 * a bordered box with a toolbar row (H · B · I · list · quote · Link) and a
 * Preview toggle that renders the markdown through react-markdown WITHOUT
 * rehype-raw — raw HTML is never parsed (the #14 sanitization decision), and
 * the output is styled with the shared `.prose` class (globals.css).
 *
 * `applyMarkdown` is a pure wrap/insert/line-prefix helper over the current
 * value + selection; it's exported (with the component) for tests.
 */
import { useEffect, useRef, useState } from 'react';
import ReactMarkdown from 'react-markdown';

/** Toolbar operations. */
export type MarkdownOp = 'heading' | 'bold' | 'italic' | 'list' | 'quote' | 'link';

/** Result of an edit: new value + where the selection should land. */
export interface MarkdownEdit {
  value: string;
  start: number;
  end: number;
}

function countNewlines(text: string): number {
  let count = 0;
  for (let i = 0; i < text.length; i += 1) {
    if (text[i] === '\n') count += 1;
  }
  return count;
}

/**
 * Apply `op` to `value` over the selection [start, end).
 *
 * - bold/italic wrap the selection (`**`/`*`), unwrap when it is already
 *   wrapped, and insert an empty marker pair with the caret in the middle
 *   when nothing is selected.
 * - heading/list/quote prefix EVERY selected line (`## `, `- `, `> `),
 *   expanding to whole lines.
 * - link writes `[text](url)` (`url` used verbatim; empty selection →
 *   `[link](url)`).
 */
export function applyMarkdown(
  value: string,
  start: number,
  end: number,
  op: MarkdownOp,
  url = '',
): MarkdownEdit {
  const selection = value.slice(start, end);

  if (op === 'bold' || op === 'italic') {
    const marker = op === 'bold' ? '**' : '*';
    if (
      selection.length >= marker.length * 2 &&
      selection.startsWith(marker) &&
      selection.endsWith(marker)
    ) {
      const inner = selection.slice(marker.length, -marker.length);
      return {
        value: value.slice(0, start) + inner + value.slice(end),
        start,
        end: start + inner.length,
      };
    }
    if (selection === '') {
      return {
        value: value.slice(0, start) + marker + marker + value.slice(end),
        start: start + marker.length,
        end: start + marker.length,
      };
    }
    const wrapped = marker + selection + marker;
    return {
      value: value.slice(0, start) + wrapped + value.slice(end),
      start: start + marker.length,
      end: start + marker.length + selection.length,
    };
  }

  if (op === 'link') {
    const text = selection === '' ? 'link' : selection;
    const inserted = `[${text}](${url})`;
    return {
      value: value.slice(0, start) + inserted + value.slice(end),
      start: start + inserted.length,
      end: start + inserted.length,
    };
  }

  // Line-prefix ops: expand the selection to whole lines first.
  const token = op === 'heading' ? '## ' : op === 'list' ? '- ' : '> ';
  const lineStart = value.lastIndexOf('\n', start - 1) + 1;
  // A selection ending on a newline doesn't touch the following line.
  const lastTouched = end > start && value[end - 1] === '\n' ? end - 1 : end;
  let lineEnd = value.indexOf('\n', lastTouched);
  if (lineEnd === -1) lineEnd = value.length;

  const block = value.slice(lineStart, lineEnd);
  const prefixed = block
    .split('\n')
    .map((line) => token + line)
    .join('\n');

  // Each line start gains `token.length` chars before any position on it.
  const shiftOf = (position: number): number =>
    (countNewlines(value.slice(lineStart, position)) + 1) * token.length;

  const nextStart = start + shiftOf(start);
  const nextEnd =
    end > lineEnd
      ? lineStart + prefixed.length + (end - lineEnd)
      : end + shiftOf(end);

  return {
    value: value.slice(0, lineStart) + prefixed + value.slice(lineEnd),
    start: nextStart,
    end: nextEnd,
  };
}

export interface BioEditorProps {
  /** Current markdown value (controlled). */
  value: string;
  /** Called with the full new value on every edit. */
  onChange: (value: string) => void;
  /** Textarea id — wire it to the surrounding Field's `htmlFor`. */
  id?: string;
}

const TOOL_CLASS = [
  'flex h-[26px] min-w-[26px] cursor-pointer items-center justify-center rounded-[5px] border-0',
  'bg-transparent px-[6px] text-[13px] leading-none text-[var(--ink-soft)]',
  'hover:bg-[#F1E7D9] hover:text-[var(--ink)]',
].join(' ');

const TEXTAREA_CLASS = [
  // form.html `textarea.input.bio` — borderless inside the editor chrome
  'block box-border w-full min-h-[132px] resize-y border-0 bg-[var(--card)]',
  'px-3 py-[11px] text-[15px] leading-[1.6] text-[var(--ink)]',
  'placeholder:text-[var(--placeholder)] outline-none',
].join(' ');

/** Textarea + toolbar + preview (sanitized react-markdown). */
export function BioEditor({ value, onChange, id }: BioEditorProps) {
  const [preview, setPreview] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const pendingSelection = useRef<[number, number] | null>(null);

  // Restore the selection after React has committed the new value.
  useEffect(() => {
    const pending = pendingSelection.current;
    const textarea = textareaRef.current;
    if (!pending || !textarea) return;
    pendingSelection.current = null;
    textarea.focus();
    textarea.setSelectionRange(pending[0], pending[1]);
  }, [value]);

  function runOp(op: MarkdownOp) {
    const textarea = textareaRef.current;
    if (!textarea) return;
    if (op === 'link') {
      // Client-side prompt; cancel is a no-op.
      const url = window.prompt('Link URL', 'https://');
      if (url === null) return;
      const edit = applyMarkdown(textarea.value, textarea.selectionStart, textarea.selectionEnd, op, url);
      pendingSelection.current = [edit.start, edit.end];
      onChange(edit.value);
      return;
    }
    const edit = applyMarkdown(textarea.value, textarea.selectionStart, textarea.selectionEnd, op);
    pendingSelection.current = [edit.start, edit.end];
    onChange(edit.value);
  }

  return (
    <div className="overflow-hidden rounded-[8px] border border-[var(--line-strong)] bg-[var(--card)] focus-within:border-transparent focus-within:outline-2 focus-within:outline-[var(--clay)] focus-within:outline-offset-1">
      <div
        role="toolbar"
        aria-label="Formatting"
        className="flex items-center gap-[2px] border-b border-[var(--line)] bg-[#FAF5EC] p-[5px_6px]"
      >
        <button type="button" className={TOOL_CLASS} title="Heading" aria-label="Heading" onClick={() => runOp('heading')}>
          H
        </button>
        <button type="button" className={TOOL_CLASS} title="Bold" aria-label="Bold" onClick={() => runOp('bold')}>
          <b>B</b>
        </button>
        <button type="button" className={TOOL_CLASS} title="Italic" aria-label="Italic" onClick={() => runOp('italic')}>
          <i>I</i>
        </button>
        <button type="button" className={TOOL_CLASS} title="Bulleted list" aria-label="Bulleted list" onClick={() => runOp('list')}>
          •≡
        </button>
        <button type="button" className={TOOL_CLASS} title="Quote" aria-label="Quote" onClick={() => runOp('quote')}>
          ❝
        </button>
        <span aria-hidden="true" className="mx-[5px] h-4 w-px bg-[var(--line)]" />
        <button type="button" className={TOOL_CLASS} title="Link" aria-label="Link" onClick={() => runOp('link')}>
          Link
        </button>
        <button
          type="button"
          className={`${TOOL_CLASS} ml-auto ${preview ? 'bg-[#F1E7D9] text-[var(--ink)]' : ''}`}
          aria-pressed={preview}
          onClick={() => setPreview((was) => !was)}
        >
          {preview ? 'Write' : 'Preview'}
        </button>
      </div>

      {preview ? (
        <div className="prose max-h-[420px] min-h-[132px] overflow-y-auto">
          {value.trim() === '' ? (
            <span className="text-[13.5px] text-[var(--muted)]">Nothing to preview yet.</span>
          ) : (
            <ReactMarkdown
              components={{
                // Links open safely in a new tab; no rehype-raw anywhere, so
                // raw HTML in the bio is never parsed (#14).
                a: (props) => (
                  <a href={props.href} target="_blank" rel="noopener noreferrer">
                    {props.children}
                  </a>
                ),
              }}
            >
              {value}
            </ReactMarkdown>
          )}
        </div>
      ) : (
        <textarea
          ref={textareaRef}
          id={id}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          rows={5}
          placeholder="Stories, nicknames, what they were known for…"
          className={TEXTAREA_CLASS}
        />
      )}
    </div>
  );
}
