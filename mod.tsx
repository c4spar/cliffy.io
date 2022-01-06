/** @jsx h */

import { PageBackground } from "./components/page_background.tsx";
import { CreateConfigOptions, h, serve as npServe } from "./deps.ts";

export { ExamplesDataProvider } from "./pages/index.tsx";

console.log("URL:", import.meta.url);
console.log("PAGES:", new URL("pages", import.meta.url).href);

export async function serve<O>(options: CreateConfigOptions<O>) {
  await npServe({
    rev: "main",
    pages: true,
    pagesDropdown: true,
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
      // new URL("pages/index.tsx", import.meta.url).href,
      // new URL("pages/benchmarks.tsx", import.meta.url).href,
      ...typeof options.src === "string" ? [options.src] : options.src ?? [],
    ],
  });
}
