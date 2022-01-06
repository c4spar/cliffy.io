import { ExamplesDataProvider, serve } from "./mod.tsx";

await serve({
  repository: "c4spar/deno-cliffy",
  src: [],
  providers: [
    {
      component: ExamplesDataProvider,
      props: {
        src: "c4spar/deno-cliffy@main:/docs/examples",
        selected: "command.ts",
      },
    },
  ],
});
