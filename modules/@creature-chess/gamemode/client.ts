// Slim client entrypoint: region vocabulary + UI/lifecycle commands +
// wire creators, without the server engine. Client mods import this.

// Side-effect: client region-class declaration-merge.
import "./src/clientRegions";

export { ClientUi, Overlay, PlayerActions } from "@creature-chess/models";
