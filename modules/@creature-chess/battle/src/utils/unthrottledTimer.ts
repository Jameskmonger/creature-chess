// Browsers aggressively throttle setTimeout in inactive tabs (clamped to >=1s,
// frozen entirely after a few minutes). A Web Worker's timers are not throttled,
// so we run the actual setTimeout inside a worker and post back when it fires.
// Falls back to a native setTimeout off the main thread (server, tests, no Worker).

export type UnthrottledTimerHandle = { id: number };

type TimerMessage =
	| { type: "set-timeout"; timerId: number; delay: number }
	| { type: "clear-timeout"; timerId: number };

type TimerEvent = { type: "fire"; timerId: number };

let worker: Worker | undefined;
let workerUnavailable = false;
let nextTimerId = 1;
const callbacks = new Map<number, () => void>();
const nativeHandles = new Map<number, ReturnType<typeof setTimeout>>();

const workerMain = () => {
	const handles = new Map<number, ReturnType<typeof setTimeout>>();

	self.onmessage = (event: MessageEvent<TimerMessage>) => {
		const message = event.data;

		if (message.type === "set-timeout") {
			const handle = setTimeout(() => {
				handles.delete(message.timerId);
				(self as unknown as Worker).postMessage({
					type: "fire",
					timerId: message.timerId,
				});
			}, message.delay);
			handles.set(message.timerId, handle);
		} else if (message.type === "clear-timeout") {
			const handle = handles.get(message.timerId);
			if (handle !== undefined) {
				clearTimeout(handle);
				handles.delete(message.timerId);
			}
		}
	};
};

const getWorker = (): Worker | undefined => {
	if (worker || workerUnavailable) {
		return worker;
	}

	try {
		const source = `(${workerMain.toString()})();`;
		const url = URL.createObjectURL(
			new Blob([source], { type: "text/javascript" })
		);
		worker = new Worker(url);
		URL.revokeObjectURL(url);

		worker.onmessage = (event: MessageEvent<TimerEvent>) => {
			const callback = callbacks.get(event.data.timerId);
			if (callback) {
				callbacks.delete(event.data.timerId);
				callback();
			}
		};
	} catch {
		workerUnavailable = true;
	}

	return worker;
};

export const setTimeoutUnthrottled = (
	callback: () => void,
	delay: number
): UnthrottledTimerHandle => {
	const timerId = nextTimerId++;
	const activeWorker = typeof Worker !== "undefined" ? getWorker() : undefined;

	if (!activeWorker) {
		nativeHandles.set(
			timerId,
			setTimeout(() => {
				nativeHandles.delete(timerId);
				callback();
			}, delay)
		);
		return { id: timerId };
	}

	callbacks.set(timerId, callback);
	activeWorker.postMessage({ type: "set-timeout", timerId, delay });
	return { id: timerId };
};

export const clearTimeoutUnthrottled = ({ id }: UnthrottledTimerHandle) => {
	const nativeHandle = nativeHandles.get(id);
	if (nativeHandle !== undefined) {
		clearTimeout(nativeHandle);
		nativeHandles.delete(id);
		return;
	}

	callbacks.delete(id);
	worker?.postMessage({ type: "clear-timeout", timerId: id });
};
