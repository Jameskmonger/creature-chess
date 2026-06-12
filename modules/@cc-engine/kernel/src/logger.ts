/**
 * Minimal logging interface. The kernel and plugins use this for all logging.
 *
 * Matches the interface of popular loggers like `winston`.
 */
export interface Logger {
	debug(message: string, meta?: unknown): void;
	info(message: string, meta?: unknown): void;
	warn(message: string, meta?: unknown): void;
	error(message: string, meta?: unknown): void;
}

/**
 * Creates a scoped logger that merges the provided context into every log call.
 *
 * @param base The base logger to wrap.
 * @param context The context to merge into each log call's metadata.
 * @returns A new logger instance with the context automatically included.
 */
export const scopedLogger = (
	base: Logger,
	context: Record<string, unknown>
): Logger => {
	const wrap =
		(level: "debug" | "info" | "warn" | "error") =>
		(message: string, meta?: unknown) => {
			if (meta && typeof meta === "object" && !Array.isArray(meta)) {
				base[level](message, { ...context, ...(meta as object) });
			} else if (meta === undefined) {
				base[level](message, context);
			} else {
				base[level](message, { ...context, value: meta });
			}
		};
	return {
		debug: wrap("debug"),
		info: wrap("info"),
		warn: wrap("warn"),
		error: wrap("error"),
	};
};
