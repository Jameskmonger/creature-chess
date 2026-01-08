import { appendFile, writeFile } from "fs";
import { PiecePositionsState } from "@shoki/board/src/types";
import { StreakType } from "@creature-chess/models/player";
import { logger } from "../log";

type PlayerAction = {
	action: any;
	state: {
		bench: {
			piecePositions: PiecePositionsState;
			pieces: {
				[pieceId: string]: {
					definitionId: number;
					stage: number;
				};
			};
		};
		board: {
			piecePositions: PiecePositionsState;
			pieces: {
				[pieceId: string]: {
					definitionId: number;
					stage: number;
				};
			};
		}
		cardShop: {
			cards: {
				definitionId: number;
			}[];
			locked: boolean;
		};
		playerInfo: {
			health: number;
			money: number;
			level: number;
			xp: number;
			streak: {
				amount: number;
				type: StreakType;
			};
		};
		roundInfo: {
			round: number;
		};
	};
}

class MetricCollector {
	private actions: PlayerAction[] = [];

	constructor() {
		setInterval(() => this.flush(), 60000);
	}

	public recordAction(action: any, state: any) {
		this.actions.push({
			action,
			state
		});
	}

	private flush() {
		if (this.actions.length === 0) {
			return;
		}

		const now = Date.now();

		writeFile(
			`/var/creature-chess/metrics/${now}.json`,
			JSON.stringify(
				this.actions
				    .map((a) => ({
				    	action: a.action,
				    	state: {
				    		bench: {
				    			piecePositions: a.state.bench.piecePositions,
				    			pieces: Object.fromEntries(
				    				Object.entries(a.state.bench.pieces).map(
				    					([pieceId, piece]) => [
				    						pieceId,
				    						{
				    							definitionId: piece.definitionId,
				    							stage: piece.stage,
				    						},
				    					]
				    				)
				    			),
				    		},
							board: {
								piecePositions: a.state.board.piecePositions,
								pieces: Object.fromEntries(
									Object.entries(a.state.board.pieces).map(
										([pieceId, piece]) => [
											pieceId,
											{
												definitionId: piece.definitionId,
												stage: piece.stage,
											},
										]
									)
								),
							},
				    		cardShop: {
				    			cards: a.state.cardShop.cards.map((card) => card === null ? null : ({
				    				definitionId: card.definitionId,
				    			})),
				    			locked: a.state.cardShop.locked,
				    		},
				    		playerInfo: {
								health: a.state.playerInfo.health,
								money: a.state.playerInfo.money,
								level: a.state.playerInfo.level,
								xp: a.state.playerInfo.xp,
								streak: {
									amount: a.state.playerInfo.streak.amount,
									type: a.state.playerInfo.streak.type,
								},
				    		},
				    		roundInfo: {
				    			round: a.state.roundInfo.round,
				    		},
				    	}
					}))
				),
				() => {
					this.actions = [];
					logger.info("Flushed metrics", { file: `/var/creature-chess/metrics/${now}.json` });
				}
		);
	}
}

export const metricCollector = new MetricCollector();
