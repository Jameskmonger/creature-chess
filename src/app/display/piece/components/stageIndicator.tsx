import * as React from "react";
import { useSelector } from "react-redux";
import { AppState } from "@app/store";
import { Piece } from "@common/models";
import { getPiece } from "@common/player/pieceSelectors";

interface StageIndicatorProps {
    pieceId: string;
}

const StageIndicator: React.FunctionComponent<StageIndicatorProps> = ({ pieceId }) => {
    const piece = useSelector<AppState, (Piece | null)>(state => getPiece(state, pieceId));

    if (!piece) {
        return null;
    }

    return <div className="piece-stage">{piece.stage + 1}</div>;
};

export { StageIndicator };
