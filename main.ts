import { env, serve, SourceFile } from "./deps.ts";
import { addModuleVersion } from "./lib/utils.ts";
import HomePage from "./pages/index.tsx";

serve({
  name: "Cliffy",
  repository: "c4spar/deno-cliffy",
  src: [
    { src: "pages", file: "index.tsx", component: HomePage },
    { src: "c4spar/cliffy-manual@main:/", prefix: "/docs" },
  ],
  docSearch: {
    indexName: await env("DOC_SEARCH_INDEX_NAME", true),
    appId: await env("DOC_SEARCH_APP_ID", true),
    apiKey: await env("DOC_SEARCH_API_KEY", true),
  },
  pages: true,
  nav: {
    collapse: true,
    items: [{
      label: "JSR",
      href: "https://jsr.io/@cliffy",
    }],
  },
  theme: {
    fontFamily: {
      fredoka: ["Fredoka One"],
      primary: ["Mija"],
    },
  },
  scripts: {
    "/google-fonts.css": {
      url: "https://fonts.googleapis.com/css2?family=Fredoka+One&display=swap",
      contentType: "text/css",
    },
    "/assets/fonts/mija/stylesheet.css": {
      url: "assets/fonts/mija/stylesheet.css",
      contentType: "text/css",
    },
  },
  assets: [
    "assets",
  ],
  sanitize(file: SourceFile) {
    return addModuleVersion(file.content, file.rev);
  },
});
