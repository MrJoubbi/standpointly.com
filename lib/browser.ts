/**
 * Shared headless Chromium — §2.
 *
 * Chromium, not satori or @react-pdf/renderer: the share image and the
 * certificate both have to render in the user's chosen language, and that
 * list will include Arabic. Only a real browser shapes it correctly.
 *
 * One browser process is launched lazily and reused. Launching per request
 * costs ~300ms and a few hundred MB, which on a single VPS is the difference
 * between a share image and a timeout.
 */

import fs from "node:fs";
import { chromium, type Browser, type Page } from "playwright";

let browserInstance: Browser | null = null;
let browserPromise: Promise<Browser> | null = null;

function getExecutablePath(): string | undefined {
  if (process.env.CHROMIUM_PATH && fs.existsSync(process.env.CHROMIUM_PATH)) {
    return process.env.CHROMIUM_PATH;
  }
  const knownPaths = [
    "/usr/bin/chromium",
    "/usr/bin/chromium-browser",
    "/usr/bin/google-chrome",
    "/usr/bin/google-chrome-stable",
    "/snap/bin/chromium",
  ];
  for (const p of knownPaths) {
    if (fs.existsSync(p)) return p;
  }
  return undefined;
}

const COMMON_CHROME_ARGS = [
  "--no-sandbox",
  "--disable-setuid-sandbox",
  "--disable-dev-shm-usage",
  "--disable-accelerated-2d-canvas",
  "--disable-gpu",
  "--no-first-run",
  "--no-zygote",
  "--disable-extensions",
  "--disable-background-networking",
  "--disable-default-apps",
  "--disable-sync",
  "--disable-translate",
  "--hide-scrollbars",
  "--metrics-recording-only",
  "--mute-audio",
  "--font-render-hinting=none",
];

async function launchBrowser(): Promise<Browser> {
  const executablePath = getExecutablePath();

  // Attempt 1: Launch with detected system binary if available
  if (executablePath) {
    try {
      return await chromium.launch({
        headless: true,
        executablePath,
        args: COMMON_CHROME_ARGS,
      });
    } catch (err) {
      console.warn(`Launch with ${executablePath} failed, trying default Playwright Chromium:`, err);
    }
  }

  // Attempt 2: Launch with Playwright bundled Chromium
  try {
    return await chromium.launch({
      headless: true,
      args: COMMON_CHROME_ARGS,
    });
  } catch (err) {
    console.warn("Default Playwright Chromium launch failed, trying fallback channel:", err);
  }

  // Attempt 3: Fallback channel "chrome" or "chromium"
  try {
    return await chromium.launch({
      headless: true,
      channel: "chromium",
      args: COMMON_CHROME_ARGS,
    });
  } catch (err3) {
    console.error("All Chromium launch attempts failed:", err3);
    throw new Error(`Failed to launch Chromium: ${err3 instanceof Error ? err3.message : String(err3)}`);
  }
}

async function getBrowser(): Promise<Browser> {
  if (browserInstance && browserInstance.isConnected()) {
    return browserInstance;
  }

  if (!browserPromise) {
    browserPromise = launchBrowser()
      .then((b) => {
        browserInstance = b;
        b.on("disconnected", () => {
          browserInstance = null;
          browserPromise = null;
        });
        return b;
      })
      .catch((err) => {
        browserInstance = null;
        browserPromise = null;
        throw err;
      });
  }

  return browserPromise;
}

/**
 * Run `fn` against a fresh page at `url`, then dispose of it. Waits for fonts
 * to settle so text is never captured mid-swap.
 */
export async function withPage<T>(
  url: string,
  viewport: { width: number; height: number },
  fn: (page: Page) => Promise<T>,
): Promise<T> {
  const browser = await getBrowser();
  const context = await browser.newContext({
    viewport,
    deviceScaleFactor: 1,
    reducedMotion: "reduce",
    colorScheme: "light",
    ignoreHTTPSErrors: true,
  });
  const page = await context.newPage();
  try {
    const response = await page.goto(url, {
      waitUntil: "domcontentloaded",
      timeout: 20_000,
    });
    if (!response || !response.ok()) {
      throw new Error(
        `render target returned ${response ? response.status() : "no response"} for ${url}`,
      );
    }
    // Give fonts a moment to settle without hanging indefinitely
    await page.evaluate(() => {
      if (typeof document !== "undefined" && document.fonts) {
        return Promise.race([
          document.fonts.ready,
          new Promise((resolve) => setTimeout(resolve, 1000)),
        ]);
      }
      return Promise.resolve();
    }).catch(() => {});

    return await fn(page);
  } finally {
    await context.close().catch(() => {});
  }
}

export async function closeBrowser(): Promise<void> {
  if (!browserInstance) return;
  const b = browserInstance;
  browserInstance = null;
  browserPromise = null;
  await b.close().catch(() => {});
}


