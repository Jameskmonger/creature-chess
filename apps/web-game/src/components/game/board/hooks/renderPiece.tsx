import React from "react";

import { useAccountId } from "~/auth/context";

import { PieceModel } from "@creature-chess/models";

import { MatchPiece, Piece, PieceContextProvider, SelectablePiece } from "../piece";

export const useRenderSelectablePiece = () => {
	const viewingPlayerId = useAccountId();

	return function (piece: PieceModel): React.ReactNode {
		return (
			<PieceContextProvider value={{ piece, viewingPlayerId }}>
				<SelectablePiece />
			</PieceContextProvider>
		);
	};
};

export const useRenderMatchPiece = () => {
	const viewingPlayerId = useAccountId();

	return function (piece: PieceModel): React.ReactNode {
		return (
			<PieceContextProvider value={{ piece, viewingPlayerId }}>
				<MatchPiece />
			</PieceContextProvider>
		);
	};
};

export const useRenderReadOnlyPiece = () => {
	const viewingPlayerId = useAccountId();

	return function (piece: PieceModel): React.ReactNode {
		return (
			<PieceContextProvider value={{ piece, viewingPlayerId }}>
				<Piece healthbar="none" />
			</PieceContextProvider>
		);
	};
};
