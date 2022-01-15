import { ExamplesDataProvider, serve } from "./mod.tsx";

if (import.meta.main) {
  await serve({
    src: [{ src: "c4spar/deno-cliffy@main:docs/src", prefix: "/docs" }],
    providers: [{
      component: ExamplesDataProvider,
      props: {
        src: "c4spar/deno-cliffy@main:docs/examples",
        selected: "command.ts",
      },
    }],
  });
}
