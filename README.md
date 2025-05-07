
# Kolleg Project (Astro)

A short guide for anyone who wants to clone, run and publish this Astro‑powered website.

---

## 1. What this repository contains

```
kolleg/
├─ docs/            ← static files Astro builds (published by GitHub Pages)
│  ├─ _astro/       ← optimised JS + CSS (file names are hashed)
│  ├─ images/
│  ├─ scripts/
│  ├─ .nojekyll     ← **must be empty – disables Jekyll on GitHub Pages**
│  └─ index.html
├─ public/          ← assets that are copied 1‑to‑1 to `docs/`
├─ src/             ← Astro pages, components & CSS
└─ astro.config.mjs ← Astro configuration
```

### Why the `.nojekyll` file?
GitHub Pages normally runs the Jekyll static‑site generator.  
Jekyll ignores any folder that starts with an underscore (for example `_astro/`).  
Adding an **empty** file called `.nojekyll` in the root of the published folder tells GitHub Pages to skip Jekyll and publish every file.

---

## 2. Quick start (local)

```bash
# 1. install dependencies
npm install

# 2. start the dev server (hot reload)
npm run dev

# 3. build a production version
npm run build

# 4. preview the build
npx astro preview --host   # usually http://localhost:4321/kolleg/
```

---

## 3. Astro configuration for GitHub Pages

```ts
// astro.config.mjs
import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://<user>.github.io/kolleg/', // full URL of the live site
  base: '/kolleg/',                         // sub‑folder on GitHub Pages
  outDir: 'docs',                           // build output folder
});
```
`base` makes Astro prepend `/kolleg/` to every internal link and asset path.

---

## 4. Deploy to GitHub Pages (manual workflow)

1. Build the site
   ```bash
   npm run build
   ```
2. Create the **`.nojekyll`** file (if it is missing)
   ```bash
   touch docs/.nojekyll
   ```
3. Commit and push the `docs/` folder to the default branch (for example `main`).
4. In the repository settings enable GitHub Pages and select the **`/docs` folder** as source.
5. Wait a few seconds and visit **https://<user>.github.io/kolleg/**.

### Automatic `.nojekyll`
Add it to the build script so it is recreated every time:
```jsonc
"scripts": {
  "build": "astro build && touch docs/.nojekyll"
}
```

---

## 5. Common problems

| Symptom                                                   | Cause                                                    | Fix                                   |
|-----------------------------------------------------------|----------------------------------------------------------|---------------------------------------|
| 404 on `/kolleg/_astro/*.css`                             | GitHub Pages deleted the `_astro` folder (Jekyll)        | Add empty `docs/.nojekyll`            |
| Assets load locally but not on the live site              | Absolute paths starting with `/`                        | Use relative paths or `import.meta.env.BASE_URL` |

---

## 6. Extra commands

```bash
# Clean rebuild
find docs -type f ! -name '.nojekyll' -delete && npm run build

# Serve the built site on another port
npx serve docs -l 5000
```

---

*Last update: May 2025*
