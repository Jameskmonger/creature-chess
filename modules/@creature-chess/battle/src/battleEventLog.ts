import { Direction } from "./utils/direction";

export type PieceAttackEvent = {
	type: "piece_attack";
	pieceId: string;
	targetId: string;
	attackTypeName: string;
	direction: Direction;
	distance: number;
	damage: number;
};

export type PieceHitEvent = {
	type: "piece_hit";
	pieceId: string;
	direction: Direction;
	damage: number;
};

export type PieceDyingEvent = {
	type: "piece_dying";
	pieceId: string;
};

export type BattleEvent = PieceAttackEvent | PieceHitEvent | PieceDyingEvent;

export class BattleEventLog {
	private events: BattleEvent[] = [];

	public append(event: BattleEvent): void {
		this.events.push(event);
	}

	public consume(): BattleEvent[] {
		const events = this.events;
		this.events = [];
		return events;
	}
}
