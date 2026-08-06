# Max34Lab portfolio

Static portfolio website for GitHub Pages.

## Files

- `index.html`: homepage and project listing
- `about.html`: about page
- `projects/`: individual project case studies, Max Photo Frames audience pages, tutorial and privacy guide
- `technology/`: the public technology section — one page per topic
  (why this app, how it works, on-device AI, layers and depth, export quality, built and tested).
  Each page is named for the search query it targets and carries its own canonical URL, Open Graph
  tags and schema.org markup. Add new pages here, not to `projects/`, and add them to `sitemap.xml`.
- `assets/css/product-tech.css`: styling for that section only
- `assets/css/styles.css`: all visual styling
- `assets/js/main.js`: mobile menu and current year
- `CNAME`: custom domain
- `robots.txt`: crawler access and canonical sitemap location
- `sitemap.xml`: public page URLs for search engines

## Add another project

1. Copy one of the files inside `projects/`.
2. Rename it, for example `new-project.html`.
3. Update the title, description and case-study content.
4. Copy a project card in `index.html` and link it to the new file.
5. Add a new visual class in `assets/css/styles.css` if you want a different colour treatment.

## Publish with GitHub Pages

1. Upload these files to the root of the `max34lab` repository.
2. Open **Settings → Pages** in GitHub.
3. Under **Build and deployment**, choose **Deploy from a branch**.
4. Select the `main` branch and `/root` folder.
5. Save.
6. Configure the custom domain as `max34lab.com`.

## SEO and analytics

- Submit `https://max34lab.com/sitemap.xml` in Google Search Console after publishing.
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
