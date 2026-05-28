# Tonight — what's left (10 min)

✅ Repo created: https://github.com/BensBar/office-hours-demo
✅ Issue #1 (POST handler context)
✅ Issue #2 (dark mode — Demo 2 target)
✅ PR #3 (rough POST handler — Demo 1 target)

## What you still need to do (browser, ~10 min)

### 1. Enable Copilot coding agent on your account (one-time)

Open: https://github.com/settings/copilot/features

- **Copilot coding agent** → set to **Enabled**
- This is an account-level setting; it unlocks the agent for any repo you own

### 2. Verify Copilot is on for this repo

Open: https://github.com/BensBar/office-hours-demo/settings/copilot/coding_agent

- Should show "Coding agent enabled"
- If you see a setup prompt, follow it (~30 seconds)

### 3. Dry-run BOTH demos end-to-end (15 min — the one step you cannot skip)

**Demo 1 — Copilot review:**
- Open https://github.com/BensBar/office-hours-demo/pull/3
- Sidebar → Reviewers → click "Copilot"
- Wait 30-90 sec for inline comments
- ✅ If you see at least 3 inline comments, you're good

**Demo 2 — Coding agent:**
- Open https://github.com/BensBar/office-hours-demo/issues/2
- Sidebar → Assignees → click "Copilot" (or use the "Assign to Copilot" button)
- Wait 2-6 min — a draft PR should open automatically
- ✅ If a draft PR opens with code that touches `web/src/Header.jsx`, you're good

### 4. Record your dry-run as backup (5 min)

- QuickTime → File → New Screen Recording (or Cmd+Shift+5)
- Record yourself doing Demo 1 + Demo 2 once more
- Save to `~/Desktop/office-hours-backup.mov`
- This is your safety net if either feature is slow tomorrow

### 5. **Pre-warm a Codespace 10 min before the call** (tomorrow, not tonight)

- Open https://github.com/BensBar/office-hours-demo → green **Code** button → **Codespaces** → **Create codespace on `feat/add-todo-post`**
- Wait for VS Code to load in the browser (~60s first time)
- Open Copilot Chat panel, send one test message ("hello") to confirm it's signed in
- Leave the tab open. Don't refresh.

### 6. Backup — local VS Code (tonight)

Have local VS Code open with the repo cloned on `feat/add-todo-post`, Copilot Chat signed in. Only used if the Codespace is slow on the day.

## If something fails

**Coding agent button missing on Issue #2:**
- Account-level setting (step 1) probably isn't on yet
- Or your Copilot subscription tier doesn't include agent — check https://github.com/settings/billing

**Agent opens an empty PR:**
- Comment on the PR with a corrective prompt — agent will iterate. This is a *great* moment to show live tomorrow.

**Copilot review doesn't add comments:**
- Reload after 2 min
- If still nothing: https://github.com/settings/copilot — verify Copilot is active on your account
