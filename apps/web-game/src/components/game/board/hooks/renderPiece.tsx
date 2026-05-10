import React from "react";

import { useAccountId } from "~/auth/context";

import { PieceModel } from "@creature-chess/models";

import { MatchPiece, Piece, SelectablePiece } from "../piece";

export const useRenderSelectablePiece = () =>
	function (piece: PieceModel): React.ReactNode {
		return <SelectablePiece piece={piece} />;
	};

export const useRenderMatchPiece = () => {
	const viewingPlayerId = useAccountId();

	return function (piece: PieceModel): React.ReactNode {
		return <MatchPiece piece={piece} viewingPlayerId={viewingPlayerId} />;
	};
};

export const useRenderReadOnlyPiece = () =>
	function (piece: PieceModel): React.ReactNode {
		return <Piece piece={piece} />;
	};
