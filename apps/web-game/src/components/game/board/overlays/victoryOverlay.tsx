import * as React from "react";

import { useSelector } from "react-redux";

import { AppState } from "../../../../store";
import { getPlayerById } from "../../../../store/selectors";
import { DiscordIcon } from "../../../ui/DiscordIcon";
import { Layout } from "../../../ui/layout";
import { Header2, Header4 } from "../../../ui/text";
import { BoardOverlay } from "./boardOverlay";

const VictoryOverlay: React.FunctionComponent = () => {
	const spectatingPlayer = useSelector<AppState, boolean>(
		(state) => state.game.spectating.id !== null
	);
	const winnerName = useSelector<AppState, string | null>((state) => {
		const { winnerId } = state.game.ui;

		if (!winnerId) {
			return null;
		}

		// todo fix this selector
		return getPlayerById(winnerId)(state)?.name || null;
	});

	if (!winnerName || spectatingPlayer) {
		return null;
	}

	return (
		<BoardOverlay>
			<Layout direction="column">
				<Header2>Game Over</Header2>

				<Header4>{winnerName} wins!</Header4>

				<p>new: You can spectate players from the player list</p>

				<DiscordIcon />
			</Layout>
		</BoardOverlay>
	);
};

export { VictoryOverlay };
