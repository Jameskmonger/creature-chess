import { setTimeoutUnthrottled } from "./unthrottledTimer";

// no typings so this needs a standard require
// eslint-disable-next-line @typescript-eslint/no-var-requires
const present = require("present");

/**
 * Start a timer, and allow for the creation of a promise at-will to wait until that timer has ended.
 *
 * Uses an unthrottled (worker-backed) timer so battles keep progressing when the
 * browser tab is inactive.
 *
 * @param ms the number of milliseconds to wait
 */
export const duration = (ms: number) => {
	const startTime = present();

	return {
		remaining: () => {
			const endTime = present();
			const timePassed = endTime - startTime;

			const remaining = Math.max(ms - timePassed, 0);

			const promise = new Promise<void>((resolve) => {
				if (remaining === 0) {
					resolve();
					return;
				}

				setTimeoutUnthrottled(() => resolve(), remaining);
			});

			return {
				promise,
				ms: remaining,
			};
		},
	};
};
