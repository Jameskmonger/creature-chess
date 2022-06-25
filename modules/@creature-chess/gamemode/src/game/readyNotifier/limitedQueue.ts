import { EventEmitter } from "events";
import pDefer from "p-defer";

type LimitedQueue<T> = {
	clear: () => void;
	isFull: () => boolean;
	onReachLimit: (fn: () => void) => void;
	add: (item: T) => void;
	dispose: () => void;
};

export const limitedQueue = <T>(size: number): LimitedQueue<T> => {
	const events = new EventEmitter();
	let items: T[] = [];

	const checkFull = () => {
		if (items.length === size) {
			events.emit("reachLimit");
		}
	};

	return {
		clear: () => (items = []),
		isFull: () => items.length === size,
		onReachLimit: (fn) => events.on("reachLimit", fn),
		add: (item) => {
			if (items.length === size) {
				if (items.includes(item)) {
					return;
				}

				throw Error(`Limit ${size} reached`);
			}

			items.push(item);
			checkFull();
		},
		dispose: () => events.removeAllListeners(),
	};
};

export const deferLimitedQueue = <T>(queue: LimitedQueue<T>) => {
	const deferred = pDefer<void>();

	queue.onReachLimit(() => {
		deferred.resolve();
		queue.dispose();
	});

	return {
		promise: deferred.promise,
		dispose: queue.dispose,
	};
};
