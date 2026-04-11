import { writeFile } from "fs";

import { StreakType } from "@creature-chess/models";

import { logger } from "../log";

type PlayerAction = {
	action: any;
	state: {
		bench: {
			piecePositions: Record<`${number},${number}`, string>;
			pieces: {
				[pieceId: string]: {
					definitionId: number;
					stage: number;
				};
			};
		};
		board: {
			piecePositions: Record<`${number},${number}`, string>;
			pieces: {
				[pieceId: string]: {
					definitionId: number;
					stage: number;
				};
			};
		};
		cardShop: {
			cards: ({
				definitionId: number;
			} | null)[];
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
};

class MetricCollector {
	private actions: PlayerAction[] = [];

	public constructor() {
		setInterval(() => this.flush(), 60000);
	}

	public recordAction(
		action: PlayerAction["action"],
		state: PlayerAction["state"]
	) {
		this.actions.push({
			action,
			state,
		});
	}

	private flush() {
		if (this.actions.length === 0) {
			return;
		}

		const now = Date.now();

		writeFile(
			`/var/creature-chess/metrics/${now}.json`,
			JSON.stringify(this.actions),
			() => {
				this.actions = [];
				logger.info("Flushed metrics", {
					file: `/var/creature-chess/metrics/${now}.json`,
				});
			}
		);
	}
}

export const metricCollector = new MetricCollector();
