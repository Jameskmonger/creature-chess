import { defineClientPlugin } from "@cc-plugins/api";

// Import the client plugin API so that type definitions are available for this file.
import "@creature-chess/gamemode/client";

import pkg from "../../package.json";

export default defineClientPlugin(pkg, {
	// reducers: { mySlice: myReducer },
	// listeners: [setupSomething],
	// wire: { inbound: [myEvent], outbound: [myAction] },
	// ui: [
	//   augment("player-avatar", ({ playerId }) => <Badge playerId={playerId}/>, { slot: "after" }),
	//   replace("phase-timer", (ctx) => <MyTimer {...ctx}/>),
	// ],
});
