export class EventBus<TEventMap extends Record<string, any>> {
	private listeners = new Map<keyof TEventMap, Set<(data: any) => void>>();

	public on<K extends keyof TEventMap>(
		event: K,
		handler: (data: TEventMap[K]) => void
	): () => void {
		if (!this.listeners.has(event)) {
			this.listeners.set(event, new Set());
		}

		this.listeners.get(event)!.add(handler);

		return () => {
			this.listeners.get(event)?.delete(handler);
		};
	}

	public emit<K extends keyof TEventMap>(event: K, data: TEventMap[K]): void {
		const handlers = this.listeners.get(event);
		if (!handlers) {
			return;
		}

		for (const handler of handlers) {
			handler(data);
		}
	}

}
