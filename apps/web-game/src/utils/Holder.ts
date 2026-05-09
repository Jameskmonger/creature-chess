/**
 * Subscribable single-value container, suitable for connecting to via
 * `useSyncExternalStore()`.
 */
export class Holder<T> {
	private value: T | null = null;
	private listeners = new Set<() => void>();
	private version = 0;

	public constructor(private readonly name: string) {}

	public get(): T {
		if (!this.value) {
			throw new Error(`${this.name} accessed before it was set`);
		}
		return this.value;
	}

	public peek(): T | null {
		return this.value;
	}

	public set(value: T): void {
		this.value = value;
		this.bumpVersion();
	}

	public clear(): void {
		this.value = null;
		this.bumpVersion();
	}

	public subscribe = (listener: () => void): (() => void) => {
		this.listeners.add(listener);
		return () => {
			this.listeners.delete(listener);
		};
	};

	public getSnapshot = (): number => this.version;

	private bumpVersion() {
		this.version++;
		for (const listener of this.listeners) {
			listener();
		}
	}
}
