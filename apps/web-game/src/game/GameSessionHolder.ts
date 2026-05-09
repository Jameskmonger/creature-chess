import { GameSession } from "./GameSession";

export class GameSessionHolder {
	private session: GameSession | null = null;
	private listeners = new Set<() => void>();
	private version = 0;

	public get(): GameSession {
		if (!this.session) {
			throw new Error("GameSessionHolder accessed before session was set");
		}
		return this.session;
	}

	public peek(): GameSession | null {
		return this.session;
	}

	public set(session: GameSession): void {
		this.session = session;
		this.version++;
		for (const listener of this.listeners) {
			listener();
		}
	}

	public clear(): void {
		this.session = null;
		this.version++;
		for (const listener of this.listeners) {
			listener();
		}
	}

	public subscribe = (listener: () => void): (() => void) => {
		this.listeners.add(listener);
		return () => {
			this.listeners.delete(listener);
		};
	};

	public getSnapshot = (): number => this.version;
}
