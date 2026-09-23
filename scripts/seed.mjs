// Idempotent dev seed (#16): a confirmed demo user, a family, and the
// Kessler-shaped tree from the approved prototype — three generations,
// three MARRIED partnerships, markdown bios, and two real (1×1) JPEGs
// written into PICTURES_DIR so pictureUrl works out of the box.
//
// Plain ESM against @prisma/client's generated output — no ts-node/tsx needed.
// Run via: npm run db:seed   (requires DATABASE_URL and a migrated database)
import { PrismaClient } from '../src/generated/prisma/index.js';
import bcrypt from 'bcrypt';
import { randomUUID } from 'node:crypto';
import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';

const prisma = new PrismaClient();

const demoEmail = process.env.SEED_DEMO_EMAIL || 'demo@familyverse.local';
const demoPassword = process.env.SEED_DEMO_PASSWORD || 'demo123';

// A real 1×1 white JPEG — passes the API's magic-byte validation (FF D8 FF).
const TINY_JPEG = Buffer.from(
  '/9j/4AAQSkZJRgABAQEAYABgAAD/2wBDAAgGBgcGBQgHBwcJCQgKDBQNDAsLDBkSEw8UHRofHh0aHBwgJC4nICIsIxwcKDcpLDAxNDQ0Hyc5PTgyPC4zNDL/wAALCAABAAEBAREA/8QAFAABAAAAAAAAAAAAAAAAAAAACf/EABQQAQAAAAAAAAAAAAAAAAAAAAD/2gAIAQEAAD8AKp//2Q==',
  'base64',
);

function picturesDir() {
  const configured = process.env.PICTURES_DIR?.trim();
  return configured ? configured : path.join(process.cwd(), 'data', 'pictures');
}

/** Store the tiny JPEG under a UUID name; returns the picturePath value. */
async function storePicture() {
  const filename = `${randomUUID()}.jpg`;
  await mkdir(picturesDir(), { recursive: true });
  await writeFile(path.join(picturesDir(), filename), TINY_JPEG);
  return filename;
}

const day = (iso) => (iso ? new Date(iso) : null);

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
    family = await prisma.family.create({ data: { name: 'The Kessler Family' } });
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
  if (family.name !== 'The Kessler Family') {
    // An empty leftover family (old seed naming) — adopt the prototype name.
    family = await prisma.family.update({ where: { id: family.id }, data: { name: 'The Kessler Family' } });
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

  // Generation 1
  const walterPicture = await storePicture();
  const ruthPicture = await storePicture();
  const walter = await makePerson(
    'Walter Kessler',
    'Male',
    '1941-05-02',
    '2016-11-30',
    'Kraków, Poland',
    'Kept the **family ledgers** — every birth, marriage and rumour, in pencil, in one exercise book.',
    walterPicture,
  );
  const ruth = await makePerson(
    'Ruth Kessler',
    'Female',
    '1940-01-15',
    '2021-06-04',
    'Malmö, Sweden',
    null,
    ruthPicture,
  );

  // Generation 2
  const daniel = await makePerson('Daniel Kessler', 'Male', '1965-02-12', null, 'Bristol, England', null, null);
  const anita = await makePerson('Anita Kessler', 'Female', '1968-07-03', null, 'Accra, Ghana', null, null);

  // Generation 3
  const mayaPicture = await storePicture();
  const maya = await makePerson(
    'Maya Kessler',
    'Female',
    '1994-03-14',
    null,
    'Bristol, England',
    'Third-generation Bristolian, **heads the history department**, and insists the family sourdough starter is older than the house.\n\n- Kept every letter Grandma Ruth sent from Malmö, 1961–1978.\n- The one who remembers everyone\'s birthday — use her as the date check.',
    mayaPicture,
  );
  const sam = await makePerson('Sam Ortega', 'Male', '1992-11-02', null, 'Porto, Portugal', null, null);
  const theo = await makePerson('Theo Kessler', 'Male', '1997-09-27', null, 'Bristol, England', null, null);

  // Parent edges (five-role enum in play: these are BIOLOGICAL).
  await prisma.parentChild.createMany({
    data: [
      { childId: daniel.id, parentId: walter.id, role: 'BIOLOGICAL' },
      { childId: daniel.id, parentId: ruth.id, role: 'BIOLOGICAL' },
      { childId: maya.id, parentId: daniel.id, role: 'BIOLOGICAL' },
      { childId: maya.id, parentId: anita.id, role: 'BIOLOGICAL' },
      { childId: theo.id, parentId: daniel.id, role: 'BIOLOGICAL' },
      { childId: theo.id, parentId: anita.id, role: 'BIOLOGICAL' },
    ],
  });

  // Partnerships, canonical personAId < personBId.
  const pair = (a, b, kind) => ({
    personAId: Math.min(a, b),
    personBId: Math.max(a, b),
    kind,
  });
  await prisma.partnership.createMany({
    data: [
      pair(walter.id, ruth.id, 'MARRIED'),
      pair(daniel.id, anita.id, 'MARRIED'),
      pair(maya.id, sam.id, 'MARRIED'),
    ],
  });

  console.log(
    `[seed] ${family.name}: 7 people, 3 generations, 3 partnerships, bios + pictures in ${picturesDir()} (demo user ${demoEmail}).`,
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
