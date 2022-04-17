import React from "react";
import { PieceModel } from "@creature-chess/models";
import { usePlayerId } from "@creature-chess/auth-web";
import { MatchPiece, PieceContextProvider } from "@creature-chess/ui";
import { SelectablePiece } from "../piece/SelectablePiece";

const useRenderSelectablePiece = () => {
  const viewingPlayerId = usePlayerId();

  return (piece: PieceModel): React.ReactNode => {
    return (
      <PieceContextProvider value={{ piece, viewingPlayerId }}>
        <SelectablePiece />
      </PieceContextProvider>
    );
  };
};

export const useRenderBoardPiece = useRenderSelectablePiece;
export const useRenderBenchPiece = useRenderSelectablePiece;

export const useRenderMatchBoardPiece = () => {
  const viewingPlayerId = usePlayerId();

  return (piece: PieceModel): React.ReactNode => {
    return (
      <PieceContextProvider value={{ piece, viewingPlayerId }}>
        <MatchPiece />
      </PieceContextProvider>
    );
  };
};
