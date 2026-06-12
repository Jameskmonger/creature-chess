/**
 * Walks `T`, building a `.`-joined path for each leaf. Recursion stops
 * at primitives, arrays, and callables so paths don't descend into
 * string methods or array indices.
 *
 * ```ts
 * type Shape = {
 *   economy: { buyXpCost: number; rerollCost: number };
 *   ui: { theme: "light" | "dark" };
 * }
 *
 * type Paths = LeafPaths<Shape>;
 * //   ^? "economy.buyXpCost" | "economy.rerollCost" | "ui.theme"
 * ```
 */
export type LeafPaths<T, Prefix extends string = ""> = T extends
	| string
	| number
	| boolean
	| bigint
	| symbol
	| null
	| undefined
	| readonly unknown[]
	| ((...args: never[]) => unknown)
	? Prefix
	: {
			[K in keyof T & string]: LeafPaths<
				T[K],
				Prefix extends "" ? K : `${Prefix}.${K}`
			>;
		}[keyof T & string];

/**
 * Resolves the type at a dot-path through `T`. `never` for paths that
 * don't exist in the shape.
 *
 * ```ts
 * type Shape = {
 *   economy: { buyXpCost: number; rerollCost: number };
 *   ui: { theme: "light" | "dark" };
 * }
 *
 * type Cost = ValueAtPath<Shape, "economy.buyXpCost">;
 * //   ^? number
 */
export type ValueAtPath<T, P extends string> = P extends
	`${infer Head}.${infer Tail}`
	? Head extends keyof T
		? ValueAtPath<T[Head], Tail>
		: never
	: P extends keyof T
		? T[P]
		: never;
