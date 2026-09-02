/**
 * Server-side config loading — BUILD_SPEC §4.
 *
 * Split out of `lib/scoring.ts` because §2 puts scoring 100% client-side:
 * anything a client component imports must not pull `node:fs` into the
 * bundle. The flow loads the config on the server and hands it down as a
 * prop; scoring then runs in the browser with no round trip.
 */

import { readdirSync, readFileSync } from "node:fs";
import path from "node:path";
import { parseTest } from "@/lib/scoring";
import type { TestConfig } from "@/lib/types";

export const CONFIG_DIR = path.join(process.cwd(), "config", "tests");

/** Load and validate `/config/tests/<id>.json`. Server-side only. */
export function loadTest(id: string): TestConfig {
  if (!/^[a-z0-9_-]+$/i.test(id)) {
    throw new Error(`invalid test id '${id}'`);
  }

  const file = path.join(CONFIG_DIR, `${id}.json`);
  let contents: string;
  try {
    contents = readFileSync(file, "utf8");
  } catch {
    throw new Error(`no test config at ${file}`);
  }

  const config = parseTest(JSON.parse(contents));
  if (config.id !== id) {
    throw new Error(`config id '${config.id}' does not match filename '${id}'`);
  }
  return config;
}

/** Every test id with a config file, sorted. */
export function listTestIds(): string[] {
  return readdirSync(CONFIG_DIR)
    .filter((f) => f.endsWith(".json"))
    .map((f) => f.replace(/\.json$/, ""))
    .sort();
}
