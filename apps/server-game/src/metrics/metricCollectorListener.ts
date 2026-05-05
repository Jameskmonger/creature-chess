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
		effect: async (action) => {
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
					cards: entity.cards.map((card) =>
						card === null
							? null
							: {
									definitionId: card.definitionId,
								}
					),
					locked: entity.shopLocked,
				},
				playerInfo: {
					health: entity.health,
					money: entity.money,
					level: entity.level,
					xp: entity.xp,
					streak: {
						amount: entity.streak.amount,
						type: entity.streak.type,
					},
				},
				roundInfo: {
					round: entity.gamemode.getRoundInfo().round,
				},
			});
		},
	});
};
