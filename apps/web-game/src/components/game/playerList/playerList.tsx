import * as React from "react";

import { useSelector } from "react-redux";
import { useAccountId } from "~/auth/context";
import { useGameActions } from "~/networking";
import { AppState } from "~/store";
import { Player } from "~/store/game/players";

import { GamePhase } from "@creature-chess/models";
import { PlayerStatus, PlayerBattle } from "@creature-chess/models";

import { Layout } from "../../ui/layout";
import { PlayerListItem } from "./playerListItem";
import { StatusPlayerListItem } from "./statusPlayerListItem";

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

function PlayerList() {
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
		<Layout direction="column">
			{players.map((p, index) => {
				const opponentName = getOpponentName(p.battle, players);

				if (p.status === PlayerStatus.QUIT) {
					return (
						<StatusPlayerListItem
							key={p.id}
							name={p.name}
							opponentName={opponentName}
							battle={p.battle}
							status="Quit"
						/>
					);
				}

				if (p.status === PlayerStatus.DEAD) {
					return (
						<StatusPlayerListItem
							key={p.id}
							name={p.name}
							opponentName={opponentName}
							battle={p.battle}
							status="Dead"
							subtitle={`${getOrdinalSuffix(index + 1)} place`}
						/>
					);
				}

				const currentlySpectating = currentlySpectatingId === p.id;

				const onSpectateClick = () => {
					gameActions.spectate(currentlySpectating ? null : p.id);
				};

				return (
					<PlayerListItem
						key={p.id}
						index={index}
						player={p}
						isOpponent={p.id === opponentId}
						isLocal={p.id === accountId}
						onSpectateClick={onSpectateClick}
						opponentName={opponentName}
						currentlySpectating={currentlySpectating}
						showReadyIndicator={showReadyIndicators}
					/>
				);
			})}
		</Layout>
	);
}

export { PlayerList };
