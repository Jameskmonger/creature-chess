/**
 * Number of 1-star pieces "contained" in a piece of a given stage - the
 * total count that must be combined to create it.
 */
export function getPiecesForStage(stage: number, piecesToEvolve: number) {
	if (piecesToEvolve !== 3) {
		// TODO (jkm) make this dynamic
		throw new Error("Only 3 pieces to evolve is supported ATM");
	}

	if (stage === 0) {
		return 1;
	}

	if (stage === 1) {
		return 3;
	}

	if (stage === 2) {
		return 9;
	}

	throw new Error("Only stages 1, 2 and 3 are supported ATM");
}
