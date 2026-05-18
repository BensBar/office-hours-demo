# Tonight's setup checklist

Run these in order. Total time: ~20 min.

```bash
cd ~/catalyst-pod3-demo

# 1. Verify it runs locally (smoke test)
npm install
( npm run dev --workspace server & )
sleep 2
curl -s http://localhost:3001/api/todos | head
kill %1 2>/dev/null || true

# 2. Initial commit on main
git add -A
git commit -m "initial: catalyst pod 3 demo (todo app)"

# 3. Create the GitHub repo (choose org/user as needed)
# Internal-visible is fine for Emerson tenant; public works too.
gh repo create bensbar-emerson/catalyst-pod3-demo \
  --internal \
  --description "Catalyst 2.0 Session 1 Pod 3 demo" \
  --source . \
  --push

# 4. Seed Issues #1, #2 and PR #1
./scripts/seed-github.sh

# 5. Enable Copilot features (do this in the browser):
#    Settings → Code, planning, automation → Copilot
#    - Enable "Copilot code review"
#    - Enable "Copilot coding agent"
#    https://github.com/bensbar-emerson/catalyst-pod3-demo/settings/copilot

# 6. Dry-run Lab 2 (THE most important pre-flight step)
#    - Open Issue #2 in browser
#    - Assign @copilot
#    - Wait 2-6 min for draft PR
#    - If it opens, you're good. If it doesn't, see troubleshooting below.

# 7. Record your dry-run with QuickTime (Cmd+Shift+5 → Record Selected Portion)
#    Save as catalyst-pod3-lab2-backup.mov on your Desktop.
#    This is your safety net for tomorrow.
```

## Troubleshooting

**Agent doesn't pick up Issue #2:**
- Check repo Settings → Copilot → coding agent is on
- Check Actions are enabled (Settings → Actions → Allow all actions)
- Check you have Copilot Enterprise/Business seat and your org allows agent
- Try the "Assign to Copilot" button on the issue page directly (sometimes more reliable than @copilot mention)

**`gh repo create` errors with "name already exists":**
- Pick a different slug, e.g. `bensbar-emerson/catalyst-pod3-demo-2`
- Update the README and seed script if you change the slug

**Branch protection blocks the agent PR:**
- Settings → Branches → main → ensure "Require signed commits" is OFF
- Ensure no required status checks on a brand-new repo with no CI yet
