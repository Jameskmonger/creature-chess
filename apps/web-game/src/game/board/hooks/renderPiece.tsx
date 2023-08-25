import React from "react";

import { useLocalPlayerId } from "@creature-chess/auth-web/context";
import { PieceModel } from "@creature-chess/models";
import { MatchPiece, PieceContextProvider } from "@creature-chess/ui";

import { SelectablePiece } from "../piece/SelectablePiece";

const useRenderSelectablePiece = () => {
	const viewingPlayerId = useLocalPlayerId();

	return (piece: PieceModel): React.ReactNode => (
		<PieceContextProvider value={{ piece, viewingPlayerId }}>
			<SelectablePiece />
		</PieceContextProvider>
	);
};

export const useRenderBoardPiece = useRenderSelectablePiece;
export const useRenderBenchPiece = useRenderSelectablePiece;

export const useRenderMatchBoardPiece = () => {
	const viewingPlayerId = useLocalPlayerId();

	return (piece: PieceModel): React.ReactNode => (
		<PieceContextProvider value={{ piece, viewingPlayerId }}>
			<MatchPiece />
		</PieceContextProvider>
	);
};
