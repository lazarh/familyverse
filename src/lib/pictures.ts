/**
 * Picture contract — validation, naming and proxy URLs (#15).
 * Replaces src/lib/picture.ts (byte-shape → data-URL logic, deleted): pictures
 * are files under PICTURES_DIR served by GET /api/pictures/<file>, so payloads
 * only ever carry a same-origin `pictureUrl`.
 *
 * Isomorphic on purpose (client formatters import `toPictureUrl`); all
 * filesystem work lives in src/lib/pictures.server.ts.
 */
import { v4 as uuidv4 } from 'uuid';

/** Server-side cap: 5 MB (#15). */
export const PICTURE_MAX_BYTES = 5 * 1024 * 1024;

/** Filenames accepted by the proxy — UUID + allowlisted extension, so
 *  directory traversal is impossible by construction (#15). */
export const PICTURE_NAME_RE = /^[0-9a-f-]{36}\.(jpg|jpeg|png|webp)$/;

export type PictureExt = 'jpg' | 'jpeg' | 'png' | 'webp';

export const PICTURE_CONTENT_TYPES: Record<PictureExt, string> = {
  jpg: 'image/jpeg',
  jpeg: 'image/jpeg',
  png: 'image/png',
  webp: 'image/webp',
};

export interface PictureOk {
  ok: true;
  ext: PictureExt;
}

export interface PictureError {
  ok: false;
  code: 'PICTURE_INVALID_TYPE' | 'PICTURE_TOO_LARGE';
  message: string;
}

export type PictureValidation = PictureOk | PictureError;

function ascii(bytes: Uint8Array, offset: number, length: number): string {
  let out = '';
  for (let i = offset; i < offset + length && i < bytes.length; i += 1) {
    out += String.fromCharCode(bytes[i]);
  }
  return out;
}

/**
 * Sniff the image type from magic bytes — the client's extension or
 * `File.type` is never trusted (extension spoofing is rejected).
 */
export function extFor(bytes: Uint8Array): PictureExt | null {
  // JPEG: FF D8 FF
  if (bytes.length >= 3 && bytes[0] === 0xff && bytes[1] === 0xd8 && bytes[2] === 0xff) {
    return 'jpg';
  }
  // PNG: 89 50 4E 47 0D 0A 1A 0A
  if (
    bytes.length >= 8 &&
    bytes[0] === 0x89 &&
    bytes[1] === 0x50 &&
    bytes[2] === 0x4e &&
    bytes[3] === 0x47 &&
    bytes[4] === 0x0d &&
    bytes[5] === 0x0a &&
    bytes[6] === 0x1a &&
    bytes[7] === 0x0a
  ) {
    return 'png';
  }
  // WebP: "RIFF" .... "WEBP"
  if (bytes.length >= 12 && ascii(bytes, 0, 4) === 'RIFF' && ascii(bytes, 8, 4) === 'WEBP') {
    return 'webp';
  }
  return null;
}

/** Validate size (≤ 5 MB) and type (jpeg/png/webp by magic bytes). */
export function validatePicture(bytes: Uint8Array): PictureValidation {
  if (bytes.length > PICTURE_MAX_BYTES) {
    return {
      ok: false,
      code: 'PICTURE_TOO_LARGE',
      message: 'Picture must be 5 MB or smaller.',
    };
  }
  const ext = extFor(bytes);
  if (!ext) {
    return {
      ok: false,
      code: 'PICTURE_INVALID_TYPE',
      message: 'Picture must be a JPEG, PNG or WebP image.',
    };
  }
  return { ok: true, ext };
}

/** Storage filename: fresh UUID v4 + sniffed extension (`9f3c…​.jpg`). */
export function pictureFilename(ext: PictureExt): string {
  return `${uuidv4()}.${ext}`;
}

/**
 * Build the same-origin proxy URL for a stored filename, or null when there
 * is no picture (callers fall back to the monogram).
 */
export function toPictureUrl(picturePath: string | null | undefined): string | null {
  return picturePath ? `/api/pictures/${picturePath}` : null;
}
