// Idempotent dev seed: a confirmed demo user, a family linked to it, and six
// family members across three generations (parentId1/parentId2 links) so the
// tree graph renders out of the box.
//
// Plain ESM against @prisma/client's generated output — no ts-node/tsx needed.
// Run via: npm run db:seed   (requires DATABASE_URL and a migrated database)
import { PrismaClient } from '../src/generated/prisma/index.js';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

const demoEmail = process.env.SEED_DEMO_EMAIL || 'demo@familyverse.local';
const demoPassword = process.env.SEED_DEMO_PASSWORD || 'demo123';

async function main() {
  const existing = await prisma.user.findUnique({ where: { email: demoEmail } });
  if (existing) {
    console.log(`[seed] Demo user ${demoEmail} already exists — nothing to do.`);
    return;
  }

  const hashedPassword = await bcrypt.hash(demoPassword, 10);

  const user = await prisma.user.create({
    data: {
      email: demoEmail,
      password: hashedPassword,
      isConfirmed: true,
    },
  });

  const family = await prisma.family.create({
    data: { name: 'Demo Family' },
  });

  await prisma.userFamily.create({
    data: { userId: user.id, familyId: family.id },
  });

  // Generation 1 — grandparents
  const robert = await prisma.familyMember.create({
    data: { fullName: 'Robert Demo', gender: 'male', birthDate: new Date('1940-03-12'), familyId: family.id },
  });
  const margaret = await prisma.familyMember.create({
    data: { fullName: 'Margaret Demo', gender: 'female', birthDate: new Date('1942-07-24'), familyId: family.id },
  });

  // Generation 2 — parents
  const william = await prisma.familyMember.create({
    data: {
      fullName: 'William Demo',
      gender: 'male',
      birthDate: new Date('1968-01-30'),
      parentId1: robert.id,
      parentId2: margaret.id,
      familyId: family.id,
    },
  });
  const sarah = await prisma.familyMember.create({
    data: { fullName: 'Sarah Demo', gender: 'female', birthDate: new Date('1970-11-05'), familyId: family.id },
  });

  // Generation 3 — children
  await prisma.familyMember.create({
    data: {
      fullName: 'Emma Demo',
      gender: 'female',
      birthDate: new Date('1995-05-18'),
      parentId1: william.id,
      parentId2: sarah.id,
      familyId: family.id,
    },
  });
  await prisma.familyMember.create({
    data: {
      fullName: 'James Demo',
      gender: 'male',
      birthDate: new Date('1998-09-02'),
      parentId1: william.id,
      parentId2: sarah.id,
      familyId: family.id,
    },
  });

  console.log(
    `[seed] Created demo user ${demoEmail}, family "${family.name}" with 6 members across 3 generations.`
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
