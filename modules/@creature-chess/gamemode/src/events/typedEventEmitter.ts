type Handler<T> = (payload: T) => void;

export class TypedEventEmitter<TEvents extends Record<string, any>> {
	private handlers = new Map<keyof TEvents, Set<Handler<any>>>();

	public on<K extends keyof TEvents>(
		event: K,
		handler: Handler<TEvents[K]>
	): () => void {
		if (!this.handlers.has(event)) {
			this.handlers.set(event, new Set());
		}

		this.handlers.get(event)!.add(handler);

		return () => {
			this.handlers.get(event)?.delete(handler);
		};
	}

	public once<K extends keyof TEvents>(
		event: K,
		handler: Handler<TEvents[K]>
	): () => void {
		const wrapper: Handler<TEvents[K]> = (payload) => {
			unsubscribe();
			handler(payload);
		};

		const unsubscribe = this.on(event, wrapper);
		return unsubscribe;
	}

	public emit<K extends keyof TEvents>(
		event: K,
		...args: TEvents[K] extends void ? [] : [TEvents[K]]
	): void {
		const handlers = this.handlers.get(event);
		if (!handlers) {
			return;
		}

		for (const handler of handlers) {
			handler(args[0]);
		}
	}

	public waitFor<K extends keyof TEvents>(
		event: K,
		predicate?: (payload: TEvents[K]) => boolean,
		signal?: AbortSignal
	): Promise<TEvents[K]> {
		return new Promise<TEvents[K]>((resolve, reject) => {
			if (signal?.aborted) {
				reject(signal.reason ?? new DOMException("Aborted", "AbortError"));
				return;
			}

			const unsubscribe = this.on(event, (payload) => {
				if (predicate && !predicate(payload)) {
					return;
				}

				cleanup();
				resolve(payload);
			});

			const onAbort = () => {
				cleanup();
				reject(signal!.reason ?? new DOMException("Aborted", "AbortError"));
			};

			const cleanup = () => {
				unsubscribe();
				signal?.removeEventListener("abort", onAbort);
			};

			signal?.addEventListener("abort", onAbort);
		});
	}

	public removeAllListeners(): void {
		this.handlers.clear();
	}
}
