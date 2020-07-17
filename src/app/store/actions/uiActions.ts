import { Overlay } from "@app/overlay";

export const OPEN_OVERLAY = "OPEN_OVERLAY";
export type OPEN_OVERLAY = typeof OPEN_OVERLAY;
export const CLOSE_OVERLAY = "CLOSE_OVERLAY";
export type CLOSE_OVERLAY = typeof CLOSE_OVERLAY;

export type OpenOverlayAction = { type: OPEN_OVERLAY, payload: { overlay: Overlay } };
export type CloseOverlayAction = { type: CLOSE_OVERLAY };

export const openOverlay = (overlay: Overlay): OpenOverlayAction => ({
    type: OPEN_OVERLAY,
    payload: {
        overlay
    }
});

export const closeOverlay = (): CloseOverlayAction => ({ type: CLOSE_OVERLAY });
