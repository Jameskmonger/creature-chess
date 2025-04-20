import * as React from "react";

import { createUseStyles } from "react-jss";
import { useSelector } from "react-redux";

import { GamePhase } from "@creature-chess/models";
import { PlayerListPlayer } from "@creature-chess/models/game/playerList";

import { useLocalPlayerId } from "../../../../auth/context";
import { AppState } from "../../../../store";
import { Label } from "../../../ui/label";
import { Group, Half, Layout } from "../../../ui/layout";
import { Title, PlayerHealthbar, PlayerAvatar } from "../../../ui/player";
import { Header2, Header4 } from "../../../ui/text";
import { StreakIndicator } from "../../playerList";
import { BoardOverlay } from "./boardOverlay";
import { QuickChatBox } from "./quickChat/quickChatBox";
import { QuickChatButtonArray } from "./quickChat/quickChatButtonArray";

const useStyles = createUseStyles({
	wrapper: {
		"textAlign": "center",
		"flex": 1,
		"display": "flex",
		"flexDirection": "column",
		"background": "#566c86",
		"border": "2px solid #b13e53",

		"fontFamily": '"Roboto", sans-serif',

		"@media (orientation: portrait) and (min-width: 431px)": {
			padding: "8px",
		},
	},
	vsHeader: {
		"borderTop": "2px solid #b13e53",
		"borderBottom": "2px solid #b13e53",

		"& > h2": {
			margin: 0,
		},
	},
	badges: {
		display: "flex",
		flexDirection: "row",
		justifyContent: "space-between",
		boxSizing: "border-box",
		alignItems: "center",
	},
	cloneTag: {
		background: "#333333",
		marginLeft: "0.5em",
		padding: "0 0.5em",
		fontStyle: "italic",
	},
	healthbar: {
		margin: 0,
	},
	playerDetails: {
		display: "flex",
		flexDirection: "column",
		justifyContent: "center",
		flex: 1,
		gap: "4px",
	},
	playerAvatar: {
		flex: 1,
	},
	player: {
		"display": "flex",
		"flexDirection": "row",
		"padding": "8px",

		"@media (orientation: portrait) and (max-width: 430px)": {
			padding: "4px",
		},
	},
	playerName: {
		fontSize: "12px",
		fontWeight: "bolder",
	},
});

const getPositionModifier = (position: number): string => {
	if (position === 1) {
		return "st";
	}
	if (position === 2) {
		return "nd";
	}
	if (position === 3) {
		return "rd";
	}
	return "th";
};

const getPosition = (
	player: PlayerListPlayer,
	playerList: PlayerListPlayer[]
): string => {
	const position = playerList.indexOf(player) + 1;
	return `${position}${getPositionModifier(position)}`;
};

const ReadyOverlay: React.FunctionComponent = () => {
	const styles = useStyles();
	const inReadyPhase = useSelector<AppState, boolean>(
		(state) => state.game.roundInfo.phase === GamePhase.READY
	);

	const playerList = useSelector((state: AppState) => state.game.playerList);

	const localId = useLocalPlayerId();
	const localPlayer = playerList.find((p) => p.id === localId);

	const opponent = useSelector((state: AppState) => {
		const id = state.game.playerInfo.opponentId;
		return state.game.playerList.find((p) => p.id === id);
	});

	const opponentIsClone = useSelector(
		(state: AppState) => state.game.playerInfo.opponentIsClone
	);

	const spectatingPlayer = useSelector<AppState, boolean>(
		(state) => state.game.spectating.id !== null
	);

	if (!localPlayer || !opponent || !inReadyPhase || spectatingPlayer) {
		return null;
	}

	return (
		<BoardOverlay>
			<div className={styles.wrapper}>
				<div className={styles.player}>
					<div className={styles.playerDetails}>
						<span className={styles.playerName}>
							{localPlayer.name} ({getPosition(localPlayer, playerList)})
						</span>
						<Title title={localPlayer.profile?.title || null} />
						<PlayerHealthbar health={localPlayer.health} />
						<div className={styles.badges}>
							<StreakIndicator
								type={localPlayer.streakType}
								amount={localPlayer.streakAmount}
							/>
							<Label type="highlight">${localPlayer.money}</Label>
							<Label>Lv {localPlayer.level}</Label>
						</div>
					</div>
					<div className={styles.playerAvatar}>
						<PlayerAvatar player={localPlayer} />
						<QuickChatBox sendingPlayerId={localId} />
					</div>
				</div>
				<div className={styles.vsHeader}>vs.</div>
				<div className={styles.player}>
					<div className={styles.playerAvatar}>
						<PlayerAvatar player={opponent} />
						<QuickChatBox sendingPlayerId={opponent.id} />
					</div>
					<div className={styles.playerDetails}>
						<span className={styles.playerName}>
							{opponent.name} ({getPosition(opponent, playerList)})
							{opponentIsClone && (
								<span className={styles.cloneTag}>CLONE</span>
							)}
						</span>
						<Title title={opponent.profile?.title || null} />
						<PlayerHealthbar health={opponent.health} />
						<div className={styles.badges}>
							<StreakIndicator
								type={opponent.streakType}
								amount={opponent.streakAmount}
							/>
							<Label type="highlight">${opponent.money}</Label>
							<Label>Lv {opponent.level}</Label>
						</div>
					</div>
				</div>

				<QuickChatButtonArray />
			</div>
		</BoardOverlay>
	);
};

export { ReadyOverlay };
