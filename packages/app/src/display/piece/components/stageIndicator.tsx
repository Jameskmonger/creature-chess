import * as React from "react";
import { useSelector } from "react-redux";
import { AppState } from "../../../store";
import { PieceModel } from "@creature-chess/shared/models";
import { getPiece } from "@creature-chess/shared/player/pieceSelectors";

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
