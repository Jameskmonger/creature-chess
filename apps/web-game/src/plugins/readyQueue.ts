export interface ReadyQueue {
	readonly isReady: boolean;
	onReady(fn: () => void): void;
	fire(): void;
}

export const createReadyQueue = (
	onError: (error: unknown) => void = (e) => {
		// eslint-disable-next-line no-console
		console.error("[plugins] onReady callback threw", e);
	}
): ReadyQueue => {
	const queued: (() => void)[] = [];
	let ready = false;

	return {
		get isReady() {
			return ready;
		},
		onReady(fn) {
			if (ready) {
				try {
					fn();
				} catch (error) {
					onError(error);
				}
				return;
			}
			queued.push(fn);
		},
		fire() {
			if (ready) {
				return;
			}
			ready = true;
			const drained = queued.splice(0, queued.length);
			for (const fn of drained) {
				try {
					fn();
				} catch (error) {
					onError(error);
				}
			}
		},
	};
};
