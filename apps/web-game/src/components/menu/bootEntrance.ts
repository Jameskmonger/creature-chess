import * as React from "react";

/**
 * True while the first-load boot transition is playing, so the menu plays its
 * fade-in entrance in sync with the splash. False on every later mount.
 */
export const BootEntranceContext = React.createContext(false);

// Boot transition timing (ms). The background fades in, then the logo sheens,
// then the logo fades out, and only once it's gone does the menu fade in.
export const BOOT_BG_FADE_MS = 600;
export const BOOT_SHEEN_MS = 1000;
export const BOOT_LOGO_FADE_MS = 500;
export const BOOT_MENU_FADE_MS = 500;

// The logo fades out after the background fade and the sheen have played.
export const BOOT_LOGO_FADE_DELAY_MS = BOOT_BG_FADE_MS + BOOT_SHEEN_MS;
// The menu fades in only once the logo has fully faded out.
export const BOOT_MENU_FADE_DELAY_MS =
	BOOT_LOGO_FADE_DELAY_MS + BOOT_LOGO_FADE_MS;
// Whole entrance, from the start of the transition to the menu fully shown.
export const BOOT_TRANSITION_TOTAL_MS =
	BOOT_MENU_FADE_DELAY_MS + BOOT_MENU_FADE_MS;
