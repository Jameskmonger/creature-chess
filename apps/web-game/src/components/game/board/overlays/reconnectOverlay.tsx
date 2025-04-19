import * as React from "react";

import { useSelector } from "react-redux";

import { Group } from "@cc-web/ui";

import { ConnectionStatus } from "../../../../networking/connection-status";
import { AppState } from "../../../../store";
import { BoardOverlay } from "./boardOverlay";

const ReconnectOverlay: React.FunctionComponent = () => {
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
			<Group>
				{connectionStatus === ConnectionStatus.DISCONNECTED && (
					<>
						<p>You've been disconnected - but you can get back in!</p>
						<p>Please refresh the page to rejoin</p>
					</>
				)}
			</Group>
		</BoardOverlay>
	);
};

export { ReconnectOverlay };
