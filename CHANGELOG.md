# Website changelog

What the public site said, per app release. This is the version-tracking record: to see the site
exactly as it stood for any release, check out its tag (`website-v3.2`, `website-v3.1`, …) rather
than looking for a folder of copies.

**Why tags and not a `v3.2/` folder.** A folder per version means 45 files duplicated per release:
three near-identical copies of every page, a privacy policy that exists in triplicate, and no way to
tell which copy is authoritative. The failure mode is drift — someone fixes a typo in one copy, and
the others silently keep the typo forever. Git already stores every version losslessly, so a tag
gives the same "see it as it was" ability with one copy on disk and no chance of drift.

```bash
git show website-v3.2:assets/website/projects/maxphotoframes/index.html   # a single file, as shipped
git checkout website-v3.2 -- assets/website                                # the whole site, as shipped
git tag -l 'website-*'                                                     # every tracked version
```

---

## website-v3.2 — staged 2026-08-25, **not yet deployed**

Deployment is gated on the App Store release. See `DEPLOY-GATE.md`.

**Version lines moved to 3.2**
- Product page side card: `3.1.0` → `3.2.0, live on the App Store`
- Privacy policy: stamped Version 3.2, last updated 25 August 2026
- Build history: `25 Aug 2026 — Version 3.2 ready for release` added; repository snapshot refreshed
  to 2,516 first-parent commits, 3,634 across local refs, 20 tags

**Substantive changes, not just renumbering**
- Privacy policy, sync list: now says presets sync "including the styles they reference **and any
  group name you have filed them under**". Preset group names are stored on the profile itself
  (`FrameProfile.groupName`), so they genuinely do travel to iCloud. A user who names a group after a
  person — "Sarah's baby shower" — should not have to guess whether that name leaves the device. The
  old wording was not wrong, it was silent, and silence about a new user-visible field is the kind of
  gap that matters in a privacy policy specifically.
- Empty group declarations are local-only (`UserDefaults`) and never sync, so they needed no
  disclosure. Verified in `PresetGroupStore.swift`, not assumed.

**Collage claims removed from the parts that actually rank (found during staging)**

The collage guide had been rewritten to say plainly that the app does not build multi-photo
collages. The rewrite missed the surfaces that carry the most weight: the product page's own
`<title>` still read **"Max Photo Frames: Free Collage & Retro Photo Frame App"**, and the meta
description and og:title said the same. A search result is a promise, and that one contradicted both
the guide beneath it and the App Store listing, where `collage` was deliberately dropped from the
keyword field until the feature ships.

- Product page title and og:title: `Free Collage & Retro Photo Frame App` → `Free Retro Photo Frame
  & Caption App`, aligning with the 3.2 subtitle "Captions, Dates & Countdowns"
- Product page description: collage removed, `countdowns` added
- Site root description: same correction
- `guides/pregnancy-photo-journal.html`: a feature card read **"Milestone collages — Bring several
  moments together for a monthly recap, announcement or family update."** That is a direct
  multi-photo promise. Now "Milestone series — Give each month the same frame, caption and date style
  so the set reads as one story", which is what the app does. Three further collage mentions reworded
- `guides/photo-frames-for-schools.html`: two collage promises removed
- `guides/retro-photo-frames.html`: "Looking for collage layouts too?" → "Wondering about collage
  layouts?", so the cross-link poses a question the target page answers honestly

Links *to* the collage guide keep the word, deliberately. The guide serves the search intent without
making a promise, so pointing at it is honest and worth the traffic.

**Already landed earlier for 3.2 (2026-08-25, before this staging commit)**
- What's New covers Live Photo, White Balance, text arrangement, Father Figures, preset groups and
  touch and hold
- `guides/photo-collage-maker.html` rewritten. It had read as though the app builds multi-photo
  collages; it does not, and its own help text says it edits one photo at a time. The page now says
  so above the fold and offers what actually works. When collage ships, this page describes it rather
  than predicting it.

**Checked, deliberately unchanged**
- Terms of service still stamped Version 3.0. Nothing in 3.1 or 3.2 changed the terms, and bumping a
  legal document's version to advertise a release would be the wrong reason to touch it.
- Sitemap: verified complete — every page on disk is listed and every listed URL has a file. No
  `lastmod` dates, which stays deliberate; absent beats stale.
- Page hero and What's New already said 3.2 as forward-looking release copy and needed no edit.

---

## website-v3.1 and earlier

Not tagged retrospectively. History is in `git log -- assets/website`.
