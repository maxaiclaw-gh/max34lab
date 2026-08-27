# ⛔️ DEPLOY GATE — read this before publishing the site

**Current state: STAGED FOR 3.2. Do not deploy until Max Photo Frames 3.2 is approved and live on
the App Store.**

Staged 2026-08-25.

## Why there is a gate at all

The site now states, in three places, that **version 3.2.0 is live on the App Store**. Today that is
not true. Publishing before Apple approves the release would put a claim on a public page that the
App Store contradicts — a visitor clicking Download would get 3.1 while the page says 3.2.

Everything else on the site is version-neutral and would be safe to publish at any time. These are
the three lines that are not:

| File | Line now reads | Only true once 3.2 is live |
|---|---|---|
| `projects/maxphotoframes/index.html` | side card: `3.2.0, live on the App Store` | ✅ |
| `projects/maxphotoframes/privacy.html` | `Updated for Max Photo Frames Version 3.2` | ✅ |
| `projects/maxphotoframes/technology/how-the-app-is-built-and-tested.html` | build history entry `25 Aug 2026 — Version 3.2 ready for release` | ✅ |

## The two ways this ends

### 3.2 is approved and live → deploy

1. Confirm on the App Store product page that the version shown is **3.2**. Not "In Review", not
   "Pending Developer Release" — actually downloadable.
2. Deploy the site as normal.
3. Tick the release row in `CHANGELOG.md` and move this gate back to **CLEAR** (see below).
4. Start the search-term monitoring register in `docs/roadmap/v3.2-aso-release-ready.md` §4.

### 3.2 is rejected, pulled, or delayed past a site change you need to ship → revert first

If you need to publish something unrelated while 3.2 is still not live, revert the three lines above
to 3.1 first. `git log` on this branch shows the exact edit; the fastest route is:

```bash
git revert --no-commit <the website-v3.2 commit> && git commit -m "Website: hold at 3.1 until 3.2 is live"
```

Then re-apply when 3.2 lands.

## When the gate is CLEAR

Replace the banner at the top of this file with:

> **Current state: CLEAR. The site matches the live App Store release (3.2).**

and leave the rest of the file in place for the next release.
