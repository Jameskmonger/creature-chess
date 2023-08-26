import * as React from "react";

import { Layout } from "@cc-web/ui";
import { DiscordIcon } from "@cc-web/ui/misc";
import { Header2, Header4 } from "@cc-web/ui/text";
import { useSelector } from "react-redux";

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
