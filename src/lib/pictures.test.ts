import { describe, expect, it } from 'vitest';
import {
  PICTURE_MAX_BYTES,
  PICTURE_NAME_RE,
  extFor,
  pictureFilename,
  toPictureUrl,
  validatePicture,
} from './pictures';

// Spec tests for the #15 picture contract. These REPLACE the old
// picture.test.ts byte-shape→data-URL tests (deleted by decision).

const JPEG = new Uint8Array([0xff, 0xd8, 0xff, 0xe0, 0x00, 0x10]);
const PNG = new Uint8Array([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a, 0x00]);
const WEBP = new Uint8Array([
  0x52, 0x49, 0x46, 0x46, 0x00, 0x00, 0x00, 0x00, 0x57, 0x45, 0x42, 0x50,
]);
const GIF = new Uint8Array([0x47, 0x49, 0x46, 0x38, 0x39, 0x61]); // gif — not allowed

describe('extFor (magic bytes, extension never trusted)', () => {
  it('detects jpeg/png/webp', () => {
    expect(extFor(JPEG)).toBe('jpg');
    expect(extFor(PNG)).toBe('png');
    expect(extFor(WEBP)).toBe('webp');
  });

  it('rejects other formats and tiny buffers', () => {
    expect(extFor(GIF)).toBeNull();
    expect(extFor(new Uint8Array([0xff]))).toBeNull();
    expect(extFor(new Uint8Array(0))).toBeNull();
  });

  it('a RIFF buffer that is not WebP is rejected', () => {
    const riffNotWebp = new Uint8Array([0x52, 0x49, 0x46, 0x46, 0, 0, 0, 0, 0x41, 0x56, 0x49, 0x20]);
    expect(extFor(riffNotWebp)).toBeNull();
  });
});

describe('validatePicture', () => {
  it('accepts allowlisted types under the cap', () => {
    expect(validatePicture(JPEG)).toEqual({ ok: true, ext: 'jpg' });
    expect(validatePicture(PNG)).toEqual({ ok: true, ext: 'png' });
    expect(validatePicture(WEBP)).toEqual({ ok: true, ext: 'webp' });
  });

  it('rejects disallowed types with PICTURE_INVALID_TYPE', () => {
    const result = validatePicture(GIF);
    expect(result).toEqual({
      ok: false,
      code: 'PICTURE_INVALID_TYPE',
      message: 'Picture must be a JPEG, PNG or WebP image.',
    });
  });

  it('rejects oversize payloads with PICTURE_TOO_LARGE', () => {
    const oversize = new Uint8Array(PICTURE_MAX_BYTES + 1);
    oversize.set(JPEG);
    const result = validatePicture(oversize);
    expect(result.ok).toBe(false);
    if (!result.ok) expect(result.code).toBe('PICTURE_TOO_LARGE');
  });

  it('size is checked even when the bytes are a valid image', () => {
    // A valid JPEG header padded past the cap still fails on size first.
    const padded = new Uint8Array(PICTURE_MAX_BYTES + 1);
    padded.set(JPEG);
    expect(validatePicture(padded).ok).toBe(false);
  });
});

describe('pictureFilename', () => {
  it('produces UUID v4 names the proxy allowlist accepts', () => {
    const name = pictureFilename('jpg');
    expect(name).toMatch(/^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}\.jpg$/);
    expect(PICTURE_NAME_RE.test(name)).toBe(true);
    expect(pictureFilename('png')).toMatch(/\.png$/);
    expect(pictureFilename('webp')).toMatch(/\.webp$/);
  });

  it('two filenames are unique', () => {
    expect(pictureFilename('jpg')).not.toBe(pictureFilename('jpg'));
  });

  it('allowlist matches uuid names for every allowed extension only', () => {
    for (const ext of ['jpg', 'jpeg', 'png', 'webp']) {
      expect(PICTURE_NAME_RE.test(`123e4567-e89b-42d3-a456-426614174000.${ext}`)).toBe(true);
    }
    expect(PICTURE_NAME_RE.test('123e4567-e89b-42d3-a456-426614174000.gif')).toBe(false);
    expect(PICTURE_NAME_RE.test('../../etc/passwd')).toBe(false);
    expect(PICTURE_NAME_RE.test('..%2F..%2Fetc%2Fpasswd')).toBe(false);
    expect(PICTURE_NAME_RE.test('notauuid.jpg')).toBe(false);
  });
});

describe('toPictureUrl', () => {
  it('builds the same-origin proxy URL', () => {
    expect(toPictureUrl('123e4567-e89b-42d3-a456-426614174000.jpg')).toBe(
      '/api/pictures/123e4567-e89b-42d3-a456-426614174000.jpg',
    );
  });

  it('null/undefined/empty ⇒ null (monogram fallback)', () => {
    expect(toPictureUrl(null)).toBeNull();
    expect(toPictureUrl(undefined)).toBeNull();
    expect(toPictureUrl('')).toBeNull();
  });
});
