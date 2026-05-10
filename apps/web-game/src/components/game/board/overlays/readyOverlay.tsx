import * as React from "react";

import { useSelector } from "react-redux";
import { BalanceIcon } from "~/components/ui/icon/BalanceIcon";
import { LevelIcon } from "~/components/ui/icon/LevelIcon";
import { CloneChip } from "~/components/ui/player/CloneChip";
import { PositionChip } from "~/components/ui/player/PositionChip";
import { AppState } from "~/store";
import {
	useLocalPlayer,
	useOpponentPlayer,
	usePlayerRank,
} from "~/store/game/players";
import { createUseThemeStyles } from "~/useStyles";

import { GamePhase } from "@creature-chess/models";

import { Title, PlayerHealthbar, PlayerAvatar } from "../../../ui/player";
import { StreakIndicator } from "../../playerList";
import { BoardOverlay } from "./boardOverlay";
import { QuickChatBox } from "./quickChat/quickChatBox";
import { QuickChatButtonArray } from "./quickChat/quickChatButtonArray";

const useStyles = createUseThemeStyles((theme) => ({
	root: {
		"display": "flex",
		"flexDirection": "column",
		"justifyContent": "center",
		"width": "100%",
		"gap": "16px",

		"@media (orientation: portrait) and (min-width: 431px)": {
			gap: "32px",
		},
	},
	wrapper: {
		"textAlign": "center",
		"flex": 1,
		"display": "flex",
		"flexDirection": "column",
		"justifyContent": "center",
		"background": "#566c86",
		"border": "2px solid #b13e53",

		"fontFamily": theme.typography.primary,

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
		flex: 2,
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
	nameWrapper: {
		display: "flex",
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
		flexWrap: "wrap",
		gap: "8px",
	},
	playerName: {
		fontSize: "12px",
	},
	tags: {
		display: "flex",
		flexDirection: "row",
		gap: "4px",
	},
}));

function ReadyOverlay() {
	const styles = useStyles();
	const inReadyPhase = useSelector<AppState, boolean>(
		(state) => state.game.roundInfo.phase === GamePhase.READY
	);

	const localPlayer = useLocalPlayer();
	const opponent = useOpponentPlayer();
	const localRank = usePlayerRank(localPlayer?.id ?? "");
	const opponentRank = usePlayerRank(opponent?.id ?? "");

	const spectatingPlayer = useSelector<AppState, boolean>(
		(state) => state.game.spectating.id !== null
	);

	if (!localPlayer || !opponent || !inReadyPhase || spectatingPlayer) {
		return null;
	}

	const opponentIsClone = localPlayer.opponentIsClone;

	return (
		<BoardOverlay>
			<div className={styles.root}>
				<div className={styles.wrapper}>
					<div className={styles.player}>
						<div className={styles.playerDetails}>
							<div className={styles.nameWrapper}>
								<span className={styles.playerName}>{localPlayer.name}</span>
								<PositionChip position={localRank} />
							</div>
							<Title title={localPlayer.profile?.title || null} />
							<PlayerHealthbar health={localPlayer.health} />
							<div className={styles.badges}>
								<StreakIndicator
									type={localPlayer.streakType}
									amount={localPlayer.streakAmount}
								/>
								<BalanceIcon amount={localPlayer.money} />
								<LevelIcon amount={localPlayer.level} />
							</div>
						</div>
						<div className={styles.playerAvatar}>
							<PlayerAvatar player={localPlayer} />
							<QuickChatBox sendingPlayerId={localPlayer.id} />
						</div>
					</div>
					<div className={styles.vsHeader}>vs.</div>
					<div className={styles.player}>
						<div className={styles.playerAvatar}>
							<PlayerAvatar player={opponent} />
							<QuickChatBox sendingPlayerId={opponent.id} />
						</div>
						<div className={styles.playerDetails}>
							<div className={styles.nameWrapper}>
								<span className={styles.playerName}>{opponent.name}</span>
								<div className={styles.tags}>
									<PositionChip position={opponentRank} />
									{opponentIsClone && <CloneChip />}
								</div>
							</div>
							<Title title={opponent.profile?.title || null} />
							<PlayerHealthbar health={opponent.health} />
							<div className={styles.badges}>
								<StreakIndicator
									type={opponent.streakType}
									amount={opponent.streakAmount}
								/>
								<BalanceIcon amount={opponent.money} />
								<LevelIcon amount={opponent.level} />
							</div>
						</div>
					</div>
				</div>

				<QuickChatButtonArray />
			</div>
		</BoardOverlay>
	);
}

export { ReadyOverlay };
