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

    if (!piece || piece.stage === 0) {
        return null;
    }

    let stars: React.ReactNode[] = [];

    for (let i = 0; i <= piece.stage; i++) {
        stars.push(<img key={i} src="https://creaturechess.jamesmonger.com/images/ui/star.svg" />);
    }

    return <div className="piece-stage">{stars}</div>;
};

export { StageIndicator };
