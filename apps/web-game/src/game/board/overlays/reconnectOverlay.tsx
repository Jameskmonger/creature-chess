import * as React from "react";

import { useSelector } from "react-redux";

import { Group } from "@creature-chess/ui";

import { AppState } from "../../../store";
import { ConnectionStatus } from "../../connection-status";
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
						<p>Please refresh the page and press 'Find Game' to rejoin</p>
					</>
				)}
			</Group>
		</BoardOverlay>
	);
};

export { ReconnectOverlay };
