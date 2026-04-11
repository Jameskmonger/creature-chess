import {
	PlayerActionTypesArray,
	quickChatPlayerAction,
	quitGamePlayerAction,
	spectatePlayerAction,
} from "@creature-chess/gamemode";
import { Player } from "@creature-chess/gamemode";

import { metricCollector } from "./metricCollector";

const IGNORED_ACTIONS = [
	quickChatPlayerAction.toString(),
	quitGamePlayerAction.toString(),
	spectatePlayerAction.toString(),
];

const TRACKED_ACTIONS = new Set(
	PlayerActionTypesArray.filter((action) => !IGNORED_ACTIONS.includes(action))
);

export const setupMetricCollector = (entity: Player) => {
	const {
		bench,
		board,
		gamemode: { pieceRegistry },
	} = entity;

	return entity.addListener({
		predicate: (action) => TRACKED_ACTIONS.has(action.type),
		effect: async (action, api) => {
			const s = api.getState();

			metricCollector.recordAction(action, {
				bench: {
					piecePositions: bench.reducePieces(
						(acc, id, x, y) => {
							acc[`${x},${y}`] = id;
							return acc;
						},
						{} as Record<`${number},${number}`, string>
					),
					pieces: bench.reducePieces(
						(acc, id) => {
							const p = pieceRegistry.getPieceById(id);

							if (p) {
								acc[id] = {
									definitionId: p.definitionId,
									stage: p.stage,
								};
							}

							return acc;
						},
						{} as Parameters<
							typeof metricCollector.recordAction
						>[1]["bench"]["pieces"]
					),
				},
				board: {
					piecePositions: board.reducePieces(
						(acc, id, x, y) => {
							acc[`${x},${y}`] = id;
							return acc;
						},
						{} as Record<`${number},${number}`, string>
					),
					pieces: board.reducePieces(
						(acc, id) => {
							const p = pieceRegistry.getPieceById(id);

							if (p) {
								acc[id] = {
									definitionId: p.definitionId,
									stage: p.stage,
								};
							}

							return acc;
						},
						{} as Parameters<
							typeof metricCollector.recordAction
						>[1]["board"]["pieces"]
					),
				},
				cardShop: {
					cards: s.cardShop.cards.map((card) =>
						card === null
							? null
							: {
									definitionId: card.definitionId,
								}
					),
					locked: s.cardShop.locked,
				},
				playerInfo: {
					health: s.playerInfo.health,
					money: s.playerInfo.money,
					level: s.playerInfo.level,
					xp: s.playerInfo.xp,
					streak: {
						amount: s.playerInfo.streak.amount,
						type: s.playerInfo.streak.type,
					},
				},
				roundInfo: {
					round: s.roundInfo.round,
				},
			});
		},
	});
};
