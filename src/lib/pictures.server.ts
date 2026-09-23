/**
 * Filesystem half of the picture contract (#15) — server-only (fs/path);
 * keep it out of client bundles by never importing this from components.
 */
import { mkdir, unlink, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { PICTURE_NAME_RE } from './pictures';

/** Storage root: PICTURES_DIR env, else ./data/pictures (host dev). */
export function picturesDir(): string {
  const configured = process.env.PICTURES_DIR?.trim();
  return configured ? configured : path.join(process.cwd(), 'data', 'pictures');
}

/**
 * Persist picture bytes under PICTURES_DIR and return the stored filename
 * (the `picturePath` column value). Creates the directory on first use.
 * Throws when the filename would not pass the proxy's allowlist.
 */
export async function savePicture(bytes: Uint8Array, filename: string): Promise<string> {
  if (!PICTURE_NAME_RE.test(filename)) {
    throw new Error(`Refusing to store non-allowlisted picture filename: ${filename}`);
  }
  const dir = picturesDir();
  await mkdir(dir, { recursive: true });
  await writeFile(path.join(dir, filename), bytes);
  return filename;
}

/**
 * Best-effort unlink of a stored picture. Missing files are ignored;
 * the basename guard keeps a stray `picturePath` inside PICTURES_DIR.
 */
export async function removePictureFile(picturePath: string | null | undefined): Promise<void> {
  if (!picturePath) return;
  const safeName = path.basename(picturePath);
  if (!PICTURE_NAME_RE.test(safeName)) return;
  try {
    await unlink(path.join(picturesDir(), safeName));
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code !== 'ENOENT') throw error;
  }
}
