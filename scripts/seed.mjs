// Idempotent dev seed (#16 flow, #21 dataset): a confirmed demo user, one
// family, and the demo tree from scripts/seed-data/. SEED_FAMILY picks the
// dataset — `trump` (default; the retired board demo the human is used to
// seeing, per #19/#21) or `kessler` (the original prototype tree). Photos
// (real board photos or warm swatch JPEGs, per dataset photoDir) are written
// into PICTURES_DIR under fresh UUIDs so pictureUrl works out of the box.
//
// Plain ESM against @prisma/client's generated output — no ts-node/tsx needed.
// Run via: npm run db:seed   (requires DATABASE_URL and a migrated database)
import { PrismaClient } from '../src/generated/prisma/index.js';
import bcrypt from 'bcrypt';
import { randomUUID } from 'node:crypto';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import * as trump from './seed-data/trump.mjs';
import * as kessler from './seed-data/kessler.mjs';

const prisma = new PrismaClient();

const demoEmail = process.env.SEED_DEMO_EMAIL || 'demo@familyverse.local';
const demoPassword = process.env.SEED_DEMO_PASSWORD || 'demo123';

const DATASETS = { trump, kessler };
const datasetKey = (process.env.SEED_FAMILY || 'trump').trim().toLowerCase();
const dataset = DATASETS[datasetKey];
if (!dataset) {
  throw new Error(`SEED_FAMILY="${datasetKey}" — expected one of: ${Object.keys(DATASETS).join(', ')}`);
}

function picturesDir() {
  const configured = process.env.PICTURES_DIR?.trim();
  return configured ? configured : path.join(process.cwd(), 'data', 'pictures');
}

/** Store a dataset JPEG under a UUID name; returns the picturePath value. */
async function storePicture(jpeg) {
  const filename = `${randomUUID()}.jpg`;
  await mkdir(picturesDir(), { recursive: true });
  await writeFile(path.join(picturesDir(), filename), jpeg);
  return filename;
}

const day = (iso) => (iso ? new Date(iso) : null);

/** Read `<photoDir><photo>` relative to this script (dataset ships both). */
const readPhoto = (photo) => readFile(new URL(photo, new URL(dataset.photoDir, import.meta.url)));

async function main() {
  // 1. Confirmed demo user.
  let user = await prisma.user.findUnique({ where: { email: demoEmail } });
  if (!user) {
    user = await prisma.user.create({
      data: {
        email: demoEmail,
        password: await bcrypt.hash(demoPassword, 10),
        isConfirmed: true,
      },
    });
  }

  // 2. The user's family (created on first run).
  let membership = await prisma.userFamily.findFirst({
    where: { userId: user.id },
    include: { family: true },
  });
  let family = membership?.family ?? null;
  if (!family) {
    family = await prisma.family.create({ data: { name: dataset.name } });
    await prisma.userFamily.create({ data: { userId: user.id, familyId: family.id } });
  }

  // 3. People — skip when the family already has some (idempotent reruns,
  //    including the post-migration reseed where the user/family survived
  //    but FamilyMember rows were dropped with the old table).
  const existingPeople = await prisma.familyMembership.count({ where: { familyId: family.id } });
  if (existingPeople > 0) {
    console.log(`[seed] ${family.name} already has ${existingPeople} people — nothing to do.`);
    return;
  }
  if (family.name !== dataset.name) {
    // An empty leftover family — adopt the dataset's name.
    family = await prisma.family.update({ where: { id: family.id }, data: { name: dataset.name } });
  }

  const makePerson = (fullName, gender, birthDate, deathDate, birthPlace, bio, picturePath) =>
    prisma.person.create({
      data: {
        fullName,
        gender,
        birthDate: day(birthDate),
        deathDate: day(deathDate),
        birthPlace,
        bio,
        picturePath,
        memberships: { create: { familyId: family.id } },
      },
    });

  // People first; slugs resolve the edges below.
  const bySlug = new Map();
  let pictures = 0;
  for (const p of dataset.people) {
    const picturePath = p.photo ? await storePicture(await readPhoto(p.photo)) : null;
    if (picturePath) pictures += 1;
    bySlug.set(p.slug, await makePerson(p.fullName, p.gender, p.birthDate, p.deathDate, p.birthPlace, p.bio, picturePath));
  }
  const idOf = (slug) => {
    const person = bySlug.get(slug);
    if (!person) throw new Error(`[seed] dataset "${datasetKey}" references unknown slug "${slug}"`);
    return person.id;
  };

  // Parent edges (five-role enum in play: seed edges are BIOLOGICAL).
  await prisma.parentChild.createMany({
    data: dataset.parents.map(([child, parent]) => ({
      childId: idOf(child),
      parentId: idOf(parent),
      role: 'BIOLOGICAL',
    })),
  });

  // Partnerships, canonical personAId < personBId.
  const pair = (a, b, kind) => ({
    personAId: Math.min(a, b),
    personBId: Math.max(a, b),
    kind,
  });
  await prisma.partnership.createMany({
    data: dataset.partnerships.map(([a, b]) => pair(idOf(a), idOf(b), 'MARRIED')),
  });

  console.log(
    `[seed] ${family.name} (SEED_FAMILY=${datasetKey}): ${dataset.people.length} people, ` +
      `${dataset.parents.length} parent edges, ${dataset.partnerships.length} partnerships, ` +
      `${pictures} pictures in ${picturesDir()} (demo user ${demoEmail}).`,
  );
}

main()
  .catch((err) => {
    console.error('[seed] Failed:', err);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
