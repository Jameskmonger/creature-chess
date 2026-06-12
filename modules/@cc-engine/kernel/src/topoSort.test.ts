import { topoSort, TopoSortProblem } from "./topoSort";

type Node = { id: string; deps: string[] };

const sort = (nodes: Node[], onProblem?: (p: TopoSortProblem) => void) =>
	topoSort(
		nodes,
		(n) => n.id,
		(n) => n.deps,
		onProblem
	).map((n) => n.id);

describe("topoSort", () => {
	test("orders deps before dependents regardless of input order", () => {
		const nodes: Node[] = [
			{ id: "c", deps: ["b"] },
			{ id: "b", deps: ["a"] },
			{ id: "a", deps: [] },
		];
		expect(sort(nodes)).toEqual(["a", "b", "c"]);
	});

	test("ignores a dep not present in items but reports it", () => {
		const nodes: Node[] = [{ id: "a", deps: ["missing"] }];
		const problems: TopoSortProblem[] = [];
		const result = sort(nodes, (p) => problems.push(p));
		expect(result).toEqual(["a"]);
		expect(problems).toEqual([
			{ kind: "missing-dep", id: "a", detail: expect.stringContaining("missing") },
		]);
	});

	test("appends cyclic nodes in input order and reports the cycle", () => {
		const nodes: Node[] = [
			{ id: "x", deps: ["y"] },
			{ id: "y", deps: ["x"] },
			{ id: "z", deps: [] },
		];
		const problems: TopoSortProblem[] = [];
		const result = sort(nodes, (p) => problems.push(p));
		expect(result).toEqual(["z", "x", "y"]);
		expect(problems.map((p) => p.id)).toEqual(["x", "y"]);
		expect(problems.every((p) => p.kind === "cycle")).toBe(true);
	});
});
