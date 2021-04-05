import * as React from "react";
import { useSelector } from "react-redux";
import { CreatureType, PieceModel } from "@creature-chess/models";
import { getPiece } from "@creature-chess/shared";
import { AppState } from "../../../../store";
import { Healthbar } from "./components/healthbar";
import { StageIndicator } from "./components/stageIndicator";
import { TypeIndicator } from "./components/TypeIndicator";

const PieceMeta: React.FunctionComponent<{ id: string }> = ({ id }) => {
    const piece = useSelector<AppState, PieceModel>(state => getPiece(state, id));

    return (
        <div className="piece-meta-container">
            <div className="piece-meta">
                <TypeIndicator type={piece.definition.type} />

                <Healthbar pieceId={id} vertical />
            </div>
            <div className="piece-meta-top">
                <StageIndicator pieceId={id} />
            </div>
        </div>
    )
};

export { PieceMeta };
