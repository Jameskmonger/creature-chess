export type CancellableTask = {
	cancel(): void;
	promise: Promise<void>;
};
