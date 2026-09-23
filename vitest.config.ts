import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  resolve: {
    // The repo imports via `@/…` (tsconfig paths); tests must resolve the
    // same way or component render tests can't execute.
    alias: { '@': fileURLToPath(new URL('./src', import.meta.url)) },
  },
  test: {
    // Unit tests for pure functions and renderToString markup — node
    // environment, no jsdom needed. (.tsx included for the ui primitives.)
    include: ['src/**/*.test.{ts,tsx}'],
  },
  oxc: {
    jsx: { runtime: 'automatic' },
  },
});
