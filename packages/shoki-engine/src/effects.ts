/**
 * This file contains 'wrappers' around redux-saga effects, to prevent the compiler complaining
 */

export interface Effect<T = any, P = any> {
	"@@redux-saga/IO": true;
	combinator: boolean;
	type: T;
	payload: P;
}

export interface SimpleEffect<T, P = any> extends Effect<T, P> {
	combinator: false;
}

export type GetContextEffect = SimpleEffect<"GET_CONTEXT", string>;

export type Saga<Args extends any[] = any[]> = (...args: Args) => Iterator<any>;

export interface Task {
	/**
	 * Returns true if the task hasn't yet returned or thrown an error
	 */
	isRunning(): boolean;
	/**
	 * Returns true if the task has been cancelled
	 */
	isCancelled(): boolean;
	/**
	 * Returns task return value. `undefined` if task is still running
	 */
	result<T = any>(): T | undefined;
	/**
	 * Returns task thrown error. `undefined` if task is still running
	 */
	error(): any | undefined;
	/**
	 * Returns a Promise which is either:
	 * - resolved with task's return value
	 * - rejected with task's thrown error
	 */
	toPromise<T = any>(): Promise<T>;
	/**
	 * Cancels the task (If it is still running)
	 */
	cancel(): void;
	setContext<C extends object>(props: Partial<C>): void;
}
