#!/usr/bin/env bash
# Production build of apps/web in an isolated mirror (node_modules symlink
# farms break the Next.js build — copy source, fresh install, build, serve,
# measure). Same strategy as the Task-4 verification, extended to measure
# performance vitals per route.
set -euo pipefail

ROOT=/home/z/my-project
MIRROR=/home/z/my-project/scripts/prod-build/web

echo "== preparing isolated mirror =="
rm -rf "$MIRROR"
mkdir -p "$MIRROR/apps/web" "$MIRROR/apps/api" "$MIRROR/packages/shared"

# Copy monorepo workspace files + the three packages
cp "$ROOT/package.json" "$ROOT/bun.lock" "$MIRROR/"
cp "$ROOT/pnpm-workspace.yaml" "$MIRROR/" 2>/dev/null || true
rsync -a --delete "$ROOT/apps/web/" "$MIRROR/apps/web/" \
  --exclude node_modules --exclude .next
rsync -a --delete "$ROOT/apps/api/" "$MIRROR/apps/api/" \
  --exclude node_modules --exclude dist 2>/dev/null || true
rsync -a --delete "$ROOT/packages/shared/" "$MIRROR/packages/shared/" \
  --exclude node_modules

echo "== bun install (frozen lockfile) =="
cd "$MIRROR"
bun install --frozen-lockfile --ignore-scripts 2>&1 | tail -3

echo "== production build =="
cd "$MIRROR/apps/web"
bun run build 2>&1 | tail -45

echo "== build complete =="
