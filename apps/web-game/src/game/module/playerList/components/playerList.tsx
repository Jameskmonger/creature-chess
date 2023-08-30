import * as React from "react";

import { useDispatch, useSelector } from "react-redux";

import { PlayerActions } from "@creature-chess/gamemode";
import { GamePhase } from "@creature-chess/models";
import { PlayerListPlayer, PlayerStatus, PlayerBattle } from "@creature-chess/models/game/playerList";

import { useLocalPlayerId } from "@cc-web/auth/context";
import { StatusPlayerListItem, PlayerListItem, Layout } from "@cc-web/ui";

import { AppState } from "../../../../store";

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

const getOpponentName = (battle: PlayerBattle, players: PlayerListPlayer[]) => {
	if (!battle) {
		return "";
	}

	return players.find((p) => p.id === battle.opponentId)?.name || "";
};

const PlayerList: React.FunctionComponent = () => {
	const dispatch = useDispatch();
	const localPlayerId = useLocalPlayerId();
	const players = useSelector<AppState, PlayerListPlayer[]>(
		(state) => state.game.playerList
	);
	const opponentId = useSelector<AppState, string | null>(
		(state) => state.game.playerInfo.opponentId
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
					dispatch(
						PlayerActions.spectatePlayerAction(
							currentlySpectating ? { playerId: null } : { playerId: p.id }
						)
					);
				};

				return (
					<PlayerListItem
						key={p.id}
						index={index}
						player={p}
						isOpponent={p.id === opponentId}
						isLocal={p.id === localPlayerId}
						onSpectateClick={onSpectateClick}
						opponentName={opponentName}
						currentlySpectating={currentlySpectating}
						showReadyIndicator={showReadyIndicators}
					/>
				);
			})}
		</Layout>
	);
};

export { PlayerList };
