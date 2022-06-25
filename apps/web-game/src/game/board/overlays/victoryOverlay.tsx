import * as React from "react";

import { useSelector } from "react-redux";

import { Layout } from "@creature-chess/ui";
import { DiscordIcon } from "@creature-chess/ui/misc";
import { Header2, Header4 } from "@creature-chess/ui/text";

import { AppState } from "../../../store";
import { getPlayerById } from "../../module/playerList/components/selectors";
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
