import { Board, PieceId } from "./board";

type Listener = () => void;

export class SubscribableBoard extends Board {
	private listeners = new Set<Listener>();
	private version = 0;

	private rafScheduled = false;
	private pendingNotify = false;

	public subscribe = (listener: Listener) => {
		this.listeners.add(listener);
		return () => this.listeners.delete(listener);
	};

	public getSnapshot = () => this.version;

	public override setPieces(pieces: { id: PieceId; x: number; y: number }[]) {
		super.setPieces(pieces);
		// big change; paint now
		this.markChanged({ immediate: true });
	}

	public override setPiece(pieceId: PieceId, x: number, y: number) {
		super.setPiece(pieceId, x, y);
		this.markChanged();
	}

	public override removePiece(pieceId: PieceId) {
		super.removePiece(pieceId);
		this.markChanged();
	}

	public override swapPieces(pieceIdA: PieceId, pieceIdB: PieceId) {
		super.swapPieces(pieceIdA, pieceIdB);
		this.markChanged();
	}

	protected markChanged(opts?: { immediate?: boolean }) {
		this.version++;

		const immediate = opts?.immediate ?? false;

		// coalesce to the next animation frame to avoid excessive renders
		const shouldCoalesce =
			!immediate &&
			typeof window !== "undefined" &&
			typeof requestAnimationFrame !== "undefined";

		if (!shouldCoalesce) {
			this.notifyListeners();
			return;
		}

		this.pendingNotify = true;
		if (this.rafScheduled) {
			return;
		}

		this.rafScheduled = true;
		requestAnimationFrame(() => {
			this.rafScheduled = false;
			if (!this.pendingNotify) {
				return;
			}
			this.pendingNotify = false;

			this.notifyListeners();
		});
	}

	private notifyListeners() {
		for (const l of this.listeners) {
			l();
		}
	}
}
