import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import tailwind from "@astrojs/tailwind";
import icon from "astro-icon";
import { remarkModifiedTime } from "./src/utils/remark-modified-time";
import { siteConfig } from "./src/config";

import react from "@astrojs/react";

// https://astro.build/config
export default defineConfig({
  site: siteConfig.site,
  integrations: [mdx(), sitemap(), tailwind({
    applyBaseStyles: false
  }), icon(), react()],
  markdown: {
    shikiConfig: {
      themes: {
        light: "one-light",
        dark: "one-dark-pro"
      }
    },
    remarkPlugins: [remarkModifiedTime]
  }
});