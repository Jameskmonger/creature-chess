import React from "react";

import { PieceModel } from "@creature-chess/models";

import { useLocalPlayerId } from "@cc-web/auth/context";
import { MatchPiece, PieceContextProvider } from "@cc-web/ui";

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
