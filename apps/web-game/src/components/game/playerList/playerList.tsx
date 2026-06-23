import * as React from "react";

import { useSelector } from "react-redux";
import { useAccountId } from "~/auth/context";
import { useGameActions } from "~/networking";
import { Region } from "~/plugins";
import { AppState } from "~/store";
import { Player } from "~/store/game/players";

import { GamePhase } from "@creature-chess/models";
import { PlayerStatus, PlayerBattle } from "@creature-chess/models";

import { PlayerListItem } from "./playerListItem";
import { StatusPlayerListItem } from "./statusPlayerListItem";
import { createUseStyles } from "react-jss";

// todo move this
const getOrdinalSuffix = (i: number) => {
	const j = i % 10;
	const k = i % 100;
	if (j === 1 && k !== 11) {
		return i + "st";
	}
	if (j === 2 && k !== 12) {
		return i + "nd";
	}
	if (j === 3 && k !== 13) {
		return i + "rd";
	}
	return i + "th";
};

const getOpponentName = (battle: PlayerBattle, players: Player[]) => {
	if (!battle) {
		return "";
	}

	return players.find((p) => p.id === battle.opponentId)?.name || "";
};

const useStyles = createUseStyles({
	list: {
		display: "flex",
		flexDirection: "column",
		gap: "6px",
		padding: "10px",
		background: "#1d1d1d",
		height: "100%",
		boxSizing: "border-box",
	},
});

function PlayerList() {
	const styles = useStyles();

	const gameActions = useGameActions();
	const accountId = useAccountId();
	const players = useSelector<AppState, Player[]>(
		(state) => state.game.players
	);
	const opponentId = useSelector<AppState, string | null>(
		(state) => state.game.localPlayer.opponentId
	);
	const showReadyIndicators = useSelector<AppState, boolean>(
		(state) => state.game.roundInfo.phase === GamePhase.PREPARING
	);

	const currentlySpectatingId = useSelector<AppState, string | null>(
		(state) => state.game.spectating.id
	);

	return (
		<div className={styles.list}>
			{players.map((p, index) => {
				const opponentName = getOpponentName(p.battle, players);
				const position = index + 1;
				const inner =
					p.status === PlayerStatus.QUIT ? (
						<StatusPlayerListItem
							name={p.name}
							opponentName={opponentName}
							battle={p.battle}
							status="Quit"
						/>
					) : p.status === PlayerStatus.DEAD ? (
						<StatusPlayerListItem
							name={p.name}
							opponentName={opponentName}
							battle={p.battle}
							status="Dead"
							subtitle={`${getOrdinalSuffix(position)} place`}
						/>
					) : (
						<PlayerListItem
							index={index}
							player={p}
							isOpponent={p.id === opponentId}
							isLocal={p.id === accountId}
							onSpectateClick={() =>
								gameActions.spectate(
									currentlySpectatingId === p.id ? null : p.id
								)
							}
							opponentName={opponentName}
							currentlySpectating={currentlySpectatingId === p.id}
							showReadyIndicator={showReadyIndicators}
						/>
					);
				return (
					<Region
						key={p.id}
						cls="player-list-row"
						id={`player-list.row.${p.id}`}
						ctx={{ playerId: p.id, position }}
					>
						{inner}
					</Region>
				);
			})}
		</div>
	);
}

export { PlayerList };
