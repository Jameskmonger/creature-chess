import React from "react";

import { TraitId, TraitSet } from "@creature-chess/models/gamemode/traits";

import { useTraitDefinitions } from "./TraitDefinitionsContext";

const TraitSetContext = React.createContext<TraitSet | null>(null);

export function TraitSetProvider({
	children,
	traitSet,
}: {
	children: React.ReactNode;
	traitSet: TraitSet;
}) {
	return (
		<TraitSetContext.Provider value={traitSet}>
			{children}
		</TraitSetContext.Provider>
	);
}

export function useTraitSet() {
	const traitSet = React.useContext(TraitSetContext);
	const traitDefinitions = useTraitDefinitions();

	if (!traitSet) {
		throw new Error("useTraitSet must be used within a TraitSetProvider");
	}

	const getPieceCount = React.useCallback(
		(traitId: TraitId) => traitSet.get(traitId) ?? 0,
		[traitSet]
	);

	const getTier = React.useCallback(
		(traitId: TraitId) => {
			const trait = traitDefinitions.getTraitById(traitId);
			if (!trait) {
				return 0;
			}

			if (trait.tiers.length === 0) {
				return -1;
			}

			const pieceCount = getPieceCount(traitId);

			for (let i = 0; i < trait.tiers.length; i++) {
				if (pieceCount < trait.tiers[i].amount) {
					return i;
				}
			}

			return trait.tiers.length - 1;
		},
		[getPieceCount, traitDefinitions]
	);

	return React.useMemo(
		() => ({
			traitSet,
			getPieceCount,
			/**
			 * Get the synergy tier of a trait based on the current piece count,
			 * as an index into the trait's synergy tier array.
			 *
			 * @returns The index of the trait's synergy tier array, or -1 if the trait has no tiers.
			 */
			getTier,
		}),
		[getPieceCount, getTier, traitSet]
	);
}
