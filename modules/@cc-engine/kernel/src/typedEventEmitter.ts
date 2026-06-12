type Handler<T> = (payload: T) => void;

/**
 * A simple typed event bus.
 */
export class TypedEventEmitter<TEvents extends Record<string, any>> {
	private handlers = new Map<keyof TEvents, Set<Handler<any>>>();

	/**
	 * Subscribes to an event. Returns an unsubscribe function.
	 *
	 * @param event The event name to subscribe to.
	 * @param handler The handler function to call when the event is emitted.
	 *
	 * @returns A function that unsubscribes the handler from the event when called.
	 */
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

	/**
	 * Subscribes to an event for a single occurrence. The handler is automatically unsubscribed after being called once.
	 *
	 * @param event The event name to subscribe to.
	 * @param handler The handler function to call when the event is emitted.
	 *
	 * @returns A function that unsubscribes the handler from the event if called before the event is emitted.
	 */
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

	/**
	 * Emits an event, calling all subscribed handlers with the provided payload. Handlers are called in the order they were subscribed.
	 *
	 * @param event The event name to emit.
	 * @param args The payload to pass to the handlers. If the event type is `void`, no payload should be provided.
	 */
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

	/**
	 * Returns a promise that resolves with the next payload for the specified event that satisfies the optional predicate.
	 *
	 * @param event The event name to wait for.
	 * @param predicate An optional function to filter events. The promise resolves only when an emitted payload satisfies this predicate.
	 * @param signal An optional AbortSignal to cancel waiting. If the signal is aborted, the promise rejects with an "AbortError".
	 * @returns A promise that resolves with the event payload when the event is emitted and the predicate (if provided) returns true.
	 */
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

	/**
	 * Removes all handlers for all events.
	 *
	 * @remarks Use with caution! This will remove all event listeners and cannot be undone.
	 */
	public removeAllListeners(): void {
		this.handlers.clear();
	}
}
