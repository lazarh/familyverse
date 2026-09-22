/**
 * Picture shape-mapping: turn whatever `member.picture` happens to be after
 * JSON serialisation into a data URL, or `null` when it cannot be interpreted
 * (callers fall back to a default avatar).
 *
 * This is an extraction of logic that previously lived in
 * src/app/page.tsx (`ensureDataUrl`/`uint8ArrayToBase64`) and
 * src/app/components/FamilyNode.tsx. Behaviour is pinned characterisation-style
 * by src/lib/picture.test.ts — same inputs, same outputs, including the
 * console.warn diagnostics (message text kept verbatim from the original
 * FamilyNode implementation; the "FamilyNode:" prefix is now stale).
 */

/** Data URL prefix for byte payloads. Matches both original call sites' default. */
const DEFAULT_MIME_TYPE = 'image/jpeg';

function bytesToDataUrl(bytes: Uint8Array | number[], mimeType: string): string {
  return `data:${mimeType};base64,${Buffer.from(bytes).toString('base64')}`;
}

/**
 * Convert a picture value of unknown shape to a data URL.
 *
 * Handles: Uint8Array/Buffer, JSON-serialised Buffers
 * (`{ type: 'Buffer', data: [...] }`), byte-objects (`{ '0': 82, '1': 73, ... }`),
 * raw base64 strings, and existing `data:image/...` URLs. Returns `null` for
 * nullish/empty or unrecognised input (with a console.warn for the latter).
 */
export function pictureToDataUrl(picture: unknown, mimeType: string = DEFAULT_MIME_TYPE): string | null {
  if (!picture) {
    return null;
  }

  if (picture instanceof Uint8Array) {
    // True Uint8Array instances (includes Buffer instances passed directly).
    return bytesToDataUrl(picture, mimeType);
  }

  if (
    typeof picture === 'object' &&
    'type' in picture &&
    (picture as { type: unknown }).type === 'Buffer' &&
    'data' in picture &&
    Array.isArray((picture as { data: unknown }).data)
  ) {
    // JSON-serialised Buffer: { type: 'Buffer', data: [0, 1, 2, ...] }.
    return bytesToDataUrl((picture as { data: number[] }).data, mimeType);
  }

  if (
    typeof picture === 'object' &&
    !Array.isArray(picture) &&
    Object.prototype.hasOwnProperty.call(picture, '0') &&
    typeof (picture as Record<string, unknown>)['0'] === 'number'
  ) {
    // Byte-object with numeric-like string keys, e.g. { '0': 82, '1': 73, ... }.
    try {
      const byteObject = picture as Record<string, unknown>;
      const byteValues = Object.values(byteObject).filter(
        (value): value is number => typeof value === 'number' && value >= 0 && value <= 255,
      );

      // Only encode when every own value was a plausible byte.
      if (byteValues.length > 0 && byteValues.length === Object.keys(byteObject).length) {
        return bytesToDataUrl(new Uint8Array(byteValues), mimeType);
      }
      console.warn(
        'FamilyNode: Object looked like byte data, but contained invalid, non-numeric, or insufficient byte values.',
        picture,
      );
    } catch (e) {
      console.warn('FamilyNode: Error processing object-as-byte-data.', e, picture);
    }
    return null;
  }

  if (typeof picture === 'string') {
    if (picture.startsWith('data:image')) {
      return picture;
    }
    // Raw base64 string without a prefix.
    return `data:${mimeType};base64,${picture}`;
  }

  console.warn('Unsupported or unexpected picture format in FamilyNode after all checks:', picture);
  return null;
}
