import { createAction } from "@reduxjs/toolkit";

export enum Overlay {
	PLAYERS,
	SHOP,
	SETTINGS,
	STATS,
}

export const openOverlayCommand = createAction<Overlay>("ui/openOverlay");

/**
 * With no payload, closes any open overlay. With a payload, only closes if the
 * given overlay is currently open.
 */
export const closeOverlayCommand = createAction(
	"ui/closeOverlay",
	(overlay?: Overlay) => ({ payload: overlay })
);

/** Dispatched once when a game session begins. */
export const gameStartedCommand = createAction("gameStarted");
