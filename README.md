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

## Add another project

1. Create a folder for the project inside `projects/` and use an `index.html` entry page.
2. Rename it, for example `new-project.html`.
3. Update the title, description and case-study content.
4. Copy a project card in `index.html` and link it to the new project folder.
5. Add a new visual class in `assets/css/styles.css` if you want a different colour treatment.

## Publish with GitHub Pages

1. Upload these files to the root of the `max34lab` repository.
2. Open **Settings → Pages** in GitHub.
3. Under **Build and deployment**, choose **Deploy from a branch**.
4. Select the `main` branch and `/root` folder.
5. Save.
6. Configure the custom domain as `max34lab.com`.

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

The public site contains no owner-only work-hour log, raw Git journal, donor identity data or credentials. Keep those in a local-only ignored dashboard as described in `docs/roadmap/maxphotoframes-website-v2-plan.md`.

## Local preview

You can open `index.html` directly, or run a local static server:

```bash
python3 -m http.server 8000
```

Then open `http://localhost:8000`.

---

## v3.3 release (staged 2026-09-24)

**The site is fully written for 3.3 and is STAGED, NOT DEPLOYED.** 3.2 is live and the site that
describes it was deployed (confirmed on 2026-09-24 by reading the live page).

Read `DEPLOY-GATE.md` before publishing. In short: seven lines now claim 3.3.0 is live on the App
Store, which is not true until Apple approves the release. Deploy the whole site in one go once 3.3
is downloadable; if you need to publish something unrelated before then, revert to the 3.2 site
first. The gate file names every line and gives the revert command.

Per-version history is in `CHANGELOG.md`, and each release is tagged (`website-v3.3`, `website-v3.2`).
To see the site as it shipped for a release, check out the tag. There is no folder of copies,
deliberately, so there is nothing to drift out of sync.
