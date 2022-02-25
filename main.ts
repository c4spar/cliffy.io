import { ExamplesDataProvider, serve } from "./mod.tsx";

await serve({
  src: [{ src: "c4spar/cliffy-docs@main:src", prefix: "/docs" }],
  providers: [{
    component: ExamplesDataProvider,
    props: {
      src: "c4spar/deno-cliffy@main:docs/examples",
      selected: "command.ts",
    },
  }],
});
