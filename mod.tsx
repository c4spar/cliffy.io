/** @jsx h */

import { PageBackground } from "./components/page_background.tsx";
import {
  CreateConfigOptions,
  h,
  serve as npServe,
  SourceFile,
} from "./deps.ts";

export { ExamplesDataProvider } from "./pages/index.tsx";

export async function serve<O>(options: CreateConfigOptions<O>) {
  const src = typeof options.src === "string"
    ? [options.src]
    : options.src ?? [];

  await npServe({
    name: "Cliffy",
    pages: true,
    background: () => <PageBackground />,
    nav: {
      collapse: true,
      items: [{
        label: "API",
        href: "https://doc.deno.land/https://deno.land/x/cliffy@{rev}/mod.ts",
      }],
    },
    ...options,
    src: [
      new URL("pages", import.meta.url).href,
      ...src,
    ],
    theme: {
      fontFamily: {
        display: ["Fredoka One"],
      },
    },
    scripts: {
      "/google-fonts.css": {
        url:
          "https://fonts.googleapis.com/css2?family=Fredoka+One&display=swap",
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
}
