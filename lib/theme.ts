/**
 * Shared between the server layout (which inlines the no-flash script) and
 * the client toggle.
 *
 * This deliberately does NOT live in the "use client" component: a value
 * exported from a client module becomes a client reference when a server
 * component imports it, so the constant arrives as `undefined` and the
 * inlined script silently reads the wrong key.
 */
export const THEME_STORAGE_KEY = "standpointly:theme";

export type Theme = "light" | "dark" | "system";

/** Cycle order for the toggle. "System" is the default and a real option. */
export const THEME_ORDER: Theme[] = ["system", "light", "dark"];
