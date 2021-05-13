import { all, call } from "redux-saga/effects";

import { sendGamePhaseUpdates } from "./phases";
import { sendPlayerListUpdates } from "./playerList";
import { sendPlayerInfoUpdates } from "./playerInfoUpdates";
import { sendAnnouncements } from "./announcements";
import { sendBoardUpdates } from "./board";

export const outgoingNetworking = function*() {
	yield all([
		call(sendGamePhaseUpdates),
		call(sendPlayerListUpdates),
		call(sendAnnouncements),
		call(sendPlayerInfoUpdates),
		call(sendBoardUpdates)
	]);
};
