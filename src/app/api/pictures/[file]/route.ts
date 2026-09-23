/**
 * GET /api/pictures/[file] — serve a stored picture (#15, Q7 = i).
 *
 * Same-origin so `<img src>` carries the session cookie and html-to-image
 * (#9) never taints a canvas. Filenames must match the UUID allowlist —
 * directory traversal is impossible by construction — and any authenticated
 * session may fetch (family-only app, unguessable UUIDs; stated in #15).
 */
import { NextResponse } from 'next/server';
import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { getUserIdFromSession } from '@/lib/sessionUtils';
import { PICTURE_CONTENT_TYPES, PICTURE_NAME_RE, type PictureExt } from '@/lib/pictures';
import { picturesDir } from '@/lib/pictures.server';

interface Params {
  params: Promise<{ file: string }>;
}

export async function GET(_request: Request, { params }: Params) {
  const userId = await getUserIdFromSession();
  if (!userId) return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });

  const { file } = await params;
  if (!PICTURE_NAME_RE.test(file)) {
    return NextResponse.json({ message: 'Picture not found' }, { status: 404 });
  }

  try {
    const bytes = await readFile(path.join(picturesDir(), file));
    const ext = file.slice(file.lastIndexOf('.') + 1) as PictureExt;
    return new NextResponse(new Uint8Array(bytes), {
      headers: {
        'Content-Type': PICTURE_CONTENT_TYPES[ext],
        // Filenames are UUIDs that change on replace ⇒ safe to cache hard.
        'Cache-Control': 'private, max-age=86400, immutable',
      },
    });
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === 'ENOENT') {
      return NextResponse.json({ message: 'Picture not found' }, { status: 404 });
    }
    console.error(`Failed to serve picture ${file}:`, error);
    return NextResponse.json({ message: 'Failed to serve picture' }, { status: 500 });
  }
}
