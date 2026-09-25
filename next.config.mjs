// Was next.config.ts, renamed for #18 (armv7 board cutover): Next has no
// native SWC binding on 32-bit arm, so `next start` transpiled the .ts config
// through the WASM binding at EVERY boot — which fails on 15.3.1 with
// "invalid type: unit value, expected a map" (serde_wasm_bindgen rejects an
// explicit `undefined` option that the native bindings' JSON path silently
// drops; at `next start` the jsconfig-paths map is not yet resolved).
// Plain ESM imports with zero SWC calls at boot; JSDoc keeps the type hint.
// See: https://github.com/lazarh/familyverse/issues/18
/** @type {import("next").NextConfig} */
const nextConfig = {};

export default nextConfig;
