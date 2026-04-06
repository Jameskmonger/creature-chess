import { BattleEvent } from "@creature-chess/battle";

export class PieceAnimationEventStore {
	private eventsByPiece = new Map<string, BattleEvent[]>();
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
		}

		this.version++;
		for (const listener of this.listeners) {
			listener();
		}
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
