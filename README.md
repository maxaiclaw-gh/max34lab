# Max34Lab portfolio

Static portfolio website for GitHub Pages.

## Files

- `index.html` — homepage and project listing
- `about.html` — about page
- `projects/` — individual project case studies
- `assets/css/styles.css` — all visual styling
- `assets/js/main.js` — mobile menu and current year
- `CNAME` — custom domain

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
6. Configure the custom domain as `www.maxlab34.com`.

## Local preview

You can open `index.html` directly, or run a local static server:

```bash
python3 -m http.server 8000
```

Then open `http://localhost:8000`.
