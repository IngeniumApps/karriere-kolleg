import { defineConfig } from 'astro/config';

// TODO: add base for github pages

export default defineConfig({
    site: 'https://ingeniumapps.github.io/karriere-kolleg/', // ✔︎ bleibt
    //base: '/karriere-kolleg/',                               // ← NEU!
    outDir: 'docs',
});