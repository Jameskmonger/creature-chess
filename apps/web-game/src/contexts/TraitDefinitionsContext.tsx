import React, { createContext, useContext, ReactNode, useMemo } from "react";

import { Trait, TraitId } from "@creature-chess/models/gamemode/traits";

interface TraitDefinitionsContextType {
	getTraitById: (id: TraitId) => Trait | undefined;
}

const TraitDefinitionsContext = createContext<
	TraitDefinitionsContextType | undefined
>(undefined);

export function TraitDefinitionsProvider({
	traits = {} as Map<string, Trait>,
	children,
}: {
	traits?: Map<string, Trait>;
	children: ReactNode;
}) {
	const contextValue = useMemo(
		() => ({
			getTraitById: (id: TraitId) => traits.get(id),
		}),
		[traits]
	);

	return (
		<TraitDefinitionsContext.Provider value={contextValue}>
			{children}
		</TraitDefinitionsContext.Provider>
	);
}

export const useTraitDefinitions = (): TraitDefinitionsContextType => {
	const context = useContext(TraitDefinitionsContext);
	if (!context) {
		throw new Error(
			"useTraitDefinitions must be used within a TraitDefinitionsProvider"
		);
	}
	return context;
};
