#!/usr/bin/env bash
# Seed the demo repo with workshop content on GitHub.
# Run AFTER `gh repo create` and an initial push of main.
#
# Usage:
#   cd ~/office-hours-demo
#   ./scripts/seed-github.sh
#
# Requires: gh CLI authenticated, current directory is a clone of the target repo.

set -euo pipefail

REPO_DIR="$(cd "$(dirname "$0")/.." && pwd)"
cd "$REPO_DIR"

if ! command -v gh >/dev/null 2>&1; then
  echo "error: gh CLI required" >&2
  exit 1
fi

# Confirm we're in the right repo
REPO_SLUG="$(gh repo view --json nameWithOwner -q .nameWithOwner)"
echo "==> Seeding workshop content into $REPO_SLUG"
read -p "Continue? [y/N] " ok
[[ "$ok" =~ ^[Yy]$ ]] || { echo "aborted"; exit 1; }

# --- Issue #1 -----------------------------------------------------------------
echo "==> Creating Issue #1 (POST handler)"
gh issue create \
  --title "Add /api/todos POST handler with validation" \
  --body-file workshop/issue-1-body.md \
  --label "workshop,lab-1" 2>/dev/null || \
gh issue create \
  --title "Add /api/todos POST handler with validation" \
  --body-file workshop/issue-1-body.md

# --- Issue #2 -----------------------------------------------------------------
echo "==> Creating Issue #2 (dark mode toggle — Lab 2 target)"
gh issue create \
  --title "Add dark mode toggle in header" \
  --body-file workshop/issue-2-body.md \
  --label "workshop,lab-2,good-first-agent-task" 2>/dev/null || \
gh issue create \
  --title "Add dark mode toggle in header" \
  --body-file workshop/issue-2-body.md

# --- PR #1 -------------------------------------------------------------------
echo "==> Creating branch feat/add-todo-post with rough implementation"
git checkout -b feat/add-todo-post
cp workshop/pr-1-server-index.js server/index.js
git add server/index.js
git -c user.name="Office Hours Dev" -c user.email="office-hours@example.com" \
  commit -q -m "feat: add POST /api/todos handler"
git push -u origin feat/add-todo-post

echo "==> Opening PR #1"
gh pr create \
  --title "Add /api/todos POST handler" \
  --body-file workshop/pr-1-body.md \
  --base main \
  --head feat/add-todo-post

git checkout main
echo
echo "==> Done. Verify:"
gh issue list
gh pr list
echo
echo "==> Next: Settings → Copilot → enable coding agent + code review on $REPO_SLUG"
