import { serve, SourceFile } from "./deps.ts";
import { addModuleVersion } from "./lib/utils.ts";
import { ExamplesDataProvider } from "./pages/index.tsx";

await serve({
  name: "Cliffy",
  repository: "c4spar/deno-cliffy",
  src: [
    "pages",
    { src: "c4spar/cliffy-manual@main:src", prefix: "/docs" },
  ],
  providers: [{
    component: ExamplesDataProvider,
    props: {
      src: "c4spar/cliffy-manual@main:examples",
      selected: "command.ts",
    },
  }],
  pages: true,
  nav: {
    collapse: true,
    items: [{
      label: "API",
      href: "https://doc.deno.land/https://deno.land/x/cliffy@{rev}/mod.ts",
    }],
  },
  theme: {
    fontFamily: {
      display: ["Fredoka One"],
    },
  },
  scripts: {
    "/google-fonts.css": {
      url: "https://fonts.googleapis.com/css2?family=Fredoka+One&display=swap",
      contentType: "text/css",
    },
  },
  sanitize(file: SourceFile) {
    return addModuleVersion(file.content, file.rev);
  },
});
