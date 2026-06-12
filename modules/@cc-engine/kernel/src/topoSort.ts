export interface TopoSortProblem {
	kind: "missing-dep" | "cycle";
	id: string;
	detail: string;
}

/**
 * Kahn topo-sort. Returns `items` in dependency order (a node's deps come
 * before it). A dep id not present in `items` is ignored, reported via
 * `onProblem` as `missing-dep`. Nodes in a cycle are appended in their
 * original input order and reported as `cycle`.
 */
export function topoSort<T>(
	items: readonly T[],
	getId: (item: T) => string,
	getDeps: (item: T) => readonly string[],
	onProblem?: (problem: TopoSortProblem) => void
): T[] {
	const ids = new Set(items.map(getId));

	const byId = new Map<string, T>();
	const incoming = new Map<string, number>();
	const dependents = new Map<string, string[]>();

	for (const item of items) {
		const id = getId(item);
		byId.set(id, item);

		const present: string[] = [];
		for (const dep of getDeps(item)) {
			if (!ids.has(dep)) {
				onProblem?.({
					kind: "missing-dep",
					id,
					detail: `missing dependency: ${dep}`,
				});
				continue;
			}
			present.push(dep);
		}

		incoming.set(id, present.length);
		for (const dep of present) {
			const arr = dependents.get(dep) ?? [];
			arr.push(id);
			dependents.set(dep, arr);
		}
	}

	const ready: string[] = [];
	for (const item of items) {
		if (incoming.get(getId(item)) === 0) {
			ready.push(getId(item));
		}
	}

	const ordered: T[] = [];
	while (ready.length > 0) {
		const id = ready.shift()!;
		ordered.push(byId.get(id)!);
		for (const next of dependents.get(id) ?? []) {
			const left = (incoming.get(next) ?? 0) - 1;
			incoming.set(next, left);
			if (left === 0) {
				ready.push(next);
			}
		}
	}

	if (ordered.length < items.length) {
		const orderedIds = new Set(ordered.map(getId));
		for (const item of items) {
			const id = getId(item);
			if (!orderedIds.has(id)) {
				onProblem?.({
					kind: "cycle",
					id,
					detail: "part of a cycle",
				});
				ordered.push(item);
			}
		}
	}

	return ordered;
}
