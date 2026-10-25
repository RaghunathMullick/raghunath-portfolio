# Raghunath Mullick — portfolio

A static React + TypeScript + Vite portfolio designed for GitHub Pages. The visual system uses a dark engineering-inspired palette, responsive layouts, accessible navigation, reduced-motion support, and CSS-generated technical artwork—no unlicensed imagery or invented professional artifacts.

## Important content status

The supplied CV was reviewed and used to verify the content. The public LinkedIn page could not be read by the available browser, so it was not used as a source. Review [CONTENT_AUDIT.md](./CONTENT_AUDIT.md) before publishing, especially the remaining PhD details and privacy approvals.

## Windows setup and local checks

The project needs Node.js (including npm) and Git. They were not installed or available on PATH during the latest verification.

1. Install the current **LTS** Windows x64 installer from [nodejs.org/download](https://nodejs.org/en/download/); it supplies both Node and npm. As of 25 October 2026, Node.js 24 LTS is the current LTS line.
2. Install Git for Windows from [the official Git for Windows installer](https://git-scm.com/install/windows). Keep the installer option that adds Git to PATH.
3. Close and reopen PowerShell or the VS Code terminal, then verify:

```powershell
node -v
npm -v
git --version
```

4. From this project directory, run:

```bash
npm install
npm run lint
npm run build
npm run dev
```

The production output is written to `dist/`. After the first successful `npm install`, commit the generated `package-lock.json` and change the deploy workflow back to `npm ci` for reproducible builds.

## GitHub Pages deployment

1. Create or choose a GitHub repository; do not publish personal details without review.
2. `vite.config.ts` automatically uses the repository name supplied by GitHub Actions for a project website. For a `username.github.io` user website, change its `base` to `'/'`.
3. The canonical, Open Graph, JSON-LD, robots, and sitemap URLs are configured for `https://rsspector77.github.io/raghunath-portfolio/`. Update them if the repository or custom domain changes.
4. Commit the project and push it to the `main` branch.
5. In GitHub **Settings → Pages**, set **Source** to **GitHub Actions**.
6. The workflow at `.github/workflows/deploy.yml` will build and deploy the site. Verify the resulting Pages URL, navigation, and metadata before announcing it.

### Custom domain later

Add a `CNAME` file containing the approved domain to `public/`, configure the DNS records in the domain provider, and set the custom domain in GitHub Pages settings. Update canonical/Open Graph/sitemap/JSON-LD URLs to the final `https://` domain.

## Project structure

- `src/content.ts` — centralized factual content
- `src/main.tsx` — reusable section composition and interactions
- `src/styles.css` — responsive visual system and reduced-motion handling
- `public/404.html` — GitHub Pages fallback
- `.github/workflows/deploy.yml` — GitHub Pages build/deploy automation

## Maintaining the portfolio

- **Edit profile text, education, experience, projects, skills, and development:** update `src/content.ts`.
- **Add a project:** add one object to the `projects` list with a verified title, date, description, methods, outcome, and filter category. Do not add quantitative results unless supported by an approved source.
- **Add a publication:** add the complete verified citation to the research section in `src/main.tsx`, and add an external link only when a stable public destination exists.
- **Add an approved image:** put the optimized file in `public/`, reference it with the Vite base path, provide useful alt text, and use defined dimensions to avoid layout shift.
- **Validate before publishing:** run `npm ci`, `npm run lint`, and `npm run build`.
- **Redeploy:** after GitHub Pages is enabled, an approved push to `main` triggers `.github/workflows/deploy.yml`. Review failures in the repository’s **Actions** tab.
- **Use a custom domain later:** add an approved `CNAME` file in `public/`, configure DNS with the registrar, enable the custom domain in GitHub Pages, and update all canonical/social/structured-data/sitemap URLs.

## Content and privacy review

The website deliberately excludes the CV download, mobile number, and residential address. These need explicit approval before publication. The site currently exposes the email that appears in the provided CV; remove `email` from `src/content.ts` and its contact button in `src/main.tsx` if it is not intended to be public.

## Accessibility notes

The site uses semantic sections and heading hierarchy, visible keyboard-focus-compatible controls, descriptive labels for icon controls, sufficiently clear boundaries, responsive layouts, and a `prefers-reduced-motion` fallback. Perform browser-based keyboard and contrast testing after installing dependencies.
