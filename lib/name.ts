/**
 * Certificate name handling.
 *
 * The name is the only user-supplied text this product ever accepts, and it
 * exists for exactly one render. It is never stored (§2 — there is no
 * database), and it travels by POST rather than in a query string so it stays
 * out of browser history, referrers and server access logs.
 */

/** Longer than this and it stops fitting the certificate anyway. */
export const MAX_NAME_LENGTH = 48;

/**
 * Code points rejected outright. C0/C1 controls, and the bidi overrides and
 * isolates — the latter matter because, dropped into a document, they can
 * visually reorder the text around them. A name field should not be able to
 * do that to the rest of the certificate.
 */
function isUnsafe(codePoint: number): boolean {
  const C0 = codePoint <= 0x1f;
  const C1 = codePoint >= 0x7f && codePoint <= 0x9f;
  const BIDI_MARKS = codePoint === 0x200e || codePoint === 0x200f;
  const BIDI_EMBEDDING = codePoint >= 0x202a && codePoint <= 0x202e;
  const BIDI_ISOLATES = codePoint >= 0x2066 && codePoint <= 0x2069;
  return C0 || C1 || BIDI_MARKS || BIDI_EMBEDDING || BIDI_ISOLATES;
}

/** Normalise a submitted name, or return null when there is nothing usable. */
export function cleanName(raw: unknown): string | null {
  if (typeof raw !== "string") return null;

  let kept = "";
  for (const char of raw) {
    const codePoint = char.codePointAt(0);
    if (codePoint !== undefined && !isUnsafe(codePoint)) kept += char;
  }

  const stripped = kept.replace(/\s+/g, " ").trim();
  if (stripped.length === 0) return null;

  return stripped.length > MAX_NAME_LENGTH
    ? stripped.slice(0, MAX_NAME_LENGTH).trimEnd()
    : stripped;
}
