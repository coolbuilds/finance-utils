# AGENTS.md

Guidelines for AI agents working in this repository.

## Project Overview

This is `@coolbuilds/finance-utils`, a zero-dependency TypeScript utility library for finance-related helpers.

Public exports are defined from `src/index.ts` and are bundled for npm with `tsup` into:

- `dist/index.js` for ESM
- `dist/index.cjs` for CommonJS
- `dist/index.d.ts` and `dist/index.d.cts` for types

## Common Commands

Use these commands before committing changes:

```bash
npm run test:run
npm run build
```

Other useful commands:

```bash
npm run lint
npm run format
npm run coverage
npm publish --dry-run
```

If npm cache permissions fail locally, use a temporary cache:

```bash
npm publish --dry-run --cache /private/tmp/npm-cache-finance-utils
```

## Code Style

- Keep source code in TypeScript under `src/`.
- Keep tests under `tests/`.
- Export new public utilities from the relevant feature `index.ts`, then from `src/index.ts` if needed.
- Use extensionless relative imports, matching the exact filename casing.
- Be careful with filename casing. CI runs on Linux, so imports such as `./splitInstallment` must match the tracked Git filename exactly.
- This project uses Prettier and ESLint. Do not bypass formatting or lint rules.

## Package Publishing

The package is configured for public npm publishing as `@coolbuilds/finance-utils`.

Important package metadata lives in `package.json`:

- `exports` controls consumer imports.
- `files` controls what is included in the npm tarball.
- `publishConfig.access` must stay `public` for this scoped package.
- `prepublishOnly` runs tests and build before publish.

Do not commit npm tokens or credentials. Publishing uses `NODE_AUTH_TOKEN` from the GitHub secret `NPM_TOKEN`.

## GitHub Actions

The CI workflow is `.github/workflows/ci.yml`.

On pull requests, it installs dependencies, lints, tests, generates coverage, and builds.

On pushes to `main`, after a successful build, it:

1. Verifies `NPM_TOKEN`.
2. Bumps the patch version.
3. Updates `CHANGELOG.md`.
4. Commits `package.json`, `package-lock.json`, and `CHANGELOG.md`.
5. Creates a version tag.
6. Pushes the commit and tag.
7. Publishes to npm.
8. Creates a GitHub Release with the generated release notes.

Be cautious when editing the release flow. A broken workflow can bump versions without publishing, or publish without the expected tag.

## Repository Hygiene

- Do not commit `node_modules` or `coverage`.
- `dist` is ignored by Git, but it is generated during build and included in npm packages through the `files` field.
- Keep README install and import examples aligned with the package name.
- Keep `CHANGELOG.md` aligned with the release workflow.
- Keep `package-lock.json` in sync after changing `package.json`.
- Do not revert unrelated user changes.

## Verification Checklist

Before finishing a change, verify the relevant subset:

- For source changes: `npm run test:run` and `npm run build`.
- For package metadata changes: `npm run build` and `npm publish --dry-run`.
- For workflow changes: `npm run build` to validate formatting, then review `.github/workflows/ci.yml`.
