/**
 * Share image formats and their disk cache — §7.
 *
 * Images are a pure function of (testId, locale, format, x, y, version), so
 * they are cached under a hash of exactly those and re-rendered after 24h.
 * Nothing user-identifying goes into the key because nothing user-identifying
 * exists — the result is two numbers (§2).
 */

import { createHash } from "node:crypto";
import { mkdir, readFile, stat, writeFile } from "node:fs/promises";
import path from "node:path";

export const SHARE_FORMATS = {
  og: { width: 1200, height: 630 },
  square: { width: 1080, height: 1080 },
  story: { width: 1080, height: 1920 },
} as const;

export type ShareFormat = keyof typeof SHARE_FORMATS;

export function isShareFormat(value: string): value is ShareFormat {
  return Object.hasOwn(SHARE_FORMATS, value);
}

export const CACHE_TTL_MS = 24 * 60 * 60 * 1000;

const CACHE_DIR = path.join(process.cwd(), ".cache", "share");

export function shareKey(parts: {
  testId: string;
  locale: string;
  format: ShareFormat;
  x: number;
  y: number;
  version: number;
}): string {
  const raw = [
    parts.testId,
    parts.locale,
    parts.format,
    parts.x.toFixed(4),
    parts.y.toFixed(4),
    parts.version,
  ].join("|");
  return createHash("sha256").update(raw).digest("hex").slice(0, 32);
}

export async function readCached(key: string): Promise<Buffer | null> {
  const file = path.join(CACHE_DIR, `${key}.png`);
  try {
    const info = await stat(file);
    if (Date.now() - info.mtimeMs > CACHE_TTL_MS) return null;
    return await readFile(file);
  } catch {
    return null;
  }
}

export async function writeCached(key: string, data: Buffer): Promise<void> {
  try {
    await mkdir(CACHE_DIR, { recursive: true });
    await writeFile(path.join(CACHE_DIR, `${key}.png`), data);
  } catch {
    // A cold cache is slower, not broken.
  }
}

/**
 * Absolute origin to point the internal browser renderer at.
 * Defaults to the local server instance (http://127.0.0.1:${PORT}) so headless
 * Chromium renders locally inside the container without traversing external CDNs,
 * DNS hairpins, or Cloudflare bot protections.
 */
export function renderOrigin(requestUrl?: string): string {
  if (process.env.INTERNAL_URL) {
    return process.env.INTERNAL_URL;
  }
  if (process.env.RENDER_ORIGIN) {
    return process.env.RENDER_ORIGIN;
  }
  const port = process.env.PORT || "3000";
  return `http://127.0.0.1:${port}`;
}
