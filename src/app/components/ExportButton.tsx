'use client';

/**
 * ExportButton — the page head's export control (#9 "PDF export, done
 * properly"). One primary trigger with the SAME clay fill, 36px height and
 * baseline as "Add member" (the two-head-buttons alignment rule from #16's
 * review is preserved — only the label changed from "Download image" to
 * "Export" now that two formats exist), opening the shared Menu with the
 * two formats the README promises:
 *
 *  - PNG image — WYSIWYG capture of the canvas shell (warm background, dot
 *    grid, cards, legend) — src/lib/export.ts;
 *  - PDF document — A4 landscape on warm paper with a family-name caption.
 *
 * Capture/format details live in src/lib/export.ts; the canvas shell in
 * page.tsx carries the `tree-export-target` class this button captures.
 */
import { useCallback, useState } from 'react';
import { Menu, MenuGroup, MenuItem } from '@/app/components/ui';
import {
  captureTreePng,
  downloadDataUrl,
  exportFilename,
  pngDimensions,
  treePngToPdf,
} from '@/lib/export';

export interface ExportButtonProps {
  /** Active family name — captions the PDF and slugs the filename. */
  familyName: string;
}

type ExportKind = 'png' | 'pdf';

export default function ExportButton({ familyName }: ExportButtonProps) {
  const [busy, setBusy] = useState<ExportKind | null>(null);
  const [error, setError] = useState<string | null>(null);

  const runExport = useCallback(
    (kind: ExportKind) => () => {
      // The menu closes on activation; this guard covers a reopen mid-run.
      if (busy !== null) return;
      setBusy(kind);
      setError(null);

      (async () => {
        const target = document.querySelector<HTMLElement>('.tree-export-target');
        if (!target) throw new Error('Tree canvas not found for export.');
        const png = await captureTreePng(target);
        if (kind === 'png') {
          downloadDataUrl(png, exportFilename(familyName, 'png'));
          return;
        }
        const { width, height } = await pngDimensions(png);
        await treePngToPdf(png, {
          title: familyName,
          naturalWidth: width,
          naturalHeight: height,
          saveAs: exportFilename(familyName, 'pdf'),
        });
      })()
        .catch((err: unknown) => {
          // Surfaced in the reopened menu as a retriable notice, not a toast
          // (#9: exports are user-initiated and can be simply tried again).
          console.error('Export failed:', err);
          setError('Export failed — open the menu and try again.');
        })
        .finally(() => setBusy(null));
    },
    [busy, familyName],
  );

  const panel = (
    <>
      <MenuGroup label="Export tree">
        <MenuItem hint=".png" disabled={busy !== null} onClick={runExport('png')}>
          {busy === 'png' ? 'Rendering image…' : 'PNG image'}
        </MenuItem>
        <MenuItem hint=".pdf" disabled={busy !== null} onClick={runExport('pdf')}>
          {busy === 'pdf' ? 'Building PDF…' : 'PDF document'}
        </MenuItem>
      </MenuGroup>
      {error !== null && (
        <MenuItem danger disabled>
          {error}
        </MenuItem>
      )}
    </>
  );

  return (
    <Menu label="Export tree" align="left" panel={panel}>
      {/* Trigger styled byte-for-byte like Button primary/md so the head row
          keeps one visual weight across Add member / Export (span, not
          triggerClassName: the Menu trigger shell is bg-transparent and
          Tailwind class order does not decide precedence). */}
      <span className="inline-flex h-9 items-center gap-[7px] rounded-[9px] border border-transparent bg-[var(--clay)] px-[14px] text-[14px] font-semibold whitespace-nowrap text-white shadow-[0_1px_2px_rgba(60,30,15,0.28)] hover:bg-[var(--clay-dark)]">
        Export
        <svg
          aria-hidden="true"
          width="12"
          height="12"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.4"
          strokeLinecap="round"
          className="transition-transform duration-150 group-data-[open=true]:rotate-180"
        >
          <path d="m6 9 6 6 6-6" />
        </svg>
      </span>
    </Menu>
  );
}
