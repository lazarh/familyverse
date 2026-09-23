/**
 * Tree export — capture + formats (#9 "PDF export, done properly").
 *
 * Decisions recorded on #9:
 *  - PNG keeps html-to-image but captures the whole canvas SHELL (the
 *    `tree-export-target` node: warm --canvas background, dot grid, cards,
 *    edges, legend) at 2× pixel ratio — a WYSIWYG export of the visible
 *    tree, not just the transform layer on a white void;
 *  - PDF keeps `jspdf` (in dependencies since forever, unused until now):
 *    A4 landscape, --paper fill, the PNG fitted + centred, family name and
 *    export date as the caption;
 *  - filenames slugify the family name: `<slug>-tree.png|pdf`.
 *
 * AC3 (export × pictures-in-storage): card photos live behind the
 * same-origin `/api/pictures/*` proxy; html-to-image inlines them by
 * re-fetching their src while cloning, and same-origin requests carry the
 * session cookie — so externalized photos render in the export.
 */
import { toPng } from 'html-to-image';

/* Warm palette, mirrored from globals.css (literal values on purpose: the
   export runs in a detached SVG clone where CSS custom properties from
   :root are resolved at capture time, but the PDF needs real RGB). */
const PAPER_RGB = [251, 247, 240] as const; // --paper
const PAPER_HEX = '#fbf7f0';
const INK_RGB = [36, 28, 21] as const; // --ink
const INK_SOFT_RGB = [75, 65, 57] as const; // --ink-soft

/** Slugified `<family>-tree.<ext>` — never empty, never punctuation soup. */
export function exportFilename(familyName: string, ext: 'png' | 'pdf'): string {
  const slug = familyName
    .normalize('NFD') // decompose accents so Zoë → zoe
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/['\u2018\u2019\u02bc]/g, '') // apostrophes join: O'Brien → obrien
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
  return `${slug || 'family'}-tree.${ext}`;
}

export interface PdfLayout {
  x: number;
  y: number;
  w: number;
  h: number;
}

/**
 * Fit a `imgW×imgH` image into `pageW×pageH`, minus a uniform `margin` and
 * a bottom `captionBand`, centred in what's left (all units are the caller's
 * — the PDF passes millimetres). Pure so the layout math is unit-testable.
 */
export function fitOnPage(
  imgW: number,
  imgH: number,
  pageW: number,
  pageH: number,
  margin: number,
  captionBand: number,
): PdfLayout {
  const availW = pageW - margin * 2;
  const availH = pageH - margin * 2 - captionBand;
  const scale = Math.min(availW / imgW, availH / imgH);
  const w = imgW * scale;
  const h = imgH * scale;
  return { x: (pageW - w) / 2, y: margin + (availH - h) / 2, w, h };
}

/**
 * Capture the tree shell as a PNG data URL. `pixelRatio: 2` exports at
 * retina resolution (the shell is 1392×640 on desktop → 2784×1280).
 * backgroundColor fills the area outside the shell's rounded corners with
 * the page colour, exactly as the on-screen corners show paper through.
 */
export async function captureTreePng(target: HTMLElement): Promise<string> {
  return toPng(target, { backgroundColor: PAPER_HEX, pixelRatio: 2 });
}

/** Natural pixel size of a data-URL image (html-to-image doesn't return it). */
export function pngDimensions(
  dataUrl: string,
): Promise<{ width: number; height: number }> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve({ width: img.naturalWidth, height: img.naturalHeight });
    img.onerror = () => reject(new Error('Exported PNG could not be decoded.'));
    img.src = dataUrl;
  });
}

export interface PdfOptions {
  /** Caption + document title — the family name. */
  title: string;
  /** PNG natural pixel size (aspect source for the page fit). */
  naturalWidth: number;
  naturalHeight: number;
  /** Download filename, from exportFilename(..., 'pdf'). */
  saveAs: string;
}

/**
 * Build the PDF and trigger the download: A4 landscape on warm paper, the
 * tree PNG fitted above a two-line caption (family name, export date).
 * `jspdf` is imported dynamically so it stays out of the page's first-load
 * bundle — only people who actually export pay for it.
 */
export async function treePngToPdf(png: string, opts: PdfOptions): Promise<void> {
  const { jsPDF } = await import('jspdf');
  const doc = new jsPDF({ orientation: 'landscape', unit: 'mm', format: 'a4', compress: true });
  const pageW = doc.internal.pageSize.getWidth();
  const pageH = doc.internal.pageSize.getHeight();

  doc.setFillColor(PAPER_RGB[0], PAPER_RGB[1], PAPER_RGB[2]);
  doc.rect(0, 0, pageW, pageH, 'F');

  const MARGIN = 14;
  const CAPTION_BAND = 18;
  const layout = fitOnPage(
    opts.naturalWidth,
    opts.naturalHeight,
    pageW,
    pageH,
    MARGIN,
    CAPTION_BAND,
  );
  doc.addImage(png, 'PNG', layout.x, layout.y, layout.w, layout.h, undefined, 'FAST');

  // Caption: family name (bold ink) + one soft line with the export date.
  const title =
    opts.title.length > 48 ? `${opts.title.slice(0, 47).trimEnd()}…` : opts.title;
  const date = new Date().toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(15);
  doc.setTextColor(INK_RGB[0], INK_RGB[1], INK_RGB[2]);
  doc.text(title, pageW / 2, pageH - 12, { align: 'center' });
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9.5);
  doc.setTextColor(INK_SOFT_RGB[0], INK_SOFT_RGB[1], INK_SOFT_RGB[2]);
  doc.text(`Family tree · exported ${date}`, pageW / 2, pageH - 6.5, { align: 'center' });

  doc.setProperties({ title: `${title} — family tree` });
  doc.save(opts.saveAs);
}

/** Trigger a browser download for a data URL (the PNG path). */
export function downloadDataUrl(dataUrl: string, filename: string): void {
  const a = document.createElement('a');
  a.href = dataUrl;
  a.download = filename;
  a.click();
}
