# Deploy gate: read this before publishing the site

**Current state: CLEAR (3.3). The site matches the live App Store release, Max Photo Frames 3.3,
live since 2026-09-25.** Checked 2026-10-01: `main` says Version 3.3 on the product page and on the
privacy policy.

Nothing is staged. Changes that make no version claim may be published at any time (see the
workflow in `README.md`).

## Why there is a gate at all

`main` is live within minutes of a push. Some lines on the site say which app version is on the App
Store. If they move to a new version before Apple approves it, a visitor reads "4.0" while the
Download button gives them 3.3. The gate keeps those lines true.

The lines that make a version claim (check them every release):

| File | Line |
|---|---|
| `projects/maxphotoframes/index.html` | the eyebrow "Free for iPhone and iPad, Version X.Y" and the "New in X.Y" heading and tiles |
| `projects/maxphotoframes/privacy.html` | "Updated for Max Photo Frames Version X.Y, Last updated: ..." |
| `projects/maxphotoframes/technology/how-the-app-is-built-and-tested.html` | the build history and "at 3.3" figures |

## Staging the next release (4.0)

The full procedure, with the asset map, is in the app repository at
`docs/releases/website-sync-runbook.md`. In short:

1. While 4.0 is in App Store review, do all the work on a branch `release/website-v4.0`. Do not
   merge it.
2. On that branch, change the banner above to:

   > **Current state: STAGED FOR 4.0 on `release/website-v4.0`. `main` stays CLEAR (3.3). Do not
   > merge until 4.0 is approved and downloadable.**

   and fill the table above with the exact new text of each line that claims 4.0.
3. Preview locally with `python3 -m http.server 8123`.
4. Do not claim collage, or any other 4.0 feature, anywhere on `main` before 4.0 is live.

## The two ways this ends

### 4.0 is approved and live: publish

1. Confirm on the App Store product page that the version shown is **4.0**: actually downloadable,
   not "In Review" or "Pending Developer Release".
2. On the release branch, set the banner back to **CLEAR (4.0)**, add the release to `CHANGELOG.md`.
3. With the owner's go: merge to `main`, tag `website-v4.0`, push `main` and the tag.
4. Check the live page.

### 4.0 is rejected, pulled or delayed: hold

Leave the release branch unmerged. An unrelated fix that must go out is branched from `main`, not
from the release branch, so no 4.0 claim can leak. If a 4.0 claim did reach `main` by mistake:

```bash
git revert -m 1 <the merge commit> && git push origin main
```
