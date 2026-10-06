# Max34Lab portfolio

Static portfolio website for GitHub Pages.

## Files

- `index.html`: homepage and project listing
- `about.html`: about page
- `projects/`: one folder per public project
- `projects/maxphotoframes/`: all Max Photo Frames content, including the product page, tutorial,
  support, policies and audience guides
- `projects/maxphotoframes/technology/`: the public Max Photo Frames technology section — one page per topic
  (why this app, how it works, on-device AI, layers and depth, export quality, built and tested).
  Each page is named for the search query it targets and carries its own canonical URL, Open Graph
  tags and schema.org markup. Add new pages here and add them to `sitemap.xml`.
- `assets/css/product-tech.css`: styling for that section only
- `assets/css/styles.css`: all visual styling
- `assets/js/main.js`: mobile menu and current year
- `CNAME`: custom domain
- `robots.txt`: crawler access and canonical sitemap location
- `sitemap.xml`: public page URLs for search engines
- `.well-known/apple-app-site-association`: tells iOS which links open the Max Photo Frames app instead of
  Safari (only `/projects/maxphotoframes/app/*`; app requirement FR-4.534). JSON with no file extension
- `.nojekyll`: turns off GitHub Pages' Jekyll build, which would otherwise drop the `.well-known/` folder

## Add another project

1. Create a folder for the project inside `projects/` and use an `index.html` entry page.
2. Rename it, for example `new-project.html`.
3. Update the title, description and case-study content.
4. Copy a project card in `index.html` and link it to the new project folder.
5. Add a new visual class in `assets/css/styles.css` if you want a different colour treatment.

## Where the content comes from

The words and pictures about Max Photo Frames come from the app's own repository
(`maxaiclaw-gh/max-photo-frames`, private, on the Mac at `~/Documents/Projects/MaxPhotoFrames-git`).
The release procedure, with the full asset map (which store artboard becomes which file here, at
what size and name), the text sources and the checks, is in that repository at
`docs/releases/website-sync-runbook.md` (and its `.html` companion).

This site never receives folders copied from the app repository. Each image is exported one by one
into this repository's own folders, and each text change is made by hand in the page here. The app
repository's old copy of the site (`assets/website/`) was removed on 2026-10-01; this repository is
the only copy.

## Folder map

| Folder | What goes in it |
|---|---|
| `/` (top level) | Site-wide pages and files only: `index.html`, `about.html`, `404.html`, `CNAME`, `robots.txt`, `sitemap.xml`, `.nojekyll`, `.well-known/`, and this repository's notes (`README.md`, `DEPLOY-GATE.md`, `CHANGELOG.md`) |
| `projects/` | One page or folder per public project (`a-insurance.html`, `maxphotoframes/`) |
| `projects/maxphotoframes/` | The Max Photo Frames pages: product page (`index.html`), `tutorial.html`, `support.html`, `privacy.html`, `privacy-guide.html`, `terms.html` |
| `projects/maxphotoframes/guides/` | Audience guides, one page per search topic |
| `projects/maxphotoframes/technology/` | The technology section, one page per topic |
| `assets/css/` | Style sheets: `styles.css` (whole site), `product-tech.css` (technology section) |
| `assets/js/` | Scripts: `main.js` (menu, year), `tech-nav.js` (technology section) |
| `assets/images/` | Images for projects other than Max Photo Frames (`a-insurance-*.webp`) |
| `assets/images/maxphotoframes/` | Max Photo Frames images: store screenshots `vXY-NN-<slug>.webp`, `-ipad.webp`, `-small.webp`; diagrams and privacy captures |
| `assets/images/maxphotoframes/tutorial/` | Tutorial captures, `NN-<name>.webp` and `NN-<name>-thumb.webp` |
| `assets/images/og/` | Social share cards, 1200 x 630 JPEG |

Images are WebP except the share cards. Nothing else goes at the top level.

## Publishing workflow

The site is served by GitHub Pages from `main`, folder `/root`, at www.max34lab.com (domain from
`CNAME`). **A push to `main` is live within minutes**, so `main` only receives finished, reviewed
work, and only with the owner's go.

1. Start from an up to date `main`: `git checkout main && git pull` (files are sometimes uploaded
   straight on GitHub).
2. One branch per change: `git checkout -b <short-name>`; for an app release,
   `release/website-vX.Y`.
3. Edit, then preview locally from this folder:

   ```bash
   python3 -m http.server 8123
   ```

   and open http://localhost:8123. Check every page you touched, in light and dark, at phone width.
4. Commit with explicit paths (`git add <files>`, never `git add -A`).
5. Read `DEPLOY-GATE.md`. If the change claims a new app version, it may only go out once that
   version is downloadable on the App Store.
6. Merge to `main` and push: `git checkout main && git merge --no-ff <branch> && git push origin main`.
7. For an app release, tag the merge `website-vX.Y` and push the tag
   (`git tag -a website-vX.Y -m "..." && git push origin website-vX.Y`), and add the release to
   `CHANGELOG.md`.
8. Check the live page at https://www.max34lab.com in a private window. If something is wrong,
   `git revert -m 1 <merge commit>` on `main` and push.

### Deploy log noise: `punycode` deprecation warning

If the Pages deploy job logs `DeprecationWarning: The 'punycode' module is deprecated`, this is not
caused by anything in this site. There is no `package.json`, no `node_modules`, and no JavaScript
here that touches `punycode` — the only script is `assets/js/main.js`, plain vanilla JS. The warning
comes from Node.js inside GitHub's own `actions/deploy-pages` action, which uses it internally during
the deploy step; it appears on unrelated repos too and does not affect the deployment outcome. If a
deploy actually fails, the real cause will be a later line (an `Error:`, a non-zero exit, or the
deployment API call itself failing) — not this warning.

## SEO and analytics

- Submit `https://www.max34lab.com/sitemap.xml` in Google Search Console after publishing. The site is
  served at `www`; the bare domain redirects there, so every address in the site uses `www`.
- Use URL inspection to request indexing for important new pages; indexing and performance data may take time to appear.
- Search Console reports Google search visibility. It does not measure all website visits or App Store downloads.
- If visitor analytics are added later, choose a privacy-conscious website analytics service and document it in the privacy policy. Do not add analytics to the iOS app or imply that website analytics measure in-app activity.

The public site contains no owner-only work-hour log, raw Git journal, donor identity data or credentials. Keep those in a local-only ignored dashboard as described in the app repository at `docs/roadmap/maxphotoframes-website-v2-plan.md`.

## Current state (checked 2026-10-01)

**The site is current for Max Photo Frames 3.3**, which has been live on the App Store since
2026-09-25. `main` already says Version 3.3 on the product page and on the privacy policy (updated
24 September 2026), so there is nothing staged and nothing waiting to deploy. `DEPLOY-GATE.md`
reads CLEAR (3.3).

**Owed:** this repository has no tags yet. `website-v3.3` (and `website-v3.2`) are named in
`CHANGELOG.md` but were never created here; the 3.3 tag should be put on the current `main` with
the owner's go. To see the site as it was for a release, check out its tag once it exists; there is
no folder of copies, deliberately, so nothing can drift out of sync.

Next release: 4.0, staged on a `release/website-v4.0` branch while it is in review (see
`DEPLOY-GATE.md`).
