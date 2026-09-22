#!/bin/sh
# Container entrypoint: apply migrations, seed (idempotent), then start the app.
# Migrations run at container START, not image build, so a fresh stack is
# migrated against whatever DATABASE_URL the runtime environment provides.
set -e

echo "[entrypoint] Applying database migrations..."
npx prisma migrate deploy

echo "[entrypoint] Running seed script (idempotent)..."
node scripts/seed.mjs

echo "[entrypoint] Starting application..."
exec npm start
