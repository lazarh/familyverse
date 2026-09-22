import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { pictureToDataUrl } from './picture';

// Characterisation tests. These pin the behaviour of the picture shape-mapping
// that previously lived in src/app/page.tsx (ensureDataUrl/uint8ArrayToBase64)
// and src/app/components/FamilyNode.tsx, so the extraction to this module is
// behaviour-preserving. Do not "fix" expectations here without a ticket —
// they describe what the app does today, bugs included.
describe('pictureToDataUrl', () => {
  let warn: ReturnType<typeof vi.spyOn>;

  beforeEach(() => {
    warn = vi.spyOn(console, 'warn').mockImplementation(() => {});
  });

  afterEach(() => {
    warn.mockRestore();
  });

  describe('empty / nullish input', () => {
    it('returns null for null (caller falls back to the default avatar)', () => {
      expect(pictureToDataUrl(null)).toBeNull();
    });

    it('returns null for undefined', () => {
      expect(pictureToDataUrl(undefined)).toBeNull();
    });

    it('returns null for an empty string', () => {
      // Both original helpers short-circuited on any falsy picture.
      expect(pictureToDataUrl('')).toBeNull();
    });
  });

  describe('Uint8Array input', () => {
    it('encodes bytes as a default image/jpeg data URL', () => {
      // "foo" bytes → RFC 4648 test vector "Zm9v".
      const bytes = new Uint8Array([102, 111, 111]);
      expect(pictureToDataUrl(bytes)).toBe('data:image/jpeg;base64,Zm9v');
    });

    it('honours a custom mimeType', () => {
      const bytes = new Uint8Array([102, 111, 111]);
      expect(pictureToDataUrl(bytes, 'image/png')).toBe('data:image/png;base64,Zm9v');
    });

    it('accepts a Buffer (subclass of Uint8Array)', () => {
      const buffer = Buffer.from('foo', 'utf8');
      expect(pictureToDataUrl(buffer)).toBe('data:image/jpeg;base64,Zm9v');
    });

    it('encodes an empty Uint8Array as an empty base64 payload', () => {
      expect(pictureToDataUrl(new Uint8Array())).toBe('data:image/jpeg;base64,');
    });
  });

  describe('{ type: "Buffer", data: [...] } input (JSON-serialised Buffer)', () => {
    it('encodes the data array as a default image/jpeg data URL', () => {
      const json = { type: 'Buffer', data: [102, 111, 111] };
      expect(pictureToDataUrl(json)).toBe('data:image/jpeg;base64,Zm9v');
    });

    it('honours a custom mimeType', () => {
      const json = { type: 'Buffer', data: [82, 73] };
      expect(pictureToDataUrl(json, 'image/png')).toBe('data:image/png;base64,Ukk=');
    });

    it('returns null when data is not an array and no other branch matches', () => {
      // { type: 'Buffer', data: 'nope' } fails the Array.isArray guard, is not a
      // byte-object (no '0' key) and not a string → generic unsupported fallback.
      const json = { type: 'Buffer', data: 'nope' };
      expect(pictureToDataUrl(json)).toBeNull();
      expect(warn).toHaveBeenCalledWith(
        'Unsupported or unexpected picture format in FamilyNode after all checks:',
        json,
      );
    });
  });

  describe("byte-object input ({ '0': 82, '1': 73, ... })", () => {
    it('encodes numeric byte keys in order as a data URL', () => {
      const byteObject = { '0': 82, '1': 73 };
      expect(pictureToDataUrl(byteObject)).toBe('data:image/jpeg;base64,Ukk=');
    });

    it('includes non-index keys when all values are valid bytes', () => {
      // Characterises the original loose check: every own value must be a number
      // in 0..255 and the filtered count must equal the key count — extra keys
      // are happily encoded, in Object.values order (index keys first).
      const byteObject = { '0': 102, '1': 111, '2': 111, meta: 111 };
      expect(pictureToDataUrl(byteObject)).toBe('data:image/jpeg;base64,Zm9v');
    });

    it('returns null and warns when a value is out of byte range', () => {
      const byteObject = { '0': 82, '1': 300 };
      expect(pictureToDataUrl(byteObject)).toBeNull();
      expect(warn).toHaveBeenCalledWith(
        'FamilyNode: Object looked like byte data, but contained invalid, non-numeric, or insufficient byte values.',
        byteObject,
      );
    });

    it('returns null and warns when a non-index value is not a number', () => {
      const byteObject = { '0': 82, '1': 'oops' };
      expect(pictureToDataUrl(byteObject)).toBeNull();
      expect(warn).toHaveBeenCalledWith(
        'FamilyNode: Object looked like byte data, but contained invalid, non-numeric, or insufficient byte values.',
        byteObject,
      );
    });

    it('does not treat an object without a "0" key as byte data', () => {
      // Falls through to the generic unsupported-format branch.
      const notBytes = { foo: 1 };
      expect(pictureToDataUrl(notBytes)).toBeNull();
      expect(warn).toHaveBeenCalledWith(
        'Unsupported or unexpected picture format in FamilyNode after all checks:',
        notBytes,
      );
    });

    it('returns null for an empty object', () => {
      expect(pictureToDataUrl({})).toBeNull();
      expect(warn).toHaveBeenCalledWith(
        'Unsupported or unexpected picture format in FamilyNode after all checks:',
        {},
      );
    });
  });

  describe('string input', () => {
    it('passes an existing image data URL through untouched', () => {
      const dataUrl = 'data:image/png;base64,Ukk=';
      expect(pictureToDataUrl(dataUrl)).toBe(dataUrl);
    });

    it('passes an existing data URL through even when a custom mimeType is given', () => {
      const dataUrl = 'data:image/gif;base64,R0lGOD';
      expect(pictureToDataUrl(dataUrl, 'image/png')).toBe(dataUrl);
    });

    it('wraps a raw base64 string with the default image/jpeg prefix', () => {
      expect(pictureToDataUrl('Ukk=')).toBe('data:image/jpeg;base64,Ukk=');
    });

    it('wraps a raw base64 string with a custom mimeType', () => {
      expect(pictureToDataUrl('Ukk=', 'image/png')).toBe('data:image/png;base64,Ukk=');
    });

    it('wraps non-image data URLs (legacy quirk: only "data:image" is detected)', () => {
      expect(pictureToDataUrl('data:text/plain;base64,aGVsbG8=')).toBe(
        'data:image/jpeg;base64,data:text/plain;base64,aGVsbG8=',
      );
    });
  });

  describe('unrecognised input', () => {
    it('returns null and warns for a plain array (not treated as bytes)', () => {
      const array = [102, 111, 111];
      expect(pictureToDataUrl(array)).toBeNull();
      expect(warn).toHaveBeenCalledWith(
        'Unsupported or unexpected picture format in FamilyNode after all checks:',
        array,
      );
    });

    it('returns null and warns for a number', () => {
      expect(pictureToDataUrl(42)).toBeNull();
      expect(warn).toHaveBeenCalledWith(
        'Unsupported or unexpected picture format in FamilyNode after all checks:',
        42,
      );
    });

    it('returns null and warns for a boolean', () => {
      expect(pictureToDataUrl(true)).toBeNull();
      expect(warn).toHaveBeenCalledWith(
        'Unsupported or unexpected picture format in FamilyNode after all checks:',
        true,
      );
    });
  });
});
