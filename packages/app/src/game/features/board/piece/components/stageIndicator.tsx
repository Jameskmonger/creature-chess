import * as React from "react";
import { useSelector } from "react-redux";
import { PieceModel } from "@creature-chess/models";
import { getPiece } from "@creature-chess/shared";
import { AppState } from "../../../../../store";

interface StageIndicatorProps {
    pieceId: string;
}

const StageIndicator: React.FunctionComponent<StageIndicatorProps> = ({ pieceId }) => {
    const piece = useSelector<AppState, (PieceModel | null)>(state => getPiece(state, pieceId));

    if (!piece) {
        return null;
    }

    return <div className="piece-stage">{piece.stage + 1}</div>;
};

export { StageIndicator };
