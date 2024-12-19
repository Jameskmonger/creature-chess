declare module "javascript-astar" {
	export class Graph {
		public grid: GraphNode[][];

		/**
		 * Creates a new graph from a 2D array of weights.
		 * @param weights - A 2D array representing the graph's weights.
		 */
		public constructor(weights: number[][]);
	}

	export interface GraphNode {
		x: number;
		y: number;
		weight: number;
	}

	export namespace astar {
		/**
		 * Finds a path between two nodes in a graph using the A* algorithm.
		 * @param graph - The graph to search within.
		 * @param start - The starting node.
		 * @param end - The ending node.
		 * @returns An array of nodes representing the path.
		 */
		function search(
			graph: Graph,
			start: GraphNode,
			end: GraphNode
		): GraphNode[];
	}
}
