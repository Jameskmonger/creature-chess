import React, { useMemo } from "react";

import { PlayerState } from "@creature-chess/gamemode";
import { GamePhase } from "@creature-chess/models";
import { PlayerStatus } from "@creature-chess/models/game/playerList";
import { StreakType } from "@creature-chess/models/player";

import { getActions } from "@cc-server/bot/src/actions";

import { useBotBrain } from "../context";
import { useAppSelector } from "../state";

function useActions() {
	const {
		value: {
			personality,
			gamemodeSettings,
			state: { health, money, level, xp, cards },
		},
	} = useBotBrain();
	const board = useAppSelector((state) => state.board);
	const bench = useAppSelector((state) => state.bench);

	const playerState = useMemo(
		(): PlayerState => ({
			board,
			bench,
			playerInfo: {
				status: PlayerStatus.CONNECTED,
				health,
				streak: {
					// TODO put in brain
					amount: 1,
					type: StreakType.WIN,
				},
				battle: null,
				matchRewards: null,
				opponentId: null,
				opponentIsClone: false,
				money,
				ready: false,
				level,
				xp,
			},
			cardShop: {
				cards,
				locked: false,
			},
			roundInfo: {
				phase: GamePhase.PREPARING,
				round: 10, // TODO put in brain
				phaseStartedAtSeconds: 0,
			},
			spectating: {
				id: null,
			},
		}),
		[board, bench, health, money, level, xp, cards]
	);

	return useMemo(
		() => getActions(playerState, personality, gamemodeSettings),
		[playerState, personality, gamemodeSettings]
	);
}

export function BotActions() {
	const actions = useActions();

	return (
		<div>
			<h2>Actions</h2>

			<table>
				<tbody>
					{actions.map((action) => (
						<tr key={action.name}>
							<td>{action.name}</td>
							<td>{action.value}</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
}
