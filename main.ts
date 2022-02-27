import { serve, SourceFile } from "./deps.ts";
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
      src: "examples",
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
    // Add selected version to cliffy module imports.
    if (file.rev) {
      return file.content
        .replace(
          /https:\/\/deno\.land\/x\/cliffy\//g,
          `https://deno.land/x/cliffy@${file.rev}/`,
        )
        .replace(
          /https:\/\/deno\.land\/x\/cliffy@<version>\//g,
          `https://deno.land/x/cliffy@${file.rev}/`,
        )
        .replace(
          /https:\/\/x\.nest\.land\/cliffy@<version>\//g,
          `https://x.nest.land/cliffy@${file.rev}/`,
        )
        .replace(
          /https:\/\/raw\.githubusercontent\.com\/c4spar\/deno-cliffy\/<version>\//g,
          `https://raw.githubusercontent.com/c4spar/deno-cliffy/${file.rev}/`,
        );
    }

    return file.content;
  },
});
