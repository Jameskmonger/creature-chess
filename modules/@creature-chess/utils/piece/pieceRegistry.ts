import { PieceModel } from "@creature-chess/models";

type Listener = () => void;

export class PieceRegistry {
	private readonly pieces: Map<PieceModel["id"], PieceModel>;

	private listeners = new Set<Listener>();
	private version = 0;

	private rafScheduled = false;
	private pendingNotify = false;

	public constructor() {
		this.pieces = new Map();
	}

	public subscribe = (listener: Listener) => {
		this.listeners.add(listener);
		return () => this.listeners.delete(listener);
	};

	public getSnapshot = () => this.version;

	public registerPiece(piece: PieceModel) {
		this.pieces.set(piece.id, piece);
		this.markChanged();
	}

	public deregisterPiece(pieceId: PieceModel["id"]) {
		this.pieces.delete(pieceId);
		this.markChanged();
	}

	public getPieceById(pieceId: PieceModel["id"]): PieceModel | null {
		return this.pieces.get(pieceId) || null;
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
