import { createContext, useContext } from "react";
import { PieceModel } from "@creature-chess/models";

export type PieceContext = {
	piece: PieceModel;
	viewingPlayerId: string;
};

const PieceContext = createContext<PieceContext>(null as unknown as PieceContext);
PieceContext.displayName = "PieceContext";

export const PieceContextProvider = PieceContext.Provider;

export const usePiece = () => {
	const piece = useContext(PieceContext);

	if (!piece) {
		throw new Error("No valid PieceContext found for usePiece");
	}

	return piece;
};
