import React from "react";

import { useLocalPlayerId } from "~/auth/context";

import { PieceModel } from "@creature-chess/models";

import { MatchPiece, PieceContextProvider, SelectablePiece } from "../piece";

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
