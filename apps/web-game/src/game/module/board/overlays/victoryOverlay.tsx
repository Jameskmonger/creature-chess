import * as React from "react";
import { useSelector } from "react-redux";
import { AppState } from "../../../../store";
import { getPlayerById } from "../../playerList/components/selectors";
import { BoardOverlay } from "./boardOverlay";

const VictoryOverlay: React.FunctionComponent = () => {
	const spectatingPlayer = useSelector<AppState, boolean>(state => state.game.spectating.id !== null);
	const winnerName = useSelector<AppState, string | null>(state => {
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
			<div className="victory-overlay">
				<h2 className="game-over">Game Over</h2>
				<p className="winner"><span className="highlight">{winnerName}</span> wins!</p>

				<div className="discord-link">
					<p className="spectate"><span className="highlight">new:</span> You can spectate players from the player list</p>

					<p>Join us on Discord to receive notifications when someone starts a lobby, and more!</p>

					<a href="https://discord.gg/FhMm6saehb"><img src="https://i.imgur.com/OBo2QRd.png" className="discord-button" /></a>
				</div>
			</div>
		</BoardOverlay>
	);
};

export { VictoryOverlay };
