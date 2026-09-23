import { describe, expect, it } from 'vitest';
import { exportFilename, fitOnPage } from './export';

// #9: filename slugging and the PDF page-fit math are the two pure pieces
// of the export path — both unit-tested here (the capture itself needs a
// browser and is covered by the browser sweep recorded on the ticket).

describe('exportFilename', () => {
  it('slugs the family name and appends -tree.<ext>', () => {
    expect(exportFilename('The Kessler Family', 'png')).toBe('the-kessler-family-tree.png');
    expect(exportFilename('The Kessler Family', 'pdf')).toBe('the-kessler-family-tree.pdf');
  });

  it('strips accents and punctuation, collapsing runs into single dashes', () => {
    expect(exportFilename('  Zoë’s  Family  ', 'png')).toBe('zoes-family-tree.png');
    expect(exportFilename('A & B', 'pdf')).toBe('a-b-tree.pdf');
    // apostrophes join rather than split the word
    expect(exportFilename("O'Brien Clan", 'png')).toBe('obrien-clan-tree.png');
  });

  it('falls back to "family" for empty or punctuation-only names', () => {
    expect(exportFilename('', 'png')).toBe('family-tree.png');
    expect(exportFilename('  —  ', 'pdf')).toBe('family-tree.pdf');
  });
});

/* A4 landscape in jsPDF's mm units: 297×210; margin 14, caption band 18
   → available 269×160 (mirrors the constants in treePngToPdf). */
const PAGE_W = 297;
const PAGE_H = 210;
const MARGIN = 14;
const BAND = 18;
const AVAIL_W = PAGE_W - MARGIN * 2; // 269
const AVAIL_H = PAGE_H - MARGIN * 2 - BAND; // 160

describe('fitOnPage', () => {
  it('fits a wide capture by width and centres it in the space above the caption', () => {
    // the desktop shell at 2× pixel ratio: 2784×1280 (ratio 2.175)
    const { x, y, w, h } = fitOnPage(2784, 1280, PAGE_W, PAGE_H, MARGIN, BAND);
    expect(w).toBeCloseTo(AVAIL_W, 5);
    expect(h).toBeCloseTo(AVAIL_W / (2784 / 1280), 5);
    expect(h).toBeLessThan(AVAIL_H); // stays above the caption band
    expect(x).toBeCloseTo(MARGIN, 5); // width-bound → flush with the margins
    expect(y).toBeCloseTo(MARGIN + (AVAIL_H - h) / 2, 5); // vertically centred
  });

  it('fits a tall capture by height instead', () => {
    const { x, y, w, h } = fitOnPage(640, 1392, PAGE_W, PAGE_H, MARGIN, BAND);
    expect(h).toBeCloseTo(AVAIL_H, 5);
    expect(w).toBeCloseTo(AVAIL_H / (1392 / 640), 5);
    expect(x).toBeCloseTo((PAGE_W - w) / 2, 5); // horizontally centred
    expect(y).toBeCloseTo(MARGIN, 5);
  });

  it('keeps every edge at least a margin from the page and off the caption', () => {
    const layouts = [
      fitOnPage(2784, 1280, PAGE_W, PAGE_H, MARGIN, BAND),
      fitOnPage(640, 1392, PAGE_W, PAGE_H, MARGIN, BAND),
      fitOnPage(1000, 1000, PAGE_W, PAGE_H, MARGIN, BAND),
    ];
    for (const { x, y, w, h } of layouts) {
      expect(x).toBeGreaterThanOrEqual(MARGIN - 1e-9);
      expect(y).toBeGreaterThanOrEqual(MARGIN - 1e-9);
      expect(x + w).toBeLessThanOrEqual(PAGE_W - MARGIN + 1e-9);
      expect(y + h).toBeLessThanOrEqual(PAGE_H - MARGIN - BAND + 1e-9);
    }
  });
});
