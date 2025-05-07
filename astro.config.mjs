// astro.config.mjs
import { defineConfig } from 'astro/config';

export default defineConfig({
    site: 'https://ingeniumapps.github.io/karriere-kolleg/', // ✔︎ bleibt
    base: '/karriere-kolleg/',                               // ← NEU!
    outDir: 'docs',
});