#!/usr/bin/env -S deno run --unstable

import { KeyCode, parse } from "https://deno.land/x/cliffy/keycode/mod.ts";

while (true) {
  const data = new Uint8Array(8);

  Deno.setRaw(Deno.stdin.rid, true);
  const nread = await Deno.stdin.read(data);
  Deno.setRaw(Deno.stdin.rid, false);

  if (nread === null) {
    break;
  }

  const keys: Array<KeyCode> = parse(data.subarray(0, nread));

  for (const key of keys) {
    if (key.ctrl && key.name === "c") {
      console.log("exit");
      Deno.exit();
    }
    console.log("Key pressed: %O", key);
  }
}
