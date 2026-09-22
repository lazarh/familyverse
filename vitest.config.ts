import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    // Unit tests for pure functions only — node environment, no jsdom needed.
    include: ['src/**/*.test.ts'],
  },
});
