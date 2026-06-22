import * as React from "react";

import { useSelector } from "react-redux";
import { ConnectionStatus } from "~/networking";
import { AppState } from "~/store";

import { BoardOverlay } from "./boardOverlay";

function ReconnectOverlay() {
	const connectionStatus = useSelector<AppState, ConnectionStatus>(
		(state) => state.game.ui.connectionStatus
	);

	if (
		connectionStatus === ConnectionStatus.NOT_CONNECTED ||
		connectionStatus === ConnectionStatus.CONNECTED
	) {
		return null;
	}

	return (
		<BoardOverlay>
			<div>
				{connectionStatus === ConnectionStatus.DISCONNECTED && (
					<>
						<p>You've been disconnected - but you can get back in!</p>
						<p>Please refresh the page to rejoin</p>
					</>
				)}
			</div>
		</BoardOverlay>
	);
}

export { ReconnectOverlay };
