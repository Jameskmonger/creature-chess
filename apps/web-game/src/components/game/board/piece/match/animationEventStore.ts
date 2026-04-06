import { BattleEvent, PieceAttackEvent } from "@creature-chess/battle";

export type ProjectileEvent =
	| { type: "piece"; sourceId: string; targetPieceId: string }
	| { type: "location"; sourceId: string; x: number; y: number };

export class PieceAnimationEventStore {
	private eventsByPiece = new Map<string, BattleEvent[]>();
	private projectileEvents: ProjectileEvent[] = [];
	private listeners = new Set<() => void>();
	private version = 0;

	public pushEvents(events: BattleEvent[]): void {
		for (const event of events) {
			const pieceId = event.pieceId;
			const existing = this.eventsByPiece.get(pieceId);

			if (existing) {
				existing.push(event);
			} else {
				this.eventsByPiece.set(pieceId, [event]);
			}

			if (
				event.type === "piece_attack" &&
				(event as PieceAttackEvent).attackTypeName === "shoot"
			) {
				const attackEvent = event as PieceAttackEvent;
				this.projectileEvents.push({
					type: "piece",
					sourceId: attackEvent.pieceId,
					targetPieceId: attackEvent.targetId,
				});
			}
		}

		this.version++;
		for (const listener of this.listeners) {
			listener();
		}
	}

	public consumeProjectileEvents(): ProjectileEvent[] {
		const events = this.projectileEvents;
		this.projectileEvents = [];
		return events;
	}

	public consumeEventsForPiece(pieceId: string): BattleEvent[] {
		const events = this.eventsByPiece.get(pieceId);

		if (!events || events.length === 0) {
			return [];
		}

		this.eventsByPiece.delete(pieceId);
		return events;
	}

	public subscribe = (listener: () => void): (() => void) => {
		this.listeners.add(listener);
		return () => {
			this.listeners.delete(listener);
		};
	};

	public getSnapshot = (): number => this.version;
}
